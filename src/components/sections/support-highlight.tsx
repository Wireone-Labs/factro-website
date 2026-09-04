import { Phone, Ticket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SALES_PHONE, SALES_PHONE_HREF } from "@/data/nav";

export function SupportHighlight() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Support"
          title="Help that doesn't wait for a queue"
          description="No separate support contract to negotiate — round-the-clock phone support and issue tracking are part of the platform, not an add-on."
        />
        <RevealGroup
          className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2"
          stagger={0.08}
        >
          <RevealItem>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6">
              <IconTile icon={Phone} />
              <div>
                <h3 className="text-sm font-semibold text-ink-900">
                  24×7 phone support
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  Round-the-clock, no ticket queue to reach a person first —{" "}
                  <a
                    href={SALES_PHONE_HREF}
                    className="font-medium text-brand-600 hover:text-brand-700"
                  >
                    {SALES_PHONE}
                  </a>
                  .
                </p>
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6">
              <IconTile icon={Ticket} />
              <div>
                <h3 className="text-sm font-semibold text-ink-900">
                  Built-in ticketing
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  Feedback and issues are logged, tracked and closed inside
                  Factro itself — no separate support tool to check.
                </p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
