import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SIGN_IN_URL, BOOK_DEMO_HREF, SALES_MAILTO, SALES_EMAIL } from "@/data/nav";

const FOOTER_COLUMNS = [
  {
    heading: "Platform",
    links: [
      { label: "Platform overview", href: "/platform" },
      { label: "Production", href: "/platform#production" },
      { label: "Quality", href: "/platform#quality" },
      { label: "Inventory", href: "/platform#inventory" },
      { label: "Reports & analytics", href: "/platform#reports" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Compliance", href: "/compliance" },
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
      { label: "Security & compliance", href: "/compliance" },
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
              The operating system for regulated manufacturing — production,
              quality, and compliance, unified in one connected platform.
            </p>
            <a
              href={SALES_MAILTO}
              className="inline-flex w-fit items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-600"
            >
              <Mail className="h-4 w-4" />
              {SALES_EMAIL}
            </a>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-ink-900">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
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
