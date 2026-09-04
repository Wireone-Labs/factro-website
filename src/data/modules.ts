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
  Brain,
} from "lucide-react";

export interface CoreModuleScreenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface CoreModule {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  points: string[];
  /** Named workspaces/screens within the module. */
  submodules: string[];
  /** Capabilities and behaviors, as distinct from named workspaces. */
  features: string[];
  screenshot?: CoreModuleScreenshot;
}

export const CORE_MODULES: CoreModule[] = [
  {
    id: "sales",
    icon: TrendingUp,
    tag: "Sales",
    title: "Enquiry to dispatch",
    description:
      "Every deal moves through the same trail, so nothing gets promised that the floor can't deliver.",
    points: [
      "Enquiries",
      "Quotations",
      "Sales Orders",
      "Invoices & receivables",
      "Customer management with licence tracking",
    ],
    submodules: ["Enquiries", "Quotations", "Sales Orders", "Invoices & receivables"],
    features: ["Customer management with licence tracking"],
  },
  {
    id: "purchase",
    icon: ShoppingCart,
    tag: "Purchase",
    title: "Nothing enters unapproved",
    description:
      "Material requests route into purchase orders, and every goods receipt is matched before it counts as stock.",
    points: [
      "Material Requests",
      "Purchase Orders",
      "Vendor management with OTIF & licence tracking",
      "GRN with 3-way match",
      "Reorder point triggers",
    ],
    submodules: ["Material Requests", "Purchase Orders"],
    features: [
      "Vendor management with OTIF & licence tracking",
      "GRN with 3-way match",
      "Reorder point triggers",
    ],
    screenshot: {
      src: "/dashboard/purchase-dashboard.png",
      alt: "Factro Purchase dashboard showing order book value, supplier deviation rate and vendor OTIF",
      width: 1920,
      height: 1490,
    },
  },
  {
    id: "inventory",
    icon: Package,
    tag: "Inventory",
    title: "Nothing reaches the floor unchecked",
    description:
      "One ledger for every movement, with hold and quarantine status enforced before material ever reaches a batch.",
    points: [
      "GRN to stock",
      "Stock ledger & audit",
      "FIFO/FEFO",
      "Hold, quarantine, release status control",
      "Expiry & retest alerts",
    ],
    submodules: ["GRN to stock", "Stock ledger & audit", "FIFO/FEFO"],
    features: ["Hold, quarantine, release status control", "Expiry & retest alerts"],
  },
  {
    id: "facility",
    icon: Building2,
    tag: "Facility",
    title: "Your plant, modelled once",
    description:
      "Sites, warehouses, zones and equipment live in one hierarchy, with calibration and maintenance tracked against every asset.",
    points: [
      "Multi-site structure",
      "Warehouse, zone & bin mapping",
      "Equipment & asset master",
      "IQ/OQ/PQ & calibration",
      "Preventive maintenance",
    ],
    submodules: ["Warehouse, zone & bin mapping", "Equipment & asset master", "IQ/OQ/PQ & calibration"],
    features: ["Multi-site structure", "Preventive maintenance"],
  },
  {
    id: "production",
    icon: Factory,
    tag: "Production",
    title: "The record writes itself",
    description:
      "Batch records are complete when the batch is, with capacity checks, line clearance and release built into the run.",
    points: [
      "Production planner with capacity checks",
      "Electronic batch records (eBMR, eBPR)",
      "Line clearance per stage",
      "Batch Release with COA",
      "Dispensing with second-person verification",
    ],
    submodules: ["Production Planner", "Electronic batch records (eBMR, eBPR)", "Batch Release"],
    features: [
      "Capacity checks on every planned order",
      "Line clearance per stage",
      "COA generation on release",
      "Dispensing with second-person verification",
    ],
    screenshot: {
      src: "/dashboard/production-planning.png",
      alt: "Factro Production Orders dashboard showing schedule adherence, center utilization and the weekly order timeline",
      width: 1920,
      height: 1341,
    },
  },
  {
    id: "quality",
    icon: ShieldCheck,
    tag: "Quality",
    title: "The gate, not the review",
    description:
      "Sampling, deviations and change control run as one workflow, with inspection readiness scored continuously, not assembled after the fact.",
    points: [
      "QC sampling at GRN, IPQC, FG",
      "Deviations, OOS/OOT investigation",
      "Change control & audit management",
      "Vendor qualification",
      "Live inspection-readiness score",
    ],
    submodules: [
      "QC sampling at GRN, IPQC, FG",
      "Deviations & OOS/OOT investigation",
      "Change control & audit management",
      "Vendor qualification",
    ],
    features: ["Live inspection-readiness score"],
  },
  {
    id: "capa",
    icon: FileWarning,
    tag: "CAPA",
    title: "Close the loop with proof",
    description:
      "Every complaint and deviation routes into a tracked corrective action, with an effectiveness review before it's allowed to close.",
    points: [
      "Complaint intake",
      "Deviation-triggered CAPA",
      "Root cause investigation",
      "Cross-department actions with owners",
      "Effectiveness review before closure",
    ],
    submodules: ["Complaint intake", "Root cause investigation"],
    features: [
      "Deviation-triggered CAPA",
      "Cross-department actions with named owners",
      "Effectiveness review before closure",
    ],
  },
  {
    id: "documents",
    icon: FileText,
    tag: "Documents",
    title: "One version, everywhere",
    description:
      "SOPs are version-controlled and signed electronically, with every anchor pointing back to the step it governs.",
    points: [
      "Controlled document register",
      "SOP version history",
      "Electronic signature on approval",
      "Review-date tracking",
      "SOP anchors on the steps they govern",
    ],
    submodules: ["Controlled document register", "SOP version history"],
    features: [
      "Electronic signature on approval",
      "Review-date tracking",
      "SOP anchors on the steps they govern",
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    tag: "Training",
    title: "Proof, not attendance",
    description:
      "Training is assigned against the document version in force, and reassigned automatically the moment that version changes.",
    points: [
      "Assignment tied to document version",
      "Automatic reassignment on SOP revision",
      "Competency matrix",
      "Shop-floor training hold",
      "Inspection-ready records",
    ],
    submodules: ["Competency matrix", "Inspection-ready records"],
    features: [
      "Assignment tied to document version",
      "Automatic reassignment on SOP revision",
      "Shop-floor training hold",
    ],
  },
  {
    id: "library",
    icon: Layers,
    tag: "Library",
    title: "Every master in one place",
    description:
      "Materials, formulas, BOMs and regulatory documents share one catalog, so every module pulls from the same source of truth.",
    points: [
      "Material & product catalogs",
      "Master Formula, Batch & Packaging Records",
      "Bill of Materials",
      "Pricing & tax codes",
      "Regulatory documents",
    ],
    submodules: [
      "Material & product catalogs",
      "Master Formula, Batch & Packaging Records",
      "Bill of Materials",
      "Regulatory documents",
    ],
    features: ["Pricing & tax codes"],
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
  description: string;
}

export const UNDERNEATH_EVERY_MODULE: UnderneathItem[] = [
  {
    id: "process",
    icon: Workflow,
    title: "Process & Ticketing",
    description:
      "Cross-department handovers with named owners, threaded conversations and SLA clocks.",
  },
  {
    id: "intelligence",
    icon: Brain,
    title: "Intelligence",
    description:
      "AI Assistant, Deviation Intelligence and Compliance Checker. Governed, citation-linked, nothing leaves your tenant. (Beta, Q4 2026)",
  },
];
