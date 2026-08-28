import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { DemoForm } from "@/components/forms/demo-form";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "See Factro on your own production data. Book a walkthrough with our team.",
};

const EXPECTATIONS = [
  "A 30-minute walkthrough mapped to your production and quality workflows",
  "A look at the exact modules that fit how your plant runs today",
  "Straight answers on pricing, rollout, and what onboarding looks like",
  "No pressure — just a clear picture of whether Factro is a fit",
];

export default function BookDemoPage() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[56rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />

      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
              Book a demo
            </span>
            <h1 className="text-balance mt-6 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
              See Factro run on your own production data
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
              Tell us a bit about your operation and we&apos;ll set up a
              walkthrough with our team — no generic sales deck, just your
              modules and your workflows.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              {EXPECTATIONS.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                  <span className="text-sm leading-relaxed text-ink-600">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="lg:sticky lg:top-24">
            <DemoForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
