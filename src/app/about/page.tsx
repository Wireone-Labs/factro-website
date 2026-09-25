import type { Metadata } from "next";
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
    "Factro is built in Bengaluru for regulated manufacturers operating across Indian, US, EU and global standards.",
  path: "/about",
});

const WHAT_WE_BUILD = [
  {
    lead: "Built where the constraints are real.",
    detail:
      "Indian manufacturers run complex plants, serve multiple markets and cannot spend years stitching imported systems together. Factro starts with that operating reality instead of treating it as an edge case.",
  },
  {
    lead: "Compliance as architecture.",
    detail:
      "A control that can be overridden at 2am is not a control. We make the non-compliant action unavailable rather than warning about it, which is why the record looks the same on a Saturday as it does during an inspection.",
  },
  {
    lead: "One platform, many frameworks.",
    detail:
      "The same operating core can carry Indian, US, EU and global regulatory packs at once. A batch knows which rules apply, while the plant keeps one access model, one audit trail and one source of truth.",
  },
];

const TEAM_PROOF = [
  {
    value: "12+ years",
    label: "Building production systems",
    detail: "Across fintech, automotive and agritech.",
  },
  {
    value: "5 million",
    label: "IoT messages every hour",
    detail: "Sustained throughput in real operations, not a benchmark environment.",
  },
  {
    value: "99.9%",
    label: "Uptime sustained for five years",
    detail: "The operating discipline behind systems that cannot pause for a bad day.",
  },
  {
    value: "Cost disciplined",
    label: "Enterprise scale without enterprise waste",
    detail: "Delivered at infrastructure costs comparable to what many companies spend on basic ERP or BPM systems.",
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
        title="Built from India, to a standard that holds anywhere"
        description="Designed and engineered in Bengaluru for regulated manufacturers whose products, plants and audits cross borders. Factro combines the operating reality of Indian manufacturing with controls that stand up in US, EU and global markets."
      />

      <section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="The team"
            title="Young enough to move fast. Experienced enough to know what breaks."
            description="More than twelve years building scalable systems across fintech, automotive and agritech taught us that the process diagram is never the whole process. The real operation lives in exceptions, handovers and tribal knowledge. We learn that layer, turn it into software and stay close enough to the floor to know when it is wrong."
          />

          <RevealGroup
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2"
            stagger={0.06}
          >
            {TEAM_PROOF.map((proof) => (
              <RevealItem key={proof.value}>
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <p className="text-2xl font-semibold tracking-tight text-brand-600">
                    {proof.value}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-ink-900">
                    {proof.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {proof.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-base font-medium leading-relaxed text-ink-700">
              We are a young team with senior operating scar tissue: direct,
              ambitious and unwilling to leave the hard part for a later
              release. We do not confuse motion with progress. We find the
              constraint, own it and close it.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow="What we build"
            title="Indian manufacturing reality. Global regulatory discipline."
            description="Factories here are not simpler versions of plants elsewhere. They run multiple product categories, export across jurisdictions and work under tighter implementation constraints. Factro is built around that complexity: one operational record, flexible deployment and controls an auditor can follow anywhere."
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

      <Cta
        id="cta-about"
        title="Talk to the people building it"
        description="No sales rep in between — you'll be talking to the engineers who built the system."
        primaryLabel="Book a demo"
        primaryHref={BOOK_DEMO_HREF}
        secondaryLabel="Email our team"
        secondaryHref={SALES_MAILTO}
      >
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink-300">
          <TrackedLink
            href={SALES_PHONE_HREF}
            event="phone_click"
            eventParams={{ location: "about_page" }}
            className="font-medium text-white hover:text-brand-200"
          >
            {SALES_PHONE}
          </TrackedLink>
          <a
            href={SALES_MAILTO}
            className="font-medium text-white hover:text-brand-200"
          >
            {SALES_EMAIL}
          </a>
        </div>
      </Cta>
    </>
  );
}
