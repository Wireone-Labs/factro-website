"use client";

import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroMockup } from "@/components/sections/hero-mockup";
import { HeroWave } from "@/components/sections/hero-wave";
import { BOOK_DEMO_HREF } from "@/data/nav";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-12 sm:pt-40 sm:pb-16">
      {/* Background decoration */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <HeroWave />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-12rem] h-[32rem] w-[64rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.6, 0.45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[65%] top-[6rem] h-64 w-[28rem] -translate-x-1/2 rounded-full bg-brand-300/20 blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -16, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-4 hidden h-[34rem] w-[34rem] -translate-x-1/2 rounded-full opacity-[0.16] sm:block"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-brand-400) 8%, transparent 22%, transparent 70%, var(--color-brand-300) 82%, transparent 96%)",
          maskImage:
            "radial-gradient(circle, transparent 58%, black 60%, black 68%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 58%, black 60%, black 68%, transparent 70%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600"
          >
            AI-first. Compliance-native. Process-driven.
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mt-6 text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl lg:text-6xl lg:leading-[1.08]"
          >
            <span className="block">Pharma manufacturing runs on evidence.</span>
            <span className="block text-ink-400">Most of it is still on paper.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mt-6 max-w-2xl text-base leading-relaxed text-ink-500 sm:text-lg"
          >
            Factro puts supply chain, batch execution and quality on one
            record, with compliance built into the architecture rather than
            configured on top.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Button
              href={BOOK_DEMO_HREF}
              size="lg"
              className="group"
              event="book_demo_click"
              eventParams={{ location: "hero" }}
            >
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              href="#how-it-works"
              variant="secondary"
              size="lg"
              event="how_it_works_click"
              eventParams={{ location: "hero" }}
            >
              <PlayCircle className="h-4 w-4" />
              See how it works
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-6 text-xs font-medium text-ink-400"
          >
            In pilot with pharmaceutical manufacturers in India
          </motion.p>
        </div>

        <div className="mt-16 sm:mt-20">
          <HeroMockup
            src="/dashboard/purchase-dashboard.png"
            alt="Factro Purchase dashboard showing order book value, supplier deviation rate and vendor OTIF"
            width={1920}
            height={1490}
            priority
          />
        </div>
      </Container>
    </section>
  );
}
