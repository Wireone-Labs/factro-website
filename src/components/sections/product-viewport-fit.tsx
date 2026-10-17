"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import styles from "./product-detail.module.css";

export function ProductViewportFit({ children }: { children: ReactNode }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const content = contentRef.current;
    if (!frame || !content) return;
    const media = window.matchMedia("(min-width: 1024px) and (min-height: 720px)");
    let pending = 0;
    const measure = () => {
      pending = 0;
      const scale = media.matches && content.offsetHeight > 0 ? Math.min(1, frame.clientHeight / content.offsetHeight) : 1;
      content.style.setProperty("--content-scale", String(scale));
    };
    const schedule = () => { if (!pending) pending = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(frame);
    observer.observe(content);
    media.addEventListener("change", schedule);
    measure();
    return () => {
      cancelAnimationFrame(pending);
      observer.disconnect();
      media.removeEventListener("change", schedule);
    };
  }, []);

  return <div ref={frameRef} className={styles.viewportFit}><div ref={contentRef} className={styles.viewportContent}>{children}</div></div>;
}
