import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PILLARS } from "@/data/pillars";

export function ThreePillars() {
  return (
    <section id="how-it-works" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="How Factro works"
          title="Three ways we close the gap"
          description="None of what's broken on the floor is a documentation failure. It's what happens when the work and the record of the work are two separate activities. Factro closes that gap in three ways."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <RevealItem key={pillar.id}>
              <div className="flex h-full flex-col rounded-3xl border border-line bg-white p-7">
                <IconTile icon={pillar.icon} />
                <span className="mt-5 text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {pillar.label}
                </span>
                <h3 className="text-balance mt-2 text-xl font-semibold tracking-tight text-ink-900">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {pillar.description}
                </p>

                <div className="flex-1" />

                <div className="mt-8 flex flex-col gap-2.5 border-t border-line pt-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    What you get
                  </p>
                  {pillar.bullets.map((bullet) => (
                    <div key={bullet.text} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                      <span className="text-sm leading-relaxed text-ink-600">
                        {bullet.text}
                        {bullet.beta && (
                          <span className="ml-2 inline-flex items-center rounded-full bg-brand-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-600 align-middle">
                            Q4 beta
                          </span>
                        )}
                      </span>
                    </div>
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
