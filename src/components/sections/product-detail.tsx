import Link from "next/link";
import { ArrowRight, Bell, BookOpen, CalendarDays, ClipboardCheck, Coins, Factory, FileText, FlaskConical, GraduationCap, LayoutDashboard, LayoutGrid, Library, ListChecks, MessageSquare, Package, ReceiptText, Settings, ShieldCheck, ShoppingCart, Tag, Truck, Users, Warehouse, Workflow, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PRODUCT_DETAIL_MODULES, PRODUCT_ANCHOR_ALIASES, type ProductModule } from "@/data/product-detail-modules";
import type { ProductPageData } from "@/data/product-pages";
import type { ProductSlug } from "@/data/product-detail-content";
import { PRODUCT_REFRESH } from "@/data/product-refresh";
import { INDUSTRIES_MENU } from "@/data/nav";
import { ProductLandscape } from "./product-landscape";
import { ProductProblemIllustration } from "./product-problem-illustration";
import { ProductMoments } from "./product-moments";
import { ProductRoleSelector } from "./product-role-selector";
import { ProductReasonShowcase } from "./product-reason-showcase";
import { MarketingClosing, MarketingHeading, MarketingNav } from "./marketing-ui";
import styles from "./marketing-page.module.css";
import catalogueStyles from "./product-module-catalogue.module.css";
import problemStyles from "./product-problems.module.css";

const MODULE_ICONS = { sales: Tag, purchase: ShoppingCart, inventory: Package, storage: Warehouse, planning: CalendarDays, production: ClipboardCheck, "rooms-equipment": Factory, exhibits: FlaskConical, quality: FlaskConical, capa: ShieldCheck, documents: FileText, training: GraduationCap, dashboard: LayoutDashboard, "work-management": ClipboardCheck, library: BookOpen };
const SUBMODULE_ICONS: Record<string, LucideIcon> = {
  Customers: Users, Vendors: Users, Enquiries: MessageSquare, Quotations: FileText,
  Orders: ReceiptText, Invoices: ReceiptText, Payments: Coins, Expenses: Coins,
  Dispatches: Truck, Dispatch: Truck, Receipts: Truck, "Goods received": Truck,
  Stocks: Package, Returns: Workflow, "Material exchanges": Workflow,
  Warehouses: Warehouse, "Warehouse Map": LayoutGrid, "Storage zones": LayoutGrid,
  "Drug License Checks": ShieldCheck, "Quote-to-Catalog": BookOpen, "Lead-to-Order": Workflow,
  "E-way bills & E-invoices": ReceiptText, "Duty Roster": CalendarDays, "Facility Care": Wrench,
  Specifications: FileText, "Review and approval": ShieldCheck, Approval: ShieldCheck,
  Overview: LayoutDashboard, "Custom tabs": LayoutGrid, "Widget catalogue": LayoutGrid,
  "Compliance score": ShieldCheck, Notifications: Bell, Board: LayoutGrid, List: ListChecks,
  Tickets: ClipboardCheck, Materials: Package, Masters: Library, Formulations: FlaskConical,
  "Routing designer": Workflow, Site: Settings,
};
const EXHIBITS: ProductModule = { id: "exhibits", title: "Exhibit orders", product: "MES", description: "Formulation trials run like batches, and are proven by three successful runs in a row.", items: ["Orders", "Trials", "Stage execution", "Timers", "Results", "Deviations", "Trial history", "Approval"] };

function catalogueModules(slug: ProductSlug) {
  const erp = PRODUCT_DETAIL_MODULES.filter(module => module.product === "ERP");
  const mes = [...PRODUCT_DETAIL_MODULES.filter(module => module.product === "MES"), EXHIBITS];
  const qms = [
    { ...PRODUCT_DETAIL_MODULES.find(module => module.id === "quality")!, title: "LIMS", description: "Samples, results, instruments and reference standards, with the CoA built from results." },
    PRODUCT_DETAIL_MODULES.find(module => module.id === "capa")!,
    PRODUCT_DETAIL_MODULES.find(module => module.id === "documents")!,
    PRODUCT_DETAIL_MODULES.find(module => module.id === "training")!,
  ];
  return slug === "one" ? [...erp,...mes,...qms] : slug === "erp" ? erp : slug === "mes" ? mes : qms;
}

