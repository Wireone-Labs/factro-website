import { ComplianceMarquee } from "@/components/sections/compliance-marquee";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { INDUSTRIES } from "@/data/industries";

export function Proof() {
  return (
    <section id="compliance-decoded" aria-label="Compliance decoded" className="py-16 sm:py-20">
      <Container>
        <SectionHeading eyebrow="Built-in controls" title="Compliance decoded." description="The standards you work to. The controls that keep them in the workflow." />
      </Container>
      <ComplianceMarquee industries={INDUSTRIES.map((industry) => ({
        id: industry.id,
        name: industry.name,
        standards: industry.mappedStandards.map(({ name, region }) => ({
          name: name === "WHO" ? "WHO GMP" : name,
          region,
        })),
      }))} />
    </section>
  );
}
