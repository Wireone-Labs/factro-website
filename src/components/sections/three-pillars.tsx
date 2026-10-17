import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowRight, BellRing, BookOpenCheck, FileCheck2, LockKeyhole, MessagesSquare, Route, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { PillarVisual } from "@/components/sections/pillar-visual";
import { PILLARS } from "@/data/pillars";
import styles from "./three-pillars.module.css";

const DETAILS = [
  {
    name: "Compliance Engine",
    title: "The right checks. Before the next step.",
    keywords: "Control · Verify · Preserve",
    description: "Permissions, approvals and signatures checked as you work. Every decision backed by evidence.",
    benefits: [
      { icon: FileCheck2, text: "Audit prep is no longer a sprint." },
      { icon: LockKeyhole, text: "Stop unapproved actions before they happen." },
      { icon: BookOpenCheck, text: "Keep every operator on the current SOP." },
    ],
  },
  {
    name: "Task Manager",
    title: "Work moves. Nobody chases.",
    keywords: "Assign · Coordinate · Resolve",
    description: "Every task finds its owner, with records and conversations attached. No context lost at handover.",
    benefits: [
      { icon: Route, text: "Spot bottlenecks before they slow the next team." },
      { icon: BellRing, text: "Replace follow-ups with automatic nudges." },
      { icon: MessagesSquare, text: "Keep every decision with the work." },
    ],
  },
  {
    name: "Intelligence Layer",
    title: "Catch the pattern. See the proof.",
    keywords: "Triage · Analyse · Explain",
    description: "Spot gaps and recurring issues, with evidence behind every finding. Your team makes the call.",
    benefits: [
      { icon: Sparkles, text: "Resolve deviations faster with CAPA AI agent." },
      { icon: SearchCheck, text: "Get business answers backed by your records." },
      { icon: ShieldCheck, text: "Catch recurring issues before they spread." },
    ],
  },
];

export function ThreePillars() {
  return (
    <section id="how-it-works" className={styles.section} aria-label="How Factro works">
      <Container>
        <SectionHeading className={styles.compactHeading} eyebrow="How Factro works" title="Three ways we close the gap" description="Controls that hold. Work that moves. Intelligence that explains itself." />

        <div className={styles.rows}>
          {PILLARS.map((pillar, index) => (
            <div key={pillar.id} className={styles.row} data-pillar-row={pillar.id}>
              <Reveal>
                <article className={styles.card} data-reversed={index === 1} aria-labelledby={`pillar-${pillar.id}`}>
                  <div className={styles.copy} data-pillar-copy>
                    <p className={styles.cardLabel}><span>Pillar {String(index + 1).padStart(2, "0")}</span>{DETAILS[index].keywords}</p>
                    <h3 id={`pillar-${pillar.id}`} className={styles.pillarTitle}>{DETAILS[index].name}</h3>
                    <h4 className={styles.openingStatement}>{DETAILS[index].title}</h4>
                    <p className={styles.description}>{DETAILS[index].description}</p>
                    <ul className={styles.benefits} aria-label={`${pillar.label} benefits`}>
                      {DETAILS[index].benefits.map(({ icon: Icon, text }) => (
                        <li className={styles.benefit} key={text}>
                          <span className={styles.benefitIcon}><Icon size={20} strokeWidth={1.6} aria-hidden="true" /></span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figure className={styles.artifact} aria-labelledby={`pillar-${pillar.id}`}>
                    <PillarVisual kind={pillar.id} />
                  </figure>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          <Button href="/how-it-works" variant="secondary">Explore the pillars<ArrowRight size={16} aria-hidden="true" /></Button>
        </div>
      </Container>
    </section>
  );
}
