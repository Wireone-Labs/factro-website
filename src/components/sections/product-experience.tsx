"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Check, FileCheck, ShieldCheck, UserRound } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { ProductPageData } from "@/data/product-pages";
import { PRODUCT_JOURNEYS } from "@/data/product-journeys";
import { PRODUCT_TEAM_WORK } from "@/data/product-team-work";
import { ProductLandscape } from "./product-landscape";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./product-experience.module.css";

function nextTab(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number) {
  if (event.key === "Home") return 0;
  if (event.key === "End") return count - 1;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") return (index + 1) % count;
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") return (index + count - 1) % count;
  return null;
}

export function ProductIntro({ product, titleLines }: { product: ProductPageData; titleLines?: string[] }) {
  return <section className={styles.hero} aria-labelledby="product-title">
    <Container className={styles.heroGrid}>
      <div className={styles.heroCopy}>
        <Link href="/products" className={styles.backLink}>Products <ArrowRight size={14} aria-hidden="true" /> {product.name}</Link>
        <p className={styles.eyebrow}><span className={styles.productMark} />{product.category}</p>
        <h1 id="product-title">{titleLines ? titleLines.map(line => <span key={line} className={styles.titleLine}>{line}{" "}</span>) : product.title}</h1>
        <p className={styles.lead}>{product.description}</p>
        <div className={styles.actions}><Button href="/demo">See {product.name} in action<ArrowRight size={16} aria-hidden="true" /></Button><a href="#capabilities" className={styles.textLink}>Explore capabilities<ArrowRight size={16} aria-hidden="true" /></a></div>
        <p className={styles.heroNote}><ShieldCheck size={15} aria-hidden="true" />{product.slug === "one" ? "Start with one product. Connect the rest when ready." : "Runs on its own. Connects when you’re ready."}</p>
      </div>
      <ProductLandscape slug={product.slug} />
    </Container>
  </section>;
}

export function ProductWorkflow({ product }: { product: ProductPageData }) {
  const { active, setActive, regionRef } = useVisualCycle(product.flow.length, 6500);
  const steps = PRODUCT_JOURNEYS[product.slug];
  const step = steps[active];
  const identity = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  return <div ref={regionRef} className={styles.workflow}>
    <div className={styles.workflowSteps} role="tablist" aria-label={`${product.name} workflow steps`}>
      {product.flow.map((title, index) => <button key={title} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`${identity}-step-${index}`} aria-controls={`${identity}-detail`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
        const next = nextTab(event, index, product.flow.length);
        if (next === null) return;
        event.preventDefault(); setActive(next); buttons.current[next]?.focus();
      }}><span className={styles.stepNumber}>0{index + 1}</span><span>{title}</span><span className={styles.stepTrack} aria-hidden="true" /></button>)}
    </div>
    <div id={`${identity}-detail`} role="tabpanel" aria-labelledby={`${identity}-step-${active}`} tabIndex={0}>
      <div key={active} className={styles.workflowDetail}>
        <div><p className={styles.eyebrow}>{step.owner}</p><h3>{product.flow[active]}</h3><p className={styles.detailCopy}>{step.detail}</p></div>
        <div className={styles.evidence}><p className={styles.recordLabel}><FileCheck size={16} aria-hidden="true" />What moves with the work</p><ul>{step.evidence.map((item, index) => <li key={item} style={{ animationDelay: `${index * 100}ms` }}><Check size={15} aria-hidden="true" />{item}</li>)}</ul><p className={styles.control}><ShieldCheck size={19} aria-hidden="true" />{step.control}</p></div>
      </div>
    </div>
  </div>;
}

