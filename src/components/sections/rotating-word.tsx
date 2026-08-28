"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useMounted } from "@/lib/use-mounted";

const WORDS = [
  "regulated manufacturing",
  "pharma production",
  "process manufacturing",
  "quality-driven plants",
];

const WIDEST_WORD = WORDS.reduce((a, b) => (a.length > b.length ? a : b));

const TYPE_SPEED = 45;
const DELETE_SPEED = 26;
const PAUSE_AFTER_TYPE = 1700;
const PAUSE_AFTER_DELETE = 350;

export function RotatingWord() {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (!mounted || reduceMotion) return;

    const current = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < current.length) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length + 1)),
          TYPE_SPEED,
        );
      } else {
        timeout = setTimeout(() => setPhase("deleting"), PAUSE_AFTER_TYPE);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(
          () => setText(current.slice(0, text.length - 1)),
          DELETE_SPEED,
        );
      } else {
        timeout = setTimeout(() => {
          setWordIndex((i) => (i + 1) % WORDS.length);
          setPhase("typing");
        }, PAUSE_AFTER_DELETE);
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, reduceMotion, mounted]);

  const displayText = mounted && reduceMotion ? WORDS[0] : text;

  return (
    <span className="relative mx-auto block text-brand-500">
      <span className="invisible" aria-hidden>
        {WIDEST_WORD}
      </span>
      <span className="absolute inset-0">
        {displayText}
        <span
          aria-hidden
          className="animate-blink ml-1 inline-block w-[3px] translate-y-[0.05em] bg-brand-500 align-middle"
          style={{ height: "0.85em" }}
        />
      </span>
      <span className="sr-only">{WORDS[wordIndex]}</span>
    </span>
  );
}
