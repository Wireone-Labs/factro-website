import type { ProductSlug } from "./product-detail-content";

export type ProductModule = {
  id: string;
  title: string;
  product: "ERP" | "MES" | "QMS" | "Included";
  description: string;
  items: string[];
  features?: string[];
};

export const PRODUCT_DETAIL_MODULES: ProductModule[] = [
  { id: "sales", title: "Sales", product: "ERP", description: "From customer and enquiry to payment and credit note.", items: ["Customers", "Enquiries", "Quotations", "Orders", "Dispatches", "Invoices", "Payments", "Credit notes"], features: ["Drug License Checks", "Quote-to-Catalog", "Lead-to-Order", "E-way bills & E-invoices"] },
  { id: "purchase", title: "Purchase", product: "ERP", description: "Requests, orders and receipts, from vendors qualified for each material.", items: ["Requests", "Orders", "Receipts", "Vendors", "Vendor OTIF", "Material price trends", "Debit notes", "Expenses"] },
  { id: "inventory", title: "Inventory", product: "ERP", description: "Stock on hand, what is moving and what is expiring, lot by lot.", items: ["Stocks", "Goods received", "Dispensing", "Material exchanges", "Stock moves", "Stock ledger", "Dispatch", "Returns"] },
  { id: "storage", title: "Warehouse", product: "ERP", description: "Your stores as they are: zones, racks and bins, with their capacities.", items: ["Warehouses", "Warehouse Map", "Storage zones", "Relocation", "Uplifting", "Disposal", "Bin ledger"], features: ["Duty Roster", "Facility Care"] },
  { id: "planning", title: "Planning", product: "MES", description: "Production plans against sales orders, material and work centre availability, through to approval.", items: ["Orders board", "Timeline", "Sales order demand", "Material forecast", "Work centre availability", "Maintenance windows", "Exhibit orders", "Approval"] },
  { id: "production", title: "Work orders", product: "MES", description: "Approved plans become batches, run step by step on the electronic batch record.", items: ["Batches", "Batch execution", "Routing", "IPQC holds", "Reconciliation", "Yield", "Deviations", "Genealogy", "Dispatch trace"] },
  { id: "rooms-equipment", title: "Shop floor", product: "MES", description: "Units, work centres and the equipment in them. Runtime, downtime, calibration and upkeep are logged here.", items: ["Units", "Work centres", "Equipment and machinery", "Runtime logs", "Downtime logs", "Calibration", "Maintenance", "Upkeep"] },
  { id: "quality", title: "Quality control", product: "QMS", description: "Samples and results against approved specifications, for every material and batch.", items: ["Samples", "Results", "OOS and OOT", "Specifications", "Raw material tests", "IPQC checks", "Finished product tests", "CoA"] },
  { id: "capa", title: "Quality assurance", product: "QMS", description: "Records and approvals: release, sign-offs, gaps and CAPA.", items: ["Overview", "Approvals", "Release", "Gap register", "Deviations", "CAPA", "Change control", "Complaints"] },
  { id: "laboratory", title: "Laboratory", product: "QMS", description: "Labs, the instruments in them, reference standards and calibration.", items: ["Labs", "Instruments", "Reference standards", "Validation packs", "Calibration", "Maintenance", "Accreditation", "Upkeep"] },
  { id: "training", title: "Training", product: "QMS", description: "Courses, quizzes and a competency matrix that gates GxP tasks.", items: ["Courses", "Trainee view", "Trainer view", "Quiz builder", "Assessments", "Competency matrix", "Training tickets", "Training records"] },
  { id: "dashboard", title: "Dashboard", product: "Included", description: "Dashboards you shape yourself, with your own tabs and metrics.", items: ["Overview", "Custom tabs", "Widget catalogue", "Compliance score"] },
  { id: "work-management", title: "My work", product: "Included", description: "Every ticket, approval and task for you or your team.", items: ["Board", "List", "Tickets", "Notifications", "Related search"] },
  { id: "documents", title: "Documents", product: "QMS", description: "Controlled documents across every module, from draft to effective.", items: ["Library", "Revisions", "Review and approval", "Training", "Where used", "Periodic review", "Safety instructions"] },
  { id: "library", title: "Library", product: "Included", description: "The master data every module reads, edited in one place.", items: ["Masters", "Materials", "Formulations", "MPCR", "Specifications", "Routing designer", "Site"] },
];

export function productModules(slug: ProductSlug) {
  return PRODUCT_DETAIL_MODULES.filter(module => slug === "one" || module.product === "Included" || module.product.toLowerCase() === slug);
}

export const PRODUCT_ANCHOR_ALIASES: Record<ProductSlug, Record<string, string[]>> = {
  erp: { purchase: ["accounting"] },
  mes: { "rooms-equipment": ["sensor-data"] },
  qms: { capa: ["batch-release"], laboratory: ["qualification"] },
  one: { inventory: ["genealogy"], quality: ["unified-testing"], dashboard: ["realtime-insights"] },
};
