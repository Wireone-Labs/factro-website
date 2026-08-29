import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BUSINESS_OUTCOMES } from "@/data/business-outcomes";

export function BusinessOutcomes() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Business outcomes"
          title="Save one day every week. Per person."
          description="Evidence assembly disappears because the evidence assembled itself. Batch records close when the batch closes."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
          {BUSINESS_OUTCOMES.map((outcome) => (
            <RevealItem key={outcome.id}>
              <div className="h-full rounded-2xl border border-line bg-white p-7">
                <div className="flex items-center gap-3">
                  <IconTile icon={outcome.icon} size="sm" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                      {outcome.timeframe}
                    </p>
                    <h3 className="text-sm font-semibold text-ink-900">
                      {outcome.role}
                    </h3>
                  </div>
                </div>
                <div className="mt-5 flex flex-col gap-3 border-t border-line pt-5">
                  {outcome.bullets.map((bullet) => (
                    <p key={bullet.lead} className="text-sm leading-relaxed text-ink-600">
                      <span className="font-semibold text-ink-900">{bullet.lead}</span>
                      , {bullet.detail}
                    </p>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
