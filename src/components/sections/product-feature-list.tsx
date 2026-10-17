"use client";

import { useContext, useEffect, useRef, type CSSProperties } from "react";
import { useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductVisibilityContext } from "./product-showcase";
import styles from "./systems-teaser.module.css";

export function ProductFeatureList({ name, href, features }: { name: string; href: string; features: string[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const inView = useInView(listRef, { amount: 0.15 });
  const active = useContext(ProductVisibilityContext);

  useEffect(() => {
    if (!listRef.current || !inView || !active || listRef.current.dataset.revealed === "true") return;
    listRef.current.dataset.revealed = "true";
  }, [inView, active]);

  return (
    <div ref={listRef} className={styles.featureReveal} data-revealed="false" data-bullet-managed>
      <ul className={styles.signatureFeatures} aria-label={`${name} signature features`}>
        {features.map((feature, index) => (
          <li key={feature} className={styles.signatureFeature} style={{ "--feature-delay": `${0.3 + index * 0.22}s` } as CSSProperties}>
            <span className={styles.featureMarker} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>
      <div className={styles.productCtaReveal} style={{ "--feature-delay": `${0.3 + features.length * 0.22}s` } as CSSProperties}>
        <Button href={href} variant="secondary" className={styles.productCta}>Explore {name}<ArrowRight size={16} aria-hidden="true" /></Button>
      </div>
    </div>
  );
}
