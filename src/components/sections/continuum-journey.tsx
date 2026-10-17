"use client";

import type { CSSProperties } from "react";
import { Activity, FileCheck, FlaskConical, Package, ShieldCheck } from "lucide-react";
import styles from "./continuum-screen.module.css";

const STATIONS = [
  { name: "Office", type: "office", detail: "Plan & approve" },
  { name: "Warehouse", type: "warehouse", detail: "Receive & trace" },
  { name: "Shopfloor", type: "shopfloor", detail: "Execute & record" },
  { name: "Laboratories", type: "laboratories", detail: "Test & investigate" },
  { name: "Delivery bay", type: "delivery", detail: "Release & dispatch" },
] as const;

type BuildingType = typeof STATIONS[number]["type"];

function Platform() {
  return <g>
    <ellipse cx="112" cy="157" rx="88" ry="15" fill="#607d9f12" stroke="none" />
    <path d="M16 123L102 91L204 126L118 164Z" fill="#f7faff" />
    <path d="M16 123V131L118 173L204 135V126L118 164Z" fill="#dbe6f1" />
    <path d="M118 164V173" />
    <path d="M27 128L117 164L193 131" fill="none" stroke="#fff" />
  </g>;
}

function Office() {
  return <g>
    <path d="M51 35L105 15L161 36L107 57Z" fill="#fffaf0" />
    <path d="M51 35V113L107 137V57Z" fill="#fff5d8" />
    <path d="M107 57L161 36V114L107 137Z" fill="#e9e3cb" />
    <path d="M51 54L107 77L161 56M51 78L107 101L161 80M51 102L107 125L161 104" fill="none" stroke="#bdbba8" />
    {[0, 1, 2].map(floor => [0, 1, 2].map(column => (
      <path key={`${floor}-${column}`} className={styles.officeWindow} style={{ animationDelay: `${(floor + column) * -0.5}s` }} d={`M${58 + column * 16} ${47 + floor * 24 + column * 6.5}l10 4v12l-10 -4Z`} fill="#dcebf2" stroke="#adc0cb" />
    )))}
    {[0, 1, 2].map(floor => <path key={floor} d={`M116 ${64 + floor * 24}l35 -14v12l-35 14Z`} fill="#d6e5ec" stroke="#a6bcc8" />)}
    <path d="M86 119V103L99 108V125" fill="#7193a6" />
    <path d="M49 115L107 140L118 135L61 111Z" fill="#e5edf2" />
    <path d="M99 28L115 22L135 29L119 35Z" fill="#d7e3ec" />
    <path d="M99 28V34L119 42L135 36V29L119 35Z" fill="#c3d3e0" />
    <path d="M177 125V101" stroke="#b7cbbb" strokeWidth="3" />
    <ellipse cx="177" cy="100" rx="10" ry="16" fill="#c9dfcf" stroke="#b4cbbb" />
    <path d="M172 131L180 134L189 130L181 127Z" fill="#d9e4ec" />
    {[0, 1, 2].map(index => <g key={`mail-${index}`} transform="translate(151 37)">
      <g className={styles.officeMail} style={{ animationDelay: `${index * -1}s` }}>
        <rect x="-11" y="-8" width="24" height="17" rx="3" fill="#fff" stroke="#5485cc" strokeWidth="1.5" />
        <path d="M-10 -6L1 2L12 -6M-10 7L-3 1M12 7L5 1" stroke="#5485cc" />
      </g>
    </g>)}
    <g transform="translate(54 34)"><g className={styles.officeCall}>
      <circle r="14" fill="#eef7ff" stroke="#75a0d6" />
      <path d="M-6 -8L-2 -9L1 -4L-2 -1Q0 3 4 5L7 2L11 5L10 9Q-1 12 -9 0Q-12 -5 -6 -8Z" fill="#5485cc" stroke="none" transform="scale(.7)" />
      <path className={styles.callWaves} d="M3 -7Q8 -6 9 -1M4 -12Q13 -10 14 -2" fill="none" stroke="#5485cc" strokeWidth="1.5" />
    </g></g>
  </g>;
}

