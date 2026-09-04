import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { TEAM_MEMBERS, FOUNDING_STORIES } from "@/data/team";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "Factro is young. No wall of logos, and we've told you plainly which parts are still being built.",
  path: "/about",
});

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We are young. So were you."
        description="No wall of logos, and we've told you plainly which parts are still being built."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Who's building it"
            title="Core team"
            description="Small on purpose — everyone here writes code, talks to pilot plants, or both."
          />
          <RevealGroup
            className="mx-auto mt-12 flex max-w-3xl flex-col gap-5"
            stagger={0.08}
          >
            {TEAM_MEMBERS.map((member) => (
              <RevealItem key={member.id}>
                <div className="flex flex-col items-center gap-5 rounded-2xl border border-line bg-white p-6 text-center sm:flex-row sm:items-start sm:p-7 sm:text-left">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={72}
                      height={72}
                      className="h-18 w-18 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-18 w-18 shrink-0 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-xl font-semibold text-brand-600">
                      {initials(member.name)}
                    </span>
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
                      <h3 className="text-base font-semibold text-ink-900">
                        {member.name}
                      </h3>
                      <span className="text-sm font-medium text-brand-500">
                        {member.role}
                      </span>
                      {member.yearsExperience && (
                        <span className="inline-flex items-center rounded-full border border-line bg-mist/60 px-2.5 py-0.5 text-xs font-medium text-ink-500">
                          {member.yearsExperience}+ years experience
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ink-400">
              Our core team is supported by four more developers and support
              staff.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <SectionHeading
            align="left"
            eyebrow="How we got here"
            title="Two years, built on real plants"
          />

          <Reveal delay={0.05}>
            <p className="mt-8 text-base leading-relaxed text-ink-600 sm:text-lg">
              We have been building for the past two years — periodic trials
              and feedback sessions with real manufacturers, alongside
              studying world-class products like MasterControl, QT9 and SAP,
              to build something with a high bar: modern UX, optimised for
              speed, with enterprise-grade security built in.
            </p>
          </Reveal>

          <RevealGroup
            className="mt-10 flex flex-col gap-7 border-l-2 border-line pl-6"
            stagger={0.06}
          >
            {FOUNDING_STORIES.map((story) => (
              <RevealItem key={story.year} className="relative">
                <span className="absolute -left-[1.97rem] top-1.5 h-2.5 w-2.5 rounded-full bg-brand-500" />
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-500">
                  {story.year}
                </span>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">
                  {story.text}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal delay={0.1}>
            <p className="mt-8 text-xl leading-snug font-semibold tracking-tight text-ink-900 sm:text-2xl">
              None of them looked like a safe purchase at the time. Somebody
              backed them anyway.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-10 text-base leading-relaxed text-ink-600 sm:text-lg">
              Factro is young. No wall of logos, and we have told you plainly
              which parts are still being built. What we have is a small team
              that designs, builds, tests and ships, answers the phone
              itself, and stands on pilot floors watching its own software
              get used. Putting execution, quality and compliance in one
              system that survives an inspection is a hard problem, and most
              software here has quietly settled for a piece of it. We would
              rather solve the whole thing, for India first, to a standard
              that holds anywhere.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="max-w-3xl">
          <Reveal>
            <blockquote className="mt-6 rounded-2xl border border-brand-100 bg-brand-50/60 px-6 py-6 text-center text-lg leading-snug font-semibold tracking-tight text-ink-900 sm:text-xl">
              Back us early and you will not be a customer we support. You
              will be a plant we build around.
            </blockquote>
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
