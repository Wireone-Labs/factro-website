"use client";

import { useState } from "react";
import { Check, Calculator } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ROI_CATEGORIES, MINUTES_PER_ITEM } from "@/data/roi-checklist";
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

export function DemoChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    if (checked.size === 0) trackEvent("demo_checklist_start");
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

  const minutes = checked.size * MINUTES_PER_ITEM;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Before you come"
          title="Tick what you recognise"
          description="Each item checked adds roughly 24 minutes a week, per person. We'll do this sum with your own numbers when we meet."
        />

        <RevealGroup
          className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
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

        <RevealItem>
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-4 text-center">
            <Calculator className="h-4 w-4 shrink-0 text-brand-600" />
            <p className="text-sm text-ink-700">
              <span className="font-semibold">Your estimate:</span>{" "}
              <span className="font-semibold text-brand-700">
                {formatHours(minutes)}
              </span>{" "}
              / week, per person
            </p>
          </div>
        </RevealItem>
        <p className="mx-auto mt-3 max-w-md text-center text-xs leading-relaxed text-ink-400">
          Across 30 to 60 people in a mid-sized plant, that&apos;s a
          person-year every week.
        </p>
      </Container>
    </section>
  );
}
