import type { ReactNode } from "react";
import { ProductFeatureList } from "./product-feature-list";
import { ProductTablet, type ProductScreenshot } from "./product-tablet";
import styles from "./systems-teaser.module.css";

export function ProductFeatures({ name, href, features, screenshot, preview, children }: {
  name: string;
  href: string;
  features: string[];
  screenshot: ProductScreenshot;
  preview?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className={styles.productRow} aria-label={name}>
      <div className={styles.productContent}>
        {children}
        <ProductFeatureList name={name} href={href} features={features} />
      </div>
      <div className={styles.productPreview}>
        <div className={styles.productPreviewFit}>
          <div className={`${styles.productVisual}${preview ? ` ${styles.productVisualBare}` : ""}`}>{preview ?? <ProductTablet screenshot={screenshot} />}</div>
        </div>
      </div>
    </article>
  );
}
