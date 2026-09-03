import type { Metadata } from "next";
import { Phone, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { DemoForm } from "@/components/forms/demo-form";
import { DemoBackground } from "@/components/sections/demo-background";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { SALES_PHONE, SALES_PHONE_HREF } from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Demo",
  description:
    "Bring a real batch and a real deviation. Thirty minutes, no slides — we run it in Factro on your own data.",
  path: "/demo",
});

const TIMELINE = [
  { label: "Week 1", description: "Process-led demo & discovery, no slides." },
  {
    label: "Week 2",
    description: "Fit assessment & scoping — you leave with a go-live date.",
  },
  { label: "Weeks 3–4", description: "Configuration, migration & training." },
  { label: "Day 30", description: "Go-live. Every module connected." },
];

export default function DemoPage() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <DemoBackground />

      <Container className="relative">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
              <Sparkles className="h-3.5 w-3.5" />
              Book a demo
            </span>

            <h1 className="text-balance mt-5 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Bring a{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="relative z-10 bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                  real batch
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
              and a real deviation
            </h1>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-500">
              Thirty minutes. No slides, no scripted scenarios. You pick the
              workflow, we run it in Factro — at your facility, on your data,
              with the engineers who built the system.
            </p>

            <div className="mt-8 max-w-md">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                What the next 30 days look like
              </p>
              <div className="mt-4 flex flex-col gap-3.5 border-l-2 border-line pl-5">
                {TIMELINE.map((step) => (
                  <div key={step.label} className="relative">
                    <span className="absolute -left-[1.52rem] top-1 h-2 w-2 rounded-full bg-brand-400" />
                    <p className="text-sm leading-relaxed text-ink-600">
                      <span className="font-semibold text-ink-900">
                        {step.label}
                      </span>
                      , {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 max-w-md rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4">
              <p className="text-sm leading-relaxed text-ink-700">
                <span className="font-semibold text-brand-700">
                  Two months free if we&apos;re late.
                </span>{" "}
                Full go-live within thirty days of your complete dataset, or two
                more months on us — no questions asked.
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-500" />
                Currently in pilot in India
              </span>
              <TrackedLink
                href={SALES_PHONE_HREF}
                event="phone_click"
                eventParams={{ location: "demo_page" }}
                className="flex items-center gap-2 font-medium text-ink-700 hover:text-brand-600"
              >
                <Phone className="h-3.5 w-3.5" />
                {SALES_PHONE}
              </TrackedLink>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-200/50 via-transparent to-brand-100/40 opacity-70 blur-2xl"
              />
              <DemoForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
