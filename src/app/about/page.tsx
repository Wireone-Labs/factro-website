import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { COMPANY_TIMELINE } from "@/data/about";

export const metadata: Metadata = {
  title: "About Us",
  description: "Who we are and why we're building Factro, for India first.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Nobody looked like a safe purchase at the time"
        description="Somebody backed them anyway."
      />

      <section className="pb-16 sm:pb-20">
        <Container className="max-w-3xl">
          <RevealGroup className="flex flex-col gap-4 border-l-2 border-line pl-6" stagger={0.08}>
            {COMPANY_TIMELINE.map((entry) => (
              <RevealItem key={entry.year} className="relative">
                <span className="absolute -left-[1.72rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-400" />
                <p className="text-sm leading-relaxed text-ink-600">
                  <span className="font-semibold text-ink-900">{entry.year}.</span>{" "}
                  {entry.description}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="flex flex-col gap-5 text-base leading-relaxed text-ink-600">
              <p>
                Factro is young. No wall of logos, and we have told you
                plainly which parts are still being built. What we have is a
                small team that designs, builds, tests and ships, answers the
                phone itself, and stands on pilot floors watching its own
                software get used.
              </p>
              <p>
                Putting execution, quality and compliance in one system that
                survives an inspection is a hard problem, and most software
                here has quietly settled for a piece of it. We would rather
                solve the whole thing, for India first, to a standard that
                holds anywhere.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <blockquote className="mt-10 rounded-2xl border-l-4 border-brand-400 bg-mist/50 px-6 py-5 text-base leading-relaxed text-ink-700 italic">
              Dilip Shanghvi has said Sun Pharma moves when it understands
              about seventy percent of an idea, and learns the remaining
              thirty on the way. That is the decision in front of you.
            </blockquote>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-10 text-lg font-medium leading-relaxed text-ink-900">
              Back us early and you will not be a customer we support. You
              will be a plant we build around.
            </p>
          </Reveal>
        </Container>
      </section>

      <Cta
        id="cta-about"
        title="Come see how Factro fits your operation"
        description="We'd rather show you than tell you. Book a walkthrough with our team."
      />
    </>
  );
}
