export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  badgeLabel: string;
  badgeColor: "brand" | "violet";
  monthly: number | null;
  annual: number | null;
  unit: string;
  minUsers?: string;
  note?: string;
  featuresIntro?: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "standard",
    name: "Standard",
    tagline: "Multi-tenant",
    badgeLabel: "Small & mid-scale manufacturers",
    badgeColor: "brand",
    monthly: 3849,
    annual: 3499,
    unit: "/ user / month",
    minUsers: "Minimum 8 users · no upfront fees, no AMC charges",
    note: "Choose Standard if you're a single site or small group supplying domestic or WHO-GMP markets. Nothing about compliance, security or audit readiness is weaker here, the controls are identical.",
    ctaLabel: "Start with Standard",
    ctaHref: "/demo",
    features: [
      "All 10 modules",
      "Per-tenant encryption key, fully isolated",
      "AWS Mumbai or Hyderabad, data stays in India",
      "Multi-tenant, capped tenants per group",
      "Two-tier backups with point-in-time recovery",
      "Round-the-clock monitoring, 99% uptime target",
    ],
  },
  {
    id: "dedicated",
    name: "Dedicated",
    tagline: "Private and reserved",
    badgeLabel: "Big pharma enterprises",
    badgeColor: "violet",
    monthly: null,
    annual: null,
    unit: "per instance",
    minUsers: "Unlimited users · annual term",
    note: "Choose Dedicated if you export to US or EU markets and your customers audit your suppliers, or a contract names dedicated infrastructure. On-premises isolation, none of the burden.",
    ctaLabel: "Contact sales",
    ctaHref: "/demo",
    featuresIntro: "Everything in Standard, plus",
    features: [
      "Dedicated end to end: database, app, VPC, storage",
      "Isolated as on-premise, managed as cloud",
      "Any AWS region you choose",
      "Three-tier backups on your retention schedule",
      "Customer-managed encryption keys on request",
      "Validation pack included at go-live",
    ],
  },
];

export const PRICING_FAQS = [
  {
    question: "Is there a setup fee?",
    answer: "No. No upfront fees and no AMC charges on Standard.",
  },
  {
    question: "What happens if we outgrow Standard?",
    answer:
      "Moving to Dedicated does not mean re-buying the platform. Same modules, same data model, more infrastructure around it.",
  },
  {
    question: "Do validation packs come with Standard?",
    answer:
      "No, validation packs (URS, IQ, OQ, PQ, RTM, GAMP 5) are Dedicated-only. Talk to us if a Standard deployment needs one.",
  },
];
