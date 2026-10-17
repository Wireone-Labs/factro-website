"use client";

import { useId, useRef, type CSSProperties } from "react";
import { Bell, ChevronRight, MousePointer2 } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { PILLAR_TICKETS } from "@/data/pillar-tickets";
import { COMPLIANCE_CONTROLS } from "@/data/compliance";
import { INDUSTRIES, controlStandards } from "@/data/industries";
import { PillarIntelligence } from "./pillar-intelligence";
import { TicketApprovalPreview } from "./ticket-approval-preview";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./three-pillars.module.css";

const CONTROL_FILE_PROFILES = [
  { title: "FDA 21 CFR Part 11", code: "UNITED STATES", tone: "blue" },
  { title: "EU Annex 11", code: "EUROPEAN UNION", tone: "teal" },
  { title: "Revised Schedule M", code: "INDIA", tone: "ochre" },
  { title: "WHO GMP", code: "GLOBAL", tone: "violet" },
  { title: "PIC/S GMP", code: "REGULATORY FRAMEWORK", tone: "rose" },
];

const PHARMA_FILES = CONTROL_FILE_PROFILES.map(file => ({
  ...file,
  points: COMPLIANCE_CONTROLS.filter(control => control.standards.includes(file.title === "EU Annex 11" ? "EU Annex 11 / EU GMP" : file.title === "WHO GMP" ? "WHO" : file.title)).map(control => control.text),
}));

const CONTROL_SENTENCES = [
  ["Audit trails retain the previous value.", "The new value stays with the change.", "Every change identifies its author.", "Timestamps preserve the sequence of events.", "The reason stays with each change.", "Hash chains connect audit entries."],
  ["GxP records cannot be hard-deleted.", "Records remain immutable.", "Secure archives retain the evidence."],
  ["Every approval identifies its signer.", "Each signature records its time.", "The meaning stays with the signature."],
  ["Roles determine access to each record.", "Permissions extend to individual fields."],
  ["The maker cannot act as checker.", "The system enforces separation of duties."],
  ["Linked records retain their source context.", "Upstream records remain traceable.", "Data lineage follows the record end to end."],
  ["MFR instructions govern execution.", "BMR preserves batch evidence.", "BPR preserves packaging evidence."],
  ["SOPs follow controlled approval workflows.", "Document revisions retain their version history."],
  ["Stock rotation follows FIFO and FEFO.", "Hold and quarantine status govern material use.", "Release status stays attached to the lot."],
  ["QC sampling starts at goods receipt.", "IPQC and finished-goods results stay linked.", "Approved test results support COA generation."],
  ["Detected deviations route into CAPA.", "Every action has an owner and a due date."],
  ["Approval rights follow assigned roles.", "Sign-off requires re-authentication."],
  ["Production records identify each batch.", "Material lots stay linked to the batch.", "Vendor qualification stays with the supply."],
  ["Validation retains URS traceability.", "IQ records installation evidence.", "OQ records operational evidence.", "PQ records performance evidence.", "Traceability matrices connect validation."],
  ["Audit evidence can be exported on demand.", "Exports present records in inspector-readable form."],
  ["Training links to the approved document version.", "Revisions trigger reassignment of training."],
  ["Records retain attributable sources.", "ALCOA+ controls support data integrity.", "Records remain available for review."],
  ["Teams schedule and record self-inspections.", "Annual Product Quality Review stays connected."],
  ["Automated backups provide redundant copies.", "Recovery supports a selected point in time."],
  ["Quality risks stay in a structured register.", "FMEA scores support risk assessment."],
  ["Site controls separate food and drug operations.", "Equipment segregation follows the manufacturing area."],
];

