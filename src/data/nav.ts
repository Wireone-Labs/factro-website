import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Gauge,
  Building2,
  Factory,
  Package,
  ShieldCheck,
  TrendingUp,
  ShoppingCart,
  BarChart3,
  Layers,
  GraduationCap,
  Plug,
  Lock,
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

export const PLATFORM_MENU: MegaMenu = {
  description: "Everything your operation needs, in one connected platform.",
  columns: [
    {
      heading: "Core Platform",
      items: [
        {
          label: "Platform Overview",
          description: "How it connects",
          href: "/platform",
          icon: LayoutDashboard,
        },
        {
          label: "Dashboard",
          description: "Role-aware view",
          href: "/platform#dashboard",
          icon: Gauge,
        },
      ],
    },
    {
      heading: "Operations",
      items: [
        {
          label: "Production",
          description: "Plan & execute batches",
          href: "/platform#production",
          icon: Factory,
        },
        {
          label: "Shop Floor",
          description: "Sites & work centers",
          href: "/platform#shop-floor",
          icon: Building2,
        },
        {
          label: "Inventory",
          description: "Stock & transfers",
          href: "/platform#inventory",
          icon: Package,
        },
        {
          label: "Quality",
          description: "QA, QC & CAPA",
          href: "/platform#quality",
          icon: ShieldCheck,
        },
      ],
    },
    {
      heading: "Business",
      items: [
        {
          label: "Sales & Customers",
          description: "Enquiry to invoice",
          href: "/platform#sales",
          icon: TrendingUp,
        },
        {
          label: "Procurement",
          description: "Vendors & POs",
          href: "/platform#procurement",
          icon: ShoppingCart,
        },
      ],
    },
    {
      heading: "Intelligence",
      items: [
        {
          label: "Reports & Analytics",
          description: "Pre-built report library",
          href: "/platform#reports",
          icon: BarChart3,
        },
        {
          label: "Process Library",
          description: "BOMs & formulas",
          href: "/platform#library",
          icon: Layers,
        },
        {
          label: "Training",
          description: "Built-in training",
          href: "/platform#training",
          icon: GraduationCap,
        },
      ],
    },
    {
      heading: "Connectivity",
      items: [
        {
          label: "Integrations",
          description: "Fits your stack",
          href: "/platform#integrations",
          icon: Plug,
        },
        {
          label: "Security",
          description: "Access & data control",
          href: "/compliance",
          icon: Lock,
        },
      ],
    },
  ],
  footerLabel: "See the full platform",
  footerHref: "/platform",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Platform", href: "/platform", menu: PLATFORM_MENU },
  { label: "Pricing", href: "/pricing" },
  { label: "Compliance", href: "/compliance" },
];

export const SIGN_IN_URL = "https://app.factro.io/login";
export const BOOK_DEMO_HREF = "/book-demo";
export const SALES_EMAIL = "sales@factro.io";
export const SALES_MAILTO = `mailto:${SALES_EMAIL}`;
