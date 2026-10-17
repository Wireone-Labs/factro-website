import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, BarChart3, Building2, CheckCircle2, ClipboardCheck, Clock3, Cpu, FileCheck2, FileText, Grid2X2, Layers, LockKeyhole, MessageSquare, Search, ShieldCheck, Signature, Sparkles, Star, TriangleAlert, Users, Workflow, X, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NeuralParticleOrb } from "./neural-particle-orb";
import { MarketingClosing, MarketingHeading, MarketingNav } from "./marketing-ui";
import { AgentWindow, ApprovalDemo, RulesetDemo } from "./pillar-demos";
import shared from "./marketing-page.module.css";
import styles from "./pillars-page.module.css";

type Benefit = { icon: LucideIcon; title: string; description: string };

const COMPLIANCE_BENEFITS: Benefit[] = [
  { icon: ShieldCheck, title: "Checks run before the decision", description: "Specification, approved vendor, quantity and QC lead time are checked the moment QA opens the order." },
  { icon: ClipboardCheck, title: "Conditions travel with the record", description: "Pick from your standard list. Each condition is checked again at goods receipt, dispensing or the next order." },
  { icon: Signature, title: "Every decision is signed", description: "Approve, approve with conditions or reject. The signature and its meaning go to the append-only, hash-chained audit trail." },
];
const TASK_BENEFITS: Benefit[] = [
  { icon: Workflow, title: "Every ticket has an owner", description: "Workflow tickets land in Task Manager by role. Ad-hoc tickets sit beside them." },
  { icon: Clock3, title: "The clock is on the card", description: "Overdue, due today and time left show on every ticket, so a delay is visible early." },
  { icon: Users, title: "Handovers are acknowledged", description: "A blocked handover names who it is waiting on until they accept it." },
];
const AGENT_BENEFITS: Benefit[] = [
  { icon: ShieldCheck, title: "Compliance Checker", description: "Finds gaps against your ruleset before an inspection does." },
  { icon: TriangleAlert, title: "Deviation Analyst", description: "Reads a deviation alongside everything that happened around it." },
  { icon: MessageSquare, title: "Assistant", description: "Answers questions about your business in plain words, with the records behind them." },
];
const PRIVACY_BENEFITS: Benefit[] = [
  { icon: Users, title: "Role-based access", description: "An agent reads only what your role can open, with the same permissions as the rest of Factro." },
  { icon: LockKeyhole, title: "Stays in your tenant", description: "Questions, records and answers stay inside your tenant. Nothing is sent to an outside AI service." },
  { icon: Cpu, title: "Fine-tuned local models", description: "The models run in Factro’s private cloud, next to your data, not on a public AI platform." },
  { icon: ShieldCheck, title: "Scoped to your organisation", description: "Agents answer about your plant, your records and your work. Lunch recipes are politely declined." },
  { icon: ClipboardCheck, title: "Decisions stay with people", description: "Agents do not sign, release or close anything. Every regulated step still needs a person." },
  { icon: FileText, title: "Sources with every answer", description: "Each finding links to the records it came from, so it can be checked before anyone acts." },
];
const CHANGE_STAGES = [
  { icon: FileText, title: "A governing body issues a change", description: "New or revised regulation is published.", validation: false },
  { icon: Search, title: "Impact assessed", description: "We map the change to each affected rule and control.", validation: false },
  { icon: Users, title: "Internal validation", description: "Our quality and engineering teams test every affected rule.", validation: true },
  { icon: FileCheck2, title: "External validation", description: "Independent reviewers check conformance before release.", validation: true },
  { icon: Layers, title: "Versioned release", description: "A new ruleset version ships with release notes. Earlier versions stay on record.", validation: false },
];
const QUESTIONS = [
  ["Who can change a ruleset?", "Only Factro, and only when a governing body changes the regulation. Each change is assessed, validated by our internal team and by external reviewers, and released as a new version. Plants configure their workflows and approvals on top."],
  ["What does the Compliance Engine check?", "Every submission, approval, event, settings change, alert and deviation, before it is saved. Each check is written to the append-only, hash-chained audit trail with the rule that decided it."],
  ["Does our data leave our tenant?", "No. The agents run on fine-tuned local models in Factro’s private cloud, scoped to your tenant and your role. Nothing is sent to an outside AI service."],
  ["Can a task be closed without meeting a control?", "No. Task Manager moves the work. The Compliance Engine decides whether the action is allowed."],
  ["What is live today?", "The compliance score with guidance on each gap, deviations shown with their history and trends, and structured, AI-ready records across ERP, MES and QMS. The Compliance Checker, Deviation Analyst and Assistant agents are in development, in one Factro AI window."],
  ["Will the agents make decisions?", "No. Agents draft findings with links to the source records. Regulated decisions stay with people, and the Compliance Engine still enforces every required approval."],
];
const TASK_COLUMNS = [
  { name: "Open", count: 5, tone: "red", tasks: [["TKT-0142", "Plan sales order SO-22", "Order-to-make, step 3 of 5", "Overdue 1d", "27 Sep · SO-22", "IH"], ["TKT-0139", "Raise invoice for GDR-10231", "Make-to-release, step 6 of 6", "Overdue 4h", "28 Sep · GDR-10231", "AS"]] },
  { name: "In progress", count: 4, tone: "amber", tasks: [["TKT-0140", "Effectiveness check for deviation DEV-0447", "CAPA action", "18h left", "29 Sep · DEV-0447", "IH"], ["TKT-0138", "Order O-5510 accepted from Production", "Handover", "20h left", "29 Sep · O-5510", "MK"]] },
  { name: "Blocked", count: 1, tone: "red", tasks: [["TKT-0136", "GRN-4471 to QC handover not acknowledged", "Handover", "Blocked 2d", "Waiting on QC", "PD"]] },
  { name: "Done", count: 15, tone: "green", tasks: [["TKT-0121", "Invoice raised for GDR-10190", "Make-to-release, step 6 of 6", "Done 3d late", "23 Sep · GDR-10190", "IH"], ["TKT-0120", "Line clearance verified", "Production approval", "On time", "23 Sep · WO-0008", "AS"]] },
];
const TEAM_SCORES = [
  { name: "Stores", values: [92,94,90,95,96,93,97,96] },
  { name: "Quality control", values: [85,88,82,86,90,91,89,93] },
  { name: "Production", values: [90,92,94,91,93,95,94,96] },
  { name: "Quality assurance", values: [88,84,87,90,92,89,93,94] },
  { name: "Engineering", values: [78,80,76,83,85,82,86,88] },
  { name: "Dispatch", values: [95,96,94,97,96,98,97,98] },
];

