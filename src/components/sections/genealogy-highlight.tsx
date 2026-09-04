import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HeroMockup } from "@/components/sections/hero-mockup";

const POINTS = [
  "Upstream trace: vendor, goods receipt, sample test and material issue for every input",
  "Downstream lineage from batch release through to customer delivery",
  "Recall exposure calculated instantly — units dispatched, in store and retained samples",
];

export function GenealogyHighlight() {
  return (
    <section id="genealogy" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
              Genealogy
            </span>
            <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
              End-to-end lot traceability, forward and backward, in minutes
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-500">
              Pick a batch and Factro reconstructs its full genealogy — every
              raw material lot, vendor, sample result and downstream shipment
              — without a week spent assembling paperwork that already
              exists.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {POINTS.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span className="text-sm text-ink-600">{point}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:order-1">
            <HeroMockup
              src="/dashboard/genealogy.png"
              alt="Factro Batch Genealogy view tracing Batch MS1238A from raw material vendor through goods receipt, sample testing and material issue, to batch release, dispatch and customer delivery"
              width={1920}
              height={1760}
              fixedHeight="h-[21rem] sm:h-[36rem] lg:h-[21rem]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
