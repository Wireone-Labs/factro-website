import type { LucideIcon } from "lucide-react";
import { ClipboardCheck, Factory, Building2, Package } from "lucide-react";

export interface OutcomeBullet {
  lead: string;
  detail: string;
}

export interface BusinessOutcome {
  id: string;
  icon: LucideIcon;
  timeframe: string;
  role: string;
  bullets: OutcomeBullet[];
}

export const BUSINESS_OUTCOMES: BusinessOutcome[] = [
  {
    id: "qa-manager",
    icon: ClipboardCheck,
    timeframe: "Monday",
    role: "The QA Manager",
    bullets: [
      { lead: "Minutes, not a week", detail: "twelve months of history handed over in the meeting" },
      { lead: "Already clustered", detail: "eighteen months of pattern is already waiting" },
      { lead: "Patterns, not repeats", detail: "the same root cause stops reappearing under a new number" },
      { lead: "Nothing to assemble", detail: "the audit pack is a download, since the evidence was never scattered" },
    ],
  },
  {
    id: "production-head",
    icon: Factory,
    timeframe: "The shift",
    role: "The Production Head",
    bullets: [
      { lead: "Finished when the batch is", detail: "release is a review, not a reconstruction" },
      { lead: "Written as it ran", detail: "the record is complete when the batch is, with nothing to transcribe afterwards" },
      { lead: "Nothing comes back", detail: "nothing incomplete reaches QA" },
      { lead: "Before it fails", detail: "calibration blocks the stage, not the batch weeks later" },
    ],
  },
  {
    id: "plant-head",
    icon: Building2,
    timeframe: "The quarter",
    role: "The Plant Head",
    bullets: [
      { lead: "Continuity through turnover", detail: "the process lives in the system, not the person who left" },
      { lead: "Every shift, visible", detail: "every batch, stage and open handover on one screen" },
      { lead: "Bottlenecks are visible", detail: "where work piles up, and for how long, without asking" },
      { lead: "One number, not four", detail: "yield, cycle time, deviations and overdue CAPAs, live" },
    ],
  },
  {
    id: "storekeeper",
    icon: Package,
    timeframe: "The morning",
    role: "The Storekeeper",
    bullets: [
      { lead: "Structurally refused", detail: "quarantined material cannot be dispensed" },
      { lead: "Book equals floor", detail: "one ledger for GRN, dispensing, return and disposal" },
      { lead: "Before it bites", detail: "expiry and retest alerts land weeks ahead" },
      { lead: "A bin, not a building", detail: "someone new can find the lot on their first day" },
    ],
  },
];
