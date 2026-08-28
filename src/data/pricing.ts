export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  monthly: number | null;
  annual: number | null;
  unit: string;
  recommended?: boolean;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "essential",
    name: "Essential",
    tagline: "For a single facility getting started with digital records",
    monthly: 499,
    annual: 399,
    unit: "/ facility / month",
    ctaLabel: "Start with Essential",
    ctaHref: "/demo",
    features: [
      "Production planning & batch execution",
      "Inventory & warehouse management",
      "Basic in-process quality checks",
      "Reports & dashboard",
      "Up to 3 work centers",
      "Email support",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "For regulated operations that need full quality control",
    monthly: 999,
    annual: 799,
    unit: "/ facility / month",
    recommended: true,
    ctaLabel: "Start with Professional",
    ctaHref: "/demo",
    features: [
      "Everything in Essential",
      "Full CAPA & quality management suite",
      "GMP Mode with strict validation",
      "Training & compliance sign-off",
      "Product & process library (BOM, MFR)",
      "Unlimited work centers",
      "Priority support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For multi-unit operations with custom compliance needs",
    monthly: null,
    annual: null,
    unit: "Custom pricing",
    ctaLabel: "Contact sales",
    ctaHref: "/demo",
    features: [
      "Everything in Professional",
      "Multi-unit facility modeling",
      "Custom approval workflows",
      "Dedicated onboarding",
      "SLA-backed support",
      "Custom data retention & exports",
    ],
  },
];

export interface ComparisonFeature {
  label: string;
  essential: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

export interface ComparisonCategory {
  category: string;
  features: ComparisonFeature[];
}

export const COMPARISON_TABLE: ComparisonCategory[] = [
  {
    category: "Production & Inventory",
    features: [
      {
        label: "Production planning & batch execution",
        essential: true,
        professional: true,
        enterprise: true,
      },
      {
        label: "Inventory & warehouse management",
        essential: true,
        professional: true,
        enterprise: true,
      },
      {
        label: "Work centers",
        essential: "Up to 3",
        professional: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        label: "Multi-unit facility modeling",
        essential: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Quality & Compliance",
    features: [
      {
        label: "In-process quality checks (IPQC)",
        essential: true,
        professional: true,
        enterprise: true,
      },
      {
        label: "CAPA suite (deviations, change control, complaints)",
        essential: false,
        professional: true,
        enterprise: true,
      },
      {
        label: "GMP Mode (strict validation)",
        essential: false,
        professional: true,
        enterprise: true,
      },
      {
        label: "Training & compliance sign-off",
        essential: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "Platform",
    features: [
      {
        label: "Reports & role-aware dashboard",
        essential: true,
        professional: true,
        enterprise: true,
      },
      {
        label: "Product & process library (BOM, MFR)",
        essential: true,
        professional: true,
        enterprise: true,
      },
      {
        label: "Custom fields & CoA templates",
        essential: false,
        professional: true,
        enterprise: true,
      },
      {
        label: "Custom approval workflows",
        essential: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        label: "Support",
        essential: "Email",
        professional: "Priority",
        enterprise: "Dedicated + SLA",
      },
      {
        label: "Onboarding",
        essential: "Self-serve",
        professional: "Guided",
        enterprise: "Dedicated",
      },
    ],
  },
];

export const PRICING_FAQS = [
  {
    question: "Is pricing per facility or per user?",
    answer:
      "Per facility. Every plan includes unlimited users within reason, so you're not paying more to add operators, reviewers, or approvers as your team grows.",
  },
  {
    question: "Can we switch plans later?",
    answer:
      "Yes. You can move from Essential to Professional (or up to Enterprise) as your compliance and facility needs grow — your data and configuration carry over.",
  },
  {
    question: "Is there a setup or onboarding fee?",
    answer:
      "Essential and Professional include guided setup as part of the plan. Enterprise includes dedicated onboarding scoped to your facility structure and workflows.",
  },
  {
    question: "Do you offer a discount for annual billing?",
    answer:
      "Yes — billing annually brings the effective monthly rate down on every plan, shown in the toggle above.",
  },
  {
    question: "What happens after we book a demo?",
    answer:
      "We'll walk through your production and quality workflows, map them to the right plan, and get you set up with a facility structure that matches how you actually operate.",
  },
];
