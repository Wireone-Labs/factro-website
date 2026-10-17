import { permanentRedirect } from "next/navigation";
import { CORE_MODULES } from "@/data/modules";
import { moduleHref } from "@/data/solutions";

export default async function ModulesPage({ searchParams }: { searchParams: Promise<{ tab?: string | string[] }> }) {
  const { tab } = await searchParams;
  const moduleId = Array.isArray(tab) ? tab[0] : tab;
  permanentRedirect(moduleId && CORE_MODULES.some(module => module.id === moduleId) ? moduleHref(moduleId) : "/products");
}
