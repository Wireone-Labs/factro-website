import Link from "next/link";
import { Activity, ArrowRight, CalendarDays, Check, Clock3, ClipboardCheck, FileCheck2, FileText, Globe2, KeyRound, Layers, LockKeyhole, RotateCcw, Scale, Search, ShieldCheck, Signature, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MarketingClosing, MarketingHeading, MarketingNav } from "./marketing-ui";
import { TRUST_DEPLOYMENTS } from "./security-trust-data";
import { AuditTrailAsset, BackupAsset, ClientApprovalAsset, DatabaseEncryptionAsset, FoundationAccessAsset, FoundationAuditAsset, FoundationDataAsset, NetworkBoundaryAsset, PrivateAiAsset, RequestProtectionAsset, SecurityLayerStack } from "./security-trust-visuals";
import shared from "./marketing-page.module.css";
import styles from "./security-trust.module.css";

const OWNERSHIP = [
  { icon: UsersRound, title: "Only your people get in", description: "Your admins decide who has a login. Factro staff have no account in your workspace." },
  { icon: KeyRound, title: "Locked with a key of its own", description: "Your records, files and backups are encrypted with a key used only for your company." },
  { icon: Layers, title: "Kept apart from everyone else", description: "Your data lives in its own space and is never mixed with another customer’s." },
];

const ACCESS_CONTROLS = [
  { icon: ShieldCheck, title: "MFA", description: "Every account signs in with a second factor." },
  { icon: UsersRound, title: "Role-based access", description: "People see and do only what their role allows." },
  { icon: Scale, title: "Segregation of duties", description: "The person who records is not the one who approves." },
  { icon: Clock3, title: "Session expiry", description: "Idle sessions end on their own." },
];

const BACKUPS = [
  { kind: "continuous" as const, icon: RotateCcw, title: "Every change, as it happens", description: "Your data is copied continuously, so it can be brought back to a moment just before something went wrong.", scenario: "A wrong entry or a bad import minutes ago" },
  { kind: "daily" as const, icon: CalendarDays, title: "A full copy every day", description: "Once a day, everything is backed up and stored away from the live system.", scenario: "A problem is found days later" },
  { kind: "region" as const, icon: Globe2, title: "A copy in another region", description: "Backups are also kept in a second region, far from the first.", scenario: "A whole data centre goes down" },
];

