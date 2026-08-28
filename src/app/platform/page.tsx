import type { Metadata } from "next";
import { Plug, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { DashboardHighlight } from "@/components/sections/dashboard-highlight";
import { ModulesShowcase } from "@/components/sections/modules-showcase";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { IconTile } from "@/components/ui/icon-tile";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "Production, quality, inventory, and compliance — explore every module on the Factro platform.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="One connected platform for the entire plant"
        description="Every module in Factro shares the same batch, product, and facility data — so production, quality, and business operations never fall out of sync."
      />

      <DashboardHighlight />
      <ModulesShowcase />

      <section id="integrations" className="scroll-mt-28 pb-24 sm:pb-32">
        <Container>
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-3xl border border-line bg-mist/50 px-8 py-14 text-center sm:px-16">
              <IconTile icon={Plug} size="lg" />
              <div className="max-w-xl">
                <h3 className="text-balance text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                  Built to fit into your existing stack
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-500">
                  Factro is designed around a structured, exportable data
                  model — so your production, quality, and inventory records
                  don&apos;t stay locked in one system. Tell us what you run
                  today, and we&apos;ll walk through how it fits together.
                </p>
              </div>
              <Button href="/book-demo" variant="secondary" size="lg" className="group">
                Talk to us about your stack
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <Cta
        title="See the platform on your own production data"
        description="Book a walkthrough and we'll map Factro's modules to how your plant already runs."
      />
    </>
  );
}
