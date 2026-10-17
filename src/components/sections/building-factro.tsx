import { Database, Factory, FlaskConical, ShieldEllipsis } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SouthIndiaMap } from "@/components/sections/south-india-map";

const PROCESS_STEPS = [
  {
    title: "Study the shopfloor",
    description: "We studied the manufacturer's processes and documents alongside the people doing the work.",
  },
  {
    title: "Define the problems. Build the product.",
    description: "We turned those observations into clear problem statements, then built them into repeatable product workflows.",
  },
  {
    title: "Pilot, learn and refine",
    description: "We took the product back to the shopfloor for a pilot, using plant feedback to shape each major release.",
  },
];

const DEVELOPMENT_PROOF = [
  {
    value: "3 years",
    label: "Research, development & pilot",
    icon: FlaskConical,
  },
  {
    value: "10,000+",
    label: "Synthetic workflow records",
    icon: Database,
  },
  {
    value: "Every 30 days",
    label: "Penetration testing",
    icon: ShieldEllipsis,
  },
];

export function BuildingFactro() {
  return (
    <section className="py-10 sm:py-12" aria-labelledby="building-factro-title">
      <Container>
        <div className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full max-w-lg select-none opacity-15 [&>svg]:h-full">
            <SouthIndiaMap />
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              <h2 id="building-factro-title" className="text-xs font-semibold uppercase tracking-wide text-brand-600">The Factro story</h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-500">
                <p>Factro began in 2024 as a purpose-built solution for one pharmaceutical manufacturer in Puducherry (PY). Working with an actual plant gave us a starting point grounded in real processes, real constraints and the people responsible for the work.</p>
                <p>We adopted an upgraded waterfall model: structured development, with every major release validated with the plant. What we learned fed into the next release, keeping the product close to the operation as it grew.</p>
                <p>Along the way, we gained a deep understanding of the shopfloor’s tribal knowledge: the practical know-how that rarely makes it into a specification. That learning helped a solution for one manufacturer evolve into a full-scale regulated manufacturing platform, connecting business, production and quality.</p>
              </div>
            </div>
            <div className="border-t border-brand-100 pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-brand-600">Our process</h2>
              <ol className="mt-6 space-y-7">
                {PROCESS_STEPS.map((step, index) => (
                  <li key={step.title}>
                    <Reveal className="flex gap-4">
                      <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-xs font-semibold text-brand-600">{index + 1}</span>
                      <div>
                        <h3 className="text-base font-semibold text-ink-900">{step.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <Reveal className="mt-12">
          <div className="grid gap-8 rounded-3xl border border-brand-100 bg-mist p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-600"><Factory size={18} aria-hidden="true" />Always-on validation</div>
              <p className="mt-5 text-4xl font-semibold tracking-tight text-ink-900">5 simulated factories</p>
              <h3 className="mt-3 text-lg font-medium text-brand-600">500 simulated users · 24×7</h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">Running connected workflows continuously to validate platform performance.</p>
            </div>
            <div className="divide-y divide-brand-100 border-t border-brand-100 lg:border-t-0 lg:border-l lg:pl-10">
              {DEVELOPMENT_PROOF.map((proof) => (
                <div key={proof.label} className="flex items-center gap-4 py-5 first:lg:pt-0 last:pb-0">
                  <span className="rounded-xl bg-white p-3 text-brand-600"><proof.icon size={21} aria-hidden="true" /></span>
                  <div>
                    <p className="text-xl font-semibold tracking-tight text-ink-900">{proof.value}</p>
                    <h3 className="mt-1 text-sm text-ink-500">{proof.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
