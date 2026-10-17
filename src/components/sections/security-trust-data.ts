import { FileCheck2, LockKeyhole, ShieldCheck, SquareCheck, UsersRound } from "lucide-react";

export const TRUST_LAYERS = [
  { name: "Edge", icon: ShieldCheck, description: "Harmful traffic is filtered out before it reaches Factro.", controls: ["DDoS protection", "Web application firewall"] },
  { name: "Access", icon: UsersRound, description: "Only approved people, devices and networks get in.", controls: ["MFA", "Client approval", "Network geo-fencing", "Role-based access"] },
  { name: "Application", icon: SquareCheck, description: "Every action is checked against your rules before it is saved.", controls: ["Rule checks on every action", "Re-authenticated approvals", "Tenant isolation"] },
  { name: "Records", icon: FileCheck2, description: "Every change keeps its old value, new value, author, time and reason.", controls: ["Append-only audit trail", "Hash-chained entries", "Signed PDFs"] },
  { name: "Storage", icon: LockKeyhole, description: "Data, files and backups are encrypted with a key used only for your company.", controls: ["AES-256", "A key per tenant", "Encrypted backups", "Point-in-time recovery"] },
];

export const TRUST_DEPLOYMENTS = [
  { name: "Standard", description: "Shared multi-tenant service", hosting: "Factro-hosted with a cloud provider", database: "Isolated per tenant", application: "Shared, tenant-isolated", storage: "Shared, tenant-isolated", encryption: "AES-256, key per tenant", fit: "Most plants" },
  { name: "Dedicated", description: "Your own infrastructure", hosting: "A dedicated cloud provider environment", database: "Your own", application: "Your own", storage: "Your own", encryption: "AES-256, key per tenant", fit: "Your policy asks for separation" },
  { name: "On-premises", description: "Inside your network", hosting: "Your data centre", database: "Your own", application: "Your own", storage: "Your own", encryption: "AES-256", fit: "Your policy asks for on-site" },
];
