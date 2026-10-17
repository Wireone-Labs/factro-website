export type ProductSlug = "erp" | "mes" | "qms" | "one";
export type ProductExample = { title: string; points: string[] };
export type ProductRole = ProductExample & { description: string; screen: string };
export type ProductDetailContent = {
  eyebrow: string;
  heading: [string, string];
  introduction: string;
  features: ProductExample[];
  engineTitle: string;
  engineDescription: string;
  engines: ProductExample[][];
  roleHeading: string;
  roles: ProductRole[];
  questions: [string, string][];
  closing: [string, string, string];
};

function example(title: string, ...points: string[]): ProductExample { return { title, points }; }
function role(title: string, description: string, screen: string, ...points: string[]): ProductRole { return { title, description, screen, points }; }

export const PRODUCT_DETAIL_CONTENT: Record<ProductSlug, ProductDetailContent> = {
  erp: {
    eyebrow: "The business behind every batch",
    heading: ["Buy with confidence.", "Move with certainty."],
    introduction: "Four things ERP does that a generic ERP leaves to spreadsheets and email.",
    features: [
      example("Vendor qualification and OTIF", "AVL per material, checked before every PO", "Vendor drug licence and GMP certificate validity", "Receipt-based OTIF and vendor audit status"),
      example("Material price trends and lead time", "Rate history against the 12-month average", "PO to GRN lead time by vendor", "Rate changes outside the band routed for approval"),
      example("Warehouse and lot genealogy", "GRN, quarantine and A.R. number on receipt", "FEFO issue with expiry and retest dates", "Lot genealogy from supplier lot to dispatch"),
      example("Customer history and preferences", "Customer drug licence checked before every order", "Brands, price lists and pack preferences per customer", "Released stock only behind every promise"),
    ],
    engineTitle: "Why ERP holds up in an audit.",
    engineDescription: "The controls, approvals and signals that sit behind every purchase, receipt and sale.",
    engines: [
      [example("Unapproved purchases never leave the building.", "PO refused if the vendor is not on the AVL for that material", "Expired drug licence or GMP certificate blocks the PO", "Exceptions need a signed approval"), example("Rejected material never reaches usable stock.", "Lot stays in quarantine until QC releases it", "Rejected lots move only to the reject store", "Status label follows the lot to every bin"), example("An expired licence stops the sale.", "Customer drug licence checked at order", "Approved price list enforced", "Only released stock can be invoiced")],
      [example("Rate changes route to the right person.", "Rate above the agreed band goes to the purchase head", "Last rate and 12-month average attached", "Finance signs after purchase"), example("Receipts reach QC on their own.", "GRN raises the sampling request", "A.R. number assigned to QC", "Stores sees the result on the lot"), example("Write-offs need the right sign-off.", "Disposal of expired or rejected lots", "QA approval, then finance", "Lot history attached to the request")],
      [example("Price and vendor signals, early.", "Materials trending above their average rate", "Lead time drift by vendor", "Variance flagged before the PO is raised"), example("Vendors slipping on delivery.", "Receipt-based OTIF by vendor", "Rejections at GRN by vendor", "Flagged before it holds up a batch"), example("Stock that will expire unsold.", "Lots nearing expiry with no open demand", "Retest dates coming due", "FEFO picks shown at issue")],
    ],
    roleHeading: "who move material.",
    roles: [
      role("Purchase head", "Buy from vendors you can defend in an audit.", "Purchase dashboard", "AVL and licence checks before every PO", "OTIF, rate history and lead times in one view", "Rate changes routed to you with the history attached"),
      role("Storekeeper", "Know what is usable, and where it is.", "Inventory, nearing expiry", "GRN, quarantine and put-away by bin", "FEFO picks with expiry and retest dates", "Issue only lots QC has released"),
      role("Sales head", "Promise what the plant can actually ship.", "Sales dashboard", "Released stock behind every promise", "Drug licence and price list checked on every order", "Order book, invoices and collections in one view"),
    ],
    questions: [
      ["Do we still need Tally or our current accounting system?", "Yes. Factro feeds your books with invoices, vendor bills, payments, and credit and debit notes. Your accounting system keeps the statutory ledger. Books catch up with Factro, because that is the part your books cannot see."],
      ["How does Factro stop a purchase from an unapproved vendor?", "Each material has its own approved vendor list. When the control is on, a PO to a vendor who is not on the list, or whose licence has lapsed, is refused. An exception needs an approval, and both are kept in the audit trail."],
      ["Will sales be able to promise stock that is still in QC?", "No. Available-to-promise counts released stock only. Quarantined and rejected lots stay visible to stores and QC, but sales cannot commit them."],
      ["How do bins and locations work across several stores?", "Every lot carries its location, quality status, expiry and retest date. Each move between warehouses, zones and bins is recorded against the lot, so its full history is one click away."],
      ["Can we bring our current item, vendor and customer masters?", "Yes. We import them from spreadsheets or your current system during onboarding, then your team reviews and approves them before anything goes live."],
      ["Are e-invoices and e-way bills included?", "They are available on request and switched on during onboarding, once your GST credentials are set up."],
    ],
    closing: ["Bring your process.", "See where it connects.", "Walk through your buying, stock and sales with our team. Start with your controls, your handovers and the work you want to simplify."],
  },
  mes: {
    eyebrow: "From plan to packed batch",
    heading: ["Plan with capacity.", "Execute with proof."],
    introduction: "Four things MES does that paper batch records and whiteboards cannot.",
    features: [
      example("Capacity planning from your masters", "Plans built from Formulations and the MPCR", "Capacity by line, room and equipment", "Exhibit and trial batches as separate orders"),
      example("Guided execution with a live batch record", "EBR filled step by step at the line", "IPQC checks gate the next stage", "Line clearance and dispensing verified before start"),
      example("Competency gates on every GxP step", "Competency matrix by role, product and step", "SOP training checked at assignment", "Retraining raised when an SOP is revised"),
      example("Deviation history and genealogy", "Deviations raised on the step, with readings", "History by line, product and stage", "Batch genealogy back to material lots"),
    ],
    engineTitle: "Why the floor runs to the record.",
    engineDescription: "The controls, handovers and history behind every step your operators sign.",
    engines: [
      [example("Steps stay locked until checks pass.", "Next stage opens only after IPQC passes", "Operator trained on the current SOP", "Equipment calibrated and clean"), example("Only released material reaches the floor.", "Dispensing checks QC status and expiry", "Weighing against BOM tolerance", "Quarantined lots cannot be issued"), example("Out of limit readings raise a deviation.", "Limits come from the MPCR", "An out-of-limit value flags the step", "The deviation opens with the reading attached")],
      [example("Shift handovers carry the batch.", "Open IPQC checks and pending sign-offs", "Deviations awaiting QA", "Cleaning due before the next batch"), example("Cleaning and line clearance on time.", "Cleaning status on every room and machine", "Line clearance based on the previous product", "The batch waits until clearance is signed"), example("Plans move when material moves.", "A lot on QC hold flags the batches that need it", "The planner chooses to reschedule", "Sales sees the order at risk")],
      [example("Deviations arrive with their history.", "Similar deviations by line, product and step", "Linked CAPA and its effectiveness check", "The pattern is visible before the investigation starts"), example("OEE losses by cause.", "Availability, performance and quality losses", "Downtime by cause: cleaning, material, changeover", "By line and by week"), example("Where batches wait.", "Time in dispensing, execution and release", "Waiting time made visible", "By batch and by product")],
    ],
    roleHeading: "who make the batch.",
    roles: [
      role("Production head", "Plan with confidence and see delays early.", "Shop floor and OEE", "Capacity plans from Formulations and the MPCR", "Line, room and equipment status with OEE", "Delays traced to the stage that caused them"),
      role("Shift supervisor", "Run the shift without chasing signatures.", "My work", "Work orders open with dispensing verified", "Competency checked before every assignment", "Shift handover with open IPQC and deviations"),
      role("QA reviewer", "Review by exception, not page by page.", "Batch record review", "EBR reviewed by exception, not page by page", "Deviations raised on the step itself", "Every entry signed, with author, time and reason"),
    ],
    questions: [
      ["Do we have to digitise every batch record on day one?", "No. Most plants start with one product on one line. We build its masters from the batch record you use today, run it alongside paper, then add products one at a time."],
      ["How are our master records set up?", "In the Library, as a master production and control record: bill of materials, dispensing, batch record, IPQC, packing record and finished product testing. QA approves it before any work order can use it."],
      ["What happens when an operator is not trained on the current SOP?", "The step will not accept them. The supervisor sees who is eligible, and retraining is assigned automatically when an SOP is revised."],
      ["Can we run exhibit and trial batches?", "Yes. They run as their own orders under the same controls, so they never mix with commercial batches in planning or in the records."],
      ["How are deviations captured on the floor?", "On the step where they happen, with the readings attached. QA is notified at once, and the deviation shows similar past events for that line and product."],
      ["Does it connect to our machines and sensors?", "Sensor, SCADA and PLC connections are available on request and scoped during onboarding. Readings then land on the batch record."],
    ],
    closing: ["Bring your batch.", "See it run on Factro.", "Walk through one product with our team. Start with your batch record, your stage checks and the handovers that slow you down."],
  },
  qms: {
    eyebrow: "Quality that gates the work",
    heading: ["Build the gate.", "Kill the manual report."],
    introduction: "Four things QMS does so inspection readiness is the normal state, not a sprint.",
    features: [
      example("Release queues with approval conditions", "Sampling, FPT results and CoA on one checklist", "Open deviations and OOS results block release", "QA releases with an e-signature"),
      example("CAPA that closes on evidence", "CAPA linked to deviations and root causes", "Actions with owners and due dates", "Closure only after the effectiveness check"),
      example("A LIMS that sits on the record", "Samples, A.R. numbers and test methods", "Assay, LOD and related substances against specification", "OOS opens a Phase I investigation in place"),
      example("Training that keeps people current", "Training matrix by role and SOP", "Assessments and quizzes with pass marks", "Retraining when an SOP is revised"),
    ],
    engineTitle: "Why QMS is ready on any day.",
    engineDescription: "The gates, owners and live signals behind every release your team signs.",
    engines: [
      [example("Release waits for the evidence.", "Open deviations and pending results block release", "CoA generated from FPT results", "QA signs with meaning, kept in the audit trail"), example("Lapsed training holds the work.", "SOP training checked before each GxP step", "Overdue training holds the signature", "Retraining assigned automatically"), example("Out of calibration means out of use.", "Calibration due dates on every instrument", "Out-of-calibration instruments cannot be selected", "Calibration status kept on the test record")],
      [example("Every CAPA action has an owner.", "Actions with owners and due dates", "Reminders before they fall due", "No closure without the effectiveness check"), example("An OOS opens its investigation in place.", "OOS flagged against the specification", "Phase I lab investigation, then Phase II", "CAPA if a root cause is found"), example("SOP revisions route themselves.", "Review and QA approval before it takes effect", "Current version shown on every GxP page", "Training tickets raised on approval")],
      [example("A live view of readiness.", "Live compliance score across control areas", "Guidance on each open gap", "Ready for an inspection on any day"), example("Issues that keep coming back.", "Deviations grouped by area and product", "Repeat issues after CAPA closure", "OOT trends on key tests"), example("Evidence coverage by area.", "Live evidence by control area", "Gaps still on paper", "Coverage trend over time")],
    ],
    roleHeading: "who sign the release.",
    roles: [
      role("QA head", "Know where you stand before the inspector does.", "Compliance readiness", "Live compliance score with guided gap closure", "Release queues with CoA, deviations and results in place", "Inspection-ready reports from the records"),
      role("QC analyst", "Test, record and move on.", "Sample results", "Samples raised from GRN and IPQC automatically", "Assay and other tests against the specification", "CoA generated on result submission"),
      role("Training coordinator", "Keep everyone current without a spreadsheet.", "Training dashboard", "Training matrix by role and SOP", "Assessments with pass marks", "Retraining raised when an SOP is revised"),
    ],
    questions: [
      ["Can QMS run if our batches are recorded somewhere else?", "Yes. QMS runs on its own and can take batch and material data from your existing systems. You get the full benefit of release by exception once MES records sit on the same record."],
      ["Is there a LIMS, or do we need a separate one?", "It is built in. Samples, test methods, results, instruments and calibration are part of QMS, so results stay with the material or batch they belong to."],
      ["Can we set our own release conditions?", "Yes. You configure release queues and the conditions each one needs around your SOPs. Changes to the configuration are recorded in the audit trail."],
      ["How does an SOP revision reach the floor?", "The revision goes through review and approval, the new version replaces the old one everywhere it is shown, and retraining is assigned to everyone who uses it."],
      ["How does CAPA effectiveness work?", "Each CAPA carries an effectiveness check with its own criteria and window. The CAPA cannot close until that check is signed."],
      ["Which regulations does QMS support?", "Controls for GMP, 21 CFR Part 11, EU Annex 11 and Revised Schedule M. These are supported frameworks, not certifications. Compliance depends on your configuration, validation and procedures."],
    ],
    closing: ["Bring your release.", "See where it gets stuck.", "Walk through one batch release with our team. Start with your checks, your approvals and the reports you assemble by hand today."],
  },
  one: {
    eyebrow: "Close the gaps between systems",
    heading: ["That is where", "batches wait."],
    introduction: "Four things you only get when purchase, production and quality share one record.",
    features: [
      example("One lot, traced end to end", "Supplier lot, GRN and A.R. number", "Batches that consumed it, from the EBR", "Customers it reached, from dispatch"),
      example("One hold stops everything it should", "A QC hold stops issue in stores", "Planned batches flagged in MES", "Orders at risk flagged to sales"),
      example("Batch cost from real consumption", "Rate from the PO, quantity from dispensing", "Yield from batch reconciliation", "Variance against plan, batch by batch"),
      example("One view of the whole plant", "OTIF, OEE and readiness on one dashboard", "Delays traced across departments", "Exceptions with the record attached"),
    ],
    engineTitle: "What one record changes.",
    engineDescription: "Controls, handovers and numbers that stop at a module boundary in any other setup.",
    engines: [
      [example("One control holds in every product.", "A QC hold blocks issue in stores", "Packing paused on the batch", "The order is flagged to sales"), example("One specification, read everywhere.", "Receipt checks in stores", "Tests in the lab", "Weighing limits in dispensing"), example("Training gates the floor and the lab.", "SOP training gates EBR steps", "The same record gates lab results", "Retraining applies everywhere at once")],
      [example("Handovers without re-keying.", "Stores issue, EBR, QA release and dispatch on one record", "No re-keying between teams", "Each team starts where the last one stopped"), example("Every approval in one queue.", "Rate changes, releases, disposals and SOP revisions", "One queue, whichever product raised it", "An SLA on every approval"), example("Tickets instead of WhatsApp.", "Questions between teams become tickets", "The thread stays with the record", "Answers still there at the next audit")],
      [example("Numbers no single system can give.", "Batch cost against actual consumption", "Yield and rate variance by batch", "Cost per batch over time"), example("Delays traced to where they start.", "Material, waiting, production and release time", "By batch and by week", "The team that holds things up"), example("Readiness across the plant.", "One score from ERP, MES and QMS", "Gaps listed where they sit", "Guidance to close each one")],
    ],
    roleHeading: "who run the plant.",
    roles: [
      role("Plant head", "See the whole plant in one place.", "Plant dashboard", "OTIF, OEE and readiness in one place", "Batch cost against plan", "Delays traced to where they started"),
      role("QA and regulatory lead", "Walk inspectors through one system.", "Audit trail", "One append-only, hash-chained audit trail", "One validation package", "Release evidence captured with the batch"),
      role("Managing director", "Grow without adding systems.", "Cost and delivery", "One subscription for every product and module", "Industry packs and new modules included", "No integration project to fund"),
    ],
    questions: [
      ["Do we have to buy all three products?", "No. Start with the one that hurts most. When you add the others, they join the same record, with no migration and no interface to build."],
      ["Is Factro going to replace my SAP?", "No. If SAP runs your finance, procurement and reporting, it stays. Factro puts execution on the floor, a quality system that gates rather than reminds, and posts back to your ERP."],
      ["What does one record mean in practice?", "One database for all three products. A QC hold in QMS stops issue in stores and the planned batch in MES straight away, because there is nothing to synchronise."],
      ["How does validation work with one system?", "You validate one system with one audit trail, instead of three systems and the interfaces between them. We provide documentation to support your validation."],
      ["We make products in more than one regulated category. Do we need two systems?", "No. One plant runs one Factro. Industry blueprints add the controls each category needs on top of the same record."],
      ["How is it priced?", "One subscription covers every product, module and regulatory pack, including new ones as they ship. You start paying when you start using it."],
    ],
    closing: ["Bring your plant.", "See it on one record.", "Walk through one product from receipt to release with our team. Start with the handovers that slow your batches down."],
  },
};
