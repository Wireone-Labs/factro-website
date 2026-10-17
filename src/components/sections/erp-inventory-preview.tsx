"use client";

import { useContext, useId, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bell, BookOpen, Box, ChartNoAxesColumnIncreasing, Check, ChevronDown,
  ChevronLeft, ChevronRight, ClipboardCheck, Clock3, Columns3, FileText,
  FlaskConical, GraduationCap, History, LayoutDashboard, ListChecks,
  LockKeyhole, MapPin, PackageCheck, PanelLeftClose, Pause, Play, Plus,
  RotateCcw, Search, Settings, ShieldCheck, ShoppingBag, ShoppingCart,
  Warehouse, X,
} from "lucide-react";
import { ProductVisibilityContext } from "./product-showcase";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./erp-inventory-preview.module.css";

type RequestType = "Requisition" | "Dispensing" | "Relocation" | "Receipt" | "Dispatch" | "Expiry";
type InventoryRequest = {
  id: string; request: string; type: RequestType; location: string;
  owner: string; initials: string; due: string; status: string; tone: string;
};

const RECEIPT_ID = "TKT-0226";
const REQUESTS: InventoryRequest[] = [
  { id: "TKT-0221", request: "Dispensing, IMRR-06", type: "Dispensing", location: "WH-API-01 · R05-L2-P02", owner: "Inamul H.", initials: "IH", due: "13 days overdue", status: "Picking", tone: "blue" },
  { id: "TKT-0224", request: "Relocate 3 released lots out of quarantine", type: "Relocation", location: "WH-API-01 · Q1-R1-L2-P05", owner: "Kavya R.", initials: "KR", due: "Today", status: "Open", tone: "neutral" },
  { id: "TKT-0219", request: "Use or dispose lot 26-09-PRM-25-00", type: "Expiry", location: "WH-API-01 · R07-L3-P04", owner: "Divya N.", initials: "DN", due: "In 10 days", status: "Open", tone: "neutral" },
  { id: RECEIPT_ID, request: "Receive PO-09, AcroPharma, 2 items", type: "Receipt", location: "WH-API-01 · Q1-R2-L1-P02", owner: "Arjun S.", initials: "AS", due: "Tomorrow", status: "Expected", tone: "neutral" },
  { id: "TKT-0218", request: "Ship dispatch IGDR-04", type: "Dispatch", location: "Dispatch bay · truck at 14:00", owner: "Divya N.", initials: "DN", due: "Today", status: "Packed", tone: "blue" },
  { id: "TKT-0215", request: "Clear blocked bin R07-L2-P06", type: "Relocation", location: "WH-API-01 · R07-L2-P06", owner: "Kavya R.", initials: "KR", due: "2 days overdue", status: "Investigating", tone: "amber" },
  { id: "TKT-0212", request: "Material requisition IMRR-11 for BID-0012", type: "Requisition", location: "Production · RM-TAB-101", owner: "Meera P.", initials: "MP", due: "Oct 08", status: "Approved", tone: "green" },
  { id: "TKT-0227", request: "Receive PO-12, Sahyadri Chem, 1 item", type: "Receipt", location: "WH-API-01 · Receiving", owner: "Arjun S.", initials: "AS", due: "Today", status: "Expected", tone: "neutral" },
  { id: "TKT-0228", request: "Receive PO-16, Neuland, 3 items", type: "Receipt", location: "WH-SOL-01 · Receiving", owner: "Kavya R.", initials: "KR", due: "Tomorrow", status: "Expected", tone: "neutral" },
  { id: "TKT-0230", request: "Material requisition for BID-0014", type: "Requisition", location: "Production · RM-TAB-102", owner: "Meera P.", initials: "MP", due: "Today", status: "Open", tone: "neutral" },
  { id: "TKT-0231", request: "Packing material for BID-0015", type: "Requisition", location: "Packing · PKG-01", owner: "Divya N.", initials: "DN", due: "Tomorrow", status: "Approved", tone: "green" },
  { id: "TKT-0232", request: "Dispensing, IMRR-12", type: "Dispensing", location: "WH-API-01 · Dispensing", owner: "Inamul H.", initials: "IH", due: "Today", status: "Picking", tone: "blue" },
  { id: "TKT-0233", request: "Ship dispatch IGDR-05", type: "Dispatch", location: "Dispatch bay · Bay 02", owner: "Divya N.", initials: "DN", due: "Tomorrow", status: "Packed", tone: "blue" },
  { id: "TKT-0234", request: "Ship dispatch IGDR-06", type: "Dispatch", location: "Dispatch bay · Bay 01", owner: "Arjun S.", initials: "AS", due: "Oct 18", status: "Open", tone: "neutral" },
];
const FILTERS: { value: RequestType | "All"; label: string }[] = [
  { value: "All", label: "All" }, { value: "Requisition", label: "Requisitions" },
  { value: "Dispensing", label: "Dispensing" }, { value: "Relocation", label: "Relocations" },
  { value: "Receipt", label: "Receipts" }, { value: "Dispatch", label: "Dispatch" },
  { value: "Expiry", label: "Expiry" },
];
const HEALTH = [
  { label: "Receiving", detail: "Healthy, GRN in 1.2 days", color: "#64a79b", peak: 42 },
  { label: "Storage", detail: "Watch, 71% of bins used", color: "#b79b70", peak: 55 },
  { label: "Quarantine", detail: "Watch, dwell 3.6 days", color: "#b79b70", peak: 59 },
  { label: "Dispensing", detail: "At risk, 1 requisition overdue", color: "#d58b8d", peak: 76 },
  { label: "Dispatch", detail: "Healthy, on time 96%", color: "#64a79b", peak: 38 },
  { label: "Cycle counts", detail: "Watch, 94% accuracy", color: "#b79b70", peak: 55 },
];

