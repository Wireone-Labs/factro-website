import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { CORE_MODULES } from "@/data/modules";

export function ModulesTeaser() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="One database"
          title="Most plants buy five systems. This is ten modules, already connected."
          description="An ERP, an MES, a QMS, a LIMS and a document system — then pay every year to make them talk. Factro replaces all five, running as ten modules on one database."
        />

        <RevealGroup className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" stagger={0.04}>
          {CORE_MODULES.map((mod) => (
            <RevealItem key={mod.id}>
              <div className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-line bg-white p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_36px_-18px_rgba(15,14,23,0.15)]">
                <IconTile
                  icon={mod.icon}
                  size="sm"
                  className="transition-colors duration-200 group-hover:border-brand-200 group-hover:bg-brand-100"
                />
                <div>
                  <h3 className="text-sm font-semibold text-ink-900">{mod.tag}</h3>
                  <p className="mt-1 text-xs leading-snug text-ink-500">{mod.title}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

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
