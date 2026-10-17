import { notFound, permanentRedirect } from "next/navigation";
import { PRODUCT_PAGES, getProduct } from "@/data/product-pages";

type Props = { params: Promise<{ product: string; feature: string }> };

export function generateStaticParams() {
  return PRODUCT_PAGES.flatMap(product => product.features.map(feature => ({ product: product.slug, feature: feature.slug })));
}

export default async function ProductFeaturePage({ params }: Props) {
  const { product: slug, feature: featureSlug } = await params;
  const product = getProduct(slug);
  const feature = product?.features.find(item => item.slug === featureSlug);
  if (!product || !feature) notFound();
  permanentRedirect(`/${product.slug}#${feature.slug}`);
}
