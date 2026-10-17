import { SecurityTrustPage } from "@/components/sections/security-trust-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Security & Trust — Privacy, Compliance & AI",
  description: "Explore Factro’s five protection layers, access boundaries, audit trails, encrypted backups, deployment options and private AI.",
  path: "/security-trust",
});

export default function TrustCenterPage() {
  return <SecurityTrustPage />;
}
