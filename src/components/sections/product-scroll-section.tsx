"use client";

import { createContext, useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { usePinnedScroll } from "./use-pinned-scroll";
import styles from "./product-scroll-section.module.css";

export const ProductPanelContext = createContext(true);

export type ProductSlide = { id: string; label: string; aliases?: string[]; content: ReactNode };

export function ProductScrollSection({ id, heading, slides, aliases = [], tone = "white", contentAlign = "center", headingPlacement = "outside" }: {
  id: string;
  heading: ReactNode;
  slides: ProductSlide[];
  aliases?: string[];
  tone?: "white" | "muted" | "tinted";
  contentAlign?: "start" | "center";
  headingPlacement?: "outside" | "stage";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const anchorHandled = useRef(false);
  const identity = useId();
  const scroll = usePinnedScroll(trackRef, slides.length, 768);
  const { enabled, select } = scroll;
  const [readingIndex, setReadingIndex] = useState(0);
  const activeIndex = scroll.enabled ? scroll.index : readingIndex;
  const pinned = scroll.enabled && slides.length > 1;
  const sectionHeading = <div className={styles.heading}>{aliases.map(alias => <span key={alias} id={alias} />)}{heading}</div>;

  useEffect(() => {
    if (!enabled || anchorHandled.current) return;
    anchorHandled.current = true;
    const anchor = window.location.hash.slice(1);
    const index = slides.findIndex(slide => slide.id === anchor || slide.aliases?.includes(anchor));
    if (index >= 0 && slides.length > 1) select(index, "instant");
  }, [slides, enabled, select]);

  useEffect(() => {
    if (scroll.enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const panels = Array.from(viewportRef.current?.querySelectorAll<HTMLElement>("[data-viewport-panel]") ?? []);
      setReadingIndex(panels.reduce((current, panel, index) => panel.getBoundingClientRect().top <= 190 ? index : current, 0));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); };
  }, [scroll.enabled]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const contents = Array.from(viewport.querySelectorAll<HTMLElement>("[data-viewport-content]"));
    const update = () => {
      // One scale for every panel, so switching slides never changes the type size.
      const scale = scroll.enabled ? Math.min(1, ...contents.map(content => content.offsetHeight ? viewport.clientHeight / content.offsetHeight : 1)) : 1;
      contents.forEach(content => content.style.setProperty("--panel-scale", String(scale)));
    };
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    contents.forEach(content => observer.observe(content));
    update();
    return () => observer.disconnect();
  }, [scroll.enabled, slides.length]);

  return <section id={id} className={styles.section} data-tone={tone} data-content-align={contentAlign} data-heading-placement={headingPlacement} data-product-section>
    {headingPlacement === "outside" && <Container>{sectionHeading}</Container>}
    <div ref={trackRef} className={styles.track} data-fitted={scroll.enabled} data-pinned={pinned} style={pinned ? scroll.trackStyle : undefined}>
      {scroll.enabled && slides.flatMap((slide, index) => [slide.id, ...(slide.aliases ?? [])].map(anchor => <span id={anchor} key={anchor} className={styles.anchor} style={{ top: pinned ? (index + .05) * scroll.stepLength : 0, scrollMarginTop: scroll.stageStyle?.top }} />))}
      <div className={styles.stage} style={scroll.stageStyle}>
        <Container className={styles.stageContainer}>
          {headingPlacement === "stage" && sectionHeading}
          {slides.length > 1 ? <nav className={styles.navigation} aria-label={`${id} overview`} data-no-reveal><ol>{slides.map((slide, index) => <li key={slide.id}><a href={`#${slide.id}`} aria-current={activeIndex === index ? "step" : undefined} aria-controls={`${identity}-${index}`} onClick={event => {
            if (!pinned || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            if (window.location.hash !== `#${slide.id}`) window.history.pushState(null, "", `#${slide.id}`);
            scroll.select(index);
          }} onKeyDown={event => {
            const next = event.key === "Home" ? 0 : event.key === "End" ? slides.length - 1 : event.key === "ArrowRight" ? (index + 1) % slides.length : event.key === "ArrowLeft" ? (index + slides.length - 1) % slides.length : null;
            if (next === null) return;
            event.preventDefault();
            const link = event.currentTarget.closest("ol")?.querySelectorAll<HTMLAnchorElement>("a")[next];
            link?.focus({ preventScroll: true });
            link?.click();
          }}><span>{String(index + 1).padStart(2, "0")}</span>{slide.label}</a></li>)}</ol></nav> : <div className={styles.divider} />}
          <div ref={viewportRef} className={styles.panels}>
            {slides.map((slide, index) => <article id={`${identity}-${index}`} key={slide.id} className={styles.panel} data-viewport-panel data-active={!scroll.enabled || index === activeIndex} inert={scroll.enabled && index !== activeIndex} aria-hidden={scroll.enabled && index !== activeIndex ? true : undefined} aria-label={slide.label}>
              {!scroll.enabled && [slide.id, ...(slide.aliases ?? [])].map(anchor => <span id={anchor} key={anchor} className={styles.staticAnchor} />)}
              <ProductPanelContext.Provider value={!scroll.enabled || index === activeIndex}>
                <div className={styles.content} data-viewport-content>{slide.content}</div>
              </ProductPanelContext.Provider>
            </article>)}
          </div>
        </Container>
      </div>
    </div>
  </section>;
}
