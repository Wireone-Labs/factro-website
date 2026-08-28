import { Hero } from "@/components/sections/hero";
import { Industries } from "@/components/sections/industries";
import { ModulesTeaser } from "@/components/sections/modules-teaser";
import { Workflow } from "@/components/sections/workflow";
import { Proof } from "@/components/sections/proof";
import { ComplianceTeaser } from "@/components/sections/compliance-teaser";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Industries />
      <ModulesTeaser />
      <Workflow />
      <Proof />
      <ComplianceTeaser />
      <Faq />
      <Cta />
    </>
  );
}