const INDUSTRY_CONTROL_DETAILS: [string, string[]][] = [
  ["Re-authenticated approvals", CONTROL_SENTENCES[2]],
  ["Medical device file assembled", ["Specifications stay in the device file.", "Manufacturing and packaging records join the file.", "Labelling and servicing information remain connected."]],
  ["Design and development file", ["Design inputs and outputs stay together.", "Reviews retain their supporting evidence.", "Verification and validation remain traceable.", "Design transfer stays in the development file."]],
  ["Design change traceability", ["Design changes reach the risk file.", "Affected released records stay linked to the change."]],
  ["Risk management file", ["The risk file retains each control measure.", "Controls link to the process steps that implement them."]],
  ["Device batch and unit records", ["Device records retain batch and unit identity.", "Material genealogy follows the device.", "Process genealogy stays with production records."]],
  ["Management review, internal audit", ["Management reviews retain their records.", "Internal and supplier audits stay access-controlled.", "Audit records follow retention controls."]],
  ["Supplier qualification", ["Supplier qualification retains audit history.", "Re-qualification is scheduled against the supplier."]],
  ["Nonconformity and CAPA", ["Nonconformities link to corrective actions.", "Each CAPA has an owner and a due date.", "Effectiveness is reviewed before closure."]],
  ["Process validation and equipment", ["Process validation retains qualification evidence.", "IQ, OQ and PQ stay linked.", "Equipment calibration history remains available."]],
  ["HACCP plan as an executable", ["Hazards stay in the executable HACCP plan.", "Control measures remain recorded.", "Critical control points are defined in the plan.", "Validated critical limits stay with the records."]],
  ["CCP monitoring tasks", ["Monitoring follows the frequency in the plan.", "Every monitoring task has a named owner."]],
  ["Corrective action bound", ["Corrective actions identify the affected product.", "The affected batch or time window stays on hold.", "Product disposition is recorded."]],
  ["Prerequisite programme records", ["Hygiene records stay in the programme.", "Pest-control evidence remains available.", "Sanitation and maintenance records stay connected."]],
  ["Allergen status travelling", ["Allergen status travels with each material.", "Changeover is controlled between incompatible runs.", "Cleaning is enforced before the next run."]],
  ["Traceability lot codes", ["Incoming traceability lot codes are received.", "Codes survive material transformation.", "Lot identity passes to the next operation."]],
  ["One-up, one-back", ["Every lot identifies its supplier.", "Every lot links to its customer."]],
  ["Mock recall as a scheduled", ["Mock recalls run as scheduled exercises.", "The trace and reconciliation are recorded.", "Elapsed recall time stays with the exercise."]],
  ["Product Information File", ["The Product Information File is assembled continuously.", "The file stays retained after the last batch reaches market."]],
  ["Retained samples", ["Retained samples are tracked as inventory.", "Sample location and quantity stay visible.", "Every sample links to its parent batch."]],
];

function expandControl(text: string) {
  const sharedIndex = COMPLIANCE_CONTROLS.findIndex(control => control.text === text);
  if (sharedIndex >= 0) return CONTROL_SENTENCES[sharedIndex];
  return INDUSTRY_CONTROL_DETAILS.find(([prefix]) => text.startsWith(prefix))?.[1] ?? [text];
}

const INDUSTRY_FILES = [
  { industry: "medical-devices", title: "ISO 13485", standard: "ISO 13485", tone: "teal" },
  { industry: "food-beverage", title: "FSSAI Schedule 4", standard: "FSSAI Schedule 4", tone: "ochre" },
  { industry: "cosmetics", title: "ISO 22716", standard: "ISO 22716", tone: "violet" },
  { industry: "nutraceuticals", title: "21 CFR Part 111", standard: "21 CFR 111", tone: "rose" },
  { industry: "food-beverage", title: "Codex HACCP", standard: "Codex HACCP", tone: "blue" },
].map(profile => {
  const industry = INDUSTRIES.find(item => item.id === profile.industry)!;
  const controls = industry.controls.filter(control => controlStandards(industry, control).includes(profile.standard));
  return { ...profile, code: industry.name.toUpperCase(), points: controls.flatMap(control => expandControl(control.text)), count: controls.length };
});

const PHARMA_PREVIEWS = PHARMA_FILES.map(file => ({ ...file, count: file.points.length, points: file.points.flatMap(expandControl) }));
const CONTROL_FILES = [PHARMA_PREVIEWS[0], ...INDUSTRY_FILES, ...PHARMA_PREVIEWS.slice(1)];

function ComplianceVisual() {
  const { active, regionRef } = useVisualCycle(CONTROL_FILES.length, 5000, { pauseOnHover: false, pauseOnFocus: "never" });
  const entered = useInView(regionRef, { once: true, amount: .25 });
  const files = [...Array.from({ length: 4 }, (_, index) => CONTROL_FILES[(active + index + 1) % CONTROL_FILES.length]), CONTROL_FILES[active]];
  return <>
    <div ref={regionRef} className={styles.fileStack} data-entered={entered}>
      {files.map((file, index) => <div key={file.title} className={styles.controlFile} data-front={index === files.length - 1} data-tone={file.tone} style={{ "--file-index": index } as CSSProperties}>
        <div className={styles.documentMeta}>{file.code}<span>CONTROLS</span></div>
        <h4>{file.title}</h4>
        {index === files.length - 1 && <>
          <ul className={styles.controlRows}>{file.points.map(point => <li key={point}>{point}</li>)}</ul>
          <div className={styles.documentFoot}>{file.points.length} CONTROL POINTS<span>{active + 1}/{CONTROL_FILES.length}</span></div>
        </>}
      </div>)}
    </div>
  </>;
}


