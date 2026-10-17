export interface PillarWorkflowStep {
  label: string;
  title: string;
  description: string;
  status: string;
  tone: "blue" | "amber" | "green";
  records: string[];
}

export interface PillarPageContent {
  path: string;
  name: string;
  number: string;
  visual: string;
  title: string;
  description: string;
  introTitle: string;
  intro: string[];
  principles: string[];
  workflowTitle: string;
  workflowDescription: string;
  steps: PillarWorkflowStep[];
  capabilities: { title: string; description: string; flow: string[] }[];
  connectionTitle: string;
  connection: string;
  note: string;
}

export const PILLAR_PAGES = {
  "compliance-engine": {
    path: "/how-it-works#compliance-engine",
    name: "The Compliance Engine",
    number: "01",
    visual: "compliance-engine",
    title: "The rule is the control itself.",
    description: "Turn regulatory requirements into controls at the point of work. Permissions, prerequisites and signatures are checked before the next action can happen.",
    introTitle: "A control that acts, not a checklist that waits.",
    intro: [
      "A procedure can describe the right way to work without preventing the wrong one. Factro connects the procedure to the transaction: the person, material, equipment and approval state are part of the decision to let work proceed.",
      "The control and its evidence stay together. When a batch moves, a record changes or an approval is given, the history belongs to that action — not to a separate file someone has to reconstruct later.",
    ],
    principles: ["Check prerequisites before execution", "Keep identity and signatures with the record", "Carry the evidence through every handover"],
    workflowTitle: "Follow a batch through a release gate.",
    workflowDescription: "A missing approval holds the next action. The same record carries the eventual decision.",
    steps: [
      { label: "Request", title: "A batch is ready for review", description: "Production submits the completed batch record. Factro checks the required evidence and the reviewer's authority before release can proceed.", status: "Prerequisites evaluated", tone: "blue", records: ["Batch B-2281 · execution record attached", "Material lots · traceability available", "Reviewer · role and training checked"] },
      { label: "Hold", title: "No approval, no release", description: "A required quality approval is still missing. The release stays held rather than proceeding with a reminder to fix the paperwork afterwards.", status: "Held at the control", tone: "amber", records: ["Quality review · pending", "Release action · blocked", "Review task · routed to the responsible team"] },
      { label: "Sign & release", title: "The decision travels with the batch", description: "An authorised reviewer completes the required review and electronic signature. The release decision and its supporting evidence remain linked to the batch.", status: "Release authorised", tone: "green", records: ["Quality review · completed", "Electronic signature · identity reconfirmed", "Audit trail · who, when and why retained"] },
    ],
    capabilities: [
      { title: "An industry pack, not a parallel system", description: "Apply the controls relevant to the product and operation. Regulatory profiles sit on the same records and workflows, so a mixed-category plant does not need separate histories for each team.", flow: ["Industry", "Applicable controls", "Workflow"] },
      { title: "Permissions with consequences", description: "Access is more than a menu someone can see. Roles, training and required approvals determine which actions a person can perform at a particular stage of work.", flow: ["Identity", "Authority", "Action"] },
      { title: "Records that retain their history", description: "Field-level changes carry who, when and why. Electronic signatures stay attached to their records, and records cannot simply be deleted after draft to erase the history of an action.", flow: ["Change", "Reason", "Audit trail"] },
      { title: "Configuration that stays accountable", description: "Changing a rule changes what the workflow permits. Keep the change, its rationale and its impact visible so the control remains understandable to the people operating and reviewing it.", flow: ["Rule change", "Impact", "Recorded revision"] },
    ],
    connectionTitle: "The gate, the work and the signal share one record.",
    connection: "The Compliance Engine decides whether an action is permitted. Task Manager gets unresolved work to the right owner. The AI Agent helps teams examine patterns across those records. A finding from AI does not replace a required approval.",
    note: "Regulatory frameworks shown here are control-mapping references, not product certifications. Applicability depends on your processes, configuration, validation and operating procedures. Review the relevant industry pack with your quality team.",
  },
  orchestrator: {
    path: "/how-it-works#orchestrator",
    name: "Task Manager",
    number: "02",
    visual: "orchestrator",
    title: "The work comes to the operator.",
    description: "Bring tasks, approvals, conversations and deadlines into the same workflow. Every handover arrives with context, a responsible owner and a visible clock.",
    introTitle: "Less chasing. More work moving.",
    intro: [
      "A batch can be complete on the floor and still be waiting for someone to notice it. A sample can be ready while its next owner is working from a different list. Task Manager makes those transitions part of the work itself.",
      "Production, quality, stores and support use a shared task system. A job, reminder, schedule or deviation carries its source record, ownership and due date, so people can act without first assembling the context from messages and spreadsheets.",
    ],
    principles: ["One place for assigned work and approvals", "Conversations attached to the task", "Due dates, SLAs and overdue work in view"],
    workflowTitle: "Watch a handover become owned work.",
    workflowDescription: "In a production-to-quality handover, the next team receives the record, acknowledges the task and closes the loop.",
    steps: [
      { label: "Route", title: "Production finishes. Quality receives the task.", description: "Completing the production stage creates the next piece of work with its batch record and review context attached. The handover does not depend on a separate message.", status: "Review assigned", tone: "blue", records: ["Source · batch B-2281", "Destination · quality review", "SLA · 2 hours from assignment"] },
      { label: "Acknowledge", title: "Someone owns the next action", description: "The reviewer acknowledges the task. Questions and responses stay in its conversation, while the due date and current status remain visible to the teams involved.", status: "In progress", tone: "amber", records: ["Owner · Meera, quality team", "Conversation · supporting records requested", "Due date · visible to both teams"] },
      { label: "Resolve", title: "The task closes with its evidence", description: "The reviewer finishes the work and records the outcome. Required approvals still pass through the Compliance Engine; completing a task is not a shortcut around a control.", status: "Handover resolved", tone: "green", records: ["Review · completed", "Discussion · retained with the task", "Next stage · notified of the outcome"] },
    ],
    capabilities: [
      { title: "Different work, one task system", description: "Manage scheduled jobs, approvals, follow-ups and deviations without maintaining a separate tracker for each. Each task points back to the record that explains why it exists.", flow: ["Record event", "Task", "Named owner"] },
      { title: "Time that does not disappear", description: "Show due dates, remaining SLA time and overdue work alongside the task. Teams can see what is waiting and for how long instead of learning about a delay in the next status meeting.", flow: ["Due date", "Alert", "Follow-up"] },
      { title: "Conversations with context", description: "Keep questions, replies and handover acknowledgements beside the work. The next person can follow the discussion without searching a group chat for the missing explanation.", flow: ["Question", "Shared context", "Resolution"] },
      { title: "Ticketing that stays connected", description: "Track issues and feedback in the platform. Ownership and status stay visible through resolution, alongside the operational work that gave rise to the ticket.", flow: ["Issue", "Assigned ticket", "Closure"] },
    ],
    connectionTitle: "Coordination is not permission to bypass a control.",
    connection: "Task Manager moves work between people and teams. The Compliance Engine enforces the conditions for acting. The AI Agent can surface recurring delays or related issues for review. All three operate on the same underlying history.",
    note: "The handover above uses sample records and timings to explain the workflow. Configure task routing, ownership, SLAs and approval requirements around your actual operating procedures.",
  },
  "neural-engine": {
    path: "/how-it-works#neural-engine",
    name: "The AI Agent",
    number: "03",
    visual: "agentic-ai",
    title: "Insights surface on their own.",
    description: "AI-ready records today. AI Agent capabilities in development for compliance checks, CAPA analysis and anomaly detection—with people retaining control of every regulated decision.",
    introTitle: "Look across the records, not just at the latest number.",
    intro: [
      "A result rarely tells the whole story by itself. A calibration gap may connect several batches. A repeated deviation may point back to a corrective action that never addressed the cause. The AI Agent helps bring those relationships into view.",
      "Rather than asking a team to read months of history before forming a question, AI agents examine the records behind the signals. Findings point back to source evidence so reviewers can check the reasoning and decide what should happen next.",
    ],
    principles: ["Production, quality and CAPA signals together", "Findings linked to their source records", "Human review before decisions and closure"],
    workflowTitle: "From a readiness dip to the records behind it.",
    workflowDescription: "Preview the planned investigation experience: a signal becomes a linked explanation, then a finding for the responsible team to review. AI Agent capabilities are in development.",
    steps: [
      { label: "Detect", title: "A change deserves a closer look", description: "A readiness signal changes. The agent uses the surrounding records to identify the control area that needs attention instead of treating the score as an answer in itself.", status: "Signal identified", tone: "blue", records: ["Signal · readiness has declined", "Control area · equipment calibration", "Question · which records explain the change?"] },
      { label: "Connect", title: "The explanation has a trail", description: "The investigation connects an equipment calibration gap, the affected batches and a previous corrective action. Each connection gives the reviewer a record to inspect.", status: "Evidence linked", tone: "amber", records: ["Calibration log · equipment TP-04", "Batch records · B-2281, B-2282, B-2284", "Previous action · CAPA-0302"] },
      { label: "Review", title: "Your team makes the decision", description: "A reviewer checks the evidence and decides whether to investigate further or initiate corrective work. The agent supports the investigation; it does not approve release or silently edit source records.", status: "Ready for human review", tone: "green", records: ["Finding · recurring calibration gap", "Evidence · available to the reviewer", "Next action · decided by the quality team"] },
    ],
    capabilities: [
      { title: "Production signals in context", description: "Look for drift and patterns across execution records rather than reviewing each batch in isolation. Connect observations to the material, equipment and process history needed to investigate them.", flow: ["Batch signals", "Related history", "Investigation"] },
      { title: "Quality intelligence with evidence", description: "Bring related quality records into the same investigation. A finding should help the team understand what changed and which records support that explanation, not just add another alert to a queue.", flow: ["Quality signal", "Source records", "Explanation"] },
      { title: "CAPA with built-in agents", description: "Surface gaps, explore recurring deviations and connect previous actions to current evidence inside CAPA. Keep the investigation, ownership, effectiveness review and closure in the same operational context.", flow: ["Recurring gap", "CAPA history", "Team review"] },
      { title: "Answers you can check", description: "Ask questions in the context of your records and inspect the supporting evidence. AI output is a starting point for review; completeness and quality of the underlying records still matter.", flow: ["Question", "Grounded finding", "Verification"] },
    ],
    connectionTitle: "Intelligence supports the workflow. It does not overrule it.",
    connection: "The AI Agent helps explain signals. Task Manager carries the resulting work to its owner. The Compliance Engine continues to enforce the required controls, signatures and approvals. Recommendations do not become authorisations simply because an agent generated them.",
    note: "AI Agent capabilities are in development; the structured, AI-ready data model is available today. This is an illustration of the planned workflow, not a live plant assessment. AI-generated findings require review against source records and your quality procedures.",
  },
} satisfies Record<string, PillarPageContent>;

export type PillarPageKey = keyof typeof PILLAR_PAGES;
