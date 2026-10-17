import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MegaMenu } from "@/data/nav";
import { industryTheme } from "@/data/industry-themes";
import styles from "./mega-menu-panel.module.css";

export function MegaMenuPanel({ menu, onNavigate }: { menu: MegaMenu; onNavigate?: () => void }) {
  return <div className={styles.panel} data-layout={menu.layout}>
    <div className={styles.main}>
      <p className={styles.label}>{menu.heading}</p>
      <ul className={styles.items}>
        {menu.items.map(({ icon: Icon, ...item }) => <li key={item.href} data-divided={item.divided}>
          <Link href={item.href} onClick={onNavigate} className={styles.item} data-industry={item.industry} style={item.industry ? industryTheme(item.industry) : undefined}>
            <span className={styles.icon} data-tone={item.tone}><Icon size={18} strokeWidth={1.75} aria-hidden="true" /></span>
            <span className={styles.copy}>
              <span className={styles.title}>{item.label}{item.badge && <span className={styles.badge}>{item.badge}</span>}<ArrowRight className={styles.itemArrow} size={13} aria-hidden="true" /></span>
              <span className={styles.description}>{item.description}</span>
            </span>
          </Link>
        </li>)}
      </ul>
    </div>
    <aside className={styles.aside}>
      <div>
        <p className={styles.label}>{menu.feature.eyebrow}</p>
        <h2>{menu.feature.title}</h2>
        <p className={styles.description}>{menu.feature.description}</p>
        <Link href={menu.feature.href} onClick={onNavigate} className={styles.action}>{menu.feature.label}<ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
      <div className={styles.contact}>
        <h3>{menu.contact.title}</h3>
        <p className={styles.description}>{menu.contact.description}</p>
        <Link href={menu.contact.href} onClick={onNavigate} className={styles.action}>{menu.contact.label}<ArrowRight size={14} aria-hidden="true" /></Link>
      </div>
    </aside>
  </div>;
}
