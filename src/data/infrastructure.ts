import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  KeyRound,
  Fingerprint,
  Signature,
  History,
  DatabaseBackup,
  BrainCircuit,
  Gauge,
  ShieldAlert,
  Bug,
} from "lucide-react";

export interface InfrastructureSection {
  id: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  points: string[];
}

export const INFRASTRUCTURE_SECTIONS: InfrastructureSection[] = [
  {
    id: "data-residency",
    icon: Globe2,
    title: "Where your data lives",
    intro: "Region is chosen at contract signing, not fixed to one location.",
    points: [
      "Standard tier: AWS Mumbai or Hyderabad — data stays in India",
      "Dedicated tier: any AWS region you choose",
      "Standard tier groups tenants in small batches with their own database and cache, so the blast radius of any incident stays small",
      "Dedicated tier gets its own database, application layer, storage and network end to end — isolated like on-premise, managed like cloud",
    ],
  },
  {
    id: "network-protection",
    icon: ShieldAlert,
    title: "Network protection",
    intro: "Every request passes through defenses before it reaches the application.",
    points: [
      "Cloudflare in front of every request from day one — DDoS protection and a web application firewall, on both tiers",
      "Volumetric attacks absorbed and malicious traffic filtered before it reaches the application",
      "Signing service, key management and core database sit inside their own VPC with no public route in",
      "Reachable only from explicitly allowed application components, never directly from the internet",
    ],
  },
  {
    id: "encryption",
    icon: KeyRound,
    title: "Encryption",
    intro: "AES-256 at rest, in transit and in every backup.",
    points: [
      "Every tenant's data protected by its own encryption key, not one shared across customers",
      "Tenant key itself locked by a root key — a stolen database on its own shows nothing",
      "AWS-managed keys by default, at no cost, rotated automatically",
      "Customer-managed encryption keys available on request, on Dedicated",
      "Uploaded documents, attachments and exports encrypted at rest in isolated per-tenant storage",
    ],
  },
  {
    id: "access-control",
    icon: Fingerprint,
    title: "Access control",
    intro: "Enforced at every layer, not just the login screen.",
    points: [
      "MFA on every login, without exception on QA, QP and admin roles",
      "Idle sessions expire, so an unattended terminal cannot sign",
      "IP and region allowlisting, with named exceptions for off-site access",
      "Access can be scoped to a facility's own WiFi network, so a device counts as \"on-site\" only inside the plant's footprint",
      "Application components never hold standing AWS credentials — every call uses short-lived, scoped, independently logged credentials",
    ],
  },
  {
    id: "signatures",
    icon: Signature,
    title: "Signatures and timestamping",
    intro: "Each signer has their own private signing key, unique and unforgeable.",
    points: [
      "Every signed document carries an RFC 3161 timestamp from our own timestamp authority",
      "Self-hosted, issued under a publicly trusted commercial certificate",
      "Certificate chains to a standard public root — any PDF reader or independent auditor can verify it without installing anything from us",
      "The certificate is what makes the timestamp independently verifiable, not who hosts it",
    ],
  },
  {
    id: "audit-trail",
    icon: History,
    title: "Audit trail and data integrity",
    intro: "Every change to a GxP record writes to an append-only, hash-chained trail.",
    points: [
      "Old value, new value, author, time and reason captured on every change",
      "Each entry cryptographically linked to the one before it",
      "An out-of-sequence edit or missing entry breaks the chain and is visible immediately",
      "Segregation of duties and role-based permissions sit underneath this, not instead of it",
      "Nothing is hard-deleted — a voided record stays in the system, visible in its full history",
    ],
  },
  {
    id: "backups",
    icon: DatabaseBackup,
    title: "Backups and recovery",
    intro: "Geo-redundant, encrypted, and recoverable to any point in time.",
    points: [
      "Standard: two-tier backups, continuous streaming plus daily snapshots",
      "Dedicated: three-tier, on your own retention schedule",
      "Backups encrypted on the instance before they leave it, never written out in the clear",
      "Every key version we've ever used is retained, so an old backup restores under the key it was encrypted with",
      "Rotation is a deliberate, logged action taken by a person — nothing rotates on a timer",
    ],
  },
  {
    id: "penetration-testing",
    icon: Bug,
    title: "Penetration testing",
    intro: "Independent testing runs periodically against every layer.",
    points: [
      "Application, API and infrastructure layers tested by a third-party security firm, not graded by us",
      "Findings triaged by severity and tracked to closure with the same discipline as a production defect",
      "Critical and high findings block the next release until resolved",
      "A summary report is available on request during security review",
    ],
  },
  {
    id: "reliability",
    icon: Gauge,
    title: "Reliability",
    intro: "A 99% uptime SLA, with people already on it before you notice.",
    points: [
      "Our DevOps team and infrastructure monitoring systems watch continuously for anomalies to hold the 99% uptime target",
      "Dedicated engineers on standby, round-the-clock monitoring",
      "Not a status page and an apology — response starts before it reaches your floor",
      "Application servers scale automatically with load",
      "A shift-change spike or a month-end reporting run never becomes a slowdown",
    ],
  },
  {
    id: "ai-privacy",
    icon: BrainCircuit,
    title: "AI and data privacy",
    intro: "A private model runs inside your deployment. (Beta, Q4 2026)",
    points: [
      "Nothing you ask it leaves your tenant",
      "Nothing you send it trains a model for anyone else",
    ],
  },
];
