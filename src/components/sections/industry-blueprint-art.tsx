"use client";

import { useEffect, useRef } from "react";
import { industryTheme } from "@/data/industry-themes";
import { IndustryProduct } from "./industry-illustration";
import styles from "./industry-blueprint-art.module.css";

export const INDUSTRY_ARTIFACTS: Record<string, { title: string; detail: string; artifacts: string[] }> = {
  pharmaceuticals: { title: "From formulation to batch release.", detail: "Vials, blister packs and assay evidence stay connected to the manufacturing record.", artifacts: ["Batch records", "Assay results", "QA release"] },
  "medical-devices": { title: "Every device carries its history.", detail: "Serial identity, assembly checks and acceptance tests follow the device through release.", artifacts: ["Serial identity", "Acceptance tests", "Device history"] },
  "food-beverage": { title: "Controls that run with the line.", detail: "Temperature checks, allergen clearance and traceable ingredients stay with each production run.", artifacts: ["Temperature checks", "Allergen clearance", "Ingredient trace"] },
  nutraceuticals: { title: "Know the ingredient before it reaches the batch.", detail: "Botanical samples, identity testing and approved lots connect receipt to dispensing.", artifacts: ["Botanical identity", "Test evidence", "Released ingredients"] },
  cosmetics: { title: "One approved formula, every time.", detail: "Formula revisions, ingredient limits and product information follow each blend and fill.", artifacts: ["Formula versions", "Ingredient limits", "Product information"] },
  veterinary: { title: "Trace the premix to its intended use.", detail: "Premix lots, species-specific controls and downstream shipments share one connected history.", artifacts: ["Premix genealogy", "Species controls", "Shipment trace"] },
  "api-cdmo": { title: "Process evidence, ready for customer review.", detail: "Reaction parameters, analytical results and customer-specific records stay with the batch.", artifacts: ["Reaction parameters", "Analytical results", "Customer records"] },
};

