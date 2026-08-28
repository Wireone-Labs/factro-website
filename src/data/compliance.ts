import type { LucideIcon } from "lucide-react";
import {
  Lock,
  Eye,
  KeyRound,
  History,
  DatabaseZap,
  BadgeCheck,
  Server,
} from "lucide-react";

export interface CompliancePillar {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  points: string[];
}

export const COMPLIANCE_PILLARS: CompliancePillar[] = [
  {
    id: "data-security",
    icon: Lock,
    title: "Data Security",
    summary:
      "Every record in Factro is scoped to your organization, with encryption in transit and role-based access enforced at every layer.",
    points: [
      "Encrypted data in transit",
      "Tenant-scoped data isolation",
      "Role-based access on every request",
    ],
  },
  {
    id: "privacy",
    icon: Eye,
    title: "Privacy",
    summary:
      "Your production, quality, and customer data stays yours. Access is limited to what a role actually needs to see.",
    points: [
      "No cross-tenant data sharing",
      "Least-privilege access by default",
      "Configurable data retention",
    ],
  },
  {
    id: "access-control",
    icon: KeyRound,
    title: "Access Control",
    summary:
      "Role- and permission-aware access across every module, so operators, quality teams, and plant leadership only see what's relevant to them.",
    points: [
      "Granular, role-based permissions",
      "Configurable approval chains",
      "Segregation of duties on sign-off",
    ],
  },
  {
    id: "auditability",
    icon: History,
    title: "Auditability",
    summary:
      "Every approval, deviation, and change-control record is logged and timestamped. GMP Mode locks entries once approved, so your audit trail can't be edited after the fact.",
    points: [
      "Full activity log across modules",
      "GMP Mode for strict validation",
      "Immutable records post-approval",
    ],
  },
  {
    id: "data-protection",
    icon: DatabaseZap,
    title: "Data Protection",
    summary:
      "Structured backups and data retention practices keep your production history intact and recoverable.",
    points: [
      "Regular automated backups",
      "Structured retention policies",
      "Recoverable batch and quality history",
    ],
  },
  {
    id: "compliance-standards",
    icon: BadgeCheck,
    title: "Compliance Standards",
    summary:
      "Built around the workflows regulated manufacturers already follow — CAPA, change control, and document-controlled SOPs map to how GMP-driven quality systems operate.",
    points: [
      "CAPA and change-control workflows",
      "Document-controlled SOPs with versioning",
      "Training sign-off tied to compliance records",
    ],
  },
  {
    id: "infrastructure-security",
    icon: Server,
    title: "Infrastructure Security",
    summary:
      "Hosted on modern cloud infrastructure with monitoring and access logging in place to protect the systems your operation depends on.",
    points: [
      "Cloud-hosted, monitored infrastructure",
      "Access logging on system-level changes",
      "Environment separation for staging and production",
    ],
  },
];
