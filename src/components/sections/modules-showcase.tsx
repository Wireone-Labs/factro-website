"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CORE_MODULES } from "@/data/modules";
import { SYSTEM_CAPABILITIES, SYSTEM_GROUPS } from "@/data/system-capabilities";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function resolveRequestedTab(searchParamsTab: string | null, allowedIds: string[]): string | null {
  if (searchParamsTab && allowedIds.includes(searchParamsTab)) {
    return searchParamsTab;
  }
  // Fall back to the old #hash links (footer, external, cached pages).
  if (typeof window !== "undefined") {
    const fromHash = window.location.hash.replace("#", "");
    if (allowedIds.includes(fromHash)) {
      return fromHash;
    }
  }
  return null;
}

export function ModulesShowcase({ groupName }: { groupName?: string }) {
  const groups = SYSTEM_GROUPS.filter(group => !groupName || group.name === groupName);
  const orderedModules = groups.flatMap(group => group.modules);
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [activeId, setActiveId] = useState(orderedModules[0]);
  const active = CORE_MODULES.find((mod) => mod.id === activeId) ?? CORE_MODULES[0];
  const lastAppliedTab = useRef<string | null>(null);
  const activeGroup = SYSTEM_GROUPS.find(group => group.modules.includes(activeId))!;

  useEffect(() => {
    const allowedIds = SYSTEM_GROUPS.filter(group => !groupName || group.name === groupName).flatMap(group => group.modules);
    const resolved = resolveRequestedTab(requestedTab, allowedIds);
    if (!resolved || resolved === lastAppliedTab.current) return;
    lastAppliedTab.current = resolved;
    setActiveId(resolved);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById("modules")?.scrollIntoView({ block: "start" });
      });
    });
  }, [requestedTab, groupName]);

  return (
    <section id="modules" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow={groupName === "Shared foundation" ? "Used by every solution" : `${groupName ?? "Connected"} modules`}
          title={groupName === "Shared foundation" ? "One source for documents and master data." : "Go from the operating picture to the detail."}
        />

        <Reveal delay={0.05} className="mt-14">
          <div
            role="tablist"
            aria-label="Modules"
            className={cn("grid gap-4 border-b border-line pb-6", groups.length > 1 && "sm:grid-cols-2 lg:grid-cols-4")}
          >
            {groups.map(group => <div key={group.name} className="rounded-xl border border-line bg-mist/30 p-4"><p className="text-sm font-semibold text-ink-900">{group.name}</p><p className="mt-1 text-[11px] leading-relaxed text-ink-400">{group.description}</p><div className="mt-4 flex flex-wrap gap-2">{group.modules.map(id => {
              const mod = CORE_MODULES.find(item => item.id === id)!;
              const isActive = mod.id === activeId;
              return (
                <button
                  key={mod.id}
                  type="button"
                  role="tab"
                  id={`module-tab-${mod.id}`}
                  aria-controls={`module-panel-${mod.id}`}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(mod.id)}
                  onKeyDown={event => {
                    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
                    event.preventDefault();
                    const current = orderedModules.indexOf(mod.id);
                    const next = event.key === "Home" ? 0 : event.key === "End" ? orderedModules.length - 1 : (current + (event.key === "ArrowRight" ? 1 : -1) + orderedModules.length) % orderedModules.length;
                    setActiveId(orderedModules[next]);
                    document.getElementById(`module-tab-${orderedModules[next]}`)?.focus();
                  }}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium transition-colors duration-200",
                    isActive
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-line bg-white text-ink-600 hover:border-brand-300 hover:text-ink-900",
                  )}
                >
                  <mod.icon className="h-4 w-4" strokeWidth={1.75} />
                  {mod.tag}
                </button>
              );
            })}</div></div>)}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: EASE }}
              role="tabpanel"
              id={`module-panel-${active.id}`}
              aria-labelledby={`module-tab-${active.id}`}
              className="mt-8 rounded-2xl border border-line bg-white p-6 sm:p-8"
            >
              <div className="max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {activeGroup.name} / {active.tag}
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
                  Submodule capabilities
                </p>
                <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {SYSTEM_CAPABILITIES[active.id].map(group => <div key={group.title}><h4 className="text-sm font-semibold text-ink-800">{group.title}</h4><ul className="mt-3 space-y-2">{group.features.map(item => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-500" /><span className="text-xs leading-relaxed text-ink-600">{item}</span></li>)}</ul></div>)}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </Container>
    </section>
  );
}
