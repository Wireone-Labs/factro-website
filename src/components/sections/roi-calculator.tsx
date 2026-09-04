"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
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

const ITEMS_BY_ID = new Map(
  ROI_CATEGORIES.flatMap((category) =>
    category.items.map((item) => [
      `${category.id}:${item.text}`,
      { minutes: item.minutes, interests: item.interests },
    ]),
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
    (total, id) => total + (ITEMS_BY_ID.get(id)?.minutes ?? 0),
    0,
  );

  const interests = Array.from(
    new Set(Array.from(checked).flatMap((id) => ITEMS_BY_ID.get(id)?.interests ?? [])),
  );
  const demoHref = interests.length
    ? `${BOOK_DEMO_HREF}?interests=${encodeURIComponent(interests.join(","))}`
    : BOOK_DEMO_HREF;

  return (
    <section className="pt-16 pb-8 sm:pt-20 sm:pb-10">
      <Container>
        <SectionHeading
          eyebrow="The force multiplier"
          title="Every hour this frees up is an hour spent on work only a person can do"
          description="Factro doesn't replace your team, it removes the busywork underneath them. Tick what already eats your week — we'll show you the hours it's quietly costing, hours your best people could spend on judgment calls instead of paperwork."
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
      </Container>

      <AnimatePresence>
        {checked.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40"
          >
            <Container className="pb-3 sm:pb-4">
              <div className="flex flex-col items-center gap-2.5 rounded-2xl bg-ink-950 px-4 py-3 text-center shadow-[0_20px_50px_-16px_rgba(15,14,23,0.45)] sm:flex-row sm:justify-between sm:gap-4 sm:px-5 sm:py-3 sm:text-left">
                <div className="flex items-center justify-center gap-2.5 text-white sm:justify-start">
                  <Clock className="h-4 w-4 shrink-0 text-brand-300" />
                  <span className="text-xs font-medium text-ink-300">
                    Your estimate:
                  </span>
                  <motion.span
                    key={minutes}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-lg font-semibold tracking-tight text-white"
                  >
                    {formatHours(minutes)}
                  </motion.span>
                  <span className="text-xs text-ink-300">/ week, per person</span>
                </div>
                <Button
                  href={demoHref}
                  variant="dark"
                  size="md"
                  className="group h-9 shrink-0 px-4 text-sm"
                  event="book_demo_click"
                  eventParams={{ location: "roi_calculator" }}
                >
                  See how we get this back
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