function Status({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={styles.status} data-tone={tone}><i />{children}</span>;
}

function Counter({ value, reducedMotion }: { value: string | number; reducedMotion: boolean }) {
  return <span className={styles.counter}><AnimatePresence initial={false} mode="wait"><motion.span key={value} initial={{ y: "75%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-75%", opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .22 }}>{value}</motion.span></AnimatePresence></span>;
}

function InventorySidebar() {
  const groups = [
    { label: "", items: [[LayoutDashboard, "Dashboard"], [ChartNoAxesColumnIncreasing, "Reports"], [ListChecks, "My work", "10"]] },
    { label: "ERP", items: [[ShoppingBag, "Sales", "2"], [ShoppingCart, "Purchase", "1"], [Box, "Inventory"], [Warehouse, "Warehouse"]] },
    { label: "MES", items: [[ClipboardCheck, "Planning"], [ChartNoAxesColumnIncreasing, "Work orders"], [FlaskConical, "Exhibit orders"], [FileText, "Shop floor"]] },
    { label: "QMS", items: [[FlaskConical, "Quality control", "1"], [ShieldCheck, "Quality assurance", "3"], [FlaskConical, "Laboratory"], [GraduationCap, "Training"]] },
  ] as const;
  return <aside className={styles.sidebar} aria-hidden="true">
    <div className={styles.logo}>factro<span>⌝</span><PanelLeftClose /></div>
    {groups.map(group => <div key={group.label} className={styles.navGroup}>
      {group.label && <div className={styles.navLabel}>{group.label}<i /></div>}
      {group.items.map(([Icon, label, ...badge]) => <div key={label} className={styles.navItem} data-selected={label === "Inventory"}><Icon /><span>{label}</span>{badge[0] && <small>{badge[0]}</small>}</div>)}
    </div>)}
    <div className={styles.support}><div className={styles.navLabel}>SUPPORT<i /></div>{([[FileText, "Documents"], [BookOpen, "Library"], [Settings, "Settings"]] as const).map(([Icon, label]) => <div key={label} className={styles.navItem}><Icon /><span>{label}</span></div>)}</div>
  </aside>;
}

function InventoryHealth({ step, reducedMotion }: { step: number; reducedMotion: boolean }) {
  const gradientId = useId().replace(/:/g, "");
  return <div className={styles.health}>
    <svg viewBox="0 0 1000 170" role="img" aria-label="Inventory operations health: receiving, storage, quarantine, dispensing, dispatch and cycle counts">
      <defs>{HEALTH.map((item, index) => <linearGradient key={item.label} id={`${gradientId}-${index}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={item.color} stopOpacity=".25" /><stop offset="1" stopColor={item.color} stopOpacity="0" /></linearGradient>)}</defs>
      {HEALTH.map((item, index) => {
        const center = 83 + index * 167;
        const improved = (index === 0 && step >= 4) || (index === 1 && step >= 7) || (index === 2 && step >= 6);
        const peak = item.peak - (improved ? 12 : 0);
        const curve = `M ${center - 155} 150 C ${center - 80} 150 ${center - 68} ${peak} ${center} ${peak} C ${center + 68} ${peak} ${center + 80} 150 ${center + 155} 150`;
        return <g key={item.label}>
          <motion.path initial={false} animate={{ d: `${curve} Z` }} transition={{ duration: reducedMotion ? 0 : .8 }} fill={`url(#${gradientId}-${index})`} />
          <motion.path initial={false} animate={{ d: curve }} transition={{ duration: reducedMotion ? 0 : .8 }} fill="none" stroke={item.color} strokeWidth="1.3" strokeOpacity=".6" />
          <motion.g initial={false} animate={{ y: peak - item.peak }} transition={{ duration: reducedMotion ? 0 : .8 }}>
            <circle cx={center} cy={item.peak} r="2" fill={item.color} />
            <text x={center} y={item.peak - 17} textAnchor="middle" fill="#7d879a" fontSize="9">{item.label}</text>
            <text x={center} y={item.peak - 6} textAnchor="middle" fill={item.color} fontSize="8">{improved && index === 2 ? "Healthy, lot released" : item.detail}</text>
          </motion.g>
        </g>;
      })}
    </svg>
    <span>Inventory operations health, last 7 days. Taller is healthier.</span>
  </div>;
}

function ReceiptDetails({ request, step, reducedMotion, onClose, onAdvance }: {
  request: InventoryRequest; step: number; reducedMotion: boolean; onClose: () => void; onAdvance: (step: number) => void;
}) {
  const receipt = request.id === RECEIPT_ID;
  const received = step >= 4;
  const released = step >= 6;
  const stored = step >= 7;
  const checks = step >= 5 ? ["Identity test passed", "Assay within specification", "Certificate of analysis attached"] : ["Supplier qualification current", "Quantity matched to purchase order", "Lot labels generated"];
  return <motion.aside className={styles.drawer} aria-label={`Request details for ${request.id}`} initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .5, ease: [.22, 1, .36, 1] }}>
    <header><span><FileText />{request.id}</span><button type="button" aria-label="Close request details" onClick={onClose}><X /></button></header>
    <div className={styles.drawerBody}>
      <span className={styles.eyebrow}>{receipt ? "GOODS RECEIPT · PO-09" : request.type}</span>
      <h3>{receipt ? "Receive. Check. Put away." : request.request}</h3>
      <Status tone={receipt ? (released ? "green" : received ? "amber" : "neutral") : request.tone}>{receipt ? (stored ? "Available" : released ? "QC released" : received ? "In quarantine" : "Expected") : request.status}</Status>
      <dl className={styles.fields}>
        {receipt && <div><dt>Supplier</dt><dd>AcroPharma</dd></div>}
        <div><dt>Owner</dt><dd><span className={styles.avatar}>{request.initials}</span>{request.owner}</dd></div>
        <div><dt>Location</dt><dd><MapPin />{stored && receipt ? "Stores A · Bin 03" : request.location}</dd></div>
      </dl>
      {receipt && <>
        <div className={styles.material}><Box /><div><strong>Lactose monohydrate</strong><span>300 kg · Supplier lot LAC-0926</span></div><span>01 / 02</span></div>
        <div className={styles.checkList} key={step >= 5 ? "quality" : "receipt"}>
          <h4>{step >= 5 ? "Quality evidence" : "Receipt checks"}</h4>
          {checks.map((check, index) => <div key={check} data-checked={step >= 3} style={{ "--check-delay": `${index * .16}s` } as CSSProperties}><span><Check /></span>{check}</div>)}
        </div>
        <AnimatePresence>{received && <motion.div className={styles.record} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .35 }}><FileText /><div><strong>GRN-0042 recorded</strong><span>{released ? "QA signed · Evidence attached" : "Receipt saved · QC sample requested"}</span></div><Check /></motion.div>}</AnimatePresence>
        <ol className={styles.receiptFlow}>{["Expected", "Received", "QC released", "Put away"].map((label, index) => <li key={label} data-complete={index === 0 || (index === 1 && received) || (index === 2 && released) || stored}><span><Check /></span>{label}</li>)}</ol>
      </>}
    </div>
    <footer><span><LockKeyhole />{released && receipt ? "Signed by Priya D. · QA" : "Every action stays in the audit trail"}</span>{receipt && <button type="button" disabled={stored} onClick={() => onAdvance(step < 4 ? 4 : step + 1)}>{stored ? <><Check />Stock available</> : step >= 6 ? "Complete put-away" : step >= 5 ? "Release lot" : step >= 4 ? "Review QC evidence" : "Record receipt"}</button>}</footer>
  </motion.aside>;
}