export function SecurityTrustPage() {
  return <div className={`${shared.page} ${styles.page}`}>
    <div className={shared.heroShell}>
      <section className={shared.hero}><Container className={shared.heroGrid}>
        <div><p className={shared.eyebrow}>• Security & Trust</p><h1>Trust is part of<br />the architecture.</h1><p className={shared.heroLead}>How your records are protected, how access is governed, and how evidence stays verifiable across the Digital Manufacturing Platform.</p><div className={shared.actions}><Button href="/demo">Book a security review<ArrowRight size={16} aria-hidden="true" /></Button></div><div className={styles.assurance}><span>ISO 27001 in progress</span><span>Independent penetration tests</span></div></div>
        <SecurityLayerStack />
      </Container></section>
      <MarketingNav name="Security & Trust" links={[["your-data","Your data"],["security","Security"],["access","Access"],["records","Records"],["backups","Backups"],["deployment","Deployment"],["ai","AI & data"]]} />
    </div>
    <section id="overview" className={`${shared.section} ${shared.muted}`}><Container>
      <p className={shared.eyebrow}>Protection across every workflow</p><h2 className={styles.statement}>Security is not a separate workspace. <span>The same controls apply wherever an order, batch, quality event or approval moves through Factro.</span></h2>
      <div className={styles.foundations}>
        <article><h3><FileText size={18} aria-hidden="true" />History that holds</h3><p>Append-only, hash-chained audit trails and signed records keep who changed what, when and why.</p><FoundationAuditAsset /></article>
        <article><h3><UsersRound size={18} aria-hidden="true" />Access with boundaries</h3><p>Approved clients, approved networks, roles and segregation of duties govern who reaches the work.</p><FoundationAccessAsset /></article>
        <article><h3><LockKeyhole size={18} aria-hidden="true" />Data that stays yours</h3><p>Encrypted records, recoverable backups and private AI workloads keep protection underneath the operation.</p><FoundationDataAsset /></article>
      </div>
    </Container></section>
    <section id="your-data" className={shared.section}><Container className={styles.split}>
      <div><MarketingHeading eyebrow="Your data" title="Even we can’t" muted="see your data." /><p className={styles.lead}>Your records belong to your company. Nobody at Factro can open them.</p><ul className={styles.benefits}>{OWNERSHIP.map(({icon:Icon,title,description}) => <li key={title}><span className={shared.icon}><Icon size={19} aria-hidden="true" /></span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ul></div>
      <DatabaseEncryptionAsset />
    </Container></section>
    <section id="security" className={`${shared.section} ${shared.muted}`}><Container>
      <div className={styles.sectionIntro}><MarketingHeading eyebrow="How requests are protected" title="Five checks before anyone" muted="reaches your data." /><p className={styles.lead}>Every request passes the same five layers, from the internet down to encrypted storage.</p></div>
      <RequestProtectionAsset />
      <div className={styles.operations}>{[{icon:Activity,title:"Monitoring",description:"The platform is watched around the clock for anything unusual, against a 99% uptime target."},{icon:Search,title:"Testing",description:"An independent firm tests the application, API and infrastructure. Critical and high findings block the next release."}].map(({icon:Icon,title,description}) => <article key={title}><span className={shared.icon}><Icon size={18} aria-hidden="true" /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
    </Container></section>
    <section id="access" className={shared.section}><Container>
      <div className={styles.sectionIntro}><MarketingHeading eyebrow="Access control" title="Who gets in," muted="from where, on what." /><p className={styles.lead}>Accounts, devices, integrations and networks are all checked before anyone reaches a record.</p></div>
      <div className={styles.accessGrid}><article className={styles.accessCard}><ClientApprovalAsset /><div className={styles.cardCopy}><h3>Client approval</h3><p>Every new client needs an admin’s approval before it can reach Factro. A browser on a new laptop, a shop-floor tablet or an integration each waits until someone approves it.</p></div></article><article className={styles.accessCard}><NetworkBoundaryAsset /><div className={styles.cardCopy}><h3>Network-based geo-fencing</h3><p>Access is limited to the networks and regions you approve. A sign-in from anywhere else is refused, even with the right password.</p></div></article></div>
      <div className={styles.accessControls}>{ACCESS_CONTROLS.map(({icon:Icon,title,description}) => <article key={title}><h3><Icon size={16} aria-hidden="true" />{title}</h3><p>{description}</p></article>)}</div>
    </Container></section>
    <section id="records" className={`${shared.section} ${shared.muted}`}><Container className={styles.recordsLayout}><span id="compliance" className={styles.anchor} />
      <div><MarketingHeading eyebrow="Records and signatures" title="Every change" muted="leaves a trail." /><ul className={styles.recordPoints}>{[{icon:FileCheck2,text:"Old value, new value, author, time and reason on every change"},{icon:Signature,text:"Approvals need a fresh sign-in, and keep the signer’s meaning and time"},{icon:LockKeyhole,text:"No one can switch off, edit or backdate history from inside Factro, administrators included"}].map(({icon:Icon,text}) => <li key={text}><Icon size={18} aria-hidden="true" /><span>{text}</span></li>)}</ul></div>
      <AuditTrailAsset />
    </Container></section>
    <section id="backups" className={shared.section}><Container>
      <div className={styles.sectionIntro}><MarketingHeading eyebrow="Backups" title="Three copies," muted="always a way back." /><p className={styles.lead}>If something goes wrong, your data comes back. Three layers of backup cover a slip from a few minutes ago through to losing a whole data centre.</p><p className={styles.encryptionNote}><LockKeyhole size={16} aria-hidden="true" />Every backup is encrypted before it leaves the server, so a copy on its own is unreadable.</p></div>
      <div className={styles.backupGrid}>{BACKUPS.map(({kind,icon:Icon,title,description,scenario},index) => <article className={styles.backupCard} key={kind}><div className={styles.backupTop}><span className={shared.icon}><Icon size={20} aria-hidden="true" /></span><span>0{index+1}</span></div><BackupAsset kind={kind} /><h3>{title}</h3><p>{description}</p><div className={styles.fits}><small>Covers you when</small><p>{scenario}</p></div></article>)}</div>
    </Container></section>
    <section id="deployment" className={`${shared.section} ${shared.muted}`}><Container>
      <div className={styles.centerHeading}><MarketingHeading eyebrow="Deployment" title="Choose how Factro" muted="is deployed." /><p className={styles.lead}>Most plants run on the standard service. Dedicated and on-premises setups are available when your policy asks for them.</p></div>
      <div className={styles.deploymentGrid}>{TRUST_DEPLOYMENTS.map(deployment => <article key={deployment.name} className={styles.deploymentCard} data-featured={deployment.name === "Dedicated"}><header><h3>{deployment.name}{deployment.name === "Dedicated" && <span>Option</span>}</h3><p>{deployment.description}</p></header><dl>{[["Hosting",deployment.hosting],["Database",deployment.database],["Application layer",deployment.application],["Storage and network",deployment.storage],["Encryption at rest",deployment.encryption]].map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><div className={styles.fits}><small>When it fits</small><p>{deployment.fit}</p></div></article>)}</div>
    </Container></section>
    <section id="ai" className={`${shared.section} ${shared.muted}`}><Container className={styles.aiLayout}>
      <PrivateAiAsset />
      <div><MarketingHeading eyebrow="AI & data" title="Intelligence with evidence." muted="People in control." /><ul className={styles.aiPoints}>{["AI workloads run inside your deployment, on private models", "Your manufacturing records never train a shared model", "Agents read only what the user’s role can open", "Answers and findings link back to their source records", "A surfaced risk starts an investigation. It never releases a batch."].map(point => <li key={point}><Check size={15} aria-hidden="true" />{point}</li>)}</ul><div className={styles.aiFooter}><Link className={shared.textLink} href="/how-it-works#neural-engine">See Factro AI<ArrowRight size={14} aria-hidden="true" /></Link></div></div>
    </Container></section>
    <section id="resources" className={styles.resources}><Container><div className={styles.resourcesHeader}><h2>Review the controls, not just the claims.</h2><Link className={shared.textLink} href="/demo">Book a walkthrough<ArrowRight size={14} aria-hidden="true" /></Link></div><div className={styles.resourceGrid}>{[{icon:Layers,title:"The pillars",description:"The three pillars and their built-in controls",href:"/how-it-works"},{icon:FileText,title:"Privacy policy",description:"Data handling and privacy requests",href:"/privacy"},{icon:FileCheck2,title:"Terms of service",description:"Ownership and service responsibilities",href:"/terms"},{icon:ClipboardCheck,title:"Security questionnaire",description:"Bring yours and we answer it line by line",href:"/demo"}].map(({icon:Icon,title,description,href}) => <Link key={title} href={href}><h3><Icon size={17} aria-hidden="true" />{title}<ArrowRight size={14} aria-hidden="true" /></h3><p>{description}</p></Link>)}</div></Container></section>
    <MarketingClosing title="Bring your security" muted="questionnaire." description="We will walk through deployment, access, recovery and evidence with your IT and quality teams, and answer it line by line." button="Book a security review" />
  </div>;
}
