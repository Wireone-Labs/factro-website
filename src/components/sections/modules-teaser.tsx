import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
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

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
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