export function ErpInventoryPreview() {
  const productVisible = useContext(ProductVisibilityContext);
  const reducedMotion = Boolean(useReducedMotion());
  const previewId = useId();
  const [paused, setPaused] = useState(false);
  const [filterOverride, setFilterOverride] = useState<RequestType | "All" | null>(null);
  const [selectedOverride, setSelectedOverride] = useState<string | null | undefined>(undefined);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const { active: step, setActive: setStep, regionRef } = useVisualCycle(9, 2600, {
    pauseOnHover: false, pauseOnFocus: "keyboard", paused: paused || !productVisible,
  });
  const received = step >= 4;
  const released = step >= 6;
  const stored = step >= 7;
  const filter = filterOverride ?? (step >= 1 && step <= 6 ? "Receipt" : "All");
  const selectedId = selectedOverride !== undefined ? selectedOverride : step >= 2 && step <= 6 ? RECEIPT_ID : null;
  const selected = REQUESTS.find(request => request.id === selectedId);
  const filtered = REQUESTS.filter(request => (filter === "All" || request.type === filter) && `${request.id} ${request.request} ${request.location} ${request.owner}`.toLowerCase().includes(query.toLowerCase()));
  const pageCount = Math.max(1, Math.ceil(filtered.length / 7));
  const currentPage = Math.min(page, pageCount);
  const visibleRequests = filtered.slice((currentPage - 1) * 7, currentPage * 7);
  const auditEntries = 1284 + Number(received) + Number(released) + Number(stored);
  const duration = reducedMotion ? 0 : .3;

  function resetInteraction() {
    setFilterOverride(null); setSelectedOverride(undefined); setQuery(""); setPage(1); setLedgerOpen(false);
  }
  function chooseFilter(value: RequestType | "All") {
    setPaused(true); setFilterOverride(value); setSelectedOverride(null); setLedgerOpen(false); setPage(1);
  }
  function openRequest(id: string) {
    setPaused(true); setSelectedOverride(id); setLedgerOpen(false);
  }

  return <div ref={regionRef} id="inventory-overview" className={styles.preview} data-native-asset data-step={step}>
    <div className={styles.app}>
      <InventorySidebar />
      <div className={styles.workspace}>
        <div className={styles.topbar}>
          <label className={styles.globalSearch}><Search /><input aria-label="Search inventory preview" placeholder="Search IDs, names, batches or people" value={query} onChange={event => { setPaused(true); setQuery(event.target.value); setFilterOverride("All"); setSelectedOverride(null); setPage(1); }} /><span>⌘ K</span></label>
          <div className={styles.tools} aria-hidden="true"><Settings /><span className={styles.guidebook}><BookOpen />Guidebook<span>?</span></span><span className={styles.notification}><Bell /><small>{received ? 5 : 4}</small></span><span className={styles.user}><span className={styles.avatar}>IH</span>Inamul H.<ChevronDown /></span></div>
        </div>
        <div className={styles.heading}><div><h3>Inventory</h3><p>Stock on hand, where it is, what is moving and what is expiring.</p></div><div className={styles.headingActions}><button type="button" onClick={() => { setPaused(true); setLedgerOpen(!ledgerOpen); setSelectedOverride(null); }}><History />Stock ledger</button><span><Warehouse />Warehouse</span><button type="button" className={styles.create} aria-label="Preview a goods receipt" onClick={() => { setStep(2); setFilterOverride("Receipt"); openRequest(RECEIPT_ID); }}><Plus />Create<ChevronDown /></button></div></div>
        <div className={styles.quickLinks} aria-hidden="true">Go to <strong>Stocks <span>{stored ? 122 : 121}</span></strong><i />Goods received <span>{received ? 4 : 3}</span><i />Material exchange <span>3</span><i />Goods dispatch <span>2</span><i />Returns <span>2</span><ChevronRight /></div>
        <div className={styles.compliance}><strong><ShieldCheck />Compliance <small>2</small></strong><span className={styles.audit}><Check />{stored ? "Put-away recorded · Stores A, Bin 03" : released ? "QA release signed · Priya D." : received ? "GRN-0042 added to the audit trail" : "Audit trail append-only, chain checked 14:00"}</span><span className={styles.expiryNotice}><Clock3 />5 bins expire within 60 days</span><span className={styles.blocked}>1 bin blocked, count mismatch</span><span className={styles.auditCount}><FileText />{auditEntries.toLocaleString("en-IN")} audit entries</span></div>
        <div className={styles.metrics}>
          <div data-updated={received}><span>STOCK VALUE</span><strong><Counter value={received ? "₹3.44 Cr" : "₹3.42 Cr"} reducedMotion={reducedMotion} /></strong><small>{received ? "1,285" : "1,284"} lots in 3 warehouses</small></div>
          <div><span>BELOW REORDER LEVEL</span><strong className={styles.amber}>19</strong><small>6 raw materials, 13 packaging</small></div>
          <div><span>EXPIRING IN 60 DAYS</span><strong className={styles.amber}>4 lots</strong><small>₹2.1 L, use or dispose</small></div>
          <div data-updated={received}><span>AWAITING QC RELEASE</span><strong><Counter value={`${received && !released ? 4 : 3} lots`} reducedMotion={reducedMotion} /></strong><small>{released ? "LAC-0926 released by QA" : "WH-API-01, Z-QUA-01"}</small></div>
        </div>
        <div className={styles.sectionTitle}><h4>Requests &amp; tickets</h4><span>{stored ? 13 : 14} open</span>{stored && <span className={styles.completed}><Check />1 receipt completed</span>}</div>
        <div className={styles.workArea}>
          <div className={styles.requestCard}>
            <div className={styles.filters} role="group" aria-label="Filter inventory requests">{FILTERS.map(item => <button key={item.value} type="button" aria-pressed={filter === item.value} aria-label={item.label} onClick={() => chooseFilter(item.value)}>{item.label}<span>{item.value === "All" ? REQUESTS.length : REQUESTS.filter(request => request.type === item.value).length}</span>{filter === item.value && <motion.i layoutId={`${previewId}-filter`} transition={{ duration }} />}</button>)}</div>
            <div className={styles.tableToolbar}><label><Search /><input aria-label="Filter tickets, requests or bins" placeholder="Ticket, request or bin" value={query} onChange={event => { setPaused(true); setQuery(event.target.value); setPage(1); }} /></label><span>Raised by: <b>Me</b><ChevronDown /></span><span>Due: <b>Any</b><ChevronDown /></span><span>Warehouse: <b>Any</b><ChevronDown /></span><span className={styles.columns}><Columns3 />Columns</span></div>
            <div className={styles.tableViewport}><table><thead><tr>{["Ticket", "Request", "Type", "Where", "Raised by", "Due", "Status"].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>
              {visibleRequests.map((request, index) => {
                const updated = request.id === RECEIPT_ID && received;
                const status = updated ? stored ? "Available" : released ? "QC released" : "Quarantine" : request.status;
                return <motion.tr key={request.id} layout="position" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration, opacity: { duration, delay: reducedMotion ? 0 : index * .035 } }} data-selected={selectedId === request.id} data-updated={updated}>
                  <td className={styles.ticket}>{request.id}</td><td><button type="button" aria-label={`Open ${request.id}: ${request.request}`} onClick={() => openRequest(request.id)}>{request.request}</button></td><td><span className={styles.type} data-receipt={request.type === "Receipt"}>{request.type}</span></td><td className={styles.location}><MapPin />{updated && stored ? "Stores A · Bin 03" : request.location}</td><td><span className={styles.owner}><span className={styles.avatar} data-person={request.initials}>{request.initials}</span>{request.owner}</span></td><td data-overdue={request.due.includes("overdue")}>{updated ? "Today" : request.due}</td><td><Status tone={updated ? released ? "green" : "amber" : request.tone}>{status}</Status></td>
                </motion.tr>;
              })}
            </tbody></table>{filtered.length === 0 && <p className={styles.empty}>No requests match “{query}”.</p>}</div>
            <div className={styles.pagination}><span>Showing {filtered.length ? (currentPage - 1) * 7 + 1 : 0} to {Math.min(currentPage * 7, filtered.length)} of {filtered.length} requests</span><div><button type="button" aria-label="Previous requests page" disabled={currentPage === 1} onClick={() => { setPaused(true); setPage(currentPage - 1); }}><ChevronLeft /></button>{Array.from({ length: pageCount }, (_, index) => <button key={index} type="button" aria-label={`Requests page ${index + 1}`} aria-current={currentPage === index + 1 ? "page" : undefined} onClick={() => { setPaused(true); setPage(index + 1); }}>{index + 1}</button>)}<button type="button" aria-label="Next requests page" disabled={currentPage === pageCount} onClick={() => { setPaused(true); setPage(currentPage + 1); }}><ChevronRight /></button></div></div>
          </div>
          <aside className={styles.expiring}><header>Expiring soon<span>4 lots</span></header>{[
            ["26-09-PRM-25-00", "Povidone K-30, 12 kg", "Oct 16"], ["CN-01-2025-99", "Lactose, 4 kg", "Overdue 74 d"], ["26-08-SOL-04-01", "Isopropyl alcohol, 40 L", "Nov 02"],
          ].map(([lot, material, date]) => <div key={lot}><strong>{lot}</strong><small data-overdue={date.includes("Overdue")}>{date}</small><p>{material}</p><span><MapPin />WH-API-01 › Z-APP-01</span></div>)}</aside>
        </div>
        <InventoryHealth step={step} reducedMotion={reducedMotion} />
        <AnimatePresence>{selected && <ReceiptDetails key={selected.id} request={selected} step={step} reducedMotion={reducedMotion} onClose={() => { setPaused(true); setSelectedOverride(null); }} onAdvance={nextStep => { setStep(nextStep); setPaused(true); }} />}</AnimatePresence>
        <AnimatePresence>{ledgerOpen && <motion.aside className={styles.ledger} aria-label="Stock ledger preview" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration }}><header><History />Stock ledger<button type="button" aria-label="Close stock ledger" onClick={() => setLedgerOpen(false)}><X /></button></header><div><span>Opening balance</span><strong>1,284 lots</strong></div><div><span>GRN-0042</span><Status tone={received ? "green" : "neutral"}>{received ? "+1 lot received" : "Receipt pending"}</Status></div><div><span>Quality release</span><Status tone={released ? "green" : "amber"}>{released ? "Released" : "Waiting for QC"}</Status></div><div><strong>Closing balance</strong><strong>{received ? "1,285" : "1,284"} lots</strong></div></motion.aside>}</AnimatePresence>
        <AnimatePresence>{stored && !selected && <motion.div className={styles.toast} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration }}><PackageCheck /><div><strong>Lot LAC-0926 is ready to use</strong><span>QC released · Put away in A-03 · Audit trail updated</span></div><Check /></motion.div>}</AnimatePresence>
      </div>
    </div>
    <div className={styles.controls}><span><i />Interactive preview <span>· Sample data</span></span><div><span className={styles.hint}>Click a request to explore</span><button type="button" aria-label="Replay inventory workflow" onClick={() => { setStep(0); resetInteraction(); setPaused(false); }}><RotateCcw /></button><button type="button" aria-label={paused || reducedMotion ? "Play inventory workflow" : "Pause inventory workflow"} aria-pressed={!paused && !reducedMotion} disabled={reducedMotion} onClick={() => { if (paused) resetInteraction(); setPaused(!paused); }}>{paused || reducedMotion ? <Play /> : <Pause />}</button></div></div>
  </div>;
}
