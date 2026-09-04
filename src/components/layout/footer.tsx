"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  SIGN_IN_URL,
  BOOK_DEMO_HREF,
  SALES_MAILTO,
  SALES_EMAIL,
  SALES_PHONE,
  SALES_PHONE_HREF,
} from "@/data/nav";
import { trackEvent } from "@/lib/analytics";

const FOOTER_COLUMNS = [
  {
    heading: "Modules",
    links: [
      { label: "All modules", href: "/modules" },
      { label: "Production", href: "/modules#production" },
      { label: "Quality", href: "/modules#quality" },
      { label: "Inventory", href: "/modules#inventory" },
      { label: "CAPA", href: "/modules#capa" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Compliances", href: "/compliances" },
      { label: "Infrastructure & Security", href: "/infrastructure-security" },
      { label: "About us", href: "/about" },
      { label: "Book a demo", href: BOOK_DEMO_HREF },
      { label: "Sign in", href: SIGN_IN_URL },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Terms of service", href: "/terms" },
      { label: "Security & compliance", href: "/compliances" },
      { label: "Contact sales", href: SALES_MAILTO },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <Container className="py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-4">
            <Link href="/" className="flex items-center" aria-label="Factro home">
              <Image
                src="/brand/logo-wordmark-cropped.png"
                alt="Factro"
                width={883}
                height={243}
                className="h-7 w-auto"
              />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-ink-500">
              AI-first. Compliance-native. Process-driven.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={SALES_MAILTO}
                onClick={() => trackEvent("contact_click", { location: "footer" })}
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-600"
              >
                <Mail className="h-4 w-4" />
                {SALES_EMAIL}
              </a>
              <a
                href={SALES_PHONE_HREF}
                onClick={() => trackEvent("phone_click", { location: "footer" })}
                className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-600"
              >
                <Phone className="h-4 w-4" />
                {SALES_PHONE}
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-ink-900">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => {
                  const className =
                    "text-sm text-ink-500 transition-colors hover:text-ink-900";
                  const onClick = link.href.startsWith("mailto:")
                    ? () => trackEvent("contact_click", { location: "footer" })
                    : link.href === SIGN_IN_URL
                      ? () => trackEvent("sign_in_click", { location: "footer" })
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

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-400">
            © {new Date().getFullYear()} Factro, by Wireone Labs. All rights
            reserved.
          </p>
          <p className="text-xs text-ink-400">
            Built for regulated manufacturing teams.
          </p>
        </div>
      </Container>
    </footer>
  );
}
