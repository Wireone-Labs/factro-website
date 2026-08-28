import type { LucideIcon } from "lucide-react";
import {
  Factory,
  ShieldCheck,
  ClipboardCheck,
  Cog,
  Layers,
  GraduationCap,
  Package,
  TrendingUp,
  ShoppingCart,
  BarChart3,
} from "lucide-react";

export interface CoreModule {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  description: string;
  points: string[];
}

export const CORE_MODULES: CoreModule[] = [
  {
    id: "production",
    icon: Factory,
    tag: "Production",
    title: "Plan, schedule, and execute — with a full batch trail",
    description:
      "Turn manufacturing orders into a live production plan. Track every batch from work order to release, with visibility into machine and stage runtime as work happens.",
    points: [
      "Gantt timeline and Kanban views for every production order",
      "Batch-level execution tracking down to each stage",
      "Machine and downtime logging built into the run",
      "Release-for-dispatch workflow with sign-off",
    ],
  },
  {
    id: "quality-assurance",
    icon: ShieldCheck,
    tag: "Quality Assurance",
    title: "A quality management system, not a checklist",
    description:
      "Deviations, corrective actions, change control, and complaints run as linked workflows — so nothing closes out without the right sign-offs.",
    points: [
      "CAPA suite: deviations, corrective actions, change control, complaints",
      "Document-controlled SOPs with versioning and review history",
      "GMP Mode locks records after approval for audit-ready compliance",
      "Training sign-off tied directly to quality events",
    ],
  },
  {
    id: "quality-control",
    icon: ClipboardCheck,
    tag: "Quality Control",
    title: "Catch issues on the floor, not after the batch ships",
    description:
      "In-process quality checks run alongside live production, backed by inspection records, material disposal tracking, and equipment maintenance history.",
    points: [
      "In-process quality checks (IPQC) during live production runs",
      "Inspection and test management per batch",
      "Material disposal and non-conformance records",
      "Equipment maintenance linked to QC history",
    ],
  },
  {
    id: "shop-floor",
    icon: Cog,
    tag: "Shop Floor & Facility",
    title: "A digital twin of your plant floor",
    description:
      "Model your site down to the work center — machinery, calibration schedules, and breakdown records all live in one facility hierarchy.",
    points: [
      "Site → Units → Work Centers → Warehouses → QC Labs",
      "Machinery and equipment master data with live status",
      "Calibration and preventive maintenance scheduling",
      "Breakdown and downtime records tied to each asset",
    ],
  },
  {
    id: "library",
    icon: Layers,
    tag: "Product & Process Library",
    title: "One definition of truth for every product you make",
    description:
      "Multi-level BOMs, master formula records, batches, and regulatory compliance data — configurable to match how your products are actually specified.",
    points: [
      "Multi-item Bill of Materials and Master Formula Records",
      "Batch and material definitions with pricing and catalogs",
      "Regulatory compliance records tied to each product",
      "Custom fields and CoA templates via the Masters engine",
    ],
  },
  {
    id: "training",
    icon: GraduationCap,
    tag: "Training",
    title: "Compliance training, built into the workflow",
    description:
      "Chapters, lessons, and quizzes your operators actually complete — tracked start to finish and tied back into your quality sign-off trail.",
    points: [
      "Structured chapters, lessons, and quiz builder",
      "Start, pause, resume, and completion tracking",
      "Pass and review flows for every assessment",
      "Linked directly to QA compliance records",
    ],
  },
];

const BUSINESS_MODULES: CoreModule[] = [
  {
    id: "inventory",
    icon: Package,
    tag: "Inventory",
    title: "Stock accuracy across every warehouse",
    description:
      "Every movement — in, out, or between sites — flows through one ledger, so your stock position is never a guess.",
    points: [
      "Goods receipt notes (GRN) tied directly to purchase orders",
      "Dispatch and delivery challans from confirmed orders",
      "Sales and purchase returns tracked against the original transaction",
      "Inter-warehouse transfers with full stock visibility",
    ],
  },
  {
    id: "sales",
    icon: TrendingUp,
    tag: "Sales",
    title: "One pipeline, from enquiry to payment",
    description:
      "Every deal moves through the same trail — enquiry, quotation, order, invoice, payment — with customers and complaints tracked alongside it.",
    points: [
      "Full pipeline: enquiry, quotation, order, invoice, payment",
      "Credit notes and customer complaint tracking",
      "Customer records tied to every transaction",
      "Visibility into every open enquiry and order stage",
    ],
  },
  {
    id: "procurement",
    icon: ShoppingCart,
    tag: "Vendors & Procurement",
    title: "Sourcing you can score, not just track",
    description:
      "Qualify vendors, route purchase requests into orders, and keep every debit note and expense tied back to the right supplier.",
    points: [
      "Vendor qualification and performance scoring",
      "Purchase requests routed into purchase orders",
      "Debit notes and vendor expense tracking",
      "Material supply traced back to the originating vendor",
    ],
  },
  {
    id: "reports",
    icon: BarChart3,
    tag: "Reports & Dashboard",
    title: "Every module, one report library",
    description:
      "A pre-built set of reports spans sales, purchase, inventory, and production — surfaced through a dashboard each user can shape around their role.",
    points: [
      "Pre-built reports across sales, purchase, inventory, production",
      "Stock aging, replenishment, and vendor performance reports",
      "Role- and permission-aware dashboard widgets",
      "A configurable home screen for every user",
    ],
  },
];

export interface PlatformSection {
  id: string;
  modules: CoreModule[];
}

export const PLATFORM_SECTIONS: PlatformSection[] = [
  { id: "production", modules: [CORE_MODULES[0]] },
  { id: "shop-floor", modules: [CORE_MODULES[3]] },
  { id: "quality", modules: [CORE_MODULES[1], CORE_MODULES[2]] },
  { id: "library", modules: [CORE_MODULES[4]] },
  { id: "training", modules: [CORE_MODULES[5]] },
  { id: "inventory", modules: [BUSINESS_MODULES[0]] },
  { id: "sales", modules: [BUSINESS_MODULES[1]] },
  { id: "procurement", modules: [BUSINESS_MODULES[2]] },
  { id: "reports", modules: [BUSINESS_MODULES[3]] },
];
