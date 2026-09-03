import { Hero } from "@/components/sections/hero";
import { ThreePillars } from "@/components/sections/three-pillars";
import { DashboardHighlight } from "@/components/sections/dashboard-highlight";
import { ModulesTeaser } from "@/components/sections/modules-teaser";
import { RoiCalculator } from "@/components/sections/roi-calculator";
import { BusinessOutcomes } from "@/components/sections/business-outcomes";
import { Proof } from "@/components/sections/proof";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <ThreePillars />
      <DashboardHighlight />
      <ModulesTeaser />
      <RoiCalculator />
      <BusinessOutcomes />
      <Proof />

      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl rounded-2xl border border-line bg-mist/50 px-8 py-8 text-center">
            <p className="text-sm font-semibold text-ink-900">
              Currently in pilot.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              Factro is running live trials with pharmaceutical manufacturers
              in India, covering batch execution, quality and supply chain.
              Customer references are available under NDA during evaluation.
            </p>
          </Reveal>
        </Container>
      </section>

      <Faq />

      <Cta
        id="cta-home"
        title="Bring a real batch and a real deviation."
        description="Thirty minutes, no slides, no scripted scenarios. You pick the workflow, we run it in Factro."
      />
    </>
  );
}
