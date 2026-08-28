"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ModulePanel } from "@/components/sections/module-panel";
import { ScrollRail } from "@/components/ui/scroll-rail";
import { PLATFORM_SECTIONS } from "@/data/modules";
import { cn } from "@/lib/utils";

const FLAT_MODULE_IDS = PLATFORM_SECTIONS.flatMap((section) =>
  section.modules.map((module) => module.id),
);

export function ModulesShowcase() {
  return (
    <section id="modules" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Core modules"
          title="Everything a regulated plant runs on"
          description="Nine connected modules cover the full path from raw material to released batch — each one built around how process manufacturers actually work."
        />

        <ScrollRail className="mt-20 flex flex-col gap-20 sm:mt-24 sm:gap-28 lg:pl-2">
          {PLATFORM_SECTIONS.map((section) => (
            <div
              key={section.id}
              id={section.id}
              className="scroll-mt-28 flex flex-col gap-20 sm:gap-28"
            >
              {section.modules.map((module) => {
                const reversed = FLAT_MODULE_IDS.indexOf(module.id) % 2 === 1;
                return (
                  <div
                    key={module.id}
                    className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: reversed ? 24 : -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(reversed && "lg:order-2")}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                        {module.tag}
                      </span>
                      <h3 className="text-balance mt-3 text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                        {module.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-ink-500">
                        {module.description}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: reversed ? -24 : 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{
                        duration: 0.6,
                        delay: 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(reversed && "lg:order-1")}
                    >
                      <ModulePanel module={module} />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          ))}
        </ScrollRail>
      </Container>
    </section>
  );
}
