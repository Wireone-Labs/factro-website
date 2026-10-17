"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { ProductSlug } from "@/data/product-detail-content";
import styles from "./product-problem-illustration.module.css";

function Sheet({ x, y, width = 112, height = 98, label, children }: { x: number; y: number; width?: number; height?: number; label: string; children?: ReactNode }) {
  return <g transform={`translate(${x} ${y})`}>
    <rect width={width} height={height} rx="9" fill="white" stroke="#dce3ed" />
    <path d={`M0 26H${width}`} stroke="#e8edf3" />
    <circle cx="12" cy="13" r="2.5" fill="currentColor" opacity=".55" />
    <text x="21" y="16" className={styles.label}>{label}</text>
    {children}
  </g>;
}

function Parcel({ x, y, size = 28 }: { x: number; y: number; size?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${size / 28})`}>
    <path d="M0 7L14 0L28 7L14 14Z" fill="var(--soft)" stroke="currentColor" strokeOpacity=".4" />
    <path d="M0 7V25L14 32L28 25V7L14 14Z" fill="var(--tint)" stroke="currentColor" strokeOpacity=".4" />
    <path d="M14 14V32M7 4L21 11V18" fill="none" stroke="currentColor" strokeOpacity=".5" />
  </g>;
}

function Warning({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><g className={styles.warning}>
    <circle r="12" fill="#fff0e9" stroke="#e8b4a0" />
    <path d="M0 -6V1M0 5V6" stroke="#c16c4e" strokeWidth="2" strokeLinecap="round" />
  </g></g>;
}

function ExpiredLicence() {
  return <>
    <Sheet x={26} y={17} width={130} height={126} label="VENDOR LICENCE">
      <path d="M16 43H103M16 51H83" className={styles.lines} />
      <rect x="16" y="65" width="98" height="30" rx="5" fill="#fff0e9" />
      <text x="27" y="84" className={styles.alertText}>Expired yesterday</text>
      <path d="M16 108H72" className={styles.lines} />
    </Sheet>
    <path d="M162 80H205" className={styles.route} /><path d="M199 75L205 80L199 85" className={styles.route} />
    <g className={styles.outbound}><Sheet x={213} y={45} width={80} height={78} label="PO SENT"><Parcel x={26} y={36} size={23} /></Sheet></g>
    <Warning x={153} y={29} />
    <circle className={styles.packet} cx="170" cy="80" r="3" fill="currentColor" />
  </>;
}

function StockWithoutApproval() {
  return <>
    <path d="M28 40V135M151 40V135M24 86H155M24 129H155" stroke="#c6d1df" strokeWidth="4" strokeLinecap="round" />
    {[39, 77, 115].map(position => <Parcel key={position} x={position} y={49} size={24} />)}
    {[39, 77].map(position => <Parcel key={position} x={position} y={93} size={24} />)}
    <g className={styles.stockMove}><Parcel x={115} y={93} size={24} /></g>
    <Sheet x={187} y={27} width={110} height={112} label="QUALITY REGISTER">
      <text x="14" y="49" className={styles.caption}>Lot LAC-042</text>
      <rect x="13" y="61" width="83" height="25" rx="5" fill="#fff0e9" />
      <text x="25" y="77" className={styles.alertText}>QC pending</text>
      <path d="M14 98H77" className={styles.lines} />
    </Sheet>
    <Warning x={175} y={117} />
  </>;
}

function BrokenTrace() {
  return <>
    <path d="M70 79H127M194 79H250" className={styles.dashed} />
    <Sheet x={18} y={48} width={65} height={64} label="SUPPLIER"><path d="M13 40H50M13 48H37" className={styles.lines} /></Sheet>
    <Sheet x={237} y={48} width={65} height={64} label="CUSTOMER"><path d="M13 40H50M13 48H37" className={styles.lines} /></Sheet>
    <rect x="129" y="48" width="62" height="64" rx="8" fill="#fff8f4" stroke="#ddb3a3" strokeDasharray="4 5" />
    <text x="160" y="88" textAnchor="middle" className={styles.question}>?</text>
    <g className={styles.search}><circle cx="165" cy="74" r="25" fill="#ffffff45" stroke="currentColor" strokeWidth="3" /><path d="M183 93L200 111" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></g>
    <text x="160" y="140" textAnchor="middle" className={styles.caption}>A missing link in the lot history</text>
  </>;
}

function CapacityClash() {
  return <Sheet x={20} y={17} width={280} height={126} label="TUESDAY · PRODUCTION PLAN">
    <path d="M96 34V113M144 34V113M192 34V113M240 34V113" stroke="#edf0f6" />
    <text x="13" y="54" className={styles.caption}>Granulator</text><text x="13" y="85" className={styles.caption}>Batch B</text><text x="13" y="113" className={styles.caption}>API lot</text>
    <rect x="96" y="40" width="118" height="20" rx="4" fill="var(--soft)" />
    <rect className={styles.conflictBar} x="145" y="70" width="108" height="20" rx="4" fill="var(--accent)" opacity=".55" />
    <rect className={styles.conflict} x="145" y="36" width="69" height="59" rx="5" fill="#f4b7a533" stroke="#d9886b" strokeDasharray="3 3" />
    <text x="107" y="113" className={styles.alertText}>Still awaiting release</text><Warning x={258} y={45} />
  </Sheet>;
}

function RecurringDeviation() {
  return <>
    {[{ x: 23, y: 36, label: "JAN", delay: "0s" }, { x: 116, y: 49, label: "FEB", delay: "1.2s" }, { x: 209, y: 36, label: "AGAIN", delay: "2.4s" }].map(record => <g key={record.label} className={styles.recurrence} style={{ animationDelay: record.delay }}>
      <Sheet x={record.x} y={record.y} width={85} height={90} label={record.label}><text x="12" y="47" className={styles.caption}>Binder</text><text x="12" y="60" className={styles.caption}>deviation</text><path d="M12 74H63" className={styles.lines} /></Sheet>
    </g>)}
    <path d="M251 28C251 2 66 2 66 27M60 21L66 28L72 21" className={styles.loop} />
  </>;
}

function WaitingBatch() {
  return <>
    <Parcel x={29} y={81} size={35} /><Parcel x={71} y={91} size={35} /><Parcel x={49} y={49} size={35} />
    <path d="M25 128L88 148L126 132" stroke="#c7d1de" strokeWidth="5" fill="none" />
    <g transform="translate(153 83)"><circle r="23" fill="white" stroke="#cbd5e1" /><path className={styles.clockHand} d="M0 0V-14M0 0L9 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></g>
    <Sheet x={205} y={28} width={91} height={109} label="QA RELEASE">
      {[43, 65, 87].map((position, index) => <g key={position} className={styles.missingEntry} style={{ animationDelay: `${index * .6}s` }}><rect x="13" y={position - 7} width="9" height="9" rx="2" fill="#fff0e9" stroke="#d9a48d" /><path d={`M30 ${position - 2}H74`} className={styles.lines} /></g>)}
    </Sheet>
    <text x="61" y="30" className={styles.caption}>Batch finished</text>
  </>;
}

function ScatteredEvidence() {
  return <>
    <path d="M59 40L154 81L263 40M57 119L154 81L264 119M155 21V81" className={styles.dashed} />
    {[{ x: 20, y: 19, label: "LAB" }, { x: 219, y: 19, label: "BATCH" }, { x: 20, y: 104, label: "SOP" }, { x: 219, y: 104, label: "TRAINING" }, { x: 120, y: 4, label: "CoA" }].map((record, index) => <g key={record.label} className={styles.source} style={{ animationDelay: `${index * -.7}s` }}><Sheet x={record.x} y={record.y} width={76} height={43} label={record.label}><path d="M12 34H57" className={styles.lines} /></Sheet></g>)}
    <circle cx="155" cy="84" r="25" fill="white" stroke="#d9e1eb" /><g className={styles.search}><circle cx="152" cy="81" r="9" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M159 89L166 96" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></g>
  </>;
}

function UnprovenFix() {
  return <>
    <Sheet x={22} y={36} width={112} height={98} label="CAPA · CLOSED"><circle cx="56" cy="62" r="19" fill="var(--tint)" /><path d="M47 62L53 68L66 54" fill="none" stroke="currentColor" strokeWidth="2.5" /></Sheet>
    <Sheet x={187} y={36} width={112} height={98} label="DEVIATION · NEW"><path d="M15 44H91M15 53H74" className={styles.lines} /><text x="15" y="79" className={styles.alertText}>Same issue returns</text></Sheet>
    <path d="M77 27C96 2 211 2 240 28M233 25L240 29L242 21" className={styles.loop} />
    <Warning x={288} y={42} />
  </>;
}

function AuditScramble() {
  return <>
    <Sheet x={24} y={27} width={104} height={111} label="INSPECTION"><text x="52" y="77" textAnchor="middle" className={styles.dayCount}>07</text><text x="52" y="94" textAnchor="middle" className={styles.caption}>days to go</text><rect x="17" y="102" width="70" height="3" rx="2" fill="#f4e7df" /><path className={styles.countdown} d="M17 103H87" stroke="#c16c4e" strokeWidth="3" /></Sheet>
    {[{ x: 177, y: 20, delay: "0s" }, { x: 192, y: 35, delay: "-.8s" }, { x: 207, y: 50, delay: "-1.6s" }].map(sheet => <g key={sheet.x} className={styles.paperChase} style={{ animationDelay: sheet.delay }}><Sheet x={sheet.x} y={sheet.y} width={82} height={93} label="EVIDENCE"><path d="M14 40H67M14 52H55M14 64H67M14 76H43" className={styles.lines} /></Sheet></g>)}
    <Warning x={279} y={124} />
  </>;
}

function RekeyedRecords() {
  return <>
    {[{ x: 15, label: "ERP", value: "LOT-042" }, { x: 117, label: "MES", value: "LOT 042" }, { x: 219, label: "QMS", value: "L-042" }].map((record, index) => <g key={record.label}>
      <Sheet x={record.x} y={37} width={86} height={87} label={record.label}><text x="11" y="51" className={styles.caption}>{record.value}</text><path d="M11 65H66" className={styles.lines} /><path className={styles.typing} style={{ animationDelay: `${index * -.8}s` }} d="M67 40V53" stroke="currentColor" strokeWidth="1.5" /></Sheet>
    </g>)}
    <path d="M103 80H114M205 80H216" className={styles.dashed} /><text x="160" y="149" textAnchor="middle" className={styles.caption}>The same lot. Three separate entries.</text>
  </>;
}

function StrandedHold() {
  return <>
    <Sheet x={21} y={33} width={109} height={100} label="QMS"><rect x="15" y="44" width="79" height="29" rx="5" fill="#fff0e9" /><text x="54" y="62" textAnchor="middle" className={styles.alertText}>LOT ON HOLD</text><path d="M15 86H79" className={styles.lines} /></Sheet>
    <path d="M135 83H184" className={styles.dashed} /><path d="M156 71L164 79L156 87L164 95" stroke="#d49c88" strokeWidth="2" fill="none" />
    <circle className={styles.heldSignal} cx="137" cy="83" r="4" fill="#c77b61" />
    <Sheet x={190} y={33} width={109} height={100} label="DISPATCH"><Parcel x={16} y={40} size={27} /><text x="55" y="62" className={styles.caption}>Available</text><path d="M15 86H79" className={styles.lines} /></Sheet>
  </>;
}

function SeparateValidations() {
  return <>
    {[{ x: 27, label: "ERP" }, { x: 124, label: "MES" }, { x: 221, label: "QMS" }].map((record, index) => <g key={record.label} className={styles.validation} style={{ animationDelay: `${index * -.9}s` }}>
      <rect x={record.x - 5} y="33" width="75" height="92" rx="7" fill="var(--soft)" stroke="#dce3ed" />
      <Sheet x={record.x} y={27} width={75} height={92} label={record.label}><path d="M13 42H61M13 54H50M13 66H61M13 78H41" className={styles.lines} /></Sheet>
    </g>)}
    <path d="M65 128V142H258V128M162 127V142" className={styles.dashed} /><Warning x={163} y={141} />
  </>;
}

const SCENES = {
  erp: [ExpiredLicence, StockWithoutApproval, BrokenTrace],
  mes: [CapacityClash, RecurringDeviation, WaitingBatch],
  qms: [ScatteredEvidence, UnprovenFix, AuditScramble],
  one: [RekeyedRecords, StrandedHold, SeparateValidations],
};

export function ProductProblemIllustration({ product, index }: { product: ProductSlug; index: number }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const Illustration = SCENES[product][index];

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    let visible = false;
    const update = () => { element.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  if (!Illustration) return null;

  return <div ref={elementRef} className={styles.illustration} data-running="false" data-native-asset data-problem-illustration={`${product}-${index + 1}`} aria-hidden="true">
    <svg viewBox="0 0 320 165" fill="none" focusable="false"><Illustration /></svg>
  </div>;
}
