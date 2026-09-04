import {
  FileCheck2,
  FlaskConical,
  Globe,
  HeartPulse,
  Network,
  Quote,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { MAPPED_STANDARDS } from "@/data/compliance";

const STANDARD_ICONS: Record<string, LucideIcon> = {
  "FDA 21 CFR Part 11": ShieldCheck,
  "EU Annex 11 / EU GMP": Globe,
  "Revised Schedule M": FileCheck2,
  "PIC/S GMP": Network,
  WHO: HeartPulse,
  "ICH Q10 / GAMP 5": FlaskConical,
};

const LOOP_STANDARDS = [...MAPPED_STANDARDS, ...MAPPED_STANDARDS];

export function Proof() {
  return (
    <section className="py-16 sm:py-20">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
        Compliances supported
      </p>
      <div className="mask-fade-x mt-6 overflow-hidden border-b border-line pb-16">
        <div className="animate-marquee flex w-max items-stretch gap-5 [animation-play-state:running] hover:[animation-play-state:paused]">
          {LOOP_STANDARDS.map((standard, i) => {
            const Icon = STANDARD_ICONS[standard.name] ?? ShieldCheck;
            return (
              <div
                key={`${standard.name}-${i}`}
                className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-white px-6 py-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="text-left">
                  <p className="text-sm font-semibold whitespace-nowrap tracking-tight text-ink-900">
                    {standard.name}
                  </p>
                  {standard.region && (
                    <p className="text-xs whitespace-nowrap text-ink-400">
                      {standard.region}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Container>
        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <Quote className="mx-auto h-8 w-8 text-brand-300" />
          <p className="text-balance mt-6 text-xl font-medium leading-relaxed text-ink-900 sm:text-2xl">
            &ldquo;Most plants do not have a compliance problem. They have an
            observability problem. Factro closes that gap in the
            architecture, not with another checklist.&rdquo;
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
