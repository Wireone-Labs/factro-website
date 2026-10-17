import { Calculator, FlaskConical, GitBranch, LibraryBig, PackageCheck, ShieldCheck, Sparkles } from "lucide-react";
import styles from "./business-benefits.module.css";

const OUTCOMES = [
  { title: "Promise against released stock.", description: "Show sales what QC has approved, not just what sits on the shelf.", icon: PackageCheck },
  { title: "Trace a lot without stitching reports.", description: "Pull supplier lot, batch consumption and customer dispatch from one chain, ready when a recall question lands.", icon: GitBranch },
  { title: "Know what each batch really cost.", description: "Match purchase prices against actual floor consumption, so batch costing becomes a report instead of a spreadsheet.", icon: Calculator },
  { title: "Stop a failed test from travelling.", description: "Let stores, planning and dispatch see a QC failure the moment the lab records it.", icon: FlaskConical },
  { title: "Define every material once.", description: "Keep specs, BOMs and test methods in one Library that every module reads, so the warehouse and the lab never disagree on a spec.", icon: LibraryBig },
  { title: "Validate one system, not three plus interfaces.", description: "Walk inspectors through one audit trail and one validation package instead of three vendors and the middleware between them.", icon: ShieldCheck },
];

export function BusinessOutcomes() {
  return (
    <section id="business-outcomes" className={styles.section} aria-label="The benefits of a connected system">
      <ul className={styles.outcomes}>
        {OUTCOMES.map(outcome => (
          <li key={outcome.title}>
            <span className={styles.icon}><outcome.icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
            <div><h3>{outcome.title}</h3><p>{outcome.description}</p></div>
          </li>
        ))}
        <li id="included-upgrades" className={styles.includedRelease}>
          <span className={styles.icon}><Sparkles size={24} strokeWidth={1.6} aria-hidden="true" /></span>
          <div><h3>Pay once. Grow without upgrading.</h3><p>Get all three products, every new module and every regulatory pack on one subscription. No upgrade fees. No integration project.</p></div>
        </li>
      </ul>
    </section>
  );
}
