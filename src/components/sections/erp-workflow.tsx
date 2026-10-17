"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, BadgeCheck, PackageCheck, ShoppingCart, Warehouse } from "lucide-react";
import { Container } from "@/components/ui/container";
import styles from "./erp-workflow.module.css";

const STAGES = [
  {
    name: "Buy right",
    area: "Purchase & vendor qualification",
    icon: ShoppingCart,
    title: "A better supply chain starts before the PO.",
    description: "Know who you’re buying from, what they’re approved to supply, and whether they deliver on their commitments.",
    steps: [
      ["Qualify the source", "Check licences and material-wise vendor approvals before buying."],
      ["Connect the commitment", "Keep the purchase request, order and vendor bill in one chain."],
      ["Measure what arrives", "Follow receipt-based OTIF, quality performance and material price trends."],
    ],
    handoff: "Stores receives an approved order, not a trail of emails.",
    module: "purchase",
    link: "Explore purchase",
  },
  {
    name: "Receive with control",
    area: "GRN, sampling & quality status",
    icon: PackageCheck,
    title: "On the shelf isn’t the same as ready to use.",
    description: "Start sampling at receipt. Keep every lot’s identity, location and quality standing together, before anything reaches production.",
    steps: [
      ["Identify the receipt", "Create the stock control and analytical references against the incoming material."],
      ["Sample against the master", "Use material-specific sampling tests and approved specifications."],
      ["Respect the quality decision", "Keep unapproved material out of use, with its status visible to stores."],
    ],
    handoff: "The quality status travels with the lot, not in a separate register.",
    module: "inventory",
    link: "Explore inventory",
  },
  {
    name: "Keep stock moving",
    area: "Warehouse & stock ledger",
    icon: Warehouse,
    title: "Know what you have. And where it can go.",
    description: "Give every receipt, transfer and issue a place in the stock ledger. Act on retest and expiry reminders before they become production delays.",
    steps: [
      ["Locate every lot", "Organise stores by warehouse, zone and location, with quality status in view."],
      ["Control every movement", "Keep relocation, stock audits and code-to-code transfers accountable."],
      ["Stay ahead of shortages", "Use reorder points, lead times and retest reminders to plan the next move."],
    ],
    handoff: "The next team sees the material’s location and standing together.",
    module: "storage",
    link: "Explore warehouse",
  },
  {
    name: "Close the order",
    area: "Sales, invoicing & collection",
    icon: BadgeCheck,
    title: "Keep the promise. Keep the whole history.",
    description: "Connect the customer’s enquiry to the quotation, order, invoice and payment. No separate spreadsheet to reconstruct the commercial story.",
    steps: [
      ["Know the customer", "Keep licences, brand books and approved pricing with the commercial relationship."],
      ["Invoice from the source", "Carry the order into invoicing. Enable e-invoices and e-way bills on request."],
      ["Complete the collection", "Allocate payments and credit notes to the invoice they belong to."],
    ],
    handoff: "From the first enquiry to the final receipt, the context stays connected.",
    module: "sales",
    link: "Explore sales",
  },
];

export function ErpWorkflow() {
  const [active, setActive] = useState(0);
  const identity = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "Home" ? 0 : event.key === "End" ? STAGES.length - 1
      : event.key === "ArrowRight" ? (index + 1) % STAGES.length
      : event.key === "ArrowLeft" ? (index + STAGES.length - 1) % STAGES.length : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <section id="workflow" className={styles.workflow} aria-labelledby="erp-workflow-title">
    <Container>
      <div className={styles.intro}>
        <div><p className={styles.eyebrow}>The business behind every batch</p><h2 id="erp-workflow-title">Buy with confidence.<br /><span>Move with certainty.</span></h2></div>
        <p>From qualified suppliers to collected payments, keep the commercial and material sides of your plant in step.</p>
      </div>
      <div className={styles.tabs} role="tablist" aria-label="Explore the ERP workflow">
        {STAGES.map((stage, index) => <button key={stage.name} ref={element => { tabs.current[index] = element; }} type="button" role="tab" id={`${identity}-tab-${index}`} aria-selected={active === index} aria-controls={`${identity}-panel-${index}`} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={event => navigate(event, index)}>
          <span className={styles.station}><stage.icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
          <span className={styles.tabLabel}><small>0{index + 1}</small>{stage.name}</span>
        </button>)}
      </div>
      {STAGES.map((stage, index) => <div key={stage.name} role="tabpanel" id={`${identity}-panel-${index}`} aria-labelledby={`${identity}-tab-${index}`} hidden={active !== index} tabIndex={0} className={styles.panel}>
        <div className={styles.panelGrid}>
          <div className={styles.statement}>
            <span className={styles.watermark} aria-hidden="true">0{index + 1}</span>
            <p className={styles.eyebrow}>{stage.area}</p>
            <h3>{stage.title}</h3>
            <p className={styles.description}>{stage.description}</p>
            <a href={`#${stage.module}`} className={styles.textLink}>{stage.link}<ArrowRight size={16} aria-hidden="true" /></a>
          </div>
          <ol className={styles.steps}>{stage.steps.map(([title, detail], stepIndex) => <li key={title} style={{ animationDelay: `${stepIndex * 80}ms` }}>
            <span className={styles.stepNumber} aria-hidden="true">0{stepIndex + 1}</span><div><h4>{title}</h4><p>{detail}</p></div>
          </li>)}</ol>
        </div>
        <p className={styles.handoff}><ArrowRight size={19} aria-hidden="true" /><span>{stage.handoff}</span></p>
      </div>)}
    </Container>
  </section>;
}
