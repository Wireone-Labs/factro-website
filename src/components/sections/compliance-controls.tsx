"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MAPPED_STANDARDS, COMPLIANCE_CONTROLS } from "@/data/compliance";
import { cn } from "@/lib/utils";

export function ComplianceControlsList() {
  const [activeStandard, setActiveStandard] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveStandard(null)}
          aria-pressed={activeStandard === null}
          className={cn(
            "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
            activeStandard === null
              ? "border-brand-500 bg-brand-500 text-white"
              : "border-line bg-white text-ink-600 hover:border-brand-300",
          )}
        >
          All standards
        </button>
        {MAPPED_STANDARDS.map((standard) => {
          const isActive = activeStandard === standard.name;
          return (
            <button
              key={standard.name}
              type="button"
              onClick={() => setActiveStandard(isActive ? null : standard.name)}
              aria-pressed={isActive}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-brand-500 bg-brand-500 text-white"
                  : "border-line bg-white text-ink-600 hover:border-brand-300",
              )}
            >
              {standard.name}
              {standard.region && (
                <span className={isActive ? "text-white/70" : "text-ink-400"}>
                  {" "}
                  · {standard.region}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <RevealGroup className="mt-8 flex flex-col gap-2" stagger={0.02}>
        {COMPLIANCE_CONTROLS.map((control) => {
          const matches = !activeStandard || control.standards.includes(activeStandard);
          return (
            <RevealItem
              key={control.text}
              className={cn(
                "flex items-start gap-3 rounded-xl border px-4 py-3 transition-colors duration-200",
                activeStandard && !matches
                  ? "border-line bg-white opacity-40"
                  : activeStandard && matches
                    ? "border-brand-300 bg-brand-50/60"
                    : "border-line bg-white",
              )}
            >
              <CheckCircle2
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0",
                  activeStandard && !matches ? "text-ink-300" : "text-brand-500",
                )}
              />
              <span className="text-sm leading-relaxed text-ink-600">
                {control.text}
              </span>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </div>
  );
}
