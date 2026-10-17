"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUp, Check, FileText, LoaderCircle, Sparkles } from "lucide-react";
import { ANALYSIS_PROMPT, ANALYSIS_REFERENCES, ANALYSIS_SECTIONS } from "@/data/pillar-analysis";
import { NeuralParticleOrb } from "./neural-particle-orb";
import styles from "./pillar-intelligence.module.css";

const INTRO_DURATION = 1800;
const CHARACTER_DURATION = 28;
const TYPING_END = INTRO_DURATION + ANALYSIS_PROMPT.length * CHARACTER_DURATION;
const PROMPT_END = TYPING_END + 500;
const REFERENCE_DURATION = 850;
const SEQUENCE_END = PROMPT_END + ANALYSIS_REFERENCES.length * REFERENCE_DURATION;
const ANSWER_SCROLL_DURATION = 15000;
const ANSWER_END_PAUSE = 3000;
const SCROLL_STOPS = [[0, 0], [.08, 0], [.14, .12], [.22, .12], [.29, .3], [.39, .3], [.46, .48], [.54, .48], [.61, .66], [.7, .66], [.78, .85], [.89, .85], [1, 1]];

function AnalysisReport() {
  return <div className={styles.report}>
    <div className={styles.reportHeader}>
      <span><Sparkles size={14} />Factro AI</span>
      <h4>Three batches. One calibration gap.</h4>
      <p>TP-04 ran past its calibration date. The affected batches and earlier CAPA are already connected.</p>
    </div>
    <div className={styles.readiness}>
      <span>Readiness</span><strong>77 <ArrowDownRight size={14} /> 70</strong>
      <div className={styles.scoreTrack}><span style={{ width: "77%" }} /><span style={{ width: "70%" }} /></div>
    </div>
    {ANALYSIS_SECTIONS.map(section => <section className={styles.reportSection} key={section.id} data-analysis-section={section.id}>
      <h5>{section.title}</h5>
      {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      {section.table && <table className={styles.reportTable}>
        <thead><tr>{section.table.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead>
        <tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody>
      </table>}
      {section.chart && <figure className={styles.reportChart} data-tone={section.chart.tone}>
        <figcaption><strong>{section.chart.title}</strong><span>{section.chart.description}</span></figcaption>
        {section.chart.values.map(value => <div className={styles.chartRow} key={value.label}>
          <span>{value.label}</span><div><i style={{ width: `${value.value}%` }} /></div><strong>{value.value}</strong>
        </div>)}
      </figure>}
    </section>)}
    <div className={styles.reportEnd}><Check size={16} /><div><strong>Evidence together. Next step clear.</strong><p>Review batch impact and the previous action. Quality owns the decision.</p></div></div>
  </div>;
}

function ScrollingAnswer({ running, reducedMotion, onComplete }: { running: boolean; reducedMotion: boolean; onComplete: () => void }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !running || reducedMotion) return;
    let frame = 0;
    let previous = performance.now();
    const resetClock = () => { previous = performance.now(); };
    const tick = (now: number) => {
      if (!document.hidden) elapsedRef.current += Math.min(now - previous, 80);
      previous = now;
      const progress = Math.min(elapsedRef.current / ANSWER_SCROLL_DURATION, 1);
      const nextIndex = SCROLL_STOPS.findIndex(stop => stop[0] >= progress);
      const next = SCROLL_STOPS[Math.max(1, nextIndex)];
      const prior = SCROLL_STOPS[Math.max(0, nextIndex - 1)];
      const portion = (progress - prior[0]) / (next[0] - prior[0]);
      const eased = 1 - (1 - portion) ** 3;
      const distance = Math.max(0, viewport.scrollHeight - viewport.clientHeight);
      viewport.scrollTop = distance * (prior[1] + (next[1] - prior[1]) * eased);
      if (elapsedRef.current >= ANSWER_SCROLL_DURATION + ANSWER_END_PAUSE) {
        onComplete();
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener("visibilitychange", resetClock);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", resetClock);
    };
  }, [running, reducedMotion, onComplete]);

  return <div ref={viewportRef} className={styles.answerViewport} data-analysis-scroll><AnalysisReport /></div>;
}

