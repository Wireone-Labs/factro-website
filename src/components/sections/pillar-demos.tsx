"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUp, BookOpen, Check, CheckCircle2, FileCheck2, FileText, LockKeyhole, MessageSquare, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";
import styles from "./pillars-page.module.css";

const CONDITIONS = ["Full testing on receipt, not reduced", "Retest before use if held over 90 days", "CoA for every lot, on the new template", "Vendor batch record summary with every lot"];
const FRAMEWORKS = ["Revised Schedule M", "21 CFR Part 11", "EU Annex 11", "PIC/S GMP", "ICH Q10"];
const INDUSTRIES = ["Pharmaceuticals", "Nutraceuticals", "Medical devices", "Food"];
const AGENTS = [
  {
    title: "Compliance Checker", icon: ShieldCheck, question: "Why did readiness on UNIT-TAB-01 drop this week?",
    records: [["Equipment history", "Tablet press CMP-03"], ["Batch records", "BID-0008-09-25-01 and BID-0008-09-25-02"], ["In-process testing", "Comparing IPQC 5.1 results with their limits"], ["Readiness signals", "GAP-0040"], ["Previous actions", "CAPA-0034"]],
    answer: "Readiness on UNIT-TAB-01 fell from 77 to 70 after tablet press CMP-03 passed its calibration date on Oct 1 and ran two batches before it was recalibrated on Oct 7. The batches need a documented impact assessment. Their hardness and weight checks stayed within limits, but that does not close the equipment gap. A similar lapse in March points to an ownership gap in CAPA-0034.",
    heading: "Reconstruct the sequence, not the inbox",
    detail: "Equipment history supplies the calibration dates; the batch records show where CMP-03 was used. Readiness signals show the score change, and the earlier CAPA supplies the recurrence context. Check exact times and each batch’s approval status in the source records before acting.",
  },
  {
    title: "Deviation Analyst", icon: TriangleAlert, question: "Has this calibration deviation happened before?",
    records: [["Current deviation", "DEV-0447 · CMP-03 calibration lapse"], ["Equipment history", "CMP-03 calibration and maintenance"], ["Previous investigation", "March calibration lapse"], ["Corrective action", "CAPA-0034 · reminder introduced"], ["Affected batches", "BID-0008-09-25-01 and BID-0008-09-25-02"]],
    answer: "The equipment history contains an earlier calibration lapse in March. CAPA-0034 introduced a reminder, but the current deviation shows that the reminder alone did not prevent recurrence. Review responsibility for calibration, escalation and equipment availability before deciding whether a new corrective action is needed.",
    heading: "Test the earlier fix against the new evidence",
    detail: "Compare the previous action’s effectiveness criteria with the current event. Keep the two affected batch records in the impact assessment. These links are starting points for the investigation, not an automatic root-cause determination.",
  },
  {
    title: "Assistant", icon: MessageSquare, question: "Which batches need QA attention before release?",
    records: [["Release queue", "UNIT-TAB-01 · open review items"], ["Batch record", "BID-0008-09-25-01"], ["Batch record", "BID-0008-09-25-02"], ["Equipment standing", "CMP-03 · calibration history"], ["Open investigation", "DEV-0447 · impact assessment required"]],
    answer: "Two batches in this sample queue need QA attention: BID-0008-09-25-01 and BID-0008-09-25-02. Both used CMP-03 during the calibration gap. Their in-process results are within limits, but the equipment impact assessment is still required before a release decision.",
    heading: "Bring the decision back to the record",
    detail: "Open each batch’s release checklist, review the equipment history and confirm the investigation status. The authorised QA reviewer owns the release decision; this answer does not sign, release or change either batch.",
  },
];

export function ApprovalDemo() {
  const [conditions, setConditions] = useState([CONDITIONS[0], CONDITIONS[2]]);
  const [decision, setDecision] = useState("conditions");
  const [reviewed, setReviewed] = useState(false);
  const identity = useId();
  return <div className={styles.approvalSurface}>
    <div className={styles.approvalCard}>
      <header><div className={styles.previewTags}><span>Purchase order</span><span data-tone="amber">Waiting for QA</span></div><h3>PO-16 · Povidone K30, 25 kg</h3><p>Sahyadri Chem Traders. Raised Oct 7 by Sanjay K. for PLN-12.</p></header>
      <div className={styles.approvalBody}>
        <p className={styles.microLabel}>What QA checks</p>
        <ul className={styles.checkList}>{[["Material has an approved specification", "SPC-RM-009, revision 2"], ["Vendor is on the approved list for this material", "AVL-PRM-09, since Mar 2025"], ["Vendor is conditional", "Updated CoA template pending. QA signs each order until it arrives."], ["Quantity matches the plan", "24 kg needed for PLN-12, 1 kg overage"], ["Time for QC before use", "Arrives Oct 14, needed Oct 17. 3 days for testing."]].map(([title,detail],index) => <li key={title} data-warning={index === 2}>{index === 2 ? <TriangleAlert size={14} /> : <CheckCircle2 size={14} />}<div><strong>{title}</strong><span>{detail}</span></div></li>)}</ul>
        <fieldset className={styles.conditions}><legend>Conditions sent with the order</legend>{CONDITIONS.map(condition => <label key={condition}><input type="checkbox" checked={conditions.includes(condition)} onChange={() => { setReviewed(false); setConditions(previous => previous.includes(condition) ? previous.filter(item => item !== condition) : [...previous, condition]); }} /><span>{condition}</span></label>)}</fieldset>
        <fieldset className={styles.decisions}><legend>Your decision</legend>{[["approve", "Approve", "Purchase can send it as raised."], ["conditions", "Approve with conditions", "Send it with the conditions ticked above."], ["reject", "Reject", "Back to Purchase with your reason."]].map(([value,label,detail]) => <label key={value} data-selected={decision === value}><input type="radio" name={`${identity}-decision`} value={value} checked={decision === value} onChange={() => { setDecision(value); setReviewed(false); }} /><span><strong>{label}</strong><small>{detail}</small></span></label>)}</fieldset>
      </div>
      <footer><span><LockKeyhole size={12} />Signing requires your password.</span><button type="button" onClick={() => setReviewed(true)}><Check size={14} />Preview decision</button></footer>
      {reviewed && <p className={styles.decisionResult} role="status">Sample decision: {decision === "reject" ? "return to Purchase for a recorded reason" : decision === "conditions" ? `approve with ${conditions.length} ${conditions.length === 1 ? "condition" : "conditions"}` : "approve as raised"}. In Factro, the authorised reviewer signs before anything changes. No live record has been changed.</p>}
    </div>
  </div>;
}

