"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import styles from "./product-avatar-reel.module.css";

const PORTRAITS = [
  { sheet: "indian", cell: 0 },
  { sheet: "global", cell: 1 },
  { sheet: "indian", cell: 1 },
  { sheet: "global", cell: 2 },
  { sheet: "indian", cell: 2 },
  { sheet: "global", cell: 4 },
  { sheet: "indian", cell: 3 },
  { sheet: "global", cell: 3 },
  { sheet: "global", cell: 5 },
  { sheet: "global", cell: 0 },
];
export function ProductAvatarReel({ roles, activeIndex, onSelect, entered, panelId }: { roles: string[]; activeIndex: number; onSelect: (index: number) => void; entered: boolean; panelId: string }) {
  const reelRef = useRef<HTMLDivElement>(null);
  const [pitch, setPitch] = useState(68);
  const base = roles.length + 3;
  const previousIndex = useRef(activeIndex);
  const position = useRef(base + activeIndex);
  const entrancePlayed = useRef(false);
  const trackY = useMotionValue(-(base + activeIndex) * pitch);
  const reducedMotion = useReducedMotion();
  const people = roles.map((designation, index) => ({ ...PORTRAITS[index % PORTRAITS.length], designation }));
  const trackPeople = Array.from({ length: people.length * 3 + 6 }, (_, index) => ({ ...people[(index - 3 + people.length) % people.length], roleIndex: (index - 3 + people.length) % people.length }));

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return;
    const measure = () => {
      const person = reel.querySelector<HTMLElement>("button");
      const track = person?.parentElement;
      if (person && track) setPitch(person.offsetHeight + parseFloat(getComputedStyle(track).rowGap));
    };
    const observer = new ResizeObserver(measure);
    observer.observe(reel);
    measure();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canonical = base + activeIndex;
    if (!entered || reducedMotion) {
      position.current = canonical;
      previousIndex.current = activeIndex;
      trackY.set(-canonical * pitch);
      return;
    }
    const entrance = !entrancePlayed.current;
    let difference = activeIndex - previousIndex.current;
    if (difference > roles.length / 2) difference -= roles.length;
    if (difference < -roles.length / 2) difference += roles.length;
    const target = entrance ? canonical : position.current + difference;
    if (entrance) trackY.set(-(canonical - roles.length) * pitch);
    entrancePlayed.current = true;
    previousIndex.current = activeIndex;
    position.current = target;
    const controls = animate(trackY, -target * pitch, { duration: entrance ? 1.35 : .65, ease: [.22,1,.36,1], onComplete: () => {
      position.current = canonical;
      trackY.set(-canonical * pitch);
    } });
    return () => controls.stop();
  }, [activeIndex, base, entered, pitch, reducedMotion, roles.length, trackY]);

  function handleKey(key: string) {
    const next = key === "ArrowDown" || key === "ArrowRight" ? (activeIndex + 1) % roles.length : key === "ArrowUp" || key === "ArrowLeft" ? (activeIndex - 1 + roles.length) % roles.length : key === "Home" ? 0 : key === "End" ? roles.length - 1 : null;
    if (next === null) return false;
    onSelect(next);
    reelRef.current?.querySelector<HTMLButtonElement>(`[data-canonical="true"][data-person-index="${next}"]`)?.focus({ preventScroll: true });
    return true;
  }

  return <div ref={reelRef} className={styles.reel} data-role-index={activeIndex} data-native-asset role="tablist" aria-label="Choose a role" aria-orientation="vertical">
    <motion.div className={styles.track} style={{ y: trackY }}>
      {trackPeople.map((person, index) => {
        const columns = person.sheet === "indian" ? 2 : 3;
        const canonical = index >= base && index < base + roles.length;
        const current = person.roleIndex === activeIndex;
        return <button
          type="button"
          key={`${person.designation}-${index}`}
          id={canonical ? `${panelId}-tab-${person.roleIndex}` : undefined}
          className={styles.person}
          data-current={current}
          data-last={person.roleIndex === roles.length - 1}
          data-canonical={canonical}
          data-person-index={person.roleIndex}
          role={canonical ? "tab" : undefined}
          aria-selected={canonical ? current : undefined}
          aria-controls={canonical ? panelId : undefined}
          aria-hidden={canonical ? undefined : true}
          tabIndex={canonical && current ? 0 : -1}
          onClick={() => onSelect(person.roleIndex)}
          onKeyDown={event => { if (handleKey(event.key)) event.preventDefault(); }}
        >
          <span className={styles.portrait} data-sheet={person.sheet} style={{ backgroundPosition: `${(person.cell % columns) * 100 / (columns - 1)}% ${Math.floor(person.cell / columns) * 100}%` }} />
          <span className={styles.designation}>{person.designation}</span>
        </button>;
      })}
    </motion.div>
  </div>;
}
