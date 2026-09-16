import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { IndustryDetail } from "@/components/sections/industry-detail";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { pageMetadata } from "@/lib/site";

export function generateStaticParams() {
  return INDUSTRIES.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return pageMetadata({
    title: industry.name,
    description: industry.summary,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  return <IndustryDetail industry={industry} />;
}
