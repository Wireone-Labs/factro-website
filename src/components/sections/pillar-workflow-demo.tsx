"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, FileText, LockKeyhole, Workflow } from "lucide-react";
import type { PillarWorkflowStep } from "@/data/pillar-pages";
import styles from "./pillar-detail.module.css";

export function PillarWorkflowDemo({ steps }: { steps: PillarWorkflowStep[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const step = steps[active];
  return <div className={styles.workflowDemo}>
    <div className={styles.workflowRail} aria-label="Workflow stages">
      {steps.map((item, index) => <button key={item.label} type="button" className={styles.stageButton} aria-pressed={active === index} aria-controls={`${id}-detail`} onClick={() => setActive(index)}>
        <span className={styles.stageNumber}>{String(index + 1).padStart(2, "0")}</span>
        <span><strong>{item.label}</strong><small>{item.status}</small></span>
        <ArrowRight size={16} />
      </button>)}
    </div>
    <div id={`${id}-detail`} className={styles.workflowDetail} aria-live="polite" aria-atomic="true" data-tone={step.tone}>
      <div className={styles.recordHeader}><span className={styles.recordStatus}>{step.tone === "amber" ? <LockKeyhole size={14} /> : step.tone === "green" ? <Check size={14} /> : <Workflow size={14} />}{step.status}</span></div>
      <div key={active} className={styles.recordBody}>
        <h3>{step.title}</h3><p>{step.description}</p>
        <ul className={styles.records}>{step.records.map(record => <li key={record}><FileText size={16} /><span>{record}</span><ArrowRight size={14} aria-hidden="true" /></li>)}</ul>
      </div>
      <div className={styles.recordFooter}>Context stays with the record.<span>{active + 1} / {steps.length}</span></div>
    </div>
  </div>;
}