function Warehouse() {
  return <g>
    <path d="M37 74L84 39L137 57L90 95Z" fill="#fff5d6" />
    <path d="M84 39L176 70L137 57Z" fill="#f2dfab" />
    <path d="M90 95L137 57L176 70L128 108Z" fill="#ecdaa9" />
    <path d="M37 74V117L90 140V95Z" fill="#fff9e8" />
    <path d="M90 95L128 108L176 70V115L90 150Z" fill="#e5e1d2" />
    <path d="M103 107L130 98V134L103 145Z" fill="#526777" />
    <path d="M105 110L128 102M105 116L128 108M105 122L128 114" stroke="#879aa5" />
    <path d="M47 90L77 103V124L47 111Z" fill="#deebef" />
    <path d="M53 101L70 108M53 107L70 114" stroke="#9bb5c3" />
    <path d="M141 90L164 81V105L141 114Z" fill="#f8f8ee" />
    <path d="M146 96L159 91M146 102L159 97" stroke="#b7b697" />
    <g transform="translate(150 118)">
      <g className={styles.stockTransfer}>
      <path d="M0 8L18 1L37 9L18 16Z" fill="#e6c779" />
      <path d="M0 8V25L18 33V16Z" fill="#d4ad61" />
      <path d="M18 16L37 9V26L18 33Z" fill="#c5a05b" />
      <path d="M10 4L28 12V20L22 22V14L5 6" fill="#fff1c8" stroke="none" />
      <path d="M-4 28L18 38L43 28M-4 32L18 42L43 32" stroke="#aab5bd" strokeWidth="3" />
      </g>
    </g>
    {[0, 1, 2].map(index => <g key={`goods-${index}`} transform="translate(122 126)"><g className={styles.goodsFlow} style={{ animationDelay: `${index * -1.2}s` }}>
      <path d="M0 0L12 -5L25 0L13 6Z" fill="#f5d889" />
      <path d="M0 0V15L13 21V6Z" fill="#d4ad61" />
      <path d="M13 6L25 0V15L13 21Z" fill="#bb9147" />
      <path d="M6 -2L19 3V10L15 12V5L3 1" fill="#fff1c8" stroke="none" />
    </g></g>)}
  </g>;
}

function Shopfloor() {
  return <g>
    <path d="M34 65L59 42V58L85 34V51L110 30V60L173 84L104 112Z" fill="#ece3f8" />
    <path d="M34 65V114L104 144V94L81 85V67L57 76V56Z" fill="#f7f2ff" />
    <path d="M104 94L173 67V116L104 144Z" fill="#d8cde9" />
    <path d="M110 30L173 54V67L104 94L81 85V67L57 76V56L34 65L59 42V58L85 34V51Z" fill="#e7ddf2" />
    <path d="M52 76L96 95V123L52 105Z" fill="#fdfbff" />
    <path d="M52 100L96 119" stroke="#b4a1ce" strokeWidth="3" />
    {[0, 1, 2].map(index => <g key={index} transform={`translate(${61 + index * 13} ${93 + index * 5.5})`}>
      <path d="M-4 -12Q0 -15 4 -12V5Q0 8 -4 5Z" fill="#cfc1e5" />
      <ellipse cy="-12" rx="4" ry="2" fill="#f5edff" />
      <path d="M0 -19V-14" stroke="#967bc0" strokeWidth="2" />
      <path className={styles.agitator} d="M0 -11V2M-3 -5L3 -3M-3 0L3 -2" stroke="#967bc0" strokeWidth="1.5" />
    </g>)}
    <path d="M116 97L162 79V100L116 118Z" fill="#d7e9ef" />
    <path d="M132 91V112M147 85V106" stroke="#a6bac7" />
    <path d="M127 41V18L140 23V46" fill="#d2c4e1" />
    <path d="M127 18L135 15L148 20L140 23Z" fill="#ece5f5" />
    <path d="M140 23L148 20V48L140 51Z" fill="#c5b6d7" />
    <g transform="translate(172 128)">
      <ellipse rx="13" ry="5" fill="#f8f5ff" />
      <path d="M-13 0V16Q0 26 13 16V0" fill="#c7bddc" />
      <ellipse rx="13" ry="5" fill="#ece6f5" />
      <path d="M-10 10Q0 16 10 10" fill="none" />
    </g>
    <path d="M113 147L193 176L218 167" fill="none" stroke="#b5a3cf" strokeWidth="7" />
    <path className={styles.conveyorBelt} d="M113 147L193 176L218 167" fill="none" stroke="#f4edff" strokeWidth="2" strokeDasharray="4 7" />
    {[0, 1, 2].map(index => <g key={`pack-${index}`} transform="translate(118 132)"><g className={styles.productFlow} style={{ animationDelay: `${index * -1.2}s` }}>
      {index === 1 ? <g><path d="M3 -8H13V-3L17 1V17L-1 10V-3Z" fill="#f9f6ff" /><path d="M3 -8L10 -11L20 -7L13 -4Z" fill="#b29bd4" /><path d="M2 1L13 5V12L2 8Z" fill="#a28ac8" stroke="none" /></g> : <g><path d="M0 -8L9 -12L22 -7L13 -3Z" fill="#eee4fc" /><path d="M0 -8V13L13 18V-3Z" fill="#c8b3e4" /><path d="M13 -3L22 -7V14L13 18Z" fill="#9d83c0" /><path d="M3 0L10 3M3 5L10 8" stroke="#fff" /></g>}
    </g></g>)}
  </g>;
}

