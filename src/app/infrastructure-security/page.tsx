import type { Metadata } from "next";
import Link from "next/link";
import { Lock, MonitorCheck, ShieldCheck, Timer, Bug } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { INFRASTRUCTURE_SECTIONS } from "@/data/infrastructure";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Infrastructure & Security",
  description:
    "Enterprise-grade security, built into the platform — encryption, access control, audit trail mechanics and backups.",
  path: "/infrastructure-security",
});

const QUICK_FACTS = [
  { icon: Lock, label: "AES-256 everywhere" },
  { icon: ShieldCheck, label: "MFA on every login" },
  { icon: Timer, label: "RFC 3161 timestamping" },
  { icon: MonitorCheck, label: "99% uptime SLA" },
  { icon: Bug, label: "Independently penetration tested" },
];

export default function InfrastructureSecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Infrastructure & Security"
        title="Enterprise-grade security, built in"
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
        <Container>
          <RevealGroup
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
            stagger={0.04}
          >
            {INFRASTRUCTURE_SECTIONS.map((section) => (
              <RevealItem key={section.id}>
                <div
                  id={section.id}
                  className="scroll-mt-28 flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <IconTile icon={section.icon} size="md" />
                    <div>
                      <h3 className="text-base font-semibold text-ink-900">
                        {section.title}
                      </h3>
                      <p className="text-xs text-ink-400">{section.intro}</p>
                    </div>
                  </div>
                  <ul className="flex flex-col gap-2 border-t border-line pt-4">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        <span className="text-sm leading-relaxed text-ink-600">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

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
