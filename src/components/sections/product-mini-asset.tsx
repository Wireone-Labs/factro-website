"use client";

import { useContext, type CSSProperties } from "react";
import { ArrowRight, Check, FileCheck2, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import type { ProductSlug } from "@/data/product-detail-content";
import { useVisualCycle } from "./use-visual-cycle";
import { ProductPanelContext } from "./product-scroll-section";
import styles from "./product-mini-asset.module.css";

type Asset = {
  title: string;
  reference: string;
  kind: "records" | "flow" | "bars" | "timeline" | "matrix" | "document";
  labels: string[];
  details: string[];
  metric: [string, string];
  note: string;
  values?: number[];
};

const ASSETS: Record<string, Asset> = {
  sales: { title: "From enquiry to commitment", reference: "SO-0142 · Meridian Pharma", kind: "flow", labels: ["Enquiry", "Feasibility", "Quote", "Confirmed"], details: ["Product brief", "Capacity checked", "Price approved", "Credit verified"], metric: ["4 / 4", "order checks"], note: "The customer record stays with every handover." },
  warehouse: { title: "A place and status for every lot", reference: "Warehouse · WH-01", kind: "records", labels: ["Lactose · RM-1042", "Starch · RM-1043", "Packing · PM-0281"], details: ["A-04 · Released", "B-02 · Quarantine", "C-06 · Released"], metric: ["FEFO", "pick sequence"], note: "Only released stock is available for issue." },
  vendors: { values: [96, 89, 93, 82], title: "Know the vendor before the PO", reference: "Approved vendor list", kind: "bars", labels: ["Sahyadri", "Mehta", "Northstar", "Aster"], details: ["96%", "89%", "93%", "82%"], metric: ["90%", "on-time, in-full"], note: "Delivery performance comes from actual receipts." },
  "price-trends": { values: [112, 114, 116, 118], title: "Price and lead time, together", reference: "Lactose · Purchase history", kind: "bars", labels: ["Apr", "May", "Jun", "Jul"], details: ["₹112", "₹114", "₹116", "₹118"], metric: ["+5.4%", "rate change"], note: "A rate outside the configured band routes for approval." },
  genealogy: { title: "Follow one lot, both ways", reference: "LOT-LM-0848 · Trace map", kind: "flow", labels: ["Supplier lot", "Receipt", "Batch", "Dispatch"], details: ["LM-0848", "GRN-0042", "B-2281", "SO-0142"], metric: ["1 record", "end-to-end lineage"], note: "Receipts, quality decisions and movements stay connected." },
  planning: { title: "A plan built on real capacity", reference: "Production week · Line 01", kind: "timeline", labels: ["Dispensing", "Granulation", "Compression", "Packing"], details: ["08:00", "10:00", "13:00", "15:00"], metric: ["3 batches", "scheduled today"], note: "Material and equipment readiness checked before release." },
  execution: { title: "The instruction at the right step", reference: "B-2281 · Stage execution", kind: "flow", labels: ["Material", "Line clearance", "Execute", "Sign"], details: ["QC released", "Verified", "SOP-014", "Second person"], metric: ["03 / 04", "stage in progress"], note: "The next step waits for its checks and signatures." },
  "exhibit-orders": { title: "Three runs. One proven process.", reference: "EX-0018 · Formulation trial", kind: "records", labels: ["Trial 01", "Trial 02", "Trial 03"], details: ["Yield 98.1% · Passed", "Yield 98.6% · Passed", "Yield 98.3% · Passed"], metric: ["3 / 3", "consecutive trials"], note: "QA and R&D review the evidence before master approval." },
  deviations: { title: "An investigation with its history", reference: "DEV-0046 · Compression", kind: "flow", labels: ["Observation", "History", "Impact", "Action"], details: ["Force excursion", "TP-04 records", "Batches linked", "Owner assigned"], metric: ["3 records", "related evidence"], note: "The event, affected lots and investigation share one trail." },
  performance: { values: [96, 88, 82, 94], title: "See where the batch loses time", reference: "Shop floor · Plan vs actual", kind: "bars", labels: ["Dispense", "Blend", "Compress", "Pack"], details: ["96%", "88%", "82%", "94%"], metric: ["90%", "sample stage yield"], note: "Compare the plan with actual quantity, time and yield." },
  capa: { title: "Closure follows the evidence", reference: "CAPA-0032 · Quality event", kind: "flow", labels: ["Investigate", "Assign", "Implement", "Verify"], details: ["Root cause", "Owner + due date", "Action evidence", "Effectiveness"], metric: ["1 open", "effectiveness check"], note: "A completed action is not yet an effective CAPA." },
  training: { title: "Current training. Eligible operators.", reference: "Competency matrix · SOP-014", kind: "matrix", labels: ["Arjun S.", "Priya D.", "Inamul H.", "Meera K."], details: ["Read", "Assess", "Observe", "Eligible"], metric: ["12 / 14", "current operators"], note: "A revised SOP triggers the required retraining." },
  documents: { title: "One effective version", reference: "SOP-014 · Revision 04", kind: "document", labels: ["Purpose & scope", "Line clearance", "Execution checks", "Review & approval"], details: ["Production · Compression", "Room, equipment and materials", "Record each critical parameter", "QA approved · Effective"], metric: ["Rev 04", "controlled document"], note: "The approved version appears where the work happens." },
  release: { title: "Release on evidence, not memory", reference: "Batch release · B-2281", kind: "records", labels: ["Batch record", "Laboratory results", "Deviation review"], details: ["Signatures complete", "Results within specification", "QA review pending"], metric: ["2 / 3", "conditions satisfied"], note: "Release waits until every configured condition is met." },
  lims: { title: "Every result has a source", reference: "Sample AR-0280 · Paracetamol", kind: "records", labels: ["Assay", "Dissolution", "Related substances"], details: ["99.2% · HPLC-02", "97.8% · DT-01", "Within limit · HPLC-02"], metric: ["3 tests", "linked to this sample"], note: "The sample, method and instrument stay with the result." },
  holds: { title: "One hold reaches the whole plant", reference: "Quality hold · RM-1042", kind: "flow", labels: ["QC hold", "Stores", "Planning", "Dispatch"], details: ["OOS opened", "Issue blocked", "Batch flagged", "Order flagged"], metric: ["1 decision", "shared everywhere"], note: "No email, interface or overnight synchronisation." },
  costing: { values: [180, 42, 12, 28], title: "Cost from the work that happened", reference: "B-2281 · Batch costing", kind: "bars", labels: ["Material", "Process", "Quality", "Packing"], details: ["₹1.8L", "₹42k", "₹12k", "₹28k"], metric: ["₹2.62L", "actual batch cost"], note: "Purchase prices meet dispensing quantities and yield." },
  "plant-view": { values: [12, 24, 8, 6], title: "One view across the operation", reference: "Plant overview · Today", kind: "bars", labels: ["Orders", "Material", "Batches", "Release"], details: ["12", "24", "08", "06"], metric: ["4 teams", "one shared record"], note: "Every summary connects to the record behind it." },
};

const DEFAULTS: Record<ProductSlug, string> = { erp: "sales", mes: "planning", qms: "release", one: "plant-view" };
const ROLE_ASSETS: Record<ProductSlug, string[]> = {
  erp: ["sales", "sales", "vendors", "warehouse", "execution", "costing"],
  mes: ["planning", "execution", "execution", "execution", "exhibit-orders", "exhibit-orders", "performance"],
  qms: ["lims", "lims", "capa", "release", "documents", "training", "documents"],
  one: ["plant-view", "costing", "release", "genealogy", "planning", "costing", "documents"],
};

export function ProductMiniAsset({ product, feature, roleIndex, title, paused = false }: { product: ProductSlug; feature?: string; roleIndex?: number; title?: string; paused?: boolean }) {
  const key = feature ?? (roleIndex === undefined ? DEFAULTS[product] : ROLE_ASSETS[product][roleIndex]);
  const asset = ASSETS[key] ?? ASSETS[DEFAULTS[product]];
  const panelActive = useContext(ProductPanelContext);
  const { active, regionRef } = useVisualCycle(asset.labels.length, 2600, { paused: paused || !panelActive });

  return <div ref={regionRef} className={styles.asset} data-product={product} data-native-asset>
    <div className={styles.window}><span><i /><i /><i /></span><ShieldCheck size={14} aria-hidden="true" /></div>
    <div className={styles.body}>
      <header><span className={styles.reference}>{asset.reference}</span><h4>{title ?? asset.title}</h4></header>
      <div className={styles.metric}><strong>{asset.metric[0]}</strong><span>{asset.metric[1]}</span><span className={styles.signal}><i />Connected</span></div>
      <div className={styles.canvas} key={`${key}-${title ?? ""}`}>
        {asset.kind === "flow" && <ol className={styles.flow}>{asset.labels.map((label, index) => <li key={label} data-active={index === active}><span className={styles.node}>{key === "holds" ? <LockKeyhole size={19} /> : index < active ? <Check size={19} /> : <Network size={19} />}</span><strong>{label}</strong><small>{asset.details[index]}</small>{index < asset.labels.length - 1 && <ArrowRight className={styles.connector} size={17} aria-hidden="true" />}</li>)}</ol>}
        {asset.kind === "records" && <div className={styles.records}>{asset.labels.map((label, index) => <div key={label} data-active={index === active}><span className={styles.recordIcon}><FileCheck2 size={19} aria-hidden="true" /></span><strong>{label}</strong><span>{asset.details[index]}</span></div>)}</div>}
        {asset.kind === "bars" && <div className={styles.chart}>{asset.labels.map((label, index) => <div key={label} data-active={index === active}><span>{asset.details[index]}</span><div className={styles.track}><i style={{ "--bar-height": `${(asset.values?.[index] ?? 0) / Math.max(...(asset.values ?? [1])) * 90}%` } as CSSProperties} /></div><small>{label}</small></div>)}</div>}
        {asset.kind === "timeline" && <div className={styles.timeline}><div className={styles.hours}>{asset.details.map(time => <span key={time}>{time}</span>)}</div>{asset.labels.map((label, index) => <div key={label} data-active={index === active}><span>{label}</span><div><i style={{ marginLeft: `${index * 18}%`, width: `${32 - index * 3}%` }} /></div></div>)}</div>}
        {asset.kind === "matrix" && <table className={styles.matrix}><thead><tr><th scope="col">Operator</th>{asset.details.map(detail => <th scope="col" key={detail}>{detail}</th>)}</tr></thead><tbody>{asset.labels.map((label, index) => <tr key={label} data-active={index === active}><th scope="row">{label}</th>{asset.details.map((detail, column) => <td key={detail}>{index === 2 && column > 1 ? <span className={styles.pending} aria-label="Pending">—</span> : <Check size={14} aria-label="Complete" />}</td>)}</tr>)}</tbody></table>}
        {asset.kind === "document" && <div className={styles.document}>{asset.labels.map((label, index) => <div key={label} data-active={index === active}><span>0{index + 1}</span><div><strong>{label}</strong><small>{asset.details[index]}</small></div><Check size={14} aria-hidden="true" /></div>)}</div>}
      </div>
      <footer><FileCheck2 size={15} aria-hidden="true" /><span>{asset.note}</span></footer>
    </div>
  </div>;
}
