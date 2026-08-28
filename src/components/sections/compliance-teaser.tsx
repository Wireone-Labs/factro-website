import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { COMPLIANCE_PILLARS } from "@/data/compliance";

const FEATURED = COMPLIANCE_PILLARS.slice(0, 4);

export function ComplianceTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Trust & compliance"
          title="Built for teams that can't afford to get it wrong"
          description="Access control, auditability, and data protection aren't add-ons — they're how Factro is put together."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED.map((pillar) => (
            <RevealItem key={pillar.id}>
              <div className="h-full rounded-2xl border border-line bg-white p-6">
                <IconTile icon={pillar.icon} size="sm" />
                <h3 className="mt-4 text-sm font-semibold text-ink-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {pillar.summary}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <Button href="/compliance" variant="secondary" size="lg" className="group">
            Read about compliance
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
