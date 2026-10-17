"use client";

import { useId, useRef, type KeyboardEvent } from "react";
import { ProductHeroScene, type ProductHeroStage } from "./product-hero-scene";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./product-landscape.module.css";

type Place = ProductHeroStage & {
  action: string;
  record: string;
};

const PLACES: Record<string, Place[]> = {
  erp: [
    { building: "office", name: "Receive", action: "Start with an approved partner.", record: "Customer and vendor licences, qualification and orders stay connected." },
    { building: "warehouse", name: "Store", action: "Know what you can actually use.", record: "Every lot has a location, a quality status and a complete movement history." },
    { building: "delivery", name: "Dispatch", action: "Close the order. Keep the trail.", record: "Released stock and invoices follow the same customer commitment. e-Invoices and e-way bills are available on request." },
  ],
  mes: [
    { scene: "planning", name: "Planning", action: "A plan the floor can run.", record: "Schedule against capacity, released material and equipment readiness." },
    { scene: "dispensing", name: "Dispensing", action: "The right lot. Independently verified.", record: "Material, quantity and the second-person signature join the batch record." },
    { scene: "production", name: "Shopfloor", action: "Run the batch. Build the record.", record: "Approved steps, actual quantities and signatures are captured as work happens." },
  ],
  qms: [
    { scene: "testing", name: "Laboratories", action: "Every test has its context.", record: "Methods, results and investigations stay with the material or batch." },
    { scene: "investigation", name: "Investigation & CAPA", action: "Fix the cause. Prove the change.", record: "Actions reach the floor; effectiveness evidence comes back to QA." },
    { scene: "approval", name: "Batch release", action: "Review exceptions. Sign with confidence.", record: "Execution, testing and open quality issues meet at the release decision." },
  ],
  one: [
    { building: "warehouse", name: "ERP · Receive", action: "Create the material record once.", record: "The receipt opens sampling and retains supplier, lot and location." },
    { building: "shopfloor", name: "MES · Execute", action: "The same record reaches the floor.", record: "Released inputs, approved steps and readings extend the lot history." },
    { building: "laboratories", name: "QMS · Release", action: "One decision reaches everyone.", record: "Signed quality release updates the stock that sales and dispatch use." },
  ],
};

export function ProductLandscape({ slug }: { slug: string }) {
  const places = PLACES[slug];
  const { active, setActive, regionRef } = useVisualCycle(places.length, 4000, { pauseOnFocus: "keyboard" });
  const identity = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" ? (index + 1) % places.length
      : event.key === "ArrowLeft" ? (index + places.length - 1) % places.length
        : event.key === "Home" ? 0 : event.key === "End" ? places.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return <div ref={regionRef} className={styles.landscape}>
    <ProductHeroScene slug={slug} active={active} stages={places} />
    <div className={styles.tabs} role="tablist" aria-label="Product workflow">
      {places.map((place, index) => <button key={place.name} type="button" role="tab" id={`${identity}-place-${index}`} aria-selected={active === index} aria-controls={`${identity}-story`} tabIndex={active === index ? 0 : -1} ref={element => { buttons.current[index] = element; }} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}><i aria-hidden="true" /><span>{place.name}</span></button>)}
    </div>
    <div id={`${identity}-story`} role="tabpanel" aria-labelledby={`${identity}-place-${active}`} tabIndex={0} className={styles.caption}>
      <div key={active} className={styles.captionCopy}>
        <p className={styles.captionTitle}>{places[active].action}</p>
        <p className={styles.captionDescription}>{places[active].record}</p>
      </div>
    </div>
  </div>;
}
