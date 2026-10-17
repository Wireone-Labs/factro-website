import type { ProductSlug } from "./product-detail-content";

export type PreviewState = "done" | "current" | "blocked" | "waiting";
export type PreviewRow = { label: string; detail: string; state: PreviewState };
export type EnginePreview = {
  kind: "control" | "work" | "chart";
  title: string;
  reference: string;
  status: string;
  rows: PreviewRow[];
  chart?: "line" | "bars" | "stacked" | "ring" | "horizontal";
  values?: number[];
  labels?: string[];
  metric?: string;
  note: string;
};

function row(label: string, detail: string, state: PreviewState): PreviewRow { return { label, detail, state }; }
function control(title: string, reference: string, status: string, note: string, ...rows: PreviewRow[]): EnginePreview {
  return { kind: "control", title, reference, status, note, rows };
}
function work(title: string, reference: string, status: string, note: string, ...rows: PreviewRow[]): EnginePreview {
  return { kind: "work", title, reference, status, note, rows };
}
function chart(title: string, chart: EnginePreview["chart"], metric: string, values: number[], labels: string[], note: string): EnginePreview {
  return { kind: "chart", title, reference: "FACTRO AI", status: "Connected to records", note, rows: [], chart, metric, values, labels };
}

export const PRODUCT_ENGINE_PREVIEWS: Record<ProductSlug, EnginePreview[][]> = {
  erp: [
    [
      control("Purchase order", "PO-1148 · Lactose", "Order blocked", "Approval required before this order can proceed.", row("Approved vendor list", "Vendor not qualified", "blocked"), row("Drug licence", "Valid until Dec 2026", "done"), row("GMP certificate", "Verified", "done")),
      control("Material receipt", "GRN-0428 · RM-1042", "Quarantine", "Stock is visible. Issue stays locked until release.", row("Sample collected", "AR-2098 assigned", "done"), row("QC disposition", "Rejected · assay", "blocked"), row("Put-away destination", "Reject store only", "current")),
      control("Sales order", "SO-0094 · Medisure", "Licence expired", "The order cannot be confirmed with an expired licence.", row("Customer licence", "Expired 6 Oct", "blocked"), row("Approved price list", "PL-West-2026", "done"), row("Released stock", "1,200 packs available", "done")),
    ],
    [
      work("Rate change approval", "TKT-0263 · PO-11", "In progress", "₹112 → ₹118 / kg · +5.4% against the last rate", row("Arjun S.", "Raised with rate history", "done"), row("Purchase head", "Review price variance", "current"), row("Finance", "Signs after purchase", "waiting")),
      work("QC sampling request", "TKT-0418 · GRN-0428", "Assigned", "The receipt, sample and result share one record.", row("Stores", "Receipt recorded", "done"), row("QC analyst", "AR-2098 · sample due", "current"), row("QA reviewer", "Disposition next", "waiting")),
      work("Lot disposal", "TKT-0542 · LOT-0086", "Awaiting QA", "Expiry evidence and stock history are attached.", row("Storekeeper", "Disposal requested", "done"), row("QA head", "Review disposition", "current"), row("Finance", "Approve write-off", "waiting")),
    ],
    [
      chart("Lactose price history", "line", "₹118 / kg", [38, 44, 39, 58, 50, 62, 55, 88], ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"], "+5.4% vs last purchase · source: PO history"),
      chart("Vendor OTIF", "bars", "85% on time", [94, 90, 85, 68], ["Mehta", "Sahyadri", "Nova", "Zenith"], "Zenith is below target on 3 recent receipts."),
      chart("Stock nearing expiry", "horizontal", "3 lots to review", [84, 62, 35], ["RM-1042", "RM-0861", "RM-0527"], "No open demand · earliest expiry in 18 days"),
    ],
  ],
  mes: [
    [
      control("Batch step · mixing", "B-2281 · Stage 03", "Next step locked", "Sign-off opens only after every prerequisite passes.", row("Operator training", "SOP-MIX-04 · current", "done"), row("Equipment clearance", "MX-04 · released", "done"), row("IPQC result", "Verification pending", "blocked")),
      control("Dispensing check", "DIS-0316 · B-2281", "Issue held", "Only QC-released material reaches the floor.", row("Material status", "LOT-0086 · quarantine", "blocked"), row("BOM tolerance", "25.0 kg ± 0.2 kg", "done"), row("Second-person check", "Required before issue", "waiting")),
      control("In-process reading", "B-2281 · Compression", "Limit exceeded", "The reading travels with the deviation.", row("Hardness result", "9.2 kp · limit 6–8 kp", "blocked"), row("Deviation created", "DEV-0046 linked", "done"), row("QA disposition", "Review required", "current")),
    ],
    [
      work("Shift handover", "HND-0082 · Line 02", "3 open items", "The incoming shift starts with the same batch context.", row("IPQC sign-off", "QC analyst · due now", "current"), row("Deviation DEV-0046", "QA review requested", "waiting"), row("Next-batch cleaning", "Shift B · 18:00", "waiting")),
      work("Line clearance", "CLN-0194 · Room 04", "Awaiting sign-off", "Previous product and cleaning evidence are attached.", row("Equipment cleaning", "Completed · 14:20", "done"), row("Line clearance", "Supervisor verification", "current"), row("Batch start", "Opens after signature", "waiting")),
      work("Plan change", "PLN-0178 · B-2281", "Material on hold", "One stock hold reaches the planner and sales.", row("QC hold", "LOT-0086 flagged", "done"), row("Production planner", "Review next available slot", "current"), row("Sales team", "Order risk notified", "done")),
    ],
    [
      chart("Deviation history", "bars", "6 related events", [16, 28, 24, 36, 42, 86], ["May", "Jun", "Jul", "Aug", "Sep", "Oct"], "Same line and step · CAPA-0302 linked"),
      chart("OEE loss by cause", "bars", "71% OEE", [83, 59, 39, 22], ["Cleaning", "Material", "Changeover", "Other"], "Cleaning accounts for the largest availability loss."),
      chart("Batch time by stage", "stacked", "18 h waiting", [68, 81, 56, 93, 74], ["B-2278", "B-2279", "B-2280", "B-2281", "B-2282"], "Material · execution · release · waiting"),
    ],
  ],
  qms: [
    [
      control("Batch release", "B-2281 · QA review", "Release held", "A signed disposition is required before release.", row("Finished-product tests", "12 of 12 recorded", "done"), row("Deviation DEV-0046", "Disposition pending", "blocked"), row("Certificate of analysis", "Ready for review", "done")),
      control("Training eligibility", "SOP-QC-08 · Revision 04", "Signature held", "The current SOP must be completed before this step.", row("Role assignment", "QC analyst", "done"), row("SOP assessment", "Revision 04 overdue", "blocked"), row("Retraining ticket", "TRN-0184 assigned", "current")),
      control("Instrument readiness", "BAL-003 · Balance", "Out of service", "Unavailable for new tests until calibration is approved.", row("Calibration due", "Overdue · 8 Oct", "blocked"), row("Calibration request", "CAL-0062 assigned", "current"), row("Test record", "Status retained", "done")),
    ],
    [
      work("CAPA actions", "CAPA-0302 · Mixing", "2 of 3 complete", "Closure waits for a signed effectiveness check.", row("Root cause", "QA approved", "done"), row("Corrective action", "Production completed", "done"), row("Effectiveness check", "QA head · 24 Oct", "current")),
      work("OOS investigation", "OOS-0041 · AR-2098", "Phase I open", "The original result and specification stay attached.", row("Out-of-spec result", "Assay · 94.6%", "done"), row("Lab investigation", "QC lead assigned", "current"), row("Phase II / CAPA", "Based on findings", "waiting")),
      work("SOP revision", "SOP-QC-08 · Revision 04", "In review", "Approval publishes the revision and raises training.", row("Document owner", "Revision submitted", "done"), row("QA approver", "Review changes", "current"), row("Training assignments", "Generated on approval", "waiting")),
    ],
    [
      chart("Compliance readiness", "ring", "82", [82, 12, 6], ["Covered", "In progress", "Open gaps"], "Open gaps linked to their source records."),
      chart("Recurring deviations", "bars", "4 repeat patterns", [88, 61, 42, 26, 12], ["Mixing", "Packing", "Lab", "Stores", "Other"], "Repeat events after CAPA closure, grouped by area."),
      chart("Evidence coverage", "horizontal", "88% covered", [96, 89, 82, 74], ["Training", "Calibration", "Batch records", "CAPA"], "Coverage by control area · records, not spreadsheets"),
    ],
  ],
  one: [
    [
      control("Shared material hold", "LOT-0086 · QMS → ERP → MES", "Hold propagated", "One decision. Every dependent action sees it.", row("Stores issue", "Blocked by QC hold", "blocked"), row("Batch packing", "B-2281 paused", "blocked"), row("Sales order", "SO-0094 flagged", "current")),
      control("Material specification", "SPEC-1042 · Revision 03", "One approved version", "Every team reads the same approved specification.", row("Goods receipt", "Identity and acceptance", "done"), row("Laboratory", "Tests and limits", "done"), row("Dispensing", "Weights and tolerance", "done")),
      control("Shared competency", "SOP-GMP-04 · Revision 02", "Training required", "One training record gates work across the plant.", row("Production step", "Current SOP required", "blocked"), row("Lab signature", "Same competency check", "blocked"), row("Retraining", "Assigned across roles", "current")),
    ],
    [
      work("Connected handover", "B-2281 · Receipt to release", "At QA review", "No exports, re-entry or missing handover context.", row("Stores → Production", "Material issued and consumed", "done"), row("Production → QA", "Batch record ready", "current"), row("QA → Dispatch", "Awaits release signature", "waiting")),
      work("My approvals", "One queue · All products", "3 need attention", "Every approval carries its source record and SLA.", row("Purchase rate", "PO-11 · Purchase", "current"), row("Batch release", "B-2281 · Quality", "current"), row("SOP revision", "SOP-QC-08 · Documents", "waiting")),
      work("Record conversation", "TKT-0549 · B-2281", "Answer attached", "The question and answer stay with the batch.", row("Production", "Can we use the revised timing?", "done"), row("QA reviewer", "Use revision 03. Linked here.", "done"), row("Next shift", "Record available at handover", "current")),
    ],
    [
      chart("Cost per batch", "bars", "₹2.40 L", [74, 78, 71, 83, 75, 87], ["2277", "2278", "2279", "2280", "2281", "2282"], "Actual consumption, purchase rate and yield on one record"),
      chart("Where batches wait", "stacked", "23 h to recover", [78, 64, 91, 74, 85], ["Stores", "Dispense", "Make", "QA", "Dispatch"], "Time traced to the team and record where it started"),
      chart("Plant readiness", "ring", "82", [82, 12, 6], ["Covered", "In progress", "Open gaps"], "One score across ERP, MES and QMS"),
    ],
  ],
};
