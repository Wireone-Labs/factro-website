"use client";

import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Check, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import type { ProductExample, ProductSlug } from "@/data/product-detail-content";
import { PRODUCT_ENGINE_PREVIEWS } from "@/data/product-engine-previews";
import { ProductEnginePreview } from "./product-engine-preview";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./product-engine-reels.module.css";

const ENGINES = [
  { title: "Compliance Engine", description: "Controls that hold", icon: ShieldCheck },
  { title: "Task Manager", description: "Work that moves", icon: Workflow },
  { title: "AI Agent", description: "Signals that explain", icon: Sparkles },
];

function EngineReel({ slug, examples, engineIndex, active, cardHeight, measure }: {
  slug: ProductSlug;
  examples: ProductExample[];
  engineIndex: number;
  active: number;
  cardHeight: number;
  measure: (index: number, height: number) => void;
}) {
  const engine = ENGINES[engineIndex];
  const trackRef = useRef<HTMLDivElement>(null);
  const previousIndex = useRef(active);
  const step = cardHeight + 18;
  const destination = 28 - step * 5;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const contents = Array.from(track.querySelectorAll<HTMLElement>("[data-card-content]"));
    const update = () => measure(engineIndex, Math.max(...contents.map(content => content.offsetHeight)) + 2);
    const observer = new ResizeObserver(update);
    contents.forEach(content => observer.observe(content));
    update();
    return () => observer.disconnect();
  }, [engineIndex, measure]);

  useLayoutEffect(() => {
    const previous = previousIndex.current;
    previousIndex.current = active;
    const track = trackRef.current;
    if (!track || previous === active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const origin = 28 - step;
    const animation = track.animate([
      { transform: `translateY(${origin}px)`, filter: "blur(0px)", offset: 0 },
      { filter: "blur(2px)", offset: 0.22 },
      { transform: `translateY(${destination - 7}px)`, filter: "blur(0px)", offset: 0.88 },
      { transform: `translateY(${destination}px)`, filter: "blur(0px)", offset: 1 },
    ], { duration: 1550 + engineIndex * 180, delay: engineIndex * 100, easing: "cubic-bezier(.18,.78,.2,1)", fill: "backwards" });
    return () => animation.cancel();
  }, [active, destination, engineIndex, examples.length, step]);

  return <div className={styles.column} role="group" aria-label={engine.title} data-engine={engineIndex} data-active-example={active + 1}>
    <header className={styles.header}><span><engine.icon size={21} aria-hidden="true" /></span><div><h3><small>0{engineIndex + 1}</small>{engine.title}</h3><p>{engine.description}</p></div></header>
    <div className={styles.window} style={{ "--card-height": `${cardHeight}px` } as CSSProperties}>
      <div ref={trackRef} className={styles.track} style={{ transform: `translateY(${destination}px)` }}>
        {Array.from({ length: 7 }, (_, position) => {
          const exampleIndex = ((active + position - 5) % examples.length + examples.length) % examples.length;
          const example = examples[exampleIndex];
          return <div key={position} className={styles.slot} aria-hidden={position !== 5} data-selected={position === 5}>
            <article className={styles.card}>
              <div data-card-content className={styles.cardContent}>
                <ProductEnginePreview preview={PRODUCT_ENGINE_PREVIEWS[slug][engineIndex][exampleIndex]} />
                <div className={styles.copy}><h4>{example.title}</h4><ul>{example.points.map(point => <li key={point}><Check size={14} aria-hidden="true" /><span>{point}</span></li>)}</ul></div>
              </div>
            </article>
          </div>;
        })}
      </div>
      <span className={styles.selectionLine} aria-hidden="true" />
    </div>
  </div>;
}

export function ProductEngineReels({ slug, examples }: { slug: ProductSlug; examples: ProductExample[][] }) {
  const { active, setActive, regionRef } = useVisualCycle(examples[0].length, 7200, { pauseOnFocus: "keyboard" });
  const handleRef = useRef<HTMLSpanElement>(null);
  const previousIndex = useRef(active);
  const [heights, setHeights] = useState([0, 0, 0]);
  const measure = useCallback((index: number, height: number) => setHeights(previous => previous[index] === height ? previous : previous.map((value, position) => position === index ? height : value)), []);
  const cardHeight = Math.max(340, ...heights);

  useLayoutEffect(() => {
    const previous = previousIndex.current;
    previousIndex.current = active;
    if (previous === active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = handleRef.current?.animate([
      { transform: "rotateX(0deg)" },
      { transform: "rotateX(-145deg)", offset: 0.45 },
      { transform: "rotateX(0deg)" },
    ], { duration: 700, easing: "cubic-bezier(.4,0,.2,1)" });
    return () => animation?.cancel();
  }, [active]);

  return <div className={styles.engines}>
    <div ref={regionRef} className={styles.machine} role="group" aria-label="Connected product engines" aria-roledescription="carousel">
      <div className={styles.grid}>{ENGINES.map((engine, engineIndex) => <EngineReel key={engine.title} slug={slug} examples={examples[engineIndex]} engineIndex={engineIndex} active={active} cardHeight={cardHeight} measure={measure} />)}</div>
      <div className={styles.machineFooter}><span>One record. Three engines.</span><div className={styles.position} aria-label={`Example ${active + 1} of ${examples[0].length}`}>{examples[0].map((example, index) => <span key={example.title} data-active={index === active} />)}</div></div>
      <button type="button" className={styles.handle} onClick={() => setActive(previous => (previous + 1) % examples[0].length)} aria-label="Spin all three reels" title="Spin all three reels">
        <span className={styles.handleMount} aria-hidden="true" />
        <span ref={handleRef} className={styles.handleArm} aria-hidden="true"><span className={styles.handleKnob} /></span>
        <span className={styles.handleHub} aria-hidden="true" />
        <span className={styles.handleLabel} aria-hidden="true">Spin</span>
      </button>
    </div>
  </div>;
}
