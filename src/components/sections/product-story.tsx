"use client";

import { useEffect, useRef } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { ProductStory } from "@/data/product-stories";
import styles from "./product-story.module.css";

export function ProductModuleDetails({ modules, expanded = false }: { modules: ProductStory["modules"]; expanded?: boolean }) {
  const region = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded) return;
    let frame = 0;
    function openLinkedModule() {
      const target = document.getElementById(window.location.hash.slice(1));
      if (!(target instanceof HTMLDetailsElement) || !region.current?.contains(target)) return;
      target.open = true;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
    }
    openLinkedModule();
    window.addEventListener("hashchange", openLinkedModule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", openLinkedModule); };
  }, [expanded]);

  if (expanded) return <div className={styles.moduleList}>
    {modules.map((module, index) => <section key={module.slug} id={module.slug} className={styles.module} aria-labelledby={`${module.slug}-heading`}>
      <div className={styles.moduleHeading}><span className={styles.moduleNumber}>0{index + 1}</span><div><h3 id={`${module.slug}-heading`}>{module.name}</h3><p>{module.summary}</p></div></div>
      <div className={styles.moduleBody}><ul>{module.points.map(point => <li key={point}><Check size={16} aria-hidden="true" /><span>{point}</span></li>)}</ul>{module.note && <p className={styles.availability}>{module.note}</p>}</div>
    </section>)}
  </div>;

  return <div ref={region} className={styles.moduleList}>
    {modules.map((module, index) => <details key={module.slug} id={module.slug} className={styles.module}>
      <summary><span className={styles.moduleNumber}>0{index + 1}</span><span><strong>{module.name}</strong><span>{module.summary}</span></span><ChevronDown size={19} aria-hidden="true" /></summary>
      <div className={styles.moduleBody}><ul>{module.points.map(point => <li key={point}><Check size={16} aria-hidden="true" /><span>{point}</span></li>)}</ul>{module.note && <p className={styles.availability}>{module.note}</p>}</div>
    </details>)}
  </div>;
}
