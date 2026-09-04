import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { AUDIENCES } from "@/data/audiences";

export function WhoIsItFor() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Who it's for"
          title="Built for regulated manufacturing"
          description="One platform, with the segregation and controls to run more than one classification of production without mixing them."
        />

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3"
          stagger={0.08}
        >
          {AUDIENCES.map((audience) => (
            <RevealItem key={audience.id}>
              <div className="flex h-full flex-col items-center gap-4 rounded-2xl border border-line bg-white p-7 text-center">
                <IconTile
                  icon={audience.icon}
                  size="lg"
                  className={audience.colorClass}
                />
                <div>
                  <h3 className="text-base font-semibold text-ink-900">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {audience.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
