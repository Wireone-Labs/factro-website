import type { Metadata } from "next";
import { CheckCircle2, ShieldCheck, Sparkles, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DemoForm } from "@/components/forms/demo-form";
import { DemoBackground } from "@/components/sections/demo-background";
import { PLATFORM_STATS } from "@/data/stats";

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

export default function DemoPage() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      <DemoBackground />

      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
              <Sparkles className="h-3.5 w-3.5" />
              Book a demo
            </span>

            <h1 className="text-balance mt-6 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              See Factro run on{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                  your own
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 200 12"
                  className="absolute -bottom-1 left-0 h-3 w-full text-brand-200"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 9.5C40 3 120 2 198 8"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              production data
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-500">
              Tell us a bit about your operation and we&apos;ll set up a
              walkthrough with our team — no generic sales deck, just your
              modules and your workflows.
            </p>

            <RevealGroup className="mt-10 flex flex-col gap-4" stagger={0.06}>
              {EXPECTATIONS.map((item) => (
                <RevealItem key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-ink-600">
                    {item}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-11 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {PLATFORM_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold tracking-tight text-ink-900">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-ink-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </Reveal>

            <Reveal
              delay={0.2}
              className="relative mt-11 max-w-md overflow-hidden rounded-2xl border border-line bg-white/70 p-5 backdrop-blur-sm"
            >
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-700">
                &ldquo;We replaced four spreadsheets and a paper batch log
                with one connected system in under a month.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-medium text-ink-400">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
                GMP-ready manufacturing team, on Factro
              </div>
            </Reveal>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-200/50 via-transparent to-brand-100/40 opacity-70 blur-2xl"
              />
              <DemoForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
