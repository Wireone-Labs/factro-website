import Link from "next/link";
import { ArrowRight, Factory, Layers, ShieldCheck, Workflow } from "lucide-react";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { PRODUCT_PAGES } from "@/data/product-pages";

const PRODUCT_ICONS = { erp: Workflow, mes: Factory, qms: ShieldCheck, one: Layers };
export function ProductCards({ exclude }: { exclude?: string }) {
  return <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {PRODUCT_PAGES.filter(product => product.slug !== "one" && product.slug !== exclude).map(product => {
      const Icon = PRODUCT_ICONS[product.slug as keyof typeof PRODUCT_ICONS];
      return <Link key={product.slug} href={`/${product.slug}`} className="group flex flex-col rounded-2xl border border-brand-100 bg-white p-7 transition-colors hover:border-brand-300 hover:bg-brand-50/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-500">
        <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-brand-500" aria-hidden="true" /><span className="text-xs font-medium tracking-wide text-ink-400">{product.category}</span></div>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink-900">{product.name}</h3>
        <p className="mt-3 text-base font-medium text-ink-700">{product.title}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-500">{product.description}</p>
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">Explore {product.name}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
      </Link>;
    })}
  </div>;
}

export function ProductRollout() {
  const stages = [
    ["Days 1–2", "Map your floor", "Walk through your processes, roles and records with our team."],
    ["From day 3", "Train by role", "Your operators learn the work they will actually do. Training is included."],
    ["Within 2 weeks", "Bring your records", "Migrate your data and prepare the site for operation."],
    ["Within a month", "Go live, together", "Complete onboarding with three days of assisted operation."],
  ];
  return <>
    <section className="py-16 sm:py-20"><Container>
      <SectionHeading eyebrow="Getting started" title="Live in a month. You pay when it’s working." />
      <ol className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">{stages.map(([time, title, body], index) => <li key={title} className="border-t border-brand-200 pt-5"><div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wide text-brand-600"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-50">{index + 1}</span>{time}</div><h3 className="mt-4 text-lg font-semibold text-ink-900">{title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-500">{body}</p></li>)}</ol>
      <div className="mt-10 grid gap-6 border-t border-line pt-8 md:grid-cols-2"><div><h3 className="text-lg font-semibold text-ink-900">No commitment before it works.</h3><p className="mt-2 text-sm leading-relaxed text-ink-500">Your subscription starts only after onboarding, migration and three days of assisted operation. No purchase obligation. Cancel freely before that point.</p></div><div><h3 className="text-lg font-semibold text-ink-900">Priced per user. Every release included.</h3><p className="mt-2 text-sm leading-relaxed text-ink-500">New modules, capabilities and releases come with your subscription. No upgrade fee.</p><Link href="/demo" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline">Discuss pricing<ArrowRight size={15} aria-hidden="true" /></Link></div></div>
    </Container></section>
    <Cta id="product-demo" title="Bring a real batch and a real deviation." description="In 30 minutes, walk a real workflow with our team. See the records, the controls and the decisions, not a slide deck." />
  </>;
}

export { ProductDetailPage as ProductDetail } from "./product-detail";