function CompanionArtifact({ industry }: { industry: string }) {
  if (industry === "pharmaceuticals") return <g transform="translate(221 67) rotate(13)">
    <path d="M0 0H77V105H0Z" fill="#dbe6f5" /><path d="M5 5H72V100H5Z" fill="#eef3fb" />
    {[0,1,2].map(row => [0,1].map(column => <g key={`${row}-${column}`} transform={`translate(${19 + column * 37} ${20 + row * 32})`}><rect width="15" height="23" rx="7.5" fill="white" /><path d="M0 11.5H15V15.5A7.5 7.5 0 0 1 0 15.5Z" fill="var(--accent)" fillOpacity=".35" /><path d="M3 5V10" stroke="white" strokeWidth="2" /></g>))}
    <g transform="translate(-21 83) rotate(-20)"><rect width="63" height="39" rx="4" fill="white" /><text x="7" y="12" fontSize="6" stroke="none" fill="var(--accent)">ASSAY · CoA</text><path d="M7 20H48M7 27H36" stroke="#b7c8dc" /><circle cx="51" cy="28" r="5" fill="#e2f2e9" stroke="#87b8a3" /></g>
  </g>;
  if (industry === "medical-devices") return <g transform="translate(210 47)">
    <path d="M11 4V35Q11 59 33 59Q55 59 55 35V4" stroke="#7ca8b6" strokeWidth="5" /><path d="M11 4V17M55 4V17" stroke="#d0e5ed" strokeWidth="7" />
    <path className={styles.cable} d="M33 59V77Q33 103 63 103Q91 103 91 78V63" stroke="var(--accent)" strokeWidth="3" /><circle cx="91" cy="58" r="12" fill="#d4eaf0" /><circle cx="91" cy="58" r="6" fill="white" />
    <g transform="translate(5 117) rotate(-7)"><rect width="109" height="33" rx="7" fill="white" /><text x="9" y="12" fontSize="6" stroke="none" fill="var(--accent)">UDI · MD-0418</text>{[0,5,8,14,21,25,31,37,42,49,54,61,66,73,79].map((position,index) => <path key={position} d={`M${10 + position} 18V26`} stroke="#7594a4" strokeWidth={index % 3 === 0 ? 2 : 1} />)}<path className={styles.scan} d="M5 15H101" stroke="var(--accent)" strokeWidth="2" /></g>
  </g>;
  if (industry === "food-beverage") return <g transform="translate(216 44)">
    <path d="M18 11Q18 0 30 0Q42 0 42 11V71A22 22 0 1 1 18 71Z" fill="#fff9ed" /><path d="M30 20V82" stroke="#e5c79a" strokeWidth="7" strokeLinecap="round" /><path className={styles.temperature} d="M30 39V82" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" /><circle cx="30" cy="87" r="11" fill="var(--accent)" fillOpacity=".5" stroke="none" /><path d="M48 22H57M48 36H54M48 50H57" />
    <path d="M88 55V117M88 70Q61 62 69 51Q88 50 88 70M88 88Q112 71 108 64Q91 64 88 88M88 104Q62 93 69 85Q88 86 88 104" fill="#e8d5a6" stroke="#b99a5b" />
    <g transform="translate(0 123)"><rect width="114" height="28" rx="14" fill="white" /><circle cx="15" cy="14" r="8" fill="#e8f3e6" stroke="#8aab82" /><path d="M11 14L14 17L19 11" stroke="#63875c" /><text x="29" y="17" fontSize="8" stroke="none" fill="#7e6945">CCP checked</text></g>
  </g>;
  if (industry === "nutraceuticals") return <g transform="translate(209 48)">
    <path d="M57 50Q25 51 28 13Q61 10 57 50M59 50Q61 5 98 9Q97 44 59 50" fill="#c5dfbf" stroke="#85aa82" /><path d="M57 62V34M57 49L82 23M57 45L40 25" stroke="#85aa82" />
    <g className={styles.pestle}><path d="M82 49L108 13Q113 7 120 13Q124 17 120 23L94 62Z" fill="#c9d8d2" /></g>
    <ellipse cx="59" cy="70" rx="46" ry="15" fill="#f7fcf6" /><path d="M13 70Q18 118 59 118Q100 118 105 70Q59 96 13 70Z" fill="#d6e7d4" /><path d="M40 118H78L86 127H32Z" fill="#c3d7c0" />
    <g transform="translate(-8 133)"><path d="M0 18H126" stroke="#cadcc9" /><path className={styles.spectrum} d="M0 16H28L37 3L46 16H63L74 -9L84 16H126" stroke="var(--accent)" strokeWidth="2" pathLength="1" /></g>
  </g>;
  if (industry === "cosmetics") return <g transform="translate(210 43)">
    <g transform="rotate(22 72 40)"><rect x="61" y="0" width="23" height="25" rx="7" fill="#c9b6c6" /><path d="M64 25H81V63L73 76L64 63Z" fill="#fff8fc" /><path d="M70 35V64" stroke="#c787aa" strokeWidth="3" /><path className={styles.drop} d="M73 86Q63 101 73 103Q83 101 73 86Z" fill="#ca84a8" stroke="none" /></g>
    <g transform="translate(2 83) rotate(-12)"><rect width="95" height="61" rx="8" fill="#fff" /><circle cx="23" cy="29" r="12" fill="#f1d6d7" stroke="#d3afb8" /><circle cx="49" cy="29" r="12" fill="#e7b7c9" stroke="#c48da7" /><circle cx="75" cy="29" r="12" fill="#d0a5cb" stroke="#ac85ac" /><path d="M14 49H79" stroke="#decdda" /></g>
    <g transform="translate(49 137) rotate(5)"><rect width="69" height="34" rx="4" fill="white" /><text x="7" y="12" fontSize="6" fill="var(--accent)" stroke="none">FORMULA · REV 04</text><path d="M7 20H58M7 26H41" stroke="#ceacbe" /></g>
  </g>;
  if (industry === "veterinary") return <g transform="translate(206 49)">
    <path d="M17 15L73 15L79 34L85 105Q45 120 7 104L13 34Z" fill="#f0e4c7" /><path d="M17 15L22 6H68L73 15M13 34Q46 41 79 34" stroke="#c0ab7a" /><path d="M20 48H72V85H20Z" fill="#fffaf0" /><path d="M45 56V77M35 66H56" stroke="#a68b54" strokeWidth="4" />
    <g transform="translate(60 85)"><path d="M5 26L16 10L30 10L41 18L52 19L54 6L61 9L66 22L63 38L57 40V59H51V40H25V59H19V38L11 37L1 30Z" fill="#c8c0ad" stroke="#9d9788" /><path d="M53 9L53 22L61 25" fill="#aaa18f" /><circle cx="61" cy="27" r="1.3" fill="#67717b" stroke="none" /></g>
    <path className={styles.trace} d="M10 139H50L66 154H115" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 5" /><circle cx="10" cy="139" r="4" fill="white" /><circle cx="115" cy="154" r="4" fill="white" />
  </g>;
  return <g transform="translate(208 40)">
    <g className={styles.molecule}><path d="M16 32L49 12L82 31V68L48 87L16 68ZM82 31L112 14M82 68L112 88M48 87V115" stroke="#a493cc" strokeWidth="2" />{[[16,32],[49,12],[82,31],[82,68],[48,87],[16,68],[112,14],[112,88],[48,115]].map(([horizontal,vertical],index) => <circle key={`${horizontal}-${vertical}`} cx={horizontal} cy={vertical} r={index % 3 === 0 ? 8 : 6} fill={index % 3 === 0 ? "#b6a4da" : "#e9e2f7"} stroke="#9d8ac3" />)}</g>
    <g transform="translate(0 130)"><rect width="123" height="43" rx="6" fill="white" /><path d="M8 32H115M8 11H115" stroke="#eeeaf5" /><path className={styles.spectrum} pathLength="1" d="M8 30H26L34 18L41 30H55L64 7L72 30H86L93 21L101 30H115" stroke="var(--accent)" strokeWidth="1.8" /></g>
  </g>;
}

export function IndustryBlueprintArt({ industry }: { industry: string }) {
  const artworkRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;
    let visible = false;
    const sync = () => { artwork.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(artwork);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return <svg ref={artworkRef} className={styles.art} data-running="false" data-industry-artwork={industry} style={industryTheme(industry)} viewBox="0 0 360 240" fill="none" stroke="#94a9bb" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true" focusable="false">
    <ellipse cx="176" cy="207" rx="155" ry="22" fill="#8ba2bd12" stroke="none" />
    <path d="M9 161L106 115L223 173L125 222Z" fill="#f8fbff" /><path d="M9 161V169L125 231L223 181V173L125 222Z" fill="#d0dfea" /><path d="M125 222V231" />
    <g transform="translate(27 35) scale(1.25)"><IndustryProduct industry={industry} /></g>
    <CompanionArtifact industry={industry} />
  </svg>;
}
