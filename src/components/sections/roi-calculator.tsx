"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ROI_CATEGORIES } from "@/data/roi-checklist";
import { BOOK_DEMO_HREF } from "@/data/nav";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

function formatHours(minutes: number) {
  if (minutes === 0) return "0 hrs";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} hr${hours > 1 ? "s" : ""}`;
  return `${hours} hr${hours > 1 ? "s" : ""} ${mins} min`;
}

const MINUTES_BY_ID = new Map(
  ROI_CATEGORIES.flatMap((category) =>
    category.items.map((item) => [`${category.id}:${item.text}`, item.minutes]),
  ),
);

export function RoiCalculator() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    if (checked.size === 0) trackEvent("roi_calculator_start");
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const minutes = Array.from(checked).reduce(
    (total, id) => total + (MINUTES_BY_ID.get(id) ?? 0),
    0,
  );

  return (
    <section className="py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="The problem"
          title="Most plants do not have a compliance problem. They have an observability problem."
          description="Paper tells you what happened, never what is happening. Tick what you recognise — we'll estimate what it's costing you."
        />

        <RevealGroup
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {ROI_CATEGORIES.map((category) => (
            <RevealItem key={category.id}>
              <div className="h-full rounded-2xl border border-line bg-white p-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  {category.label}
                </h3>
                <div className="mt-2.5 flex flex-col gap-1.5">
                  {category.items.map((item) => {
                    const id = `${category.id}:${item.text}`;
                    const active = checked.has(id);
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => toggle(id)}
                        aria-pressed={active}
                        className={cn(
                          "flex items-start gap-2.5 rounded-lg border px-2.5 py-2 text-left text-xs leading-snug transition-colors",
                          active
                            ? "border-brand-300 bg-brand-50/60 text-ink-900"
                            : "border-line bg-white text-ink-600 hover:border-ink-300",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-md border transition-colors",
                            active
                              ? "border-brand-500 bg-brand-500 text-white"
                              : "border-ink-200 bg-white",
                          )}
                        >
                          {active && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                        </span>
                        {item.text}
                      </button>
                    );
                  })}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1} className="mt-5">
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-ink-950 px-6 py-6 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <div className="flex items-center justify-center gap-3 text-white sm:justify-start">
                <Clock className="h-5 w-5 text-brand-300" />
                <span className="text-sm font-medium text-ink-300">
                  Your estimate:
                </span>
                <motion.span
                  key={minutes}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-semibold tracking-tight text-white"
                >
                  {formatHours(minutes)}
                </motion.span>
                <span className="text-sm text-ink-300">/ week, per person</span>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-ink-400">
                Across 30 to 60 people, that&apos;s a person-year every week.
                An estimate, not a measurement — bring your own numbers to
                the demo.
              </p>
            </div>
            <Button
              href={BOOK_DEMO_HREF}
              variant="dark"
              size="lg"
              className="group shrink-0"
              event="book_demo_click"
              eventParams={{ location: "roi_calculator" }}
            >
              See how we get this back
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
