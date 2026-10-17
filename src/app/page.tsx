import { Hero } from "@/components/sections/hero";
import { PlatformThreads } from "@/components/sections/platform-threads";
import { ThreePillars } from "@/components/sections/three-pillars";
import { ModulesTeaser } from "@/components/sections/modules-teaser";
import { ConnectedSystem } from "@/components/sections/continuum-screen";
import { BusinessOutcomes } from "@/components/sections/business-outcomes";
import { IndustryScenarios } from "@/components/sections/industry-scenarios";
import { PilotStatus } from "@/components/sections/pilot-status";
import { SupportHighlight } from "@/components/sections/support-highlight";
import { Proof } from "@/components/sections/proof";
import { Faq } from "@/components/sections/faq";
import desktopStyles from "@/components/sections/home-desktop.module.css";

export default function Home() {
  return (
    <div className={desktopStyles.page}>
      <PlatformThreads>
        <Hero />
        <ThreePillars />
      </PlatformThreads>
      <ModulesTeaser />
      <ConnectedSystem>
        <BusinessOutcomes />
      </ConnectedSystem>
      <IndustryScenarios />
      <SupportHighlight />
      <Proof />

      <PilotStatus />

      <Faq />

    </div>
  );
}
