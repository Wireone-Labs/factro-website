export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Is Factro built for regulated industries?",
    answer:
      "Yes. Factro is designed around process manufacturing that carries compliance weight — pharma, nutraceuticals, specialty chemicals, cosmetics, and food & beverage. GMP Mode locks records once they're approved, so your batch history stays audit-ready.",
  },
  {
    question: "How does quality management work?",
    answer:
      "Quality runs as a connected system, not a form. Deviations, corrective actions, change control, and customer complaints are tracked as linked CAPA workflows, backed by in-process quality checks and document-controlled SOPs — with training sign-off tied to the same trail.",
  },
  {
    question: "Can our team use Factro on the shop floor?",
    answer:
      "Factro installs as a progressive web app, so operators can run it like a native app on shared tablets or terminals at the work center — no separate mobile build required.",
  },
  {
    question: "Does Factro support multiple facilities?",
    answer:
      "Factro models your site down to individual units, work centers, warehouses, and QC labs, all in one facility hierarchy — so every asset, batch, and inspection is traceable back to exactly where it happened.",
  },
  {
    question: "Can we customize fields and documents to match our process?",
    answer:
      "Yes. The Masters engine lets you configure custom fields, segment templates, approval chains, and Certificate of Analysis document formats — so the system adapts to how your products are actually specified.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a demo and our team will walk through setting up your product library, facility structure, and quality workflows around how your plant already operates.",
  },
];
