import type { LucideIcon } from "lucide-react";
import { Pill, Leaf, UtensilsCrossed } from "lucide-react";

export interface Audience {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** Tailwind color classes for the icon tile — border, bg, text. */
  colorClass: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "pharmaceuticals",
    icon: Pill,
    title: "Pharmaceuticals",
    description:
      "Full GMP compliance built into every batch — Schedule M, 21 CFR Part 11, and electronic batch records that survive an inspection instead of being assembled for one.",
    colorClass: "border-brand-100 bg-brand-50 text-brand-600",
  },
  {
    id: "nutraceuticals",
    icon: Leaf,
    title: "Nutraceuticals",
    description:
      "The same rigor applied to supplement and nutraceutical lines, with formulation, labelling and claims traceability built in from raw material to finished pack.",
    colorClass: "border-emerald-100 bg-emerald-50 text-emerald-600",
  },
  {
    id: "food-beverage",
    icon: UtensilsCrossed,
    title: "Food & Beverage Manufacturing",
    description:
      "Quality and traceability for food-grade production, kept structurally separate from drug manufacturing when both run on the same site.",
    colorClass: "border-amber-100 bg-amber-50 text-amber-600",
  },
];
