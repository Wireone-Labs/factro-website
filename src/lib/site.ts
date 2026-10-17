import type { Metadata } from "next";
import { PRODUCT_PAGES } from "@/data/product-pages";

export const SITE_URL = "https://factro.io";
export const SITE_NAME = "Factro";
export const SITE_DESCRIPTION =
  "Factro is a Digital Manufacturing Platform (DMP) for regulated manufacturers, connecting ERP, MES and QMS on one foundation. Run business, production and quality with compliance controls, coordinated work and evidence-backed intelligence built in.";
export const SITE_TAGLINE = "Digital Manufacturing Platform for Regulated Manufacturing";

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

const INDUSTRY_SLUGS = [
  "pharmaceuticals",
  "medical-devices",
  "food-beverage",
  "nutraceuticals",
  "cosmetics",
  "veterinary",
  "api-cdmo",
];

export const SITE_ROUTES: SiteRoute[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/products", changeFrequency: "monthly", priority: 0.8 },
  ...PRODUCT_PAGES.map((product): SiteRoute => ({ path: `/${product.slug}`, changeFrequency: "monthly", priority: 0.8 })),
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/industries", changeFrequency: "monthly", priority: 0.8 },
  ...INDUSTRY_SLUGS.map(
    (slug): SiteRoute => ({
      path: `/industries/${slug}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ),
  { path: "/security-trust", changeFrequency: "monthly", priority: 0.7 },
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
