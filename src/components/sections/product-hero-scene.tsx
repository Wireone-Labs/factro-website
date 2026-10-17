import { BadgeCheck, Check, ClipboardCheck, FileCheck2, FlaskConical, History, LockKeyhole, MapPin, PackageCheck, SearchCheck, ShieldCheck, Truck, UserCheck, type LucideIcon } from "lucide-react";
import { PlantBuilding } from "./continuum-journey";
import { ProductWorkIllustration, type ProductWorkScene } from "./product-work-illustration";
import styles from "./product-hero-scene.module.css";

export type ProductHeroStage = {
  name: string;
  building?: "office" | "warehouse" | "shopfloor" | "laboratories" | "delivery";
  scene?: ProductWorkScene;
};

type MaterialRecord = {
  reference: string;
  title: string;
  item: string;
  detail: string;
  facts: [string, string][];
  icon: LucideIcon;
};

const MATERIAL_RECORDS: MaterialRecord[] = [
  {
    reference: "PURCHASE ORDER · PO-011",
    title: "Material, accounted for.",
    item: "Lactose monohydrate",
    detail: "300 kg · Sahyadri Chem",
    facts: [["Vendor", "QA approved"], ["Rate", "₹118 / kg"], ["Receipt", "GRN-0042"]],
    icon: PackageCheck,
  },
  {
    reference: "STOCK RECORD · GRN-0042",
    title: "Every lot, in its place.",
    item: "Lactose monohydrate",
    detail: "300 kg · Lot LAC-0926",
    facts: [["Location", "Stores A · Bin 03"], ["Quality", "Released"], ["Movement", "Put-away recorded"]],
    icon: PackageCheck,
  },
  {
    reference: "DISPATCH · DN-0142",
    title: "Ready for dispatch.",
    item: "Order SO-0142",
    detail: "Meridian Pharma · B-2281",
    facts: [["Quality", "QA released"], ["Invoice", "INV-0142"], ["Delivery bay", "Departed"]],
    icon: Truck,
  },
];

const EXECUTION_RECORDS = [
  { reference: "PRODUCTION PLAN · LINE 01", title: "Capacity meets the batch." },
  { reference: "DISPENSING · BATCH B-2281", title: "The right lot. The right weight." },
  { reference: "BATCH RECORD · B-2281", title: "The work becomes the record." },
];

const QUALITY_RECORDS = [
  { reference: "LAB RESULTS · AR-0042", title: "Test in context", detail: "Sample → method → result", icon: FlaskConical, checks: ["Sample linked to its lot", "Approved method in use", "Results in specification"] },
  { reference: "INVESTIGATION · CAPA-0032", title: "Follow the cause", detail: "Evidence → action → proof", icon: SearchCheck, checks: ["Deviation and evidence linked", "Corrective action assigned", "Effectiveness check recorded"] },
  { reference: "BATCH B-2281 · REVIEW", title: "Release gate", detail: "Evidence before approval", icon: ShieldCheck, checks: ["Current batch record", "Results in specification", "QA decision recorded"] },
];

type HeroPointer = [LucideIcon, string, string];

const HERO_POINTERS: Record<string, HeroPointer[][]> = {
  erp: [
    [[ShieldCheck, "Licence current", "Checked before purchase"], [UserCheck, "Vendor qualified", "QA approval for this material"], [BadgeCheck, "Rate approved", "Matched to the purchase order"]],
    [[MapPin, "Location assigned", "Stores A · Bin 03"], [ShieldCheck, "Quality released", "Available for issue"], [History, "History connected", "Every lot movement recorded"]],
    [[ShieldCheck, "QA released", "Signed batch decision"], [FileCheck2, "Invoice attached", "INV-0142 · SO-0142"], [Truck, "Delivery recorded", "Customer and lot stay linked"]],
  ],
  mes: [
    [[PackageCheck, "Material ready", "Released lots on the plan"], [ClipboardCheck, "Capacity checked", "Rooms and equipment available"], [BadgeCheck, "Master approved", "Current MPCR and MFR"]],
    [[PackageCheck, "Lot confirmed", "Released material selected"], [BadgeCheck, "Weight in tolerance", "25.000 kg against the target"], [UserCheck, "Second check signed", "Independent verification"]],
    [[ShieldCheck, "Line cleared", "Room and equipment ready"], [UserCheck, "Operator eligible", "Training current for the step"], [FileCheck2, "Step signed", "Evidence on the batch record"]],
  ],
  qms: [
    [[PackageCheck, "Sample linked", "Material and batch in context"], [FlaskConical, "Method approved", "Current specification in use"], [FileCheck2, "Result recorded", "Instrument and analyst linked"]],
    [[SearchCheck, "Cause investigated", "Deviation history in view"], [UserCheck, "Action assigned", "Owner and due date recorded"], [BadgeCheck, "Effectiveness checked", "Evidence before CAPA closure"]],
    [[FileCheck2, "Record complete", "Required signatures captured"], [FlaskConical, "Tests reviewed", "Results in specification"], [ShieldCheck, "Release signed", "QA decision on the batch"]],
  ],
};

