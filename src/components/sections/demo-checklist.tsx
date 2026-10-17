"use client";

import { useState } from "react";
import { History, ListChecks, Search, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ROI_CATEGORIES, MINUTES_PER_ITEM } from "@/data/roi-checklist";
import { trackEvent } from "@/lib/analytics";
import { MarketingHeading } from "./marketing-ui";
import shared from "./marketing-page.module.css";
import styles from "./demo-page.module.css";

const ICONS = [Search,Users,History,ListChecks];

export function DemoChecklist() {
  const [checked,setChecked] = useState<Set<string>>(new Set());
  const hours = checked.size * MINUTES_PER_ITEM / 60;
  return <section className={`${shared.section} ${shared.muted}`}><Container><MarketingHeading eyebrow="Before you come" title="Tick what sounds familiar." muted="We will price the time it costs." description="Each statement is a small, weekly cost that rarely shows up in a report." /><div className={styles.checklistLayout}><div className={styles.checklistCards}>{ROI_CATEGORIES.map((category,index) => { const Icon = ICONS[index]; return <fieldset className={styles.checklistCard} key={category.id}><legend className="sr-only">{category.label}</legend><h3 aria-hidden="true"><Icon size={16} />{category.label}</h3>{category.items.map((item,itemIndex) => { const identity = `${category.id}-${itemIndex}`; return <label key={identity}><input type="checkbox" checked={checked.has(identity)} onChange={() => { if (!checked.size) trackEvent("demo_checklist_start"); setChecked(previous => { const next = new Set(previous); if (next.has(identity)) next.delete(identity); else next.add(identity); return next; }); }} /><span>{item.text}</span></label>; })}</fieldset>; })}</div><aside className={styles.estimate} aria-live="polite" aria-atomic="true"><p>YOUR ESTIMATE</p><div className={styles.value}><strong>{hours.toFixed(1)}</strong><span>hours</span></div><p>per person, every week</p><p>{checked.size} {checked.size === 1 ? "item" : "items"} ticked. Each one costs about 24 minutes a week per person.</p><p>Across 30 to 60 people, that adds up to {(hours * 30).toFixed(0)}–{(hours * 60).toFixed(0)} team hours every week.</p><p className={styles.estimateNote}>Bring this to the demo. We will work it out with your numbers.</p></aside></div></Container></section>;
}
