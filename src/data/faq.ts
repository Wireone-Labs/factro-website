export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: "Is Factro going to replace my SAP?",
    answer:
      "No. If SAP runs your finance, procurement and planning, it stays exactly where it is. Factro complements it with the layers SAP was never built to do well: manufacturing execution on the floor, a quality system that gates rather than reviews, and the AI layer over both. We post back to your ERP rather than asking you to move off it.",
  },
  {
    question: "Can Factro run on its own, without an ERP behind it?",
    answer:
      "Yes. It is an end-to-end stack for manufacturing operations, covering sales and purchase and inventory through execution, quality and documents. Plenty of plants run Factro as the whole thing. The only piece we deliberately leave alone is the books.",
  },
  {
    question: "What happens to Tally and our accountant?",
    answer:
      "Nothing changes for them. Tally keeps the books. Factro posts voucher-level entries for batch costs, purchases, sales and payments, and generates e-invoices and e-way bills against the dispatch record. The numbers simply arrive reconciled.",
  },
  {
    question: "How long until we are live?",
    answer:
      "Thirty days from your complete dataset, committed. If we miss it, you run on us for two further months at no cost. Weeks five to eight are hypercare with daily monitoring and a dedicated line for blockers.",
  },
  {
    question: "We make products in more than one regulated category. Does that mean two systems?",
    answer:
      "No. A single site can carry two or three regulatory packs at once, and a batch knows which one applies to it. Your inspector still sees one system, one access model and one audit log, which also means one validation exercise rather than several.",
  },
  {
    question: "Where does our data live, and who can see it?",
    answer:
      "AWS Mumbai or Hyderabad, so data stays in India, with a per-tenant encryption key and two-tier backups with point-in-time recovery. Dedicated customers can choose any region and take a private estate end to end. Support access is time-boxed, approved by you and logged to the audit trail.",
  },
  {
    question: "Is the AI going to train on our batch data?",
    answer:
      "No. A private model runs inside your deployment. No prompt leaves your tenant and nothing trains a model, which is the only version of this that survives a customer audit.",
  },
];
