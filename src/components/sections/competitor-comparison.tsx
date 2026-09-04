import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { COMPARISON_ROWS, type ComparisonRow } from "@/data/competitors";
import { cn } from "@/lib/utils";

type VendorKey = "factro" | "sap" | "qt9" | "oracle" | "masterControl";

const VENDORS: { key: VendorKey; label: string; highlight?: boolean }[] = [
  { key: "factro", label: "Factro", highlight: true },
  { key: "sap", label: "SAP" },
  { key: "qt9", label: "QT9" },
  { key: "oracle", label: "Oracle" },
  { key: "masterControl", label: "MasterControl" },
];

function TentativeBadge() {
  return (
    <span className="mb-1 inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
      Tentative
    </span>
  );
}

export function CompetitorComparison() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="How we compare"
          title="Factro, next to SAP, QT9, Oracle and MasterControl"
          description="For pharma, nutraceutical and food manufacturing — where the price actually lands, not just the sticker."
        />

        <Reveal delay={0.05} className="mt-12 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[1400px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line">
                <th className="sticky left-0 z-10 bg-white px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400">
                  &nbsp;
                </th>
                {COMPARISON_ROWS.map((row) => (
                  <th
                    key={row.label}
                    className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-ink-400"
                  >
                    {row.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VENDORS.map((vendor, i) => (
                <tr
                  key={vendor.key}
                  className={cn(
                    "border-b border-line last:border-0",
                    vendor.highlight
                      ? "bg-brand-50/40"
                      : i % 2 === 1 && "bg-mist/40",
                  )}
                >
                  <td
                    className={cn(
                      "sticky left-0 z-10 bg-inherit px-4 py-4 align-top text-sm font-semibold whitespace-nowrap",
                      vendor.highlight ? "text-brand-700" : "text-ink-700",
                    )}
                  >
                    {vendor.highlight ? (
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="h-4 w-4" />
                        {vendor.label}
                      </span>
                    ) : (
                      vendor.label
                    )}
                  </td>
                  {COMPARISON_ROWS.map((row) => (
                    <td
                      key={row.label}
                      className={cn(
                        "px-4 py-4 align-top text-sm leading-relaxed",
                        vendor.highlight ? "text-ink-800" : "text-ink-600",
                      )}
                    >
                      {row.tentative?.[vendor.key as Exclude<VendorKey, "factro">] && (
                        <span className="block">
                          <TentativeBadge />
                        </span>
                      )}
                      {row[vendor.key as keyof ComparisonRow] as string}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <p className="mx-auto mt-4 max-w-2xl text-center text-xs leading-relaxed text-ink-400">
          SAP, QT9, Oracle and MasterControl do not publish pricing. Figures
          marked &ldquo;Tentative&rdquo; are third-party market estimates,
          not confirmed quotes, converted to INR at an approximate exchange
          rate. Confirm current terms directly with each vendor.
        </p>
      </Container>
    </section>
  );
}
