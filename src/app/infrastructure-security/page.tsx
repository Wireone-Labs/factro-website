import type { Metadata } from "next";
import Link from "next/link";
import { Lock, MonitorCheck, ShieldCheck, Timer } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { ScrollRail } from "@/components/ui/scroll-rail";
import { Reveal } from "@/components/ui/reveal";
import { INFRASTRUCTURE_SECTIONS } from "@/data/infrastructure";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";

export const metadata: Metadata = {
  title: "Infrastructure & Security",
  description:
    "How the Factro platform itself is built, hosted and protected — encryption, access control, audit trail mechanics and backups.",
};

const QUICK_FACTS = [
  { icon: Lock, label: "AES-256 everywhere" },
  { icon: ShieldCheck, label: "MFA on every login" },
  { icon: Timer, label: "RFC 3161 timestamping" },
  { icon: MonitorCheck, label: "99% uptime SLA" },
];

export default function InfrastructureSecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure & Security"
        title="How the platform is built, hosted and protected"
        description="Compliances covers the regulatory controls. This page covers how the platform itself is built, hosted and protected underneath them."
      />

      <section className="pb-4">
        <Container>
          <Reveal className="flex flex-wrap justify-center gap-2">
            {QUICK_FACTS.map((fact) => (
              <span
                key={fact.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-medium text-ink-600"
              >
                <fact.icon className="h-3.5 w-3.5 text-brand-500" />
                {fact.label}
              </span>
            ))}
          </Reveal>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="max-w-3xl">
          <ScrollRail className="flex flex-col gap-10">
            {INFRASTRUCTURE_SECTIONS.map((section, index) => (
              <div key={section.id} id={section.id} className="scroll-mt-28">
                <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-7 sm:p-8">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-4 -right-2 text-7xl font-black text-mist select-none"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="relative flex items-center gap-3">
                    <IconTile icon={section.icon} />
                    <h3 className="text-lg font-semibold text-ink-900">
                      {section.title}
                    </h3>
                  </div>
                  <div className="relative mt-5 flex flex-col gap-3 border-t border-line pt-5">
                    {section.paragraphs.map((paragraph, i) => (
                      <p key={i} className="text-sm leading-relaxed text-ink-600">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </ScrollRail>

          <Reveal delay={0.1}>
            <p className="mt-10 text-center text-sm leading-relaxed text-ink-500">
              Looking for the regulatory mapping? This page covers how the
              platform is built. For which controls satisfy 21 CFR Part 11,
              EU Annex 11 and Revised Schedule M, see{" "}
              <Link
                href="/compliances"
                className="font-medium text-brand-600 underline underline-offset-2"
              >
                Compliances
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <Cta
        id="cta-infrastructure-security"
        title="Have a security questionnaire to walk through?"
        description="Tell us what your customers or auditors need and we'll work through it with you."
        primaryLabel="Book a demo"
        primaryHref={BOOK_DEMO_HREF}
        secondaryLabel="Email our team"
        secondaryHref={SALES_MAILTO}
      />
    </>
  );
}
