"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMounted } from "@/lib/use-mounted";
import { cn } from "@/lib/utils";

export function ScrollRail({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const showDot = mounted && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.3"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.3,
  });
  const dotTop = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="pointer-events-none absolute top-2 bottom-2 -left-8 hidden w-px lg:block">
        <div className="absolute inset-0 bg-line" />
        <motion.div
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-brand-300 via-brand-500 to-brand-300"
          style={{ scaleY }}
        />
        {showDot && (
          <motion.div
            aria-hidden
            className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-brand-500 shadow-[0_0_10px_3px_rgba(4,74,254,0.55)]"
            style={{ top: dotTop }}
          />
        )}
      </div>
      {children}
    </div>
  );
}
