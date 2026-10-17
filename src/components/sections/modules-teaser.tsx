import Link from "next/link";
import { ArrowRight, Factory, ShieldCheck, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductFeatures } from "@/components/sections/product-features";
import { ProductShowcase } from "@/components/sections/product-showcase";
import { ErpInventoryPreview } from "@/components/sections/erp-inventory-preview";
import styles from "./systems-teaser.module.css";

const PRODUCTS = [
  {
    name: "ERP",
    category: ["Enterprise", "Resource Planning"],
    tagline: "Buy right. Trust the books.",
    description: "Know every customer, buy only from qualified vendors, and keep unapproved stock out of production.",
    href: "/erp",
    icon: Workflow,
    screenshot: {
      id: "inventory-overview",
      image: "inventory-home.png",
      width: 3840,
      height: 2662,
      alt: "Factro ERP inventory dashboard with stock value, reorder levels, QC holds, requests, expiring lots and warehouse health",
    },
    features: [
      "Manage customers with their licences, brand books and pricing history, priced by region and segment.",
      "Buy only from licensed, qualified vendors, and track their OTIF live.",
      "Sample at GRN and stop rejected material at the gate, with live stock and lead times in view.",
      "Run the warehouse by location and status, with a live stock ledger and retest reminders.",
      "Raise e-way bills and e-invoices from the same record.",
    ],
  },
  {
    name: "MES",
    category: ["Manufacturing", "Execution System"],
    tagline: "Guide the floor. Finish the record.",
    description: "Plan on real capacity, guide every step at the station, and capture the batch record as the work happens.",
    href: "/mes",
    icon: Factory,
    screenshot: {
      id: "production-planning",
      image: "production-planning.png",
      width: 1920,
      height: 1341,
      alt: "MES production planning with schedule adherence, center utilization, orders at risk and a weekly batch timeline",
    },
    features: [
      "Plan against real capacity and QC-released stock.",
      "Verify rooms, machines and line clearance, then guide every step by SOP with checked dispensing.",
      "Capture batch records and signatures as the work happens.",
      "Resolve deviations with historical trends attached, and cut the delays they cause by up to 67%.",
      "Link live machine data to the right batch step.",
    ],
  },
  {
    name: "QMS",
    category: ["Quality", "Management System"],
    tagline: "Build the gate. Kill the manual report.",
    description: "Meet regulatory targets, close flagged gaps, and release every batch with evidence in place.",
    href: "/qms",
    icon: ShieldCheck,
    screenshot: {
      id: "ai-compliance-checker",
      image: "capa-ai-agents.png",
      width: 3840,
      height: 2378,
      alt: "QMS CAPA workspace with readiness scores, a gap register and an AI agent tracing findings to source evidence",
    },
    features: [
      "Live compliance scores with guided gap closure.",
      "Release by exception: sampling, lab results and COAs on one batch checklist.",
      "Link deviations to OOS/OOT investigations. Close CAPA only on signed effectiveness proof.",
      "Train by role and retrain on SOP revisions. Hold work until people are current.",
      "Inspection-ready reports. No manual assembly.",
    ],
  },
];

export function ModulesTeaser() {
  return (
    <section id="modules" className="scroll-mt-28 py-16 sm:py-20" aria-label="Products">
      <Container className={styles.sectionContainer}>
        <ProductShowcase heading={<SectionHeading
          eyebrow="Products"
          className={styles.heading}
          title="One system for all your ops."
          description="Start with one. Add the rest. It’s still one record."
        />} items={PRODUCTS.map((product, index) => ({
          name: product.name,
          content: (
            <ProductFeatures key={product.name} name={product.name} href={product.href} features={product.features} screenshot={product.screenshot} preview={product.name === "ERP" ? <ErpInventoryPreview /> : undefined}>
                <div key={`${product.name}-identity`} className={styles.identity}>
                  <div className={styles.productMeta}><product.icon size={22} aria-hidden="true" /><span>0{index + 1} / {product.name}</span></div>
                  <h3><Link href={product.href}><span>{product.category[0]}{" "}<span className={styles.mutedTitle}>{product.category[1]}</span></span><ArrowRight size={20} aria-hidden="true" /></Link></h3>
                </div>
                <div key={`${product.name}-copy`} className={styles.productCopy}>
                  <h4>{product.tagline}</h4>
                  <p>{product.description}</p>
                </div>
            </ProductFeatures>
          ),
        }))} />
      </Container>
    </section>
  );
}
