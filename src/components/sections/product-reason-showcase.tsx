import type { ReactNode } from "react";
import type { ProductSlug } from "@/data/product-detail-content";
import type { ProductReason } from "@/data/product-refresh";
import { ProductMiniAsset } from "./product-mini-asset";
import { ProductScrollSection } from "./product-scroll-section";
import styles from "./product-reason-showcase.module.css";

const SHORT_LABELS: Record<string, string> = {
  sales: "Sales", warehouse: "Warehouse", vendors: "Vendors", "price-trends": "Price trends", genealogy: "Lot genealogy",
  planning: "Planning", execution: "Execution", "exhibit-orders": "Exhibit orders", deviations: "Deviations", performance: "Performance",
  capa: "CAPA", training: "Training", documents: "Documents", release: "Release", lims: "LIMS", holds: "One hold", costing: "Batch costing", "plant-view": "Plant view",
};

export function ProductReasonShowcase({ product, reasons, heading }: { product: ProductSlug; reasons: ProductReason[]; heading: ReactNode }) {
  return <ProductScrollSection id="reasons" aliases={["workflow"]} heading={heading} headingPlacement="stage" contentAlign="start" slides={reasons.map((reason, index) => ({
    id: reason.id,
    label: SHORT_LABELS[reason.id] ?? reason.label,
    content: <div className={`${styles.row} ${styles.reasonRow}`}>
      <div className={styles.copy}>
        <p className={styles.eyebrow} data-panel-copy>0{index + 1} / {reason.label}</p>
        <h3>{reason.title}</h3>
        <p className={styles.description} data-panel-copy>{reason.description}</p>
        <ul className={styles.points}>{reason.points.map(([title, description], pointIndex) => <li key={description}><span className={styles.marker}>0{pointIndex + 1}</span><div>{title && <strong>{title}</strong>}<p>{description}</p></div></li>)}</ul>
      </div>
      <div className={styles.preview} data-panel-preview><ProductMiniAsset product={product} feature={reason.id} /></div>
    </div>,
  }))} />;
}
