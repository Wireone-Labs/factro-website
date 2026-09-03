import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MAPPED_STANDARDS, COMPLIANCE_CONTROLS } from "@/data/compliance";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";
import { pageMetadata } from "@/lib/site";

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

      <section className="pb-4">
        <Container>
          <Reveal className="flex flex-wrap justify-center gap-2">
            {MAPPED_STANDARDS.map((standard) => (
              <span
                key={standard.name}
                className="inline-flex items-center rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink-600"
              >
                {standard.name}
                {standard.region && (
                  <span className="ml-1.5 text-ink-400">· {standard.region}</span>
                )}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container className="max-w-3xl">
          <Reveal>
            <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              The rule is the control itself
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              The Compliance Engine is a rule engine built from the
              regulations themselves, not a checklist bolted on afterward.
              Maker cannot be checker, enforced by the system rather than a
              policy document. Every signature re-authenticates and captures
              a reason in the same transaction. Inspection readiness is
              scored continuously, surfacing risk before an inspection finds
              it. A rule change is a setting, not a software release, and the
              system tells you what it affects before you commit it.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
            Twenty controls, six standards
          </p>
          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              COMPLIANCE_CONTROLS.slice(0, Math.ceil(COMPLIANCE_CONTROLS.length / 2)),
              COMPLIANCE_CONTROLS.slice(Math.ceil(COMPLIANCE_CONTROLS.length / 2)),
            ].map((column, colIndex) => (
              <RevealGroup
                key={colIndex}
                className="flex flex-col gap-3"
                stagger={0.03}
              >
                {column.map((control) => (
                  <RevealItem
                    key={control}
                    className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <span className="text-sm leading-relaxed text-ink-600">
                      {control}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-line bg-mist/50 px-6 py-6">
              <h3 className="text-sm font-semibold text-ink-900">
                Validation readiness
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-ink-600">
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
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-mist/50 px-6 py-5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
              <p className="text-sm leading-relaxed text-ink-500">
                The controls above are enforced in the architecture, not
                configured on top of it. For the technical detail behind
                them — encryption, access control, audit trail mechanics and
                backups — see{" "}
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
