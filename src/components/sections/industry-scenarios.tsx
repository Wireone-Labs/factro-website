import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { INDUSTRIES } from "@/data/industries";
import { INDUSTRY_OUTCOMES } from "@/data/industry-outcomes";
import { IndustryOutcomeCard } from "./industry-outcome-card";
import { OutcomeCarousel } from "./outcome-carousel";
import styles from "./business-outcomes.module.css";

export function IndustryScenarios() {
  return (
    <section id="industries" className={styles.section} aria-label="Industries">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          title="Built for the industry you run."
          description="Industry-specific controls. Connected work, from receipt to release."
        />
        <OutcomeCarousel>
          {INDUSTRY_OUTCOMES.map(outcome => {
            const industry = INDUSTRIES.find(item => item.id === outcome.id)!;
            return <IndustryOutcomeCard key={outcome.id} outcome={outcome} name={industry.name} slug={industry.slug} icon={<industry.icon size={20} aria-hidden="true" />} />;
          })}
        </OutcomeCarousel>
      </Container>
    </section>
  );
}
