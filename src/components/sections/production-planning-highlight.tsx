import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroMockup } from "@/components/sections/hero-mockup";

const POINTS = [
  "Live schedule adherence and center utilization, updated as batches move",
  "Orders at risk flagged automatically, with the bottleneck named",
  "Kanban or timeline view, down to the individual batch",
];

export function ProductionPlanningHighlight() {
  return (
    <section id="production-planning" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              Production planning
            </span>
            <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              The schedule that flags risk before it becomes a delay
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Every production order, center and batch on one timeline, with
              adherence and utilization visible the moment something drifts —
              not discovered at the next production meeting.
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
              src="/dashboard/production-planning.png"
              alt="Factro Production Orders dashboard showing schedule adherence, active batches, center utilization, orders at risk and a weekly production timeline"
              width={1920}
              height={1341}
              fixedHeight="h-[21rem] sm:h-[36rem] lg:h-[21rem]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
