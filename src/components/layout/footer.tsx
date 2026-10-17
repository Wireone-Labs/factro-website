"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  BOOK_DEMO_HREF,
  SALES_MAILTO,
  SALES_EMAIL,
  SALES_PHONE,
  SALES_PHONE_HREF,
} from "@/data/nav";
import { trackEvent } from "@/lib/analytics";
import styles from "./footer.module.css";

const FOOTER_COLUMNS = [
  {
    heading: "Products",
    links: [
      { label: "ERP", href: "/erp" },
      { label: "MES", href: "/mes" },
      { label: "QMS", href: "/qms" },
      { label: "All-in-One Suite", href: "/one" },
      { label: "Pillars", href: "/how-it-works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "About us", href: "/about" },
      { label: "Book a demo", href: BOOK_DEMO_HREF },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Security & Trust", href: "/security-trust" },
    ],
  },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: footerRef, offset: ["start end", "end end"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [-56, 0]);
  const glowY = useTransform(scrollYProgress, [0, 1], [-120, 0]);

  return (
    <footer ref={footerRef} className={styles.footer}>
      <motion.div aria-hidden="true" className={styles.glow} style={{ y: reducedMotion ? 0 : glowY }} />
      <motion.div className={styles.content} style={{ y: reducedMotion ? 0 : contentY }}>
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center" aria-label="Factro home">
              <Image
                src="/brand/logo-wordmark-cropped.png"
                alt="Factro"
                width={883}
                height={243}
                className={`h-7 w-auto ${styles.logo}`}
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-300">
              AI-first. Compliance-native. Process-driven.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={SALES_MAILTO}
                onClick={() => trackEvent("contact_click", { location: "footer" })}
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-brand-300"
              >
                <Mail className="h-4 w-4" />
                {SALES_EMAIL}
              </a>
              <a
                href={SALES_PHONE_HREF}
                onClick={() => trackEvent("phone_click", { location: "footer" })}
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-slate-200 transition-colors hover:text-brand-300"
              >
                <Phone className="h-4 w-4" />
                {SALES_PHONE}
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-white">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => {
                  const className =
                    "text-sm text-slate-300 transition-colors hover:text-white";
                  const onClick = link.href.startsWith("mailto:")
                    ? () => trackEvent("contact_click", { location: "footer" })
                    : link.href === BOOK_DEMO_HREF
                        ? () => trackEvent("book_demo_click", { location: "footer" })
                        : undefined;
                  return (
                    <li key={link.label}>
                      {link.href.startsWith("/") ? (
                        <Link href={link.href} className={className} onClick={onClick}>
                          {link.label}
                        </Link>
                      ) : (
                        <a href={link.href} className={className} onClick={onClick}>
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Factro, by Wireone Labs. All rights
            reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built for regulated manufacturing teams.
          </p>
        </div>
        <p className={styles.complianceNote}>
          Supported frameworks, not product certifications. Compliance depends on
          applicable requirements, configuration, validation and operating procedures.
        </p>
      </Container>
      </motion.div>
    </footer>
  );
}
