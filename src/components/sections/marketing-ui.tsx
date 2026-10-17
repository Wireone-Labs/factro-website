import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import styles from "./marketing-page.module.css";

export function MarketingHeading({ eyebrow, title, muted, description }: { eyebrow: string; title: string; muted?: string; description?: string }) {
  return <div className={styles.heading}><div><p className={styles.eyebrow}>{eyebrow}</p><h2>{title}{muted && <><br /><span>{muted}</span></>}</h2></div>{description && <p>{description}</p>}</div>;
}

export function MarketingNav({ name, links }: { name: string; links: [string, string][] }) {
  return <nav className={styles.sectionNav} data-section-nav aria-label={`${name} page sections`}><Container><strong>{name}</strong><ul>{links.map(([anchor,label]) => <li key={anchor}><a href={`#${anchor}`}>{label}</a></li>)}</ul><Link href="/demo">Book a walkthrough<ArrowRight size={14} aria-hidden="true" /></Link></Container></nav>;
}

export function MarketingClosing({ title, muted, description, button = "Book a demo" }: { title: string; muted: string; description: string; button?: string }) {
  return <section className={styles.closing}><Container><div><p className={styles.eyebrow}>Make it your workflow</p><h2>{title}<br /><span>{muted}</span></h2><p>{description}</p></div><div className={styles.closingActions}><Button href="/demo">{button}<ArrowRight size={16} aria-hidden="true" /></Button></div></Container></section>;
}
