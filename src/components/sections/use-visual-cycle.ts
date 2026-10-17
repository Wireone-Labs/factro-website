"use client";

import { useEffect, useRef, useState } from "react";

type VisualCycleOptions = {
  pauseOnHover?: boolean;
  pauseOnFocus?: "always" | "keyboard" | "never";
  paused?: boolean;
};

export function useVisualCycle(count: number, interval = 5000, { pauseOnHover = true, pauseOnFocus = "always", paused = false }: VisualCycleOptions = {}) {
  const [active, setActive] = useState(0);
  const regionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    function sync() {
      clearInterval(timer);
      if (disposed) return;
      const hovered = pauseOnHover && region?.matches(":hover");
      const focused = pauseOnFocus !== "never" && (pauseOnFocus === "always" ? region?.contains(document.activeElement) : region?.matches(":focus-visible") || region?.querySelector(":focus-visible"));
      if (visible && !paused && !document.hidden && !motion.matches && !hovered && !focused) {
        timer = setInterval(() => setActive(previous => (previous + 1) % count), interval);
      }
    }
    function handleInteraction() { queueMicrotask(sync); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(region);
    if (pauseOnHover) {
      region.addEventListener("mouseenter", sync);
      region.addEventListener("mouseleave", sync);
    }
    if (pauseOnFocus !== "never") {
      region.addEventListener("focusin", sync);
      region.addEventListener("focusout", handleInteraction);
      region.addEventListener("keydown", handleInteraction);
      region.addEventListener("pointerdown", handleInteraction);
    }
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      disposed = true;
      clearInterval(timer);
      observer.disconnect();
      region.removeEventListener("mouseenter", sync);
      region.removeEventListener("mouseleave", sync);
      region.removeEventListener("focusin", sync);
      region.removeEventListener("focusout", handleInteraction);
      region.removeEventListener("keydown", handleInteraction);
      region.removeEventListener("pointerdown", handleInteraction);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [count, interval, pauseOnHover, pauseOnFocus, paused]);

  return { active: active % count, regionRef, setActive };
}
