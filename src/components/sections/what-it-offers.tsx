import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { HeroMockup } from "@/components/sections/hero-mockup";

const POINTS = [
  "Every module reports into one live dashboard — no integration layer to build or maintain",
  "Cross-module workflows like CAPA pull from Production, Quality and Purchase in real time, not a weekly export",
  "Metrics update as the floor moves, not on a nightly batch job",
];

export function WhatItOffers() {
  return (
    <section id="what-it-offers" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="What it offers"
          title="One system, everything the floor needs to see"
          description="Factro's modules don't just record what happened — they show what's happening, put it in front of the person who owns it, and hold the proof for when it's needed. Here's what that looks like on the floor."
        />

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              01 · Real-time visibility
            </span>
            <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              Monitoring across 100+ parameters
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Bolt an ERP to a QMS to a LIMS and you don&apos;t just pay five
              license fees — you pay an integration tax on every workflow
              that crosses them. A CAPA needs data from Production, Quality
              and Purchase all at once; stitched together, it usually settles
              for a point-in-time export. On one system, it&apos;s live by
              default.
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
              priority
              cropAspect="aspect-[16/9]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
