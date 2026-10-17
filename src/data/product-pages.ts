export interface ProductFeature {
  slug: string;
  name: string;
  title: string;
  description: string;
  sections: { title: string; points: string[] }[];
}

export interface ProductPageData {
  slug: string;
  name: string;
  category: string;
  title: string;
  description: string;
  flow: string[];
  signature: string[];
  problems: { title: string; body: string }[];
  roles: string[][];
  spotlight: { title: string; body: string; points: string[] };
  intelligence: string[];
  handoffs: string[];
  faqs: string[][];
  screenshot?: { id: string; image: string; width: number; height: number; alt: string };
  features: ProductFeature[];
}

const SUPPLY_FEATURES: ProductFeature[] = [
  {
    slug: "sales", name: "Sales", title: "Enquiry to dispatch, without re-entry.",
    description: "Keep quotations, orders, customer licences, dispatch and receivables on one trail.",
    sections: [
      { title: "One customer commitment", points: ["Convert enquiries into quotations and sales orders without re-entering the same details.", "Automatically check customer drug-licence validity during onboarding and carry the result into the order and dispatch workflow."] },
      { title: "Released stock only", points: ["Allocate by batch with release status visible before dispatch.", "Trace the customer back to the lots behind each shipment."] },
      { title: "Billing stays connected", points: ["Generate invoices from the order and track outstanding receivables.", "Keep payments and credit notes attached to their source documents."] },
    ],
  },
  {
    slug: "purchase", name: "Purchase", title: "Approved vendors. Accountable purchasing.",
    description: "From a floor request to a matched receipt, approval and vendor standing stay attached to the material.",
    sections: [
      { title: "Qualification, per material", points: ["Build an approved vendor list for each material, with approved, conditional or rejected outcomes.", "Keep licences, certificates, inspection history, quality agreements, questionnaires and sample evaluations in one dossier.", "Match desktop, remote or on-site review to risk. Any waiver needs written justification."] },
      { title: "Requalification is part of the work", points: ["Schedule reviews by critical, major or minor risk tier. Bring reviews forward for complaints, CAPA, site changes or declining performance.", "Suspend vendors whose requalification lapses and block new purchase orders.", "Keep a live scorecard for OTIF, COA accuracy, rejections, deviations and complaints. Export the dossier for an audit."] },
      { title: "From request to receipt", points: ["Approve material requests and purchase orders before ordering, with vendor drug-licence checks in the workflow.", "Check pack size, weight and the certificate of analysis against the PO at goods receipt. Material-wise masters drive the required raw-material sampling and tests.", "Recalculate material lead time with every order and use reorder points to raise requests before stock runs short."] },
    ],
  },
  {
    slug: "inventory", name: "Inventory", title: "Quality status stops stock.",
    description: "One lot-level ledger for every receipt, issue, return and disposal, with status checked before material moves.",
    sections: [
      { title: "One movement history", points: ["Record receipts, transfers, issues, returns and disposals—including tools and consumables—in the stock ledger.", "Trace genealogy forward and backward, from the supplier's lot to the customer's shipment.", "Retain the material trail through pharma-native code-to-code transfers, with retest reminders managed by the system."] },
      { title: "Status is a hard stop", points: ["Quarantined, expired or untested material cannot be issued or dispatched.", "Use FIFO and FEFO allocation with container-level expiry and retest alerts.", "Retain parent genealogy through conversion and repacking."] },
      { title: "The pack travels with the lot", points: ["Carry status, dates, vendor approval, COA and industry-specific facts with the material.", "Check those facts at regulated actions and explain the rule and values behind each decision.", "Controlled overrides retain their reason, expiry and separate approval."] },
    ],
  },
  {
    slug: "storage", name: "Storage", title: "Your stores, down to the bin.",
    description: "Model plants, warehouses, zones and bins once, with conditions and reservations tied to physical locations.",
    sections: [
      { title: "A hierarchy that matches your site", points: ["Keep each plant's legal entity, timezone and structure in the same system.", "Organise warehouses into zones and bins. A warehouse can serve more than one purpose."] },
      { title: "Conditions belong to the zone", points: ["Set temperature, humidity, storage category and stack height per zone.", "Maintain dedicated quarantine zones for stock awaiting a quality decision."] },
      { title: "Reservations mean physical stock", points: ["Reserve material at a specific bin, not just against an item total.", "See the lot, quantity, status and retest date at its location.", "With a connected system, warehouse readings from MES are checked against the zone's conditions."] },
    ],
  },
  {
    slug: "accounting", name: "Accounting", title: "Tally keeps the books. Factro feeds it.",
    description: "Capture financial events on the order, receipt and batch. Export clean vouchers mapped to your Tally ledgers.",
    sections: [
      { title: "Receivables and payables", points: ["Allocate payments against invoices and see customer balances by ageing bucket.", "Match vendor bills against the PO and GRN on quantity and rate.", "Track payments, debit notes, payables ageing and maintenance spend."] },
      { title: "Documents become mapped vouchers", points: ["Keep GSTIN and HSN on masters, with line-level GST determined by place of supply.", "Generate e-invoice IRNs and e-way bills from sales invoices.", "Export approved documents as Tally XML or CSV, mapped to your ledger names."] },
      { title: "Batch cost, before month end", points: ["Calculate material cost from stock consumed and compare actual yield with theoretical.", "Freeze approved documents when a period closes.", "Correct closed-period amounts with credit or debit notes, never silent edits."] },
    ],
  },
  {
    slug: "library", name: "Library", title: "One approved source for your masters.",
    description: "Material catalogues, specifications, BOMs, pricing and tax codes, held under change control.",
    sections: [
      { title: "Facts that follow the material", points: ["Keep specifications, assay limits, shelf life and storage requirements on the material master.", "Maintain pricing, tax codes and the industry-specific facts your pack checks."] },
      { title: "Masters drive execution", points: ["Maintain approved formulations, BOMs, BMR and BPR templates in one place.", "Provide test templates and methods of analysis to the workflows that use them.", "Attach the governing SOP to the work. Assign owners, nudge overdue actions and retain the communication behind each decision."] },
      { title: "Changes stay controlled", points: ["Retain revisions and approvals on master records.", "Let approved changes reach the records that inherit them rather than maintaining competing copies.", "Keep the master version behind past work."] },
    ],
  },
];