function Laboratories() {
  return <g>
    <path d="M36 49L105 24L176 50L108 78Z" fill="#f1fbf7" />
    <path d="M36 49V111L108 143V78Z" fill="#e8f6f0" />
    <path d="M108 78L176 50V114L108 143Z" fill="#beddd1" />
    <path d="M45 68L99 91V121L45 98Z" fill="#fbfffd" />
    <path d="M45 94L99 117" stroke="#a5c8bf" strokeWidth="3" />
    {[0, 1, 2].map(index => <g key={index} transform={`translate(${55 + index * 17} ${91 + index * 7})`}>
      <path d="M-3 -15H3M-2 -15V-9L-6 1Q-7 4 -3 5L4 8Q8 8 6 3L2 -7V-13" fill="#eefbfb" stroke="#8fb8b0" />
      <path d="M-4 -1L4 2L6 5Q7 8 3 6L-3 4Q-6 3 -4 -1" fill={index === 1 ? "#ba9ddb" : "#7ebcab"} stroke="none" />
      <circle className={styles.labBubble} style={{ animationDelay: `${index * -0.5}s` }} cx="0" cy="1" r="1.4" fill="#fff" stroke="none" />
    </g>)}
    <path d="M119 87L165 68V114L119 133Z" fill="#d6edf0" />
    <path d="M135 81V126M150 75V120M119 105L165 86" stroke="#95bab8" />
    <path d="M58 60L58 49L71 54V66M53 53L76 63" stroke="#308d74" strokeWidth="4" />
    <path d="M94 34L111 28L141 39L124 46Z" fill="#cae0dc" />
    <path d="M94 34V42L124 54L141 47V39L124 46Z" fill="#b8cfc9" />
    <path d="M106 37L123 43M111 35L129 42" stroke="#e9f5ef" />
    {[0, 1, 2].map(index => <g key={`report-${index}`} transform="translate(162 91)"><g className={styles.reportFlow} style={{ animationDelay: `${index * -1.1}s` }}>
      <path d="M-9 -14H5L11 -8V15H-9Z" fill="#fff" stroke="#74aa9b" strokeWidth="1.4" />
      <path d="M5 -14V-8H11M-5 -4H6M-5 0H6M-5 4H2" stroke="#9bb7c9" />
      <circle cx="6" cy="12" r="6" fill="#e2f5eb" stroke="#74aa9b" />
      <path d="M3 12L5 14L9 10" stroke="#258e76" strokeWidth="1.5" />
    </g></g>)}
  </g>;
}

