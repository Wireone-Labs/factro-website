import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ModulesGrid } from "@/components/sections/modules-grid";

export function ModulesTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="One system"
          title="Most plants buy five systems. This is ten modules, already connected."
          description="An ERP, an MES, a QMS, a LIMS and a document management system — then pay every year to make them talk. Factro replaces all five, running as ten modules on one system."
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
