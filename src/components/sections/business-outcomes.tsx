import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BUSINESS_OUTCOMES } from "@/data/business-outcomes";

const TIME_BREAKDOWN = [
  { activity: "Copying paper records into registers and spreadsheets", time: "3 to 4 hours" },
  { activity: "Chasing status, samples and signatures", time: "2 to 3 hours" },
  { activity: "Assembling reports and evidence by hand", time: "2 to 3 hours" },
];

export function BusinessOutcomes() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Business outcomes"
          title="Save one day every week. Per person."
          description="Evidence assembly disappears because the evidence assembled itself. Batch records close when the batch closes."
        />

        <RevealGroup
          className="mx-auto mt-10 flex max-w-2xl flex-col gap-2 rounded-2xl border border-line bg-white p-6"
          stagger={0.04}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
            Where the day comes from · per week, per person
          </p>
          {TIME_BREAKDOWN.map((row) => (
            <RevealItem
              key={row.activity}
              className="flex items-center justify-between gap-4 border-t border-line py-2.5 first:border-t-0 first:pt-4"
            >
              <span className="text-sm text-ink-600">{row.activity}</span>
              <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-ink-900">
                {row.time}
              </span>
            </RevealItem>
          ))}
          <RevealItem className="flex items-center justify-between gap-4 border-t border-line pt-2.5">
            <span className="text-sm font-semibold text-ink-900">Roughly</span>
            <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-brand-600">
              one working day
            </span>
          </RevealItem>
        </RevealGroup>
        <p className="mx-auto mt-3 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
          Our estimate, not a measurement. Across 30 to 60 people in a
          mid-sized plant, that&apos;s a person-year every week. Bring your
          own numbers to the demo and we&apos;ll do this sum with them.
        </p>

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
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
