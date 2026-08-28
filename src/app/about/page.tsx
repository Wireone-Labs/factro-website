import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { COMPANY_VALUES } from "@/data/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Wireone Labs built Factro — a connected system for production and quality in regulated manufacturing.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A connected system, built by people who've seen the disconnected version"
        description="Factro is built by Wireone Labs for manufacturing teams who need production and quality to run as one discipline, not two."
      />

      <section className="py-24 sm:py-32">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Why we built Factro
            </h2>
            <div className="mt-6 flex flex-col gap-5 text-base leading-relaxed text-ink-600">
              <p>
                Factro started with a simple observation: regulated
                manufacturers were running mission-critical processes —
                batch records, quality sign-offs, compliance documentation —
                across spreadsheets and disconnected tools that were never
                built for the job.
              </p>
              <p>
                Every handoff between production and quality meant
                re-entering data, chasing down a paper trail, or hoping
                nothing fell through the cracks between systems. None of
                that is a technology problem you can solve by adding another
                tool. It&apos;s a problem you solve by treating production
                and quality as one connected system from the start.
              </p>
              <p>
                That&apos;s what Factro is — a platform where a batch, a
                deviation, and a training record all point back to the same
                source of truth, instead of three different ones.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 sm:pb-32">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="The principles behind how we build"
          />

          <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {COMPANY_VALUES.map((value) => (
              <RevealItem key={value.title}>
                <div className="h-full rounded-2xl border border-line bg-white p-7">
                  <IconTile icon={value.icon} />
                  <h3 className="mt-5 text-base font-semibold text-ink-900">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                    {value.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <Cta
        title="Come see how Factro fits your operation"
        description="We'd rather show you than tell you. Book a walkthrough with our team."
      />
    </>
  );
}
