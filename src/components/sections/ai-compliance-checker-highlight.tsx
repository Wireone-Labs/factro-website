import { CheckCircle2, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const POINTS = [
  "Every event on the platform checked against the compliance you configured, all day",
  "A drift is caught while the batch is still open, against the rule in force at that moment",
  "Every finding carries the records it came from, so QA can check it rather than trust it",
];

export function AiComplianceCheckerHighlight() {
  return (
    <section id="ai-compliance-checker" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              AI Compliance Checker
            </span>
            <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Not a nightly report. Not a reviewer&apos;s checklist.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Runs throughout the day, logging and processing every event on
              the platform against the compliance you configured — so a
              drift is caught while the batch is still open, not found at
              release.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span className="text-sm text-ink-600">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:order-1">
            <div className="relative mx-auto w-full max-w-5xl">
              <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-20px_rgba(15,14,23,0.25)] sm:rounded-3xl">
                <div className="relative flex aspect-[16/9] w-full items-center justify-center bg-mist/40">
                  <ShieldCheck className="h-14 w-14 text-brand-300" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