function HeroPointers({ product, index }: { product: string; index: number }) {
  return <div className={styles.pointers} data-side={product === "mes" ? "left" : "right"}>
    {HERO_POINTERS[product][index].map(([Icon, title, detail], pointerIndex) => <div className={styles.pointer} key={title} style={{ animationDelay: `${.15 + pointerIndex * .12}s` }}><Icon size={18} aria-hidden="true" /><div><strong>{title}</strong><small>{detail}</small></div></div>)}
  </div>;
}

function StageIllustration({ stage, className }: { stage: ProductHeroStage; className: string }) {
  return <div className={className} data-hero-illustration={stage.building ?? stage.scene} aria-hidden="true">
    {stage.building && <PlantBuilding type={stage.building} />}
    {stage.scene && <ProductWorkIllustration scene={stage.scene} />}
  </div>;
}

function MaterialScene({ index, stage }: { index: number; stage: ProductHeroStage }) {
  const record = MATERIAL_RECORDS[index];
  const Icon = record.icon;

  return <>
    <StageIllustration stage={stage} className={styles.warehouse} />
    <div className={`${styles.paper} ${styles.purchase}`}>
      <span>{record.reference}</span>
      <h3>{record.title}</h3>
      <div className={styles.lineItem}><Icon size={22} aria-hidden="true" /><div><strong>{record.item}</strong><small>{record.detail}</small></div></div>
      <dl>{record.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </div>
    <HeroPointers product="erp" index={index} />
  </>;
}

function ExecutionScene({ index, stage }: { index: number; stage: ProductHeroStage }) {
  const record = EXECUTION_RECORDS[index];

  return <>
    <div className={`${styles.paper} ${styles.schedule}`}>
      <span>{record.reference}</span><h3>{record.title}</h3>
      {index === 0 && <div className={styles.scheduleRows}>{["B-2281", "B-2282", "B-2283"].map((batch, batchIndex) => <div key={batch}><small>{batch}</small><div><i style={{ marginLeft: `${batchIndex * 23}%`, width: "40%", animationDelay: `${batchIndex * .25}s` }} /></div></div>)}</div>}
      {index === 1 && <div className={styles.dispensingRecord}>
        <div className={styles.weight}><strong>25.000 <small>kg</small></strong><span>Target 25.000 kg · Within tolerance</span></div>
        <div className={styles.weightTrack}><i /></div>
        <div className={styles.signatures}><span><Check size={12} />Dispensed</span><span><Check size={12} />Verified</span></div>
      </div>}
      {index === 2 && <div className={styles.stepRecord}>{["Line clearance signed", "Mixing parameters captured", "Batch step completed"].map((label, stepIndex) => <div key={label} style={{ animationDelay: `${stepIndex * .5}s` }}><Check size={13} aria-hidden="true" /><span>{label}</span><FileCheck2 size={13} aria-hidden="true" /></div>)}</div>}
    </div>
    <StageIllustration stage={stage} className={styles.floor} />
    <HeroPointers product="mes" index={index} />
  </>;
}

function QualityScene({ index, stage }: { index: number; stage: ProductHeroStage }) {
  const record = QUALITY_RECORDS[index];
  const Icon = record.icon;

  return <>
    <StageIllustration stage={stage} className={styles.lab} />
    <div className={styles.releaseSeal}><Icon size={36} aria-hidden="true" /><strong>{record.title}</strong><small>{record.detail}</small></div>
    <div className={`${styles.paper} ${styles.quality}`}>
      <span>{record.reference}</span>
      {record.checks.map((label, checkIndex) => <div key={label} className={styles.condition} style={{ animationDelay: `${checkIndex * .65}s` }}><Check size={15} aria-hidden="true" /><span>{label}</span><FileCheck2 size={15} aria-hidden="true" /></div>)}
    </div>
    <HeroPointers product="qms" index={index} />
  </>;
}

export function ProductHeroScene({ slug, active, stages }: { slug: string; active: number; stages: ProductHeroStage[] }) {
  return <div className={styles.scene} data-product={slug} data-native-asset>
    <div className={styles.grid} aria-hidden="true" />
    {slug !== "one" && stages.map((stage, index) => <div key={stage.name} className={styles.frame} data-active={active === index} data-hero-stage={stage.name} aria-hidden={active !== index} inert={active !== index}>
      {slug === "erp" && <MaterialScene index={index} stage={stage} />}
      {slug === "mes" && <ExecutionScene index={index} stage={stage} />}
      {slug === "qms" && <QualityScene index={index} stage={stage} />}
    </div>)}
    {slug === "one" && <>
      <svg className={styles.connections} viewBox="0 0 600 430" fill="none" aria-hidden="true"><path d="M120 130L300 222L474 100M300 222L440 356" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 7" /></svg>
      <div className={`${styles.suiteBuilding} ${styles.receive}`} data-active={active === 0}><PlantBuilding type="warehouse" /><span>ERP · Receive</span></div>
      <div className={`${styles.suiteBuilding} ${styles.make}`} data-active={active === 1}><PlantBuilding type="shopfloor" /><span>MES · Execute</span></div>
      <div className={`${styles.suiteBuilding} ${styles.release}`} data-active={active === 2}><PlantBuilding type="laboratories" /><span>QMS · Release</span></div>
      <div className={styles.core}><LockKeyhole size={25} /><strong>One record</strong><small>No copies. No reconciliation.</small></div>
    </>}
  </div>;
}
