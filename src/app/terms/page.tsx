import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalDocument } from "@/components/sections/legal-document";
import { TERMS_SECTIONS, LEGAL_LAST_UPDATED } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern access to and use of the Factro platform.",
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms that govern your access to and use of Factro."
      />
      <LegalDocument sections={TERMS_SECTIONS} lastUpdated={LEGAL_LAST_UPDATED} />
    </>
  );
}
