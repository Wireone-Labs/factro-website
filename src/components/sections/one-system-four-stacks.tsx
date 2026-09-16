import { Landmark } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const STACKS = [
  {
    name: "ERP",
    tag: "Commercial and material operations",
    rows: [
      { label: "Sales", detail: "Enquiries, quotations, sales orders, invoices and receivables, customer licence tracking" },
      { label: "Purchase", detail: "Material requests, purchase orders, vendor management with OTIF and licence tracking, GRN with three-way match, reorder triggers" },
      { label: "Inventory", detail: "GRN to stock, stock ledger and audit, FIFO and FEFO, hold and quarantine and release control, expiry and retest alerts, dispatch and e-way bills" },
      { label: "Library", detail: "Material and product catalogs, formulations, bills of materials, pricing and tax codes, regulatory documents" },
    ],
  },
  {
    name: "MES",
    tag: "Execution on the floor",
    rows: [
      { label: "Production", detail: "Production planner with capacity and collision detection, electronic batch records, line clearance per stage, dispensing with second-person verification, in-process control execution, material reconciliation and OEE" },
      { label: "Facility", detail: "Multi-site structure, warehouse and zone and bin mapping, work centres, equipment and asset master, qualification and calibration, preventive maintenance, cleaning and changeover records" },
    ],
  },
  {
    name: "QMS",
    tag: "The gate, not the review",
    rows: [
      { label: "Quality", detail: "QC sampling at GRN, in-process and finished goods, method and record of analysis, deviations and out of specification investigation, change control, audit management, live inspection readiness score" },
      { label: "CAPA", detail: "Complaint intake, deviation-triggered CAPA, root cause investigation against clustered history, cross-department actions with owners, effectiveness review before closure" },
      { label: "Training", detail: "Assignment tied to document version, automatic reassignment on revision, competency matrix, shop-floor training hold, inspection-ready records" },
    ],
  },
  {
    name: "DMS",
    tag: "One version, everywhere",
    rows: [
      { label: "Documents", detail: "Controlled document register, SOP management with version history, co-authoring with threaded discussion, timestamped approval records, review-date tracking with auto-overdue tagging, retired versions unreachable from the floor, SOP anchors on the steps they govern" },
    ],
  },
];

export function OneSystemFourStacks() {
  return (
    <section id="what-it-offers" className="scroll-mt-28 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="One system, four stacks"
          title="What separately costs five license fees, on one database"
          description="Most plants buy an ERP, an MES, a QMS, a LIMS and a document system, then pay every year to make the five of them talk. This is all of it, on one database, with one audit trail underneath."
        />

        <RevealGroup
          className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2"
          stagger={0.06}
        >
          {STACKS.map((stack) => (
            <RevealItem key={stack.name}>
              <div className="h-full rounded-2xl border border-line bg-white p-6 sm:p-7">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-semibold text-ink-900">{stack.name}</h3>
                  <span className="text-xs text-ink-400">{stack.tag}</span>
                </div>
                <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
                  {stack.rows.map((row) => (
                    <p key={row.label} className="text-sm leading-relaxed text-ink-600">
                      <span className="font-semibold text-ink-900">{row.label}</span>
                      {" · "}
                      {row.detail}
                    </p>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <div className="mx-auto mt-6 flex max-w-3xl items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50/60 px-5 py-4">
            <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <p className="text-sm leading-relaxed text-ink-700">
              <span className="font-semibold">Finance stays where it is.</span>{" "}
              Tally keeps the books. Factro posts voucher-level entries for
              batch costs, purchases, sales and payments, and generates
              e-invoices and e-way bills against the dispatch record. Your
              accountant notices nothing except that the numbers arrive
              reconciled.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
