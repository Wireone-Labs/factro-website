import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { LegalDocument } from "@/components/sections/legal-document";
import { TERMS_SECTIONS, LEGAL_LAST_UPDATED } from "@/data/legal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The terms that govern access to and use of the Factro platform.",
  path: "/terms",
});

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
