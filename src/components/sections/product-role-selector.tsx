"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import type { RefreshedRole } from "@/data/product-refresh";
import type { ProductSlug } from "@/data/product-detail-content";
import { Container } from "@/components/ui/container";
import { ProductMiniAsset } from "./product-mini-asset";
import { ProductAvatarReel } from "./product-avatar-reel";
import { useVisualCycle } from "./use-visual-cycle";
import { MarketingHeading } from "./marketing-ui";
import styles from "./product-reason-showcase.module.css";
import roleStyles from "./product-role-selector.module.css";

export function ProductRoleSelector({ roles, product, heading }: { roles: RefreshedRole[]; product: ProductSlug; heading: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const entered = useInView(stageRef, { once: true, amount: .35 });
  const { active, regionRef, setActive } = useVisualCycle(roles.length, 6500, { paused: !entered, pauseOnFocus: "keyboard" });
  const role = roles[active];
  const panelId = `${product}-role-panel`;

  useEffect(() => {
    const readRole = () => {
      const match = window.location.hash.match(/^#role-(\d+)$/);
      if (!match) return;
      const index = Number(match[1]) - 1;
      if (index >= 0 && index < roles.length) setActive(index);
    };
    readRole();
    window.addEventListener("hashchange", readRole);
    return () => window.removeEventListener("hashchange", readRole);
  }, [roles.length, setActive]);

  function selectRole(index: number) {
    setActive(index);
    window.history.replaceState(null, "", `#role-${index + 1}`);
  }

  return <section id="roles" className={roleStyles.section} aria-label="Who it is for" data-product-section>
    {["realtime-insights", "dashboard", ...roles.map((_, index) => `role-${index + 1}`)].map(anchor => <span id={anchor} key={anchor} className={roleStyles.anchor} aria-hidden="true" />)}
    <Container>
      <div className={roleStyles.heading}><MarketingHeading eyebrow="Who it is for" title="Built for the people who" muted={heading} description="Each role opens Factro on its own screen, with the evidence it needs to act." /></div>
      <div ref={stageRef} className={roleStyles.stage} data-entered={entered}>
        <div ref={regionRef} className={roleStyles.layout} aria-roledescription="carousel" aria-label="Product roles">
          <ProductAvatarReel roles={roles.map(person => person.title)} activeIndex={active} onSelect={selectRole} entered={entered} panelId={panelId} />
          <div className={roleStyles.scene}>
            <article id={panelId} role="tabpanel" aria-labelledby={`${panelId}-tab-${active}`} className={roleStyles.details}>
              <div key={active} className={roleStyles.copy}>
                <p className={styles.eyebrow}>0{active + 1} / Who it is for</p>
                <h3 className="sr-only">{role.title}</h3>
                <p className={styles.description}>{role.description}</p>
                <ul className={styles.points}>{role.points.map((point, pointIndex) => <li key={point}><span className={styles.marker}>0{pointIndex + 1}</span><p>{point}</p></li>)}</ul>
              </div>
            </article>
            <div key={active} className={roleStyles.preview}><ProductMiniAsset product={product} roleIndex={active} title={role.title} /></div>
          </div>
        </div>
      </div>
    </Container>
  </section>;
}
