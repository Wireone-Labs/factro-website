import { INDUSTRY_THEMES } from "./industry-themes";

export type IndustryRefresh = {
  accent: string; soft: string; shortName: string; summary: string;
  why: [string,string,string]; reasons: [string,string][];
  factsLabel: string; facts: [string,string][];
  tailored: [string,string]; tailoredTitles: string[];
  detail: [string,string,string,string];
  alert: [string,string,string];
};

export const INDUSTRY_REFRESH: Record<string,IndustryRefresh> = {
  pharmaceuticals: {
    ...INDUSTRY_THEMES.pharmaceuticals, shortName: "Pharma",
    summary: "Quality works as a gate, not a review after the fact. Evidence sits on the record it belongs to, so the audit pack is a download, not a project.",
    why: ["Schedule M is not a deadline.", "It is an inspection now.", "No turnover band has a grace period left. What used to be prepared before an audit now has to exist every day."],
    reasons: [["The obligations are continuous", "A pharmaceutical quality system, quality risk management, product quality review, lifecycle validation, computerised system controls and data integrity."], ["They have to be a by-product of work", "Assembled the week before an inspection, they show that work produced as the batch runs is missing."], ["The same engine runs every industry", "These controls run on the Compliance Engine, the one every Factro pack uses."]],
    factsLabel: "Revised Schedule M · key dates", facts: [["June 2024", "Deadline for manufacturers above ₹250 crore turnover."], ["Nov 2025", "State drug controllers begin monthly inspection reports to CDSCO."], ["31 Dec 2025", "Conditional extension for smaller firms ends."], ["Now", "No turnover band has a grace period left."]],
    tailored: ["Built for the batch,", "not bolted onto it."], tailoredTitles: ["eBMR and eBPR execution", "Results attach to their stage", "Quarantine enforced by the system", "Calibration as a gate"],
    detail: ["Schedule M, continuously", "Six obligations.", "Produced as you work.", "Each continuous obligation in Revised Schedule M, and the records in Factro that answer it."],
    alert: ["Dispensing held", "Second check", "The material needs second-person verification before the next stage opens."],
  },
  "medical-devices": {
    ...INDUSTRY_THEMES["medical-devices"], shortName: "Med Devices",
    summary: "Design control, production and post-market surveillance on one record. Built for 21 CFR Part 820 as amended by the QMSR, ISO 13485:2016 and EU MDR.",
    why: ["Your quality system", "is the regulation now.", "Since 2 February 2026, Part 820 incorporates ISO 13485:2016 directly. The vocabulary changed, and so did what an inspector can ask to see."],
    reasons: [["New names for the device records", "The ISO 13485 medical device file and the design and development file replace the older FDA record terms."], ["More of the system is inspectable", "Management review, internal audit and supplier audit records are now open to inspection."], ["ISO 13485 alone is not enough", "Section 820.35 still asks for complaint data elements, servicing records and UDI per device or batch."]],
    factsLabel: "QMSR at a glance", facts: [["2 Feb 2026", "Part 820 incorporates ISO 13485:2016 by reference."], ["Records", "Medical device file, plus the design and development file."], ["820.35", "Complaint data, servicing records and UDI still required."], ["Inspectable", "Management review, internal and supplier audits."]],
    tailored: ["One record, from design", "to post-market."], tailoredTitles: ["The device file builds itself", "UDI per device or batch", "Complaints with their clock", "Servicing under control"],
    detail: ["Clocks and licences", "Every report has a clock.", "Every clock has an owner.", "The system starts the timer, names an owner and escalates before the deadline. The India pack holds the licensing paperwork inspectors ask for."],
    alert: ["UDI attribute change", "30 days left", "An attribute changed on the device record. Owner: Regulatory affairs."],
  },
  "food-beverage": {
    ...INDUSTRY_THEMES["food-beverage"], shortName: "Food & Bev",
    summary: "CCPs are monitored at the specified frequency, corrective actions are tied to the affected product, and every lot traces end to end. The plan runs, it does not sit in a binder.",
    why: ["A CCP that was not recorded", "was not monitored.", "At audit, a plant has to prove the check happened, how often, against a validated limit, and what followed any drift."],
    reasons: [["Critical limits must be justified", "The 2020 Codex revision put validation into principles three and six."], ["Buyers ask for more than the law", "FSSC 22000 and BRCGS are usually stricter than statutory requirements."], ["A blank cell is a finding", "A missed check has to raise a deviation, not sit empty until someone notices."]],
    factsLabel: "What an auditor asks", facts: [["Did it happen", "The monitoring record, with owner and time."], ["How often", "Against the frequency in the HACCP plan."], ["Against what", "A validated critical limit."], ["And then", "Corrective action, product hold and disposition."]],
    tailored: ["The plan runs.", "The floor follows it."], tailoredTitles: ["HACCP as an executable object", "Allergens travel with material", "Mock recalls on a schedule"],
    detail: ["Traceability, precisely", "One up, one back.", "Ready in 24 hours.", "The baseline is the same in India, the US and the EU. FSMA 204 raises it for listed foods, and the FDA can ask for the proof within a day."],
    alert: ["CCP-2 check missed", "Deviation raised", "Pasteuriser outlet temperature was due. The record is on hold with QA."],
  },
  nutraceuticals: {
    ...INDUSTRY_THEMES.nutraceuticals, shortName: "Nutraceuticals",
    summary: "Master manufacturing records per formulation and batch size, identity testing before dispensing, and yield measured against theoretical at every control point.",
    why: ["Every dietary ingredient", "gets tested.", "Section 111.75(a)(1) asks for identity testing of each dietary ingredient before use. A supplier certificate does not answer it."],
    reasons: [["Certificates have a narrow role", "They can be relied on for other components, and only after the supplier is qualified with your own confirming results."], ["Master records multiply", "Four products in three pack sizes means twelve master manufacturing records, not four."], ["Change has to reach every one", "A formulation change under change control has to land on each record that inherits it."]],
    factsLabel: "The arithmetic", facts: [["4 products", "Each with its own formulation."], ["× 3 pack sizes", "Each batch size needs its own master record."], ["= 12 records", "All inheriting one change, under change control."]],
    tailored: ["Tested before it moves.", "Recorded as it happens."], tailoredTitles: ["Master records that inherit", "Four separate signatures", "Identity testing as a gate"],
    detail: ["The specification problem", "Seven specifications.", "Seven approvals.", "Section 111.70 sets seven categories. Each one is its own approval object, with its own change history. Exports are modelled per market."],
    alert: ["Dispensing blocked", "Identity test", "The ingredient has no identity result yet. The scale will not issue it."],
  },
  cosmetics: {
    ...INDUSTRY_THEMES.cosmetics, shortName: "Cosmetics",
    summary: "The PIF stays current instead of being assembled under pressure. Ingredient restrictions are checked against live annexes, and registration clocks run on their own.",
    why: ["The obligations arrived", "before the GMP rule did.", "MoCRA lets the FDA write a cosmetic manufacturing practice rule. It is not published yet, but the rest of MoCRA is already enforced."],
    reasons: [["Already in force", "Facility registration, product listing, safety substantiation and serious adverse event reporting."], ["Adverse events are public", "Since September 2025, reports are searchable by product name."], ["Build to ISO 22716", "It carries a presumption of conformity in the EU. India’s Schedule M-II is thinner, so Factro treats it as a subset."]],
    factsLabel: "What Schedule M-II leaves out", facts: [["Change control", "Not required by Schedule M-II."], ["Internal audit", "Not required by Schedule M-II."], ["OOS handling", "Not required by Schedule M-II."], ["Complaints, recall", "Factro includes all four through ISO 22716."]],
    tailored: ["The file is always ready.", "So is the formulation."], tailoredTitles: ["The PIF, held continuously", "Retained samples as stock", "Restrictions checked live"],
    detail: ["India licensing, built in", "Forms, clocks", "and renewals in one place.", "The pack holds the licence register, the renewal clocks and the Schedule M-II batch record fields inspectors review first."],
    alert: ["Annex III update", "Review required", "A newly restricted substance appears in three formulations. Each is flagged for review."],
  },
  veterinary: {
    ...INDUSTRY_THEMES.veterinary, shortName: "Veterinary",
    summary: "Sequencing and flush rules are enforced before a batch starts. Prescription limits are hard boundaries. One trace runs from premix to the treated animal.",
    why: ["Veterinary GMP is", "its own regulation now.", "EudraLex Volume 4 used to cover human and veterinary manufacturing together. Since 16 July 2026, veterinary practice has its own implementing regulations."],
    reasons: [["Guidance became law", "The requirements stay close to human GMP, but they are now binding, and inspections follow."], ["Medicated feed is a second regime", "Carry-over, prescription validity, treatment duration and the ban on antimicrobial prophylaxis are hard limits."], ["Schedules break these first", "Inspectors test them early, because production plans often cross them."]],
    factsLabel: "Medicated feed limits", facts: [["Prescriptions", "6 months for non-food animals, 3 weeks for food and fur animals, 5 days for antimicrobials."], ["Treatment", "1 month, or 2 weeks with antibiotics."], ["Prophylaxis", "Antimicrobial prophylaxis refused outright."]],
    tailored: ["Unsafe orders never start.", "Withdrawal follows the animal."], tailoredTitles: ["Sequencing that blocks", "Withdrawal, computed", "Signals on the clock"],
    detail: ["Withdrawal, retention, reporting", "The numbers inspectors check", "are computed for you.", "Cascade minimums are applied when a product is used off-label. Retention and reporting run on their own clocks."],
    alert: ["Production order blocked", "Sequencing", "A medicated batch is scheduled before non-target feed. A flush batch is required first."],
  },
  "api-cdmo": {
    ...INDUSTRY_THEMES["api-cdmo"], shortName: "API & CDMO",
    summary: "Each client sees only what its quality agreement allows. Change control routes per client. An audit pack is one client, one product and one date range.",
    why: ["Your client is responsible", "for a batch you made.", "Responsibility is shared between the contract site and the client. The quality agreement sets the terms, and the record has to honour them."],
    reasons: [["The record stays at the site", "The executed record must stay where the batch was made, and be retrievable for the whole retention period."], ["The agreement sets the rules", "Retention, format, access rights and what happens at contract end."], ["Factro holds both sides", "The record of truth stays at your site. Each client sees what its agreement allows."]],
    factsLabel: "Set by the quality agreement", facts: [["Retention", "How long each record is kept."], ["Format", "What the client receives, and how."], ["Access", "Which records each client can see."], ["Contract end", "What happens to the records afterwards."]],
    tailored: ["Many clients.", "One record of truth."], tailoredTitles: ["Change control per client", "Scoped client access", "Containment, tracked"],
    detail: ["Audit readiness", "A state,", "not a project.", "Clients check five areas continuously. Scope by one client, one product and one date range, and the audit pack assembles from records you already have."],
    alert: ["Client view: Meridian Pharma", "Scoped", "14 batches, 3 deviations and 1 change awaiting notification. Other clients’ records stay out of view."],
  },
};
