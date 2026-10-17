"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { HeroMesh } from "@/components/sections/hero-mesh";
import { HeroEventFlow } from "@/components/sections/hero-event-flow";
import styles from "./hero.module.css";

export function Hero() {
  return (
    <section data-home-hero className={`relative overflow-hidden pt-32 pb-8 sm:pt-40 sm:pb-12 ${styles.section}`}>
      {/* Background decoration */}
      <div className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <HeroMesh />

      <Container className="relative z-10">
        <div className={`mx-auto flex max-w-3xl flex-col items-center text-center ${styles.content}`}>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink-900"
          >
            <span className="block">
              <strong className="font-semibold">
                <span className="sr-only">Supercharge</span>
                <span aria-hidden="true" className={styles.word}>
                  {Array.from("Supercharge").map((letter, index) => (
                    <span key={index} className={styles.letter} data-letter={letter}>
                      <span className={styles.glyph} style={{ animationDelay: `${0.8 + index * 0.045}s` }}>{letter}</span>
                    </span>
                  ))}
                </span>
              </strong>{" "}your
            </span>{" "}
            <span className="block">manufacturing operations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance mt-6 max-w-2xl text-ink-500"
          >
            Plan, execute and optimise end-to-end operations with AI-driven production and quality intelligence.
          </motion.p>

        </div>
      </Container>
      <HeroEventFlow />
    </section>
  );
}