const PREVIEW_TICKETS = [
  { ...PILLAR_TICKETS[0], id: "TKT-0263", title: "Approve rate change on purchase order PO-11", owner: "IH", team: "Inamul Hasan", due: "9 Oct · 18:00", sla: "Due today", checks: ["Raise purchase request PR-0031", "Purchase order PO-11"], notification: "PO-11 has a rate change above the 5% band.", notificationLabel: "Approval requested", department: "Purchase", source: "Purchase order PO-11", step: "Approve change", next: "Finance", action: "Review purchase order" },
  { ...PILLAR_TICKETS[2], notification: "TP-04 is on hold. Review the request.", notificationLabel: "Calibration overdue", department: "Facility", source: "Tablet press TP-04", step: "Calibration", next: "Equipment release", action: "Review calibration" },
  { ...PILLAR_TICKETS[3], notification: "Lot RM-1042 is due for retest tomorrow.", notificationLabel: "Retest reminder", department: "Inventory", source: "Material lot RM-1042", step: "Material retest", next: "Lot release", action: "Review retest" },
  { ...PILLAR_TICKETS[5], notification: "B-2281 is ready for your QA review.", notificationLabel: "Batch ready for review", department: "Quality", source: "Batch B-2281", step: "Batch review", next: "Batch release", action: "Review batch" },
];

const TICKET_STEPS = 9;

function OrchestratorVisual() {
  const { active, regionRef } = useVisualCycle(PREVIEW_TICKETS.length * TICKET_STEPS, 1100, { pauseOnHover: false, pauseOnFocus: "never" });
  const reducedMotion = useReducedMotion();
  const selected = Math.floor(active / TICKET_STEPS);
  const step = active % TICKET_STEPS;
  const phase = reducedMotion ? "open" : step === 0 ? "notification" : step === 1 ? "click" : "open";
  const task = PREVIEW_TICKETS[selected];
  const id = useId();
  return <>
    <div ref={regionRef} className={styles.taskCollection} data-phase={phase} data-ticket={task.id}>
      <div className={styles.taskStage}>
        <AnimatePresence mode="wait" initial={false}>
          {phase === "notification" || phase === "click" ? <motion.div key={`notification-${task.id}`} className={styles.notificationScene}
            initial={{ opacity: 0, x: 20, y: 12, scale: .94 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: .92 }}
            transition={{ duration: reducedMotion ? 0 : .3 }}>
            <div className={styles.ticketNotification}>
              <span className={styles.notificationIcon}><Bell size={15} aria-hidden="true" /></span>
              <span className={styles.notificationContent}>
                <span className={styles.notificationMeta}><span>Factro</span><span>Just now</span></span>
                <strong>{task.notificationLabel}</strong>
                <span className={styles.notificationMessage}>{task.notification}</span>
              </span>
              <ChevronRight className={styles.notificationChevron} size={12} aria-hidden="true" />
            </div>
            {phase === "click" && <span className={styles.notificationCursor} aria-hidden="true"><span /><MousePointer2 size={28} /></span>}
          </motion.div> : <motion.div key={`ticket-${task.id}`} id={`${id}-ticket`} className={styles.taskCard} data-tone={task.tone} data-expanded="true" role="region" aria-label={`${task.title} ticket`}
            initial={{ opacity: 0, y: 22, scale: .88 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: .96 }}
            transition={{ duration: reducedMotion ? 0 : .45, ease: [.22, 1, .36, 1] }}>
          <TicketApprovalPreview task={task} />
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  </>;
}


export function PillarVisual({ kind }: { kind: string }) {
  const regionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(regionRef);
  const description = kind === "compliance-engine" ? "Illustration of regulatory profiles and their built-in controls."
    : kind === "orchestrator" ? "Illustration of notifications becoming assigned tickets with linked records and conversations."
    : "Illustration of the AI assistant connecting equipment history, batch records and CAPA evidence for human review.";
  return <div ref={regionRef} className={styles.visual} data-kind={kind} data-running={inView} role="img" aria-label={description}>
    <div aria-hidden="true" inert>
      {kind === "compliance-engine" ? <ComplianceVisual /> : kind === "orchestrator" ? <OrchestratorVisual /> : <div className={styles.duoPhone}>
        <div className={styles.phone}>
          <div className={styles.phoneScreen}>
            <div className={styles.phoneStatus}><span>9:41</span><span className={styles.phoneIsland} /><span className={styles.phoneSignal}>▮▮▮ <span /></span></div>
            <div className={styles.phoneContent}><PillarIntelligence /></div>
            <span className={styles.phoneHome} />
          </div>
        </div>
      </div>}
    </div>
  </div>;
}
