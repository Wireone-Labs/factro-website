import type { LucideIcon } from "lucide-react";
import { FileStack, PlayCircle, ShieldCheck, PackageCheck } from "lucide-react";

export interface WorkflowStep {
  step: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    icon: FileStack,
    title: "Define",
    description:
      "Set up your product library — BOMs, master formula records, specs, and compliance data — once, as the single source of truth.",
  },
  {
    step: "02",
    icon: PlayCircle,
    title: "Plan & produce",
    description:
      "Schedule production orders against your work centers and execute each batch with live stage and machine tracking.",
  },
  {
    step: "03",
    icon: ShieldCheck,
    title: "Inspect & approve",
    description:
      "Run in-process quality checks as work happens, and route deviations through CAPA and change-control workflows.",
  },
  {
    step: "04",
    icon: PackageCheck,
    title: "Release & report",
    description:
      "Sign off, dispatch approved batches, and track the whole operation from a role-aware dashboard and report library.",
  },
];
