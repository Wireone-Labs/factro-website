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
} from "lucide-react";

export interface InfrastructureSection {
  id: string;
  icon: LucideIcon;
  title: string;
  paragraphs: string[];
}

export const INFRASTRUCTURE_SECTIONS: InfrastructureSection[] = [
  {
    id: "data-residency",
    icon: Globe2,
    title: "Where your data lives",
    paragraphs: [
      "Region is chosen at contract signing, not fixed to one location. On Standard, that's AWS Mumbai or Hyderabad, data stays in India. On Dedicated, it's any AWS region you choose.",
      "Standard-tier customers are grouped in small batches with their own dedicated database and cache instances rather than one giant shared pool, so the blast radius of any single incident stays small. Dedicated-tier customers get their own database, application layer, storage and network end to end, isolated like on-premise, managed like cloud.",
      "Cloudflare sits in front of everything from day one: DDoS protection and a web application firewall, on both tiers.",
    ],
  },
  {
    id: "encryption",
    icon: KeyRound,
    title: "Encryption",
    paragraphs: [
      "AES-256 at rest, in transit and in every backup.",
      "Every tenant's data is protected by its own encryption key, not a key shared across customers. That tenant key is itself locked by a root key, so a stolen database on its own shows nothing: every sensitive column is ciphertext, and the key that unlocks it lives somewhere else entirely.",
      "We don't run our own key management infrastructure for storage encryption. It uses AWS-managed keys, which cost nothing and rotate on their own. On Dedicated, customer-managed encryption keys are available on request.",
    ],
  },
  {
    id: "access-control",
    icon: Fingerprint,
    title: "Access control",
    paragraphs: [
      "MFA on every login, without exception on QA, QP and admin roles. Idle sessions expire, so an unattended terminal cannot sign.",
      "IP and region allowlisting, with named exceptions for anyone who needs to reach the system from off-site.",
      "Application components never hold standing AWS credentials. Every call authenticates with short-lived, automatically issued credentials scoped to exactly what that component needs, and every credential use is logged independently, with nothing extra written in application code to make that happen.",
    ],
  },
  {
    id: "signatures",
    icon: Signature,
    title: "Signatures and timestamping",
    paragraphs: [
      "Each signer has their own private signing key, so a signature is unique to that person and cannot be produced by anyone else. Every signed document carries an RFC 3161 timestamp from our own timestamp authority, self-hosted and issued under a publicly trusted commercial certificate.",
      "The certificate chains to a standard public root, so any PDF reader or independent auditor can verify the timestamp against a public root of trust without installing anything from us. The timestamping service runs on our infrastructure, not a third party's; the certificate is what makes the timestamp independently verifiable, not who hosts it.",
    ],
  },
  {
    id: "audit-trail",
    icon: History,
    title: "Audit trail and data integrity",
    paragraphs: [
      "Every change to a GxP record writes to an append-only, hash-chained audit trail: old value, new value, author, time and reason, with each entry cryptographically linked to the one before it. An out-of-sequence edit or a missing entry breaks the chain and is visible immediately.",
      "This catches accidental corruption and unauthorised edits made through the application. It is not a substitute for controlling who has direct access to the underlying database, which is why segregation of duties and role-based permissions sit underneath it, not instead of it.",
      "Nothing is hard-deleted. A record that needs to go away is marked void and stays in the system, visible in its full history.",
    ],
  },
  {
    id: "backups",
    icon: DatabaseBackup,
    title: "Backups and recovery",
    paragraphs: [
      "Two-tier backups on Standard, continuous streaming plus daily snapshots. Three-tier on Dedicated, on your own retention schedule. Both are geo-redundant and recoverable to any point in time.",
      "Backups are encrypted on the instance before they leave it, never written out in the clear.",
      "Rotating an encryption key never breaks an old backup. Every key version we've ever used is retained, so a backup from years ago can still be restored under the key it was originally encrypted with. Nothing here rotates on a timer. Every rotation is a deliberate action, taken by a person, for a reason, and logged.",
    ],
  },
  {
    id: "ai-privacy",
    icon: BrainCircuit,
    title: "AI and data privacy",
    paragraphs: [
      "A private model runs inside your deployment. Nothing you ask it leaves your tenant, and nothing you send it trains a model for anyone else. (Beta, Q4 2026)",
    ],
  },
  {
    id: "reliability",
    icon: Gauge,
    title: "Reliability",
    paragraphs: [
      "A 99% uptime SLA on Standard, dedicated engineers on standby, round-the-clock monitoring. Not a status page and an apology: people already working on it before it reaches your floor.",
    ],
  },
];
