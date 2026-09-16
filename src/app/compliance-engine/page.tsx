import type { Metadata } from "next";
import Link from "next/link";
import {
  Gavel,
  Settings2,
  ShieldCheck,
  Radar,
  Layers,
  Info,
} from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { IconTile } from "@/components/ui/icon-tile";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Compliance Engine",
  description:
    "One rule engine, every framework. The controls that satisfy 21 CFR Part 11, Schedule 4 Part II, 21 CFR Part 111 and ICH Q7 are the same small set of primitives, implemented once in the architecture.",
  path: "/compliance-engine",
});

const PRIMITIVES = [
  "Append-only, hash-chained audit trail capturing old value, new value, author, time and reason on every change",
  "Immutable records and secure archives, with no hard delete of regulated data",
  "Re-authenticated approvals capturing the approver, time and meaning on every sign-off",
  "Role-based access control, down to the individual field",
  "Segregation of duties, where the maker is never the checker",
  "Linked-record architecture carrying full data lineage end to end",
  "Document control with version history, review dates and controlled distribution",
  "Training tied to document version, reassigned automatically on every revision",
  "Material status as a structural gate, covering hold, quarantine, release, expiry and retest",
  "Deviation detection routed into CAPA with owners, due dates and effectiveness review",
  "Change control across formulation, process, supplier, equipment and label",
  "Validation and qualification records, covering IQ, OQ, PQ, calibration and traceability matrices",
  "Quality risk management with a risk register and FMEA scoring",
  "Automated redundant backup with point-in-time disaster recovery",
];

const ALCOA_PLUS = [
  { letter: "A", word: "Attributable", detail: "Every entry carries the identity of the person who made it, captured at the moment of entry rather than assigned afterwards" },
  { letter: "L", word: "Legible", detail: "Records are structured data, not handwriting, and remain readable for the life of the retention obligation" },
  { letter: "C", word: "Contemporaneous", detail: "The entry happens at the step, on the floor, at the time. There is no transcription window in which memory has to fill a gap" },
  { letter: "O", word: "Original", detail: "The first capture is the record, and copies are marked as copies" },
  { letter: "A", word: "Accurate", detail: "Values are validated against specification at entry, so an out of range result becomes an investigation rather than a typo" },
  { letter: "+", word: "Complete", detail: "Nothing can be dropped from the record, including the failed attempt, the repeat test and the reason for both" },
  { letter: "+", word: "Consistent", detail: "One clock, one sequence, one set of units across every module" },
  { letter: "+", word: "Enduring", detail: "Retention runs by record class, automatically, including the classes that outlive the rest" },
  { letter: "+", word: "Available", detail: "Retrievable on demand throughout the retention period, in the form an inspector reads" },
];

const CONFIGURATION_POINTS = [
  { lead: "A rule change is a setting", detail: "not a deployment, so following a revised standard does not wait for an engineering cycle" },
  { lead: "Blast radius shown before you commit", detail: "so the system tells you which processes, documents and open records a change affects" },
  { lead: "The change is itself a controlled record", detail: "capturing who changed it, when and why" },
  { lead: "Enforced from that moment forward", detail: "with records created under the previous rule still readable against the rule that was in force when they were made" },
  { lead: "Nothing here is advisory", detail: "a configured rule is a boundary, not a recommendation" },
];

const READINESS_POINTS = [
  "Overdue and ageing items surfaced across deviations, CAPAs, change controls, calibrations and training",
  "Expiring records raised as tasks with named owners, so a lapsing certificate or qualification is work rather than a finding",
  "Audit trail review as a scheduled, evidenced activity, because regulators increasingly check that the review happens, not just that the trail exists",
  "The audit pack is a filtered view. Scope it to a product, a date range or a client and it assembles from records that were never scattered",
];

const PACK_POINTS = [
  { lead: "The framework map", detail: "pairs every clause with the control that satisfies it, so a question in an audit has an answer with evidence behind it" },
  { lead: "The record set", detail: "differs by industry, because a medical device file, a batch production record, a product information file and a medicated feed record are not the same document" },
  { lead: "The reporting clocks", detail: "differ too, and the pack starts the right timer against the right jurisdiction with an owner attached" },
  { lead: "A change in the standard is a change in the pack", detail: "delivered as part of the product at no extra cost" },
  { lead: "More than one pack can run in one plant", detail: "a batch knows which applies to it, and your inspector still sees one system, one access model and one audit log" },
];

