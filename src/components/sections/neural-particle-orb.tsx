"use client";

import { useEffect, useRef } from "react";
import styles from "./three-pillars.module.css";

function createParticles(count: number) { return Array.from({ length: count }, (_, index) => {
  const vertical = 1 - ((index + .5) / count) * 2;
  const radius = Math.sqrt(1 - vertical * vertical);
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  return { horizontal: Math.cos(angle) * radius, vertical, depth: Math.sin(angle) * radius, phase: index * .73 };
}); }

export type NeuralMode = "production" | "quality" | "capa";

const MODE_HUES: Record<NeuralMode, number> = { production: 225, quality: 172, capa: 285 };

export function NeuralParticleOrb({ mode = "production", className = styles.orbCanvas, density = 1, particleScale = 1, interactive = false }: { mode?: NeuralMode; className?: string; density?: number; particleScale?: number; interactive?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);
  const hueRef = useRef(MODE_HUES[mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let frame = 0;
    let previousTime = 0;
    let width = 0;
    let height = 0;
    let transition = 1;
    let activityTime = 0;
    let hover = 0;
    let pointerInside = interactive && canvas.matches(":hover");
    let focused = interactive && document.activeElement === canvas;
    let pointerHorizontal = 0;
    let pointerVertical = 0;
    let particles: ReturnType<typeof createParticles> = [];
    const targetHue = MODE_HUES[mode];

    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const breathing = motion.matches ? 0 : Math.sin(elapsedRef.current * .0012) * .018;
      const radius = Math.min(width, height) * (.335 + transition * .035 + breathing + hover * .04);
      const centerHorizontal = width / 2;
      const centerVertical = height / 2;
      const rotation = elapsedRef.current * .00024 + pointerHorizontal * hover * .4;
      const glow = context.createRadialGradient(centerHorizontal, centerVertical, radius * .5, centerHorizontal, centerVertical, radius * 1.45);
      glow.addColorStop(0, "rgba(4,74,254,0)");
      glow.addColorStop(.5, `hsla(${hueRef.current}, 85%, 55%, ${.08 + hover * .12})`);
      glow.addColorStop(.72, `hsla(${hueRef.current}, 85%, 55%, .04)`);
      glow.addColorStop(1, "rgba(4,74,254,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      for (const particle of particles) {
        const horizontal = particle.horizontal * Math.cos(rotation) + particle.depth * Math.sin(rotation);
        const depth = particle.depth * Math.cos(rotation) - particle.horizontal * Math.sin(rotation);
        const pulse = 1 + Math.sin(particle.phase + elapsedRef.current * .0007) * .018;
        const projectedHorizontal = horizontal * radius * pulse;
        const tilt = Math.sin(elapsedRef.current * .00035) * .25 + pointerVertical * hover * .35;
        const projectedVertical = (particle.vertical * Math.cos(tilt) - depth * Math.sin(tilt)) * radius * pulse;
        const edge = Math.pow(1 - Math.abs(depth), 3);
        const brightness = Math.min(1, .16 + edge * .65 + Math.max(0, depth) * .17 + hover * .15);
        const hue = hueRef.current + horizontal * 40 + particle.vertical * 20;
        context.fillStyle = `hsla(${hue}, 85%, ${48 - edge * 8}%, ${brightness})`;
        context.beginPath();
        const dotScale = Math.min(1, Math.max(.8, Math.min(width, height) / 220));
        const dotRadius = (.5 + edge * .7 + (Math.sin(particle.phase) + 1) * .2) * dotScale * particleScale;
        context.arc(centerHorizontal + projectedHorizontal, centerVertical + projectedVertical, dotRadius, 0, Math.PI * 2);
        context.fill();
      }
    }

    function animate(time: number) {
      if (previousTime) {
        const delta = Math.min(time - previousTime, 50);
        activityTime += delta;
        elapsedRef.current += delta * ((activityTime < 3000 ? 2 : 1) + hover * 1.4);
      }
      previousTime = time;
      hover += ((pointerInside || focused ? 1 : 0) - hover) * .065;
      hueRef.current += (targetHue - hueRef.current) * .055;
      transition = activityTime < 3000 ? Math.sin(activityTime / 3000 * Math.PI) : 0;
      draw();
      frame = requestAnimationFrame(animate);
    }

    function syncAnimation() {
      cancelAnimationFrame(frame);
      previousTime = 0;
      if (motion.matches) {
        hover = 0;
        hueRef.current = targetHue;
        transition = 0;
      }
      draw();
      if (visible && !document.hidden && !motion.matches) frame = requestAnimationFrame(animate);
    }

    function enter() { pointerInside = true; }
    function leave() { pointerInside = false; }
    function focus() { focused = true; }
    function blur() { focused = false; }
    function move(event: PointerEvent) {
      const bounds = canvas!.getBoundingClientRect();
      pointerHorizontal = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      pointerVertical = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    }

    const resize = new ResizeObserver(([entry]) => {
      const bounds = entry.contentRect;
      width = bounds.width;
      height = bounds.height;
      const pixelRatio = Math.min(3, Math.max(2, window.devicePixelRatio || 1));
      const baseCount = Math.min(1800, Math.max(500, Math.round(1800 * Math.pow(Math.min(width, height) / 300, 2))));
      particles = createParticles(Math.max(24, Math.round(baseCount * Math.min(1, Math.max(.025, density)))));
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      draw();
    });
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncAnimation();
    });
    resize.observe(canvas);
    intersection.observe(canvas);
    motion.addEventListener("change", syncAnimation);
    document.addEventListener("visibilitychange", syncAnimation);
    if (interactive) {
      canvas.addEventListener("pointerenter", enter);
      canvas.addEventListener("pointerleave", leave);
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("focus", focus);
      canvas.addEventListener("blur", blur);
    }
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      intersection.disconnect();
      motion.removeEventListener("change", syncAnimation);
      document.removeEventListener("visibilitychange", syncAnimation);
      canvas.removeEventListener("pointerenter", enter);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("focus", focus);
      canvas.removeEventListener("blur", blur);
    };
  }, [mode, density, particleScale, interactive]);

  return <canvas ref={canvasRef} className={className} tabIndex={interactive ? 0 : undefined} role="img" aria-label={`Animated ${mode} signals in the AI Agent${interactive ? ". Hover or focus to explore." : ""}`} />;
}
