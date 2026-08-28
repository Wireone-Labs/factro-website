export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
}

export const LEGAL_LAST_UPDATED = "August 28, 2026";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    paragraphs: [
      "This Privacy Policy explains how Wireone Labs (\"Factro,\" \"we,\" \"us\") collects, uses, and protects information when you use the Factro platform, this website, or interact with our team.",
      "This policy is written as a clear, working template for how Factro is built today. It is structured to be reviewed by counsel and replaced with a jurisdiction-specific final policy before general availability.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "We collect information in three general categories:",
    ],
    list: [
      "Account information — name, work email, company, role, and company size when you book a demo, sign up, or contact sales.",
      "Product data — production, quality, inventory, and other operational records your organization enters into Factro.",
      "Usage and device data — pages visited, actions taken, browser type, and IP address, collected automatically to keep the product secure and reliable.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How We Use Your Information",
    paragraphs: ["We use the information we collect to:"],
    list: [
      "Provide, maintain, and improve the Factro platform",
      "Respond to demo requests, support questions, and sales inquiries",
      "Secure accounts and detect misuse or unauthorized access",
      "Understand product usage so we can prioritize what to build next",
      "Meet legal, regulatory, and contractual obligations",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    paragraphs: [
      "This website uses a small number of cookies to remember your preferences (such as your cookie consent choice) and to understand aggregate site usage. We do not sell data collected through cookies.",
      "You can control cookies through the consent banner on this site or through your browser settings. Blocking some cookies may affect how parts of the site behave.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third Parties",
    paragraphs: [
      "We do not sell your personal information. We may share information with service providers who help us run the business (for example, hosting and email delivery), each bound by confidentiality obligations, or when required by law.",
      "Your production, quality, and inventory data stays scoped to your organization and is never shared across tenants.",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    paragraphs: [
      "We retain account and product data for as long as your organization has an active relationship with Factro, and for a reasonable period afterward to meet legal, accounting, or contractual requirements. Retention periods for specific record types are configurable as part of your plan.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    paragraphs: [
      "Depending on where you're located, you may have the right to access, correct, export, or delete personal information we hold about you, or to object to certain processing. To exercise any of these rights, contact us using the details below.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    paragraphs: [
      "Factro is a business product built for manufacturing operations and is not directed at children. We do not knowingly collect personal information from anyone under 16.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this policy as the product and our practices evolve. Material changes will be reflected by updating the date at the top of this page.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [
      "Questions about this policy or how your data is handled? Reach us at the email address below.",
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using Factro, you agree to be bound by these Terms of Service. If you're using Factro on behalf of an organization, you're agreeing on that organization's behalf, and \"you\" refers to that organization.",
    ],
  },
  {
    id: "description-of-service",
    title: "Description of Service",
    paragraphs: [
      "Factro is a software platform for production, quality, inventory, and related manufacturing operations. Features, modules, and availability may vary by plan and may change as the product evolves.",
    ],
  },
  {
    id: "accounts",
    title: "Account Registration & Responsibilities",
    paragraphs: [
      "You're responsible for maintaining the confidentiality of account credentials and for all activity that happens under your organization's account. Notify us promptly if you suspect unauthorized access.",
    ],
  },
  {
    id: "subscriptions",
    title: "Subscription, Fees & Payment",
    paragraphs: [
      "Paid plans are billed in advance on a monthly or annual basis as described at checkout or in your order form. Fees are non-refundable except where required by law or explicitly agreed in writing.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    paragraphs: ["You agree not to:"],
    list: [
      "Use Factro to store or process data you don't have the right to process",
      "Attempt to breach, disable, or circumvent security or access controls",
      "Reverse engineer or resell access to the platform without authorization",
      "Use the platform in a way that violates applicable law or regulation",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "Factro and its underlying software, design, and branding are owned by Wireone Labs. These Terms don't grant you any rights to our intellectual property beyond the right to use the platform as intended.",
    ],
  },
  {
    id: "customer-data",
    title: "Data Ownership & Customer Content",
    paragraphs: [
      "You own the production, quality, and business data you put into Factro. We process it only to provide and support the service, and in line with our Privacy Policy.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    paragraphs: [
      "Each party agrees to protect the other's confidential information with the same care it uses for its own confidential information, and not to disclose it except as needed to perform under these Terms.",
    ],
  },
  {
    id: "warranties",
    title: "Warranties & Disclaimers",
    paragraphs: [
      "Factro is provided on an \"as is\" and \"as available\" basis. We work to keep the platform reliable and secure, but we don't warrant that it will be uninterrupted or error-free.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    paragraphs: [
      "To the extent permitted by law, Wireone Labs will not be liable for indirect, incidental, or consequential damages arising from your use of Factro. Our total liability is limited to the amount paid for the service in the twelve months preceding the claim.",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    paragraphs: [
      "Either party may terminate an agreement for Factro as described in your order form, or immediately if the other party materially breaches these Terms and doesn't cure the breach within a reasonable period.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of the jurisdiction specified in your order form, without regard to conflict-of-law principles.",
    ],
  },
  {
    id: "changes-to-terms",
    title: "Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. We'll update the date at the top of this page, and material changes will be communicated to active customers.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [
      "Questions about these Terms? Reach us at the email address below.",
    ],
  },
];
