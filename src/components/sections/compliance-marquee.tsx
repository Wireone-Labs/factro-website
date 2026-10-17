import type { CSSProperties } from "react";
import { FileCheck2, FlaskConical, Globe, HeartPulse, Network, ShieldCheck, type LucideIcon } from "lucide-react";
import styles from "./compliance-marquee.module.css";

interface ComplianceIndustry {
  id: string;
  name: string;
  standards: { name: string; region: string }[];
}

const STANDARD_ICONS: Record<string, LucideIcon> = {
  "FDA 21 CFR Part 11": ShieldCheck,
  "EU Annex 11 / EU GMP": Globe,
  "Revised Schedule M": FileCheck2,
  "PIC/S GMP": Network,
  "WHO GMP": HeartPulse,
  "ICH Q10 / GAMP 5": FlaskConical,
};

export function ComplianceMarquee({ industries }: { industries: ComplianceIndustry[] }) {
  const cards = industries.flatMap((industry) => industry.standards.map((standard) => ({
    ...industry,
    id: `${industry.id}-${standard.name}`,
    standards: [standard],
  })));
  let seed = 42;
  for (let index = cards.length - 1; index > 0; index--) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const swapIndex = Math.floor((seed / 4294967296) * (index + 1));
    [cards[index], cards[swapIndex]] = [cards[swapIndex], cards[index]];
  }
  const rows = [cards.filter((_, index) => index % 2 === 0), cards.filter((_, index) => index % 2 === 1)];

  return <div className={styles.marquee} data-no-reveal>
    <div className={styles.rows}>
      {rows.map((row, rowIndex) => {
        const estimatedWidth = row.reduce((width, industry) => width + 20 + industry.standards.reduce((total, standard) => total + Math.max(standard.name.length * 7, standard.region.length * 6, industry.name.length * 6) + 128, 0), 0);
        return <div key={rowIndex} className={styles.row} tabIndex={0} role="region" aria-label={`Industry compliance standards, row ${rowIndex + 1}`}>
          <div className={styles.track} style={{ "--duration": `${estimatedWidth / 48}s`, animationDirection: rowIndex === 0 ? "normal" : "reverse" } as CSSProperties}>
            {[0, 1].map((copy) => <div key={copy} className={styles.copy} aria-hidden={copy === 1 ? true : undefined}>
              {row.map((industry) => <div key={industry.id} className={styles.industry} role="group" aria-label={industry.name}>
                <ul className={styles.standards} aria-label={`${industry.name} frameworks`}>
                  {industry.standards.map((standard) => {
                    const Icon = STANDARD_ICONS[standard.name] ?? ShieldCheck;
                    return <li key={standard.name} className={styles.card}>
                      <span className={styles.icon}><Icon size={20} aria-hidden="true" /></span>
                      <div><p className={styles.name}>{standard.name}</p><p className={styles.region}>{standard.region}<span aria-hidden="true"> · </span><span className={styles.industryName}>{industry.name}</span></p></div>
                    </li>;
                  })}
                </ul>
              </div>)}
            </div>)}
          </div>
        </div>;
      })}
    </div>
  </div>;
}
