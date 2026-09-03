import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroMockup } from "@/components/sections/hero-mockup";

const POINTS = [
  "Widgets scoped to each module — production, inventory, quality, sales",
  "Role- and permission-aware, so every user sees what's relevant to them",
  "A configurable home screen instead of one fixed view for everyone",
];

export function DashboardHighlight() {
  return (
    <section id="dashboard" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              Dashboard
            </span>
            <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              One home screen, shaped around every role
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              A plant manager, a QA lead, and a shop-floor operator don&apos;t
              need to see the same thing. Factro&apos;s dashboard adapts to
              who&apos;s looking at it.
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
            <div className="scale-90 lg:scale-100">
              <HeroMockup
                src="/dashboard/my-work.png"
                alt="Factro My Work board showing a prioritised task queue across Open, In Progress, Blocked and Done"
                width={1920}
                height={1189}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
