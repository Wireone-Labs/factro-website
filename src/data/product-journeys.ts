export interface ProductJourneyStep {
  owner: string;
  detail: string;
  evidence: string[];
  control: string;
}

export const PRODUCT_JOURNEYS: Record<string, ProductJourneyStep[]> = {
  erp: [
    { owner: "Purchase & Quality", detail: "Qualify the vendor for the material being bought. Licences, review history and performance stay with the approval, not in a separate file.", evidence: ["Material-approved vendor", "Licence validity", "OTIF & quality scorecard"], control: "Lapsed requalification blocks new purchase orders." },
    { owner: "Stores & QC", detail: "Check the delivery against the purchase order, capture the supplier lot and place it in quarantine. Material-wise masters drive receipt sampling and testing.", evidence: ["PO & goods receipt", "Supplier COA", "Sampling request"], control: "Receipt does not make material available to production." },
    { owner: "Quality Control", detail: "Review test results against approved specifications. Keep the release decision, test evidence and retest date with the control number.", evidence: ["Test results", "Approved specifications", "QC decision"], control: "Rejected stock cannot enter production without an explicitly approved override." },
    { owner: "Stores & Planning", detail: "Locate the lot by warehouse, zone and bin. Reserve physical stock with release status, expiry and retest standing in view.", evidence: ["Bin location", "Lot reservation", "Expiry & retest dates"], control: "Allocation checks material standing before an issue is made." },
    { owner: "Sales & Accounts", detail: "Fulfil the customer order from released stock. Keep dispatch, e-invoice, e-way bill and receivables attached to the same commitment.", evidence: ["Customer licence", "Dispatch lots", "Invoice & e-way bill"], control: "The shipment retains its trail back to the supplier lots." },
  ],
  mes: [
    { owner: "Production Planning", detail: "Schedule batches against workcentres, shifts, equipment and released material. Check whether asset calibration and maintenance cover the batch window.", evidence: ["Capacity & shifts", "Released material", "Equipment standing"], control: "Readiness gaps are visible before the plan reaches the floor." },
    { owner: "Production & Engineering", detail: "Bring room status, cleaning evidence and line clearance to the stage they govern. Record the previous product and batch alongside the current SOP.", evidence: ["Cleaning record", "Independent verification", "Signed line clearance"], control: "The person who performs a clean cannot verify their own work." },
    { owner: "Dispensing & Stores", detail: "Issue the correct released lot, record the quantity and obtain second-person verification at dispensing. The batch inherits the material trail.", evidence: ["Issued control number", "Verified quantity", "Second-person signature"], control: "Held material stays out of the production cycle." },
    { owner: "Operator & Supervisor", detail: "Follow the approved master with the relevant SOP at every step. Record readings, quantities, exceptions and signatures as the work happens.", evidence: ["Master revision", "Step readings", "Electronic signatures"], control: "Critical sensor readings stay attached to their batch step." },
    { owner: "Production & QA", detail: "Hand over a record that already contains its execution history, clearances and readings. Quality receives the batch context, not a folder to reconstruct.", evidence: ["Completed batch record", "Yield & reconciliation", "Linked deviations"], control: "Incomplete records cannot be submitted to QA." },
  ],
  qms: [
    { owner: "Quality Control", detail: "Run receipt, in-process and finished-goods testing using the approved methods and specifications. Keep results connected to material and batch context.", evidence: ["Sampling event", "Method & limits", "Instrument standing"], control: "Out-of-specification and out-of-trend results retain their investigation trail." },
    { owner: "QA & Investigation Team", detail: "Follow a deviation back to the batch, stage, equipment and material. Bring evidence and team conversations together before agreeing the root cause.", evidence: ["Source deviation", "Root-cause evidence", "Investigation history"], control: "AI can surface patterns; people retain responsibility for quality decisions." },
    { owner: "Action Owners & QA", detail: "Assign corrective actions across departments, monitor due dates and collect evidence. Check that the fix works, not merely that the task is marked done.", evidence: ["Named action owners", "Completion evidence", "Effectiveness review"], control: "CAPA closes only after its effectiveness review is signed." },
    { owner: "QA Reviewer", detail: "Use one batch checklist for signed steps, clearances, calibration, deviations and the COA. Focus attention on missing or unresolved evidence.", evidence: ["Batch checklist", "Open exceptions", "Certificate of analysis"], control: "Complete records stay visible; unresolved exceptions cannot disappear in the handover." },
    { owner: "Authorised QA Signatory", detail: "Make the final release decision with re-authentication and recorded meaning. In the connected system, the decision updates the finished-goods stock status.", evidence: ["Release decision", "Signature & meaning", "Updated stock status"], control: "Release remains an accountable human decision." },
  ],
  one: [
    { owner: "ERP · Stores", detail: "A receipt creates the lot and its control number once. Purchase, supplier, quantity and location are already attached when the quality workflow begins.", evidence: ["Supplier lot", "Goods receipt", "Quarantine status"], control: "The same lot is used by all three products—not copied between systems." },
    { owner: "QMS · Laboratory", detail: "Receipt triggers sampling against the material master. Tests and the release decision join the original lot, making its availability clear to planning.", evidence: ["Sampling plan", "Results & limits", "Material release"], control: "Production cannot dispense the lot while it is on hold." },
    { owner: "MES · Shopfloor", detail: "Released lots, qualified operators and ready equipment come together on the approved batch record. Each issue and reading extends the same history.", evidence: ["Dispensed lots", "Signed execution", "Process readings"], control: "A floor deviation carries its batch context straight into the investigation." },
    { owner: "QMS · Quality Assurance", detail: "Review execution, testing, deviations and corrective action together. Sign the release when the evidence supports the decision.", evidence: ["Batch evidence", "CAPA standing", "Signed release"], control: "The quality decision changes stock availability without a separate message." },
    { owner: "ERP · Dispatch", detail: "Allocate released finished goods to the customer order. The shipment keeps its production and supplier history, ready for a traceability query.", evidence: ["Released finished goods", "Customer shipment", "Complete genealogy"], control: "A customer lot can be traced back through every contributing material." },
  ],
};
