import { Info } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TrackedLink } from "@/components/analytics/tracked-link";
import type { LegalSection } from "@/data/legal";
import { SALES_EMAIL, SALES_MAILTO } from "@/data/nav";

export function LegalDocument({
  sections,
  lastUpdated,
}: {
  sections: LegalSection[];
  lastUpdated: string;
}) {
  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                On this page
              </p>
              <nav className="mt-4 flex flex-col gap-0.5">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-lg px-2.5 py-1.5 text-sm text-ink-500 transition-colors hover:bg-mist hover:text-ink-900"
                  >
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <div className="min-w-0 max-w-2xl">
            <Reveal>
              <div className="flex items-start gap-3 rounded-2xl border border-line bg-mist/50 px-5 py-4">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-400" />
                <p className="text-sm leading-relaxed text-ink-500">
                  This page is a working template that reflects how Factro
                  operates today. It&apos;s structured to be reviewed by
                  counsel and replaced with a final, jurisdiction-specific
                  version before general availability.
                </p>
              </div>
            </Reveal>

            <p className="mt-8 text-sm text-ink-400">
              Last updated: {lastUpdated}
            </p>

            <div className="mt-6 flex flex-col gap-12">
              {sections.map((s) => (
                <Reveal key={s.id}>
                  <div id={s.id} className="scroll-mt-28">
                    <h2 className="text-xl font-semibold tracking-tight text-ink-900">
                      {s.title}
                    </h2>
                    <div className="mt-3 flex flex-col gap-3">
                      {s.paragraphs.map((p, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-ink-600"
                        >
                          {p}
                        </p>
                      ))}
                    </div>
                    {s.list && (
                      <ul className="mt-3 flex flex-col gap-2">
                        {s.list.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-600"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {s.id === "contact" && (
                      <TrackedLink
                        href={SALES_MAILTO}
                        event="contact_click"
                        eventParams={{ location: "legal_page" }}
                        className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700"
                      >
                        {SALES_EMAIL}
                      </TrackedLink>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
