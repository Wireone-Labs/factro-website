import type { Metadata } from "next";

export const SITE_URL = "https://factro.io";
export const SITE_NAME = "Factro";
export const SITE_DESCRIPTION =
  "Factro is a compliance-native ERP for pharmaceutical, nutraceutical and food & beverage manufacturers — supply chain, batch execution and quality on one record, with compliance built into the architecture rather than configured on top.";
export const SITE_TAGLINE = "Compliance-Native ERP for Pharma Manufacturing";

export interface SiteRoute {
  path: string;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority: number;
}

export const SITE_ROUTES: SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/modules", changeFrequency: "monthly", priority: 0.8 },
  { path: "/compliances", changeFrequency: "monthly", priority: 0.8 },
  { path: "/infrastructure-security", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/demo", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.2 },
];

/**
 * Next.js replaces (rather than merges) the `openGraph`/`twitter` objects
 * per route segment, so a page that only sets `title`/`description` loses
 * the root layout's siteName/type/locale and falls back to the homepage's
 * og:title everywhere. This rebuilds the full block per page.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: path,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
