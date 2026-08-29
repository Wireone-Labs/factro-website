import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { PricingPlans } from "@/components/sections/pricing-plans";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { PRICING_FAQS } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "All 10 modules, the same controls, the same audit trail. The difference is infrastructure, not capability.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="All 10 modules, the same controls, the same audit trail"
        description="The difference is infrastructure, not capability."
      />

      <PricingPlans />

      <Faq
        id="pricing-faq"
        eyebrow="Pricing FAQ"
        title="Billing questions, answered"
        description="Still deciding on a plan? Here's what teams usually ask first."
        faqs={PRICING_FAQS}
      />

      <Cta
        id="cta-pricing"
        title="Not sure which tier fits?"
        description="Book a walkthrough and we'll help you map your infrastructure and compliance needs to the right tier."
        primaryLabel="Book a demo"
        secondaryLabel="Talk to sales"
      />
    </>
  );
}
