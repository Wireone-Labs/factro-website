import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ScrollRail } from "@/components/ui/scroll-rail";
import { Button } from "@/components/ui/button";
import { CORE_MODULES } from "@/data/modules";

export function ModulesTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Core platform"
          title="Everything a regulated plant runs on"
          description="Six connected modules cover the full path from raw material to released batch — each one built around how process manufacturers actually work."
        />

        <ScrollRail className="mt-16 lg:pl-2">
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_MODULES.map((mod) => (
              <RevealItem key={mod.id}>
                <div className="group h-full rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_36px_-18px_rgba(15,14,23,0.15)]">
                  <IconTile
                    icon={mod.icon}
                    className="transition-colors duration-200 group-hover:border-brand-200 group-hover:bg-brand-100"
                  />
                  <h3 className="mt-5 text-base font-semibold text-ink-900">
                    {mod.tag}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {mod.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </ScrollRail>

        <div className="mt-12 flex justify-center">
          <Button href="/platform" variant="secondary" size="lg" className="group">
            Explore the full platform
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
