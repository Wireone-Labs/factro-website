import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Building2,
  Factory,
  ShieldCheck,
  FileWarning,
  FileText,
  GraduationCap,
  Layers,
  Workflow,
  BarChart3,
  Users,
  Landmark,
  Sparkles,
  LineChart,
  SearchCheck,
  Signature,
  GitBranch,
  BellRing,
  Search,
  FileClock,
} from "lucide-react";

export interface ModuleCategory {
  heading: string;
  description: string;
}

export interface CoreModule {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  /** Named workspaces/screens within the module (used in the homepage preview). */
  submodules: string[];
  /** Capabilities and behaviors, as distinct from named workspaces (homepage preview). */
  features: string[];
  /** Body copy for the Modules page — two or three short paragraphs. */
  narrative: string[];
  /** Exhaustive capability list for the Modules page, shown after submodules. */
  capabilities: string[];
  /** Full breakdown by sub-area, used on the Modules page. */
  categories: ModuleCategory[];
}

export const CORE_MODULES: CoreModule[] = [
  {
    id: "sales",
    icon: TrendingUp,
    tag: "Sales",
    title: "Enquiry to dispatch",
    description:
      "Every deal moves through the same trail, so nothing gets promised that the floor can't deliver.",
    submodules: [
      "Enquiries",
      "Quotations",
      "Sales Orders",
      "Invoices & receivables",
      "Customer master",
      "Credit notes & returns",
    ],
    features: [
      "Customer management with licence tracking",
      "Price list & discount rules per customer",
      "Order-to-delivery status tracking",
      "Payment terms & ageing visibility",
      "Dispatch scheduling tied to production",
    ],
    narrative: [
      "Most plants promise a delivery date from a spreadsheet and find out later that the line was booked or the material wasn't released. Here the order is connected to the batch that will fill it, so the date you commit is the date the floor can actually hit. When production slips, the order shows it the same day, not at month end.",
      "A customer whose drug licence has expired cannot be invoiced. The system checks at order entry, not at dispatch, when it is already too late.",
    ],
    capabilities: [
      "Quotations and sales orders generated from the same price list",
      "Sales invoicing with credit notes and receivables tracking",
      "Customer licence tracking enforced at order entry",
      "Sales returns handling, linked back to the original order",
      "Multi-currency conversion for cross-border customers",
      "Reminders and alerts for quotation expiry and payment overdue",
    ],
    categories: [
      {
        heading: "Customers",
        description: "master with licence validity enforced at order entry, credit limits, receivables",
      },
      {
        heading: "Orders",
        description: "enquiries, quotations, sales orders linked to the batch that fills them",
      },
      {
        heading: "Billing",
        description: "invoicing against the order with over-invoicing blocked, payments, credit notes",
      },
      {
        heading: "Dispatch",
        description: "allocated by batch, blocked until QA release",
      },
    ],
  },
  {
    id: "purchase",
    icon: ShoppingCart,
    tag: "Purchase",
    title: "Nothing enters unapproved",
    description:
      "Material requests route into purchase orders, and every goods receipt is matched before it counts as stock.",
    submodules: [
      "Material Requests",
      "Purchase Orders",
      "RFQ & vendor quotations",
      "GRN (Goods Receipt Note)",
      "Vendor master",
      "Return to vendor",
    ],
    features: [
      "Vendor management with OTIF & licence tracking",
      "GRN with 3-way match",
      "Reorder point triggers",
      "Purchase price variance tracking",
      "Emergency purchase flagging",
      "Purchase spends vs budget monitoring",
      "Vendor compliance scoring",
      "Supplier deviation rate tracking",
    ],
    narrative: [
      "Procurement usually judges vendors on price, because that is the only number anyone has. This module computes on-time-in-full from your own receipts, weights recent performance higher, and separates supplier delay from your own QC hold time. The vendor who looks slow is often waiting on your lab.",
      "Nothing becomes usable stock on receipt. Every container gets a control number and sits in quarantine until it passes inspection.",
    ],
    capabilities: [
      "Material requests routed into purchase orders",
      "Debit notes raised against vendor shortfalls",
      "Vendor management with OTIF and licence tracking",
      "Purchase invoicing and payments against the order",
    ],
    categories: [
      {
        heading: "Requests",
        description: "raised from the floor or triggered by reorder point, approved before an order exists",
      },
      {
        heading: "Orders",
        description: "approval by value band, amendments tracked as revisions",
      },
      {
        heading: "Vendors",
        description: "qualification status, licence tracking, time-weighted OTIF, price and lead-time history",
      },
      {
        heading: "Receipt",
        description: "GRN with three-way match, control number per container, automatic quarantine",
      },
    ],
  },
  {
    id: "inventory",
    icon: Package,
    tag: "Inventory",
    title: "Nothing reaches the floor unchecked",
    description:
      "One ledger for every movement, with hold and quarantine status enforced before material ever reaches a batch.",
    submodules: [
      "GRN to stock",
      "Stock ledger & audit",
      "FIFO/FEFO allocation",
      "Hold & quarantine",
      "Cycle count",
      "Material transfer",
    ],
    features: [
      "Hold, quarantine, release status control",
      "Expiry & retest alerts",
      "Bin-level stock visibility",
      "Batch-wise stock valuation",
      "Reconciliation variance tracking",
      "Nearing-expiry receipts dashboard",
    ],
    narrative: [
      "Most systems track stock as a quantity against an item code. That is enough for accounting and useless for a recall. Here every container carries its own control number, expiry, retest date and location, and every movement it ever makes sits on one ledger you can read top to bottom.",
      "Status is enforced, not advisory. Quarantined material cannot be dispensed, expired material cannot be picked, and a repack carries its parent control number forward so genealogy survives the conversion.",
    ],
    capabilities: [
      "Stock tracking and ledger down to the control number",
      "GRN-to-stock workflow with three-way match",
      "FIFO and FEFO issuing logic",
      "Material requisition and dispensing",
      "Sales and purchase returns handled against the original receipt",
      "Goods dispatch records, delivery challans and e-way bills",
      "Reminders and alerts for expiry, reorder point and periodic inspection",
      "Stock held in hold, reservation and quarantine states",
    ],
    categories: [
      {
        heading: "Stock",
        description: "tracked at control number level, located to the bin, status-gated",
      },
      {
        heading: "Ledger",
        description: "every receipt, transfer, adjustment, issue, return and disposal in one chronological view",
      },
      {
        heading: "Movement",
        description: "FIFO and FEFO at reservation, code-to-code transfer that carries genealogy through repack",
      },
      {
        heading: "Shelf life",
        description: "expiry and retest per container, expired stock blocked from dispensing",
      },
      {
        heading: "Labels",
        description: "container, status, dispensing and shipper labels with barcodes, reprints tracked",
      },
      {
        heading: "Disposal",
        description: "approved write-off with reason, method and certificate",
      },
    ],
  },
  {
    id: "facility",
    icon: Building2,
    tag: "Facility",
    title: "Your plant, modelled once",
    description:
      "Sites, warehouses, zones and equipment live in one hierarchy, with cleaning, calibration and maintenance tracked against every asset.",
    submodules: [
      "Multi-site structure",
      "Warehouse, zone & bin mapping",
      "Equipment & asset master",
      "Calibration schedule",
      "Maintenance log",
    ],
    features: [
      "IQ/OQ/PQ tracked per asset",
      "Preventive maintenance scheduling",
      "Calibration due-date alerts",
      "Equipment usage log linked to batch records",
      "Site-level capacity modelling",
    ],
    narrative: [
      "Cleaning schedules, calibration certificates and maintenance logs usually live in three separate registers that nobody reconciles until an audit. Model the plant once and all three hang off the same asset.",
      "The payoff is enforcement. A line whose clean hold time has expired cannot be scheduled. An instrument past its calibration date cannot be used to record a result. You find out before the batch, not after.",
    ],
    capabilities: [
      "Equipment and work centre registers",
      "Calibration records per asset",
      "Runtime, idle time and downtime tracking",
      "Maintenance and breakdown records",
      "Capacity utilisation and throughput monitoring",
    ],
    categories: [
      {
        heading: "Structure",
        description: "multi-site, warehouse, zone and bin, with areas designated drug or food",
      },
      {
        heading: "Assets",
        description: "equipment master linked to the lines and stages that use it",
      },
      {
        heading: "Cleaning",
        description: "schedules per line and asset, clean and dirty hold times, expired cleaning blocks scheduling",
      },
      {
        heading: "Qualification",
        description: "IQ, OQ, PQ and calibration, with overdue assets taken out of use",
      },
      {
        heading: "Maintenance",
        description: "preventive schedules, breakdown records, downtime and cost",
      },
    ],
  },
  {
    id: "production",
    icon: Factory,
    tag: "Production",
    title: "The record writes itself",
    description:
      "Batch records are complete when the batch is, with capacity checks, line clearance and release built into the run.",
    submodules: [
      "Production Planner",
      "Electronic batch records (eBMR, eBPR)",
      "Batch Release",
      "Dispensing",
      "Line clearance",
    ],
    features: [
      "Capacity checks on every planned order",
      "Schedule adherence & center utilization tracked live",
      "Orders-at-risk flagged automatically",
      "Line clearance per stage",
      "COA generation on release",
      "Dispensing with second-person verification",
      "Kanban and timeline views of every batch",
    ],
    narrative: [
      "The batch record is not a form filled in after the shift. It is the work. Operators record at the step, the timestamp is the moment of entry, and the record is complete when the batch is. There is no transcription window and nothing to reconstruct on Friday.",
      "Planning checks what actually constrains a plant. Line availability, shift calendar, cleaning status, and collisions across equipment, rooms and people. Two batches cannot claim the same resource, and when they try, the system names the batch that is blocking.",
      "In-process checks are defined on the template per stage. A stage cannot close until its checks are recorded and inside the limit. An out-of-limit value raises a deviation and holds the batch rather than being quietly saved.",
    ],
    capabilities: [
      "Production planner with material, machine and resource visibility",
      "Bill of Materials synchronised with the formulation",
      "Electronic batch records generated from the template",
      "In-process quality control at the stage",
      "BMR and BPR generation",
      "Batch tracking and analysis",
      "Batch release forms",
    ],
    categories: [
      {
        heading: "Planning",
        description: "capacity against shift and cleaning status, collision detection across lines, equipment, rooms and people",
      },
      {
        heading: "Execution",
        description: "eBMR and eBPR stage by stage, entered at the step, signed by performer and verifier",
      },
      {
        heading: "Dispensing",
        description: "reservation of specific containers, second-person verification at the scale",
      },
      {
        heading: "In-process QC",
        description: "checks defined per stage, stage cannot close until they pass",
      },
      {
        heading: "Release",
        description: "yield reconciled, labels reconciled, COA generated, QA release as its own signed decision",
      },
    ],
  },
  {
    id: "quality",
    icon: ShieldCheck,
    tag: "Quality",
    title: "The gate, not the review",
    description:
      "Sampling, deviations and change control run as one workflow, with inspection readiness scored continuously, not assembled after the fact.",
    submodules: [
      "QC sampling at GRN, IPQC, FG",
      "Deviations & OOS/OOT investigation",
      "Change control & audit management",
      "Vendor qualification",
      "Stability studies",
    ],
    features: [
      "Live inspection-readiness score",
      "Sampling plan enforcement (AQL)",
      "Root-cause linked deviation trends",
      "Change control impact assessment",
      "Vendor audit scheduling & scoring",
    ],
    narrative: [
      "Quality in most plants is a review function. Work happens, quality checks it afterwards, and the paperwork catches up over the following week. Here quality is a gate the work has to pass through, so a failing result stops the batch at the step instead of being found at release.",
      "Deviations, OOS investigations and change control run as one connected workflow rather than three registers. Readiness is scored continuously from open events, overdue actions and expired documents, so you know where you stand on any given Tuesday, not only after a fortnight of preparation.",
    ],
    capabilities: [
      "QC sampling at GRN, IPQC and finished goods",
      "Assay calculation and COA generation",
      "Deviation records linked directly to CAPA",
      "Stock disposal records",
      "Compliance ranking and scoring",
      "Batch and lot traceability",
    ],
    categories: [
      {
        heading: "Testing",
        description: "sampling at GRN, in-process and finished goods, judged against the specification at entry",
      },
      {
        heading: "Events",
        description: "deviations, OOS and OOT investigation, impact assessment, signed disposition",
      },
      {
        heading: "Change control",
        description: "impact across documents, training and process, verified after implementation",
      },
      {
        heading: "Supplier quality",
        description: "qualification, re-audit scheduling, COA against the receipt",
      },
      {
        heading: "Readiness",
        description: "live inspection-readiness score, audit trail review, findings tracked to closure",
      },
    ],
  },
  {
    id: "capa",
    icon: FileWarning,
    tag: "CAPA",
    title: "Close the loop with proof",
    description:
      "Every complaint and deviation routes into a tracked corrective action, with an effectiveness review before it's allowed to close.",
    submodules: [
      "Complaint intake",
      "Root cause investigation",
      "Corrective action tracker",
      "Preventive action tracker",
    ],
    features: [
      "Deviation-triggered CAPA",
      "Cross-department actions with named owners",
      "Effectiveness review before closure",
      "Recurrence detection across CAPAs",
      "SLA clock on every open action",
    ],
    narrative: [
      "CAPA fails in the same place everywhere. Actions get assigned, someone marks them done, and nobody checks whether the problem stopped happening. The effectiveness criteria are written at closure to match whatever was achieved.",
      "Here the criteria are set when the action is approved, before anyone knows the outcome. Closure is blocked until the review passes. Complaints, deviations and audit findings all feed the same pipeline, so a recurring issue is visible as a pattern rather than as five unrelated records.",
    ],
    capabilities: [
      "Deviation records routed directly into CAPA",
      "Actions logged, approved and monitored through to closure",
      "Linked to deviations, audits and non-conformance records",
      "Continuous-improvement tracking with accountable ownership",
    ],
    categories: [
      {
        heading: "Intake",
        description: "customer complaints, deviation-triggered CAPA, audit findings, trend triggers",
      },
      {
        heading: "Investigation",
        description: "structured root cause, scope across batches and sites",
      },
      {
        heading: "Actions",
        description: "cross-department owners and due dates, with escalation",
      },
      {
        heading: "Effectiveness",
        description: "criteria set at approval, reviewed before closure is permitted",
      },
    ],
  },
  {
    id: "documents",
    icon: FileText,
    tag: "Documents",
    title: "One version, everywhere",
    description:
      "SOPs are version-controlled and signed electronically, with every anchor pointing back to the step it governs.",
    submodules: [
      "Controlled document register",
      "SOP version history",
      "Document change requests",
      "Distribution & acknowledgement",
    ],
    features: [
      "Electronic signature on approval",
      "Review-date tracking",
      "SOP anchors on the steps they govern",
      "Obsolete-version lockout",
      "Cross-linked document dependencies",
    ],
    narrative: [
      "Controlled documents usually sit in a folder while the real discussion happens over email and WhatsApp, then someone types the outcome into the next revision. The reasoning is lost and the reviewer who raised the concern has no record of it.",
      "Review happens on the document. Comments anchor to the passage in question, reviewers get tagged, threads resolve before approval, and the discussion stays attached to the revision it produced. The operator, meanwhile, sees the governing SOP at the step, at the version in force, so there is no question of working to a superseded copy.",
    ],
    capabilities: [
      "Built-in rich text editor for authoring",
      "Version control with complete revision history",
      "Collaboration and drafts ahead of approval",
      "Electronic signatures on every approval",
      "SOP rollouts with full traceability",
    ],
    categories: [
      {
        heading: "Register",
        description: "controlled documents, separate sets for drug and food, draft through obsolete",
      },
      {
        heading: "Drafting",
        description: "block authoring, threaded comments anchored to the passage, highlighting, user tagging",
      },
      {
        heading: "Control",
        description: "numbered revisions on approval, one effective version, full change history",
      },
      {
        heading: "Lifecycle",
        description: "review dates, periodic re-approval, supersession",
      },
      {
        heading: "Anchoring",
        description: "the operator sees the governing SOP at the step, at the version in force",
      },
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    tag: "Training",
    title: "Proof, not attendance",
    description:
      "Training is assigned against the document version in force, and reassigned automatically the moment that version changes.",
    submodules: ["Competency matrix", "Training calendar", "Inspection-ready records"],
    features: [
      "Assignment tied to document version",
      "Automatic reassignment on SOP revision",
      "Shop-floor training hold until competency confirmed",
      "Trainer sign-off capture",
      "Refresher-due alerts",
    ],
    narrative: [
      "A signed attendance sheet proves someone was in the room. It does not prove they were trained on the version of the SOP in force today. When a procedure is revised, most plants discover the gap during an audit.",
      "Training is assigned against a specific document version. Revise the SOP and everyone trained on the old version is reassigned automatically. Until they complete it, the shop-floor hold keeps them off the step. Courses, assessments and competency records live in the same place as the documents they teach, so there is no separate LMS to reconcile.",
    ],
    capabilities: [
      "Exit tickets and session logs for every training session",
      "Version-controlled content tied to the document it teaches",
    ],
    categories: [
      {
        heading: "Content",
        description: "courses from documents, slides and video, sequenced with prerequisites, versioned with the SOP",
      },
      {
        heading: "Assignment",
        description: "tied to the document version, reassigned on revision, escalated when overdue",
      },
      {
        heading: "Assessment",
        description: "question banks, pass criteria, read-and-understood with electronic signature",
      },
      {
        heading: "Competency",
        description: "matrix by person and task, with requalification intervals",
      },
      {
        heading: "Enforcement",
        description: "shop-floor hold, so an untrained operator cannot be assigned the step",
      },
    ],
  },
  {
    id: "library",
    icon: Layers,
    tag: "Library",
    title: "Every master in one place",
    description:
      "Materials, formulas, BOMs and regulatory documents share one catalog, so every module pulls from the same source of truth.",
    submodules: [
      "Material & product catalogs",
      "Master Formula, Batch & Packaging Records",
      "Bill of Materials",
      "Regulatory documents",
    ],
    features: [
      "Pricing & tax codes",
      "Version-controlled master data shared across every module",
      "Single source of truth for specs and formulas",
    ],
    narrative: [
      "When the formulation lives in one system, the BOM in another and the specification in a spreadsheet, they drift. The batch record is then built from whichever copy the person had open.",
      "One catalog feeds every module. The batch record is generated from the active Master Formula Record, so it cannot diverge from the approved method, and changing that record takes a second credential. One formulation can carry several brands, each with its own pack, artwork and pricing, without duplicating the formula.",
    ],
    capabilities: [
      "Material lead time tracking",
      "Pricing and tax codes shared across modules",
      "Regulatory compliance documents held against the licence",
      "Master records for formulations",
      "Master records for stock inspection and methods of analysis",
      "Production masters",
      "Warehouse management",
    ],
    categories: [
      {
        heading: "Materials and products",
        description: "specifications, assay limits, shelf life, storage, drug or food classification",
      },
      {
        heading: "Brands",
        description: "one formulation, many brands, each with its own pack, artwork and pricing",
      },
      {
        heading: "Formulations",
        description: "Master Formula, BMR and BPR templates, one active version, second credential to change",
      },
      {
        heading: "Templates",
        description: "BOM, IPQC, methods of analysis, material tests",
      },
      {
        heading: "Regulatory",
        description: "licences and registrations with validity tracking, separate sets for drug and food",
      },
    ],
  },
];

export interface PlatformSection {
  id: string;
  modules: CoreModule[];
}

export const PLATFORM_SECTIONS: PlatformSection[] = CORE_MODULES.map((mod) => ({
  id: mod.id,
  modules: [mod],
}));

export interface UnderneathItem {
  id: string;
  icon: LucideIcon;
  title: string;
  points: string[];
}

export const UNDERNEATH_EVERY_MODULE: UnderneathItem[] = [
  {
    id: "compliance-core",
    icon: ShieldCheck,
    title: "Compliance core",
    points: [
      "Append-only, hash-chained audit trail on every record",
      "Role-based access with segregation of duties",
      "Reason for change required on controlled fields",
      "The trail cannot be turned off, edited or backdated — not even by an administrator",
    ],
  },
  {
    id: "digital-signatures",
    icon: Signature,
    title: "Digital signatures",
    points: [
      "Electronic signature with re-authentication, meaning and timestamp on every approval",
      "RFC 3161 timestamp from our own timestamp authority, independently verifiable by any PDF reader",
      "Signature meaning is chosen at the moment of signing — performed, reviewed, approved — never inferred from role after the fact",
    ],
  },
  {
    id: "work-management",
    icon: Workflow,
    title: "Work management",
    points: [
      "Cross-department handovers ticketed with named owners",
      "SLA clocks with automatic escalation",
      "Threaded conversation attached to the record",
      "A ticket crossing a shift change carries its full history forward, not a verbal note at the gate",
    ],
  },
  {
    id: "genealogy",
    icon: GitBranch,
    title: "Genealogy",
    points: [
      "Forward and backward trace from raw material lot to dispatched pack",
      "Repack and code-to-code conversions carry the parent control number forward, so lineage survives the conversion",
      "One query resolves every batch and pack touched by a contaminated lot — forward to the customer, backward to the vendor",
    ],
  },
  {
    id: "monitoring",
    icon: BellRing,
    title: "Real-time monitoring and alerts",
    points: [
      "Reorder point, expiry and SLA breaches surface the moment they trigger, not at shift end",
      "Deviations and OOS events raise immediately and hold the batch",
      "Alerts route to the person who owns the queue, not a shared inbox nobody checks",
    ],
  },
  {
    id: "reports",
    icon: BarChart3,
    title: "Reports",
    points: [
      "Module dashboards computed continuously — nothing to manually compile",
      "Regulatory exports in a form an inspector can read",
      "Any number on a dashboard opens to the record behind it — no drill-down request, no waiting on IT",
    ],
  },
  {
    id: "search",
    icon: Search,
    title: "Search",
    points: [
      "Universal search across every module and record, not one workspace at a time",
      "Fully indexed, so results return instantly instead of scanning tables on demand",
      "Resolves a partial batch number, lot code or scanned barcode straight to the record, not a list of maybe-matches",
    ],
  },
  {
    id: "electronic-records",
    icon: FileClock,
    title: "Electronic records",
    points: [
      "Answer an auditor's question in seconds, not a week of file pulls",
      "Every field-level change carries who, when and why, recorded before the change was allowed to happen",
      "No deletions past draft, and no signature without re-entering a password",
    ],
  },
];

export interface RoadmapItem {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    id: "hr",
    icon: Users,
    title: "HR",
    description:
      "Attendance, leave and shift rostering on the same shift calendar production already runs on.",
  },
  {
    id: "accounts",
    icon: Landmark,
    title: "Accounts",
    description:
      "COGS, tax computation and statutory filings reconciled against the batch and stock records, without a separate finance system to keep in sync.",
  },
  {
    id: "ai-assistant",
    icon: Sparkles,
    title: "AI Assistant",
    description:
      "Ask questions across every module in plain language, answered only from your own data, with a citation back to the record.",
  },
  {
    id: "demand-forecasting",
    icon: LineChart,
    title: "Demand forecasting",
    description:
      "Forecasting that alerts before a material shortage can form, from the Agentic RAG layer already watching every record.",
  },
  {
    id: "deviation-analysis",
    icon: SearchCheck,
    title: "Anomaly and deviation clustering",
    description:
      "Anomalies and deviations clustered by product, line, stage and shift, so a recurring root cause is visible before it recurs again.",
  },
];
