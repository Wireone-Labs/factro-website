import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { ModulesShowcase } from "@/components/sections/modules-showcase";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { SOLUTIONS, SOLUTION_WORKFLOWS, moduleHref } from "@/data/solutions";
import { CORE_MODULES } from "@/data/modules";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ solution: string }> };

export function generateStaticParams() {
  return SOLUTIONS.map(solution => ({ solution: solution.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { solution: slug } = await params;
  const solution = SOLUTIONS.find(item => item.slug === slug);
  if (!solution) notFound();
  return pageMetadata({ title: `${solution.name} — ${solution.fullName}`, description: solution.description, path: solution.href });
}

export default async function SolutionPage({ params }: Props) {
  const { solution: slug } = await params;
  const solution = SOLUTIONS.find(item => item.slug === slug);
  if (!solution) notFound();

  return <>
    <PageHero eyebrow={`${solution.name} · ${solution.fullName}`} title={solution.title} description={solution.description}>
      <div className="flex flex-wrap justify-center gap-3">{solution.modules.map(id => <Button key={id} href={moduleHref(id)} variant="secondary">{CORE_MODULES.find(item => item.id === id)!.tag}<ArrowRight size={15} /></Button>)}</div>
    </PageHero>
    <section className="py-10" aria-label={`${solution.name} outcomes`}>
      <Container><div className="grid gap-5 md:grid-cols-3">{SOLUTION_WORKFLOWS[slug].map(workflow => <article key={workflow.title} className="rounded-2xl border border-line p-6" style={{ backgroundColor: slug === "mes" ? "#eef8f5" : slug === "qms" ? "#f4f1fc" : "#f1f5ff" }}><h2 className="text-lg font-semibold text-ink-900">{workflow.title}</h2><p className="mt-3 text-sm leading-relaxed text-ink-500">{workflow.steps}</p><p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-ink-600"><Check className="mt-1 h-4 w-4 shrink-0 text-brand-500" /><span>{workflow.outcome}</span></p></article>)}</div></Container>
    </section>
    <Suspense fallback={null}><ModulesShowcase key={slug} groupName={solution.name} /></Suspense>
    <section className="py-12 sm:py-16">
      <Container>
        <div className="rounded-2xl border border-line bg-mist/40 p-7 sm:p-10">
          <div><p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Connected by design</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-900">{solution.name} doesn&apos;t work in isolation.</h2><p className="mt-4 text-sm leading-relaxed text-ink-500">{solution.handover}</p><Link href="/solutions/platform" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:underline">See how DMP connects the work<ArrowRight size={16} /></Link></div>
        </div>
      </Container>
    </section>
    <Cta id={`cta-${slug}`} title={`See ${solution.name} on your data.`} description="Walk through your workflows, roles and controls with our team." />
  </>;
}