export default function ComplianceEnginePage() {
  return (
    <>
      <PageHero
        eyebrow="Compliance Engine"
        title="One rule engine, every framework"
        description="The controls that satisfy 21 CFR Part 11, Schedule 4 Part II, 21 CFR Part 111 and ICH Q7 are the same small set of primitives expressed in different words. Factro implements the primitives once, in the architecture, and each industry pack maps its clauses onto them."
      />

      <section className="py-12 sm:py-14">
        <Container>
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <IconTile icon={Gavel} size="lg" className="shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                The rule is the control itself
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600">
                A rule engine built from the regulations themselves, not a
                checklist bolted on afterward. It does not remind you of the
                control, it is the boundary of what can happen on the floor.
                Maker cannot be checker, enforced by the system rather than a
                policy document. Every approval re-authenticates and captures
                a reason in the same transaction. Quarantined material cannot
                be dispensed, because the refusal is structural rather than a
                label on a drum.
              </p>
              <p className="mt-4 text-base leading-relaxed text-ink-600">
                The difference matters most when someone is in a hurry. A
                system that warns is a system that gets overridden at 2am on
                a Saturday. A system where the action is unavailable produces
                the same record on a Saturday as it does during an audit.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <SectionHeading
            eyebrow="Configuration, not code"
            title="Regulations move. The platform moves with them"
            description="A platform that needs a software release to follow a revised standard is always behind, and one that lets anyone edit a rule quietly is worse."
          />
          <RevealGroup
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3"
            stagger={0.05}
          >
            {CONFIGURATION_POINTS.map((point) => (
              <RevealItem
                key={point.lead}
                className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3.5"
              >
                <Settings2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                <p className="text-sm leading-relaxed text-ink-600">
                  <span className="font-semibold text-ink-900">{point.lead}</span>
                  , {point.detail}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <SectionHeading
            eyebrow="The primitives"
            title="Every regulated industry asks for the same fourteen things"
            description="Strip the clause numbers away and every framework converges on this list. Your pack decides which are mandatory, at what depth, and under which name."
          />
          <RevealGroup
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2"
            stagger={0.02}
          >
            {PRIMITIVES.map((text, index) => (
              <RevealItem key={text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[10px] font-semibold text-brand-600">
                  {index + 1}
                </span>
                <span className="text-sm leading-relaxed text-ink-600">{text}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <SectionHeading
            eyebrow="Data integrity"
            title="ALCOA+, enforced rather than trained"
            description="Data integrity findings are the most common serious observation across every regulated industry, and they are almost never caused by dishonesty. They are caused by systems that let a record be written later, by someone else, from a note. The engine removes the opportunity rather than warning about it."
          />
          <RevealGroup
            className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
            stagger={0.04}
          >
            {ALCOA_PLUS.map((item) => (
              <RevealItem key={item.word}>
                <div className="h-full rounded-2xl border border-line bg-white p-5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                    {item.letter}
                  </span>
                  <h3 className="mt-3 text-sm font-semibold text-ink-900">
                    {item.word}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-500">
                    {item.detail}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <IconTile icon={Radar} size="lg" className="shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                Inspection readiness, scored continuously
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600">
                Most plants discover their gaps during the inspection that
                finds them. The engine watches the same things an inspector
                does and scores them while there is still time to act.
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {READINESS_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
            <IconTile icon={Layers} size="lg" className="shrink-0" />
            <div className="flex-1">
              <h2 className="text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
                How a pack sits on the engine
              </h2>
              <p className="mt-5 text-base leading-relaxed text-ink-600">
                An industry pack is a mapping, not a separate product. It
                names the frameworks you are inspected against, points each
                clause at the primitive that satisfies it, adds the records
                that framework specifically requires, and sets the clocks it
                runs on.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                {PACK_POINTS.map((point) => (
                  <p key={point.lead} className="text-sm leading-relaxed text-ink-600">
                    <span className="font-semibold text-ink-900">{point.lead}</span>
                    , {point.detail}
                  </p>
                ))}
              </div>
              <p className="mt-5 text-sm">
                <Link
                  href="/industries"
                  className="font-medium text-brand-600 underline underline-offset-2"
                >
                  See which clauses apply to your product →
                </Link>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-line bg-mist/50 px-6 py-6">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <div>
                  <h3 className="text-sm font-semibold text-ink-900">
                    Validation readiness
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-ink-600">
                    <li>
                      Validation packs covering URS, IQ, OQ, PQ, RTM and GAMP
                      5 are available on the Dedicated tier.
                    </li>
                    <li>ISO 27001 certification is in progress.</li>
                    <li>
                      One system, one validation exercise. Running several
                      industry packs on one platform does not multiply the
                      qualification work.
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 flex items-start gap-3 pl-7 text-sm leading-relaxed text-ink-500">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />
                For the technical detail — encryption, access control, audit
                trail mechanics and backups — see{" "}
                <Link
                  href="/infrastructure-security"
                  className="font-medium text-brand-600 underline underline-offset-2"
                >
                  Infrastructure &amp; Security
                </Link>
                . For what sits in each workspace, see{" "}
                <Link
                  href="/modules"
                  className="font-medium text-brand-600 underline underline-offset-2"
                >
                  Modules
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <Cta
        id="cta-compliance-engine"
        title="Have a compliance requirement to walk through?"
        description="Tell us about your regulatory environment and we'll show you exactly how Factro fits."
        primaryLabel="Book a demo"
        primaryHref={BOOK_DEMO_HREF}
        secondaryLabel="Email our team"
        secondaryHref={SALES_MAILTO}
      />
    </>
  );
}
