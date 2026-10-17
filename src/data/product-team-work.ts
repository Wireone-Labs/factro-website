type TeamWork = {
  title: string;
  steps: [string, string][];
  handoff: string;
};

export const PRODUCT_TEAM_WORK: Record<string, TeamWork[]> = {
  erp: [
    { title: "Find it. Check it. Issue it.", steps: [["Locate the lot", "Warehouse, zone and bin—not another walk around stores."], ["Check its standing", "Release status, expiry and retest dates in the same view."], ["Record the movement", "Issues, returns and transfers update the stock ledger."]], handoff: "Production receives the lot and its history, not a separate stock update." },
    { title: "Buy from the right source. Before stock runs short.", steps: [["Qualify the vendor", "Material-specific approvals, licences and requalification."], ["Follow the commitment", "Requests, purchase orders and lead times stay connected."], ["Review performance", "OTIF, quality results and rejections on the vendor record."]], handoff: "Stores receives the approved order and the facts needed at receipt." },
    { title: "Make a promise your stock can keep.", steps: [["Check the customer", "Drug-licence standing follows onboarding into the order."], ["Allocate released stock", "See the lot and its availability before committing dispatch."], ["Close the order", "Keep invoices, e-way bills and delivery linked."]], handoff: "Accounts inherits the transaction. The customer retains a traceable shipment." },
    { title: "Close the books without rebuilding the operation.", steps: [["Match the source", "Vendor bills checked against purchase orders and receipts."], ["See what is outstanding", "Receivables, payables and payments stay with their invoices."], ["Export mapped vouchers", "Approved transactions reach Tally without re-keying."]], handoff: "Your statutory books stay in Tally. Their source evidence stays in Factro." },
  ],
  mes: [
    { title: "Run the step. The record comes with it.", steps: [["Open the approved instruction", "The master and its SOP are attached to the work."], ["Capture at the source", "Record quantities and readings while the batch runs."], ["Verify and sign", "Second-person checks and signatures stay on the step."]], handoff: "The next operator receives the completed work and any open exception." },
    { title: "Know what is ready before the shift starts.", steps: [["See the floor", "Cleared, cleaning, active and blocked rooms together."], ["Resolve the hold", "Follow clearances and unfinished handovers to their owners."], ["Keep the shift moving", "Check execution progress without walking every line."]], handoff: "The next shift gets the batch context, not a verbal reconstruction." },
    { title: "Plan against the floor you actually have.", steps: [["Check real capacity", "Workcentres, shifts and released material inform the plan."], ["See readiness gaps", "Calibration and maintenance coverage before scheduling."], ["Review the run", "Follow yield, progress and deviations against the batch."]], handoff: "QA receives execution evidence already attached to the batch record." },
    { title: "Keep equipment ready—and its history intact.", steps: [["Plan maintenance", "Intervals and time windows remain on the asset."], ["Respond to breakdowns", "Connect downtime and corrective work to the machine."], ["Keep the readings", "Sensor history retains room, equipment and time context."]], handoff: "Production sees equipment standing before the next batch is scheduled." },
  ],
  qms: [
    { title: "Spend your attention on the exceptions.", steps: [["Open one checklist", "Execution, tests, clearances and calibration together."], ["Resolve what is missing", "Review open deviations and their supporting evidence."], ["Make the decision", "Sign with re-authentication and a recorded meaning."]], handoff: "The release decision stays with the batch and its evidence." },
    { title: "Close the cause, not just the ticket.", steps: [["Connect the signal", "Deviations retain the batch, material and equipment context."], ["Own the correction", "Assigned actions, due dates and evidence across departments."], ["Prove effectiveness", "A signed review is required before CAPA closes."]], handoff: "The original finding and proof of the fix remain connected." },
    { title: "The new SOP reaches the people who use it.", steps: [["Control the revision", "Approved versions retain their history and signatures."], ["Reassign training", "A revision creates the relevant training assignments."], ["Check readiness", "Untrained operators are held from governed work."]], handoff: "The floor uses the approved procedure with qualified people." },
    { title: "See your readiness. Not a pile of reports.", steps: [["Review the gaps", "Evidence, qualification and open quality work in view."], ["Direct the follow-up", "Named owners and escalation keep action accountable."], ["Follow the evidence", "Decisions link back to the records behind them."]], handoff: "Inspection preparation starts with connected records, not document collection." },
  ],
};
