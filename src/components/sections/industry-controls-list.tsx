"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { ComplianceMatrixRow, IndustryControl, MappedStandard } from "@/data/industries";
import { cn } from "@/lib/utils";

interface IndustryControlsListProps {
  controls: IndustryControl[];
  matrix: ComplianceMatrixRow[];
  matrixStandards: string[];
  /** Only standards with a `matrixName` (real matrix data behind them) —
   *  pass the result of `matrixBackedStandards()`. */
  mappedStandards: MappedStandard[];
}

export function IndustryControlsList({
  controls,
  matrix,
  matrixStandards,
  mappedStandards,
}: IndustryControlsListProps) {
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
        {mappedStandards.map((standard) => {
          const isActive = activeStandard === standard.matrixName;
          return (
            <button
              key={standard.name}
              type="button"
              onClick={() => setActiveStandard(isActive ? null : standard.matrixName!)}
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
        {controls.map((control) => {
          const row = matrix.find((r) => r.area === control.area);
          const standards = row
            ? matrixStandards.filter((_, i) => row.marks[i])
            : [];
          const matches = !activeStandard || standards.includes(activeStandard);
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
