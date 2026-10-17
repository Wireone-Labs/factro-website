"use client";

import Image from "next/image";
import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type RefObject } from "react";
import { Check, Monitor, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { ProductDetailContent, ProductRole, ProductSlug } from "@/data/product-detail-content";
import styles from "./product-detail.module.css";

function navigateTabs(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, select: (index: number) => void, buttons: RefObject<(HTMLButtonElement | null)[]>) {
  const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1
    : event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % count
    : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index + count - 1) % count : null;
  if (next === null) return;
  event.preventDefault();
  select(next);
  buttons.current[next]?.focus({ preventScroll: true });
}

function Points({ points }: { points: string[] }) {
  return <ul className={styles.points}>{points.map(point => <li key={point}><Check size={15} aria-hidden="true" /><span>{point}</span></li>)}</ul>;
}

function ProductScreen({ slug, kind, active, alt }: { slug: ProductSlug; kind: "feature" | "role"; active: number; alt: string }) {
  return <figure className={`${styles.device} ${kind === "feature" ? styles.laptop : styles.tablet}`}>
    <div className={styles.deviceFrame}>
      <span className={styles.camera} aria-hidden="true" />
      <div className={styles.deviceScreen}>
        <Image key={active} src={`/product-previews/${slug}/${kind}-${active + 1}.webp`} alt={alt} fill unoptimized className={styles.screenImage} />
      </div>
    </div>
    {kind === "feature" && <div className={styles.laptopBase} aria-hidden="true" />}
  </figure>;
}

function useProductScrollTour(count: number) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const screen = screenRef.current;
    if (!track || !screen) return;
    const media = window.matchMedia("(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      if (track.dataset.pinned !== "true") return;
      const top = parseFloat(getComputedStyle(track).getPropertyValue("--tour-top"));
      const step = (track.offsetHeight - screen.offsetHeight) / count;
      if (step <= 0) return;
      const distance = top - track.getBoundingClientRect().top;
      const next = Math.floor(Math.max(0, distance) / step);
      setActive(Math.min(count - 1, next));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const syncLayout = () => {
      track.dataset.pinned = String(media.matches);
      schedule();
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", syncLayout);
    media.addEventListener("change", syncLayout);
    syncLayout();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", syncLayout);
      media.removeEventListener("change", syncLayout);
    };
  }, [count]);

  function select(index: number) {
    const track = trackRef.current;
    const screen = screenRef.current;
    if (track?.dataset.pinned === "true" && screen) {
      const top = parseFloat(getComputedStyle(track).getPropertyValue("--tour-top"));
      const step = (track.offsetHeight - screen.offsetHeight) / count;
      window.scrollTo({ top: window.scrollY + track.getBoundingClientRect().top - top + index * step + 2, behavior: "smooth" });
    } else {
      setActive(index);
    }
  }

  return { active, select, trackRef, screenRef };
}

export function ProductFeatureTour({ slug, content }: { slug: ProductSlug; content: ProductDetailContent }) {
  const { active, select, trackRef, screenRef } = useProductScrollTour(content.features.length);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const identity = useId();

  return <section id="workflow" className={styles.featureSection} aria-labelledby="feature-heading">
    <Container>
      <div className={styles.tourTrack} ref={trackRef} style={{ "--tour-count": content.features.length } as CSSProperties}>
        <div className={styles.tourScreen} ref={screenRef}>
          <div className={styles.tourIntro}>
            <div className={styles.headingRow}>
              <div><p className={styles.eyebrow}>{content.eyebrow}</p><h2 id="feature-heading">{content.heading[0]}<br /><span>{content.heading[1]}</span></h2></div>
              <p>{content.introduction}</p>
            </div>
          </div>
          <div className={styles.tourStage}>
            <div className={styles.featureTabs} role="tablist" aria-orientation="vertical" aria-label="Product feature tour">
              {content.features.map((feature, index) => <div key={feature.title} className={styles.featureTab} data-active={active === index}>
                <button ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`${identity}-tab-${index}`} aria-controls={`${identity}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigateTabs(event, index, content.features.length, select, buttons)}>
                  <span>0{index + 1}</span><strong>{feature.title}</strong>
                </button>
                {active === index && <div className={styles.featurePoints}><Points points={feature.points} /><div className={styles.featureRule} aria-hidden="true" /></div>}
              </div>)}
            </div>
            <div id={`${identity}-panel`} role="tabpanel" aria-labelledby={`${identity}-tab-${active}`} tabIndex={0} className={styles.featurePreview}>
              <ProductScreen slug={slug} kind="feature" active={active} alt={`${content.features[active].title} — illustrative Factro screen`} />
              <div className={styles.mobileFeaturePoints}><Points points={content.features[active].points} /></div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </section>;
}

export function ProductRoleTour({ slug, roles, heading }: { slug: ProductSlug; roles: ProductRole[]; heading: string }) {
  const { active, select, trackRef, screenRef } = useProductScrollTour(roles.length);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const identity = useId();
  const current = roles[active];
  return <section id="roles" className={`${styles.roleSection} ${styles.muted}`} aria-labelledby="roles-heading">
    <Container>
      <div className={styles.tourTrack} ref={trackRef} style={{ "--tour-count": roles.length } as CSSProperties}>
        <div className={styles.tourScreen} ref={screenRef}>
          <div className={styles.tourIntro}>
            <div className={styles.headingRow}><div><p className={styles.eyebrow}>Who it is for</p><h2 id="roles-heading">Built for the people<br /><span>{heading}</span></h2></div><p>Each role opens Factro on its own screen, with the evidence it needs to act.</p></div>
            <div className={styles.roleControls}>
              <div role="tablist" aria-label="Choose your role" className={styles.roleTabs}>
                {roles.map((role, index) => <button key={role.title} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`${identity}-role-${index}`} aria-controls={`${identity}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => navigateTabs(event, index, roles.length, select, buttons)}><UserRound size={14} aria-hidden="true" />{role.title}</button>)}
              </div>
            </div>
          </div>
          <div id={`${identity}-panel`} role="tabpanel" aria-labelledby={`${identity}-role-${active}`} tabIndex={0} className={styles.rolePanel}>
            <div key={active} className={styles.roleCopy}><h3>{current.title}</h3><p>{current.description}</p><Points points={current.points} /><p className={styles.screenLabel}><Monitor size={13} aria-hidden="true" />On screen: {current.screen}</p></div>
            <ProductScreen slug={slug} kind="role" active={active} alt={`${current.screen} — illustrative workspace for ${current.title}`} />
          </div>
        </div>
      </div>
    </Container>
  </section>;
}
