"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

export function HeroWave() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handleMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 36);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 22);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 900], [0, -110]);
  const parallaxRotate = useTransform(scrollY, [0, 900], [0, 4]);
  const combinedY = useTransform([springY, parallaxY], ([mouse, scroll]) => (mouse as number) + (scroll as number));

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -right-24 top-[-2rem] h-[26rem] w-[50rem] sm:-right-6 sm:top-0 sm:h-[30rem] sm:w-[58rem]"
      style={{ x: springX, y: combinedY, rotate: parallaxRotate }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0, x: 90 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.svg
          viewBox="0 0 800 400"
          fill="none"
          className="h-full w-full"
          animate={{ y: [0, -16, 0], rotate: [0, -1, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <defs>
            <linearGradient
              id="hero-wave-gradient"
              x1="0"
              y1="0"
              x2="800"
              y2="400"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--color-brand-300)" stopOpacity="0" />
              <stop offset="40%" stopColor="var(--color-brand-500)" stopOpacity="0.9" />
              <stop offset="62%" stopColor="var(--color-brand-600)" stopOpacity="0.7" />
              <stop offset="100%" stopColor="var(--color-brand-300)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M -60 260 C 140 90, 300 360, 480 190 S 760 40, 900 210"
            stroke="url(#hero-wave-gradient)"
            strokeWidth="46"
            strokeLinecap="round"
            className="blur-[2px]"
          />
          <path
            d="M -60 150 C 160 260, 320 60, 500 170 S 740 300, 880 120"
            stroke="url(#hero-wave-gradient)"
            strokeWidth="22"
            strokeLinecap="round"
            opacity="0.7"
            className="blur-[1px]"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}
