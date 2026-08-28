import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { PricingComparison } from "@/components/sections/pricing-comparison";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { PRICING_FAQS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, facility-based pricing for Factro — from a single site getting started to multi-unit regulated operations.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Plans built around your facility, not your headcount"
        description="Every plan includes unlimited users. Upgrade as your compliance and quality needs grow — not as your team does."
      />

      <PricingPlans />
      <PricingComparison />

      <Faq
        id="pricing-faq"
        eyebrow="Pricing FAQ"
        title="Billing questions, answered"
        description="Still deciding on a plan? Here's what teams usually ask first."
        faqs={PRICING_FAQS}
      />

      <Cta
        title="Not sure which plan fits?"
        description="Book a walkthrough and we'll help you map your facility structure to the right plan."
        primaryLabel="Book a demo"
        secondaryLabel="Talk to sales"
      />
    </>
  );
}
