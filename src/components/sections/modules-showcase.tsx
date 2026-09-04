"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CORE_MODULES } from "@/data/modules";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ModulesShowcase() {
  const [activeId, setActiveId] = useState(CORE_MODULES[0].id);
  const active = CORE_MODULES.find((mod) => mod.id === activeId) ?? CORE_MODULES[0];

  useEffect(() => {
    const syncFromHash = () => {
      const fromHash = window.location.hash.replace("#", "");
      if (CORE_MODULES.some((mod) => mod.id === fromHash)) {
        setActiveId(fromHash);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            document.getElementById("modules")?.scrollIntoView({ block: "start" });
          });
        });
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <section id="modules" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="The ten modules"
          title="Everything a regulated plant runs on"
          description="Pick a module for the full breakdown — every workspace, every check, every record it keeps."
        />

        <Reveal delay={0.05} className="mt-14">
          <div
            role="tablist"
            aria-label="Modules"
            className="flex flex-wrap justify-center gap-2 border-b border-line pb-6"
          >
            {CORE_MODULES.map((mod) => {
              const isActive = mod.id === activeId;
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(mod.id)}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-line bg-white text-ink-600 hover:border-brand-300 hover:text-ink-900",
                  )}
                >
                  <mod.icon className="h-4 w-4" strokeWidth={1.75} />
                  {mod.tag}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
              role="tabpanel"
              className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8"
            >
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {active.tag}
                </span>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink-900">
                  {active.title}
                </h3>
                <div className="mt-3 flex flex-col gap-3">
                  {active.narrative.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-ink-500">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Submodules
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {active.submodules.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full border border-line bg-mist/60 px-3 py-1 text-xs font-medium text-ink-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                  Features
                </p>
                <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                  {active.capabilities.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" />
                      <span className="text-sm leading-relaxed text-ink-600">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
                {active.categories.map((category) => (
                  <div
                    key={category.heading}
                    className="flex flex-col gap-1.5 rounded-xl border border-line bg-mist/40 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                      {category.heading}
                    </p>
                    <p className="text-xs leading-relaxed text-ink-600">
                      {category.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  );
}
