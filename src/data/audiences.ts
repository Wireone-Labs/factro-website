import type { LucideIcon } from "lucide-react";
import { Pill, Leaf, UtensilsCrossed } from "lucide-react";

export interface Audience {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "pharmaceuticals",
    icon: Pill,
    title: "Pharmaceuticals",
    description:
      "Full GMP compliance built into every batch — Schedule M, 21 CFR Part 11, and electronic batch records that survive an inspection instead of being assembled for one.",
  },
  {
    id: "nutraceuticals",
    icon: Leaf,
    title: "Nutraceuticals",
    description:
      "The same rigor applied to supplement and nutraceutical lines, with formulation, labelling and claims traceability built in from raw material to finished pack.",
  },
  {
    id: "food-beverage",
    icon: UtensilsCrossed,
    title: "Food & Beverage Manufacturing",
    description:
      "Quality and traceability for food-grade production, kept structurally separate from drug manufacturing when both run on the same site.",
  },
];
