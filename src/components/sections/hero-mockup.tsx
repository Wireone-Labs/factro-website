"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-20px_rgba(15,14,23,0.25)] sm:rounded-3xl"
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

        <div className="relative">
          <Image
            src="/dashboard/hero-dashboard.png"
            alt="Factro purchase dashboard showing order book value, supplier deviation rate, and vendor compliance"
            width={2395}
            height={1609}
            priority
            className="h-auto w-full"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/70 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}
