import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalDocument } from "@/components/sections/legal-document";
import { PRIVACY_SECTIONS, LEGAL_LAST_UPDATED } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Factro collects, uses, and protects information across the platform and this website.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use, and protect information when you use Factro."
      />
      <LegalDocument sections={PRIVACY_SECTIONS} lastUpdated={LEGAL_LAST_UPDATED} />
    </>
  );
}
