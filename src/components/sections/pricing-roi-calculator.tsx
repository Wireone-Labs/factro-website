"use client";

import { useMemo, useState } from "react";
import { Users, Wallet, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const HOURS_SAVED_PER_WEEK_PER_PERSON = 8;

const fieldClasses =
  "w-full rounded-xl border border-line bg-ink-50/60 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100";

type Currency = "INR" | "USD" | "EUR";

const CURRENCY_CONFIG: Record<
  Currency,
  {
    symbol: string;
    defaultCost: number;
    min: number;
    max: number;
    step: number;
    formatter: Intl.NumberFormat;
  }
> = {
  INR: {
    symbol: "₹",
    // Representative fully-loaded blended cost for Indian manufacturing plant staff.
    defaultCost: 300,
    min: 50,
    max: 2000,
    step: 10,
    formatter: new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }),
  },
  USD: {
    symbol: "$",
    defaultCost: 4,
    min: 1,
    max: 30,
    step: 0.5,
    formatter: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }),
  },
  EUR: {
    symbol: "€",
    defaultCost: 3.5,
    min: 1,
    max: 30,
    step: 0.5,
    formatter: new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }),
  },
};

export function PricingRoiCalculator() {
  const [currency, setCurrency] = useState<Currency>("INR");
  const [people, setPeople] = useState(40);
  const [hourlyCost, setHourlyCost] = useState(CURRENCY_CONFIG.INR.defaultCost);

  const config = CURRENCY_CONFIG[currency];

  const switchCurrency = (next: Currency) => {
    setCurrency(next);
    setHourlyCost(CURRENCY_CONFIG[next].defaultCost);
  };

  const { hoursPerWeek, perWeek, perMonth, perYear } = useMemo(() => {
    const safePeople = Math.max(0, people || 0);
    const safeCost = Math.max(0, hourlyCost || 0);
    const hours = safePeople * HOURS_SAVED_PER_WEEK_PER_PERSON;
    const week = hours * safeCost;
    return {
      hoursPerWeek: hours,
      perWeek: week,
      perMonth: week * 4.33,
      perYear: week * 52,
    };
  }, [people, hourlyCost]);

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="ROI calculator"
          title="What a day back every week is worth"
          description="Our own field data lands at roughly a working day saved per person, per week. Use your own numbers below — this should hold up to your own math, not just ours."
        />

        <Reveal delay={0.05} className="mx-auto mt-12 max-w-3xl">
          <div className="grid grid-cols-1 gap-8 rounded-3xl border border-line bg-white p-6 sm:p-8 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="roi-people"
                  className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-700"
                >
                  <Users className="h-3.5 w-3.5 text-ink-400" />
                  People whose time this touches
                </label>
                <input
                  id="roi-people"
                  type="number"
                  min={1}
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className={fieldClasses}
                />
                <input
                  type="range"
                  min={1}
                  max={300}
                  value={people}
                  onChange={(e) => setPeople(Number(e.target.value))}
                  className="mt-3 w-full accent-brand-500"
                  aria-label="People whose time this touches"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="roi-cost"
                    className="flex items-center gap-1.5 text-xs font-medium text-ink-700"
                  >
                    <Wallet className="h-3.5 w-3.5 text-ink-400" />
                    Average fully-loaded cost per hour
                  </label>
                  <div className="flex gap-1 rounded-lg border border-line bg-mist/40 p-0.5">
                    {(Object.keys(CURRENCY_CONFIG) as Currency[]).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => switchCurrency(code)}
                        aria-pressed={currency === code}
                        className={cn(
                          "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
                          currency === code
                            ? "bg-white text-brand-600 shadow-sm"
                            : "text-ink-400 hover:text-ink-700",
                        )}
                      >
                        {CURRENCY_CONFIG[code].symbol} {code}
                      </button>
                    ))}
                  </div>
                </div>
                <input
                  id="roi-cost"
                  type="number"
                  min={0}
                  step={config.step}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className={fieldClasses}
                />
                <input
                  type="range"
                  min={config.min}
                  max={config.max}
                  step={config.step}
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="mt-3 w-full accent-brand-500"
                  aria-label="Average fully-loaded cost per hour"
                />
              </div>

              <p className="text-xs leading-relaxed text-ink-400">
                Defaulted to a representative blended cost for Indian
                manufacturing plant staff. Based on ~
                {HOURS_SAVED_PER_WEEK_PER_PERSON} hours saved per person, per
                week — our conservative field estimate, not a guarantee.
                Bring your own numbers to the demo and we&apos;ll do this sum
                with them.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 rounded-2xl bg-mist/60 p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-500">
                <TrendingUp className="h-3.5 w-3.5" />
                Estimated savings
              </div>
              <div className="flex items-baseline justify-between border-b border-line/70 pb-3">
                <span className="text-sm text-ink-500">Hours back / week</span>
                <span className="text-lg font-semibold text-ink-900">
                  {hoursPerWeek.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-line/70 pb-3">
                <span className="text-sm text-ink-500">Per week</span>
                <span className="text-lg font-semibold text-ink-900">
                  {config.formatter.format(perWeek)}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-b border-line/70 pb-3">
                <span className="text-sm text-ink-500">Per month</span>
                <span className="text-lg font-semibold text-ink-900">
                  {config.formatter.format(perMonth)}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium text-ink-700">
                  Per year
                </span>
                <span className="text-2xl font-semibold text-brand-600">
                  {config.formatter.format(perYear)}
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
