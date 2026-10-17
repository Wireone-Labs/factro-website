"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./business-outcomes.module.css";

export function OutcomeCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const [position, setPosition] = useState({ start: true, end: false, first: 1, last: 3, total: 7 });

  useEffect(() => {
    const region = regionRef.current;
    const track = trackRef.current;
    if (!region || !track) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    function sync() {
      clearInterval(timer);
      if (disposed || !visible || document.hidden || motion.matches || region?.matches(":hover") || region?.contains(document.activeElement)) return;
      timer = setInterval(() => {
        if (!track) return;
        const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
        const step = (track.firstElementChild?.getBoundingClientRect().width ?? track.clientWidth) + (Number.parseFloat(getComputedStyle(track).columnGap) || 0);
        track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step, behavior: "smooth" });
      }, 5000);
    }
    function onFocusOut() { queueMicrotask(sync); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.25 });
    observer.observe(region);
    region.addEventListener("mouseenter", sync);
    region.addEventListener("mouseleave", sync);
    region.addEventListener("focusin", sync);
    region.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      disposed = true;
      clearInterval(timer);
      observer.disconnect();
      region.removeEventListener("mouseenter", sync);
      region.removeEventListener("mouseleave", sync);
      region.removeEventListener("focusin", sync);
      region.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function update() {
      if (!track) return;
      const items = Array.from(track.children) as HTMLElement[];
      const bounds = track.getBoundingClientRect();
      const visible = items.map((item, index) => ({ index, bounds: item.getBoundingClientRect() })).filter(item => item.bounds.right > bounds.left + 10 && item.bounds.left < bounds.right - 10);
      setPosition({ start: track.scrollLeft <= 2, end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 2, first: (visible[0]?.index ?? 0) + 1, last: (visible.at(-1)?.index ?? 0) + 1, total: items.length });
    }
    const observer = new ResizeObserver(update);
    observer.observe(track);
    track.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); track.removeEventListener("scroll", update); };
  }, []);

  function move(direction: number) {
    const track = trackRef.current;
    if (!track) return;
    const item = track.firstElementChild as HTMLElement | null;
    const step = (item?.getBoundingClientRect().width ?? track.clientWidth) + (Number.parseFloat(getComputedStyle(track).columnGap) || 0);
    track.scrollBy({ left: direction * step, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return <div ref={regionRef} className={styles.carousel} role="region" aria-label="Industries carousel. Advances every five seconds; hover or focus to pause.">
    <div className={styles.carouselControls}>
      <span>{position.first}–{position.last} of {position.total} industries</span>
    </div>
    <div className={styles.carouselViewport}>
    <button className={styles.carouselArrow} data-direction="previous" type="button" aria-label="Previous industry" aria-controls={id} disabled={position.start} onClick={() => move(-1)}><ArrowLeft size={18} /></button>
    <button className={styles.carouselArrow} data-direction="next" type="button" aria-label="Next industry" aria-controls={id} disabled={position.end} onClick={() => move(1)}><ArrowRight size={18} /></button>
    <div id={id} ref={trackRef} className={styles.grid} tabIndex={0} aria-label="Industry scenarios and responsible roles" onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    }}>{children}</div>
    </div>
  </div>;
}
