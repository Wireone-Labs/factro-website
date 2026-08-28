"use client";

import { motion } from "framer-motion";

export function DemoBackground() {
  return (
    <>
      <div className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_55%_at_50%_0%,black,transparent)]" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[8%] top-[10rem] h-56 w-56 rounded-full bg-brand-300/25 blur-3xl"
        animate={{ x: [0, -24, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-[6%] bottom-[-6rem] hidden h-72 w-72 rounded-full opacity-[0.14] sm:block"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--color-brand-400) 10%, transparent 26%, transparent 72%, var(--color-brand-300) 84%, transparent 98%)",
          maskImage:
            "radial-gradient(circle, transparent 56%, black 58%, black 68%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle, transparent 56%, black 58%, black 68%, transparent 70%)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
    </>
  );
}