export function ProductCapabilities({ product }: { product: ProductPageData }) {
  const [active, setActive] = useState(0);
  const region = useRef<HTMLDivElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const identity = useId();

  useEffect(() => {
    let frame = 0;
    const selectFromHash = () => {
      const index = product.features.findIndex(feature => `#${feature.slug}` === window.location.hash);
      if (index < 0) return;
      setActive(index);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => region.current?.scrollIntoView({ block: "start" }));
    };
    const initialFrame = requestAnimationFrame(selectFromHash);
    window.addEventListener("hashchange", selectFromHash);
    return () => { cancelAnimationFrame(initialFrame); cancelAnimationFrame(frame); window.removeEventListener("hashchange", selectFromHash); };
  }, [product.features]);

  function select(index: number) {
    setActive(index);
    window.history.replaceState(window.history.state, "", `#${product.features[index].slug}`);
  }

  return <div ref={region} className={styles.capabilities}>
    <div className={styles.capabilityRail}>
      <p className={styles.catalogueLabel}>{product.features.length} connected areas <span>Included in {product.name}</span></p>
      <div className={styles.capabilityTabs} role="tablist" aria-label={`${product.name} capabilities`} aria-orientation="vertical">
      {product.features.map((feature, index) => <button key={feature.slug} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`${identity}-${feature.slug}`} aria-controls={feature.slug} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={event => {
        const next = nextTab(event, index, product.features.length);
        if (next === null) return;
        event.preventDefault(); select(next); buttons.current[next]?.focus();
      }}><span>0{index + 1}</span>{feature.name}<ArrowRight size={16} aria-hidden="true" /></button>)}
      </div>
      <Link href="/demo" className={styles.catalogueCta}>Walk through your process<ArrowRight size={15} aria-hidden="true" /></Link>
    </div>
    {product.features.map((feature, index) => <div key={feature.slug} id={feature.slug} role="tabpanel" aria-labelledby={`${identity}-${feature.slug}`} tabIndex={0} hidden={active !== index} className={styles.capabilityPanel}>
      <div className={styles.capabilityIntro}><p className={styles.eyebrow}>{product.name} / {feature.name}</p><h3>{feature.title}</h3><p>{feature.description}</p></div>
      <div className={styles.capabilitySections}>{feature.sections.map((section, sectionIndex) => <section key={`${feature.slug}-${section.title}`} className={styles.capabilityBlock}>
        <h4><span>0{sectionIndex + 1}</span>{section.title}</h4>
        <ul>{section.points.map(point => <li key={point}><Check size={15} aria-hidden="true" />{point}</li>)}</ul>
      </section>)}</div>
      <div className={styles.capabilityFoot}><ShieldCheck size={17} aria-hidden="true" /><p>Permissions, approvals and the audit trail stay with the work.</p><Link href="/security-trust">Trust & controls<ArrowRight size={14} aria-hidden="true" /></Link></div>
    </div>)}
  </div>;
}

export function ProductRoles({ product }: { product: ProductPageData }) {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const identity = useId();
  const [role] = product.roles[active];
  const work = PRODUCT_TEAM_WORK[product.slug][active];
  return <div className={styles.roles}>
    <div className={styles.roleTabs} role="tablist" aria-label="Choose your role" aria-orientation="vertical">{product.roles.map(([label], index) => <button key={label} ref={element => { buttons.current[index] = element; }} type="button" role="tab" id={`${identity}-role-${index}`} aria-selected={active === index} aria-controls={`${identity}-change`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => {
      const next = nextTab(event, index, product.roles.length);
      if (next === null) return;
      event.preventDefault(); setActive(next); buttons.current[next]?.focus();
    }}><span>0{index + 1}</span>{label}<ArrowRight size={16} aria-hidden="true" /></button>)}</div>
    <div id={`${identity}-change`} role="tabpanel" aria-labelledby={`${identity}-role-${active}`} tabIndex={0}>
      <div key={role} className={styles.roleWork}>
        <p className={styles.recordLabel}><UserRound size={16} aria-hidden="true" />{role}</p>
        <h3>{work.title}</h3>
        <ol>{work.steps.map(([title, detail], index) => <li key={title} style={{ animationDelay: `${index * 90}ms` }}><span className={styles.roleStep}>0{index + 1}</span><div><h4>{title}</h4><p>{detail}</p></div></li>)}</ol>
        <p className={styles.teamHandoff}><ArrowRight size={18} aria-hidden="true" />{work.handoff}</p>
      </div>
    </div>
  </div>;
}
