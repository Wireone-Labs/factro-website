import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SOLUTIONS, SHARED_FOUNDATION, moduleHref } from "@/data/solutions";
import { CORE_MODULES } from "@/data/modules";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "ERP, MES & QMS Solutions",
  description: "Explore Factro's ERP, MES and QMS solutions for regulated manufacturing. Connect business, production and quality, together or alongside your existing systems.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return <>
    <PageHero eyebrow="Solutions" title="The right solution for every part of your operation." description="ERP for your business. MES for your floor. QMS for your quality. Start where you need to, with a shared foundation that keeps the work connected." />
    <section className="py-10 sm:py-16" aria-label="Manufacturing solutions">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {SOLUTIONS.map(solution => <article key={solution.slug} className="flex flex-col rounded-2xl border border-line p-7" style={{ background: `linear-gradient(145deg, ${solution.slug === "mes" ? "#eef8f5" : solution.slug === "qms" ? "#f4f1fc" : "#f1f5ff"}, white 80%)` }}>
            <div className="flex items-center gap-3 text-brand-600"><solution.icon size={28} /><h2 className="text-3xl font-semibold">{solution.name}</h2></div>
            <p className="mt-3 text-xs text-ink-500">{solution.fullName}</p>
            <h3 className="mt-8 text-xl font-semibold tracking-tight text-ink-900">{solution.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">{solution.description}</p>
            <div className="mt-7 hidden border-t border-line pt-5 xl:block">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">Modules within {solution.name}</p>
              <ul className="mt-3 space-y-3">{solution.modules.map(id => {
                const mod = CORE_MODULES.find(item => item.id === id)!;
                return <li key={id}><Link href={moduleHref(id)} className="flex items-center gap-2 text-sm text-ink-700 hover:text-brand-600"><mod.icon size={16} />{mod.tag}<ArrowRight size={14} className="ml-auto" /></Link></li>;
              })}</ul>
            </div>
            <Link href={solution.href} className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-brand-600 hover:underline">Explore {solution.name}<ArrowRight size={16} /></Link>
          </article>)}
        </div>
        <div className="mt-12 rounded-2xl border border-line bg-mist/40 p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">DMP · Digital Manufacturing Platform</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-900">Three solutions. One continuous operation.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-500">An order becomes a production plan. A batch carries its evidence into quality review. A release decision updates stock and dispatch. Follow the handovers without rebuilding the context.</p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-500">{SHARED_FOUNDATION}</p>
          <div className="mt-7"><Button href="/solutions/platform" variant="secondary">Explore DMP<ArrowRight size={16} /></Button></div>
        </div>
      </Container>
    </section>
    <Cta id="cta-solutions" title="Start with the work you need to improve." description="We'll map your plant's priorities to the right solution and the modules within it." />
  </>;
}
