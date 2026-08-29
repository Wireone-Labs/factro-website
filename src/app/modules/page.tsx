import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { DashboardHighlight } from "@/components/sections/dashboard-highlight";
import { ModulesShowcase } from "@/components/sections/modules-showcase";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { IconTile } from "@/components/ui/icon-tile";
import { UNDERNEATH_EVERY_MODULE } from "@/data/modules";

export const metadata: Metadata = {
  title: "Modules",
  description:
    "Everything your ERP, MES, QMS and LIMS do separately, running on one system that already talks to itself.",
};

export default function ModulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Modules"
        title="Everything your ERP, MES, QMS and LIMS do separately"
        description="Running on one system that already talks to itself."
      />

      <section className="pb-4">
        <Container>
          <Reveal>
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-mist/50 px-6 py-5">
              <IconTile icon={Landmark} size="sm" />
              <p className="text-sm leading-relaxed text-ink-600">
                <span className="font-semibold text-ink-900">
                  Finance stays where it is.
                </span>{" "}
                Tally keeps the books. Factro posts voucher-level entries for
                batch costs, purchases and payments, and your accountant just
                finds the numbers already reconciled.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <DashboardHighlight />
      <ModulesShowcase />

      <section className="pb-16 sm:pb-20">
        <Container>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
            Underneath every module
          </p>
          <RevealGroup className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2" stagger={0.08}>
            {UNDERNEATH_EVERY_MODULE.map((item) => (
              <RevealItem key={item.id}>
                <div id={item.id} className="scroll-mt-28 h-full rounded-2xl border border-line bg-white p-6">
                  <IconTile icon={item.icon} size="sm" />
                  <h3 className="mt-4 text-sm font-semibold text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {item.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
            Buy it once. It keeps getting better. Every release is included:
            new modules, new capabilities, new regulatory profiles. No
            upgrade fee, no renegotiation at renewal.
          </p>
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
