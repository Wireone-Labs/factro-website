import Link from "next/link";
import { ArrowRight, Check, Factory, FileText, Layers, ShieldCheck, Workflow } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const HANDOVERS = [
  { name: "ERP", icon: Workflow, title: "Commit with the full picture.", receives: "Customer order, delivery date and material requirements", work: ["Check demand against available, released stock", "Purchase from qualified vendors and receive by lot", "Carry material status and availability into the plan"], passes: "Production demand + traceable material lots", href: "/solutions/erp" },
  { name: "MES", icon: Factory, title: "Make the plan executable.", receives: "Production demand, material lots and approved masters", work: ["Schedule against equipment, people and cleaning readiness", "Guide dispensing and record each manufacturing step", "Link results, signatures and exceptions to the batch"], passes: "Executed batch record + in-process evidence", href: "/solutions/mes" },
  { name: "QMS", icon: ShieldCheck, title: "Release on evidence.", receives: "Batch history, test results and open quality events", work: ["Review results against specifications and release checks", "Investigate deviations and verify corrective actions", "Record the QA decision against the affected batch"], passes: "Release or hold decision + supporting records", href: "/solutions/qms" },
];

export function ConnectedPlatformFlow() {
  return <section className="pb-16 pt-6 sm:pb-20" aria-label="How the connected platform works">
    <Container>
      <SectionHeading eyebrow="One order. One connected record." title="Follow the work, not the software boundaries." description="Each system owns a different part of the job. The order, material lot, batch and quality decision stay connected through every handover." />
      <ol className="mt-10 grid gap-4 lg:grid-cols-3">
        {HANDOVERS.map((system, index) => <li key={system.name} className="flex flex-col rounded-2xl border border-line bg-gradient-to-br from-mist to-white p-6">
          <div className="flex items-center justify-between text-brand-600"><span className="flex items-center gap-2 text-xl font-semibold"><system.icon className="h-5 w-5" />{system.name}</span><span className="font-mono text-xs text-ink-400">0{index + 1}</span></div>
          <h3 className="mt-5 text-xl font-semibold tracking-tight">{system.title}</h3>
          <div className="mt-5 border-y border-line py-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-ink-400">Receives</p><p className="mt-2 text-xs leading-relaxed text-ink-500">{system.receives}</p></div>
          <ul className="my-5 flex flex-col gap-3">{system.work.map(point => <li key={point} className="flex gap-2 text-sm leading-relaxed text-ink-500"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-500" />{point}</li>)}</ul>
          <div className="mt-auto rounded-xl border border-brand-100 bg-brand-50/60 p-4"><p className="text-[10px] font-semibold uppercase tracking-wider text-brand-600">Hands on</p><p className="mt-2 text-xs leading-relaxed text-ink-600">{system.passes}</p></div>
          <Link href={system.href} className="mt-5 flex w-fit items-center gap-2 text-xs font-semibold text-brand-600 hover:underline">Explore {system.name}<ArrowRight size={14} /></Link>
        </li>)}
      </ol>
      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-line px-6 py-4 sm:flex-row sm:items-center"><span className="shrink-0 text-xs font-semibold text-brand-600">QMS → ERP</span><p className="text-sm leading-relaxed text-ink-500">The release decision returns to stock availability and dispatch. Sales can follow the customer commitment through to fulfilment without losing the batch history.</p></div>
      <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl bg-mist px-6 py-5 sm:flex-row sm:items-center"><div><p className="text-xs font-semibold text-ink-700">The same foundation, at every step</p><p className="mt-1 text-xs leading-relaxed text-ink-500">One effective SOP, one approved formula, one source for specifications.</p></div><div className="flex flex-wrap gap-5 text-xs text-brand-600"><Link className="flex items-center gap-2 hover:underline" href="/solutions/platform?tab=documents#modules"><FileText size={15} />Controlled documents</Link><Link className="flex items-center gap-2 hover:underline" href="/solutions/platform?tab=library#modules"><Layers size={15} />Knowledge library</Link></div></div>
    </Container>
  </section>;
}

export function ConnectedPlatformFit() {
  return <section className="py-16 sm:py-20" aria-label="Fit the platform to your existing stack">
    <Container>
      <SectionHeading eyebrow="Your stack. Your starting point." title="Connected does not have to mean replaced." description="Run the three systems together, or introduce Factro where your current stack leaves work disconnected." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <article className="rounded-2xl border border-line p-7"><p className="text-xs font-semibold uppercase tracking-wide text-brand-600">One platform</p><h3 className="mt-3 text-xl font-semibold">Run the complete operating flow.</h3><ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-500"><li>Manage demand, purchasing, production and quality in Factro.</li><li>Share masters, permissions, documents and records across all three systems.</li><li>Follow exceptions from their source through action and closure.</li></ul></article>
        <article className="rounded-2xl border border-line p-7"><p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Alongside existing systems</p><h3 className="mt-3 text-xl font-semibold">Keep what works. Connect the gaps.</h3><ul className="mt-5 space-y-3 text-sm leading-relaxed text-ink-500"><li>Start with the production or quality workflows that need better control.</li><li>Define which system owns orders, material masters and release status.</li><li>Scope the data exchanges and handovers with your team before rollout.</li></ul></article>
      </div>
    </Container>
  </section>;
}
