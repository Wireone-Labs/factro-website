import type { Metadata } from "next";
import { CheckCircle2, Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem, Reveal } from "@/components/ui/reveal";
import { COMPLIANCE_PILLARS } from "@/data/compliance";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";

export const metadata: Metadata = {
  title: "Compliance",
  description:
    "How Factro approaches data security, privacy, access control, and auditability for regulated manufacturing teams.",
};

export default function CompliancePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance"
        title="Trust, built into how Factro works"
        description="Security and compliance aren't a checklist we bolt on — they shape how records, approvals, and access work across the platform."
      />

      <section className="py-24 sm:py-32">
        <Container>
          <RevealGroup className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {COMPLIANCE_PILLARS.map((pillar) => (
              <RevealItem key={pillar.id}>
                <div id={pillar.id} className="scroll-mt-28 h-full rounded-2xl border border-line bg-white p-7">
                  <IconTile icon={pillar.icon} />
                  <h3 className="mt-5 text-base font-semibold text-ink-900">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                    {pillar.summary}
                  </p>
                  <div className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                    {pillar.points.map((point) => (
                      <div key={point} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                        <span className="text-xs leading-relaxed text-ink-600">
                          {point}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-12 flex items-start gap-3 rounded-2xl border border-line bg-mist/50 px-6 py-5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
              <p className="text-sm leading-relaxed text-ink-500">
                This page summarizes how Factro is built today and is
                structured to be replaced with detailed compliance
                documentation as it becomes available. For a specific
                security questionnaire or audit request, get in touch and
                we&apos;ll work through it with you.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Cta
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
