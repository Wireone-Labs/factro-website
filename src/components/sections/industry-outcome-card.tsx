"use client";

import { type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";
import { IndustryIllustration } from "./industry-illustration";
import type { IndustryOutcome } from "@/data/industry-outcomes";
import styles from "./business-outcomes.module.css";

export function IndustryOutcomeCard({ outcome, name, slug, icon }: { outcome: IndustryOutcome; name: string; slug: string; icon: ReactNode }) {
  return <article className={styles.pair}>
    <div className={styles.industryCard}>
      <div className={styles.industryName}>{icon}<h3>{name}</h3></div>
      <div className={styles.challenge}>
            <IndustryIllustration industry={outcome.id} stage={outcome.stages[1]} />
            <h4>{outcome.pain}</h4>
            <p className={styles.scenario}>{outcome.scenario}</p>
      </div>
    </div>
    <div className={styles.roleCard}>
      <h4><UserRound size={17} />{outcome.role}</h4>
      <ul className={styles.rolePoints}>{outcome.actions.map(action => <li key={action}>{action}</li>)}</ul>
      <Link href={`/industries/${slug}`} className={styles.link}>Explore {name}<ArrowRight size={14} aria-hidden="true" /></Link>
    </div>
  </article>;
}
