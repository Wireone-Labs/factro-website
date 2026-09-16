import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { INDUSTRIES } from "@/data/industries";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Seven regulated industries, one platform. The core runs materials, batches, quality and dispatch the same way everywhere — the regulatory pack carries the frameworks you're held to.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Seven industries, one platform"
        description="The core runs materials, batches, quality and dispatch the same way everywhere. The regulatory pack carries the frameworks you are held to, the records those frameworks name, and the workflows specific to your product. Changing industry changes the pack, not the platform."
      />

      <section className="pb-16 sm:pb-20">
        <Container>
          <RevealGroup
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {INDUSTRIES.map((industry) => (
              <RevealItem key={industry.id}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-colors hover:border-brand-200"
                >
                  <IconTile icon={industry.icon} />
                  <h3 className="mt-4 text-base font-semibold text-ink-900">
                    {industry.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">
                    {industry.tagline}
                  </p>
                  <p className="mt-3 text-xs text-ink-400">
                    {industry.mappedStandards
                      .slice(0, 3)
                      .map((s) => s.name)
                      .join(" · ")}
                  </p>
                  <span className="mt-4 flex items-center gap-1.5 text-sm font-medium text-brand-600">
                    See the controls
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-10 rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-5 text-center">
              <p className="text-sm leading-relaxed text-ink-700">
                <span className="font-semibold">One roof, more than one pack.</span>{" "}
                A plant that makes a nutraceutical and a cosmetic, or a
                contract site running pharma and veterinary lines, carries
                both packs at once. A batch knows which one applies to it,
                and your inspector sees one system, one access model, one
                audit log.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Cta
        id="cta-industries"
        title="Don't see your exact category?"
        description="If it's regulated manufacturing, the core probably already fits — tell us what you make and we'll show you where the pack needs to flex."
        primaryLabel="Book a demo"
        primaryHref={BOOK_DEMO_HREF}
        secondaryLabel="Email our team"
        secondaryHref={SALES_MAILTO}
      />
    </>
  );
}
