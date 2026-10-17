import { ArrowLeft, ArrowUpRight, Check, ChevronDown, ChevronRight, ChevronUp, Circle, CircleDot, FileText, LockKeyhole, MessageSquare, MoreHorizontal, ShieldCheck, Users, X } from "lucide-react";
import type { PILLAR_TICKETS } from "@/data/pillar-tickets";
import styles from "./ticket-approval-preview.module.css";

type PreviewTask = typeof PILLAR_TICKETS[number] & {
  department: string;
  source: string;
  step: string;
  next: string;
  action: string;
  notificationLabel: string;
};

const REVIEW_ROWS: Record<string, string[][]> = {
  "TKT-0263": [
    ["Rate · Lactose monohydrate", "₹112 / kg", "₹118 / kg", "+5.4%"],
    ["Order amount", "₹2.28 L", "₹2.40 L", "+₹12,600"],
  ],
  "MNT-0842": [
    ["Calibration", "Overdue", "Certificate for review", "QA review"],
    ["Equipment availability", "On hold", "Awaiting approval", "Hold retained"],
  ],
  "INV-1042": [
    ["Material lot", "RM-1042", "QC sample booked", "Retest due"],
    ["Stock location", "WH-01 / A-04", "125 kg remaining", "Review before use"],
  ],
  "QA-2281": [
    ["Batch evidence", "B-2281", "Record + IPQC attached", "QA review"],
    ["Reconciliation", "Material consumption", "Reconciled", "Signature pending"],
  ],
};

export function TicketApprovalPreview({ task }: { task: PreviewTask }) {
  const purchase = task.id === "TKT-0263";
  return <>
    <header className={styles.header}>
      <span><ChevronUp /><ChevronDown /><i />My work <b>/</b> {task.department} <b>/</b> <FileText />{task.step}</span>
      <span><Users />Share<MoreHorizontal /><X /></span>
    </header>
    <div className={styles.layout}>
      <div className={styles.main}>
        <div className={styles.identity}><span><CircleDot />Approval<ChevronDown /></span><small>{task.id}</small><small><LockKeyhole />Workflow-governed</small><strong><ArrowUpRight />{task.source}</strong></div>
        <h4>{task.title}</h4>
        <dl className={styles.fields}>
          <dt>Status</dt><dd><span className={styles.status}>In progress<ChevronRight /></span></dd>
          <dt>Assignee</dt><dd><span className={styles.avatar}>{task.owner}</span>{task.team}</dd>
          <dt>Due</dt><dd>{task.due}</dd><dt>Raised by</dt><dd>{purchase ? "Factro, on rate change" : "Linked source record"}</dd>
          <dt>Source record</dt><dd>{task.source}<ArrowUpRight /></dd><dt>Approval</dt><dd>Review and sign</dd>
          <dt>Raised by rule</dt><dd>{purchase ? "Rate over 5% band" : task.notificationLabel}</dd><dt>Department</dt><dd>{task.department}</dd>
        </dl>
        <section className={styles.review}>
          <header><FileText /><strong>What you are approving</strong><span>{task.source}</span></header>
          <table><thead><tr><th>Field</th><th>Was</th><th>Now</th><th>Review</th></tr></thead><tbody>
            {REVIEW_ROWS[task.id].map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}
          </tbody></table>
          <div className={styles.context}>{purchase ? <><span>Last price<strong>₹114 · Mehta, Jan</strong></span><span>12-month average<strong>₹116 / kg</strong></span><span>Attached<strong>QT-V-0045</strong></span></> : <><span>Source<strong>{task.source}</strong></span><span>Evidence<strong>{task.checks[0]}</strong></span></>}</div>
        </section>
        <div className={styles.sectionLabel}><ChevronDown /><strong>Workflow</strong><span>Next step follows your signed decision</span></div>
        <div className={styles.workflow}><span><Check />{purchase ? "Purchase request" : "Raised"}</span><ChevronRight /><span><Check />{purchase ? "Purchase order" : "Evidence attached"}</span><ChevronRight /><span data-current><CircleDot />This approval</span><ChevronRight /><span>{task.next}</span></div>
        <div className={styles.sectionLabel}><ChevronDown /><strong>Related tickets</strong><span>1 of 2 done</span><i /></div>
        <table className={styles.related}><thead><tr><th>Name</th><th>Relation</th><th>Status</th><th>Owner</th></tr></thead><tbody>
          <tr><td><Check />{task.checks[0]}</td><td>Upstream</td><td><span>Completed</span></td><td><span className={styles.avatar}>{task.owner}</span></td></tr>
          <tr><td><Circle />{task.next}</td><td>Next</td><td><span data-pending>Not started</span></td><td><span className={styles.avatar}>{purchase ? "PD" : "QA"}</span></td></tr>
        </tbody></table>
      </div>
      <aside className={styles.approval}>
        <header><strong><ShieldCheck />Approval</strong><span><MessageSquare />Conversation</span></header>
        <div className={styles.approvalBody}>
          <p className={styles.waiting}>Waiting for you <span>{task.sla}</span></p>
          <ol className={styles.reviewers}>
            <li><Check /><span className={styles.avatar}>{purchase ? "AS" : "PR"}</span><span><strong>{purchase ? "Arjun S." : "Record owner"}</strong><small>Submitted for approval</small></span></li>
            <li data-current><CircleDot /><span className={styles.avatar}>{task.owner}</span><span><strong>You, {task.team}</strong><small>Review now</small></span></li>
            <li><Circle /><span className={styles.avatar}>{purchase ? "PD" : "QA"}</span><span><strong>{purchase ? "Priya D." : "Next approver"}</strong><small>{task.next} · Next</small></span></li>
          </ol>
          <p className={styles.rule}>{purchase ? "Rate more than 5% above the last price needs the purchase head, then finance." : task.description}</p>
          <strong className={styles.decisionLabel}>Your decision</strong>
          <div className={styles.decision} data-tone="green"><Check /><span><strong>Approve</strong><small>Sign and move to the next step.</small></span></div>
          <div className={styles.decision} data-tone="amber"><ArrowLeft /><span><strong>Send back</strong><small>Return to the owner with a note.</small></span></div>
          <div className={styles.decision} data-tone="red"><X /><span><strong>Reject</strong><small>Keep the current record unchanged.</small></span></div>
          <p className={styles.note}>Note for the record. Needed to send back or reject.</p>
        </div>
        <footer><span><Check />Choose a decision</span><small><LockKeyhole />You sign in the next step.</small></footer>
      </aside>
    </div>
  </>;
}
