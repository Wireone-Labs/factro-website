import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const INDUSTRIES = [
  "Pharmaceuticals",
  "Nutraceuticals",
  "Specialty Chemicals",
  "Cosmetics & Personal Care",
  "Food & Beverage",
  "Medical Devices",
  "Agrochemicals",
  "Industrial Process Manufacturing",
];

const LOOP = [...INDUSTRIES, ...INDUSTRIES];

export function Industries() {
  return (
    <section className="border-y border-line bg-mist/50 py-10">
      <Container>
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-400">
            Built for regulated, process-driven manufacturing
          </p>
        </Reveal>
      </Container>

      <div className="mask-fade-x mt-6 overflow-hidden">
        <div className="animate-marquee flex w-max items-center gap-3 [animation-play-state:running] hover:[animation-play-state:paused]">
          {LOOP.map((industry, i) => (
            <span
              key={`${industry}-${i}`}
              className="shrink-0 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink-500"
            >
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
