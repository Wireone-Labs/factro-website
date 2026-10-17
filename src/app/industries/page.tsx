import { IndustryDirectory } from "@/components/sections/industry-directory";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Industries · Seven industries, one platform",
  description: "One core handles materials, batches, quality and dispatch. Explore the regulatory packs for seven manufacturing industries.",
  path: "/industries",
});

export default function IndustriesPage() {
  return <IndustryDirectory />;
}
