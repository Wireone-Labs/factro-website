import type { Metadata } from "next";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ModulesShowcase } from "@/components/sections/modules-showcase";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { IconTile } from "@/components/ui/icon-tile";
import { UNDERNEATH_EVERY_MODULE, ROADMAP_ITEMS } from "@/data/modules";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Modules",
  description:
    "Everything your ERP, MES, QMS and LIMS do separately, running on one system that already talks to itself.",
  path: "/modules",
});

export default function ModulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Modules"
        title="Everything your ERP, MES, QMS and LIMS do separately"
        description="Running on one system that already talks to itself."
      >
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-ink-500">
          Ten connected modules cover the full path from raw material to released batch.
          Drug and food run side by side, each with its own licences, documents and lines,
          never mixed.
        </p>
      </PageHero>

      <Suspense fallback={null}>
        <ModulesShowcase />
      </Suspense>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Built in, not bolted on"
            title="Underneath every module"
            description="The same four layers run under all ten modules, so they behave like one system instead of ten integrations."
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
            {UNDERNEATH_EVERY_MODULE.map((item) => (
              <RevealItem key={item.id}>
                <div
                  id={item.id}
                  className="scroll-mt-28 flex h-full flex-col gap-4 rounded-2xl border border-line bg-white p-6 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <IconTile icon={item.icon} size="md" />
                    <h3 className="text-base font-semibold text-ink-900">
                      {item.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-2.5">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2} />
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
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="What's next"
            title="The product keeps evolving"
            description="Buy it once, and it keeps getting better. Every release is included — no upgrade fee, no renegotiation at renewal. Here's some of what's coming."
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {ROADMAP_ITEMS.map((item) => (
              <RevealItem key={item.id}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-dashed border-line bg-mist/40 p-6">
                  <div className="flex items-center justify-between">
                    <IconTile icon={item.icon} size="sm" />
                    <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                      Coming up
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <Cta
        id="cta-modules"
        title="See it on your data"
        description="Book a demo and we'll map every module to how your plant already runs."
      />
    </>
  );
}
