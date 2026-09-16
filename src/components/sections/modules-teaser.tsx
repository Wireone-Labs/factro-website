import { ArrowRight, Landmark } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ModulesGrid } from "@/components/sections/modules-grid";

export function ModulesTeaser() {
  return (
    <section id="modules" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="One system"
          title="Most plants buy five systems. This is ten modules, already connected."
          description="Factro replaces the five separate systems a plant usually buys — and pays every year to make talk to each other — with ten connected modules on one database, one audit trail underneath all of them."
        />

        <ModulesGrid />

        <Reveal delay={0.05}>
          <div className="mx-auto mt-10 flex max-w-2xl items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <p className="text-sm leading-relaxed text-ink-700">
              <span className="font-semibold">Finance stays where it is.</span>{" "}
              Tally keeps the books. Factro posts voucher-level entries for
              batch costs, purchases, sales and payments, and generates
              e-invoices and e-way bills against the dispatch record. Your
              accountant notices nothing except that the numbers arrive
              reconciled.
            </p>
          </div>
        </Reveal>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
          Buy it once. It keeps getting better. Every release is included: new
          modules, new capabilities, new regulatory profiles. No upgrade fee,
          no renegotiation at renewal.
        </p>

        <div className="mt-8 flex justify-center">
          <Button href="/modules" variant="secondary" size="lg" className="group">
            See what&apos;s in every module
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
