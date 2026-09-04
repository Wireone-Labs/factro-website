import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroMockup } from "@/components/sections/hero-mockup";

const POINTS = [
  "Every handover is a tracked ticket, with a named owner and a visible clock",
  "SLA tracking across departments, so bottlenecks identify themselves",
  "Kanban board across Open, In Progress, Blocked and Done",
];

export function DashboardHighlight() {
  return (
    <section id="work-management" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              Work management
            </span>
            <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Every task tracked, assigned and timed against an SLA
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Built on an agile system that tracks and assigns every task —
              with an owner, a priority and an SLA clock, not just a status.
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

          <Reveal delay={0.08}>
            <HeroMockup
              src="/dashboard/my-work.png"
              alt="Factro My Work board showing a prioritised task queue across Open, In Progress, Blocked and Done"
              width={1920}
              height={1189}
              cropAspect="aspect-[16/9]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
