import { Factory, ShieldCheck, Workflow } from "lucide-react";
import { SYSTEM_GROUPS } from "./system-capabilities";

export const SOLUTIONS = [
  { slug: "erp", name: "ERP", fullName: "Enterprise Resource Planning", title: "Connect demand to delivery.", description: "Make purchasing, stock and customer commitments part of the same operating picture.", features: ["Turn confirmed demand into purchase and production requirements before shortages stall the floor", "Control working capital with lot-level availability, expiry-aware stock and release status", "Trace each customer commitment from order through fulfilment, dispatch and invoicing"], icon: Workflow, href: "/solutions/erp", modules: SYSTEM_GROUPS[0].modules, handover: "Pass production demand and released material lots to MES. Bring QMS release decisions back into stock availability and dispatch." },
  { slug: "mes", name: "MES", fullName: "Manufacturing Execution System", title: "Keep the floor moving.", description: "Plan the batch, guide execution and capture the record as work happens, not at the end of the shift.", features: ["Commit to achievable schedules with batch sequencing, capacity and equipment readiness in one view", "Capture execution, material reconciliation and signatures in the electronic batch record as work happens", "Expose yield loss, stage delays and open handovers early enough for the next shift to act"], icon: Factory, href: "/solutions/mes", modules: SYSTEM_GROUPS[1].modules, handover: "Turn ERP demand into executable batches. Pass the batch history, in-process results and exceptions to QMS for review." },
  { slug: "qms", name: "QMS", fullName: "Quality Management System", title: "Make quality part of the work.", description: "Connect quality decisions to the evidence, people and processes behind every batch.", features: ["Connect incoming, in-process and finished-product testing to the evidence needed for batch release", "Carry deviations from investigation through corrective action and verified effectiveness", "Keep people qualified for the work with training tied to controlled SOP revisions"], icon: ShieldCheck, href: "/solutions/qms", modules: SYSTEM_GROUPS[2].modules, handover: "Review the evidence collected in MES. Carry hold and release decisions back to ERP, and corrective actions back to the people doing the work." },
];

export const SHARED_FOUNDATION = "Controlled SOPs, approved masters and traceable records stay attached to every workflow.";

export const SOLUTION_WORKFLOWS: Record<string, { title: string; steps: string; outcome: string }[]> = {
  erp: [
    { title: "Order to cash", steps: "Confirm the order → allocate released stock → dispatch → invoice.", outcome: "Keep delivery commitments and receivables in view, without chasing teams." },
    { title: "Demand to receipt", steps: "Raise demand → select a qualified vendor → approve the PO → receive by lot.", outcome: "Spot shortages early and keep unapproved supplies out of production." },
    { title: "Stock to shop floor", steps: "Check release status → allocate by expiry → issue to the batch.", outcome: "Reduce expired stock, avoid wrong-lot issues and retain the material trail." },
  ],
  mes: [
    { title: "Plan to production", steps: "Check materials, people and equipment → sequence batches → assign work.", outcome: "Build an achievable schedule before shortages or readiness gaps stop the line." },
    { title: "Dispense to batch record", steps: "Follow approved instructions → verify quantities → capture results and signatures.", outcome: "Reduce manual transcription and missing evidence at batch review." },
    { title: "Equipment to readiness", steps: "Schedule cleaning and calibration → verify completion → return equipment to use.", outcome: "Keep overdue or unready equipment out of the next production run." },
  ],
  qms: [
    { title: "Sample to release", steps: "Collect samples → test against specifications → review evidence → release or hold.", outcome: "Make batch decisions with the evidence in place, not a last-minute file hunt." },
    { title: "Deviation to prevention", steps: "Investigate the cause → assign corrective actions → verify effectiveness.", outcome: "Close recurring issues with accountable owners and proof the fix worked." },
    { title: "SOP revision to qualified work", steps: "Release the revision → reassign training → assess competency → permit the task.", outcome: "Keep people working to the current procedure, not yesterday’s instructions." },
  ],
};

export function moduleHref(id: string) {
  const destinations: Record<string, string> = {
    sales: "/erp#sales",
    purchase: "/erp#purchase",
    inventory: "/erp#inventory",
    library: "/erp#library",
    accounts: "/erp#accounting",
    facility: "/mes#rooms-equipment",
    production: "/mes#production",
    quality: "/qms#quality",
    capa: "/qms#capa",
    documents: "/qms#documents",
    training: "/qms#training",
    "work-management": "/one#work-management",
    genealogy: "/one#genealogy",
    monitoring: "/one#realtime-insights",
    reports: "/one#realtime-insights",
  };
  return destinations[id] ?? "/one#capabilities";
}
