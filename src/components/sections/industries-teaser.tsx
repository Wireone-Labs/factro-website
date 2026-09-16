import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { INDUSTRIES } from "@/data/industries";

export function IndustriesTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Who it's for"
          title="Seven industries, one platform"
          description="The core runs materials, batches, quality and dispatch the same way everywhere. The regulatory pack carries the frameworks you're held to. Changing industry changes the pack, not the platform."
        />

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.05}
        >
          {INDUSTRIES.map((industry) => (
            <RevealItem key={industry.id}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-white p-6 text-center transition-colors hover:border-brand-200"
              >
                <IconTile icon={industry.icon} />
                <h3 className="text-sm font-semibold text-ink-900">
                  {industry.name}
                </h3>
                <p className="text-xs leading-relaxed text-ink-500">
                  {industry.tagline}
                </p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-4 text-center">
            <p className="text-sm leading-relaxed text-ink-700">
              <span className="font-semibold">One roof, more than one pack.</span>{" "}
              A plant that makes a nutraceutical and a cosmetic, or a
              contract site running pharma and veterinary lines, carries
              both packs at once. A batch knows which one applies to it.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
