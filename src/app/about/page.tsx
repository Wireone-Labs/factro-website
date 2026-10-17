import type { Metadata } from "next";
import { Activity, Banknote, Car, ClipboardCheck, Factory, GraduationCap, Headset, LockKeyhole, MapPin, Network, Pill, RefreshCw, Route, ShieldCheck, Sprout, Timer, Truck, Wallet } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { BuildingFactro } from "@/components/sections/building-factro";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import {
  BOOK_DEMO_HREF,
} from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "From a purpose-built solution for a pharmaceutical manufacturer in Puducherry to a regulated manufacturing platform, Factro is shaped by real plant workflows and release-by-release validation.",
  path: "/about",
});

const TEAM_INDUSTRIES = [
  { label: "Manufacturing", icon: Factory },
  { label: "Finance", icon: Banknote },
  { label: "Automotive", icon: Car },
  { label: "Mobility", icon: Route },
  { label: "Agriculture", icon: Sprout },
  { label: "Logistics", icon: Truck },
  { label: "Education", icon: GraduationCap },
  { label: "Pharmaceutical", icon: Pill },
];

const TEAM_PROOF = [
  {
    value: "13 years of hands-on delivery",
    label: "Across 50+ projects, our team has built production-grade systems, adopted new technologies and learned the demands of different industries.",
    icon: Timer,
  },
  {
    value: "Experience operating IoT at scale",
    label: "We have managed infrastructure serving 10,000+ active IoT edge clients and processing over 5 million messages a day.",
    icon: Network,
  },
  {
    value: "A background in real-time systems",
    label: "We have integrated OLAP engines to turn millions of daily events into sub-second monitoring and actionable alerts.",
    icon: Activity,
  },
  {
    value: "A track record of reliable operations",
    label: "Our operational experience includes maintaining 20 large servers with 99.9% uptime over five years of live service.",
    icon: ShieldCheck,
  },
  {
    value: "Expertise in lean infrastructure",
    label: "Our work has taught us to balance scale, performance and cost, building enterprise systems without unnecessary infrastructure overhead.",
    icon: Wallet,
  },
  {
    value: "A foundation in disciplined delivery",
    label: "We bring experience with strict software development lifecycles: traceable requirements, reviewed code and validated releases before production.",
    icon: ClipboardCheck,
  },
];

const TEAM_SECURITY = [
  {
    title: "Validation & Resilience",
    description: "Mandatory security audits, unit tests, QA and approvals before deployment. Automated backups across every environment support recovery.",
    icon: ClipboardCheck,
  },
  {
    title: "Access & Secrets Management",
    description: "Credentials and keys stay in secure secrets management. Infrastructure access is least-privilege, strictly gated and continuously audited.",
    icon: LockKeyhole,
  },
  {
    title: "Isolation & Encryption",
    description: "Infrastructure runs in isolated VPCs without public exposure. Encryption protects data in transit and at rest.",
    icon: ShieldCheck,
  },
];

