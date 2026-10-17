"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Network } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContinuumJourney } from "./continuum-journey";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./continuum-screen.module.css";

export function ConnectedSystem({ children }: { children: ReactNode }) {
  const [running, setRunning] = useState(false);
  const { active: phase, regionRef: stageRef } = useVisualCycle(5, 6000, { paused: !running, pauseOnHover: false, pauseOnFocus: "never" });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncMotion = () => setRunning(visible && !document.hidden && !motion.matches);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    }, { threshold: 0.2 });
    observer.observe(stage);
    document.addEventListener("visibilitychange", syncMotion);
    motion.addEventListener("change", syncMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncMotion);
      motion.removeEventListener("change", syncMotion);
    };
  }, [stageRef]);

  return (
    <section id="day-one" className={styles.track} aria-labelledby="connected-system-title">
      <span id="continuum" className={styles.anchor} aria-hidden="true" />
      <span id="connected-system" className={styles.anchor} aria-hidden="true" />
      <div ref={stageRef} className={styles.screen} data-suite-stage data-running={running}>
        <Container className={styles.container}>
          <div className={styles.layout}>
                <header className={styles.intro}>
                  <div className={styles.identity}>
                    <p className={styles.eyebrow}><Network size={18} aria-hidden="true" />All-in-one suite</p>
                    <h2 id="connected-system-title">Close the gaps between systems. <span>That’s where batches wait.</span></h2>
                    <p className={styles.sharedRecord}>Each product works on its own. Run all three and they share one record, so nothing gets re-keyed, reconciled or chased between purchase, production and quality.</p>
                  </div>
                </header>
                <div className={styles.benefits}>{children}</div>
            <div className={styles.illustrationColumn}><ContinuumJourney phase={phase} /></div>
          </div>
        </Container>
      </div>
    </section>
  );
}
