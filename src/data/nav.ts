import type { LucideIcon } from "lucide-react";
import type { IndustrySlug } from "./industry-themes";
import { ClipboardCheck, Droplet, Factory, Layers, Leaf, Network, PawPrint, Pill, Stethoscope, Warehouse, Wheat } from "lucide-react";

export interface MegaMenuItem {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tone?: "erp" | "mes" | "qms";
  industry?: IndustrySlug;
  badge?: string;
  divided?: boolean;
}

export interface MegaMenu {
  layout: "products" | "industries";
  heading: string;
  items: MegaMenuItem[];
  feature: {
    eyebrow: string;
    title: string;
    description: string;
    label: string;
    href: string;
  };
  contact: {
    title: string;
    description: string;
    label: string;
    href: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  menu?: MegaMenu;
}

export const INDUSTRIES_MENU: MegaMenu = {
  layout: "industries",
  heading: "Industries",
  items: [
    { label: "Pharmaceuticals", description: "Batch records that write themselves", href: "/industries/pharmaceuticals", icon: Pill, industry: "pharmaceuticals" },
    { label: "Medical Devices", description: "Design control and the device history file", href: "/industries/medical-devices", icon: Stethoscope, industry: "medical-devices" },
    { label: "Food & Beverage", description: "HACCP plans that run, not sit", href: "/industries/food-beverage", icon: Wheat, industry: "food-beverage" },
    { label: "Nutraceuticals", description: "Identity testing as a gate", href: "/industries/nutraceuticals", icon: Leaf, industry: "nutraceuticals" },
    { label: "Cosmetics", description: "The Product Information File, kept current", href: "/industries/cosmetics", icon: Droplet, industry: "cosmetics" },
    { label: "Veterinary", description: "One trace from premix to animal", href: "/industries/veterinary", icon: PawPrint, industry: "veterinary" },
    { label: "API & CDMO", description: "Each client sees only its own records", href: "/industries/api-cdmo", icon: Network, industry: "api-cdmo" },
  ],
  feature: { eyebrow: "All industries", title: "One platform, the controls your industry needs", description: "Each industry adds its own records and checks on the same foundation.", label: "See all industries", href: "/industries" },
  contact: { title: "Don’t see yours?", description: "Tell us how your plant works and we will show you the fit.", label: "Talk to us", href: "/demo" },
};

export const PRODUCTS_MENU: MegaMenu = {
  layout: "products",
  heading: "Products",
  items: [
    { label: "ERP", description: "Sales, purchase, inventory and accounting, with your rules checked on every stock movement.", href: "/erp", icon: Warehouse, tone: "erp" },
    { label: "MES", description: "Rooms, equipment, dispensing and sensor data, connected to the batch record.", href: "/mes", icon: Factory, tone: "mes" },
    { label: "QMS", description: "Deviations, CAPA, documents and training on the same record as the batches.", href: "/qms", icon: ClipboardCheck, tone: "qms" },
    { label: "All-in-One Suite", description: "ERP, MES and QMS on one database, so a decision in one controls the others.", href: "/one", icon: Layers, badge: "All three", divided: true },
  ],
  feature: { eyebrow: "The platform", title: "Three pillars under every product", description: "The Compliance Engine, Task Manager and Factro AI, on one page.", label: "Explore the platform", href: "/how-it-works" },
  contact: { title: "New to Factro?", description: "See it working on your own process.", label: "Book a demo", href: "/demo" },
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Products", href: "/products", menu: PRODUCTS_MENU },
  { label: "Industries", href: "/industries" },
  { label: "Security & Trust", href: "/security-trust" },
  { label: "About", href: "/about" },
];

export const SIGN_IN_URL = "https://app.factro.io/login";
export const BOOK_DEMO_HREF = "/demo";
export const SALES_EMAIL = "hello@factro.io";
export const SALES_MAILTO = `mailto:${SALES_EMAIL}`;
export const SALES_PHONE = "+91 81225 76712";
export const SALES_PHONE_HREF = "tel:+918122576712";
