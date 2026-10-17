import { UserRound, Ticket } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SupportFlow } from "./support-flow";
import desktopStyles from "./home-desktop.module.css";

export function SupportHighlight() {
  return (
    <section id="support" className="overflow-x-clip py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Support"
          title="Help that doesn't wait for a queue"
          description="No separate support contract to negotiate. Round-the-clock phone support and technical assistance are part of the platform, not an add-on."
        />
        <div className={`mx-auto mt-10 grid max-w-5xl items-center gap-10 lg:grid-cols-[1.2fr_1fr] ${desktopStyles.supportLayout}`}>
        <SupportFlow />
        <RevealGroup
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1"
          stagger={0.08}
        >
          <RevealItem>
            <div className={`flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 ${desktopStyles.supportCard}`}>
              <IconTile icon={UserRound} />
              <div>
                <h3 className="text-sm font-semibold text-ink-900">
                  Dedicated account manager
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  A named point of contact who knows your plant, coordinates onboarding
                  and workflow setup, and follows issues through to resolution.
                </p>
              </div>
            </div>
          </RevealItem>
          <RevealItem>
            <div className={`flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-6 ${desktopStyles.supportCard}`}>
              <IconTile icon={Ticket} />
              <div>
                <h3 className="text-sm font-semibold text-ink-900">
                  Built-in ticketing
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  Assistance requests stay connected to your specialist,
                  conversation and resolution inside Factro. No separate support tool to check.
                </p>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