const MAKE_FEATURES: ProductFeature[] = [
  {
    slug: "production", name: "Production", title: "Guided on the floor. Complete at the end.",
    description: "Plan against real capacity and released stock, then capture the batch record at the point of work.",
    sections: [
      { title: "A plan the floor can run", points: ["Check units, workcentres, shifts and released material before scheduling.", "Flag equipment due, overdue or never calibrated or maintained inside the batch window."] },
      { title: "Approved steps, verified work", points: ["Generate the batch record from the approved master, with the current SOP on its step.", "Enforce second-person verification at dispensing and capture the lot at issue.", "Capture attributable, time-stamped entries and re-authenticated signatures at the point of work."] },
      { title: "Ready for quality review", points: ["Keep cleans, clearances and readings with the stage they govern.", "Prevent incomplete records from being submitted to QA.", "Generate the COA and retain forward and backward genealogy."] },
    ],
  },
  {
    slug: "rooms-equipment", name: "Rooms & Equipment", title: "Nothing starts on an unready room or machine.",
    description: "Live room status, verified cleaning, calibration coverage and maintenance on the assets your batches use.",
    sections: [
      { title: "Model the floor once", points: ["Record room grade, capacity, occupancy and access for units and workcentres.", "Register production, packaging and utility assets with capacity ranges and product-contact materials.", "Show rooms as under cleaning, cleared, blocked or active."] },
      { title: "Cleaning is verified, not assumed", points: ["Record each clean against its SOP version, previous product and previous batch.", "Prevent the cleaner from verifying their own clean.", "Sign line clearance per stage and retain the cleaning in force when it began."] },
      { title: "Maintenance stays with the machine", points: ["Schedule preventive maintenance with intervals and time windows.", "Log breakdowns on the floor and record downtime on closure.", "Link corrective maintenance to the breakdown it fixes and check coverage before scheduling."] },
    ],
  },
  {
    slug: "sensor-data", name: "Sensor Data", title: "Every reading, kept with the batch.",
    description: "A time-series store for plant readings, connected to rooms, equipment and the batch that was running.",
    sections: [
      { title: "Bring readings into the record", points: ["Receive data from existing gateways, PLCs and sensors through MES's connectors.", "Tag readings with room, equipment and time.", "Keep history beside batch context instead of reconstructing chart-recorder printouts."] },
      { title: "Limits come from your masters", points: ["Check temperature, humidity and pressure against ranges on zones and workcentres.", "Attach critical readings to the right batch step without transcription.", "In a connected system, out-of-range readings reach QMS with their batch context."] },
      { title: "See drift before a limit is crossed", points: ["Use the AI Agent to surface slow changes in rooms and equipment.", "Review yield and deviation patterns alongside sensor history.", "Ask plain-language questions with answers linked to source records."] },
    ],
  },
  {
    slug: "connectors", name: "Connectors", title: "Connect the machines and tools you already run.",
    description: "HTTP, MQTT, WebSocket and an MCP server connect MES to systems, plant equipment and AI tools.",
    sections: [
      { title: "HTTP and MQTT", points: ["Use REST APIs and webhooks for ERP, LIMS, accounting and other API-enabled systems.", "Bring in PLC, gateway and sensor readings over MQTT.", "Retain room, equipment and time context for incoming readings."] },
      { title: "WebSocket", points: ["Stream live batch and room status to dashboards and line displays.", "Keep floor visibility connected to the operating record."] },
      { title: "MCP server", points: ["Let your team's AI assistants read Factro records through Model Context Protocol.", "Apply the same role-based access as a user.", "With a connected system, use one connector set across stock, batches and quality."] },
    ],
  },
];

