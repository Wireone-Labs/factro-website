"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Calculator, CalendarClock, ChartNoAxesCombined, ClipboardCheck, FilePenLine, FlaskConical, GitBranch, History, MessageSquarePlus, PackageCheck, RotateCcw, ShieldAlert, TrendingUp, Truck, UserRoundPlus, type LucideIcon } from "lucide-react";
import type { ProductSlug } from "@/data/product-detail-content";
import styles from "./marketing-page.module.css";

const MOMENT_ICONS: Record<ProductSlug, LucideIcon[]> = {
  erp: [MessageSquarePlus, TrendingUp, Truck, FlaskConical, GitBranch],
  mes: [CalendarClock, ClipboardCheck, RotateCcw, ShieldAlert, ChartNoAxesCombined],
  qms: [UserRoundPlus, FilePenLine, CalendarClock, ShieldAlert, History],
  one: [PackageCheck, GitBranch, Calculator, ShieldAlert, ClipboardCheck],
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function ProductMoments({ moments, product }: { moments: [string, string][]; product: ProductSlug }) {
  const reducedMotion = useReducedMotion();

  return <motion.div
    id="moments-overview"
    className={styles.moments}
    data-reveal
    initial={reducedMotion ? false : "hidden"}
    whileInView="visible"
    viewport={{ once: true, amount: .2 }}
    variants={{ hidden: {}, visible: { transition: { delayChildren: reducedMotion ? 0 : .25, staggerChildren: reducedMotion ? 0 : .22 } } }}
  >
    {moments.map(([title, description], index) => {
      const Icon = MOMENT_ICONS[product][index] ?? ClipboardCheck;
      return <motion.article
      className={styles.card}
      key={title}
      variants={cardVariants}
      transition={{ duration: reducedMotion ? 0 : .5, ease: [.22, 1, .36, 1] }}
    >
      <div className={styles.momentTop}><span className={styles.icon}><Icon size={17} aria-hidden="true" /></span><span>0{index + 1}</span></div>
      <h3>{title}</h3><p>{description}</p>
    </motion.article>;
    })}
  </motion.div>;
}