export function RulesetDemo() {
  const [frameworks, setFrameworks] = useState(FRAMEWORKS.slice(0,3));
  const [industry, setIndustry] = useState(INDUSTRIES[0]);
  return <div className={styles.ruleset}>
    <div role="group" aria-label="Illustrative frameworks"><p className={styles.microLabel}>Frameworks you select</p><div className={styles.optionChips}>{FRAMEWORKS.map(framework => <button key={framework} type="button" aria-pressed={frameworks.includes(framework)} onClick={() => setFrameworks(previous => previous.includes(framework) ? previous.filter(item => item !== framework) : [...previous, framework])}>{frameworks.includes(framework) && <Check size={12} />}{framework}</button>)}</div></div>
    <span className={styles.operator} aria-hidden="true">×</span>
    <div role="group" aria-label="Illustrative industry"><p className={styles.microLabel}>Your industry</p><div className={styles.optionChips}>{INDUSTRIES.map(option => <button key={option} type="button" aria-pressed={industry === option} onClick={() => setIndustry(option)}>{industry === option && <Check size={12} />}{option}</button>)}</div></div>
    <span className={styles.operator} aria-hidden="true">=</span>
    <aside className={styles.rulesetResult} aria-live="polite"><h3><BookOpen size={16} />Your ruleset</h3><p>{industry} · {frameworks.length ? frameworks.join(", ") : "No frameworks selected"}</p><div>{["Documentation", "Production", "Quality control", "Quality assurance", "Data integrity", "Training"].map(area => <span key={area}>{area}</span>)}</div><small>Not an applicability assessment.</small></aside>
  </div>;
}

export function AgentWindow() {
  const [active, setActive] = useState(0);
  const identity = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const agent = AGENTS[active];
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "Home" ? 0 : event.key === "End" ? AGENTS.length - 1 : event.key === "ArrowRight" ? (index + 1) % AGENTS.length : event.key === "ArrowLeft" ? (index + AGENTS.length - 1) % AGENTS.length : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus({ preventScroll: true });
  }
  return <div className={styles.agentWindow}>
    <header className={styles.agentHeader}><span><Sparkles size={20} /></span><div><strong>Factro AI</strong><small>Answers from your records</small></div><em>In development</em></header>
    <div className={styles.agentTabs} role="tablist" aria-label="AI agents">{AGENTS.map((item,index) => <button type="button" role="tab" aria-selected={active === index} aria-controls={`${identity}-panel`} id={`${identity}-tab-${index}`} tabIndex={active === index ? 0 : -1} ref={element => { buttons.current[index] = element; }} onKeyDown={event => navigate(event,index)} onClick={() => setActive(index)} key={item.title}><item.icon size={12} />{item.title}</button>)}</div>
    <p className={styles.agentContext}><FileText size={12} />On this page <strong>WO-0008, Ibuprofen 200 mg FC</strong><span>Sample records</span></p>
    <div className={styles.agentReport} id={`${identity}-panel`} role="tabpanel" aria-labelledby={`${identity}-tab-${active}`} tabIndex={0}>
      <p className={styles.prompt}>{agent.question}</p><h4><FileCheck2 size={14} />Followed {agent.records.length} records</h4><ul>{agent.records.map(([title,detail]) => <li key={`${title}-${detail}`}><Check size={15} /><span><strong>{title}</strong><small>{detail}</small></span><em>Reviewed</em></li>)}</ul><h4>The short answer</h4><p>{agent.answer}</p><h4>1. {agent.heading}</h4><p>{agent.detail}</p>
    </div>
    <div className={styles.agentComposer}><span>Ask about batches, deviations, stock or people…</span><small><span>● Connected to your records</span><ArrowUp size={14} /></small></div>
  </div>;
}
