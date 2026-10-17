import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { INDUSTRIES } from "@/data/industries";
import { industryTheme } from "@/data/industry-themes";
import { SALES_PHONE_HREF } from "@/data/nav";
import { IndustryBlueprintArt } from "./industry-blueprint-art";
import { IndustryShowcase, IndustrySetupSection } from "./industry-setup-illustration";
import { MarketingClosing, MarketingHeading } from "./marketing-ui";
import shared from "./marketing-page.module.css";
import styles from "./industry-pages.module.css";

export function IndustryDirectory() {
  return <div className={`${shared.page} ${styles.page}`}>
    <div className={shared.heroShell}><section className={shared.hero}><Container className={shared.heroGrid}>
      <div><p className={shared.eyebrow}>• Industries</p><h1>Seven industries.<br />One platform.</h1><p className={shared.heroLead}>From pharmaceuticals to food and beverage, run your industry on one connected platform. Industry-specific workflows, checks and compliance controls fit the way you manufacture. We’re adding more industries on request.</p><div className={shared.actions}><Button href="/demo">Book a demo<ArrowRight size={16} aria-hidden="true" /></Button></div></div>
      <IndustryShowcase industries={INDUSTRIES.map(({ slug, name }) => ({ slug, name }))} />
    </Container></section></div>
    <section id="packs" className={`${shared.section} ${shared.muted}`}>
      <Container>
        <MarketingHeading eyebrow="Regulatory packs" title="Pick your industry." muted="The core stays the same." description="Each pack carries the frameworks, records and controls for its industry, on top of the same core." />
        <div className={styles.packGrid}>
          {INDUSTRIES.map(industry => {
            const Icon = industry.icon;
            return <Link href={`/industries/${industry.slug}`} key={industry.slug} className={styles.packCard} style={industryTheme(industry.slug)}>
              <div className={styles.packVisual}>
                <div className={styles.packName}><Icon size={18} aria-hidden="true" /><h3>{industry.name}</h3></div>
                <div className={styles.packArt} data-native-asset><IndustryBlueprintArt industry={industry.slug} /></div>
              </div>
              <div className={styles.packInfo}>
                <p className={styles.packTagline}>{industry.tagline}</p>
                <div className={styles.packTags}>{industry.mappedStandards.slice(0,3).map(standard => <span key={standard.name}>{standard.name}</span>)}</div>
              </div>
            </Link>;
          })}
          <article className={`${styles.packCard} ${styles.packHelp}`}>
            <div className={styles.helpSymbol} aria-hidden="true"><MessageCircle size={28} strokeWidth={1.5} /><span>Let’s find your fit</span></div>
            <h3>Not sure of<br />your category?</h3>
            <p className={styles.packHelpCopy}>Tell us what you make. We’ll find the right blueprint, or mix of packs, for your plant.</p>
            <Button href={SALES_PHONE_HREF} variant="dark" className="mt-auto self-start" event="phone_click" eventParams={{ location: "industry_help" }}><Phone size={16} aria-hidden="true" />Call us</Button>
          </article>
        </div>
      </Container>
    </section>
    <IndustrySetupSection />
    <MarketingClosing title="Tell us what you make." muted="We will map the pack." description="Describe your products and markets. We will walk you through the controls that apply, on your own batch." />
  </div>;
}
