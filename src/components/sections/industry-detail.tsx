import Link from "next/link";
import { BookOpenCheck, Check, Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Industry } from "@/data/industries";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";

export function IndustryDetail({ industry }: { industry: Industry }) {
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
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <SectionHeading
            eyebrow="Controls, mapped"
            title={`${industry.controls.length} controls, ${industry.mappedStandards.length} standards`}
            description="Every control this pack enforces, mapped to the frameworks you're inspected against."
          />

          <RevealGroup
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
            stagger={0.02}
          >
            {industry.controls.map((control, index) => (
              <RevealItem key={control.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-semibold text-brand-600">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink-600">
                  {control.text}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
            Working draft, not a certified mapping — our own reading of each
            framework&apos;s published scope, not a legal determination.
          </p>

          <div className="mt-16 overflow-x-auto">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
              Compliance matrix
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
              A quick-scan view of the controls above, grouped by area, against
              each framework.
            </p>
            <table className="mx-auto mt-8 w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2.5 pr-4 text-left font-semibold text-ink-900">
                    Control area
                  </th>
                  {industry.matrixStandards.map((standard) => (
                    <th
                      key={standard}
                      className="px-2 py-2.5 text-center text-xs font-semibold whitespace-nowrap text-ink-500"
                    >
                      {standard}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {industry.matrix.map((row) => (
                  <tr key={row.area} className="border-b border-line/60">
                    <td className="py-2.5 pr-4 text-sm text-ink-700">{row.area}</td>
                    {row.marks.map((mark, i) => (
                      <td key={i} className="px-2 py-2.5 text-center">
                        {mark && (
                          <Check className="mx-auto h-3.5 w-3.5 text-brand-500" strokeWidth={2.5} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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
                    How this is built
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    The controls above are enforced in the architecture, not
                    configured on top of it. Validation packs (URS, IQ, OQ,
                    PQ, RTM, GAMP 5) are available on the Dedicated tier, and
                    ISO 27001 certification is in progress.
                  </p>
                </div>
              </div>
              <p className="mt-4 pl-7 text-sm leading-relaxed text-ink-500">
                For how these primitives work across every industry, see{" "}
                <Link
                  href="/compliance-engine"
                  className="font-medium text-brand-600 underline underline-offset-2"
                >
                  the Compliance Engine
                </Link>
                . For the technical detail behind them — encryption, access
                control, audit trail mechanics and backups — see{" "}
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
