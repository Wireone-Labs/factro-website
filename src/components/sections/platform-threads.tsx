"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import styles from "./platform-threads.module.css";

const LAYERS = [
  { id: "compliance-engine", color: "#0F6E56", side: -1 },
  { id: "orchestrator", color: "#D9822B", side: 1 },
  { id: "agentic-ai", color: "#4F4BD8", side: -1 },
];

type Thread = { id: string; color: string; paths: string[]; endpoints: { kind: string; x: number; y: number }[] };

export function PlatformThreads({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [stem, setStem] = useState("");
  const [occlusions, setOcclusions] = useState<{ x: number; y: number; width: number; height: number }[]>([]);
  const maskId = useId();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    let disposed = false;

    const measure = () => {
      if (disposed) return;
      if (!desktop.matches) {
        setThreads([]);
        setStem("");
        return;
      }
      const bounds = root.getBoundingClientRect();
      const cableX = bounds.left + bounds.width / 2;
      const objects = Array.from(root.querySelectorAll("[data-machine], [data-factory-label]")).flatMap(machine => {
        const object = machine.getBoundingClientRect();
        if (object.left > cableX + 8 || object.right < cableX - 8) return [];
        return [{ x: object.left - bounds.left - 24, y: object.top - bounds.top - 28, width: object.width + 48, height: object.height + 56 }];
      });
      if (objects.length) {
        const left = Math.min(...objects.map(object => object.x));
        const top = Math.min(...objects.map(object => object.y));
        setOcclusions([{ x: left, y: top, width: Math.max(...objects.map(object => object.x + object.width)) - left, height: Math.max(...objects.map(object => object.y + object.height)) - top }]);
      } else setOcclusions([]);
      const source = root.querySelector("[data-layer-port]");
      const sectionHeading = root.querySelector("#how-it-works [data-section-heading]");
      if (!source || !sectionHeading) return;
      const sourceBounds = source.getBoundingClientRect();
      const headingBounds = sectionHeading.getBoundingClientRect();
      const centerX = bounds.width / 2;
      const startX = sourceBounds.left + sourceBounds.width / 2 - bounds.left;
      const startY = sourceBounds.top + sourceBounds.height / 2 - bounds.top;
      const productionLabel = Array.from(root.querySelectorAll("[data-factory-label]")).find(label => label.textContent === "Production");
      const expansionY = productionLabel ? productionLabel.getBoundingClientRect().bottom - bounds.top + 32 : headingBounds.top - bounds.top;
      const expandedY = expansionY + 48;
      setStem(`M${startX} ${startY} C${startX} ${startY + 32},${centerX} ${startY + 32},${centerX} ${startY + 64} V${expansionY}`);
      const next = LAYERS.flatMap((layer, index) => {
        const target = root.querySelector(`[data-pillar-row="${layer.id}"]`);
        const heading = target?.querySelector("h3");
        const card = target?.querySelector("article");
        const copy = target?.querySelector("[data-pillar-copy]");
        const visual = target?.querySelector("[data-kind]");
        if (!target || !heading || !card || !copy || !visual) return [];
        const end = target.getBoundingClientRect();
        const title = heading.getBoundingClientRect();
        const panel = card.getBoundingClientRect();
        const copyBounds = copy.getBoundingClientRect();
        const visualBounds = visual.getBoundingClientRect();
        const endpoints = [
          {
            kind: "copy",
            x: (layer.side < 0 ? copyBounds.right + 12 : copyBounds.left - 12) - bounds.left,
            y: end.top - bounds.top + title.top - panel.top + title.height / 2,
          },
          {
            kind: "visual",
            x: (layer.side < 0 ? visualBounds.left - 12 : visualBounds.right + 12) - bounds.left,
            y: end.top - bounds.top + visualBounds.top - panel.top + visualBounds.height / 2,
          },
        ];
        const lane = centerX + (index - 1) * 7;
        const paths = endpoints.flatMap(endpoint => [-1, 0, 1].map(branch => {
          const laneX = lane + branch;
          const terminalY = endpoint.y + branch * 5;
          const direction = Math.sign(endpoint.x - laneX);
          const radius = Math.min(24, Math.abs(endpoint.x - laneX));
          return `M${centerX} ${expansionY} C${centerX} ${expansionY + 32},${laneX} ${expandedY - 32},${laneX} ${expandedY} V${terminalY - radius} Q${laneX} ${terminalY},${laneX + direction * radius} ${terminalY} H${endpoint.x}`;
        }));
        return [{ id: layer.id, color: layer.color, paths, endpoints }];
      });
      setThreads(next);
    };

    const schedule = () => {
      if (disposed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    root.querySelectorAll("[data-pillar-row], [data-pillar-copy], [data-kind], [data-backend-layers], #how-it-works [data-section-heading]").forEach(element => observer.observe(element));
    desktop.addEventListener("change", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      desktop.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.story}>
      {children}
      <svg className={styles.network} aria-hidden="true" focusable="false">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%" style={{ maskType: "luminance" }}>
            <rect width="100%" height="100%" fill="white" />
            {occlusions.map((object, index) => <rect key={index} {...object} fill="black" />)}
          </mask>
        </defs>
        <g mask={`url(#${maskId})`}>
        {stem && LAYERS.map((layer, index) => <path key={layer.id} d={stem} stroke={layer.color} transform={`translate(${(index - 1) * 2} 0)`} className={styles.stem} data-network-stem />)}
        {threads.map(thread => (
          <g key={thread.id} stroke={thread.color} fill="none" data-thread={thread.id}>
            {thread.paths.map((path, index) => <path key={index} d={path} className={styles.thread} />)}
            <path d={thread.paths[1]} className={styles.signal} pathLength="100" />
            <path d={thread.paths[4]} className={styles.signal} pathLength="100" />
            {thread.endpoints.map(endpoint => <circle key={endpoint.kind} data-thread-target={endpoint.kind} cx={endpoint.x} cy={endpoint.y} r="3" fill={thread.color} stroke="white" />)}
          </g>
        ))}
        </g>
      </svg>
    </div>
  );
}
