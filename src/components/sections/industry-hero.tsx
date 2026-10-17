"use client";

import { Check, FileCheck2, LockKeyhole, ShieldCheck } from "lucide-react";
import { IndustryProduct } from "./industry-illustration";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./industry-hero.module.css";

const SCENES: Record<string, { label: string; title: string; stages: string[]; kind: string }> = {
  pharmaceuticals: { label: "BATCH B-2281", title: "The evidence travels with the batch.", stages: ["Manufacturing record", "Laboratory results", "Signed QA release"], kind: "release" },
  "medical-devices": { label: "DEVICE MD-0418", title: "Every serial has a history.", stages: ["Component acceptance", "Assembly history", "Device release"], kind: "serial" },
  "food-beverage": { label: "LINE 02 · CHANGEOVER", title: "Clear the line. Protect the next run.", stages: ["Previous product", "Allergen clearance", "Next product"], kind: "clearance" },
  nutraceuticals: { label: "INGREDIENT RM-1042", title: "Identity before issue.", stages: ["Sample received", "Identity verified", "Lot released"], kind: "analysis" },
  cosmetics: { label: "FORMULA · REVISION 04", title: "The formula is the source of truth.", stages: ["Formula version", "Ingredient limits", "Approved master"], kind: "formula" },
  veterinary: { label: "PREMIX VT-0928", title: "Trace every ingredient to its use.", stages: ["Supplier lot", "Premix batch", "Species & market"], kind: "trace" },
  "api-cdmo": { label: "API-0836 · CUSTOMER BATCH", title: "Process evidence, ready for review.", stages: ["Process parameters", "Yield reconciliation", "Customer review pack"], kind: "process" },
};

export function IndustryHero({ industry, controls, standards }: { industry: string; controls: number; standards: string[] }) {
  const scene = SCENES[industry];
  const { active, regionRef } = useVisualCycle(3, 2900);
  return <div ref={regionRef} className={styles.hero} data-kind={scene.kind} data-native-asset>
    <div className={styles.halo} aria-hidden="true" />
    <div className={styles.object} aria-hidden="true"><svg viewBox="0 -15 140 160" fill="none" stroke="#90a5b5" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round"><ellipse cx="68" cy="130" rx="61" ry="13" fill="#91a9bf15" stroke="none" /><IndustryProduct industry={industry} /></svg></div>
    <div className={styles.panel}>
      <header><span>{scene.label}</span><FileCheck2 size={15} aria-hidden="true" /></header><h3>{scene.title}</h3>
      {scene.kind === "serial" && <div className={styles.serials} aria-hidden="true">{Array.from({length: 12}, (_,index) => <span key={index} data-active={index % 3 === active}>{String(418 + index).padStart(5,"0")}</span>)}</div>}
      {(scene.kind === "analysis" || scene.kind === "process") && <div className={styles.chart} aria-hidden="true"><svg viewBox="0 0 260 86" fill="none"><path d="M0 20H260M0 48H260M0 76H260" stroke="#e7ecf2" /><path d={scene.kind === "analysis" ? "M0 74L35 74L43 54L48 74L81 74L96 10L110 74L145 74L159 43L169 74L215 74L226 63L235 74L260 74" : "M0 68L20 62L40 66L60 41L80 49L100 30L120 36L140 20L160 31L180 18L200 26L220 17L240 23L260 18"} stroke="currentColor" strokeWidth="2" /><circle cx={[96,159,226][active]} cy={[10,43,63][active]} r="4" fill="currentColor" opacity={scene.kind === "analysis" ? 1 : 0} /></svg></div>}
      {scene.kind === "formula" && <div className={styles.formula} aria-hidden="true">{["Base", "Actives", "Fragrance"].map((label,index) => <div key={label}><span>{label}</span><i style={{ width: `${[84, 56, 25][index]}%` }} data-active={active === index} /></div>)}</div>}
      <ol className={styles.stages}>{scene.stages.map((stage,index) => <li key={stage} data-active={active === index}><span>{index < active ? <Check size={12} /> : `0${index + 1}`}</span><strong>{stage}</strong><i /></li>)}</ol>
      <div className={styles.pack}><ShieldCheck size={16} aria-hidden="true" /><div><strong>{controls} configured controls</strong><span>{standards.slice(0,3).join(" · ")}</span></div></div>
    </div>
    <div className={styles.signature}><LockKeyhole size={15} aria-hidden="true" /><span>One controlled record</span><i /></div>
    <span className={styles.example}>Frameworks, not certifications</span>
  </div>;
}
