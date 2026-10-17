import Link from "next/link";
import { ArrowRight, FileCheck2, FileText, Layers, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { type Industry, type IndustryTable, matrixBackedStandards } from "@/data/industries";
import { INDUSTRY_REFRESH } from "@/data/industry-refresh";
import { industryTheme } from "@/data/industry-themes";
import { IndustryHero } from "./industry-hero";
import { IndustryControlsList } from "./industry-controls-list";
import { MarketingClosing, MarketingHeading, MarketingNav } from "./marketing-ui";
import shared from "./marketing-page.module.css";
import styles from "./industry-pages.module.css";

function IndustryTableView({ table }: { table: IndustryTable }) {
  return <div className={styles.detailBlock}><h3>{table.heading}</h3><div className={styles.tableWrap} role="region" aria-label={table.heading} tabIndex={0}><table><thead><tr>{table.columns.map(column => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{table.rows.map(row => <tr key={row.cells.join("-")}>{row.cells.map((cell,index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}

const PHARMA_OBLIGATIONS: IndustryTable = { heading: "Where each obligation lives", columns: ["Obligation", "Answered by"], rows: [
  { cells: ["Pharmaceutical quality system", "SOP governance, deviations routed into CAPA, self-inspection and APQR"] },
  { cells: ["Quality risk management", "Risk register with FMEA scoring, linked to process steps"] },
  { cells: ["Product quality review", "Annual Product Quality Review assembled from batch records"] },
  { cells: ["Lifecycle validation", "URS, IQ, OQ and PQ traceability matrices on validation-ready workflows"] },
  { cells: ["Computerised system controls", "Field-level access, re-authenticated approvals, backups with point-in-time recovery"] },
  { cells: ["Data integrity", "ALCOA+ across records, on an append-only, hash-chained audit trail"] },
] };
const COSMETIC_LICENCES: IndustryTable = { heading: "Licences and forms", columns: ["Purpose","Apply on","Granted as","Terms"], rows: [
  { cells: ["Manufacturing licence","COS-5, or COS-6 for a loan licence","COS-8 or COS-9","Within 45 days. Perpetual, with a five-yearly retention fee."] },
  { cells: ["Import registration","COS-1, through SUGAM","COS-2 certificate","Registration certificate for imports."] },
  { cells: ["Secondary registration","COS-4","Registration","Valid for three years."] },
  { cells: ["New ingredient approval","COS-12","Approval","Before first use in a formulation."] },
] };
const FOOD_TRACE: IndustryTable = { heading: "The one-up, one-back baseline", columns: ["Market","Where it comes from"], rows: [
  { cells: ["India","FSS Act framework"] }, { cells: ["United States","21 CFR Part 1 Subpart J"] }, { cells: ["European Union","Regulation 178/2002, Article 18"] }, { cells: ["US, listed foods","FSMA 204: the traceability lot code must survive the full chain"] },
] };

function IndustrySpecifics({ industry }: { industry: Industry }) {
  if (industry.slug === "pharmaceuticals") return <IndustryTableView table={PHARMA_OBLIGATIONS} />;
  if (industry.slug === "cosmetics") return <IndustryTableView table={COSMETIC_LICENCES} />;
  if (industry.slug === "food-beverage") return <><IndustryTableView table={FOOD_TRACE} /><article className={`${shared.card} ${shared.tinted}`}><p className={shared.eyebrow}>The 24-hour test</p><h3>An export, not a reconstruction.</h3><p>The FDA can ask for an electronic, sortable spreadsheet of critical tracking events and key data elements, due within a day. Factro produces it from the lot records you already have.</p></article></>;
  return <>{industry.extras.map(extra => extra.table ? <IndustryTableView key={extra.heading} table={extra.table} /> : <article key={extra.heading} className={styles.detailBlock}><h3>{extra.heading}</h3>{extra.intro && <p>{extra.intro}</p>}{extra.bullets && <ol className={styles.detailList}>{extra.bullets.map((bullet,index) => <li key={bullet}><span>{index + 1}</span>{bullet}</li>)}</ol>}</article>)}</>;
}

export function IndustryDetail({ industry }: { industry: Industry }) {
  const content = INDUSTRY_REFRESH[industry.slug];
  const detailName = { pharmaceuticals: "Schedule M", "medical-devices": "Reporting clocks", "food-beverage": "Traceability", nutraceuticals: "Specifications", cosmetics: "India licensing", veterinary: "Withdrawal", "api-cdmo": "Audit readiness" }[industry.slug] ?? "Details";
  return <div className={`${shared.page} ${styles.page}`} data-industry={industry.slug} style={industryTheme(industry.slug)} data-sticky-nav>
    <div className={shared.heroShell}><section className={shared.hero}><Container className={shared.heroGrid}>
      <div><Link href="/industries" className={shared.breadcrumb}>Industries<ArrowRight size={13} aria-hidden="true" />{industry.name}</Link><p className={shared.eyebrow}>• {industry.name}</p><h1>{industry.tagline}</h1><p className={shared.heroLead}>{content.summary}</p><div className={shared.actions}><Button href="/demo">Book a demo<ArrowRight size={16} aria-hidden="true" /></Button><a href="#controls" className={shared.textLink}>See the controls<ArrowRight size={15} aria-hidden="true" /></a></div><p className={shared.note}><ShieldCheck size={14} aria-hidden="true" />Supported frameworks, not certifications. Regulatory updates included.</p></div>
      <IndustryHero industry={industry.slug} controls={industry.controls.length} standards={industry.mappedStandards.map(standard => standard.name)} />
    </Container></section></div>
    <MarketingNav name={industry.name} links={[["why-now","Why now"],["tailored","Tailored"],["controls","Controls"],["industry-detail",detailName],["regulatory-change","Regulatory change"]]} />
    <section id="why-now" className={`${shared.section} ${shared.muted}`}><Container><MarketingHeading eyebrow="Why now" title={content.why[0]} muted={content.why[1]} description={content.why[2]} /><div className={styles.whyGrid}><ul className={styles.reasons}>{content.reasons.map(([title,description]) => <li key={title}><Plus size={16} aria-hidden="true" /><div><strong>{title}</strong><p>{description}</p></div></li>)}</ul><aside className={styles.facts}><p>{content.factsLabel}</p><dl>{content.facts.map(([label,description]) => <div key={label}><dt>{label}</dt><dd>{description}</dd></div>)}</dl></aside></div></Container></section>
    <section id="tailored" className={shared.section}><Container><MarketingHeading eyebrow="What is tailored" title={content.tailored[0]} muted={content.tailored[1]} description={`Where the ${industry.name.toLowerCase()} pack changes how the core behaves.`} /><div className={styles.tailoredGrid} data-count={industry.builtFor.length}>{industry.builtFor.map((item,index) => <article key={item.module}><div className={styles.moduleLabel}><FileText size={15} aria-hidden="true" />{item.module}</div><h3>{content.tailoredTitles[index] ?? item.module}</h3><p>{item.detail}</p></article>)}</div></Container></section>
    <section id="controls" className={`${shared.section} ${shared.muted}`}><Container><MarketingHeading eyebrow="Controls" title={`${industry.controls.length} controls.`} muted={`${industry.mappedStandards.length} standards.`} description="Every control below runs on the Compliance Engine. The same record carries the evidence across the plant." /><IndustryControlsList controls={industry.controls} matrix={industry.matrix} matrixStandards={industry.matrixStandards} mappedStandards={matrixBackedStandards(industry)} /><p className={styles.disclaimer}>A working draft, not a certified mapping. This is our reading of each framework’s published scope, not a legal determination.</p></Container></section>
    <section id="industry-detail" className={shared.section}><Container><MarketingHeading eyebrow={content.detail[0]} title={content.detail[1]} muted={content.detail[2]} description={content.detail[3]} /><div className={styles.detailGrid}><IndustrySpecifics industry={industry} /></div></Container></section>
    <section id="regulatory-change" className={`${shared.section} ${shared.muted}`}><Container className={styles.timelineLayout}><div><MarketingHeading eyebrow="Regulatory change" title="We watch the rules." muted="You do not have to." /><p>The Compliance Engine tracks the rules that apply to you, works out what a change touches, updates the system and re-validates before release. You file no change request.</p></div><ol className={styles.timeline}>{industry.regulatoryTimeline.map(entry => <li key={`${entry.date}-${entry.title}`} data-status={entry.status}><time>{entry.date}</time><div><span>• {entry.status}</span><h3>{entry.title}</h3><p>{entry.description}</p></div></li>)}</ol></Container></section>
    <section className={shared.section}><Container><MarketingHeading eyebrow="Validation readiness" title="Controls built in," muted="not configured on top." /><div className={`${shared.threeGrid} ${styles.readiness}`}>{[[FileCheck2,"Validation packs","Available on the Dedicated tier, mapped to your workflows. URS, IQ, OQ, PQ, RTM and GAMP 5."],[ShieldCheck,"ISO 27001","Certification in progress. Encryption, access control and backups are described on Security & Trust."],[Layers,"Readiness, scored","The Compliance Engine scores inspection readiness continuously, with guidance on each open gap."]].map(([Tile,title,description]) => { const ReadinessIcon = Tile as typeof FileCheck2; return <article key={String(title)} className={shared.card}><span className={shared.icon}><ReadinessIcon size={18} aria-hidden="true" /></span><h3>{String(title)}</h3><p>{String(description)}</p></article>; })}</div></Container></section>
    <MarketingClosing title="Have a requirement" muted="to walk through?" description="Bring the regulation that keeps you up at night. We will show you the control that answers it, on a batch from your plant." />
  </div>;
}
