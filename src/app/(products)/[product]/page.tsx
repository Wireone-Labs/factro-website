import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/sections/product-pages";
import { PRODUCT_PAGES, getProduct } from "@/data/product-pages";
import { pageMetadata } from "@/lib/site";
import { PRODUCT_REFRESH } from "@/data/product-refresh";
import type { ProductSlug } from "@/data/product-detail-content";

type Props = { params: Promise<{ product: string }> };

export function generateStaticParams() {
  return PRODUCT_PAGES.map(product => ({ product: product.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const content = PRODUCT_REFRESH[product.slug as ProductSlug];
  return pageMetadata({ title: `${product.slug === "one" ? "All-in-One Suite" : product.name} · ${content.title}`, description: content.description, path: `/${product.slug}` });
}

export default async function ProductPage({ params }: Props) {
  const { product: slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
