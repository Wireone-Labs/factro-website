import Link from "next/link";
import { BookOpenCheck, Info, Radar } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { IndustryControlsList } from "@/components/sections/industry-controls-list";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  type Industry,
  type RegulatoryTimelineEntry,
  matrixBackedStandards,
  standardCoverage,
} from "@/data/industries";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";
import { cn } from "@/lib/utils";

const TIMELINE_STATUS: Record<
  RegulatoryTimelineEntry["status"],
  { label: string; dot: string; text: string }
> = {
  applied: { label: "Applied", dot: "bg-brand-500", text: "text-brand-600" },
  monitoring: { label: "Monitoring", dot: "bg-amber-500", text: "text-amber-600" },
  upcoming: { label: "Upcoming", dot: "bg-ink-300", text: "text-ink-500" },
};

export function IndustryDetail({ industry }: { industry: Industry }) {
  const coverage = standardCoverage(industry);

  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={industry.tagline}
        description={industry.summary}
      />

      <section className="pb-8 sm:pb-10">
        <Container>
          <Reveal className="flex flex-wrap justify-center gap-2">
            {industry.mappedStandards.map((standard) => (
              <span
                key={standard.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-600"
              >
                {standard.name}
                <span className="text-ink-400">· {standard.region}</span>
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <IconTile icon={industry.icon} size="lg" className="shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                {industry.narrativeHeading}
              </h2>
              <div className="mt-5 flex flex-col gap-4">
                {industry.narrative.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-ink-600">
                    {paragraph}
                  </p>
                ))}
              </div>
              <p className="mt-4 text-sm text-ink-400">
                The controls below run on the same compliance engine every
                industry uses.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-12 sm:pb-14">
        <Container>
          <SectionHeading
            eyebrow="Built for you"
            title={`What's tailored for ${industry.name.toLowerCase()}`}
            description="Not just compliance mapping — here's where the modules themselves work differently for this industry."
          />
          <RevealGroup
            className="mx-auto mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2"
            stagger={0.05}
          >
            {industry.builtFor.map((item) => (
              <RevealItem key={item.module + item.detail}>
                <div className="h-full rounded-xl border border-line bg-white p-4">
                  <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                    {item.module}
                  </span>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-600">
                    {item.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
              {industry.controls.length} controls, {industry.mappedStandards.length} standards
            </p>
            <p className="text-xs text-ink-400">Select a standard to filter</p>
          </div>
          <Reveal delay={0.05} className="mt-4">
            <IndustryControlsList
              controls={industry.controls}
              matrix={industry.matrix}
              matrixStandards={industry.matrixStandards}
              mappedStandards={matrixBackedStandards(industry)}
            />
          </Reveal>
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
            Working draft, not a certified mapping — our own reading of each
            framework&apos;s published scope, not a legal determination.
          </p>

          <div className="mt-8">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
              Coverage by geography
            </p>
            <RevealGroup
              className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2"
              stagger={0.03}
            >
              {coverage.map((row) => (
                <RevealItem
                  key={row.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs"
                >
                  <span aria-hidden>{row.flag}</span>
                  <span className="font-medium text-ink-700">{row.region}</span>
                  <span className="text-ink-300">·</span>
                  <span className="font-semibold text-ink-900">{row.percent}%</span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Regulatory change"
              title="We watch the regulations so you don't have to"
              description="Standards don't stay still. The Compliance Engine tracks every one that applies to you: when a rule changes, it tells you what it affects, updates the system, and re-validates before anything goes live. You don't file a change request. It's already handled."
            />

            <RevealGroup
              className="mx-auto mt-10 flex max-w-2xl flex-col gap-6 border-l-2 border-line pl-6"
              stagger={0.06}
            >
              {industry.regulatoryTimeline.map((entry) => {
                const status = TIMELINE_STATUS[entry.status];
                return (
                  <RevealItem key={entry.title} className="relative">
                    <span
                      className={cn(
                        "absolute -left-[1.97rem] top-1.5 h-2.5 w-2.5 rounded-full",
                        status.dot,
                      )}
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "text-xs font-semibold uppercase tracking-wide",
                          status.text,
                        )}
                      >
                        {status.label}
                      </span>
                      <span className="text-xs text-ink-400">
                        · {entry.date}
                      </span>
                    </div>
                    <h3 className="mt-1 text-sm font-semibold text-ink-900">
                      {entry.title}
                    </h3>
                    {entry.description && (
                      <p className="mt-1 text-sm leading-relaxed text-ink-500">
                        {entry.description}
                      </p>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal delay={0.1} className="mx-auto mt-8 max-w-2xl">
              <div className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4">
                <Radar className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <p className="text-sm leading-relaxed text-ink-700">
                  Every update runs through the same validation discipline as
                  the platform itself — tested against the workflows it
                  touches before it reaches a single client&apos;s floor.
                  Nothing ships because a regulation changed; it ships
                  because the change passed.
                </p>
              </div>
            </Reveal>
          </div>

          {industry.extras.map((extra) => (
            <div key={extra.heading} className="mt-20">
              <SectionHeading eyebrow="Detail" title={extra.heading} description={extra.intro} />

              {extra.bullets && (
                <RevealGroup
                  className="mx-auto mt-8 flex max-w-2xl flex-col gap-3"
                  stagger={0.04}
                >
                  {extra.bullets.map((bullet) => (
                    <RevealItem
                      key={bullet}
                      className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5"
                    >
                      <BookOpenCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span className="text-sm leading-relaxed text-ink-600">
                        {bullet}
                      </span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}

              {extra.table && (
                <div className="mt-8 overflow-x-auto">
                  <table className="mx-auto w-full min-w-[560px] max-w-3xl border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-line">
                        {extra.table.columns.map((column) => (
                          <th
                            key={column}
                            className="py-2.5 px-3 text-left text-xs font-semibold uppercase tracking-wide text-ink-400"
                          >
                            {column}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {extra.table.rows.map((row, i) => (
                        <tr key={i} className="border-b border-line/60">
                          {row.cells.map((cell, j) => (
                            <td
                              key={j}
                              className="py-2.5 px-3 text-sm leading-relaxed text-ink-600"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}

          <Reveal delay={0.1}>
            <div className="mt-20 rounded-2xl border border-line bg-mist/50 px-6 py-6">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <div>
                  <h3 className="text-sm font-semibold text-ink-900">
                    Validation readiness
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    The controls above are enforced in the architecture, not
                    configured on top of it.
                  </p>
                </div>
              </div>
              <ul className="mt-4 flex flex-col gap-2 pl-7 text-sm leading-relaxed text-ink-600">
                <li>
                  Validation packs (URS, IQ, OQ, PQ, RTM, GAMP 5) are
                  available on the Dedicated tier.
                </li>
                <li>ISO 27001 certification is in progress.</li>
                <li>
                  Inspection readiness is scored continuously by the
                  Compliance Engine, not assembled the week before an audit.
                </li>
              </ul>
              <p className="mt-4 pl-7 text-sm leading-relaxed text-ink-500">
                For the technical detail behind these controls — encryption,
                access control, audit trail mechanics and backups — see{" "}
                <Link
                  href="/infrastructure-security"
                  className="font-medium text-brand-600 underline underline-offset-2"
                >
                  Infrastructure &amp; Security
                </Link>
                . For what sits in each workspace, see{" "}
                <Link
                  href="/modules"
                  className="font-medium text-brand-600 underline underline-offset-2"
                >
                  Modules
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Cta
        id={`cta-${industry.slug}`}
        title="Have a compliance requirement to walk through?"
        description="Tell us about your regulatory environment and we'll show you exactly how Factro fits."
        primaryLabel="Book a demo"
        primaryHref={BOOK_DEMO_HREF}
        secondaryLabel="Email our team"
        secondaryHref={SALES_MAILTO}
      />
    </>
  );
}
