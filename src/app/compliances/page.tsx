import type { Metadata } from "next";
import Link from "next/link";
import { Gavel, Info, Radar } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { ComplianceControlsList } from "@/components/sections/compliance-controls";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  MAPPED_STANDARDS,
  COMPLIANCE_CONTROLS,
  COMPLIANCE_COVERAGE,
  COMPLIANCE_TIMELINE,
} from "@/data/compliance";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";
import { pageMetadata } from "@/lib/site";
import { cn } from "@/lib/utils";

const TIMELINE_STATUS: Record<
  (typeof COMPLIANCE_TIMELINE)[number]["status"],
  { label: string; dot: string; text: string }
> = {
  applied: { label: "Applied", dot: "bg-brand-500", text: "text-brand-600" },
  monitoring: { label: "Monitoring", dot: "bg-amber-500", text: "text-amber-600" },
  upcoming: { label: "Upcoming", dot: "bg-ink-300", text: "text-ink-500" },
};

export const metadata: Metadata = pageMetadata({
  title: "Compliances",
  description:
    "Ninety-six control points, validated in live pilot runs with pharmaceutical manufacturers. Validation-ready for 21 CFR Part 11, EU Annex 11 and Revised Schedule M.",
  path: "/compliances",
});

export default function CompliancesPage() {
  return (
    <>
      <PageHero
        eyebrow="Compliances"
        title="Ninety-six control points, validated in live pilot runs"
        description="Validation-ready for 21 CFR Part 11, EU Annex 11 and Revised Schedule M, with ISO 27001 in progress, and kept current with regulatory change as part of the product, at no extra cost."
      />

      <section className="py-12 sm:py-14">
        <Container>
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <IconTile icon={Gavel} size="lg" className="shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                The rule is the control itself
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600">
                The Compliance Engine is a rule engine built from the
                regulations themselves, not a checklist bolted on afterward.
                Maker cannot be checker, enforced by the system rather than a
                policy document. Every signature re-authenticates and
                captures a reason in the same transaction. Inspection
                readiness is scored continuously, surfacing risk before an
                inspection finds it. A rule change is a setting, not a
                software release, and the system tells you what it affects
                before you commit it.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
            {COMPLIANCE_CONTROLS.length} controls, {MAPPED_STANDARDS.length} standards
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
            Every control Factro enforces. Select a standard to see exactly
            which controls satisfy it — new controls are added here as they
            ship, this isn&apos;t a one-time snapshot.
          </p>
          <Reveal delay={0.05} className="mt-8">
            <ComplianceControlsList />
          </Reveal>
          <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
            Working draft, not a certified mapping — our own reading of each
            framework&apos;s published scope, not a legal determination.
          </p>

          <div className="mt-16">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
              Compliance coverage by geography
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
              Estimated coverage of each standard&apos;s published
              requirements, by the region it governs.
            </p>
            <RevealGroup
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-3"
              stagger={0.05}
            >
              {COMPLIANCE_COVERAGE.map((row) => (
                <RevealItem
                  key={row.standard}
                  className="flex items-center gap-4 rounded-xl border border-line bg-white px-4 py-3.5"
                >
                  <span className="text-xl leading-none" aria-hidden>
                    {row.flag}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                      <span className="text-sm font-medium text-ink-900">
                        {row.standard}
                      </span>
                      <span className="text-xs text-ink-400">{row.region}</span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-mist">
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: `${row.min}%` }}
                      />
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-ink-700">
                    ~{row.min}–{row.max}%
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
            <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
              Validation-ready for 21 CFR Part 11 and SOC 2 Type II.
            </p>
          </div>

          <div className="mt-20">
            <SectionHeading
              eyebrow="Regulatory change"
              title="We watch the regulations so you don't have to"
              description="Standards don't stay still — India revises Schedule M, the EU reviews Annex 11, ICH updates its guidelines. The Compliance Engine tracks every one of them: when a rule changes, it tells you what it affects, updates the system, and re-validates before anything goes live. You don't file a change request. It's already handled."
            />

            <RevealGroup
              className="mx-auto mt-10 flex max-w-2xl flex-col gap-6 border-l-2 border-line pl-6"
              stagger={0.06}
            >
              {COMPLIANCE_TIMELINE.map((entry) => {
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
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">
                      {entry.description}
                    </p>
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

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-line bg-mist/50 px-6 py-6">
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
                <li>
                  ISO 27001 and SOC 2 controls are already validated against
                  each standard; formal third-party certification and audit
                  are in progress.
                </li>
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
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Cta
        id="cta-compliances"
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