function ModuleCatalogue({ slug }: { slug: ProductSlug }) {
  const content = PRODUCT_REFRESH[slug];
  const reservedIds = [...content.reasons.map(reason => reason.id), "dashboard", "realtime-insights"];
  const modules = catalogueModules(slug);
  const sharedModules = PRODUCT_DETAIL_MODULES.filter(module => module.product === "Included");

  function renderModule(module: ProductModule, index: number, entries: ProductModule[], shared = false) {
    const Icon = MODULE_ICONS[module.id as keyof typeof MODULE_ICONS] ?? BookOpen;
    const anchor = reservedIds.includes(module.id) ? `module-${module.id}` : module.id;
    const firstInGroup = entries.findIndex(entry => entry.product === module.product) === index;
    const aliases = Array.from(new Set([
      ...(PRODUCT_ANCHOR_ALIASES[slug][module.id] ?? []),
      ...(module.id === "quality" ? ["laboratory", "qualification"] : []),
      ...(module.id === "rooms-equipment" ? ["connectors"] : []),
      ...(!shared && firstInGroup ? [`modules-${module.product.toLowerCase()}`] : []),
    ])).filter(alias => alias !== anchor && !reservedIds.includes(alias));

    return <article key={module.id} id={anchor} className={catalogueStyles.module} data-module-product={module.product}>
      {aliases.map(alias => <span key={alias} id={alias} className={catalogueStyles.anchor} aria-hidden="true" />)}
      {!shared && <div className={catalogueStyles.moduleTop}><span className={catalogueStyles.icon}><Icon size={18} aria-hidden="true" /></span><span className={catalogueStyles.badge}>{module.product}</span></div>}
      <h3>{shared && <span className={catalogueStyles.icon}><Icon size={17} aria-hidden="true" /></span>}{module.id === "work-management" ? "Task Manager" : module.title}</h3>
      <p>{module.description}</p>
      <ul className={catalogueStyles.chips}>{module.items.map(item => {
        const ItemIcon = SUBMODULE_ICONS[item] ?? Icon;
        return <li key={item}>{!shared && <ItemIcon size={12} aria-hidden="true" />}<span>{item}</span></li>;
      })}</ul>
      {module.features && <ul className={catalogueStyles.features} aria-label={`${module.title} features`}>{module.features.map(feature => {
        const FeatureIcon = SUBMODULE_ICONS[feature] ?? ShieldCheck;
        return <li key={feature}><FeatureIcon size={13} aria-hidden="true" /><span>{feature}</span></li>;
      })}</ul>}
    </article>;
  }

  return <section id="under-the-hood" className={`${styles.section} ${styles.muted} ${catalogueStyles.section}`} aria-label="Under the hood">
    <span id="capabilities" className={catalogueStyles.anchor} aria-hidden="true" />
    <Container>
      <MarketingHeading eyebrow="Under the hood" title={`Everything ${slug === "one" ? "the suite" : slug.toUpperCase()} runs,`} muted="module by module." description={content.moduleDescription} />
      <div className={catalogueStyles.catalogue}>
        <div className={catalogueStyles.grid}>
          {modules.map((module, index) => renderModule(module, index, modules))}
        </div>
        <div id="shared-tools" className={catalogueStyles.shared}>
          {sharedModules.map((module, index) => renderModule(module, index, sharedModules, true))}
        </div>
      </div>
      <div className={catalogueStyles.industries}>
        <div><h3><ShieldCheck size={19} aria-hidden="true" />Industry packs</h3><p>Controls for each regulated category, on the same records and workflows.</p></div>
        <ul>{INDUSTRIES_MENU.items.map(industry => <li key={industry.href}><Link href={industry.href}>{industry.label}</Link></li>)}</ul>
      </div>
    </Container>
  </section>;
}

