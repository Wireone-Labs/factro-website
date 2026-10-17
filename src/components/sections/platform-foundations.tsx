import Link from "next/link";
import { ArrowRight, Check, ShieldCheck, Workflow, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { INFRASTRUCTURE_SECTIONS } from "@/data/infrastructure";

const FOUNDATIONS = [
  { name: "Compliance Engine", icon: ShieldCheck, href: "/how-it-works#compliance-engine", title: "Enforce the control before the action.", description: "Permissions, segregation of duties, signatures and industry rules govern what can happen. Every controlled change keeps its evidence." },
  { name: "Task Manager", icon: Workflow, href: "/how-it-works#orchestrator", title: "Give every handover an owner.", description: "Tasks, approvals and exceptions carry a named owner, a due date and the source record. Escalations keep blocked work visible across teams and shifts." },
  { name: "AI Agent", icon: Sparkles, href: "/how-it-works#neural-engine", title: "Connect the signals to their evidence.", description: "An AI-ready data model today, with agents in development for compliance checks, CAPA analysis and anomaly detection. People retain control of approvals." },
];

export function PlatformFoundations() {
  return <section id="foundations" className="scroll-mt-28 py-16 sm:py-20">
    <Container>
      <SectionHeading eyebrow="The three pillars" title="The foundation is the product." description="ERP, MES and QMS inherit the same controls, coordination and intelligence. These are platform foundations, not separate tools to connect later." />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {FOUNDATIONS.map((pillar, index) => <Link key={pillar.name} href={pillar.href} className="group rounded-2xl border border-line bg-white p-7 transition-colors hover:border-brand-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500">
          <div className="flex items-center justify-between"><IconTile icon={pillar.icon} /><span className="text-xs text-ink-400">0{index + 1}</span></div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-brand-600">{pillar.name}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink-900">{pillar.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-ink-500">{pillar.description}</p>
          <ArrowRight className="mt-6 h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>)}
      </div>
    </Container>
  </section>;
}

export function PlatformSecurity() {
  return <section id="security" className="scroll-mt-28 bg-mist/40 py-16 sm:py-20">
    <Container>
      <SectionHeading eyebrow="Infrastructure-level controls" title="Protected underneath. Accountable throughout." description="The operational record rests on isolated environments, encrypted data, controlled access and recoverable history. Deployment choices change the environment, not the need for these controls." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {INFRASTRUCTURE_SECTIONS.map(section => <article key={section.id} className="rounded-2xl border border-line bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3"><IconTile icon={section.icon} /><h3 className="text-lg font-semibold text-ink-900">{section.title}</h3></div>
          <ul className="mt-5 space-y-3">{section.points.map(point => <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-ink-600"><Check size={15} className="mt-1 shrink-0 text-brand-500" /><span>{point}</span></li>)}</ul>
        </article>)}
      </div>
      <Link href="/security-trust" className="mt-8 flex items-center justify-between gap-5 rounded-2xl border border-brand-200 bg-brand-50 p-6 text-brand-600 hover:border-brand-400">
        <span><strong className="block text-lg">Security & Trust</strong><span className="mt-1 block text-sm">Explore security, privacy, compliance and responsible AI.</span></span><ArrowRight className="shrink-0" />
      </Link>
    </Container>
  </section>;
}
