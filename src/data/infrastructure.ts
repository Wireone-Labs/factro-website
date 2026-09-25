import type { LucideIcon } from "lucide-react";
import {
  Globe2,
  ShieldCheck,
  DatabaseBackup,
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
    id: "deployment",
    icon: Globe2,
    title: "Deployment and isolation",
    intro: "Choose the environment that fits your security and regulatory requirements.",
    points: [
      "Run as a shared multi-tenant service on your preferred cloud provider and region",
      "Choose dedicated infrastructure with its own database, application layer, storage and network",
      "Tailor the platform for an on-premises deployment when policy requires it",
      "Tenant data, cache and storage remain logically isolated in every deployment model",
    ],
  },
  {
    id: "protection",
    icon: ShieldCheck,
    title: "Protection and access",
    intro: "Layered controls protect the platform before and after login.",
    points: [
      "DDoS protection and a web application firewall filter traffic before it reaches the application",
      "AES-256 encryption protects tenant data, files, exports and backups at rest",
      "Each tenant has its own encryption key; customer-managed keys are available for dedicated deployments",
      "MFA, role-based access, session expiry and optional IP or region allowlisting protect every account",
    ],
  },
  {
    id: "records-recovery",
    icon: DatabaseBackup,
    title: "Records, signatures and recovery",
    intro: "The evidence remains verifiable, recoverable and complete.",
    points: [
      "Old value, new value, author, time and reason captured on every change",
      "Audit entries are append-only and hash-chained, so missing or altered history is visible",
      "Electronic signatures carry an independently verifiable RFC 3161 timestamp",
      "Encrypted continuous backups and daily snapshots support point-in-time recovery",
    ],
  },
  {
    id: "assurance",
    icon: Bug,
    title: "Assurance and operations",
    intro: "Independent testing and continuous monitoring back the controls.",
    points: [
      "Application, API and infrastructure layers are periodically tested by an independent security firm",
      "Critical and high findings block the next release until resolved",
      "DevOps monitoring watches continuously for anomalies against the 99% uptime target",
      "Private AI workloads stay inside your deployment and never train a shared model",
    ],
  },
];
