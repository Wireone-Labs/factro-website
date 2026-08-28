"use client";

import { motion } from "framer-motion";
import {
  Factory,
  ShieldCheck,
  Package,
  LayoutDashboard,
  ClipboardCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIDEBAR_ICONS = [
  { icon: LayoutDashboard, active: true },
  { icon: Factory, active: false },
  { icon: Package, active: false },
  { icon: ShieldCheck, active: false },
  { icon: ClipboardCheck, active: false },
];

const STATS = [
  { label: "Batches in progress", value: "18", accent: "text-brand-600" },
  { label: "Open CAPAs", value: "3", accent: "text-warning" },
  { label: "Batches released", value: "142", accent: "text-success" },
];

const BARS = [38, 52, 44, 68, 58, 74, 62, 80, 70, 90];

const BATCH_ROWS = [
  { id: "FB-2291", stage: "Granulation", status: "In progress", tone: "info" },
  { id: "FB-2288", stage: "QC Release", status: "In QC", tone: "warning" },
  { id: "FB-2284", stage: "Packing", status: "Released", tone: "success" },
];

const toneClasses: Record<string, string> = {
  info: "bg-info/10 text-info",
  warning: "bg-warning/10 text-warning",
  success: "bg-success/10 text-success",
};

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl border border-line bg-white shadow-[0_30px_80px_-20px_rgba(15,14,23,0.25)] sm:rounded-3xl"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-100" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-100" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-100" />
          <div className="ml-4 hidden h-6 flex-1 items-center rounded-md bg-ink-50 px-3 text-xs text-ink-400 sm:flex">
            app.factro.in/dashboard
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="hidden w-14 flex-col items-center gap-3 border-r border-line py-5 sm:flex">
            {SIDEBAR_ICONS.map(({ icon: Icon, active }, i) => (
              <div
                key={i}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  active
                    ? "bg-brand-500 text-white"
                    : "text-ink-300",
                )}
              >
                <Icon className="h-4.5 w-4.5" />
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="flex-1 p-5 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-900">
                  Production overview
                </p>
                <p className="text-xs text-ink-400">Unit 2 · Formulation line</p>
              </div>
              <div className="hidden gap-2 sm:flex">
                {["Production", "Quality", "Inventory"].map((tab, i) => (
                  <span
                    key={tab}
                    className={cn(
                      "rounded-full px-3 py-1.5 text-xs font-medium",
                      i === 0
                        ? "bg-ink-900 text-white"
                        : "bg-ink-50 text-ink-400",
                    )}
                  >
                    {tab}
                  </span>
                ))}
              </div>
            </div>

            {/* Stat tiles */}
            <div className="grid grid-cols-3 gap-3">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-line bg-mist/60 p-3.5"
                >
                  <p className={cn("text-xl font-semibold sm:text-2xl", stat.accent)}>
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-tight text-ink-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="mt-4 rounded-xl border border-line p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-medium text-ink-500">
                  Batch throughput — last 10 days
                </p>
                <span className="text-[11px] text-success">+12.4%</span>
              </div>
              <div className="flex h-20 items-end gap-1.5 sm:h-24">
                {BARS.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.04, ease: "easeOut" }}
                    className={cn(
                      "flex-1 rounded-sm",
                      i === BARS.length - 1 ? "bg-brand-500" : "bg-brand-100",
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Batch table */}
            <div className="mt-4 hidden overflow-hidden rounded-xl border border-line sm:block">
              {BATCH_ROWS.map((row, i) => (
                <div
                  key={row.id}
                  className={cn(
                    "flex items-center justify-between px-4 py-2.5 text-xs",
                    i !== BATCH_ROWS.length - 1 && "border-b border-line",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-ink-900">{row.id}</span>
                    <span className="text-ink-400">{row.stage}</span>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 font-medium",
                      toneClasses[row.tone],
                    )}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating callout — batch released */}
      <motion.div
        initial={{ opacity: 0, y: 20, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="animate-float absolute -left-4 top-16 hidden w-52 rounded-xl border border-line bg-white p-3 shadow-[0_16px_40px_-12px_rgba(15,14,23,0.2)] sm:-left-10 sm:block"
      >
        <div className="flex items-start gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
            <CheckCircle2 className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-ink-900">
              Batch FB-2284 released
            </p>
            <p className="text-[11px] text-ink-400">QA sign-off complete</p>
          </div>
        </div>
      </motion.div>

      {/* Floating callout — deviation */}
      <motion.div
        initial={{ opacity: 0, y: -20, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
        style={{ animationDelay: "1.2s" }}
        className="animate-float absolute -right-4 bottom-10 hidden w-56 rounded-xl border border-line bg-white p-3 shadow-[0_16px_40px_-12px_rgba(15,14,23,0.2)] sm:-right-12 sm:block"
      >
        <div className="flex items-start gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-warning/10 text-warning">
            <AlertTriangle className="h-4 w-4" />
          </span>
          <div>
            <p className="text-xs font-semibold text-ink-900">
              Deviation logged
            </p>
            <p className="text-[11px] text-ink-400">Linked to CAPA workflow</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
