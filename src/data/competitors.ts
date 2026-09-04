export interface ComparisonRow {
  label: string;
  factro: string;
  sap: string;
  qt9: string;
  oracle: string;
  masterControl: string;
  /** Marks a cell as a third-party estimate rather than a confirmed figure. */
  tentative?: {
    sap?: boolean;
    qt9?: boolean;
    oracle?: boolean;
    masterControl?: boolean;
  };
}

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "Minimum commitment",
    factro: "8 users · no AMC · no setup fee",
    sap: "Enterprise-scale deployments typical, with a separate annual maintenance fee",
    qt9: "Scoped per deployment, quoted separately",
    oracle: "Base platform fee plus per-user licensing, typically multi-year contracts",
    masterControl: "Tiered eQMS packages (Basic, Standard, Complete), scoped per deployment",
  },
  {
    label: "Time to go live",
    factro: "30 days, or two months free if we're late",
    sap: "Typically several months to over a year",
    qt9: "Varies by scope, quoted separately",
    oracle: "Often 3–6 months or more, quoted separately",
    masterControl: "Vendor-cited 90 days to a few months, quoted separately",
  },
  {
    label: "What's included",
    factro: "All 10 modules, every update, every regulatory profile — nothing licensed separately",
    sap: "Modular licensing — batch records and quality workflows are usually configured as add-ons",
    qt9: "A strong quality-management module; production planning and batch execution are typically separate products",
    oracle: "A broad, finance-first ERP suite — manufacturing quality and compliance workflows typically need add-on modules or partners",
    masterControl: "Primarily a quality management system — document control, CAPA, audits and training. Production planning, batch execution and general ERP need a separate system",
  },
  {
    label: "Built for pharma, nutraceuticals and food",
    factro: "Compliance-native from day one — Schedule M, 21 CFR Part 11, EU Annex 11, WHO GMP",
    sap: "A generic ERP used across every industry — pharma compliance is built through customization, not out of the box",
    qt9: "Quality-management-first — manufacturers typically still need a separate ERP or MES for execution",
    oracle: "A horizontal, finance-led ERP built across industries — pharma GxP compliance is not native",
    masterControl: "Strong life-sciences QMS pedigree, but not a full ERP or MES — its manufacturing add-on integrates with an external ERP rather than replacing one",
  },
  {
    label: "Support",
    factro: "24×7 phone support, plus built-in ticketing for feedback and issue resolution — no separate contract",
    sap: "Tiered support plans (e.g. Enterprise Support), typically a separate paid contract",
    qt9: "Support scoped with the deployment contract",
    oracle: "Tiered support plans (e.g. Premier Support), typically a separate paid contract",
    masterControl: "Support scoped with the deployment contract",
  },
  {
    label: "Estimated annual cost, 50 users",
    factro: "₹21.0L / year — exact, from the price above",
    sap: "~₹47L–₹125L / year",
    qt9: "~₹60L–₹75L / year",
    oracle: "~₹59L–₹109L / year",
    masterControl: "~₹60L–₹149L / year, depending on module — Documents-only to the full Quality (QMS) suite",
    tentative: { sap: true, qt9: true, oracle: true, masterControl: true },
  },
];
