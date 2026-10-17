"use client";

import { createContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePinnedScroll } from "./use-pinned-scroll";
import styles from "./systems-teaser.module.css";

export const ProductVisibilityContext = createContext(true);

export function ProductShowcase({ items, heading }: { items: { name: string; content: ReactNode }[]; heading: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = usePinnedScroll(trackRef, items.length);
  const stageRef = useRef<HTMLDivElement>(null);
  const showcaseId = useId();
  const [readingProduct, setReadingProduct] = useState(0);
  const activeProduct = scroll.enabled ? scroll.index : readingProduct;

  useEffect(() => {
    const track = trackRef.current;
    const nextSection = document.getElementById("day-one");
    if (!scroll.enabled || !track || !nextSection) return;
    let previousPosition = window.scrollY;
    let direction = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let dragging = false;
    const settle = () => {
      const position = window.scrollY;
      const productEnd = position + track.getBoundingClientRect().bottom - window.innerHeight;
      const suiteStart = position + nextSection.getBoundingClientRect().top;
      if (dragging || !direction || position <= productEnd + 2 || position >= suiteStart - 2) return;
      window.scrollTo({ top: direction > 0 ? suiteStart : productEnd, behavior: "smooth" });
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(settle, 140);
    };
    const update = () => {
      const position = window.scrollY;
      if (position !== previousPosition) direction = Math.sign(position - previousPosition);
      previousPosition = position;
      schedule();
    };
    const startDrag = () => {
      dragging = true;
      clearTimeout(timer);
    };
    const endDrag = () => {
      dragging = false;
      schedule();
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("pointerdown", startDrag, { passive: true });
    window.addEventListener("pointerup", endDrag, { passive: true });
    window.addEventListener("pointercancel", endDrag, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", update);
      window.removeEventListener("pointerdown", startDrag);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [scroll.enabled]);

  useEffect(() => {
    if (scroll.enabled) return;
    const update = () => {
      const panels = Array.from(stageRef.current?.querySelectorAll<HTMLElement>(`.${styles.productPanel}`) ?? []);
      setReadingProduct(panels.reduce((current, panel, index) => panel.getBoundingClientRect().top <= 180 ? index : current, 0));
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [scroll.enabled]);

  useEffect(() => {
    const stage = stageRef.current;
    const viewport = stage?.querySelector<HTMLElement>(`.${styles.productPanels}`);
    if (!stage || !viewport) return;
    const panels = Array.from(viewport.querySelectorAll<HTMLElement>(`.${styles.productRow}`)).flatMap(row => {
      const content = row.querySelector<HTMLElement>(`.${styles.productContent}`);
      const preview = row.querySelector<HTMLElement>(`.${styles.productPreview}`);
      const visual = row.querySelector<HTMLElement>(`.${styles.productPreviewFit}`);
      return content && preview && visual ? [{ row, content, preview, visual }] : [];
    });
    const update = () => {
      const measurements = panels.map(panel => {
        const rowStyle = getComputedStyle(panel.row);
        const padding = parseFloat(rowStyle.paddingTop) + parseFloat(rowStyle.paddingBottom);
        return { ...panel, padding, contentHeight: panel.content.offsetHeight, visualHeight: panel.visual.offsetHeight };
      });
      const contentHeight = Math.max(1, ...measurements.map(panel => panel.contentHeight + panel.padding));
      const scale = scroll.enabled ? Math.min(1, viewport.clientHeight / contentHeight) : 1;
      stage.style.setProperty("--product-content-scale", String(scale));
      measurements.forEach(panel => {
        const availableHeight = Math.max(1, viewport.clientHeight / scale - panel.padding);
        const previewScale = scroll.enabled && panel.visualHeight > 0 ? Math.min(1, availableHeight / panel.visualHeight) : 1;
        panel.preview.style.setProperty("--product-preview-scale", String(previewScale));
        panel.preview.style.setProperty("--product-preview-height", `${panel.visualHeight * previewScale}px`);
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    panels.forEach(panel => {
      observer.observe(panel.content);
      observer.observe(panel.visual);
    });
    update();
    return () => observer.disconnect();
  }, [scroll.enabled, items.length]);

  return (
    <div ref={trackRef} className={styles.products} data-pinned={scroll.enabled} style={scroll.trackStyle}>
      <div ref={stageRef} className={styles.productStage} data-motion={scroll.enabled} style={scroll.stageStyle}>
        <div className={styles.productHeading}>{heading}</div>
        <ol className={styles.productProgress} aria-label="Product overview" data-no-reveal>
          {items.map((item, index) => <li key={item.name} data-product={item.name}><button type="button" aria-current={index === activeProduct ? "step" : undefined} aria-controls={`${showcaseId}-${index}`} aria-label={`Show ${item.name}`} onClick={() => {
            if (scroll.enabled) scroll.select(index);
            else document.getElementById(`${showcaseId}-${index}`)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
          }}><span>0{index + 1}</span>{item.name}</button></li>)}
        </ol>
        <div className={styles.productPanels}>
          {items.map((item, index) => (
            <div key={item.name} id={`${showcaseId}-${index}`} className={styles.productPanel} data-product={item.name} data-active={index === activeProduct} data-position={index < activeProduct ? "before" : "after"} inert={scroll.enabled && index !== activeProduct} aria-hidden={scroll.enabled && index !== activeProduct ? true : undefined}>
              <ProductVisibilityContext.Provider value={!scroll.enabled || index === activeProduct}>
                {item.content}
              </ProductVisibilityContext.Provider>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