const RELEASE_FEATURES: ProductFeature[] = [
  {
    slug: "quality", name: "Quality & LIMS", title: "From sample to decision, on one record.",
    description: "Receipt, in-process and finished-goods testing with methods, limits, investigations and lab standing attached.",
    sections: [
      { title: "Sampling follows the event", points: ["Raise receipt, in-process and finished-goods sampling from the work that triggers it.", "Use test templates and methods from the library.", "Keep material in quarantine until QC releases it."] },
      { title: "Results come with context", points: ["Check results against specifications and retain certificates of analysis.", "Link OOS and OOT investigations to the result, batch, stage, equipment and material.", "Route deviations to CAPA with owners and due dates."] },
      { title: "Lab standing and readiness", points: ["Register QC labs with type, accreditation and standard references.", "Keep instrument calibration and plant licence validity in view.", "Track change control, risk registers, FMEA scoring, self-inspections and product quality review."] },
    ],
  },
  {
    slug: "capa", name: "CAPA", title: "CAPA closes on proof.",
    description: "Link complaints, deviations, root causes, actions and signed effectiveness reviews instead of closing issues on a promise.",
    sections: [
      { title: "Start with the signal", points: ["Log complaints against the batch and retain the source deviation or finding.", "Run jurisdiction-specific reporting clocks with owners and escalation.", "Investigate root cause before agreeing corrective actions."] },
      { title: "Actions cross departments", points: ["Assign each action to an owner with an SLA clock.", "Keep evidence, conversations and progress on the tracked work.", "Use AI-assisted review to find recurring issues across product, line, stage and shift."] },
      { title: "Effectiveness before closure", points: ["Require a signed effectiveness review before closing CAPA.", "Keep the review, evidence and original deviation linked.", "Let the AI Agent advise with source records. Quality decisions stay with a person and a signature."] },
    ],
  },
  {
    slug: "documents", name: "Documents", title: "The approved SOP, at the step it governs.",
    description: "A controlled register with version history, review dates and electronic approval, connected to the work.",
    sections: [
      { title: "A controlled register", points: ["Maintain documents, revision history and periodic review dates.", "Retain every approved revision rather than overwriting the past."] },
      { title: "An accountable approval", points: ["Use approval signatures with re-authentication and recorded meaning.", "Keep change control, reasons and approvers attached to the revision."] },
      { title: "SOPs reach the floor", points: ["Anchor the current SOP to the step it governs.", "Connect document versions to training assignments.", "A revision reassigns training and holds untrained operators from governed work."] },
    ],
  },
  {
    slug: "training", name: "Training", title: "Training follows the SOP.",
    description: "Tie assignments and competency to the actual document version operators use on the floor.",
    sections: [
      { title: "Version-linked assignments", points: ["Assign training against a specific controlled document version.", "Automatically reassign training when the SOP changes."] },
      { title: "Competency is checked at work", points: ["Maintain a person-and-task competency matrix.", "Hold untrained operators from the governed step until they qualify.", "Keep assessment and sign-off evidence with the training record."] },
      { title: "Inspection-ready history", points: ["Show who trained on which version and when.", "Retain qualification evidence instead of rebuilding spreadsheet history.", "Make training gaps visible in the quality readiness picture."] },
    ],
  },
  {
    slug: "qualification", name: "Qualification", title: "Equipment standing, one click away.",
    description: "DQ, IQ, OQ, PQ, calibration and validation evidence linked to the units and machines they govern.",
    sections: [
      { title: "Qualification with its evidence", points: ["Keep DQ, IQ, OQ and PQ status on each unit and machine.", "Link document references and the validation master plan.", "Retain cleaning validation references and product-contact materials on each asset."] },
      { title: "Calibration that counts", points: ["Attach calibration certificates and require approval before records count.", "Track standing for production equipment and lab instruments.", "Verify corrective maintenance as effective before closure."] },
      { title: "Standing controls use", points: ["In a connected system, qualification and calibration determine what can run in MES.", "Check coverage inside the batch window before scheduling.", "Enforce plant licence scope when setting up product categories on units."] },
    ],
  },
  {
    slug: "batch-release", name: "Release", title: "The last gate before a batch leaves.",
    description: "One checklist brings signed work, clearances, calibration, deviations and the COA to QA.",
    sections: [
      { title: "Review by exception", points: ["Show required steps, clearances, calibration, deviations and CAPA status.", "Bring the certificate of analysis into the same checklist.", "Let QA judge gaps instead of rechecking pages that are already complete."] },
      { title: "A signed decision", points: ["Re-authenticate the reviewer and record the signature's meaning and reason.", "Keep the checklist, evidence and decision on the batch record.", "Retain human accountability for the final decision."] },
      { title: "The decision reaches stock", points: ["With a connected system, finished goods become available to sales when QA signs.", "Carry status into the same ledger instead of passing a message between systems.", "Export evidence in inspector-readable form."] },
    ],
  },
];

