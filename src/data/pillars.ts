import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Workflow, Sparkles } from "lucide-react";

export interface PillarBullet {
  text: string;
  beta?: boolean;
}

export interface Pillar {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  bullets: PillarBullet[];
}

export const PILLARS: Pillar[] = [
  {
    id: "compliance-engine",
    icon: ShieldCheck,
    label: "Pillar 01 · The Compliance Engine",
    title: "The rule is the control itself.",
    description:
      "A rule engine built from the regulations themselves. It does not remind you of the control, it is the boundary of what can happen on the floor, not a passive suggestion. Configurable, with consequences: change a rule and the system tells you what it affects, records who changed it and why, and enforces the new one from that moment. Nothing here is advisory.",
    bullets: [
      { text: "Maker cannot be checker, enforced by the system rather than a policy document" },
      { text: "Every signature re-authenticates and captures a reason in the same transaction" },
      { text: "Inspection readiness scored continuously, surfacing risk before an inspection" },
      { text: "Configuration, not code. A rule change is a setting, not a software release" },
    ],
  },
  {
    id: "orchestrator",
    icon: Workflow,
    label: "Pillar 02 · The Orchestrator",
    title: "The work comes to the operator.",
    description:
      "One task system across every job, reminder, schedule and deviation. Nobody asks for an update or hunts down a sample, because the work comes to them with an owner and a clock attached. When something crosses a department, the handover is recorded rather than shouted. Bottlenecks stop being something you discover and become something you can see.",
    bullets: [
      { text: "The home screen is a prioritised work queue, from minute one" },
      { text: "Every handover is a tracked ticket with a named owner and a visible clock" },
      { text: "SLA tracking across departments, so bottlenecks identify themselves" },
      { text: "Conversations become a permanent part of the record, surviving those who had them" },
    ],
  },
  {
    id: "agentic-rag",
    icon: Sparkles,
    label: "Pillar 03 · The Agentic RAG",
    title: "Insights surface on their own.",
    description:
      "A layer watching every record and action on the platform. Your plant holds eighteen months of pattern nobody has looked at, because looking would take three weeks. This looks. It surfaces what you never knew to ask, flags what is drifting while it matters, and answers in plain language. Every answer carries the records it came from, so you can check it rather than trust it.",
    bullets: [
      { text: "Genealogy: forward and backward trace from raw material lot to dispatched pack" },
      { text: "Anomalies and deviations clustered by product, line, stage and shift", beta: true },
      { text: "AI Assistant: ask in plain language and pull targeted answers across operations", beta: true },
      { text: "Demand forecasting that alerts before a material shortage can form", beta: true },
    ],
  },
];
