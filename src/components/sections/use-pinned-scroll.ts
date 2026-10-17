"use client";

import { useCallback, useEffect, useState, type CSSProperties, type RefObject } from "react";

export function usePinnedScroll(trackRef: RefObject<HTMLElement | null>, steps: number, minWidth = 1024) {
  const [layout, setLayout] = useState({ enabled: false, top: 0, header: 72, height: 0, stepLength: 0 });
  const [position, setPosition] = useState({ index: 0, progress: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const media = window.matchMedia(`(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`);
    const navigation = document.querySelector<HTMLElement>("[data-site-header] nav");
    const sectionNavigation = track.closest("[data-sticky-nav]")?.querySelector<HTMLElement>("[data-section-nav]");
    let geometry = { enabled: false, top: 0, header: 72, height: 0, stepLength: 0 };
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.max(0, geometry.top - track.getBoundingClientRect().top);
      const current = geometry.enabled ? Math.min(steps - 0.0001, distance / geometry.stepLength) : 0;
      const index = Math.floor(current);
      const progress = current - index;
      setPosition(previous => previous.index === index && previous.progress === progress ? previous : { index, progress });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const siteHeader = navigation?.closest("header");
      const persistent = siteHeader && ["fixed", "sticky"].includes(getComputedStyle(siteHeader).position);
      const siteHeaderHeight = persistent ? Math.max(0, Math.ceil(navigation?.getBoundingClientRect().bottom ?? 0)) : 0;
      const header = siteHeaderHeight + Math.ceil(sectionNavigation?.getBoundingClientRect().height ?? 0);
      const height = Math.max(1, window.innerHeight - header);
      geometry = { enabled: media.matches, top: header, header, height, stepLength: Math.max(360, height * 0.8) };
      setLayout(previous => previous.enabled === geometry.enabled && previous.header === header && previous.height === geometry.height && previous.stepLength === geometry.stepLength ? previous : geometry);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    if (navigation) observer.observe(navigation);
    if (sectionNavigation) observer.observe(sectionNavigation);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    media.addEventListener("change", measure);
    measure();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
      media.removeEventListener("change", measure);
    };
  }, [minWidth, steps, trackRef]);

  const select = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    if (!track || !layout.enabled) return;
    window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top - layout.top + (Math.max(0, Math.min(steps - 1, index)) + 0.05) * layout.stepLength, behavior });
  }, [layout.enabled, layout.stepLength, layout.top, steps, trackRef]);

  return {
    enabled: layout.enabled,
    index: position.index,
    progress: position.progress,
    stepLength: layout.stepLength,
    select,
    trackStyle: layout.enabled ? { height: layout.height + layout.stepLength * steps } : undefined,
    stageStyle: layout.enabled ? { top: layout.top, height: layout.height, "--pin-header-height": `${layout.header}px` } as CSSProperties : undefined,
  };
}
