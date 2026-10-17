import { ArrowRight, FlaskConical, MessageSquare, ClipboardCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { BOOK_DEMO_HREF } from "@/data/nav";
import desktopStyles from "./home-desktop.module.css";

export function PilotStatus() {
  return <section className={`pb-16 sm:pb-20 ${desktopStyles.pilotSection}`} aria-labelledby="pilot-status-title">
    <Container>
      <div className={`grid gap-9 rounded-2xl border border-brand-100 bg-brand-50/50 p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 ${desktopStyles.pilotCard}`}>
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600"><span className="h-2 w-2 rounded-full bg-emerald-500" />Live pilots · India</p>
          <h2 id="pilot-status-title" className="mt-4 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">Real plants. Real workflows.<br />Feedback that shapes the product.</h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-500">Factro is in live trials with regulated manufacturers in India, covering batch execution, quality and supply chain. Evaluate it against the way your plant actually works.</p>
          <div className="mt-6"><Button href={BOOK_DEMO_HREF}>Discuss your workflow<ArrowRight size={15} /></Button></div>
        </div>
        <div className="flex flex-col justify-center">
          {[{ icon: FlaskConical, title: "Start with your process", text: "Bring a batch, a deviation or a handover that slows your team down." }, { icon: MessageSquare, title: "Review the work, together", text: "Walk through execution, evidence and exceptions with our team." }, { icon: ClipboardCheck, title: "Evaluate before you commit", text: "Customer references are available under NDA during evaluation." }].map(step => <div key={step.title} className="flex gap-4 border-b border-brand-100 py-4 first:pt-0 last:border-0 last:pb-0"><step.icon size={20} className="mt-1 shrink-0 text-brand-600" /><div><h3 className="text-sm font-semibold text-ink-900">{step.title}</h3><p className="mt-1 text-sm leading-relaxed text-ink-500">{step.text}</p></div></div>)}
        </div>
      </div>
    </Container>
  </section>;
}