export function PillarIntelligence() {
  const regionRef = useRef<HTMLDivElement>(null);
  const [elapsed, setElapsed] = useState(0);
  const inView = useInView(regionRef, { amount: .3 });
  const reducedMotion = useReducedMotion();
  const phase = reducedMotion || elapsed >= SEQUENCE_END ? "answer" : elapsed < INTRO_DURATION ? "intro" : elapsed < PROMPT_END ? "prompt" : "thinking";
  const characters = Math.max(0, Math.floor((elapsed - INTRO_DURATION) / CHARACTER_DURATION));
  const referenceIndex = Math.min(ANALYSIS_REFERENCES.length - 1, Math.floor((elapsed - PROMPT_END) / REFERENCE_DURATION));
  const restart = useCallback(() => setElapsed(0), []);

  useEffect(() => {
    if (!inView || reducedMotion || elapsed >= SEQUENCE_END) return;
    const delay = elapsed < INTRO_DURATION ? INTRO_DURATION - elapsed
      : elapsed < TYPING_END ? CHARACTER_DURATION
      : elapsed < PROMPT_END ? PROMPT_END - elapsed
      : REFERENCE_DURATION;
    let remaining = delay;
    let started = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    function sync() {
      if (timer !== undefined) {
        clearTimeout(timer);
        remaining = Math.max(0, remaining - (performance.now() - started));
        timer = undefined;
      }
      if (document.hidden) return;
      started = performance.now();
      timer = setTimeout(() => setElapsed(elapsed + delay), remaining);
    }
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => { clearTimeout(timer); document.removeEventListener("visibilitychange", sync); };
  }, [elapsed, inView, reducedMotion]);

  return <div ref={regionRef} className={styles.demo} data-phase={phase}>
    <AnimatePresence mode="wait" initial={false}>
      {phase === "answer" && <motion.div key="answer" className={styles.answerScene} initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .3 }}>
        <ScrollingAnswer running={inView} reducedMotion={!!reducedMotion} onComplete={restart} />
      </motion.div>}
      {phase === "intro" && <motion.div key="intro" className={styles.intro} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .2 }}>
        <NeuralParticleOrb mode="production" density={.45} className={styles.introOrb} />
        <h4>What would you like to know?</h4><p>Your business. One connected answer.</p>
      </motion.div>}
      {phase === "prompt" && <motion.div key="prompt" className={styles.promptScene} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .2 }}>
        <span className={styles.promptLabel}><Sparkles size={15} />Factro AI</span>
        <h4>Answers, without the search.</h4>
        <div className={styles.promptBox}>
          <div className={styles.promptInput}>{ANALYSIS_PROMPT.slice(0, characters)}<i className={styles.caret} /></div>
          <div className={styles.promptFooter}><span>Connected to your records</span><span className={styles.promptSend}><ArrowUp size={17} /></span></div>
        </div>
      </motion.div>}
      {phase === "thinking" && <motion.div key="thinking" className={styles.thinking} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .2 }}>
        <NeuralParticleOrb mode={referenceIndex < 2 ? "production" : referenceIndex < 4 ? "quality" : "capa"} density={.45} className={styles.thinkingOrb} />
        <h4>Following the evidence<span className={styles.dots}>…</span></h4>
        <div className={styles.references}>{ANALYSIS_REFERENCES.map((reference, index) => <div key={reference.name} className={styles.reference} data-state={index < referenceIndex ? "done" : index === referenceIndex ? "active" : "waiting"}>
          <span className={styles.referenceIcon}>{index < referenceIndex ? <Check size={15} /> : index === referenceIndex ? <LoaderCircle size={15} /> : <FileText size={15} />}</span>
          <div><strong>{reference.name}</strong><span>{index === referenceIndex ? reference.detail : reference.record}</span></div>
          <span className={styles.referenceStatus}>{index < referenceIndex ? "Reviewed" : index === referenceIndex ? "Reading" : "Queued"}</span>
        </div>)}</div>
      </motion.div>}
    </AnimatePresence>
  </div>;
}
