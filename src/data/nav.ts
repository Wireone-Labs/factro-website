import type { LucideIcon } from "lucide-react";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Building2,
  Factory,
  ShieldCheck,
  FileWarning,
  FileText,
  GraduationCap,
  Layers,
} from "lucide-react";

export interface MegaMenuItem {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface MegaMenuColumn {
  heading: string;
  items: MegaMenuItem[];
}

export interface MegaMenu {
  description: string;
  columns: MegaMenuColumn[];
  footerLabel?: string;
  footerHref?: string;
}

export interface NavItem {
  label: string;
  href: string;
  menu?: MegaMenu;
}

export const MODULES_MENU: MegaMenu = {
  description: "All ten workspaces, running on one system that already talks to itself.",
  columns: [
    {
      heading: "",
      items: [
        {
          label: "Sales",
          description: "Enquiry to dispatch",
          href: "/modules?tab=sales",
          icon: TrendingUp,
        },
        {
          label: "Purchase",
          description: "Nothing enters unapproved",
          href: "/modules?tab=purchase",
          icon: ShoppingCart,
        },
        {
          label: "Inventory",
          description: "Nothing reaches the floor unchecked",
          href: "/modules?tab=inventory",
          icon: Package,
        },
        {
          label: "Facility",
          description: "Your plant, modelled once",
          href: "/modules?tab=facility",
          icon: Building2,
        },
      ],
    },
    {
      heading: "",
      items: [
        {
          label: "Production",
          description: "The record writes itself",
          href: "/modules?tab=production",
          icon: Factory,
        },
        {
          label: "Quality",
          description: "The gate, not the review",
          href: "/modules?tab=quality",
          icon: ShieldCheck,
        },
        {
          label: "CAPA",
          description: "Close the loop with proof",
          href: "/modules?tab=capa",
          icon: FileWarning,
        },
      ],
    },
    {
      heading: "",
      items: [
        {
          label: "Documents",
          description: "One version, everywhere",
          href: "/modules?tab=documents",
          icon: FileText,
        },
        {
          label: "Training",
          description: "Proof, not attendance",
          href: "/modules?tab=training",
          icon: GraduationCap,
        },
        {
          label: "Library",
          description: "Every master in one place",
          href: "/modules?tab=library",
          icon: Layers,
        },
      ],
    },
  ],
  footerLabel: "See what's in every module",
  footerHref: "/modules",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Modules", href: "/modules", menu: MODULES_MENU },
  { label: "Compliances", href: "/compliances" },
  { label: "Security", href: "/infrastructure-security" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const SIGN_IN_URL = "https://app.factro.io/login";
export const BOOK_DEMO_HREF = "/demo";
export const SALES_EMAIL = "hello@factro.io";
export const SALES_MAILTO = `mailto:${SALES_EMAIL}`;
export const SALES_PHONE = "+91 81225 76712";
export const SALES_PHONE_HREF = "tel:+918122576712";