function DeliveryBay() {
  return <g>
    <path d="M29 58L97 34L165 59L97 86Z" fill="#eaf2ff" />
    <path d="M29 58V111L97 140V86Z" fill="#edf3ff" />
    <path d="M97 86L165 59V109L97 140Z" fill="#cad9ed" />
    <path d="M42 80L82 96V129L42 111Z" fill="#6f839c" />
    <path d="M44 84L80 99M44 91L80 106M44 98L80 113" stroke="#a6b7cb" />
    <path d="M108 89L154 71V88L108 106Z" fill="#e2edf7" />
    <path d="M30 61L97 89L167 61" fill="none" stroke="#88a9d1" strokeWidth="3" />
    <path d="M82 151L166 182L241 157" fill="none" stroke="#d5dfec" strokeWidth="8" />
    <path d="M91 151L168 178L235 157" fill="none" stroke="#fff" strokeWidth="1.5" strokeDasharray="8 8" />
    <g transform="translate(99 103) scale(.85)">
      <g className={styles.truckMotion}>
        <ellipse cx="55" cy="49" rx="59" ry="12" fill="#607d9f20" stroke="none" />
        <ellipse cx="97" cy="42" rx="5" ry="7" fill="#354d6c" />
        <path d="M0 0L39 -15L67 -4L27 12Z" fill="#fff" />
        <path d="M0 0V31L27 43V12Z" fill="#e9f0f8" />
        <path d="M27 12L67 -4V27L27 43Z" fill="#b8cce5" />
        <path d="M67 12L80 7L97 14L84 19Z" fill="#dce9f9" />
        <path d="M67 12L84 19L97 37V53L67 41Z" fill="#83a8dd" />
        <path d="M84 19L97 14L110 33V48L97 53V37Z" fill="#5c85bf" />
        <path d="M72 20L82 24L91 37L72 30Z" fill="#e6f4fa" />
        <path d="M90 22L96 20L105 33L99 36Z" fill="#d8ecf7" />
        <path d="M2 32L97 55L110 49M72 35L77 37" fill="none" stroke="#52749d" strokeWidth="2" />
        <path d="M101 42L107 40" stroke="#fff3bf" strokeWidth="3" />
        <ellipse cx="16" cy="38" rx="6" ry="8" fill="#354d6c" /><ellipse cx="16" cy="38" rx="3" ry="4" fill="#d0deeb" />
        <ellipse cx="80" cy="49" rx="6" ry="8" fill="#354d6c" /><ellipse cx="80" cy="49" rx="3" ry="4" fill="#d0deeb" />
        <path d="M8 11L21 16M8 17L21 22M35 22L57 14M35 28L57 20" stroke="#92afcf" />
      </g>
    </g>
  </g>;
}

const BUILDINGS = { office: Office, warehouse: Warehouse, shopfloor: Shopfloor, laboratories: Laboratories, delivery: DeliveryBay };

export function PlantBuilding({ type }: { type: BuildingType }) {
  const Illustration = BUILDINGS[type];
  return <svg viewBox="-16 -32 286 226" fill="none" stroke="#9eafc0" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false">
    <Platform />
    <Illustration />
  </svg>;
}

const PAYLOADS = [FileCheck, Package, ShieldCheck, FlaskConical, Activity];
const EMPHASIS = [[0, 1, 2, 3, 4], [0, 1, 2, 4], [1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 3, 4]];

export function ContinuumJourney({ phase }: { phase: number }) {
  const Payload = PAYLOADS[phase];

  return (
    <figure className={styles.journey} aria-label="A connected plant, from office to delivery bay" data-phase={phase}>
      <div className={styles.plant}>
        <div key={phase} className={styles.route} aria-hidden="true"><span className={styles.routeProgress} /><span className={styles.signal}><Payload size={17} /></span></div>
        <ol className={styles.stations}>
          {STATIONS.map((station, index) => (
            <li key={station.type} className={styles.station} data-building={station.type} data-emphasized={EMPHASIS[phase].includes(index)} style={{ "--delay": `${index * -1.2}s` } as CSSProperties}>
              <div className={styles.building}><PlantBuilding type={station.type} /></div>
              <span className={styles.stationDot} aria-hidden="true" />
              <div className={styles.stationLabel}><span className={styles.stationNumber}>0{index + 1}</span><h3>{station.name}</h3><p>{station.detail}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
