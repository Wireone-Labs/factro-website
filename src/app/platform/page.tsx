import { permanentRedirect } from "next/navigation";

export default async function PlatformRedirect({ searchParams }: { searchParams: Promise<{ tab?: string | string[] }> }) {
  const { tab } = await searchParams;
  const moduleId = Array.isArray(tab) ? tab[0] : tab;
  const query = moduleId === "documents" || moduleId === "library" ? `?tab=${moduleId}#modules` : "";
  permanentRedirect(`/solutions/platform${query}`);
}
