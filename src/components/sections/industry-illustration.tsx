"use client";

import { useEffect, useRef } from "react";
import { industryTheme } from "@/data/industry-themes";
import styles from "./industry-illustration.module.css";

export function IndustryProduct({ industry }: { industry: string }) {
  const productRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const product = productRef.current;
    if (!product) return;
    let visible = false;
    const update = () => { product.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(product);
    document.addEventListener("visibilitychange", update);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return <g ref={productRef} className={styles.product} data-running="false" data-industry-art={industry} style={industryTheme(industry)}><IndustryProductShape industry={industry} /></g>;
}

function IndustryProductShape({ industry }: { industry: string }) {
  if (industry === "medical-devices") return <g>
    <path d="M16 29L63 5L115 31V94L68 119L16 92Z" fill="#d7e5ed" /><path d="M16 29L68 56L115 31M68 56V119" />
    <path d="M25 37L60 55V85L25 67Z" fill="#f8fdff" />
    <path d="M29 56L35 59L39 48L44 68L49 60L57 64" stroke="currentColor" opacity=".15" />
    <path className={styles.monitorTrace} pathLength="1" d="M29 56L35 59L39 48L44 68L49 60L57 64" stroke="currentColor" strokeWidth="1.7" />
    <path d="M76 65L105 50V81L76 96Z" fill="var(--soft)" /><path className={styles.deviceScan} d="M79 68L102 56" stroke="currentColor" strokeWidth="2" />
    <circle className={styles.statusLight} cx="37" cy="82" r="3" fill="currentColor" stroke="none" /><path d="M32 101V112M98 102V113" strokeWidth="4" />
  </g>;
  if (industry === "api-cdmo") return <g>
    <path d="M36 24V109M96 24V109" strokeWidth="5" /><path d="M25 31Q65 5 106 31V83Q65 111 25 83Z" fill="var(--soft)" />
    <path d="M26 57Q65 76 105 57V82Q65 108 26 82Z" fill="currentColor" fillOpacity=".16" stroke="none" />
    <ellipse cx="65" cy="31" rx="40" ry="17" fill="#f3fafb" />
    <path className={styles.liquidSurface} d="M27 57Q46 48 65 58T104 57" stroke="currentColor" opacity=".6" />
    <path d="M65 15V81" stroke="#85a9b5" strokeWidth="2" />
    <g className={styles.impeller} stroke="currentColor" strokeWidth="3"><path d="M46 75L84 86M84 75L46 86" /></g>
    {[44, 76, 90].map((position, index) => <circle key={position} className={styles.reactorBubble} cx={position} cy={79 - index * 4} r={2 + index % 2} fill="currentColor" fillOpacity=".5" stroke="none" style={{ animationDelay: `${index * -.7}s` }} />)}
    <path d="M57 -5H73V14H57Z" fill="#b6d3dc" /><path d="M106 43H122V83H110" strokeWidth="4" /><path className={styles.pipeFlow} d="M106 43H122V83H110" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8" />
  </g>;
  if (industry === "nutraceuticals") return <g>
    <path d="M21 25V98C21 119 105 119 105 98V25" fill="var(--soft)" /><ellipse cx="63" cy="25" rx="42" ry="17" fill="#eff7e9" /><path d="M22 92C29 109 98 109 104 92M22 40C30 57 98 57 104 40" />
    <path d="M43 62H83V88H43Z" fill="#fff" /><path d="M64 83V65M64 76Q43 64 48 63Q63 59 64 76M64 74Q79 58 80 65Q82 76 64 78" fill="#9bbd90" stroke="#7c9f70" />
    <g className={styles.sampleCapsule}><rect x="111" y="15" width="13" height="28" rx="6.5" fill="white" stroke="currentColor" /><path d="M111 29H124V36.5A6.5 6.5 0 0 1 111 36.5Z" fill="currentColor" fillOpacity=".35" stroke="currentColor" /></g>
    <circle cx="118" cy="87" r="13" fill="white" stroke="currentColor" strokeOpacity=".4" /><path className={styles.identityCheck} pathLength="1" d="M112 87L116 91L124 82" stroke="currentColor" strokeWidth="2" />
    <path className={styles.sampleFlow} d="M118 50V68" stroke="currentColor" strokeDasharray="2 4" />
  </g>;
  if (industry === "food-beverage") return <g>
    <path d="M10 110L107 110L125 120L28 120Z" fill="var(--soft)" /><path d="M28 124H125" strokeWidth="3" />
    {[35, 60, 85, 110].map(position => <g key={position} transform={`translate(${position} 126)`}><circle r="4" fill="white" /><path className={styles.roller} d="M-3 0H3M0 -3V3" stroke="currentColor" /></g>)}
    {[0, 1, 2].map(index => <g key={index} transform={`translate(${index * 31} ${index === 1 ? -10 : 5})`}>
      <g className={styles.carton}><path d="M20 29L35 20L52 29V96L37 105L20 96Z" fill={index === 1 ? "#e4c9a0" : "#e9ddba"} /><path d="M20 29L37 38L52 29M37 38V105" /><path d="M20 52L37 61V81L20 72Z" fill="#f9f5e9" /><path d="M25 60L31 63" stroke="#b79059" strokeWidth="3" /></g>
    </g>)}
    <path className={styles.clearanceScan} d="M12 54L110 54" stroke="currentColor" strokeWidth="2" opacity=".65" />
  </g>;
  if (industry === "cosmetics") return <g>
    <path d="M25 43Q25 34 42 34H57Q73 34 73 43V104Q49 118 25 104Z" fill="var(--soft)" /><ellipse cx="49" cy="43" rx="24" ry="9" fill="#faf3f8" />
    <path className={styles.pump} d="M45 36V16H76V23H53V36" fill="#c4b4c2" /><path d="M32 62H66V89H32Z" fill="#fffafd" /><path className={styles.formulaLevel} d="M38 80H60M38 73H54" stroke="currentColor" strokeWidth="2" />
    <path className={styles.serumDrop} d="M78 30Q72 39 78 40Q84 39 78 30Z" fill="currentColor" fillOpacity=".65" stroke="none" />
    <path d="M83 60H112V104Q96 115 83 104Z" fill="#d5dfed" /><ellipse cx="98" cy="60" rx="15" ry="6" fill="#eff5fd" /><path d="M89 53V34H106V53" fill="#b2c2d7" />
  </g>;
  return <g>
    {[0, 1, 2].map(index => <g key={index} transform={`translate(${index * 30} ${index === 1 ? -12 : 0})`}>
      <g className={industry === "veterinary" ? styles.vetBottle : styles.vial} style={{ animationDelay: `${index * -.65}s` }}>
        <path d="M24 39V28H43V39Q52 43 52 51V96Q33 108 15 96V51Q15 43 24 39Z" fill="var(--soft)" /><rect x="22" y="20" width="23" height="11" rx="2" fill="#b8ccd9" /><path d="M16 62H51V85H16Z" fill="#fff" />
        {industry === "veterinary" ? <path d="M33 66V80M26 73H40" stroke="currentColor" strokeWidth="3" /> : <><path d="M24 71H42M24 77H36" stroke="currentColor" opacity=".6" /><path d="M20 49V56" stroke="#fff" strokeWidth="3" /><path className={styles.labelScan} d="M18 65H49" stroke="currentColor" strokeWidth="2" style={{ animationDelay: `${index * -.65}s` }} /></>}
      </g>
    </g>)}
    {industry === "veterinary" ? <g><path d="M31 115H98" stroke="currentColor" opacity=".2" /><path className={styles.traceRoute} d="M31 115H98" stroke="currentColor" strokeDasharray="4 7" strokeWidth="2" />{[31, 64, 98].map((position, index) => <circle key={position} className={styles.traceNode} cx={position} cy="115" r="5" fill="var(--soft)" stroke="currentColor" strokeWidth="2" style={{ animationDelay: `${index * -.8}s` }} />)}</g> : <path d="M12 116H119" stroke="currentColor" strokeOpacity=".25" strokeWidth="2" />}
  </g>;
}

const RECORDS: Record<string, [string, string]> = {
  pharmaceuticals: ["BMR · B-2281", "Batch release record"],
  "medical-devices": ["DHR · MD-0418", "Device history"],
  "food-beverage": ["CLR · LN-02", "Allergen clearance"],
  nutraceuticals: ["QC · RM-1042", "Ingredient identity"],
  cosmetics: ["MFR · REV 04", "Formula approval"],
  veterinary: ["LOT · VT-0928", "Premix genealogy"],
  "api-cdmo": ["BMR · API-0836", "Customer review pack"],
};

export function IndustryIllustration({ industry, stage, resolved = false }: { industry: string; stage: string; resolved?: boolean }) {
  const [record, title] = RECORDS[industry];
  return <div className={styles.illustration} data-resolved={resolved} style={industryTheme(industry)} aria-hidden="true">
    <svg viewBox="0 0 360 190" fill="none" stroke="#90a5b5" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="173" cy="150" rx="145" ry="25" fill="#8ca7ca12" stroke="none" />
      <path d="M15 127L93 88L190 136L111 176Z" fill="#f7fbff" /><path d="M15 127V136L111 184L190 145V136L111 176Z" fill="#cfdfea" /><path d="M111 176V184" />
      <g transform="translate(39 18) scale(.95)"><IndustryProduct industry={industry} /></g>
      <path d="M149 113Q167 98 193 110" stroke={resolved ? "#5baf93" : "#d0a569"} strokeDasharray="3 4" className={styles.connection} />
      <g transform="translate(196 22) rotate(3)">
        <rect x="6" y="-5" width="140" height="142" rx="6" fill="#d8e3f0" stroke="#b2c3d6" />
        <rect width="140" height="142" rx="6" fill="#fff" stroke="#b2c3d6" />
        <text x="12" y="19" fill="#67829e" stroke="none" fontSize="7">{record}</text>
        <text x="12" y="38" fill="#23374b" stroke="none" fontSize="9" fontWeight="600">{title}</text>
        <path d="M12 49H126" stroke="#e5ebf3" />
        {[63, 80, 97].map((position, index) => <g key={position}>
          <rect x="12" y={position - 6} width="7" height="7" rx="2" fill={resolved || index < 2 ? "#dff2e9" : "#fff0d8"} stroke="none" />
          <path d={`M27 ${position - 2}H${index === 1 ? 97 : 119}`} stroke="#c7d4e0" strokeWidth="3" />
        </g>)}
        <rect x="10" y="113" width="120" height="19" rx="3" fill={resolved ? "#e5f5ed" : "#fff1da"} stroke="none" />
        <circle cx="20" cy="122.5" r="2.5" fill={resolved ? "#429876" : "#c5923a"} stroke="none" />
        <text x="28" y="125" fill={resolved ? "#337c62" : "#956423"} stroke="none" fontSize="7">{resolved ? "Verified · " : "Pending · "}{stage}</text>
      </g>
    </svg>
  </div>;
}
