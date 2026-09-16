import type { LucideIcon } from "lucide-react";
import {
  Pill,
  Stethoscope,
  Wheat,
  Leaf,
  Sparkles,
  Dog,
  FlaskConical,
} from "lucide-react";

export interface IndustryControl {
  text: string;
  /** Matches a ComplianceMatrixRow.area on the same Industry — the standards
   *  a control satisfies are derived from that row rather than duplicated
   *  here, so the two can't drift apart. */
  area: string;
}

export interface ComplianceMatrixRow {
  area: string;
  /** One boolean per entry in the parent Industry's `matrixStandards`. */
  marks: boolean[];
}

export interface MappedStandard {
  name: string;
  region: string;
  /** Exact string in `matrixStandards` this corresponds to, when the source
   *  doc's compliance matrix gave it a dedicated column. Some mapped
   *  standards (a reporting-only regulation, a lab-methods guideline) don't
   *  get their own column — omit this field for those, and they're shown
   *  informationally but excluded from the interactive filter and the
   *  coverage-by-geography section, which both need real matrix data. */
  matrixName?: string;
}

/** The standards a control satisfies, derived from its matrix row. */
export function controlStandards(industry: Industry, control: IndustryControl): string[] {
  const row = industry.matrix.find((r) => r.area === control.area);
  if (!row) return [];
  return industry.matrixStandards.filter((_, i) => row.marks[i]);
}

const REGION_FLAGS: Record<string, string> = {
  "United States": "🇺🇸",
  "European Union": "🇪🇺",
  "EU": "🇪🇺",
  India: "🇮🇳",
  Global: "🌐",
  APAC: "🌏",
  "US / EU": "🌐",
};

export function regionFlag(region: string): string {
  return REGION_FLAGS[region] ?? "🌐";
}

export interface StandardCoverage {
  name: string;
  region: string;
  flag: string;
  matchedControls: number;
  totalControls: number;
  percent: number;
}

/** Standards with real matrix data behind them — the ones the interactive
 *  filter and the coverage section can actually compute from. */
export function matrixBackedStandards(industry: Industry): MappedStandard[] {
  return industry.mappedStandards.filter((s) => s.matrixName);
}

/** Real coverage per matrix-backed standard — the share of this industry's
 *  own controls that satisfy it — rather than a hand-picked estimate. */
export function standardCoverage(industry: Industry): StandardCoverage[] {
  return matrixBackedStandards(industry).map((standard) => {
    const matched = industry.controls.filter((control) =>
      controlStandards(industry, control).includes(standard.matrixName!),
    ).length;
    return {
      name: standard.name,
      region: standard.region,
      flag: regionFlag(standard.region),
      matchedControls: matched,
      totalControls: industry.controls.length,
      percent: Math.round((matched / industry.controls.length) * 100),
    };
  });
}

export interface IndustryTable {
  heading: string;
  columns: string[];
  rows: { cells: string[] }[];
}

export interface IndustryExtraSection {
  heading: string;
  intro?: string;
  bullets?: string[];
  table?: IndustryTable;
}

export interface RegulatoryTimelineEntry {
  status: "applied" | "monitoring" | "upcoming";
  date: string;
  title: string;
  description: string;
}

export interface BuiltForEntry {
  /** A CoreModule tag/name this capability lives in, e.g. "Production". */
  module: string;
  detail: string;
}

