import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { AnalyticsTracker } from "@/components/analytics/analytics-tracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://factro.in";
const SITE_NAME = "Factro";
const SITE_DESCRIPTION =
  "Factro puts supply chain, batch execution and quality on one record, with compliance built into the architecture rather than configured on top.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Compliance-native manufacturing`,
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
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
