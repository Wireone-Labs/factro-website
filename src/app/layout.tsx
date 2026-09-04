import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";
import { SALES_EMAIL, SALES_PHONE } from "@/data/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  legalName: "Wireone Labs",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-mark.png`,
  description: SITE_DESCRIPTION,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: SALES_PHONE,
    email: SALES_EMAIL,
    areaServed: "IN",
  },
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "pharma manufacturing software",
    "GMP compliance software",
    "21 CFR Part 11",
    "EU Annex 11",
    "Revised Schedule M",
    "batch record software",
    "quality management system",
    "CAPA software",
  ],
  authors: [{ name: "Wireone Labs" }],
  creator: "Wireone Labs",
  publisher: "Wireone Labs",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-ink-900 font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
