export const SYSTEM_GROUPS = [
  { name: "ERP", description: "Demand, purchasing & stock", modules: ["sales", "purchase", "inventory"] },
  { name: "MES", description: "Planning, execution & assets", modules: ["production", "facility"] },
  { name: "QMS", description: "Quality, actions & competency", modules: ["quality", "capa", "training"] },
  { name: "Shared foundation", description: "Controlled knowledge & master data", modules: ["documents", "library"] },
];

export const SYSTEM_CAPABILITIES: Record<string, { title: string; features: string[] }[]> = {
  sales: [
    { title: "Customers & pricing", features: ["Customer master & licence validity", "Credit limits & payment terms", "Customer price lists & discount rules", "Multi-currency conversion"] },
    { title: "Enquiries, quotations & orders", features: ["Enquiry-to-quotation conversion", "Quotation expiry reminders", "Sales orders linked to production batches", "Order-to-delivery tracking"] },
    { title: "Dispatch", features: ["Production-linked dispatch scheduling", "Batch allocation", "QA-release gate before dispatch"] },
    { title: "Billing & receivables", features: ["Order-linked invoicing; over-invoicing blocked", "Payments, ageing & overdue alerts", "Credit notes", "Sales returns linked to original orders"] },
  ],
  purchase: [
    { title: "Vendor management", features: ["Approved Vendor List (AVL)", "Vendor qualification & licence tracking", "Time-weighted OTIF performance", "Price & lead-time history", "Vendor compliance scores", "Supplier deviation rates"] },
    { title: "Requests, RFQs & orders", features: ["Floor requests & reorder-point triggers", "Request approval before ordering", "RFQs & vendor quotations", "Value-band approvals", "Purchase-order revision history", "Emergency purchase flags"] },
    { title: "Goods receipt", features: ["GRN & three-way matching", "Control number per container", "Automatic quarantine on receipt", "Return-to-vendor tracking"] },
    { title: "Spend & payments", features: ["Purchase invoices & order-linked payments", "Debit notes for vendor shortfalls", "Purchase-price variance", "Spend-versus-budget monitoring"] },
  ],
  inventory: [
    { title: "Stock & ledger", features: ["GRN-to-stock workflow", "Control-number & bin-level visibility", "Receipt, transfer, adjustment & issue history", "Returns & disposal audit trail", "Batch-wise stock valuation", "Cycle counts & reconciliation variance"] },
    { title: "Allocation & movement", features: ["FIFO / FEFO reservation & issuing", "Material requisition & dispensing", "Hold, reservation, quarantine & release gates", "Material & code-to-code transfers", "Repack genealogy retained"] },
    { title: "Shelf life & inspection", features: ["Container-level expiry & retest dates", "Expired-stock dispensing block", "Expiry, reorder & inspection alerts", "Nearing-expiry receipts dashboard"] },
    { title: "Dispatch, labels & disposal", features: ["Goods dispatch & delivery challans", "E-way bills", "Container, status, dispensing & shipper labels", "Barcodes & tracked reprints", "Returns against original receipts", "Approved write-off, reason & certificate"] },
  ],
  production: [
    { title: "Production planner", features: ["Material, machine & resource readiness", "Shift calendars & cleaning-status checks", "Line, equipment, room & people collision checks", "Live schedule adherence & utilisation", "Orders-at-risk alerts", "Kanban & batch timeline views"] },
    { title: "Electronic batch records", features: ["Template-driven eBMR / eBPR", "Formulation-synchronised BOM", "Stage-by-stage execution records", "Performer & verifier signatures", "Batch tracking & analysis"] },
    { title: "Dispensing & in-process QC", features: ["Specific-container reservation", "Second-person verification at the scale", "Line clearance per stage", "Stage-level IPQC checks", "Stage closure gated on passing results", "Out-of-limit deviation & batch hold"] },
    { title: "Batch release", features: ["Yield & label reconciliation", "COA generation", "Batch release forms", "Separate signed QA-release decision"] },
  ],
  facility: [
    { title: "Sites & assets", features: ["Multi-site, warehouse, zone & bin hierarchy", "Drug / food area designation", "Equipment & work-centre registers", "Assets linked to production lines & stages", "Batch-linked equipment usage", "Site-level capacity modelling"] },
    { title: "Cleaning", features: ["Line & asset cleaning schedules", "Clean / dirty hold times", "Expired-cleaning scheduling block"] },
    { title: "Qualification & calibration", features: ["IQ / OQ / PQ per asset", "Calibration records & certificates", "Calibration due-date alerts", "Overdue-asset usage block"] },
    { title: "Maintenance & performance", features: ["Preventive maintenance schedules", "Breakdown records & maintenance cost", "Runtime, idle time & downtime", "Capacity utilisation & throughput"] },
  ],
  quality: [
    { title: "Sampling & testing", features: ["GRN, IPQC & finished-goods sampling", "AQL sampling-plan enforcement", "Specification checks at result entry", "Assay calculation & COA generation", "Stability studies", "Batch & lot traceability"] },
    { title: "Deviations & investigations", features: ["OOS / OOT investigations", "Impact assessment & signed disposition", "Deviation-linked CAPA", "Root-cause & deviation trends", "Stock disposal records"] },
    { title: "Change control", features: ["Document, training & process impact", "Implementation verification", "Connected approval history"] },
    { title: "Supplier quality", features: ["Vendor qualification", "Vendor audit scheduling & scoring", "Re-audit schedules", "Supplier COA linked to receipt"] },
    { title: "Audits & readiness", features: ["Live inspection-readiness score", "Compliance ranking & scoring", "Audit-trail review", "Audit findings tracked to closure"] },
  ],
  capa: [
    { title: "Intake & investigation", features: ["Customer complaints & deviation triggers", "Audit findings, non-conformances & trends", "Structured root-cause investigation", "Cross-batch & cross-site scope", "AI-assisted gap detection & evidence review"] },
    { title: "Corrective & preventive actions", features: ["Action approval & progress tracking", "Cross-department named owners", "Due dates, SLA clocks & escalation", "Links to source deviations & audits"] },
    { title: "Effectiveness & recurrence", features: ["Effectiveness criteria set at approval", "Review-gated closure", "Recurrence detection across CAPAs", "Accountable continuous-improvement tracking"] },
  ],
  training: [
    { title: "Content & assignment", features: ["Document, slide & video courses", "Prerequisites & course sequencing", "Document-version-linked assignments", "Automatic reassignment on SOP revision", "Training calendar & overdue escalation"] },
    { title: "Assessment & competency", features: ["Question banks & pass criteria", "Read-and-understood e-signatures", "Person / task competency matrix", "Requalification intervals & refresher alerts", "Shop-floor hold until qualified"] },
    { title: "Training records", features: ["Trainer sign-off", "Session logs & exit tickets", "Version-controlled training content", "Inspection-ready competency evidence"] },
  ],
  documents: [
    { title: "Authoring & review", features: ["Rich-text / block authoring & drafts", "Passage-anchored threaded comments", "Highlighting & reviewer tagging", "Document change requests"] },
    { title: "Control & distribution", features: ["Controlled register; drug / food document sets", "Numbered revisions & complete history", "Electronic approval signatures", "One effective version; obsolete-copy lockout", "Distribution & acknowledgement traceability", "Review dates & periodic re-approval", "SOP anchors at the governed work step", "Cross-linked document dependencies"] },
  ],
  library: [
    { title: "Materials, products & brands", features: ["Material & product catalogues", "Specs, assay limits, shelf life & storage", "Material lead times", "Drug / food classification", "Multi-brand packs, artwork & pricing", "Shared pricing & tax codes"] },
    { title: "Masters & templates", features: ["Master Formula, BMR & BPR templates", "One active version; second-credential changes", "BOM, IPQC & material-test templates", "Inspection masters & methods of analysis", "Production & warehouse master data", "Licence-linked regulatory documents", "Registration & licence validity tracking", "Shared version-controlled data across modules"] },
  ],
};
