"use client";

import { useEffect, useRef } from "react";

// Sampled from /brand/hero-ribbon.webp, deep blue to pale mint.
const RIBBON_STOPS: [number, number, number][] = [
  [26, 77, 214],
  [58, 143, 217],
  [47, 196, 192],
  [153, 224, 214],
];

function ribbonColor(t: number): string {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (RIBBON_STOPS.length - 1);
  const i = Math.min(RIBBON_STOPS.length - 2, Math.floor(scaled));
  const frac = scaled - i;
  const a = RIBBON_STOPS[i];
  const b = RIBBON_STOPS[i + 1];
  const r = Math.round(a[0] + (b[0] - a[0]) * frac);
  const g = Math.round(a[1] + (b[1] - a[1]) * frac);
  const bch = Math.round(a[2] + (b[2] - a[2]) * frac);
  return `${r}, ${g}, ${bch}`;
}

// Grid density derives from viewport size rather than a fixed column
// count, so cells stay roughly the same physical size on a narrow phone
// as on a wide desktop hero instead of being crushed into slivers.
const TARGET_CELL = 34;
const MIN_COLS = 12;
const MAX_COLS = 42;
const MIN_ROWS = 9;
const MAX_ROWS = 26;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

interface MeshPoint {
  bx: number;
  by: number;
  x: number;
  y: number;
  phase: number;
  speed: number;
  amp: number;
  flicker: number;
  colorT: number;
}

export function HeroMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = MAX_COLS;
    let rows = MAX_ROWS;
    let points: MeshPoint[] = [];
    let frameId = 0;

    const buildPoints = () => {
      const gx = width / (cols - 1);
      const gy = height / (rows - 1);
      const next: MeshPoint[] = [];
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // Diagonal flow matching the ribbon: deep blue top-right, mint bottom-left.
          const colorT = 1 - (i / (cols - 1) * 0.5 + j / (rows - 1) * 0.5);
          next.push({
            bx: i * gx,
            by: j * gy,
            x: i * gx,
            y: j * gy,
            phase: Math.random() * Math.PI * 2,
            speed: 0.7 + Math.random() * 0.9,
            amp: gx * 0.34,
            flicker: Math.random() * Math.PI * 2,
            colorT,
          });
        }
      }
      points = next;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      cols = Math.round(clamp(width / TARGET_CELL, MIN_COLS, MAX_COLS));
      rows = Math.round(clamp(height / TARGET_CELL, MIN_ROWS, MAX_ROWS));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPoints();
    };

    const idx = (i: number, j: number) => j * cols + i;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const time = t * 0.00065;

      const fx = width * 0.78 + Math.sin(time * 1.1) * width * 0.16;
      const fy = height * 0.22 + Math.cos(time * 0.85) * height * 0.18;
      const falloff = Math.max(width, height) * 0.62;

      for (const p of points) {
        p.x = p.bx + Math.cos(time * p.speed + p.phase) * p.amp;
        p.y = p.by + Math.sin(time * p.speed * 1.3 + p.phase) * p.amp * 0.7;
      }

      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = points[idx(i, j)];
          const b = points[idx(i + 1, j)];
          const c = points[idx(i, j + 1)];
          const d = points[idx(i + 1, j + 1)];

          const cxq = (a.x + b.x + c.x + d.x) / 4;
          const cyq = (a.y + b.y + c.y + d.y) / 4;
          const dist = Math.hypot(cxq - fx, cyq - fy);
          let intensity = Math.max(0, Math.min(1, 1 - dist / falloff));
          if (intensity <= 0.02) continue;

          const shimmer = 0.55 + 0.45 * Math.sin(time * 2.2 + i * 0.9 + j * 1.3);
          intensity *= shimmer;

          const rgb = ribbonColor((a.colorT + b.colorT + c.colorT + d.colorT) / 4);
          const flip = (i + j) % 2 === 0;
          const tris = flip ? [[a, b, c], [b, d, c]] : [[a, b, d], [a, d, c]];

          for (const tri of tris) {
            ctx.beginPath();
            ctx.moveTo(tri[0].x, tri[0].y);
            ctx.lineTo(tri[1].x, tri[1].y);
            ctx.lineTo(tri[2].x, tri[2].y);
            ctx.closePath();
            ctx.fillStyle = `rgba(${rgb}, ${0.028 * intensity})`;
            ctx.fill();
            ctx.strokeStyle = `rgba(${rgb}, ${0.1 * intensity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const dist = Math.hypot(p.x - fx, p.y - fy);
        let intensity = Math.max(0, Math.min(1, 1 - dist / falloff));
        if (intensity <= 0.03) continue;
        const flicker = 0.6 + 0.4 * Math.sin(time * 2.6 + p.flicker);
        intensity *= flicker;
        const rgb = ribbonColor(p.colorT);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${0.36 * intensity})`;
        ctx.fill();
      }

      frameId = requestAnimationFrame(draw);
    };

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
