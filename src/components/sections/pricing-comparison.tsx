import { Fragment } from "react";
import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { COMPARISON_TABLE, PRICING_PLANS } from "@/data/pricing";

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4.5 w-4.5 text-brand-500" />
    ) : (
      <Minus className="mx-auto h-4.5 w-4.5 text-ink-200" />
    );
  }
  return <span className="text-sm text-ink-600">{value}</span>;
}

export function PricingComparison() {
  return (
    <section className="pb-24 sm:pb-32">
      <Container>
        <SectionHeading
          eyebrow="Compare plans"
          title="Every feature, side by side"
          description="See exactly what changes as you move from Essential to Enterprise."
        />

        <Reveal className="mt-14">
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className="sticky top-20 z-10 w-2/5 border-b border-line bg-mist px-5 py-4 text-sm font-semibold text-ink-900">
                    Feature
                  </th>
                  {PRICING_PLANS.map((plan) => (
                    <th
                      key={plan.id}
                      className="sticky top-20 z-10 border-b border-line bg-mist px-5 py-4 text-center text-sm font-semibold text-ink-900"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_TABLE.map((group) => (
                  <Fragment key={group.category}>
                    <tr className="border-b border-line bg-mist/20">
                      <td
                        colSpan={4}
                        className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-400"
                      >
                        {group.category}
                      </td>
                    </tr>
                    {group.features.map((feature) => (
                      <tr
                        key={feature.label}
                        className="border-b border-line last:border-0"
                      >
                        <td className="px-5 py-3.5 text-sm text-ink-700">
                          {feature.label}
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <Cell value={feature.essential} />
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <Cell value={feature.professional} />
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <Cell value={feature.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