export const PRODUCT_PAGES: ProductPageData[] = [
  {
    slug: "erp", name: "ERP", category: "Enterprise Resource Planning", title: "Book equals floor.",
    description: "Sales, purchase, inventory, storage and accounting, with your regulations checked on every stock movement.",
    flow: ["Approve the vendor", "Receive into quarantine", "Release the lot", "Reserve by bin", "Dispatch released stock"],
    signature: ["Qualify every customer and vendor.", "Test at receipt. Plan with real availability.", "One stock ledger. Complete genealogy.", "E-way bills and e-invoices, built in.", "SOP-led work. No manual chasing."],
    problems: [
      { title: "The book and the floor disagree.", body: "Receipts, issues, returns and disposals sit in separate registers. The totals drift apart." },
      { title: "Quality status lives outside the ERP.", body: "Quantity is in the system, quarantine is on the drum, and nothing stops a held lot being issued." },
      { title: "A recall means reconstruction.", body: "The path of every lot is rebuilt by hand, under time pressure." },
    ],
    roles: [["Storekeeper", "Walks the warehouse to locate a lot.", "Finds it by bin, with status and expiry on screen."], ["Purchase", "Chases approvals and orders from the latest quote.", "Works an approval queue with material-approved vendors."], ["Sales", "Checks stock and licences separately.", "Sees released stock and customer licence status on the order."], ["Accounts", "Re-keys bills and batch costs at month end.", "Finds mapped vouchers and batch costs already connected."]],
    spotlight: { title: "Your regulatory pack travels with the material.", body: "The lot carries its facts. Each regulated action checks those facts against the pack for what you make.", points: ["Receipt captures status, dates, vendor approval, COA and industry-specific attributes.", "Each check explains the rule, regulatory references and exact values behind the decision.", "Not-ready actions wait. Exceptions need a reason, expiry and a separate approver.", "Packs are versioned and validated. Past decisions retain the version they were judged under."] },
    intelligence: ["Forecast demand against stock and plans before shortages form.", "Ask stock, order and vendor questions with answers that cite source records."],
    handoffs: ["Goods receipt opens sampling in QMS.", "Only QC-released lots reach dispensing or dispatch.", "MES plans against released stock.", "QA sign-off makes finished goods available to sales."],
    faqs: [["Can we run ERP on its own?", "Yes. Add MES or QMS later and they join the same record, with no interface to build."], ["Do we have to replace Tally?", "No. Tally keeps the statutory books. Factro handles receivables, payables, GST documents and batch costing, and exports mapped vouchers."], ["Can we run multiple sites or product categories?", "Yes. Sites share one ledger. Each lot and batch carries the regulatory pack that applies to it."], ["Can you migrate existing stock and masters?", "Yes. We work with your existing data, whatever form it is in, as part of onboarding."]],
    screenshot: { id: "supply-preview", image: "purchase-dashboard.png", width: 1920, height: 1490, alt: "ERP purchase dashboard with vendor delivery performance and spend tracking" },
    features: SUPPLY_FEATURES,
  },
  {
    slug: "mes", name: "MES", category: "Manufacturing Execution System", title: "Guided on the floor. Complete at the end.",
    description: "Rooms, equipment, cleaning, dispensing and sensor data, connected to the batch record as work happens.",
    flow: ["Plan real capacity", "Verify room readiness", "Dispense released lots", "Run approved steps", "Submit complete evidence"],
    signature: ["Production planning on real capacity.", "Nothing starts on an unready room or machine.", "Guided batch execution.", "A connected floor."],
    problems: [
      { title: "Errors are found at review.", body: "A skipped check or wrong weight surfaces days later, after the batch is made." },
      { title: "The record is a second job.", body: "Operators run the batch, then write it down across room logs, cleaning sheets and chart recorders." },
      { title: "Release waits on reconstruction.", body: "QA rebuilds the batch from paper. Every missing entry becomes a query." },
    ],
    roles: [["Operator", "Writes up the step, then hunts for a second signature.", "Follows the approved step with its SOP and signs at the point of work."], ["Shift supervisor", "Walks the floor to find cleared or blocked rooms.", "Sees room status and open handovers in one view."], ["Production head", "Finds expired calibration after a batch has run.", "Sees coverage gaps before scheduling."], ["Engineering", "Keeps printouts and maintenance logs separately.", "Keeps readings, breakdowns and maintenance on equipment records."]],
    spotlight: { title: "The record grows as the batch runs.", body: "The approved master drives execution. People, rooms, equipment and readings stay connected to the work they govern.", points: ["The cleaner cannot verify their own clean. Line clearance is signed per stage.", "Dispensing requires a second person and captures the lot at issue.", "Critical sensor readings attach to the right step without transcription.", "Incomplete records cannot be submitted to QA."] },
    intelligence: ["Detect slow sensor drift before readings cross a limit.", "Review yield and deviation patterns by lot, equipment, room and shift.", "Ask questions across batches and sensor history, with source records attached."],
    handoffs: ["Dispensing uses the same ledger as ERP.", "Finished goods enter inventory under quarantine.", "Deviations and out-of-range readings reach QMS with batch context.", "Training, qualification and calibration standing gate the work."],
    faqs: [["Can we run MES with our existing ERP?", "Yes. MES runs on its own and connects to existing ERP and QMS systems through HTTP."], ["Does MES include electronic batch records?", "Yes. MES combines the record with planning, rooms, equipment, cleaning, dispensing and sensors."], ["Do we need a separate historian?", "MES includes a time-series store beside the room, equipment and batch context."], ["How is electronic record compliance established?", "Factro provides signatures, audit trails and access controls. Compliance is established through your site's configuration, validation and operating procedures."], ["What happens to paper records?", "Existing records remain archived. Factro captures batches from go-live onward, with masters migrated before the first run."]],
    screenshot: { id: "make-preview", image: "production-planning.png", width: 1920, height: 1341, alt: "MES production planning with capacity, orders at risk and batch schedules" },
    features: MAKE_FEATURES,
  },
  {
    slug: "qms", name: "QMS", category: "Quality Management System", title: "The gate, not the review.",
    description: "Sampling, deviations, CAPA, documents, training and qualification on the same record as the batches they govern.",
    flow: ["Sample and test", "Investigate the signal", "Verify corrective action", "Review exceptions", "Sign the decision"],
    signature: ["Release by exception.", "CAPA closes on proof.", "Training follows the SOP.", "LIMS built in."],
    problems: [
      { title: "Deviations recur under new numbers.", body: "Closed on paper, disconnected from root cause, back again next quarter." },
      { title: "Qualification lives in binders.", body: "Nobody can see at a glance whether a room's PQ is current or an instrument's calibration has lapsed." },
      { title: "Inspection means assembly.", body: "Days are spent collecting records that already exist in different places." },
    ],
    roles: [["QA reviewer", "Reads every page to discover what is missing.", "Opens a checklist showing complete evidence and unresolved exceptions."], ["QA manager", "Rebuilds months of deviation history.", "Reviews connected patterns by product, line, stage and shift."], ["Training coordinator", "Tracks SOP versions in a spreadsheet.", "Uses revision-triggered training and holds for untrained operators."], ["Head of quality", "Prepares for inspection over weeks.", "Sees a daily readiness picture with gaps and owners."]],
    spotlight: { title: "Release by exception. Never without evidence.", body: "One checklist brings the facts to QA. Time moves from assembling records to judging the exceptions.", points: ["Signed steps, line clearances and calibration stay on the checklist.", "Deviations arrive with CAPA status and supporting records.", "The COA sits alongside execution evidence for review.", "Release remains a re-authenticated human decision."] },
    intelligence: ["Cluster deviations by product, line, stage, shift, material and equipment.", "Investigate in plain language with answers linked to source records.", "Keep every quality decision with a person and a signature."],
    handoffs: ["ERP receipts open QC sampling automatically.", "QC release makes material available for dispensing.", "MES sends deviations and results with full context.", "Signed batch release makes stock available for sale."],
    faqs: [["Can we run QMS on its own?", "Yes. Add ERP or MES when ready and they join the same record."], ["How do we prove CAPA effectiveness?", "CAPA cannot close until the effectiveness review is signed. The review, evidence and original deviation stay linked."], ["Does faster review weaken oversight?", "No. QA sees steps, clearances, calibration and deviations on one checklist and focuses on unresolved exceptions."], ["Can we export records?", "Yes. Audit-ready exports keep records in inspector-readable form."], ["Which regulatory pack applies?", "The pack follows what you make. A site can carry multiple packs, with each batch using the relevant one."]],
    screenshot: { id: "release-preview", image: "capa-ai-agents.png", width: 3840, height: 2378, alt: "QMS CAPA workspace with readiness gaps and evidence-backed investigation" },
    features: RELEASE_FEATURES,
  },
  {
    slug: "one", name: "Connected System", category: "ERP + MES + QMS", title: "One record, from receipt to release.",
    description: "ERP, MES and QMS on one database. A decision in one product controls what can happen in the others.",
    flow: ["Receive in ERP", "Sample in QMS", "Execute in MES", "Sign in QMS", "Dispatch in ERP"],
    signature: ["One login and role model.", "One signature model.", "One append-only audit trail.", "One work queue.", "One genealogy."],
    problems: [
      { title: "Three systems, three records.", body: "The ERP says stock is available. Quality says it is on hold. Production has not heard either." },
      { title: "Integration never ends.", body: "Every interface needs monitoring and every upgrade needs another round of checks." },
      { title: "Nobody owns the gaps.", body: "A status that fails to sync becomes everybody's problem at inspection." },
    ],
    roles: [],
    spotlight: { title: "One model underneath.", body: "A lot in ERP is the same lot in MES and QMS. Not a copy, not a sync: the same record.", points: ["A receipt opens QC and stays in quarantine until release.", "Held lots cannot be dispensed. Equipment standing is checked before scheduling.", "SOP revisions reassign training and hold untrained operators.", "Floor deviations open with the batch, stage and equipment attached.", "Sensors write to the record. QA sign-off moves finished goods to available stock."] },
    intelligence: ["Trace a yield question through material lots, equipment history and room readings together.", "Find deviation and cycle-time patterns across departments, with the source evidence already connected.", "Ask questions across stock, batches and quality. The models advise; your team makes the signed decisions."],
    handoffs: [],
    faqs: [["Can we start with one product?", "Yes. Records carry over as you add products, and connected controls become available as each joins."], ["Why not buy ERP, MES and QMS separately?", "You can, and MES connects to external systems. A connected system keeps status, holds and decisions consistent across the plant."], ["Do the three products share one system?", "One. ERP, MES and QMS share a database, audit trail, work queue and signature model."], ["Can a plant carry more than one pack?", "Yes. Each batch uses the applicable pack, with one site-wide access model and audit log."]],
    features: [
      {
        slug: "work-management", name: "Work Management", title: "Every handover becomes accountable work.",
        description: "Keep owners, clocks, evidence and conversations together as work moves between departments.",
        sections: [
          { title: "The next person gets the context", points: ["Create owned work from operational events, with the relevant lot, batch or document already attached.", "Keep decisions and conversations on the ticket instead of rebuilding the reasoning from email and phone calls."] },
          { title: "Follow-ups happen in the system", points: ["Track due dates and escalate overdue actions against organisational goals.", "Surface blocked work and unfinished handovers before they hold up the next stage.", "Keep approvals with the people authorised to make them."] },
          { title: "One queue across ERP, MES and QMS", points: ["Bring purchasing, production, laboratory and quality work into the same work queue.", "Follow a task from assignment through completion with its evidence and audit history intact."] },
        ],
      },
      {
        slug: "genealogy", name: "Genealogy", title: "A lot has one history. In both directions.",
        description: "Trace a supplier lot through dispensing, blends, finished packs and customer delivery without joining separate registers.",
        sections: [
          { title: "Follow the material forward", points: ["Connect the receipt and supplier lot to every batch that consumes it.", "Retain parent-child relationships through production, conversion and repacking.", "See which finished lots and customer shipments depend on an input."] },
          { title: "Start from the customer and work back", points: ["Trace a dispatched lot to its production history, input materials and suppliers.", "Keep test results, release decisions and stock movements with that trail."] },
          { title: "Scope the question, not a file hunt", points: ["Use the lot relationships to identify the scope of a quality investigation or recall.", "Review the supporting evidence on the same record instead of reconciling three systems."] },
        ],
      },
      {
        slug: "capa", name: "CAPA", title: "An end-to-end correction. Not a closed ticket.",
        description: "Carry the signal from receiving, production or the laboratory through investigation, action and signed effectiveness.",
        sections: [
          { title: "Start with the complete context", points: ["Keep the deviation attached to the material, batch, stage and equipment involved.", "Review recurring signals across suppliers, products, lines and shifts with evidence-backed assistance."] },
          { title: "Actions reach every department", points: ["Assign corrective work to the responsible team with due dates and escalation.", "Keep the source finding, investigation, conversations and action evidence connected."] },
          { title: "Prove that the fix worked", points: ["Require a signed effectiveness review before closure.", "Retain the original deviation and the proof behind the decision.", "Bring open CAPA standing into the batch-release review; human reviewers retain control."] },
        ],
      },
      {
        slug: "unified-testing", name: "Unified Testing", title: "Raw material to finished pack. One test trail.",
        description: "Receipt, blend and finished-product testing stay connected to the material and batch they govern.",
        sections: [
          { title: "Sampling follows the work", points: ["Trigger receipt sampling from the GRN and retain in-process and finished-goods sampling in the same history.", "Use material-wise approved specifications, test templates and methods."] },
          { title: "Results retain their evidence", points: ["Check results against limits and link OOS and OOT investigations to the originating result.", "Keep instrument calibration, method references and certificates of analysis accessible to the reviewer."] },
          { title: "Decisions reach the next step", points: ["Keep incoming material quarantined until QC releases it.", "Bring testing and execution evidence together for the final batch decision.", "Signed release changes the stock available to dispatch."] },
        ],
      },
      {
        slug: "realtime-insights", name: "Realtime Insights", title: "See what is slowing the whole operation.",
        description: "Live stock, batch progress, quality signals and overdue work, without assembling another manual report.",
        sections: [
          { title: "An operational view, not separate reports", points: ["Monitor material availability, production progress and quality standing together.", "Surface bottlenecks and ageing handovers while there is still time to act."] },
          { title: "Ask across the shared record", points: ["Trace yield and deviation questions through lots, equipment and room readings.", "Review answers with links to the records behind them, rather than an unexplained score."] },
          { title: "Intelligence informs; people decide", points: ["Use source-backed findings to prioritise investigation and follow-up.", "Keep permissions, approvals and signed quality decisions with the authorised people."] },
        ],
      },
    ],
  },
];

export function getProduct(slug: string) {
  return PRODUCT_PAGES.find(product => product.slug === slug);
}
