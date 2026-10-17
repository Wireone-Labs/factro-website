import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { MarketingClosing, MarketingHeading } from "@/components/sections/marketing-ui";
import { ProductMiniAsset } from "@/components/sections/product-mini-asset";
import { ProductLandscape } from "@/components/sections/product-landscape";
import { PRODUCT_PAGES } from "@/data/product-pages";
import { PRODUCT_REFRESH } from "@/data/product-refresh";
import type { ProductSlug } from "@/data/product-detail-content";
import { pageMetadata } from "@/lib/site";
import styles from "@/components/sections/marketing-page.module.css";

export const metadata = pageMetadata({
  title: "Products · ERP, MES, QMS & All-in-One Suite",
  description: "Start with ERP, MES or QMS. Connect the rest when you are ready, on one record from receipt to release.",
  path: "/products",
});

export default function ProductsPage() {
  return <div className={styles.page}>
    <div className={styles.heroShell}><section className={styles.hero}><Container className={styles.heroGrid}>
      <div><p className={styles.eyebrow}>• Products</p><h1>One system for<br />all your ops.</h1><p className={styles.heroLead}>Start with ERP, MES or QMS. Add the rest when you are ready. Your people, materials and batches stay on the same record.</p><div className={styles.actions}><Button href="#products">Explore the products<ArrowRight size={16} aria-hidden="true" /></Button><Link href="/demo" className={styles.textLink}>Book a walkthrough<ArrowRight size={15} aria-hidden="true" /></Link></div><p className={styles.note}><ShieldCheck size={14} aria-hidden="true" />One access model. One audit trail. No re-keying.</p></div>
      <ProductLandscape slug="one" />
    </Container></section></div>
    <section id="products" className={styles.section}><Container>
      <MarketingHeading eyebrow="Choose your starting point" title="Start with one." muted="It is still one record." description="Each product works on its own, with the controls your industry needs. Together, they close the gaps between departments." />
      <div className={styles.productDirectory}>{PRODUCT_PAGES.map(product => {
        const slug = product.slug as ProductSlug;
        const content = PRODUCT_REFRESH[slug];
        const name = slug === "one" ? "All-in-One Suite" : product.name;
        return <Link key={slug} href={`/${slug}`} className={`${styles.page} ${styles.productLink}`} data-product={slug}><div><span>{name}</span><ArrowRight size={20} aria-hidden="true" /></div><div><h3>{content.title}</h3><p>{content.description}</p></div><ProductMiniAsset product={slug} /></Link>;
      })}</div>
    </Container></section>
    <MarketingClosing title="Bring your workflow." muted="Find your starting point." description="Walk through one real process with our team. See which product solves the first problem, and how the rest connects." />
  </div>;
}
