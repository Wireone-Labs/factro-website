export type ProductStory = {
  promise: string;
  outcomes: [string, string, string];
  coverage: { title: string; description: string };
  chapters: {
    label: string;
    title: string;
    description: string;
    points: string[];
  }[];
  modules: { slug: string; name: string; summary: string; points: string[]; note?: string }[];
  questions: [string, string][];
  cta: { title: string; description: string };
};

export const PRODUCT_STORIES: Record<string, ProductStory> = {
  erp: {
    promise: "An ERP that knows what your plant can buy, use and sell.",
    outcomes: ["Approved partners", "Accountable stock", "Connected commerce"],
    coverage: { title: "From purchase request to paid invoice.", description: "Sales, purchasing, stores and material masters—built around the controls your plant needs." },
    chapters: [
      {
        label: "Trade with confidence",
        title: "An expired licence should stop an order. Not an audit.",
        description: "Check customer and vendor drug licences inside the transaction. Qualify suppliers for each material, then judge performance by what actually arrives.",
        points: ["Block orders when a required licence has lapsed.", "Keep material-wise vendor approval in the buying workflow.", "Measure OTIF from actual receipts, not promises."],
      },
      {
        label: "Control the material",
        title: "In the warehouse doesn’t mean ready to use.",
        description: "Receipt starts the control record and sampling request. Know where each lot sits, what has been tested and whether it can move—without reconciling a second register.",
        points: ["GRN, quarantine and sampling follow one workflow.", "Track stock through warehouses, zones and locations.", "Act on expiry, retest and reorder reminders before they become delays."],
      },
      {
        label: "Close the commercial loop",
        title: "Win the order. Keep the whole trail.",
        description: "Carry the customer commitment from enquiry to quotation, order and invoice. Pricing comes from approved masters; payments and credit notes stay with the invoice they settle.",
        points: ["Use approved product, brand and packaging masters.", "Keep buying linked from purchase request to vendor bill.", "See material price trends across vendors over time."],
      },
    ],
    modules: [
      { slug: "sales", name: "Sales", summary: "One chain from enquiry to collection.", points: ["Enquiries, quotations, sales orders and invoices share the commercial history.", "Customer licence checks and approved pricing govern the transaction.", "Payments and credit notes are recorded against their invoice."] },
      { slug: "purchase", name: "Purchase", summary: "Know who you can buy from—and how they perform.", points: ["Qualify vendors per material through the approved vendor list.", "Check vendor licence validity before purchasing.", "Follow requests, orders, bills and debit notes; compare receipt-based OTIF and material price trends."] },
      { slug: "inventory", name: "Inventory", summary: "Every receipt, transfer and issue accounted for.", points: ["Generate stock control and analytical reference numbers at receipt; quarantine the lot and raise sampling.", "Keep disposal, stock audits, relocation and code-to-code transfers controlled.", "Use reorder points, expiry dates and retest reminders to act ahead of shortages."] },
      { slug: "storage", name: "Warehouse", summary: "Model your actual stores, not just a stock total.", points: ["Organise stock by warehouse, zone and location.", "Keep material identity and quality standing attached to movement.", "Maintain segregation between drug and food dispensing streams."] },
      { slug: "accounting", name: "Invoices & payments", summary: "The financial record follows the transaction.", points: ["Connect customer invoices, payments and credit notes.", "Retain vendor bills and debit notes in the purchase chain.", "Generate statutory invoice and transport documents from the sales workflow when enabled."], note: "e-Invoice and e-way bill generation are available on request and enabled during onboarding." },
      { slug: "library", name: "Material masters", summary: "Define it once. Use the approved version.", points: ["Sampling test masters define how each material is tested, with results against specifications.", "Retain assay per lot and adjust dispensing for that lot’s assay.", "Control changes to materials, vendors and specifications; maintain product pricing, brand and packaging masters."] },
    ],
    questions: [
      ["Does ERP work as a standalone product?", "Yes. ERP runs the commercial and material side of the plant on its own, with its own configured controls and workflows."],
      ["Are the control points configurable?", "Yes. Configure the relevant controls and approval requirements around your SOPs. When a control is enabled, an action that fails it is refused. Configuration changes are recorded in the audit trail."],
      ["Are e-invoices and e-way bills enabled by default?", "No. These capabilities are available on request and can be enabled during onboarding."],
    ],
    cta: { title: "Bring an order. Follow every material decision.", description: "Walk through your buying, stock and sales workflow with the team. See where ERP checks, stops and records the work." },
  },
  mes: {
    promise: "Make the batch. Not a second job out of its paperwork.",
    outcomes: ["The approved process", "Gates that hold", "A record built live"],
    coverage: { title: "Every stage. Every check. Every record.", description: "Planning, execution and equipment readiness stay with the batch. Explore what is built in and what can be connected." },
    chapters: [
      {
        label: "Start from the right master",
        title: "The recipe is approved. The batch stays on it.",
        description: "Turn the master production and control record into a work order pinned to its exact version. Manufacturing, packaging and test requirements become defined stages—not instructions someone has to piece together.",
        points: ["Design stages with named inputs and outputs.", "Keep MBR, MPR, IPQC and finished-product test requirements together.", "Generate batch documents in your own approved format."],
      },
      {
        label: "Enforce the next step",
        title: "No clearance. No start. No passed check. No next stage.",
        description: "The process controls are part of execution. Signed line clearance gates the start; in-process quality checks gate the next stage. The system holds the work instead of asking someone to remember a rule.",
        points: ["Require signed line clearance before the batch starts.", "Keep the next stage held until its IPQC checks pass.", "Capture quantities, times and yields against the plan."],
      },
      {
        label: "Run a ready floor",
        title: "A machine on the plan must be fit for the batch.",
        description: "Register equipment against the floor it serves. Keep calibration, cleaning, maintenance and breakdown history with the asset, so machine readiness is a condition of use—not a separate spreadsheet.",
        points: ["Prevent selection when calibration has expired.", "Keep preventive maintenance, cleaning and breakdowns visible.", "Calculate OEE from runtime, downtime and output."],
      },
    ],
    modules: [
      { slug: "production", name: "Planning & electronic batch records", summary: "From the master to the work actually done.", points: ["Build formulations and MPCR stages with manufacturing, packaging and testing requirements.", "Create work orders pinned to the approved master version.", "Record planned versus actual quantities, time and yield, and retain each batch’s disposition."] },
      { slug: "rooms-equipment", name: "Shop floor & equipment", summary: "Readiness, execution and upkeep in context.", points: ["Register machines against work centres and shop floors.", "Gate use on calibration and gate batch start on signed line clearance.", "Keep cleaning, preventive maintenance, breakdowns and equipment qualification documents together; calculate OEE from operation."] },
      { slug: "sensor-data", name: "Plant data", summary: "Bring machine readings into the batch context.", points: ["Scope PLC, SCADA, environmental monitoring and IoT data around your plant.", "Use a time-series data store for connected readings.", "Agree the equipment interfaces and data requirements during integration scoping."], note: "Machine and sensor integrations are delivered on request; they are not assumed to be connected out of the box." },
      { slug: "connectors", name: "Integrations", summary: "Connect the systems your plant already runs.", points: ["Scope plant-floor interfaces around the machines and protocols at your site.", "Discuss SAP or Oracle integration where existing enterprise systems need to remain.", "Agree the records, data flow and responsibilities for each connection before rollout."], note: "Integrations are scoped and delivered per customer." },
    ],
    questions: [
      ["What happens if the master changes during a batch?", "A work order is pinned to the exact master record version it was created against. Its execution history retains that version rather than silently switching to a newer recipe."],
      ["Can a batch skip a required check?", "With the relevant controls enabled, signed line clearance is required before the start and IPQC checks must pass before the next stage. Expired calibration also blocks equipment selection."],
      ["Do our machines need to be connected first?", "No. Machine integrations are separately scoped on request. The process, checks and electronic batch record are the core MES workflow."],
    ],
    cta: { title: "Bring a master record. Watch a batch take shape.", description: "Walk through your stages, checks and equipment requirements. See how the record is built as the work happens." },
  },
  qms: {
    promise: "Less evidence hunting. More time for the quality decision.",
    outcomes: ["Connected test evidence", "Verified corrective action", "Controlled change"],
    coverage: { title: "From first sample to final sign-off.", description: "The lab, the investigation, the procedure and the people—one quality system, with evidence at every step." },
    chapters: [
      {
        label: "One testing history",
        title: "From the incoming sample to the finished batch.",
        description: "Keep receipt sampling, in-process checks and finished-product testing in one quality system. Results retain their specifications, instrument context and certificate of analysis.",
        points: ["Cover raw-material, in-process and finished-product tests.", "Keep instruments, calibration and reference standards in view.", "Use OOS and OOT trends to support disposition decisions."],
      },
      {
        label: "Correct the cause",
        title: "A CAPA isn’t closed because someone says it is.",
        description: "Carry the quality event through investigation, corrective work and an effectiveness check. Keep approvals and evidence attached so closure means the fix has been verified.",
        points: ["Open deviations, change controls and CAPA from quality events.", "Keep every action with an owner, deadline and conversation.", "Require a passed effectiveness check before CAPA closes."],
      },
      {
        label: "Make change stick",
        title: "The SOP changed. The training should too.",
        description: "Move documents through draft, review and signed approval with one effective version. When an SOP becomes effective or is revised, training follows the document—not a coordinator’s reminder list.",
        points: ["Retain controlled revisions and signed approvals.", "Assign training when an SOP takes effect or changes.", "See role-to-SOP competency gaps for each person."],
      },
    ],
    modules: [
      { slug: "quality", name: "Laboratory & quality control", summary: "Samples, specifications and the evidence behind a result.", points: ["Manage receipt sampling, IPQC and finished-product testing.", "Retain results against specifications, COAs and OOS/OOT context.", "Manage lab instruments, calibration, upkeep and reference standards."] },
      { slug: "capa", name: "Deviations, CAPA & change control", summary: "A quality event becomes accountable corrective work.", points: ["Raise quality events automatically or manually with their source context.", "Route corrective records through their configured approvals.", "Require effectiveness to pass before CAPA closure and use trends to support decisions."] },
      { slug: "documents", name: "Controlled documents", summary: "One effective version. An intact history.", points: ["Move SOPs and safety instructions through draft, review and signed approval.", "Retain version history instead of replacing the previous record.", "Keep document changes connected to required training."] },
      { slug: "training", name: "Training & competency", summary: "Know who is ready for the work.", points: ["Assign training when SOPs become effective or are revised.", "Map roles to the SOPs they require.", "Make competency gaps visible per person in the built-in learning system."] },
      { slug: "qualification", name: "Instrument qualification", summary: "Keep the evidence with the asset.", points: ["Hold validation packs alongside laboratory instruments.", "Retain calibration and upkeep records in the quality system.", "Review instrument standing with the testing it supports."] },
      { slug: "batch-release", name: "Material & batch release", summary: "A quality decision, not a status someone edits.", points: ["Release incoming material from quarantine after testing passes.", "Require independent QA approval at the final batch-release gate.", "Block batch release while a critical or major deviation remains open."] },
    ],
    questions: [
      ["What prevents a CAPA from closing too early?", "The effectiveness check must pass and the configured approvals must be completed. Action completion alone does not close the corrective record."],
      ["Does an SOP revision trigger training?", "Yes. The built-in learning system assigns training when an SOP becomes effective or is revised. The competency matrix shows the requirements and gaps per person."],
      ["Who makes the release decision?", "An independent, authorised QA reviewer. Passing tests does not replace that approval, and an open critical or major deviation blocks batch release."],
    ],
    cta: { title: "Bring a deviation. Follow it to verified closure.", description: "See the investigation, actions, effectiveness check and release controls on a quality workflow that matches your plant." },
  },
  one: {
    promise: "One plant. One record. No stitching it together later.",
    outcomes: ["One material history", "Owned handovers", "Knowledge that stays"],
    coverage: { title: "Five connections. One operating record.", description: "Follow the work, trace the material and review the evidence without joining separate histories." },
    chapters: [
      {
        label: "A shared operating record",
        title: "Not three copies waiting to agree.",
        description: "The material ordered, received, tested, consumed and shipped is one record. ERP, MES and QMS share the database, so the quality decision belongs to the same stock the floor and dispatch teams use.",
        points: ["Trace the material from receipt through batch to shipment.", "Keep sampling, execution and finished-product evidence connected.", "Hold batch release while a critical or major deviation is open."],
      },
      {
        label: "Work management across the plant",
        title: "The next step gets an owner. Not another follow-up.",
        description: "Tasks, sign-offs and handovers become tickets with owners, statuses and deadlines. Questions stay on the record, while managers see the work across departments on one board.",
        points: ["Make cross-team handovers visible and accountable.", "Keep conversations and decisions with the work.", "Separate work marked done from work verified complete."],
      },
      {
        label: "Knowledge that stays",
        title: "Your best operator’s know-how shouldn’t walk out the door.",
        description: "Keep how work is done in masters and SOPs, why decisions were made on the record, and who knows what in the competency matrix. The next person starts with context—not a file hunt.",
        points: ["Version the process in masters, SOPs and stage designs.", "Retain the reason for decisions in tickets and audit history.", "See live metrics without assembling another spreadsheet."],
      },
    ],
    modules: [
      { slug: "work-management", name: "Work Management", summary: "The work, the owner and the conversation together.", points: ["Track tasks, sign-offs and approvals as owned tickets with deadlines.", "Keep tagging, reactions and conversation on the source record.", "Show cross-team handovers and separate done from verified completion."] },
      { slug: "genealogy", name: "Genealogy", summary: "One material history from receipt to shipment.", points: ["Retain the connection between purchased material, stock and the batch that uses it.", "Follow manufacturing and testing through the finished product.", "Keep quality decisions with the same record used for dispatch."] },
      { slug: "capa", name: "End-to-end CAPA", summary: "A signal anywhere reaches quality with context.", points: ["Raise a quality event from the work where a problem occurs.", "Carry source evidence through investigation and corrective action.", "Verify effectiveness before closure; keep release governed by open deviations."] },
      { slug: "unified-testing", name: "Unified Testing", summary: "Raw material, in-process and finished product.", points: ["Open sampling from receipt and retain in-process checks with execution.", "Connect finished-product tests and the certificate of analysis.", "Make testing evidence available to the independent QA release decision."] },
      { slug: "realtime-insights", name: "Realtime Insights", summary: "The numbers move when the work does.", points: ["Use live metrics and automatic reports rather than manual exports.", "Give each role a dashboard centred on its own work.", "Keep planned and actual data structured for future analysis."], note: "AI Agent capabilities for compliance checks, CAPA analysis and anomaly detection are in development. The structured, AI-ready data model is available today." },
    ],
    questions: [
      ["Is this three products sharing a login?", "No. ERP, MES and QMS share the operating database, Work Management and configured compliance controls. The same material and batch records run through the plant."],
      ["Can we start with one part of the system?", "Yes. Each product can stand alone. Adding another enables its screens on the shared records rather than requiring a data migration between products."],
      ["Does AI make regulated decisions?", "No. AI Agent capabilities are in development. Proposed changes must pass the same human approval and signature requirements as other changes; an agent does not directly alter a regulated record."],
    ],
    cta: { title: "Bring one order. Follow it through the whole plant.", description: "From material receipt to the release decision, see how a connected system removes the gaps between teams." },
  },
};
