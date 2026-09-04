"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroMockupProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  /** Tailwind aspect-ratio class (e.g. "aspect-[16/9]"). When set, the image
   *  crops to a uniform aspect ratio (object-cover, top-aligned) instead of
   *  its natural one. Unlike a fixed pixel height, this stays safe (crops
   *  top/bottom only, never left/right) at every viewport width, as long as
   *  the chosen ratio is wider than the widest source image. */
  cropAspect?: string;
}

export function HeroMockup({
  src,
  alt,
  width,
  height,
  priority,
  cropAspect,
}: HeroMockupProps) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-[0_30px_80px_-20px_rgba(15,14,23,0.25)] sm:rounded-3xl"
      >
        <div className={cn("relative", cropAspect)}>
          {cropAspect ? (
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
            />
          ) : (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              className="h-auto w-full"
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/70 to-transparent"
          />
        </div>
      </motion.div>
    </div>
  );
}
