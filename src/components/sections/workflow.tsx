"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { WORKFLOW_STEPS, type WorkflowStep } from "@/data/workflow";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

function WorkflowStepCard({
  step,
  index,
  total,
  progress,
}: {
  step: WorkflowStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = step.icon;
  const start = Math.max(0, (index - 0.4) / total);
  const mid = (index + 0.5) / total;
  const end = Math.min(1, (index + 1.4) / total);
  const glow = useTransform(progress, [start, mid, end], [0.15, 1, 0.15]);
  const iconScale = useTransform(glow, [0.15, 1], [0.94, 1.06]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-brand-400/30 hover:bg-white/[0.05] lg:flex-col lg:items-stretch lg:gap-0 lg:border-0 lg:bg-transparent lg:p-0 lg:hover:border-0 lg:hover:bg-transparent"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-2 right-4 text-6xl font-black text-white/[0.05] select-none lg:-top-6 lg:-left-1 lg:text-7xl"
      >
        {step.step}
      </span>

      <div className="relative z-10 shrink-0 lg:mb-6">
        <motion.span
          aria-hidden
          className="absolute -inset-2.5 rounded-2xl bg-brand-500/25 blur-lg"
          style={{ opacity: glow, scale: iconScale }}
        />
        <motion.div
          style={{ scale: iconScale }}
          className={cn(
            "relative flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-brand-300 ring-1 ring-white/10 transition-colors duration-300",
            "group-hover:text-brand-200 group-hover:ring-brand-400/50",
          )}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      </div>

      <div className="relative z-10 min-w-0">
        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-300">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

export function Workflow() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const showDot = mounted && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  const dotPosition = useTransform(lineScale, (v) => `${v * 100}%`);

  return (
    <section
      id="workflow"
      className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32"
    >
      {/* Ambient background */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[28rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600/20 blur-[120px]" />

      <Container className="relative">
        <SectionHeading
          eyebrow="How it works"
          title="From raw material to released batch"
          description="Factro follows the same path your operation already runs — it just makes every step visible, connected, and auditable."
          tone="dark"
        />

        <div ref={railRef} className="relative mt-20 sm:mt-24">
          {/* Connecting rail — desktop, horizontal */}
          <div className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] hidden h-px lg:block">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-brand-300"
              style={{ scaleX: lineScale }}
            />
            {showDot && (
              <motion.div
                aria-hidden
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(74,121,255,0.9)]"
                style={{ left: dotPosition }}
              />
            )}
          </div>

          {/* Connecting rail — mobile/tablet, vertical */}
          <div className="pointer-events-none absolute top-7 bottom-7 left-7 w-px lg:hidden">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-brand-500 via-brand-400 to-brand-300"
              style={{ scaleY: lineScale }}
            />
            {showDot && (
              <motion.div
                aria-hidden
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(74,121,255,0.9)]"
                style={{ top: dotPosition }}
              />
            )}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6 lg:grid-cols-4 lg:gap-5">
            {WORKFLOW_STEPS.map((step, i) => (
              <WorkflowStepCard
                key={step.step}
                step={step}
                index={i}
                total={WORKFLOW_STEPS.length}
                progress={lineScale}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
