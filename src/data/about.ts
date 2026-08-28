import type { LucideIcon } from "lucide-react";
import { Factory, ShieldCheck, Layers, Sparkles } from "lucide-react";

export interface CompanyValue {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const COMPANY_VALUES: CompanyValue[] = [
  {
    icon: Factory,
    title: "Built for the floor, not just the office",
    description:
      "Software that only works for admins isn't finished. We design for the operator on the shop floor as much as the plant manager reviewing reports.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance by design",
    description:
      "Audit trails, approvals, and sign-offs aren't a layer we add later — they're part of how every workflow in Factro is structured from the start.",
  },
  {
    icon: Layers,
    title: "One source of truth",
    description:
      "Production, quality, and inventory shouldn't be three different systems that occasionally agree. In Factro, they share the same record.",
  },
  {
    icon: Sparkles,
    title: "Practical over flashy",
    description:
      "We'd rather ship a workflow that fits how your plant actually runs than a feature that looks good in a demo and nowhere else.",
  },
];
