"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { IconTile } from "@/components/ui/icon-tile";
import { Reveal } from "@/components/ui/reveal";
import { CORE_MODULES } from "@/data/modules";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ModulesGrid() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = CORE_MODULES.find((mod) => mod.id === selectedId) ?? null;
  const visibleModules = selected
    ? CORE_MODULES.filter((mod) => mod.id === selectedId)
    : CORE_MODULES;

  return (
    <Reveal delay={0.05} className="mt-14">
      <motion.div
        layout
        transition={{ duration: 0.4, ease: EASE }}
        className={cn(
          "grid gap-3",
          selected && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-start",
        )}
      >
        <motion.div
          layout
          transition={{ duration: 0.4, ease: EASE }}
          className={cn(
            "grid grid-cols-2 gap-3 sm:grid-cols-3",
            selected ? "lg:grid-cols-1" : "lg:grid-cols-5",
          )}
        >
          <AnimatePresence mode="popLayout">
            {visibleModules.map((mod) => {
              const isSelected = mod.id === selectedId;
              return (
                <motion.button
                  key={mod.id}
                  layout
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.88 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  type="button"
                  onClick={() => setSelectedId(isSelected ? null : mod.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "group flex h-full w-full cursor-pointer select-none flex-col items-center gap-3 rounded-2xl border p-5 text-center",
                    isSelected
                      ? "border-brand-500 bg-brand-500 shadow-[0_16px_36px_-18px_rgba(15,14,23,0.35)]"
                      : "border-line bg-white transition-all duration-200 hover:-translate-y-1 hover:border-brand-500 hover:bg-brand-500 hover:shadow-[0_16px_36px_-18px_rgba(15,14,23,0.15)]",
                  )}
                >
                  <IconTile
                    icon={mod.icon}
                    size="sm"
                    className={cn(
                      "transition-colors duration-200",
                      isSelected
                        ? "border-white/30 bg-white/15 text-white"
                        : "group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white",
                    )}
                  />
                  <div>
                    <h3
                      className={cn(
                        "text-sm font-semibold transition-colors duration-200",
                        isSelected ? "text-white" : "text-ink-900 group-hover:text-white",
                      )}
                    >
                      {mod.tag}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 text-xs leading-snug transition-colors duration-200",
                        isSelected ? "text-white/80" : "text-ink-500 group-hover:text-white/80",
                      )}
                    >
                      {mod.title}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="popLayout">
          {selected && (
            <motion.div
              layout
              initial={{ opacity: 0, x: 24, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative rounded-2xl border border-line bg-white p-6"
            >
              <motion.button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label="Close preview"
                whileTap={{ scale: 0.9 }}
                className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-line text-ink-400 transition-colors hover:border-ink-300 hover:text-ink-700"
              >
                <X className="h-4 w-4" />
              </motion.button>
              <motion.h3
                key={`${selected.id}-title`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                className="pr-10 text-lg font-semibold tracking-tight text-ink-900"
              >
                {selected.title}
              </motion.h3>
              <motion.p
                key={`${selected.id}-desc`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.08 }}
                className="mt-2 text-sm leading-relaxed text-ink-500"
              >
                {selected.description}
              </motion.p>
              <div
                className={cn(
                  "mt-5 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-line pt-5",
                  selected.submodules.length > 0 && selected.features.length > 0 && "sm:grid-cols-2",
                )}
              >
                {selected.submodules.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                      Submodules
                    </p>
                    {selected.submodules.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.1 + i * 0.03 }}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        <span className="text-sm leading-snug text-ink-600">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
                {selected.features.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                      Features
                    </p>
                    {selected.features.map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: 0.1 + i * 0.03 }}
                        className="flex items-start gap-2"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                        <span className="text-sm leading-snug text-ink-600">
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  );
}