const HOW_WE_WORK = [
  {
    day: 1,
    tileClassName: "border-rose-200",
    headerClassName: "border-rose-200 bg-rose-50 text-rose-700",
    lead: "The people who build it answer the phone.",
    detail: [
      "Speak directly with the engineers who design and build your workflows.",
      "Your questions reach the people who can investigate, explain and resolve them.",
    ],
    icon: Headset,
  },
  {
    day: 3,
    tileClassName: "border-amber-200",
    headerClassName: "border-amber-200 bg-amber-50 text-amber-700",
    lead: "We come to your floor.",
    detail: [
      "We visit your facility to understand your processes, handovers and constraints.",
      "The visit is at our expense, and your operational data stays with you.",
    ],
    icon: MapPin,
  },
  {
    day: 21,
    tileClassName: "border-teal-200",
    headerClassName: "border-teal-200 bg-teal-50 text-teal-700",
    lead: "Thirty days to go-live, committed.",
    detail: [
      "Go live in 30 days once your User Requirements Specification (URS) is accepted.",
      "If we miss that commitment, your next two months are on us.",
    ],
    icon: Timer,
  },
  {
    day: 30,
    tileClassName: "border-violet-200",
    headerClassName: "border-violet-200 bg-violet-50 text-violet-700",
    lead: "Every release is included.",
    detail: [
      "New capabilities and regulatory packs are included with every release.",
      "There are no upgrade fees to access improvements as the platform evolves.",
    ],
    icon: RefreshCw,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built from India, to a standard that holds anywhere"
      />

      <BuildingFactro />

      <section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <SectionHeading
            eyebrow="The team"
            className="lg:[&_p]:max-w-none"
            title="Young enough to move fast. Experienced enough to know what breaks."
            description="Operational software shouldn't fail when the real world gets complicated. We engineer systems that handle the friction, scale effortlessly, and protect your bottom line."
          />

          <Reveal className="mt-8 text-center">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-400">Industries we have worked in</h3>
            <ul className="mt-4 flex flex-wrap justify-center gap-3">
              {TEAM_INDUSTRIES.map(industry => (
                <li key={industry.label} className="group inline-flex items-center gap-2 rounded-full border border-brand-100 bg-mist px-4 py-2 text-sm text-ink-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 hover:shadow-sm motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:-translate-y-1">
                  <industry.icon size={16} className="shrink-0 text-brand-600 motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-110" aria-hidden="true" />
                  {industry.label}
                </li>
              ))}
            </ul>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-x-10 sm:grid-cols-2" stagger={0.04}>
            {TEAM_PROOF.map((proof) => (
              <RevealItem key={proof.value}>
                <div className="flex h-full items-start gap-4 border-t border-line py-6">
                  <proof.icon size={22} className="mt-1 shrink-0 text-brand-600" aria-hidden="true" />
                  <div>
                    <h4 className="text-xl font-semibold tracking-tight text-ink-900">{proof.value}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{proof.label}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 rounded-3xl border border-brand-100 bg-mist p-6 sm:p-8">
            <Reveal>
              <h3 className="text-2xl font-semibold tracking-tight text-ink-900">Our security principles</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-500">
                The standards we apply to every release, environment and access decision.
              </p>
            </Reveal>
            <RevealGroup className="mt-7" stagger={0.04}>
              {TEAM_SECURITY.map((item) => (
                <RevealItem key={item.title}>
                  <div className="grid gap-3 border-t border-brand-100 py-5 sm:grid-cols-[.9fr_1.1fr] sm:gap-6">
                    <div className="flex items-start gap-3">
                      <item.icon size={21} className="mt-0.5 shrink-0 text-brand-600" aria-hidden="true" />
                      <h4 className="text-base font-semibold text-ink-900">{item.title}</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-500">{item.description}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="How we work" title="What working with us looks like" />

          <RevealGroup className="mt-10 border-b border-line" stagger={0.06}>
            {HOW_WE_WORK.map((item) => (
              <RevealItem key={item.lead}>
                <div className="grid grid-cols-[4rem_1fr] items-center gap-x-5 gap-y-3 border-t border-line py-8 sm:items-start sm:gap-x-6 sm:gap-y-2">
                  <span className={`flex w-16 flex-col overflow-hidden rounded-2xl border bg-white shadow-sm sm:row-span-2 ${item.tileClassName}`}>
                    <span className={`flex items-center justify-center gap-1 border-b py-1.5 ${item.headerClassName}`}>
                      <item.icon size={12} strokeWidth={2} aria-hidden="true" />
                      <span className="text-[9px] font-semibold uppercase tracking-wider">Day</span>
                    </span>
                    <span className="py-1.5 text-center text-3xl font-medium leading-none tracking-tight text-ink-900">{item.day}</span>
                  </span>
                  <h3 className="text-base font-semibold leading-relaxed text-ink-900">
                    {item.lead}
                  </h3>
                  <p className="col-span-2 text-sm leading-7 text-ink-500 sm:col-span-1 sm:col-start-2">
                    {item.detail.map((line) => <span key={line} className="block">{line}</span>)}
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
        description="A direct conversation with the engineers behind Factro."
        primaryLabel="Book a demo"
        primaryHref={BOOK_DEMO_HREF}
      />
    </>
  );
}
