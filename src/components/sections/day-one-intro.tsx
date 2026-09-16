import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function DayOneIntro() {
  return (
    <section className="pt-16 pb-4 sm:pt-20">
      <Container>
        <SectionHeading
          eyebrow="What you get on day one"
          title="Built in, not bolted on"
          description="Five things that are different the moment you go live — not roadmap promises."
        />
      </Container>
    </section>
  );
}
