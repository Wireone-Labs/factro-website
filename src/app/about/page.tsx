import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/analytics/tracked-link";
import {
  BOOK_DEMO_HREF,
  SALES_MAILTO,
  SALES_EMAIL,
  SALES_PHONE,
  SALES_PHONE_HREF,
} from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Factro is a compliance-native manufacturing platform for regulated industries, built by Wireone Labs in Bengaluru.",
  path: "/about",
});

const WHAT_WE_BUILD = [
  {
    lead: "Compliance as architecture.",
    detail:
      "A control that can be overridden at 2am is not a control. We make the non-compliant action unavailable rather than warning about it, which is why the record looks the same on a Saturday as it does during an inspection.",
  },
  {
    lead: "One platform, many frameworks.",
    detail:
      "The primitives behind 21 CFR Part 11, Schedule 4 Part II, 21 CFR Part 111 and ICH Q7 are the same. We implement them once and map each industry's clauses onto them.",
  },
  {
    lead: "Built for India first, to a standard that holds anywhere.",
    detail:
      "The regulatory reality of an Indian plant exporting to the US and EU is the hardest version of this problem, so it is the one we designed for.",
  },
];

const HOW_WE_WORK = [
  {
    lead: "The people who build it answer the phone.",
    detail: "You are not routed through a support tier to reach someone who can change the software.",
  },
  {
    lead: "We come to your floor.",
    detail: "Demos run on your workflows, at your facility, at our expense, and your data never leaves the room.",
  },
  {
    lead: "Thirty days to go-live, committed.",
    detail: "If we miss it, you run on us for two further months at no cost.",
  },
  {
    lead: "Every release is included.",
    detail: "New modules, new capabilities and new regulatory packs arrive without an upgrade fee or a renegotiation at renewal.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="A compliance-native manufacturing platform for regulated industries"
        description="Factro runs supply chain, batch execution and quality on one database, with the rules of your industry enforced in the architecture rather than configured on top of it. It is built by Wireone Labs in Bengaluru."
      />

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="What we build"
            title="One system where most of this market builds pieces"
            description="A plant that buys an ERP, an MES, a QMS, a LIMS and a document system then spends every year paying to make the five of them talk to each other, and spends every inspection proving that what they said to each other was true. Putting execution, quality and compliance on one record is a harder problem than building any one of them, and it is the only version that survives an audit without an assembly exercise first."
          />

          <RevealGroup className="mt-10 flex flex-col gap-6" stagger={0.06}>
            {WHAT_WE_BUILD.map((item) => (
              <RevealItem key={item.lead}>
                <p className="text-base leading-relaxed text-ink-600">
                  <span className="font-semibold text-ink-900">{item.lead}</span>{" "}
                  {item.detail}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="How we work" title="What working with us looks like" />

          <RevealGroup
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
            stagger={0.06}
          >
            {HOW_WE_WORK.map((item) => (
              <RevealItem key={item.lead}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <h3 className="text-sm font-semibold text-ink-900">
                    {item.lead}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {item.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container className="max-w-3xl">
          <Reveal>
            <div className="rounded-2xl border border-line bg-mist/50 px-6 py-6 sm:px-8 sm:py-8">
              <h3 className="text-sm font-semibold text-ink-900">Where it runs</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                Factro runs on AWS in Mumbai or Hyderabad, so data stays in
                India, with per-tenant encryption, two-tier backups and
                point-in-time recovery on every deployment. Dedicated
                customers can choose any AWS region and take a private estate
                end to end. ISO 27001 certification is in progress.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                For the technical detail, see{" "}
                <Link
                  href="/infrastructure-security"
                  className="font-medium text-brand-600 underline underline-offset-2"
                >
                  Infrastructure &amp; Security
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="mt-10 text-center">
            <p className="text-sm font-semibold text-ink-900">Talk to us</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-500">
              <TrackedLink
                href={SALES_PHONE_HREF}
                event="phone_click"
                eventParams={{ location: "about_page" }}
                className="font-medium text-ink-700 hover:text-brand-600"
              >
                {SALES_PHONE}
              </TrackedLink>
              <a
                href={SALES_MAILTO}
                className="font-medium text-ink-700 hover:text-brand-600"
              >
                {SALES_EMAIL}
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <Cta
        id="cta-about"
        title="Talk to the people building it"
        description="No sales rep in between — you'll be talking to the engineers who built the system."
        primaryLabel="Book a demo"
        primaryHref={BOOK_DEMO_HREF}
        secondaryLabel="Email our team"
        secondaryHref={SALES_MAILTO}
      />
    </>
  );
}