function Benefits({ items, className }: { items: Benefit[]; className: string }) {
  return <div className={className}>{items.map(({icon: Icon,title,description}) => <article key={title} className={styles.benefit}><span><Icon size={18} aria-hidden="true" /></span><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>;
}

function PillarStack() {
  const points = Array.from({ length: 24 }, (_,index) => ({ horizontal: 80 + (index % 4) * 110 + Math.sin(index * 2) * 35, vertical: 45 + Math.floor(index / 4) * 95 }));
  return <div className={styles.heroArt} aria-label="AI Agents, Task Manager and Compliance Engine share one batch record">
    <svg className={styles.network} viewBox="0 0 540 600" fill="none" aria-hidden="true">{points.map((point,index) => <g key={index}>{points.slice(index+1,index+6).map((next,nextIndex) => <path key={nextIndex} d={`M${point.horizontal},${point.vertical}L${next.horizontal},${next.vertical}`} stroke="currentColor" strokeWidth=".6" />)}<circle cx={point.horizontal} cy={point.vertical} r="2" fill="currentColor" /></g>)}</svg>
    {[{icon:Sparkles,number:"03",title:"AI Agents",status:"In development",tone:"purple"},{icon:Workflow,number:"02",title:"Task Manager",status:"SLA 2 h",tone:"amber"},{icon:ShieldCheck,number:"01",title:"Compliance Engine",status:"Release held",tone:"red"}].map(({icon: Icon,number,title,status,tone}) => <div className={styles.heroCard} key={number}><span><Icon size={19} aria-hidden="true" /></span><div><small>Pillar {number}</small><strong>{title}</strong></div><em data-tone={tone}>● {status}</em></div>)}
    <div className={styles.sharedRecord}><strong><FileText size={15} aria-hidden="true" />Batch B-2281 · one record</strong><p>{["ERP","MES","QMS","Audit trail"].map(label => <span key={label}>{label}</span>)}</p></div>
  </div>;
}

function TaskBoard() {
  return <figure><div className={styles.board}>
    <div className={styles.boardHeader}><div><h3>My work</h3><p>Workflow-governed and ad-hoc tickets assigned to you, across every module.</p></div><span>Sample workspace</span></div>
    <div className={styles.boardStats}>{[["Open work","10","5 open, 4 in progress, 1 blocked"],["Overdue","2","Oldest is 1 day over"],["Due in the next 24 hours","3","Next sign-off in 7h"],["Completed, last 7 days","15","Plus 1 done, waiting for verification"],["On-time, last 7 days","90%","Up 4 points on the 7 days before"],["Time to verify, last 7 days","1d 6h","Median, raised to completed"]].map(([label,value,detail]) => <div key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>)}</div>
    <div className={styles.boardColumns}>{TASK_COLUMNS.map(column => <div className={styles.boardColumn} key={column.name}><h4>● {column.name}<span>{column.count}</span></h4>{column.tasks.map(([ticket,title,category,status,source,owner]) => <article key={ticket} className={styles.ticket} data-tone={column.tone}><p>{ticket}<em>{status}</em></p><h5>{title}</h5><span>{category}</span><footer>{source}<b>{owner}</b></footer></article>)}</div>)}</div>
  </div><figcaption className={styles.caption}><Grid2X2 size={13} aria-hidden="true" />Factro Task Manager, board view. Sample records.</figcaption></figure>;
}

function TaskMetrics() {
  return <div className={styles.metrics}>
    <article className={styles.metricCard}><p className={styles.metricLabel}><BarChart3 size={17} aria-hidden="true" />Measured</p><h3>Every task, timed from assignment to close.</h3><div className={styles.measured}><div className={styles.measureValues}>{[["94%","On time"],["128","Closed this month"],["3.2 h","Median time to close"]].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div><figure className={styles.barChart}><figcaption>On time, last 8 weeks · sample data</figcaption><div className={styles.bars} role="img" aria-label="On-time completion improves from 72 to 94 percent over eight weeks">{[72,81,90,84,96,92,99,94].map((value,index) => <span key={index} style={{"--bar-height": `${value}%`} as CSSProperties} />)}</div></figure></div></article>
    <article className={styles.metricCard} data-celebrated><p className={styles.metricLabel}><Sparkles size={17} aria-hidden="true" />Celebrated</p><h3>Good work gets noticed.</h3><div className={styles.milestone}><span><Star size={30} fill="currentColor" aria-hidden="true" /></span><div><strong>50 batch reviews,<br />all on time</strong><small>Priya R. · QA</small></div></div><p className={styles.celebration}>Line 2 closed every IPQC check on time this month.</p></article>
    <article className={styles.metricCard}><p className={styles.metricLabel}><TriangleAlert size={17} aria-hidden="true" />Accountable</p><h3>Overdue work never goes quiet.</h3><ol className={styles.escalation}>{[["AS","Owner · Arjun S.","Review EBR B-2279 · due 14:00"],["JB","Shift lead · Joy B.","Notified at 16:00"],["MK","QA head · Meera K.","At 18:00 if still open"]].map(([initials,title,detail]) => <li key={initials}><span>{initials}</span><div><strong>{title}</strong><small>{detail}</small></div></li>)}</ol></article>
    <article className={styles.metricCard}><p className={styles.metricLabel}><Grid2X2 size={17} aria-hidden="true" />Visible to management</p><h3>The whole plant at a glance.</h3><div className={styles.heatmap} role="region" aria-label="Sample weekly on-time percentages by team" tabIndex={0}><table><thead><tr><th scope="col">On time by week</th>{Array.from({length:8},(_,index) => <th key={index} scope="col">W{index+1}</th>)}</tr></thead><tbody>{TEAM_SCORES.map(team => <tr key={team.name}><th scope="row">{team.name}</th>{team.values.map((value,index) => <td key={index} data-level={value >= 95 ? "high" : value >= 90 ? "good" : value >= 85 ? "fair" : value >= 80 ? "low" : "risk"}>{value}</td>)}</tr>)}</tbody></table></div></article>
  </div>;
}

function PrivateCloud() {
  return <div className={styles.privacyGrid}>
    <div><div className={styles.cloud}><p><Building2 size={14} aria-hidden="true" />Factro private cloud</p><div className={styles.tenant}><p><LockKeyhole size={14} aria-hidden="true" />Your tenant</p><div className={styles.accessRule}><Users size={14} aria-hidden="true" />Every question runs with your role. An agent reads only what you can open.</div><div className={styles.privateNodes}>{[{icon:Layers,title:"Your records",description:"ERP, MES and QMS, your organisation only"},{icon:Sparkles,title:"Factro AI agents",description:"Compliance Checker, Deviation Analyst, Assistant"},{icon:Cpu,title:"Local models",description:"Fine-tuned, hosted next to your data"}].map(({icon: Icon,title,description}) => <article key={title}><Icon size={21} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></article>)}</div></div></div><p className={styles.boundary}><X size={16} aria-hidden="true" />Public AI services are not used. Questions, records and answers do not leave your tenant.</p></div>
    <div className={styles.scopeExample}><header className={styles.agentHeader}><span><Sparkles size={20} aria-hidden="true" /></span><div><strong>Factro AI</strong></div></header><div className={styles.scopeBody}><p className={styles.prompt}>Can you suggest a recipe for this afternoon’s lunch?</p><span>● Outside your organisation’s scope</span><p>I can only help with your organisation’s work. Try asking about batches, deviations, stock or people.</p><a href="#neural-engine">Which batches are waiting for QA?<ArrowRight size={13} aria-hidden="true" /></a><a href="#orchestrator">What is overdue in my work?<ArrowRight size={13} aria-hidden="true" /></a></div></div>
  </div>;
}

export function PillarsPage() {
  return <div className={shared.page}>
    <div className={shared.heroShell}>
      <section className={shared.hero}><Container className={shared.heroGrid}><div><Link href="/products" className={shared.breadcrumb}>Products<ArrowRight size={13} aria-hidden="true" />Pillars</Link><p className={shared.eyebrow}>• The Factro platform</p><h1>Three pillars.<br />One record.</h1><p className={shared.heroLead}>Every Factro product runs on three pillars: a Compliance Engine that checks every action against your ruleset, a Task Manager that drives the work across departments, and AI Agents that explain what your records are telling you.</p><div className={shared.actions}><Button href="/demo">See it in your workflow<ArrowRight size={16} aria-hidden="true" /></Button><Link className={shared.textLink} href="/products">Explore the products<ArrowRight size={14} aria-hidden="true" /></Link></div><p className={shared.note}><ShieldCheck size={13} aria-hidden="true" />Inside ERP, MES and QMS. Nothing to bolt on.</p></div><PillarStack /></Container></section>
      <MarketingNav name="Pillars" links={[["compliance-engine","Compliance Engine"],["orchestrator","Task Manager"],["neural-engine","AI Agents"],["questions","Questions"]]} />
    </div>
    <section id="compliance-engine" className={shared.section}><Container><MarketingHeading eyebrow="Pillar 01 · Compliance Engine" title="Every action is checked." muted="Before it is saved." description="The Compliance Engine is an isolated service that holds the ruleset for your framework and industry. Every submission, approval, event, settings change, alert and deviation is checked against it." /><div className={styles.complianceGrid}><Benefits items={COMPLIANCE_BENEFITS} className={styles.benefits} /><figure><ApprovalDemo /><figcaption className={styles.caption}><Grid2X2 size={13} aria-hidden="true" />Factro QA, Approvals: quick review of PO-16. Sample records.</figcaption></figure></div></Container></section>
    <section id="rulesets" className={`${shared.section} ${shared.muted}`}><Container><MarketingHeading eyebrow="Pillar 01 · Compliance Engine" title="The ruleset changes when" muted="the regulation does." description="Each ruleset is built for one framework and one industry. It changes only when a governing body changes the regulation, and every change is validated by our internal team and by external reviewers before release." /><RulesetDemo /><ol className={styles.changeFlow}>{CHANGE_STAGES.map(({icon: Icon,title,description,validation},index) => <li key={title} data-validation={validation}><span className={styles.flowIcon}><Icon size={20} aria-hidden="true" /></span><small>0{index+1}</small><h3>{title}</h3><p>{description}</p></li>)}</ol><div className={styles.rulesetNote}><strong><LockKeyhole size={15} aria-hidden="true" />What cannot change a ruleset</strong>{["A plant admin setting","A user role","A release deadline"].map(label => <span key={label}>{label}</span>)}<p>Your workflows, approvals and SOPs sit on top, and stay yours to configure.</p></div></Container></section>
    <section id="orchestrator" className={shared.section}><Container><MarketingHeading eyebrow="Pillar 02 · Task Manager" title="Work finds its owner." muted="Nobody has to chase it." description="Task Manager drives the work within and across departments, as you configure it. Every handover arrives as a ticket with an owner, a clock and the record attached." /><TaskBoard /><Benefits items={TASK_BENEFITS} className={styles.benefitColumns} /></Container></section>
    <section id="task-performance" className={`${shared.section} ${shared.muted}`}><Container><MarketingHeading eyebrow="Pillar 02 · Task Manager" title="Every task counts." muted="So does the person behind it." description="Each task is measured from assignment to close. Good work gets noticed, overdue work gets escalated, and management sees the whole plant without asking for a report." /><TaskMetrics /></Container></section>
    <section id="neural-engine" className={shared.section}><Container><div className={styles.aiHeading}><NeuralParticleOrb className={styles.orb} /><MarketingHeading eyebrow="Pillar 03 · AI Agents" title="One window. Three agents." muted="More on the way." /><p>Factro AI brings specialist agents into one window you can open from any page. Switch agents with a tab. Each reads the records for its job, shows the sources behind what it finds, and hands the decision back to a person.</p></div><AgentWindow /><p className={styles.caption}><em>Preview</em>Factro AI window. Agents are in development; sample records.</p><Benefits items={AGENT_BENEFITS} className={styles.benefitColumns} /><div className={styles.liveStrip}><span>● Live today</span><strong>What the agents are built on</strong>{["Compliance score with gap guidance","Deviation history and trends","Structured, AI-ready records"].map(label => <span key={label}><CheckCircle2 size={14} aria-hidden="true" />{label}</span>)}</div></Container></section>
    <section id="private-by-design" className={`${shared.section} ${shared.muted}`}><Container><MarketingHeading eyebrow="Pillar 03 · AI Agents" title="Private by design." muted="Scoped to your plant." description="Factro AI runs inside your tenant, on fine-tuned local models in our private cloud. Every agent works within your role and your organisation’s records, and nothing else." /><PrivateCloud /><Benefits items={PRIVACY_BENEFITS} className={styles.privacyBenefits} /></Container></section>
    <section id="questions" className={shared.section}><Container><div className={shared.questions}><div className={shared.questionsIntro}><MarketingHeading eyebrow="Before you start" title="Questions" muted="plants ask us." /><p>Straight answers on rulesets, tasks and what the agents do and do not do.</p><Link href="/demo" className={shared.textLink}>Talk to our team<ArrowRight size={14} aria-hidden="true" /></Link></div><div>{QUESTIONS.map(([question,answer]) => <article key={question} className={shared.question}><h3>{question}</h3><p>{answer}</p></article>)}</div></div><div className={styles.disclaimers}><p>Regulatory frameworks shown here are control-mapping references, not product certifications. Applicability depends on your processes, configuration, validation and operating procedures.</p><p>AI Agents are in development; the compliance score, deviation history and the structured, AI-ready data model are available today. Agent screens on this page illustrate the planned experience using sample records. AI-generated findings need review against source records and your quality procedures.</p></div></Container></section>
    <MarketingClosing title="Bring your process." muted="See all three at work." description="Walk through one batch with our team, from the rule that checks it to the task that moves it and the agent that explains it." button="Book a walkthrough" />
  </div>;
}
