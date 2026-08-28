import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CookieConsent } from "@/components/layout/cookie-consent";
import { withBasePath } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const SITE_URL = "https://factro.in";
const SITE_NAME = "Factro";
const SITE_DESCRIPTION =
  "Factro is the operating system for regulated manufacturing — production, quality, and compliance unified in one connected platform.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Advanced Manufacturing System`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "manufacturing software",
    "manufacturing ERP",
    "production management",
    "quality management system",
    "CAPA software",
    "GMP compliance",
    "batch traceability",
    "shop floor management",
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
    icon: withBasePath("/favicon.ico"),
    apple: withBasePath("/apple-touch-icon.png"),
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
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
