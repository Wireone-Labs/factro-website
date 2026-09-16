import { CalendarClock, GitBranch, Workflow, Activity, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { IconTile } from "@/components/ui/icon-tile";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";

const DAY_ONE = [
  {
    icon: CalendarClock,
    title: "Production Planning",
    description:
      "Plan against real capacity rather than a spreadsheet's idea of it. The planner checks capacity and detects collisions before an order is released, synchronises the bill of materials, and tells you what a schedule change costs you downstream. On Time In Full becomes a number you manage rather than one you explain afterwards.",
  },
  {
    icon: GitBranch,
    title: "Genealogy",
    description:
      "Forward and backward trace from raw material lot to dispatched pack, held as a live link rather than a report someone assembles. Ask which batches used a lot and get the answer in seconds. When a recall question arrives, the chain is already there, in both directions, across every stage it passed through.",
  },
  {
    icon: Workflow,
    title: "Work Management",
    description:
      "One task system across every job, reminder, schedule and deviation. The work comes to the operator with an owner and a clock attached, so nobody chases a status or hunts a sample. Every handover across departments is a tracked ticket with an SLA, and the conversation around it stays part of the record.",
  },
  {
    icon: Activity,
    title: "Realtime Visibility",
    description:
      "Every batch, stage and open handover on one screen, live. Yield, cycle time, deviations and overdue actions as one number each rather than four reports. Bottlenecks stop being something you discover at the end of the month and become something you watch while there is still time to move.",
  },
];

export function DayOne() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="What you get on day one"
          title="Built in, not bolted on"
          description="Seven regulated industries · 96 control points · 10 modules on one database · 30 days to go-live, committed."
        />

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2"
          stagger={0.06}
        >
          {DAY_ONE.map((item) => (
            <RevealItem key={item.title}>
              <div className="h-full rounded-2xl border border-line bg-white p-6 sm:p-7">
                <IconTile icon={item.icon} />
                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
          <RevealItem className="sm:col-span-2">
            <div className="h-full rounded-2xl border border-brand-200 bg-brand-50/60 p-6 sm:p-7">
              <IconTile icon={ShieldCheck} className="border-brand-200 bg-white" />
              <h3 className="mt-4 text-base font-semibold text-ink-900">
                AI Compliance Checker
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-600">
                Runs throughout the day, logging and processing every event
                on the platform against the compliance you configured. Not a
                nightly report and not a reviewer&apos;s checklist. A drift
                is caught while the batch is still open, against the rule
                that was in force at that moment, and the finding carries
                the records it came from so your QA head can check it
                rather than trust it.
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </Container>
    </section>
  );
}
