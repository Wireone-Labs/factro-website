export const ANALYSIS_PROMPT = "Why did readiness drop, which batches are affected, and what should we do next?";

export const ANALYSIS_REFERENCES = [
  { name: "Equipment history", record: "TP-04", detail: "Checking the calibration window" },
  { name: "Batch records", record: "B-2281 · B-2282 · B-2284", detail: "Tracing every affected batch" },
  { name: "In-process testing", record: "IPQC", detail: "Comparing results with specifications" },
  { name: "Readiness signals", record: "GAP-0139", detail: "Following the seven-point change" },
  { name: "Previous actions", record: "CAPA-0302", detail: "Looking for recurrence and ownership" },
];

type AnalysisSection = {
  id: string;
  title: string;
  paragraphs: string[];
  table?: { columns: string[]; rows: string[][] };
  chart?: { title: string; description: string; values: { label: string; value: number }[]; tone: "readiness" | "risk" };
};

export const ANALYSIS_SECTIONS: AnalysisSection[] = [
  {
    id: "summary",
    title: "The short answer",
    paragraphs: [
      "Readiness fell from 77 to 70 after tablet press TP-04 passed its August 29 calibration date and ran three batches before recalibration on September 3. B-2281, B-2282 and B-2284 need a documented impact assessment. Their hardness and weight checks remained within specification, but that does not close the equipment gap. A similar March lapse also points to an ownership weakness in CAPA-0302.",
    ],
  },
  {
    id: "timeline",
    title: "1. Reconstruct the sequence, not the inbox",
    paragraphs: [
      "Equipment history supplies the calibration dates; batch records show where TP-04 was used. Readiness signals identify the score change, while the previous CAPA provides the recurrence context. Together, these records reconstruct the event without an inbox search. This demonstration does not establish every operation's exact time or each batch's approval status. Verify those details in the source records before making a disposition decision.",
    ],
    table: {
      columns: ["When", "Recorded event", "Source"],
      rows: [
        ["March", "Earlier TP-04 lapse; reminder introduced", "CAPA-0302"],
        ["Aug 29", "Calibration became due", "TP-04 history"],
        ["Aug 30–Sep 1", "Readiness moved from 77 to 70", "GAP-0139"],
        ["Before Sep 3", "Three batches used the press", "BMR logs"],
        ["Sep 3", "Recalibration recorded", "TP-04 history"],
      ],
    },
  },
  {
    id: "batches",
    title: "2. Define the affected population",
    paragraphs: [
      "Genealogy links three batches to TP-04 during the relevant window. Keep them under one investigation reference so Production, Quality and the laboratory share the same scope. Add any further lot only with supporting equipment-use evidence. The table separates known test results from the assessment still required: an in-spec result does not resolve the calibration gap, and a lapse alone does not prove product failure. The authorised Quality reviewer makes the final decision.",
    ],
    table: {
      columns: ["Batch", "Equipment", "Available testing", "Next review"],
      rows: [
        ["B-2281", "TP-04", "Hardness and weight in spec", "Equipment-impact assessment"],
        ["B-2282", "TP-04", "Hardness and weight in spec", "Equipment-impact assessment"],
        ["B-2284", "TP-04", "Hardness and weight in spec", "Equipment-impact assessment"],
      ],
    },
  },
  {
    id: "readiness",
    title: "3. Explain the readiness movement",
    paragraphs: [
      "The seven-point fall signals an evidence gap, not a product failure rate. Recalibration addresses the press's current condition; closing the historic gap also requires the certificate, impact assessment, batch reviews and approvals. Readiness should improve when those records are complete and accepted—not when a task is simply marked done. Use the score to prioritise attention, then follow its links to the underlying evidence before judging whether the issue is resolved.",
    ],
    chart: {
      title: "Readiness before and after the gap",
      description: "A seven-point change in the illustrative readiness score; scale 0–100.",
      values: [{ label: "Before", value: 77 }, { label: "After", value: 70 }],
      tone: "readiness",
    },
  },
  {
    id: "testing",
    title: "4. Read test results in their process context",
    paragraphs: [
      "Hardness and weight results are within specification for all three batches. Keep them beside the equipment and batch records so reviewers can distinguish observed results from concerns about process conditions. Include relevant raw-material, blend and finished-product tests in the same assessment. Additional testing follows the site's approved investigation process. The assistant assembles known results and highlights missing evidence; it does not invent outcomes, dismiss retesting or make a release decision.",
    ],
  },
  {
    id: "recurrence",
    title: "5. Find the weakness in the previous action",
    paragraphs: [
      "CAPA-0302 introduced a reminder sent to a shared inbox, but no named person owned confirmation of completed calibration. That supports an ownership concern, not a proven root cause. Investigate how the reminder was handled, what escalation existed and why the press remained available. Recurrence raised the example risk score from 71 to 88. Review whether the previous effectiveness check demonstrated operational control or merely confirmed that a reminder had been configured.",
    ],
    chart: {
      title: "Recurrence changes the priority",
      description: "Illustrative risk score for GAP-0139, before and after the recurrence signal; scale 0–100.",
      values: [{ label: "Previous", value: 71 }, { label: "With recurrence", value: 88 }],
      tone: "risk",
    },
  },
  {
    id: "actions",
    title: "6. Turn the findings into owned work",
    paragraphs: [
      "Give each follow-up an owner, due date and evidence requirement. Facility reconciles the calibration history; Production confirms affected batches; Quality assesses impact and disposition. These are suggested responsibilities, not automatically assigned tasks or approvals. Keep questions, responses and scheduling explanations attached to the work. The next reviewer should understand both the decision and its reasoning without reconstructing calls or collecting spreadsheets.",
    ],
    table: {
      columns: ["Suggested owner", "Action", "Evidence to attach"],
      rows: [
        ["Facility", "Reconcile TP-04 calibration history", "Reviewed certificate and equipment log"],
        ["Production", "Confirm the affected batch population", "Linked BMR and equipment-use records"],
        ["Quality", "Assess impact and disposition", "Signed batch-specific assessment"],
        ["CAPA owner", "Review the previous action", "Root-cause and effectiveness evidence"],
      ],
    },
  },
  {
    id: "prevention",
    title: "7. Make the next action stronger than a reminder",
    paragraphs: [
      "Strengthen accountability, not notification volume. Name a calibration owner and deputy, define escalation, and specify what happens when approved evidence is missing at the due date. Review readiness checks before scheduling and execution. Then verify the change using actual equipment-use records over a site-defined observation period. Confirm that overdue conditions were detected, routed and handled correctly. Configuration screenshots show what was set up; operating evidence shows whether the action actually controlled the risk.",
    ],
  },
  {
    id: "closure",
    title: "8. Close on evidence, not on activity",
    paragraphs: [
      "A defensible closure package connects the calibration history, three batch records, IPQC observations, impact assessment and review of CAPA-0302. Retain approvals and unresolved questions with their sources. The final summary explains what happened, what was decided and how recurrence will be checked; it never replaces the evidence. Factro connects records and makes the next work visible. This answer does not release a batch, prove a root cause or close a corrective action.",
    ],
  },
  {
    id: "conclusion",
    title: "One connected answer. A clear next move.",
    paragraphs: [
      "The team now has a defined batch population, a traceable timeline and an owned review plan. Equipment history, testing and the earlier CAPA become one investigation rather than separate conversations. Next: review the three batches with Quality, reconcile calibration evidence, investigate the ownership failure and verify the preventive action. Carry the reasoning forward with the records. Faster resolution comes from removing the search and handover delays—not skipping the checks that make a decision defensible.",
    ],
  },
];
