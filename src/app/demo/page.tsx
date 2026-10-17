import { BarChart3, CalendarDays, Clock3, FileText, LockKeyhole, Mail, MessageSquare, Phone, Rocket, ShieldCheck, Sparkles, TriangleAlert, Users, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DemoForm } from "@/components/forms/demo-form";
import { DemoChecklist } from "@/components/sections/demo-checklist";
import { NeuralParticleOrb } from "@/components/sections/neural-particle-orb";
import { MarketingHeading } from "@/components/sections/marketing-ui";
import { SALES_EMAIL, SALES_MAILTO, SALES_PHONE, SALES_PHONE_HREF } from "@/data/nav";
import { pageMetadata } from "@/lib/site";
import shared from "@/components/sections/marketing-page.module.css";
import styles from "@/components/sections/demo-page.module.css";

export const metadata = pageMetadata({ title: "Book a demo · Bring a real batch and a real deviation", description: "Thirty minutes, no slides and no scripted scenarios. Choose the workflow and see it run in Factro, at your facility or over a call.", path: "/demo" });

const PROMISES = [
  { icon: Clock3, title: "30 minutes", description: "One session, on your schedule." },
  { icon: Workflow, title: "Your workflow", description: "A batch, a deviation, a release." },
  { icon: BarChart3, title: "In person or online", description: "At your plant or on a call." },
  { icon: FileText, title: "Free trial", description: "On your own data, after the demo." },
];
const TIMELINE = [
  { icon: Workflow, when: "Week 1", title: "Demo and discovery", description: "A process-led demo, then discovery on your plant. No slides." },
  { icon: CalendarDays, when: "Week 2", title: "Fit and scoping", description: "A fit assessment and a scoped plan. You leave with a go-live date." },
  { icon: Sparkles, when: "Weeks 3 to 4", title: "Configure, migrate, train", description: "Your products, routes and controls set up, data migrated, people trained." },
  { icon: Rocket, when: "Day 30", title: "Go-live", description: "Every module connected and running on your records." },
  { icon: ShieldCheck, when: "Weeks 5 to 8", title: "Hypercare", description: "Daily monitoring and a dedicated line for anything that blocks work." },
  { icon: Users, when: "After that", title: "Ongoing support", description: "A dedicated account manager and a direct line to a team that knows your plant." },
];

export default function DemoPage() {
  return <div className={shared.page}>
    <section className={styles.hero}><Container className={styles.heroGrid}><div className={styles.heroCopy}><p className={shared.eyebrow}>• Book a demo</p><h1>Bring a real batch<br />and a real deviation.</h1><p>Thirty minutes, no slides and no scripted scenarios. You choose the workflow and we run it in Factro, at your facility or over a call. Seeing it costs nothing, and a free trial lets you test it on your own data.</p><div className={styles.promises}>{PROMISES.map(({icon:Icon,title,description}) => <div key={title} className={styles.promise}><span className={shared.icon}><Icon size={18} aria-hidden="true" /></span><div><strong>{title}</strong><p>{description}</p></div></div>)}</div><div className={styles.contactNote}><span><ShieldCheck size={13} aria-hidden="true" />Currently in pilot in India</span><a href={SALES_PHONE_HREF}><Phone size={13} aria-hidden="true" />{SALES_PHONE}</a></div></div><DemoForm /></Container></section>
    <section className={shared.section}><Container><MarketingHeading eyebrow="The session" title="No slides." muted="No scripted scenarios." description="Thirty minutes on the workflow that matters to your plant, run live." /><div className={shared.threeGrid}>{[["You pick the workflow","A batch from dispensing to release, a deviation from report to CAPA, or a purchase order through QC. Your call."],["We run it in Factro","On realistic records for your products, with the controls, signatures and tasks you would use on the floor."],["You ask the hard questions","About your SOPs, your inspections and your systems. If something does not fit, we tell you on the call."]].map(([title,description],index) => <article className={shared.card} key={title}><span className={shared.badge}>0{index+1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></Container></section>
    <DemoChecklist />
    <section className={shared.section}><Container><MarketingHeading eyebrow="The next 30 days" title="From this call" muted="to go-live in 30 days." description="A fixed plan, with dates you can hold us to." /><ol className={styles.timeline}>{TIMELINE.map(({icon:Icon,when,title,description}) => <li key={when}><span className={styles.timelineIcon}><Icon size={19} aria-hidden="true" /></span><small>{when}</small><h3>{title}</h3><p>{description}</p></li>)}</ol><div className={styles.guarantee}><ShieldCheck size={28} aria-hidden="true" /><div><h3>Two months free if we are late.</h3><p>If full go-live misses 30 days from the day we receive your complete dataset, the next two months are on us. The clock starts when the data is in.</p></div></div></Container></section>
    <section className={`${shared.section} ${shared.muted}`}><Container><div className={styles.aiHeading}><NeuralParticleOrb className={styles.orb} /><MarketingHeading eyebrow="Factro AI" title="Ask in English." muted="Not SQL, not Excel." /><p>Deviations cluster on their own, anomalies surface before review, and every answer cites the records it came from.</p><span>• In development, beta planned for Q4 2026</span></div><div className={shared.threeGrid}>{[{icon:ShieldCheck,title:"Compliance Checker",description:"Watches events against your configured rules and flags drift while the batch is still open."},{icon:TriangleAlert,title:"Deviation Analyst",description:"Groups deviations by product, line, stage and shift, so recurring root causes stand out."},{icon:MessageSquare,title:"Assistant",description:"Answers plain-language questions, traces genealogy from raw material lot to dispatched pack, and flags material shortages."}].map(({icon:Icon,title,description}) => <article className={shared.card} key={title}><span className={shared.icon}><Icon size={19} aria-hidden="true" /></span><h3>{title}</h3><p>{description}</p></article>)}</div><div className={styles.trust}>{["A private model inside your deployment","No prompts leave your tenant","Nothing is used to train a model"].map(text => <span key={text}><LockKeyhole size={13} aria-hidden="true" />{text}</span>)}</div></Container></section>
    <section className={styles.talk}><Container><div><h2>Prefer to talk first?</h2><p>Write or call the team directly.</p></div><a href={SALES_MAILTO}><span className={shared.icon}><Mail size={18} aria-hidden="true" /></span><div>{SALES_EMAIL}<p>We reply within one business day</p></div></a><a href={SALES_PHONE_HREF}><span className={shared.icon}><Phone size={18} aria-hidden="true" /></span><div>{SALES_PHONE}<p>Currently in pilot in India</p></div></a></Container></section>
  </div>;
}