export interface Industry {
  id: string;
  slug: string;
  icon: LucideIcon;
  name: string;
  tagline: string;
  summary: string;
  mappedStandards: MappedStandard[];
  narrativeHeading: string;
  narrative: string[];
  /** How the actual product — specific modules — is tailored for this
   *  industry, as distinct from the regulatory-mapping content below. */
  builtFor: BuiltForEntry[];
  controls: IndustryControl[];
  matrixStandards: string[];
  matrix: ComplianceMatrixRow[];
  /** Feeds "We watch the regulations so you don't have to" — real dated
   *  regulatory change facts from the mapped standards, not a fabricated
   *  status feed. */
  regulatoryTimeline: RegulatoryTimelineEntry[];
  extras: IndustryExtraSection[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "pharmaceuticals",
    slug: "pharmaceuticals",
    icon: Pill,
    name: "Pharmaceuticals",
    tagline: "The batch record writes itself as the batch runs",
    summary:
      "Ninety-six control points, validated in live pilot runs with pharmaceutical manufacturers. The batch record writes itself as the batch runs, quality is the gate rather than the review, and the audit pack is a download because the evidence was never scattered. Validation-ready for 21 CFR Part 11, EU Annex 11 and Revised Schedule M, with ISO 27001 in progress, and kept current with regulatory change as part of the product, at no extra cost.",
    mappedStandards: [
      { name: "FDA 21 CFR Part 11", region: "United States", matrixName: "21 CFR Part 11" },
      { name: "EU Annex 11 / EU GMP", region: "European Union", matrixName: "EU Annex 11" },
      { name: "Revised Schedule M", region: "India", matrixName: "Revised Schedule M" },
      { name: "PIC/S GMP", region: "APAC", matrixName: "PIC/S GMP" },
      { name: "WHO", region: "Global", matrixName: "WHO" },
      { name: "ICH Q10 / GAMP 5", region: "Global", matrixName: "ICH Q10 / GAMP 5" },
    ],
    narrativeHeading: "Schedule M stopped being a deadline and became an inspection",
    narrative: [
      "For two years Revised Schedule M was something to prepare for. It is not any more. The deadline for manufacturers above ₹250 crore passed in June 2024, the conditional extension for everyone below ended on 31 December 2025, and state drug controllers have been filing monthly inspection reports to CDSCO since November 2025. There is no turnover band left with a grace period.",
      "What Schedule M asks for is not a document exercise. Pharmaceutical quality system, quality risk management, product quality review, lifecycle validation, computerised system controls and data integrity are continuous obligations, and they are only continuous if the system produces them as a by-product of the work. Assembling them in the fortnight before an inspection is the thing the regulation was written to stop.",
    ],
    builtFor: [
      { module: "Production", detail: "eBMR and eBPR execution — dispensing requires second-person verification, and line clearance blocks the next stage until the previous one is closed." },
      { module: "Quality", detail: "In-process results attach to the stage that produced them, with out-of-specification and out-of-trend investigation routed automatically." },
      { module: "Inventory", detail: "Quarantined material is structurally refused at the point of dispensing — the control is the system, not a label on a drum." },
      { module: "Facility", detail: "Calibration blocks the stage the moment it lapses, instead of surfacing weeks later as a batch-level finding." },
    ],
    controls: [
      { text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason", area: "Audit trail & data integrity" },
      { text: "Immutable records, secure archives and no hard delete of GxP data", area: "Audit trail & data integrity" },
      { text: "Re-authenticated approvals capturing the approver, time and meaning on every sign-off", area: "Approvals & sign-off" },
      { text: "Role-based access control, down to the individual field", area: "Access control & segregation of duties" },
      { text: "Segregation of duties enforced in the system, maker is never checker", area: "Access control & segregation of duties" },
      { text: "Linked-record architecture carrying full data lineage end to end", area: "Data lineage & traceability" },
      { text: "Electronic batch records across MFR, BMR and BPR", area: "Batch & production records" },
      { text: "SOP governance and document control with version history", area: "Document, training & SOP control" },
      { text: "FIFO and FEFO with hold, quarantine and release status control", area: "Material status & QC sampling" },
      { text: "QC sampling at GRN, IPQC and finished goods, with COA generation", area: "Material status & QC sampling" },
      { text: "Deviation detection routed into CAPA with owners and due dates", area: "Deviation, CAPA & inspection readiness" },
      { text: "Approval workflows with role-based, re-authenticated sign-off", area: "Approvals & sign-off" },
      { text: "Production planning with batch, lot and vendor qualification traceability throughout", area: "Batch & production records" },
      { text: "Validation-ready workflows with URS, IQ, OQ, PQ traceability matrices", area: "Computerized systems validation" },
      { text: "Audit-ready exports in inspector-readable form, on demand", area: "Audit trail & data integrity" },
      { text: "Training tied to document version, reassigned on every revision", area: "Document, training & SOP control" },
      { text: "ALCOA+ data integrity enforced across every record, attributable through to available", area: "Audit trail & data integrity" },
      { text: "Self-inspection scheduling and Annual Product Quality Review", area: "Deviation, CAPA & inspection readiness" },
      { text: "Automated redundant backup with point-in-time disaster recovery", area: "Backup & disaster recovery" },
      { text: "Quality Risk Management with risk register and FMEA scoring", area: "Quality risk management" },
    ],
    matrixStandards: ["21 CFR Part 11", "EU Annex 11", "Revised Schedule M", "PIC/S GMP", "WHO", "ICH Q10 / GAMP 5"],
    matrix: [
      { area: "Audit trail & data integrity", marks: [true, true, true, true, true, true] },
      { area: "Approvals & sign-off", marks: [true, true, true, true, true, true] },
      { area: "Access control & segregation of duties", marks: [true, true, true, true, true, true] },
      { area: "Data lineage & traceability", marks: [true, true, true, true, true, true] },
      { area: "Batch & production records", marks: [true, true, true, true, true, true] },
      { area: "Document, training & SOP control", marks: [false, true, true, true, true, true] },
      { area: "Material status & QC sampling", marks: [false, false, true, true, true, false] },
      { area: "Deviation, CAPA & inspection readiness", marks: [false, false, true, true, true, true] },
      { area: "Computerized systems validation", marks: [true, true, true, true, true, true] },
      { area: "Backup & disaster recovery", marks: [true, true, true, true, true, true] },
      { area: "Quality risk management", marks: [false, false, true, true, true, true] },
    ],
    regulatoryTimeline: [
      {
        status: "applied",
        date: "Live now",
        title: "Revised Schedule M enforcement",
        description:
          "No grace period across every turnover band, with state drug controllers reporting inspections monthly to CDSCO.",
      },
      {
        status: "monitoring",
        date: "In revision",
        title: "EudraLex Volume 4 Annex 11 & new Annex 22",
        description:
          "Chapter 4 on documentation and Annex 11 on computerised systems, alongside a new Annex 22 on artificial intelligence. Public consultation closed in October 2025, and the pack follows the revisions into the product as they land.",
      },
    ],
    extras: [],
  },
  {
    id: "medical-devices",
    slug: "medical-devices",
    icon: Stethoscope,
    name: "Medical Devices",
    tagline: "The device file assembles itself as the work happens",
    summary:
      "Design control, production and post-market surveillance on one record, with the device file assembling itself as the work happens. Validation-ready for 21 CFR Part 820 as amended by the Quality Management System Regulation, ISO 13485:2016 and EU MDR, and kept current with regulatory change as part of the product, at no extra cost.",
    mappedStandards: [
      { name: "FDA 21 CFR Part 820 / QMSR", region: "United States", matrixName: "21 CFR 820 / QMSR" },
      { name: "ISO 13485:2016", region: "Global", matrixName: "ISO 13485" },
      { name: "ISO 14971:2019", region: "Global", matrixName: "ISO 14971" },
      { name: "EU MDR 2017/745", region: "European Union", matrixName: "EU MDR" },
      { name: "Medical Devices Rules 2017", region: "India", matrixName: "MDR 2017 India" },
      { name: "21 CFR Part 803 / MDR vigilance", region: "US / EU" },
    ],
    narrativeHeading: "Your quality system is the regulation now",
    narrative: [
      "Since 2 February 2026 the FDA no longer maintains a separate quality system rulebook. Part 820 incorporates ISO 13485:2016 directly, and the vocabulary the industry used for thirty years went with it. Device master records, device history records and design history files are no longer regulatory terms. What replaced them are the ISO 13485 medical device file and design and development file, plus a short list of FDA-specific record content that ISO does not cover.",
      "Two changes matter more than the renaming. Management review, internal audit and supplier audit records are now inspectable, having been explicitly shielded under the old rule. And Section 820.35 still requires complaint record data elements, servicing records and the UDI recorded for each device or batch, which a system built to ISO 13485 alone will miss.",
    ],
    builtFor: [
      { module: "Library", detail: "The medical device file and design & development file assemble continuously from specification, manufacturing, packaging and labelling records already in the system." },
      { module: "Production", detail: "UDI recorded per device or batch, with GUDID and EUDAMED attribute changes tracked automatically on a 30-day clock." },
      { module: "CAPA", detail: "Complaint intake carries the prescribed data elements and reporting clock from the moment it's logged; nonconformities need an effectiveness review before they can close." },
      { module: "Facility", detail: "Servicing records are held to the same controls as production records, not tracked in a separate spreadsheet." },
    ],
    controls: [
      { text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason", area: "Audit trail & data integrity" },
      { text: "Medical device file assembled continuously from specification, manufacturing, packaging, labelling and servicing information", area: "Medical device file" },
      { text: "Design and development file carrying inputs, outputs, reviews, verification, validation and transfer", area: "Design & development control" },
      { text: "Design change traceability, so a change reaches the risk file and the affected released records", area: "Design & development control" },
      { text: "Risk management file to ISO 14971, linked to the process steps that implement each control measure", area: "Risk management" },
      { text: "Role-based access control, down to the individual field", area: "Access control & segregation of duties" },
      { text: "Segregation of duties enforced in the system, maker is never checker", area: "Access control & segregation of duties" },
      { text: "Re-authenticated approvals capturing the approver, time and meaning on every release", area: "Access control & segregation of duties" },
      { text: "UDI recorded per device or batch, with GUDID and EUDAMED attribute changes tracked on a 30-day clock", area: "UDI & labelling control" },
      { text: "Labelling and packaging examination documented before release, per Section 820.45", area: "UDI & labelling control" },
      { text: "Device batch and unit records with full material and process genealogy", area: "Production & batch records" },
      { text: "Complaint intake with prescribed data elements and the reporting clock attached", area: "Complaints & vigilance" },
      { text: "Vigilance and MDR reporting routed by jurisdiction against the correct deadline", area: "Complaints & vigilance" },
      { text: "Servicing records held to the same controls as production records", area: "Medical device file" },
      { text: "Management review, internal audit and supplier audit records under full access control and retention", area: "Supplier & outsourcing control" },
      { text: "Supplier qualification with audit history and re-qualification scheduling", area: "Supplier & outsourcing control" },
      { text: "Nonconformity and CAPA with owners, due dates and effectiveness review before closure", area: "Complaints & vigilance" },
      { text: "Post-market surveillance data flowing into PSUR preparation", area: "Post-market surveillance" },
      { text: "Process validation and equipment qualification with IQ, OQ, PQ and calibration history", area: "Validation & qualification" },
      { text: "Training tied to document version, reassigned on every revision", area: "Validation & qualification" },
    ],
    matrixStandards: ["21 CFR 820 / QMSR", "ISO 13485", "ISO 14971", "EU MDR", "MDR 2017 India"],
    matrix: [
      { area: "Audit trail & data integrity", marks: [true, true, false, true, true] },
      { area: "Medical device file", marks: [true, true, false, true, true] },
      { area: "Design & development control", marks: [true, true, true, true, true] },
      { area: "Risk management", marks: [true, true, true, true, true] },
      { area: "Access control & segregation of duties", marks: [true, true, false, true, true] },
      { area: "Production & batch records", marks: [true, true, false, true, true] },
      { area: "UDI & labelling control", marks: [true, true, false, true, false] },
      { area: "Complaints & vigilance", marks: [true, true, false, true, true] },
      { area: "Post-market surveillance", marks: [true, true, true, true, true] },
      { area: "Supplier & outsourcing control", marks: [true, true, false, true, true] },
      { area: "Validation & qualification", marks: [true, true, false, true, true] },
    ],
    regulatoryTimeline: [
      {
        status: "upcoming",
        date: "28 Nov 2026",
        title: "EUDAMED legacy device registration closes",
        description:
          "Devices placed on the EU market before 28 May 2026 and still sold must be registered in the UDI and device module.",
      },
      {
        status: "upcoming",
        date: "26 May 2027",
        title: "Notified body application gate",
        description: "For Class B and Class A sterile in vitro diagnostics.",
      },
      {
        status: "upcoming",
        date: "31 Dec 2027",
        title: "EU MDR legacy certificates expire",
        description: "For Class III and implantable Class IIb devices.",
      },
      {
        status: "upcoming",
        date: "31 Dec 2028",
        title: "EU MDR legacy certificates expire",
        description:
          "For Class IIa, non-implantable Class IIb and the remaining Class I categories.",
      },
    ],
    extras: [
      {
        heading: "Reporting clocks the system runs",
        intro:
          "The same event carries a different deadline in each market. The pack starts the right timer, names an owner and escalates before it expires.",
        table: {
          heading: "Reporting clocks",
          columns: ["Jurisdiction", "Trigger", "Clock"],
          rows: [
            { cells: ["United States, 21 CFR Part 803", "Death, serious injury or reportable malfunction", "30 calendar days"] },
            { cells: ["United States, 21 CFR Part 803", "Event requiring remedial action to prevent unreasonable risk", "5 working days"] },
            { cells: ["EU MDR Article 87", "Serious public health threat", "2 calendar days"] },
            { cells: ["EU MDR Article 87", "Death or unanticipated serious deterioration in health", "10 calendar days"] },
            { cells: ["EU MDR Article 87", "Other serious incidents", "15 calendar days"] },
          ],
        },
      },
      {
        heading: "India licensing, built in",
        intro:
          "Class A and B devices are licensed by the state authority on Form MD-5, Class C and D centrally on Form MD-9, and since October 2025 Class A and B applicants need central risk classification before applying to the state. The pack holds the Fifth Schedule quality management system, the plant master file and the device master files in the shape an audit reads them, whether that audit comes from a CDSCO-registered notified body or from CDSCO directly.",
      },
    ],
  },
  {
    id: "food-beverage",
    slug: "food-beverage",
    icon: Wheat,
    name: "Food & Beverage",
    tagline: "The HACCP plan as something that executes",
    summary:
      "The HACCP plan as something that executes, not something that sits in a binder. Every critical control point monitored at the frequency the plan specifies, every corrective action bound to the product it affected, and every lot traceable end to end. Validation-ready for FSSAI Schedule 4, FSSC 22000 and 21 CFR Part 117, and kept current with regulatory change as part of the product, at no extra cost.",
    mappedStandards: [
      { name: "FSSAI Schedule 4 Part II", region: "India", matrixName: "FSSAI Schedule 4" },
      { name: "Codex CXC 1-1969 HACCP", region: "Global", matrixName: "Codex HACCP" },
      { name: "FSSC 22000 / ISO 22000:2018", region: "Global", matrixName: "FSSC 22000" },
      { name: "BRCGS Food Safety", region: "Global", matrixName: "BRCGS" },
      { name: "21 CFR Part 117", region: "United States", matrixName: "21 CFR 117" },
      { name: "FSMA 204, 21 CFR Part 1 Subpart S", region: "United States", matrixName: "FSMA 204" },
    ],
    narrativeHeading: "A critical control point that was not recorded was not monitored",
    narrative: [
      "That is the argument every food auditor makes, and it is the one most plants lose. Your team checks the temperature. The question at audit is whether anyone can prove it, at what frequency, against a validated limit, with the corrective action attached when it drifted and the affected product held.",
      "The 2020 revision of Codex put validation into principles three and six, which means a critical limit now has to be justified, not just set. Underneath the statutory floor sits a commercial ceiling: FSSC 22000 or BRCGS is what your buyer demands, and it is usually stricter than the law.",
    ],
    builtFor: [
      { module: "Quality", detail: "The HACCP plan lives as an executable object — CCP monitoring tasks are issued at the frequency the plan specifies, to a named owner, and a missed check raises a deviation automatically." },
      { module: "Inventory", detail: "Allergen status travels with the material, with changeover and cleaning enforced between incompatible runs." },
      { module: "CAPA", detail: "A mock recall runs as a scheduled exercise, producing the trace, the reconciliation and the elapsed time as a record — not a fire drill." },
    ],
    controls: [
      { text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason", area: "Records & retention" },
      { text: "HACCP plan as an executable object, with hazards, control measures, CCPs and validated critical limits held as records", area: "Hazard analysis & CCP determination" },
      { text: "CCP monitoring tasks issued at the frequency the plan specifies, to a named owner", area: "CCP monitoring & corrective action" },
      { text: "A missed check raises a deviation automatically, rather than surfacing as a blank cell at verification", area: "CCP monitoring & corrective action" },
      { text: "Corrective action bound to affected product, with the batch or time window held and the disposition recorded", area: "CCP monitoring & corrective action" },
      { text: "Prerequisite programme records covering hygiene, pest control, sanitation and maintenance", area: "Prerequisite programmes" },
      { text: "Allergen status travelling with the material, with changeover and cleaning enforced between incompatible runs", area: "Allergen control" },
      { text: "Allergen declaration checked against actual formulation, across the eight Indian, nine US and fourteen EU lists", area: "Allergen control" },
      { text: "Traceability lot codes carried end to end, received, retained through transformation and passed on", area: "Traceability lot code through the chain" },
      { text: "One-up, one-back supplier and customer records on every lot", area: "Lot traceability" },
      { text: "Mock recall as a scheduled exercise, producing the trace, the reconciliation and the elapsed time as a record", area: "Recall & withdrawal" },
      { text: "Recall plan with classification, notification and effectiveness checks", area: "Recall & withdrawal" },
      { text: "Role-based access control, down to the individual field", area: "Records & retention" },
      { text: "Segregation of duties enforced in the system, maker is never checker", area: "Records & retention" },
      { text: "FoSTaC supervisor ratios tracked live, one certified supervisor per 25 food handlers or part thereof", area: "Training & competence" },
      { text: "Training tied to document version, reassigned on every revision", area: "Training & competence" },
      { text: "Supplier approval and incoming material verification with certificate capture", area: "Supplier approval" },
      { text: "Calibration of monitoring equipment blocking the stage when overdue", area: "Validation & verification" },
      { text: "Environmental and product testing scheduled, with results attached to the lot", area: "Validation & verification" },
      { text: "Automated redundant backup with point-in-time disaster recovery", area: "Records & retention" },
    ],
    matrixStandards: ["FSSAI Schedule 4", "Codex HACCP", "FSSC 22000", "BRCGS", "21 CFR 117", "FSMA 204"],
    matrix: [
      { area: "Hazard analysis & CCP determination", marks: [true, true, true, true, true, false] },
      { area: "CCP monitoring & corrective action", marks: [true, true, true, true, true, false] },
      { area: "Validation & verification", marks: [true, true, true, true, true, false] },
      { area: "Prerequisite programmes", marks: [true, true, true, true, true, false] },
      { area: "Allergen control", marks: [true, true, true, true, true, false] },
      { area: "Lot traceability", marks: [true, true, true, true, true, true] },
      { area: "Traceability lot code through the chain", marks: [false, false, true, true, false, true] },
      { area: "Recall & withdrawal", marks: [true, true, true, true, true, false] },
      { area: "Supplier approval", marks: [true, true, true, true, true, false] },
      { area: "Training & competence", marks: [true, true, true, true, true, false] },
      { area: "Records & retention", marks: [true, true, true, true, true, true] },
    ],
    regulatoryTimeline: [
      {
        status: "applied",
        date: "1 Apr 2026",
        title: "FSSAI licensing turnover tiers reset",
        description:
          "Basic registration runs to ₹1.5 crore, state licence from ₹1.5 crore to ₹50 crore, central licence above ₹50 crore.",
      },
      {
        status: "upcoming",
        date: "30 Apr 2027",
        title: "Last date FSSC 22000 Version 6 audits accepted",
        description: "",
      },
      {
        status: "upcoming",
        date: "1 May 2027",
        title: "FSSC 22000 Version 7 upgrade audits begin",
        description: "Moving prerequisite programmes onto the ISO 22002 2025 series.",
      },
      {
        status: "upcoming",
        date: "30 Apr 2028",
        title: "FSSC 22000 Version 7 transition completes",
        description: "",
      },
      {
        status: "upcoming",
        date: "20 Jul 2028",
        title: "FSMA 204 compliance deadline",
        description: "For foods on the Food Traceability List.",
      },
    ],
    extras: [
      {
        heading: "Traceability, precisely",
        intro: "There are two obligations here and they are routinely confused.",
        bullets: [
          "One up, one back is the baseline everywhere. India under the FSS Act framework, the United States under 21 CFR Part 1 Subpart J, and the European Union under Regulation 178/2002 Article 18. You must know your immediate supplier and your immediate customer.",
          "FSMA 204 goes further for listed foods. The traceability lot code has to survive the whole chain, which means it must be received, retained through transformation and passed on. That is a data discipline problem, and it is the one that catches manufacturers out.",
          "The 24-hour test is what the rule actually measures. FDA can ask for an electronic sortable spreadsheet covering critical tracking events and key data elements, and it has to arrive within a day. In Factro that is an export, not a fortnight of reconstruction.",
        ],
      },
    ],
  },
  {
    id: "nutraceuticals",
    slug: "nutraceuticals",
    icon: Leaf,
    name: "Nutraceuticals",
    tagline: "Identity testing enforced as a gate, not a certificate",
    summary:
      "Master manufacturing records per formulation and per batch size, identity testing enforced as a gate, and yield measured against theoretical at every control point. Validation-ready for 21 CFR Part 111 and FSSAI health supplement requirements, and kept current with regulatory change as part of the product, at no extra cost.",
    mappedStandards: [
      { name: "21 CFR Part 111", region: "United States", matrixName: "21 CFR 111" },
      { name: "21 CFR Part 117 Subpart B", region: "United States", matrixName: "21 CFR 117 Sub B" },
      { name: "FSSAI health supplements", region: "India", matrixName: "FSSAI" },
      { name: "FSSAI Schedule 4 Part II", region: "India" },
      { name: "Directive 2002/46/EC", region: "European Union", matrixName: "EU 2002/46/EC" },
      { name: "Regulation (EU) 2015/2283", region: "European Union", matrixName: "EU 2015/2283" },
    ],
    narrativeHeading: "Every dietary ingredient gets tested. A certificate is not a substitute",
    narrative: [
      "Section 111.75(a)(1)(i) is the clause that fails audits. It requires at least one appropriate test to verify the identity of every component that is a dietary ingredient, before use. A supplier certificate does not discharge it. Certificates can be relied on for components that are not dietary ingredients, and only after you have qualified the supplier by confirming their results yourself, with the certificate stating the method, the limits and the actual results.",
      "The second thing that catches plants is arithmetic. A master manufacturing record is required for each unique formulation and each batch size, so four products across three pack sizes is twelve records, not four, and they have to stay consistent with each other through every change.",
    ],
    builtFor: [
      { module: "Library", detail: "Master manufacturing records generate per formulation and per batch size, inheriting a single formulation change under change control instead of twelve records drifting apart." },
      { module: "Production", detail: "Separate attribution for weighing, verifying the weighing, adding and verifying the addition — each component, every batch." },
      { module: "Quality", detail: "Identity testing is enforced as a gate, so an untested dietary ingredient cannot be dispensed onto the floor." },
    ],
    controls: [
      { text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason", area: "Audit trail & data integrity" },
      { text: "Specifications across all seven Section 111.70 categories, each versioned and separately approved", area: "Specification setting" },
      { text: "Master manufacturing records generated per formulation and per batch size, inheriting a single formulation change under change control", area: "Master manufacturing record" },
      { text: "Theoretical yield at each control point with maximum and minimum deviation limits that trigger investigation", area: "Yield & deviation limits" },
      { text: "Identity testing enforced as a gate, so an untested dietary ingredient cannot be dispensed", area: "Component identity testing" },
      { text: "Supplier qualification recorded as evidence, with confirming results and periodic re-confirmation", area: "Supplier qualification" },
      { text: "Certificate content checked on intake for method, limits and actual results", area: "Supplier qualification" },
      { text: "Batch production records created for every batch, following the master record exactly", area: "Batch production record" },
      { text: "Separate attribution for weighing, verifying the weighing, adding and verifying the addition of each component", area: "Batch production record" },
      { text: "Actual yield against percentage of theoretical recorded at close", area: "Yield & deviation limits" },
      { text: "Label reconciliation and material review disposition on the same record", area: "Labelling & claims control" },
      { text: "Declared intentional overage carried on the master record", area: "Master manufacturing record" },
      { text: "Reprocessing documented with quality approval before and after", area: "Batch production record" },
      { text: "Quality control documentation recorded at the time of performance, not reconstructed", area: "Hygiene & manufacturing practice" },
      { text: "Role-based access control, down to the individual field", area: "Audit trail & data integrity" },
      { text: "Segregation of duties enforced in the system, maker is never checker", area: "Audit trail & data integrity" },
      { text: "Adverse event intake on the 15 business day clock, with six year retention applied automatically", area: "Adverse event reporting" },
      { text: "FIFO and FEFO with hold, quarantine and release status control", area: "Hygiene & manufacturing practice" },
      { text: "Training tied to document version, reassigned on every revision", area: "Hygiene & manufacturing practice" },
      { text: "Automated redundant backup with point-in-time disaster recovery", area: "Audit trail & data integrity" },
    ],
    matrixStandards: ["21 CFR 111", "21 CFR 117 Sub B", "FSSAI", "EU 2002/46/EC", "EU 2015/2283"],
    matrix: [
      { area: "Audit trail & data integrity", marks: [true, true, true, false, false] },
      { area: "Specification setting", marks: [true, false, true, true, true] },
      { area: "Component identity testing", marks: [true, false, true, false, false] },
      { area: "Master manufacturing record", marks: [true, false, true, false, false] },
      { area: "Batch production record", marks: [true, false, true, false, false] },
      { area: "Yield & deviation limits", marks: [true, false, true, false, false] },
      { area: "Supplier qualification", marks: [true, true, true, false, false] },
      { area: "Hygiene & manufacturing practice", marks: [true, true, true, false, false] },
      { area: "Ingredient permissibility", marks: [true, false, true, true, true] },
      { area: "Labelling & claims control", marks: [true, false, true, true, true] },
      { area: "Adverse event reporting", marks: [true, false, false, false, false] },
    ],
    regulatoryTimeline: [
      {
        status: "monitoring",
        date: "Ongoing",
        title: "EU novel-food authorisation status",
        description:
          "An ingredient without significant EU consumption history before 15 May 1997 needs authorisation under Regulation 2015/2283 before it can be sold — the pack holds authorisation status against the material master and checks it at formulation.",
      },
      {
        status: "monitoring",
        date: "Ongoing",
        title: "EU permitted vitamins and minerals",
        description:
          "Harmonised under Annexes I and II of Directive 2002/46/EC, but maximum levels and botanical substances remain national competence — the pack models permissibility per country.",
      },
    ],
    extras: [
      {
        heading: "The specification problem, in full",
        intro:
          "Section 111.70 asks for specifications in seven categories. Each is a separate approval object with its own change history, and proving that a released batch was tested against the version in force on that date is exactly the work a document-and-spreadsheet system loses.",
        bullets: [
          "Process control point specifications at each point where control is necessary",
          "Component specifications covering identity, purity, strength, composition and contamination limits",
          "In-process specifications with documented justification, reviewed and approved by quality control",
          "Label and packaging specifications",
          "Finished batch specifications covering identity, purity, strength, composition and contamination limits",
          "Specifications for product received for repackaging or relabelling",
          "Final packaging and labelling specifications",
        ],
      },
      {
        heading: "Exporting changes the question",
        bullets: [
          "United States. Part 111 governs, and Section 117.5(e) exempts a compliant supplement facility from the hazard analysis and supply chain subparts while leaving Part 117 Subpart B manufacturing practice in force.",
          "European Union. Permitted vitamins and minerals are harmonised under Annexes I and II, but maximum levels and botanical substances remain national competence. The pack models permissibility per country rather than per region.",
          "Novel foods. An ingredient without significant EU consumption history before 15 May 1997 needs authorisation under Regulation 2015/2283, which catches a large share of Indian botanicals. Authorisation status is held against the material master, so it is checked at formulation rather than at customs.",
        ],
      },
    ],
  },
  {
    id: "cosmetics",
    slug: "cosmetics",
    icon: Sparkles,
    name: "Cosmetics",
    tagline: "The Product Information File held continuously",
    summary:
      "The Product Information File held continuously rather than assembled under pressure, ingredient restrictions checked against live annexes, and registration clocks that run themselves. Built to ISO 22716, mapped to MoCRA, EU Regulation 1223/2009 and Cosmetics Rules 2020, and kept current with regulatory change as part of the product, at no extra cost.",
    mappedStandards: [
      { name: "ISO 22716:2007", region: "Global", matrixName: "ISO 22716" },
      { name: "MoCRA", region: "United States", matrixName: "MoCRA" },
      { name: "Regulation (EC) 1223/2009", region: "European Union", matrixName: "EU 1223/2009" },
      { name: "Cosmetics Rules 2020 / Schedule M-II", region: "India", matrixName: "Schedule M-II" },
      { name: "IS 4707 Parts 1–4", region: "India", matrixName: "IS 4707" },
      { name: "ISO 11930:2019", region: "Global" },
    ],
    narrativeHeading: "The obligations arrived before the manufacturing rule did",
    narrative: [
      "MoCRA gave the FDA authority to write a cosmetic manufacturing practice regulation. That regulation has not been published. Meanwhile facility registration, product listing, safety substantiation and serious adverse event reporting are all in force and enforced, and adverse events have been publicly searchable by product name since September 2025. The obligations landed first, which means the records matter more, not less.",
      "ISO 22716 is the standard everyone actually builds to. In the European Union it carries a presumption of conformity with Article 8. India's Schedule M-II is materially thinner: no change control, no internal audit, no out of specification handling, no complaints or recall procedure. We built the pack to ISO 22716 and treat Schedule M-II as a subset of it.",
    ],
    builtFor: [
      { module: "Library", detail: "The Product Information File assembles continuously and stays retained ten years after the last batch placed on the market, instead of being pulled together under pressure." },
      { module: "Inventory", detail: "Retained samples are tracked as inventory, with location, quantity and parent batch, not a shelf someone remembers." },
      { module: "Quality", detail: "Ingredient restriction checking runs against live annexes, flagging every affected formulation the moment a substance is added." },
    ],
    controls: [
      { text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason", area: "Batch documentation" },
      { text: "Product Information File assembled continuously, retained ten years after the last batch placed on the market", area: "Product Information File" },
      { text: "Cosmetic Product Safety Report held with the formulation and batches it covers", area: "Safety assessment & substantiation" },
      { text: "Ingredient restriction checking against live annexes, flagging every affected formulation when a substance is added", area: "Ingredient restriction control" },
      { text: "Batch manufacturing records in the Schedule M-II shape, carrying quantity required against quantity actually used", area: "Batch documentation" },
      { text: "Retained samples tracked as inventory, with location, quantity and parent batch", area: "Retained samples" },
      { text: "Stability and challenge testing results bound to the shelf life and period-after-opening claim", area: "Stability & microbiological quality" },
      { text: "Preservative efficacy testing to ISO 11930, with results attached to the formulation version", area: "Stability & microbiological quality" },
      { text: "Facility registration renewal on its own anniversary, not the calendar year", area: "Registration & notification" },
      { text: "Product listing updated annually with full ingredient detail", area: "Registration & notification" },
      { text: "Safety substantiation records held against each marketed product", area: "Safety assessment & substantiation" },
      { text: "Serious adverse event intake on the 15 business day clock, with the one-year follow-up obligation and six year retention", area: "Adverse event reporting" },
      { text: "Role-based access control, down to the individual field", area: "Batch documentation" },
      { text: "Segregation of duties enforced in the system, maker is never checker", area: "Batch documentation" },
      { text: "Change control across formulation, supplier, process and label", area: "Change control" },
      { text: "Internal audit scheduling with findings routed to CAPA", area: "Internal audit & OOS" },
      { text: "Out of specification handling with investigation and disposition", area: "Internal audit & OOS" },
      { text: "Complaints and recall procedure with classification and effectiveness checks", area: "Complaints & recall" },
      { text: "Subcontracting control with written scope and qualification records", area: "Change control" },
      { text: "Training tied to document version, reassigned on every revision", area: "Batch documentation" },
    ],
    matrixStandards: ["ISO 22716", "MoCRA", "EU 1223/2009", "Schedule M-II", "IS 4707"],
    matrix: [
      { area: "Batch documentation", marks: [true, false, true, true, false] },
      { area: "Product Information File", marks: [true, false, true, false, false] },
      { area: "Safety assessment & substantiation", marks: [false, true, true, false, false] },
      { area: "Ingredient restriction control", marks: [true, true, true, true, true] },
      { area: "Registration & notification", marks: [false, true, true, true, false] },
      { area: "Retained samples", marks: [true, false, true, false, false] },
      { area: "Stability & microbiological quality", marks: [true, true, true, true, true] },
      { area: "Adverse event reporting", marks: [false, true, true, false, false] },
      { area: "Change control", marks: [true, false, true, false, false] },
      { area: "Internal audit & OOS", marks: [true, false, true, false, false] },
      { area: "Complaints & recall", marks: [true, true, true, false, false] },
    ],
    regulatoryTimeline: [
      {
        status: "applied",
        date: "In force",
        title: "MoCRA obligations",
        description:
          "Facility registration on a two-year renewal, annual product listing, safety substantiation, serious adverse event reporting and FDA mandatory recall authority.",
      },
      {
        status: "applied",
        date: "9 Feb 2026",
        title: "IS 4707 Part 2:2025 in force",
        description:
          "Replaced the 2017 prohibited and restricted ingredient standard in India. Part 3:2025 on permitted preservatives took effect 9 August 2025.",
      },
      {
        status: "applied",
        date: "1 May 2026",
        title: "EU Omnibus Act VIII applied",
        description: "Non-compliant stock had to be off the market.",
      },
      {
        status: "upcoming",
        date: "1 Feb 2027",
        title: "EU Omnibus Act IX applies",
        description: "Carrying new CMR classifications and recent scientific committee opinions.",
      },
    ],
    extras: [
      {
        heading: "India licensing, built in",
        intro:
          "Manufacturing is applied for on Form COS-5, or COS-6 for a loan licence, and granted as COS-8 or COS-9 within 45 days, perpetual thereafter subject to the five-yearly retention fee. Imports run through SUGAM on Form COS-1 to a COS-2 registration certificate, with secondary registration on COS-4 valid three years and new-ingredient approval on COS-12. The pack holds the licence register, the renewal clocks and the Schedule M-II batch record fields an inspector reads first.",
      },
    ],
  },
  {
    id: "veterinary",
    slug: "veterinary",
    icon: Dog,
    name: "Veterinary",
    tagline: "One unbroken trace from premix to treated animal",
    summary:
      "Sequencing and flush rules enforced before a batch starts, prescription limits treated as hard boundaries, and one unbroken trace from premix to treated animal. Validation-ready for Regulation (EU) 2025/2091, Regulation (EU) 2019/4 and 21 CFR Parts 225 and 226, and kept current with regulatory change as part of the product, at no extra cost.",
    mappedStandards: [
      { name: "Regulation (EU) 2025/2091", region: "European Union", matrixName: "EU 2025/2091" },
      { name: "Regulation (EU) 2025/2154 / VICH GL60", region: "European Union" },
      { name: "Regulation (EU) 2019/6", region: "European Union", matrixName: "EU 2019/6" },
      { name: "Regulation (EU) 2019/4 medicated feed", region: "European Union", matrixName: "EU 2019/4" },
      { name: "21 CFR Parts 225 and 226", region: "United States", matrixName: "21 CFR 225" },
      { name: "21 CFR 558.6 VFD", region: "United States", matrixName: "21 CFR 558.6" },
      { name: "Schedule M, Drugs Rules 1945", region: "India", matrixName: "Schedule M" },
    ],
    narrativeHeading: "Veterinary GMP is its own regulation now",
    narrative: [
      "For decades EudraLex Volume 4 covered human and veterinary manufacturing together. Since 16 July 2026 it does not. Two Commission Implementing Regulations carry veterinary manufacturing practice and veterinary active substance practice in their own right. The requirements remain close to human GMP, but guidance became binding regulation, and that changes the inspection posture rather than the paperwork.",
      "Medicated feed is a second regime on top. Carry-over between batches, prescription validity, treatment duration and the prohibition on antimicrobial prophylaxis are all hard limits, and they are the limits an inspector tests first because they are the ones a production schedule quietly breaks.",
    ],
    builtFor: [
      { module: "Production", detail: "Sequencing rules block an unsafe production order before the batch starts, rather than warning about it after; flush and cleanout record themselves as evidence." },
      { module: "Quality", detail: "Withdrawal period computes and carries to the treated animal automatically, including cascade defaults under Article 115." },
      { module: "CAPA", detail: "Continuous signal management submits suspected adverse events on the 30-day clock, with the qualified person named on the file." },
    ],
    controls: [
      { text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason", area: "Audit trail & data integrity" },
      { text: "Sequencing rules enforced before the batch starts, blocking an unsafe production order rather than warning about it", area: "Carry-over & sequencing control" },
      { text: "Flush and cleanout recorded as evidence, with the flush batch held against the run it protects", area: "Carry-over & sequencing control" },
      { text: "Carry-over limits applied to non-target feed per Annexes I and III", area: "Carry-over & sequencing control" },
      { text: "Homogeneous dispersion verification with assay results attached to the batch", area: "Assay & laboratory controls" },
      { text: "Prescription validity checked against statutory limits, six months for non food producing animals, three weeks for food producing and fur animals, five days for antimicrobials", area: "Prescription & VFD control" },
      { text: "Treatment duration capped, one month for standard medicated feed and two weeks where antibiotics are involved", area: "Prescription & VFD control" },
      { text: "Antimicrobial prophylaxis structurally refused, not flagged", area: "Antimicrobial use restriction" },
      { text: "Veterinary Feed Directive records with the issuing veterinarian, expiry and no-refill rule enforced", area: "Prescription & VFD control" },
      { text: "Assay sampling scheduled against the calendar year requirement, three representative samples per drug with one from the first batch", area: "Assay & laboratory controls" },
      { text: "Master Record File and production records with unique batch identification and full tracing", area: "Batch & production records" },
      { text: "Labelling proofread against the Master Record File, dated and attributed", area: "Labelling control" },
      { text: "Withdrawal period computed and carried to the treated animal, including cascade defaults under Article 115", area: "Withdrawal & residue control" },
      { text: "Premix to medicated feed to prescription to holding to animal, held as one continuous trace", area: "Feed-to-animal traceability" },
      { text: "Maximum residue limit status held against each active substance", area: "Withdrawal & residue control" },
      { text: "Continuous signal management with suspected adverse events submitted on a 30 day clock", area: "Pharmacovigilance" },
      { text: "Pharmacovigilance system master file maintained with a named qualified person", area: "Pharmacovigilance" },
      { text: "Role-based access control, down to the individual field", area: "Audit trail & data integrity" },
      { text: "Segregation of duties enforced in the system, maker is never checker", area: "Audit trail & data integrity" },
      { text: "Retention clocks by record class, five years, two years and one year, applied automatically", area: "Audit trail & data integrity" },
    ],
    matrixStandards: ["EU 2025/2091", "EU 2019/4", "EU 2019/6", "21 CFR 225", "21 CFR 558.6", "Schedule M"],
    matrix: [
      { area: "Audit trail & data integrity", marks: [true, true, true, true, false, true] },
      { area: "Batch & production records", marks: [true, true, true, true, false, true] },
      { area: "Carry-over & sequencing control", marks: [true, true, false, true, false, true] },
      { area: "Prescription & VFD control", marks: [false, true, true, false, true, false] },
      { area: "Antimicrobial use restriction", marks: [false, true, true, false, true, false] },
      { area: "Assay & laboratory controls", marks: [true, true, true, true, false, true] },
      { area: "Labelling control", marks: [true, true, true, true, true, true] },
      { area: "Withdrawal & residue control", marks: [false, true, true, false, true, false] },
      { area: "Feed-to-animal traceability", marks: [false, true, true, true, true, false] },
      { area: "Pharmacovigilance", marks: [false, false, true, false, false, false] },
      { area: "Validation & qualification", marks: [true, true, true, true, false, true] },
    ],
    regulatoryTimeline: [
      {
        status: "applied",
        date: "Since 16 Jul 2026",
        title: "Veterinary GMP split from human GMP",
        description:
          "EudraLex Volume 4 no longer covers human and veterinary manufacturing together. Two Commission Implementing Regulations now carry veterinary manufacturing practice and veterinary active substance practice in their own right — guidance became binding regulation.",
      },
    ],
    extras: [
      {
        heading: "Withdrawal periods the system computes",
        intro:
          "Where a product is used off-label under the cascade, Article 115 sets statutory minimums rather than leaving it to judgement. The pack applies them and records the result against the treated group.",
        bullets: [
          "One and a half times the longest authorised withdrawal period, where one exists",
          "28 days for meat and offal where the product is not authorised for food-producing animals",
          "7 days for milk",
          "10 days for eggs",
          "500 degree-days for aquatic species",
          "One day, or 25 degree-days for aquatic species, for a zero-withdrawal product in a different taxonomic family",
        ],
      },
      {
        heading: "Three retention clocks, one plant",
        intro:
          "This is where veterinary operations most often drift, because the record classes look alike and the obligations do not.",
        bullets: [
          "Five years for US adverse event records under 21 CFR 514.80",
          "Two years for Veterinary Feed Directive records held by veterinarians, distributors and clients",
          "One year for medicated feed production, assay, distribution and drug receipt records under Part 225",
        ],
      },
      {
        heading: "Reporting clocks the system runs",
        table: {
          heading: "Reporting clocks",
          columns: ["Jurisdiction", "Trigger", "Clock"],
          rows: [
            { cells: ["European Union", "Any suspected adverse event, to the Union pharmacovigilance database", "30 days"] },
            { cells: ["United States, 21 CFR 514.80", "Product or manufacturing defect report", "3 working days"] },
            { cells: ["United States, 21 CFR 514.80", "Serious and unexpected adverse drug experience", "15 working days"] },
            { cells: ["United States, 21 CFR 514.80", "Periodic drug experience reports", "Every 6 months for 2 years, then annually"] },
          ],
        },
      },
    ],
  },
  {
    id: "api-cdmo",
    slug: "api-cdmo",
    icon: FlaskConical,
    name: "API & CDMO",
    tagline: "An audit pack that is a filtered view, not a project",
    summary:
      "Scoped client access without a second system, change control routed by each client's agreement, and an audit pack that is a filtered view rather than a project. Validation-ready for ICH Q7, EudraLex Volume 4 Part II and Revised Schedule M, and kept current with regulatory change as part of the product, at no extra cost.",
    mappedStandards: [
      { name: "ICH Q7", region: "Global", matrixName: "ICH Q7" },
      { name: "EudraLex Volume 4 Part II / Chapter 7", region: "European Union", matrixName: "EudraLex Vol 4 Pt II" },
      { name: "Revised Schedule M", region: "India", matrixName: "Revised Schedule M" },
      { name: "WHO TRS 957 Annex 2", region: "Global", matrixName: "WHO TRS 957" },
      { name: "WHO TRS 1044 Annex 4", region: "Global" },
      { name: "ICH Q10 and Q12", region: "Global", matrixName: "ICH Q10 / Q12" },
    ],
    narrativeHeading: "Your client is responsible for a batch you made",
    narrative: [
      "When a contract site runs a batch, the owner remains responsible for compliance with manufacturing practice and the contract facility is a manufacturer in its own right. Two parties, one batch, one record, and no regulation anywhere that assigns ownership of it. Everything difficult about running a contract site descends from that.",
      "What the regulations do fix is that the executed record exists at the site that performed the manufacture, is readily available for inspection, and if electronic is immediately retrievable throughout its retention period. Everything else, retention, format, access rights and what happens when the contract ends, is settled by the quality agreement. Factro is built so the record of truth stays where the regulation puts it while your client still sees what their agreement entitles them to see.",
    ],
    builtFor: [
      { module: "Documents", detail: "Change control routes per client, matching each agreement's own approval and notification thresholds instead of one blanket workflow." },
      { module: "Quality", detail: "Scoped client access — each client sees their batches, deviations, changes and documents, and nothing belonging to another." },
      { module: "Facility", detail: "Cleaning validation and cross-contamination control, including containment tracking for potent materials." },
    ],
    controls: [
      { text: "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason", area: "Audit trail & data integrity" },
      { text: "Scoped client access, where each client sees their batches, deviations, changes and documents and nothing belonging to another", area: "Outsourced activities & quality agreements" },
      { text: "Record of truth held at the manufacturing site, immediately retrievable throughout retention", area: "Outsourced activities & quality agreements" },
      { text: "Certified true copies produced as a controlled act, logging who exported what, for whom and when", area: "Outsourced activities & quality agreements" },
      { text: "Client-specific change control routing, matching each agreement's approval and notification thresholds", area: "Change control" },
      { text: "Evidence of notification, so a change communicated is a record rather than an email", area: "Change control" },
      { text: "Executed batch records with full material, process and equipment genealogy", area: "Executed batch records" },
      { text: "Starting material and key intermediate traceability, container by container where required", area: "Material traceability" },
      { text: "Supplier qualification with audit history and re-qualification scheduling", area: "Supplier qualification" },
      { text: "Deviation, out of specification and out of trend investigation with root cause and CAPA", area: "Laboratory controls" },
      { text: "Audit trail review as a scheduled, evidenced activity, not just an available log", area: "Audit trail & data integrity" },
      { text: "Role-based access control, down to the individual field", area: "Access control & segregation of duties" },
      { text: "Segregation of duties enforced in the system, maker is never checker", area: "Access control & segregation of duties" },
      { text: "Cleaning validation and cross-contamination control, including containment for potent materials", area: "Validation & qualification" },
      { text: "Process validation and equipment qualification with IQ, OQ, PQ and calibration history", area: "Validation & qualification" },
      { text: "Analytical method validation and transfer, with protocol and report held together", area: "Technology transfer" },
      { text: "Technology transfer pack, sending and receiving responsibility matrix, gap assessment and comparability", area: "Technology transfer" },
      { text: "Established conditions checked before a change reaches the floor, per ICH Q12", area: "Change control" },
      { text: "Master file alignment, keeping the open and restricted parts consistent with the process as run", area: "Technology transfer" },
      { text: "Product quality review assembled from records rather than compiled at year end", area: "Product quality review" },
    ],
    matrixStandards: ["ICH Q7", "EudraLex Vol 4 Pt II", "Revised Schedule M", "WHO TRS 957", "ICH Q10 / Q12"],
    matrix: [
      { area: "Audit trail & data integrity", marks: [true, true, true, true, true] },
      { area: "Executed batch records", marks: [true, true, true, true, false] },
      { area: "Access control & segregation of duties", marks: [true, true, true, true, false] },
      { area: "Material traceability", marks: [true, true, true, true, false] },
      { area: "Change control", marks: [true, true, true, true, true] },
      { area: "Outsourced activities & quality agreements", marks: [true, true, true, true, true] },
      { area: "Supplier qualification", marks: [true, true, true, true, false] },
      { area: "Laboratory controls", marks: [true, true, true, true, false] },
      { area: "Validation & qualification", marks: [true, true, true, true, true] },
      { area: "Technology transfer", marks: [true, true, true, true, true] },
      { area: "Product quality review", marks: [true, true, true, true, true] },
    ],
    regulatoryTimeline: [
      {
        status: "applied",
        date: "Live now",
        title: "Revised Schedule M enforcement for API sites",
        description:
          "Where ICH Q7 recommends, Schedule M requires — pharmaceutical quality system, quality risk management, product quality review, lifecycle validation, computerised system controls and data integrity are now obligations on every covered site, with no grace period for any turnover band.",
      },
    ],
    extras: [
      {
        heading: "Schedule M turned should into shall",
        intro:
          "India's revised Schedule M covers active pharmaceutical ingredients in a part structured to mirror ICH Q7 section by section, with one difference that runs through the whole text. Where ICH Q7 recommends, Schedule M requires. Pharmaceutical quality system, quality risk management, product quality review, lifecycle validation, computerised system controls and data integrity are obligations on every covered site, including API sites, and enforcement is live with no grace period for any turnover band.",
      },
      {
        heading: "Audit readiness as a state, not a project",
        intro: "A contract site is audited by its clients continuously, and every audit walks the same ground.",
        bullets: [
          "Deviation and investigation quality, with root cause depth and CAPA effectiveness visible rather than asserted",
          "Audit trail review, evidenced as a performed activity with a reviewer and a date",
          "Change control notification compliance, checked against what each agreement actually required",
          "Supplier qualification and starting material traceability, container by container",
          "Validation and method transfer status, current and linked to the products they cover",
          "Scope it and it assembles. One client, one product, one date range, drawn from records that were never scattered",
        ],
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