export function ProductDetailPage({ product }: { product: ProductPageData }) {
  const slug = product.slug as ProductSlug;
  const content = PRODUCT_REFRESH[slug];
  const name = slug === "one" ? "All-in-One Suite" : product.name;
  return <div className={styles.page} data-product={slug} data-sticky-nav>
    <div className={styles.heroShell}>
      <section className={styles.hero}><Container className={styles.heroGrid}>
        <div><Link href="/products" className={styles.breadcrumb}>Products<ArrowRight size={13} aria-hidden="true" />{name}</Link><p className={styles.eyebrow}>• {product.category}</p><h1>{content.title}</h1><p className={styles.heroLead}>{content.description}</p><div className={styles.actions}><Button href="#reasons">See how it works<ArrowRight size={16} aria-hidden="true" /></Button></div><p className={styles.note}><ShieldCheck size={14} aria-hidden="true" />{slug === "one" ? "Start with one product. Connect the rest when ready." : "Runs on its own. Connects when you’re ready."}</p></div>
        <ProductLandscape slug={slug} />
      </Container></section>
    </div>
    <MarketingNav name={name} links={[["problem","The problem"],["reasons",slug === "one" ? "Four reasons" : "Five reasons"],["under-the-hood","Under the hood"],["moments","Moments"],["roles","Who it is for"],["questions","Questions"]]} />
    <section id="problem" className={problemStyles.section} data-product-section>
      <span id="problem-overview" className={problemStyles.anchor} aria-hidden="true" />
      <Container>
        <div className={problemStyles.heading}><MarketingHeading eyebrow="The problem" title={content.problem[0]} muted={content.problem[1]} description={content.problem[2]} /></div>
        <div className={`${styles.threeGrid} ${problemStyles.cards}`}>{content.problems.map(([title,description],index) => <article className={styles.card} key={title}><ProductProblemIllustration product={slug} index={index} /><span className={styles.badge} data-cost={index === 2}>• 0{index+1} · {index === 2 ? "The cost" : "Root cause"}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </Container>
    </section>
    <ProductReasonShowcase product={slug} reasons={content.reasons} heading={<MarketingHeading eyebrow={slug === "erp" ? "The business behind every batch" : slug === "mes" ? "From plan to finished batch" : slug === "qms" ? "Quality that gates the work" : "Close the gaps between systems"} title={content.reasonHeading[0]} muted={content.reasonHeading[1]} description={content.reasonHeading[2]} />} />
    <ModuleCatalogue slug={slug} />
    <section id="moments" className={styles.momentsSection}><Container>
      <MarketingHeading eyebrow="Moments that matter" title={content.momentHeading[0]} muted={content.momentHeading[1]} description={`Five situations ${slug === "one" ? "where separate systems stall and one record does not." : `every ${slug === "qms" ? "QA team" : "plant"} meets. Here is what happens in Factro.`}`} />
      <ProductMoments moments={content.moments} product={slug} />
    </Container></section>
    <ProductRoleSelector product={slug} roles={content.roles} heading={content.roleHeading} />
    <section id="questions" className={styles.section}><Container className={styles.questions}><div className={styles.questionsIntro}><MarketingHeading eyebrow="Before you start" title="Questions" muted="plants ask us." /><p>Start with the operation you have. Agree the controls and connections you need.</p><Link href="/demo" className={styles.textLink}>Talk to our team<ArrowRight size={14} aria-hidden="true" /></Link></div><div>{content.questions.map(([question,answer]) => <article key={question} className={styles.question}><h3>{question}</h3><p>{answer}</p></article>)}</div></Container></section>
    <MarketingClosing title={content.closing[0]} muted={content.closing[1]} description={content.closing[2]} button={slug === "one" ? "Book a walkthrough" : `Walk through ${name}`} />
  </div>;
}
