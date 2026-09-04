export const MAPPED_STANDARDS: { name: string; region: string }[] = [
  { name: "FDA 21 CFR Part 11", region: "United States" },
  { name: "EU Annex 11 / EU GMP", region: "EU" },
  { name: "Revised Schedule M", region: "India" },
  { name: "PIC/S GMP", region: "APAC" },
  { name: "WHO", region: "" },
  { name: "ICH Q10 / GAMP 5", region: "Africa / Global" },
];

/**
 * Twenty-one controls, each mapped directly to the standards it satisfies.
 * One list, not two — the description and the standards mapping live on the
 * same row so this doesn't need a separate matrix table beside it.
 */
export interface ComplianceControl {
  text: string;
  standards: string[];
}

const ALL_STANDARDS = [
  "FDA 21 CFR Part 11",
  "EU Annex 11 / EU GMP",
  "Revised Schedule M",
  "PIC/S GMP",
  "WHO",
  "ICH Q10 / GAMP 5",
];

export const COMPLIANCE_CONTROLS: ComplianceControl[] = [
  {
    text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason",
    standards: ALL_STANDARDS,
  },
  {
    text: "Immutable records, secure archives and no hard delete of GxP data",
    standards: ALL_STANDARDS,
  },
  {
    text: "Digital signatures capturing signer, time and meaning on every approval",
    standards: ALL_STANDARDS,
  },
  {
    text: "Role-based access control, down to the individual field",
    standards: ALL_STANDARDS,
  },
  {
    text: "Segregation of duties enforced in the system, maker is never checker",
    standards: ALL_STANDARDS,
  },
  {
    text: "Linked-record architecture carrying full data lineage end to end",
    standards: ALL_STANDARDS,
  },
  {
    text: "Electronic batch records across MFR, BMR and BPR",
    standards: ALL_STANDARDS,
  },
  {
    text: "SOP governance and document control with version history",
    standards: ["EU Annex 11 / EU GMP", "Revised Schedule M", "PIC/S GMP", "WHO", "ICH Q10 / GAMP 5"],
  },
  {
    text: "FIFO and FEFO with hold, quarantine and release status control",
    standards: ["Revised Schedule M", "PIC/S GMP", "WHO"],
  },
  {
    text: "QC sampling at GRN, IPQC and finished goods, with COA generation",
    standards: ["Revised Schedule M", "PIC/S GMP", "WHO"],
  },
  {
    text: "Deviation detection routed into CAPA with owners and due dates",
    standards: ["Revised Schedule M", "PIC/S GMP", "WHO", "ICH Q10 / GAMP 5"],
  },
  {
    text: "Approval workflows with role-based, re-authenticated sign-off",
    standards: ALL_STANDARDS,
  },
  {
    text: "Production planning with batch, lot and vendor qualification traceability throughout",
    standards: ALL_STANDARDS,
  },
  {
    text: "Validation-ready workflows with URS, IQ, OQ, PQ traceability matrices",
    standards: ALL_STANDARDS,
  },
  {
    text: "Audit-ready exports in inspector-readable form, on demand",
    standards: ALL_STANDARDS,
  },
  {
    text: "Training tied to document version, reassigned on every revision",
    standards: ["EU Annex 11 / EU GMP", "Revised Schedule M", "PIC/S GMP", "WHO", "ICH Q10 / GAMP 5"],
  },
  {
    text: "ALCOA+ data integrity enforced across every record, attributable through to available",
    standards: ALL_STANDARDS,
  },
  {
    text: "Self-inspection scheduling and Annual Product Quality Review",
    standards: ["Revised Schedule M", "PIC/S GMP", "WHO", "ICH Q10 / GAMP 5"],
  },
  {
    text: "Automated redundant backup with point-in-time disaster recovery",
    standards: ALL_STANDARDS,
  },
  {
    text: "Quality Risk Management with risk register and FMEA scoring",
    standards: ["Revised Schedule M", "PIC/S GMP", "WHO", "ICH Q10 / GAMP 5"],
  },
  {
    text: "Dedicated site and equipment segregation between food-grade and drug manufacturing",
    standards: ["Revised Schedule M", "PIC/S GMP"],
  },
];

export interface ComplianceCoverageRow {
  standard: string;
  region: string;
  flag: string;
  min: number;
  max: number;
}

export const COMPLIANCE_COVERAGE: ComplianceCoverageRow[] = [
  { standard: "FDA 21 CFR Part 11", region: "United States", flag: "🇺🇸", min: 92, max: 95 },
  { standard: "EU Annex 11 / EU GMP", region: "European Union", flag: "🇪🇺", min: 93, max: 96 },
  { standard: "Revised Schedule M", region: "India", flag: "🇮🇳", min: 92, max: 95 },
  { standard: "PIC/S GMP", region: "APAC", flag: "🌏", min: 92, max: 95 },
  { standard: "WHO GMP", region: "Africa / Global", flag: "🌍", min: 90, max: 94 },
  { standard: "ICH Q10 / GAMP 5", region: "Global", flag: "🌐", min: 90, max: 95 },
];

export interface ComplianceTimelineEntry {
  status: "applied" | "monitoring" | "upcoming";
  date: string;
  title: string;
  description: string;
}

export const COMPLIANCE_TIMELINE: ComplianceTimelineEntry[] = [
  {
    status: "applied",
    date: "2023",
    title: "Revised Schedule M alignment",
    description:
      "India's updated GMP schedule folded into the rule set and validated ahead of the effective date — nothing for a client to configure.",
  },
  {
    status: "applied",
    date: "2023",
    title: "Schedule M facility segregation",
    description:
      "Revised Schedule M's requirement to keep drug manufacturing separate from food-grade production, reflected in how sites, equipment and warehouse zones are modelled — not just written into an SOP.",
  },
  {
    status: "applied",
    date: "2023",
    title: "ICH Q9(R1) quality risk management",
    description:
      "Revised QRM guidance reflected in the CAPA and change-control workflows, re-validated before it went live.",
  },
  {
    status: "monitoring",
    date: "Ongoing",
    title: "EU Annex 11 review cycle",
    description:
      "Tracking the EU's periodic review of computerised-systems requirements ahead of the next revision.",
  },
  {
    status: "monitoring",
    date: "Ongoing",
    title: "US FDA Part 11 modernization",
    description:
      "Watching FDA guidance on electronic records and signatures for changes ahead of the next rule update.",
  },
  {
    status: "monitoring",
    date: "Ongoing",
    title: "PIC/S GMP guide revisions",
    description:
      "Tracking PIC/S's rolling updates to the GMP guide for changes that affect segregation, data integrity and quality-system expectations.",
  },
];
