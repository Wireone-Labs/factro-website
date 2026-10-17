"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function PageReveals({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const region = root.current;
    if (!region) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const revealedLists = new Set<string>();
    const lists = new Set<HTMLElement>();
    const animations = new Set<Animation>();
    const headings = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        headings.unobserve(entry.target);
        if (preference.matches) return;
        const animation = entry.target.animate([
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 550, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    }, { rootMargin: "0px 0px -32px 0px", threshold: 0.08 });

    function updateList(list: HTMLElement, intersecting?: boolean) {
      const identity = JSON.stringify([
        list.closest("section[id]")?.id,
        list.getAttribute("aria-label"),
        Array.from(list.children).map(item => item.textContent),
      ]);
      if (list.dataset.bulletsVisible === "true" || revealedLists.has(identity)) {
        list.dataset.bulletsVisible = "true";
        revealedLists.add(identity);
        bullets.unobserve(list);
        return;
      }
      const bounds = list.getBoundingClientRect();
      const visible = intersecting ?? (bounds.bottom > 0 && bounds.top < window.innerHeight - 16);
      if (!visible || !bounds.width || !bounds.height || list.closest('[hidden], [inert], [aria-hidden="true"], [data-viewport-panel][data-active="false"]')) return;
      list.dataset.bulletsVisible = "true";
      revealedLists.add(identity);
      bullets.unobserve(list);
      if (preference.matches) return;
      Array.from(list.children).forEach((item, index) => {
        if (!(item instanceof HTMLElement) || !item.matches("li")) return;
        const animation = item.animate([
          { opacity: 0, transform: "translateY(10px)" },
          { opacity: 1, transform: "translateY(0)" },
        ], { duration: 500, delay: 250 + Math.min(index, 7) * 220, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
        animations.add(animation);
        animation.onfinish = animation.oncancel = () => animations.delete(animation);
      });
    }
    const bullets = new IntersectionObserver(entries => {
      entries.forEach(entry => updateList(entry.target as HTMLElement, entry.isIntersecting));
    }, { rootMargin: "0px 0px -16px 0px", threshold: 0.05 });

    function observe() {
      if (pathname !== "/") region?.querySelectorAll("h1, h2, h3").forEach(element => {
        if (seen.has(element) || element.closest("nav, li, [data-native-asset], [data-no-reveal], [data-reveal], [data-viewport-panel], [role=tablist]")) return;
        seen.add(element);
        headings.observe(element);
      });
      region?.querySelectorAll<HTMLElement>("ul, ol").forEach(list => {
        if (list.closest("nav, figure, li, [data-native-asset], [data-no-reveal], [data-bullet-managed], [role=tablist]") || list.querySelector("[data-building]")) return;
        if (lists.has(list)) return;
        lists.add(list);
        list.dataset.bulletList = "";
        if (list.dataset.bulletsVisible !== "true") list.dataset.bulletsVisible = "false";
        bullets.observe(list);
        updateList(list, false);
      });
      lists.forEach(list => {
        if (region?.contains(list)) return;
        bullets.unobserve(list);
        lists.delete(list);
      });
    }
    function cancelMotion() {
      if (!preference.matches) return;
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
    observe();
    const mutations = new MutationObserver(records => {
      if (records.some(record => record.type === "childList" && (!(record.target instanceof Element) || !record.target.closest("[data-native-asset]")))) observe();
      records.forEach(record => {
        if (record.type !== "attributes" || !(record.target instanceof HTMLElement) || record.target.closest("[data-native-asset]")) return;
        record.target.querySelectorAll<HTMLElement>("[data-bullet-list]").forEach(list => updateList(list));
      });
    });
    mutations.observe(region, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-active", "aria-hidden", "inert", "hidden"] });
    preference.addEventListener("change", cancelMotion);
    return () => {
      headings.disconnect();
      bullets.disconnect();
      mutations.disconnect();
      preference.removeEventListener("change", cancelMotion);
      animations.forEach(animation => animation.cancel());
    };
  }, [pathname]);

  return <main ref={root} className="flex-1">{children}</main>;
}
