"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PRICING_PLANS } from "@/data/pricing";
import { cn } from "@/lib/utils";

function BillingToggle({
  annual,
  onChange,
}: {
  annual: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="inline-flex items-center gap-3">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !annual ? "text-ink-900" : "text-ink-400",
        )}
      >
        Monthly
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={annual}
        onClick={() => onChange(!annual)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
          annual ? "bg-brand-500" : "bg-ink-200",
        )}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
          animate={{ x: annual ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
        />
      </button>
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          annual ? "text-ink-900" : "text-ink-400",
        )}
      >
        Annual <span className="text-brand-500">· save ~20%</span>
      </span>
    </div>
  );
}

export function PricingPlans() {
  const [annual, setAnnual] = useState(true);

  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <div className="flex justify-center">
          <BillingToggle annual={annual} onChange={setAnnual} />
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <RevealItem key={plan.id}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-8",
                  plan.recommended
                    ? "border-brand-300 bg-white shadow-[0_24px_60px_-24px_rgba(4,74,254,0.35)]"
                    : "border-line bg-white",
                )}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    Recommended
                  </span>
                )}

                <h3 className="text-lg font-semibold text-ink-900">{plan.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  {plan.tagline}
                </p>

                <div className="mt-6 min-h-16">
                  {plan.monthly !== null ? (
                    <div className="flex items-baseline gap-1.5">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={annual ? "annual" : "monthly"}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.18 }}
                          className="text-4xl font-semibold tracking-tight text-ink-900"
                        >
                          ${annual ? plan.annual : plan.monthly}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm text-ink-400">{plan.unit}</span>
                    </div>
                  ) : (
                    <span className="text-4xl font-semibold tracking-tight text-ink-900">
                      Custom
                    </span>
                  )}
                  {plan.monthly !== null && (
                    <p className="mt-1 text-xs text-ink-400">
                      {annual ? "Billed annually" : "Billed monthly"}
                    </p>
                  )}
                </div>

                <Button
                  href={plan.ctaHref}
                  variant={plan.recommended ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {plan.ctaLabel}
                </Button>

                <ul className="mt-8 flex flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-ink-600"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
