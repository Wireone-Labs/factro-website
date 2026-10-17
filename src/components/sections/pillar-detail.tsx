import { ArrowRight, Check, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { PillarVisual } from "@/components/sections/pillar-visual";
import { PillarWorkflowDemo } from "@/components/sections/pillar-workflow-demo";
import { Container } from "@/components/ui/container";
import { PILLAR_PAGES, type PillarPageKey } from "@/data/pillar-pages";
import styles from "./pillar-detail.module.css";

const PILLAR_ICONS = { "compliance-engine": ShieldCheck, orchestrator: Workflow, "neural-engine": Sparkles };

export function PillarDetail({ pillar }: { pillar: PillarPageKey }) {
  const content = PILLAR_PAGES[pillar];
  const Icon = PILLAR_ICONS[pillar];
  return <section id={pillar} className={styles.pillarSection} aria-labelledby={`${pillar}-title`}>
    <Container>
      <section className={styles.intro} aria-labelledby={`${pillar}-title`}>
        <div className={styles.introCopy}>
          <span className={styles.eyebrow}><Icon size={16} /> Pillar {content.number} · {content.name}</span>
          <h2 id={`${pillar}-title`}>{content.title}</h2>
          <p>{content.description}</p>
          <h3 className={styles.introTitle}>{content.introTitle}</h3>
          {content.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <ul className={styles.principles}>{content.principles.map(principle => <li key={principle}><Check size={16} />{principle}</li>)}</ul>
        </div>
        <div className={styles.heroIllustration}><PillarVisual kind={content.visual} /></div>
      </section>
    </Container>
    <section className={styles.workflowSection} aria-labelledby={`${pillar}-workflow-title`}>
      <Container>
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>Inside the workflow</span><h3 id={`${pillar}-workflow-title`}>{content.workflowTitle}</h3><p>{content.workflowDescription}</p></div>
        <PillarWorkflowDemo steps={content.steps} />
      </Container>
    </section>
    <section className={styles.capabilitySection} aria-labelledby={`${pillar}-capabilities-title`}>
      <Container>
        <div className={styles.sectionHeading}><span className={styles.eyebrow}>Built into the platform</span><h3 id={`${pillar}-capabilities-title`}>What happens underneath.</h3></div>
        <div className={styles.capabilities}>{content.capabilities.map((capability, index) => <article key={capability.title}>
          <div className={styles.miniFlow} aria-label={capability.flow.join(" to ")}>{capability.flow.map((label, labelIndex) => <span key={label}><span className={styles.flowNode}>{label}</span>{labelIndex < capability.flow.length - 1 && <ArrowRight size={13} aria-hidden="true" />}</span>)}</div>
          <span className={styles.capabilityIndex}>{String(index + 1).padStart(2, "0")}</span><h4>{capability.title}</h4><p>{capability.description}</p>
        </article>)}</div>
      </Container>
    </section>
    <Container>
      <section className={styles.connection} aria-labelledby={`${pillar}-connection-title`}><Icon size={28} /><div><h3 id={`${pillar}-connection-title`}>{content.connectionTitle}</h3><p>{content.connection}</p><p className={styles.note}>{content.note}</p></div></section>
    </Container>
  </section>;
}
