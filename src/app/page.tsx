import { Hero } from "@/components/sections/hero";
import { DayOne } from "@/components/sections/day-one";
import { IndustriesTeaser } from "@/components/sections/industries-teaser";
import { ThreePillars } from "@/components/sections/three-pillars";
import { OneSystemFourStacks } from "@/components/sections/one-system-four-stacks";
import { GenealogyHighlight } from "@/components/sections/genealogy-highlight";
import { DashboardHighlight } from "@/components/sections/dashboard-highlight";
import { ProductionPlanningHighlight } from "@/components/sections/production-planning-highlight";
import { ModulesTeaser } from "@/components/sections/modules-teaser";
import { BusinessOutcomes } from "@/components/sections/business-outcomes";
import { SupportHighlight } from "@/components/sections/support-highlight";
import { Proof } from "@/components/sections/proof";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <DayOne />
      <IndustriesTeaser />
      <ThreePillars />
      <OneSystemFourStacks />
      <GenealogyHighlight />
      <DashboardHighlight />
      <ProductionPlanningHighlight />
      <ModulesTeaser />
      <BusinessOutcomes />
      <SupportHighlight />
      <Proof />

      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl rounded-2xl border border-line bg-mist/50 px-8 py-8 text-center">
            <p className="text-sm font-semibold text-ink-900">
              Currently in pilot.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-500">
              Factro is running live trials with regulated manufacturers in
              India, covering batch execution, quality and supply chain.
              Customer references are available under NDA during evaluation.
            </p>
          </Reveal>
        </Container>
      </section>

      <Faq />

      <Cta
        id="cta-home"
        title="Bring a real batch and a real deviation."
        description="Thirty minutes, at your facility, at our expense. No slides, no scripted scenarios. You pick the workflow, we run it in Factro."
      />
    </>
  );
}
