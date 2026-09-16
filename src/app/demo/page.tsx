import type { Metadata } from "next";
import { Phone, ShieldCheck, Sparkles, Bot, GitBranch } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { DemoForm } from "@/components/forms/demo-form";
import { DemoBackground } from "@/components/sections/demo-background";
import { DemoChecklist } from "@/components/sections/demo-checklist";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { SALES_PHONE, SALES_PHONE_HREF } from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Book a Demo — Regulated Manufacturing ERP",
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

const GO_LIVE_STEPS = [
  { when: "Week 1", phase: "Process-led demo and discovery", detail: "Walkthrough of your actual workflows. No slides" },
  { when: "Week 2", phase: "Fit assessment and scoping", detail: "Your processes mapped to modules. You leave with a confirmed go-live date" },
  { when: "Weeks 3 and 4", phase: "Configuration, migration and training", detail: "Master data migrated. Team trained role by role" },
  { when: "Day 30", phase: "Go-live", detail: "One system, full operation, every module connected" },
  { when: "Weeks 5 to 8", phase: "Hypercare", detail: "Daily monitoring and a dedicated line for blockers" },
  { when: "Always", phase: "Permanent support", detail: "A dedicated account manager and a direct line to a team that knows your plant" },
];

const AI_FEATURES = [
  {
    icon: ShieldCheck,
    title: "Compliance Checker",
    description:
      "Runs throughout the day, processing every event against the compliance you configured, and flags a drift while the batch is still open rather than after a reviewer finds it.",
  },
  {
    icon: GitBranch,
    title: "Deviation Intelligence",
    description:
      "Clusters anomalies and deviations by product, line, stage and shift, so the same root cause stops reappearing under a new number every quarter.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Ask in plain language and pull targeted answers across operations, with forward and backward genealogy from raw material lot to dispatched pack, and a material shortage alert before the shortage forms.",
  },
];

export default function DemoPage() {
  return (
    <>
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
              workflow, we run it in Factro — in person at your facility or
              over a call, whichever works for you. No commitment to see it,
              and a free trial with no cost to try it on your own data.
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
              <p className="text-xl font-bold tracking-tight text-brand-700 sm:text-2xl">
                Two months free if we&apos;re late.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                Full go-live within thirty days of your complete dataset, or
                two more months on us — no questions asked.
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

      <section className="mt-20 py-16 sm:mt-28 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Force multiplier"
            title="Ask AI in English, not SQL or Excel"
            description="Deviations cluster themselves and anomalies surface before review. The answer arrives as a sentence, not as a spreadsheet someone spent a day assembling. Every answer carries the records it came from, so your QA head can check it rather than trust it. Nothing leaves your tenant to make that happen."
          />
          <RevealGroup
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3"
            stagger={0.08}
          >
            {AI_FEATURES.map((feature) => (
              <RevealItem key={feature.title}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <IconTile icon={feature.icon} size="md" />
                  <h3 className="mt-4 text-sm font-semibold text-ink-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {feature.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-relaxed text-ink-400">
            Intelligence features are in beta for Q4 2026. A private model
            runs inside your deployment. No prompt leaves your tenant, and
            nothing trains a model.
          </p>
        </Container>
      </section>

      <DemoChecklist />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Thirty days"
            title="From your data to a plant running on Factro"
            description="Six steps, no surprises. The clock starts when we have your complete dataset."
          />

          <div className="mx-auto mt-10 max-w-3xl overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                    When
                  </th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                    Phase
                  </th>
                  <th className="py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                    What happens
                  </th>
                </tr>
              </thead>
              <tbody>
                {GO_LIVE_STEPS.map((step) => (
                  <tr key={step.when} className="border-b border-line/60">
                    <td className="py-3 pr-4 align-top text-sm font-semibold whitespace-nowrap text-ink-900">
                      {step.when}
                    </td>
                    <td className="py-3 pr-4 align-top text-sm font-medium whitespace-nowrap text-ink-700">
                      {step.phase}
                    </td>
                    <td className="py-3 align-top text-sm leading-relaxed text-ink-600">
                      {step.detail}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-5 text-center">
              <p className="text-lg font-bold tracking-tight text-brand-700">
                Our commitment: two months free if we are late.
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                We commit to full go-live within thirty days of receiving
                your complete dataset. If we do not make it, you keep
                running on us for two further months at no cost, no
                questions asked. One condition: the clock starts when the
                dataset is complete.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
