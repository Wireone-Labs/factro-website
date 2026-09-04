"use client";

import { useEffect } from "react";
import Image from "next/image";
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
  const springX = useSpring(mouseX, { stiffness: 40, damping: 26, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 26, mass: 0.6 });

  // A second, softer spring drifts the highlight layer at a different rate for depth.
  const driftX = useSpring(mouseX, { stiffness: 22, damping: 28, mass: 0.9 });
  const driftY = useSpring(mouseY, { stiffness: 22, damping: 28, mass: 0.9 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const handleMove = (event: MouseEvent) => {
      mouseX.set((event.clientX / window.innerWidth - 0.5) * 36);
      mouseY.set((event.clientY / window.innerHeight - 0.5) * 12);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 900], [0, -110]);
  const parallaxRotate = useTransform(scrollY, [0, 900], [0, 4]);
  const combinedY = useTransform([springY, parallaxY], ([mouse, scroll]) => (mouse as number) + (scroll as number));
  const driftCombinedX = useTransform(driftX, (v) => v * 0.6);
  const driftCombinedY = useTransform([driftY, parallaxY], ([mouse, scroll]) => (mouse as number) * 0.6 + (scroll as number) * 1.4);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -right-24 top-[-2rem] h-[54rem] w-[64rem] sm:-right-6 sm:top-0 sm:h-[60rem] sm:w-[70rem]"
      style={{ x: springX, y: combinedY, rotate: parallaxRotate }}
    >
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, x: 90 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          animate={{ y: [0, -16, 0], rotate: [0, -1, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/brand/hero-ribbon.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 50rem, 58rem"
            className="object-contain object-right-top"
          />
        </motion.div>
        {/* Faint drifting echo of the ribbon adds a subtle depth-of-field parallax layer. */}
        <motion.div
          className="absolute inset-0 opacity-20 blur-sm"
          style={{ x: driftCombinedX, y: driftCombinedY }}
        >
          <Image
            src="/brand/hero-ribbon.webp"
            alt=""
            fill
            sizes="(max-width: 640px) 50rem, 58rem"
            className="object-contain object-right-top"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
