import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroMockup } from "@/components/sections/hero-mockup";

const POINTS = [
  "Yield, cycle time, deviations and overdue actions as one number each, not four reports",
  "Every batch, stage and open handover on one screen, live",
  "Bottlenecks are something you watch while there's still time to move, not discover at month end",
];

export function RealtimeVisibilityHighlight() {
  return (
    <section id="realtime-visibility" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              Realtime visibility
            </span>
            <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Everything live, on one screen
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Every batch, stage and open handover, live. Bottlenecks stop
              being something you discover at the end of the month and
              become something you watch while there is still time to move.
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
              src="/dashboard/purchase-dashboard.png"
              alt="Factro live operations dashboard tracking order book value, supplier deviation rate, vendor OTIF and dozens of other live parameters"
              width={1920}
              height={1490}
              cropAspect="aspect-[16/9]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
