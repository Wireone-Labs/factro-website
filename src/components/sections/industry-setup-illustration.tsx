"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { Check, ChevronDown, ChevronLeft, ChevronRight, ClipboardCheck, Dog, Factory, FlaskConical, Layers3, Leaf, Pause, Pill, Play, ShieldCheck, Sparkles, Stethoscope, Wheat } from "lucide-react";
import { Container } from "@/components/ui/container";
import { industryTheme } from "@/data/industry-themes";
import { PlantBuilding } from "./continuum-journey";
import { INDUSTRY_ARTIFACTS, IndustryBlueprintArt } from "./industry-blueprint-art";
import { useVisualCycle } from "./use-visual-cycle";
import shared from "./marketing-page.module.css";
import styles from "./industry-setup-illustration.module.css";

const INDUSTRY_ICONS = { pharmaceuticals: Pill, "medical-devices": Stethoscope, "food-beverage": Wheat, nutraceuticals: Leaf, cosmetics: Sparkles, veterinary: Dog, "api-cdmo": FlaskConical };

function useSceneVisibility(regionRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    let visible = false;
    const sync = () => { region.dataset.running = String(visible && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(region);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, [regionRef]);
}

export function IndustryShowcase({ industries }: { industries: { slug: string; name: string }[] }) {
  const [paused, setPaused] = useState(false);
  const { active, setActive, regionRef } = useVisualCycle(industries.length, 4000, { pauseOnFocus: "keyboard", paused });
  const identity = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const industry = industries[active];
  const details = INDUSTRY_ARTIFACTS[industry.slug];
  useSceneVisibility(regionRef);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = industries.length;
    const next = event.key === "ArrowRight" ? (index + 1) % count : event.key === "ArrowLeft" ? (index + count - 1) % count : event.key === "Home" ? 0 : event.key === "End" ? count - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  }

  return <div ref={regionRef} className={styles.showcase} style={industryTheme(industry.slug)} data-native-asset data-running="false" data-paused={paused}>
    <div className={styles.showcaseScene}>
      {industries.map((item,index) => <div key={item.slug} className={styles.industryFrame} data-active={active === index} aria-hidden={active !== index} inert={active !== index}>
        <IndustryBlueprintArt industry={item.slug} />
      </div>)}
      <div className={styles.artifactLabels} key={industry.slug}>{details.artifacts.map(label => <span key={label}><i aria-hidden="true" />{label}</span>)}</div>
    </div>
    <div className={styles.controls}>
      <div className={styles.industryTabs} role="tablist" aria-label="Explore industry blueprints">
        {industries.map((item,index) => {
          const Icon = INDUSTRY_ICONS[item.slug as keyof typeof INDUSTRY_ICONS];
          return <button key={item.slug} type="button" role="tab" id={`${identity}-tab-${index}`} aria-label={item.name} title={item.name} aria-selected={active === index} aria-controls={`${identity}-panel`} tabIndex={active === index ? 0 : -1} style={industryTheme(item.slug)} ref={element => { buttons.current[index] = element; }} onClick={() => setActive(index)} onKeyDown={event => navigate(event,index)}><Icon size={19} aria-hidden="true" /></button>;
        })}
      </div>
      <button className={styles.pause} type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play industry rotation" : "Pause industry rotation"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
    </div>
    <div className={styles.caption} id={`${identity}-panel`} role="tabpanel" aria-labelledby={`${identity}-tab-${active}`} tabIndex={0}>
      <div key={industry.slug}><span>{industry.name}</span><h3>{details.title}</h3><p>{details.detail}</p></div>
    </div>
  </div>;
}

const SETUP_STEPS = [
  { name: "Core systems", icon: Factory, title: "A manufacturing core", description: "ERP, MES and QMS provide the shared systems for materials, production and quality.", detail: "ERP · MES · QMS", tone: "core" },
  { name: "Industry blueprints", icon: Layers3, title: "Your industry blueprint", description: "Blueprints add the industry-specific nuances, checks and workflows to that core.", detail: "Processes, checks and workflows", tone: "blueprint" },
  { name: "Selected compliance", icon: ShieldCheck, title: "Applicable compliance, selected", description: "The Compliance Engine shortlists what applies. You select the relevant frameworks and controls during setup.", detail: "Shortlisted, then selected", tone: "compliance" },
  { name: "Automated validation", icon: ClipboardCheck, title: "An automated validation pack", description: "The validation pack runs through the entire setup and verifies its checkpoints, from workflows to permissions and controls.", detail: "The whole setup, checked", tone: "validation" },
] as const;

function CoreSystems() {
  return <svg viewBox="0 0 320 290" fill="none" stroke="#99aecb" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="160" cy="250" rx="135" ry="21" fill="#dce5f766" stroke="none" />
    <path d="M24 190L155 124L296 195L165 262Z" fill="#f7faff" /><path d="M24 190V199L165 271L296 204V195L165 262Z" fill="#dbe7f5" />
    <path d="M75 188L158 227L248 183" stroke="#718fcc" strokeWidth="2" />
    {[{ label: "ERP", x: 41, y: 128, fill: "#e0eafa" }, { label: "MES", x: 117, y: 67, fill: "#dce2f7" }, { label: "QMS", x: 200, y: 131, fill: "#deeee9" }].map((item,index) => <g key={item.label} transform={`translate(${item.x} ${item.y})`}><g className={styles.coreModule} style={{ animationDelay: `${index * .2}s` }}>
      <path d="M0 18L35 0L72 19L37 38Z" fill="#f7faff" /><path d="M0 18V76L37 96V38Z" fill={item.fill} /><path d="M37 38L72 19V76L37 96Z" fill="#cedcee" />
      <path d="M9 37L27 47V64L9 54Z" fill="white" /><path d="M45 51L64 41M45 61L64 51" stroke="#91a6c6" />
      <text x="36" y="-10" textAnchor="middle" fill="#557198" stroke="none" fontSize="12" fontWeight="600">{item.label}</text>
    </g></g>)}
  </svg>;
}

function BlueprintLayers() {
  return <svg viewBox="0 0 320 290" fill="none" stroke="#9daed0" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="154" cy="249" rx="137" ry="25" fill="#738bb911" stroke="none" />
    {[62,31,0].map((offset,index) => <g key={offset} transform={`translate(0 ${offset})`}><g className={styles.blueprintLayer} style={{ animationDelay: `${index * .18}s` }}>
      <path d="M18 141L152 74L298 148L165 217Z" fill={index === 2 ? "#f4f7ff" : "#e4ebfa"} /><path d="M18 141V148L165 224L298 155V148L165 217Z" fill="#d0ddf2" />
      {index === 2 && <g stroke="#6f89c9"><path d="M48 141L151 90L269 149L166 201ZM114 108L230 168M95 164L198 113M158 134L198 154L161 174" /><path d="M56 139L111 112L143 128L89 155Z" fill="#dce5ff" /><path d="M171 159L220 134L252 150L202 175Z" fill="#e4def7" /><path d="M91 141L158 174L198 154L156 133L195 114" stroke="#5968e2" strokeDasharray="4 5" strokeWidth="2" /></g>}
    </g></g>)}
    <g transform="translate(123 19)"><rect width="68" height="59" rx="12" fill="#fff" stroke="#cbd4ee" /><path d="M16 20L34 10L52 20L34 30ZM16 28L34 38L52 28M16 36L34 46L52 36" stroke="#5968e2" strokeWidth="2" /></g>
  </svg>;
}

function ComplianceFilter() {
  return <svg viewBox="0 0 320 290" fill="none" stroke="#a7b5cd" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="155" cy="260" rx="124" ry="16" fill="#839db814" stroke="none" />
    {[0,1,2,3,4].map(index => <g key={index} transform={`translate(${27 + index * 57} ${25 + index % 2 * 14})`}><g className={styles.complianceRule} style={{ animationDelay: `${index * .17}s` }}><rect width="36" height="42" rx="7" fill={index % 2 ? "#f3f5f9" : "#edf0ff"} /><path d="M9 13H26M9 21H26M9 29H21" stroke={index % 2 ? "#bac3d1" : "#9babe0"} /></g></g>)}
    <path d="M20 98L153 77L293 99L193 173V204L124 222V173Z" fill="#e6eaf9" /><path d="M20 98L152 123L293 99M152 123V183L193 173M124 173L152 183" stroke="#a2afcf" />
    <path className={styles.complianceFlow} d="M70 68L105 110M151 70V111M248 68L209 111" stroke="#687bc6" strokeWidth="2" strokeDasharray="4 7" />
    <g transform="translate(109 205)"><rect width="104" height="52" rx="13" fill="#fff" stroke="#b7d8ca" /><circle cx="24" cy="26" r="12" fill="#e5f4ed" stroke="#86b6a2" /><path d="M18 26L23 31L31 21" stroke="#438c71" strokeWidth="2" /><path d="M47 21H86M47 30H74" stroke="#adc4b8" /></g>
  </svg>;
}

function ValidationBoard() {
  return <svg viewBox="0 0 320 290" fill="none" stroke="#a6b9bb" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="158" cy="263" rx="125" ry="17" fill="#7b9c9514" stroke="none" />
    <path d="M35 39L251 27L278 242L62 257Z" fill="#dce9e6" /><path d="M26 31L242 19L269 234L53 249Z" fill="#f9fcfb" />
    <path d="M30 64L245 52" stroke="#d7e6e1" /><circle cx="45" cy="45" r="3" fill="#aecbbd" stroke="none" /><circle cx="58" cy="44" r="3" fill="#c9dbd4" stroke="none" /><circle cx="71" cy="43" r="3" fill="#d9e5e0" stroke="none" />
    {[0,1,2,3].map(index => <g key={index} transform={`translate(${53 + index * 5} ${88 + index * 38})`}><rect width="24" height="24" rx="7" fill="#e3f2e9" stroke="#b5d4c2" /><path className={styles.validationCheck} style={{ animationDelay: `${index * .28}s` }} pathLength="1" d="M6 12L11 17L19 7" stroke="#459877" strokeWidth="2" /><path d="M40 7H155M40 16H121" stroke="#bdcfc8" strokeWidth="2" /></g>)}
    <g transform="translate(234 216)"><circle r="29" fill="#e4f3eb" stroke="#90bda8" /><path d="M-13 0L-3 10L15 -11" stroke="#438f70" strokeWidth="3" strokeLinecap="round" /></g>
  </svg>;
}

export function IndustrySetupSection() {
  const identity = useId();
  const [paused, setPaused] = useState(false);
  const { active, setActive, regionRef } = useVisualCycle(SETUP_STEPS.length, 4500, { pauseOnHover: false, pauseOnFocus: "keyboard", paused });
  useSceneVisibility(regionRef);
  return <section id="multi-pack" className={shared.section} aria-labelledby={`${identity}-heading`}>
    <Container><div ref={regionRef} className={styles.setupLayout} data-running="false" data-paused={paused}>
      <div className={styles.setupCopy}>
        <p className={shared.eyebrow}>How it works</p>
        <h2 id={`${identity}-heading`}>One manufacturing core.<br /><span>Made for your industry.</span></h2>
        <ol className={styles.setupSteps}>{SETUP_STEPS.map((step,index) => <li key={step.name} data-tone={step.tone}><button type="button" aria-pressed={active === index} aria-controls={`${identity}-block-${index}`} onClick={() => setActive(index)}><span className={styles.stepNumber}>{String(index + 1).padStart(2,"0")}</span><span><strong>{step.title}</strong><span className={styles.stepDescription}>{step.description}</span></span></button></li>)}</ol>
      </div>
      <figure className={styles.setupVisual} data-native-asset aria-label="A connected series: core systems, industry blueprints, selected compliance and automated validation form your manufacturing setup">
        <div className={styles.setupIngredients}>
          {SETUP_STEPS.map((step,index) => {
            const Icon = step.icon;
            return <button key={step.name} type="button" id={`${identity}-block-${index}`} className={styles.setupIngredient} data-tone={step.tone} data-active={active === index} aria-pressed={active === index} aria-label={`Show ${step.name.toLowerCase()}`} onClick={() => setActive(index)}>
              <span className={styles.blockNumber} aria-hidden="true">{String(index + 1).padStart(2,"0")}</span>
              <div className={styles.ingredientArt}>{index === 0 ? <CoreSystems /> : index === 1 ? <BlueprintLayers /> : index === 2 ? <ComplianceFilter /> : <ValidationBoard />}</div>
              <div className={styles.ingredientLabel}><Icon size={15} aria-hidden="true" /><strong>{step.name}</strong></div>
              <p>{step.detail}</p>
            </button>;
          })}
          <span className={styles.networkLink} data-edge="core-blueprint" data-active={active === 0} aria-hidden="true"><ChevronRight size={13} /><i /></span>
          <span className={styles.networkLink} data-edge="blueprint-compliance" data-active={active === 1} aria-hidden="true"><ChevronDown size={13} /><i /></span>
          <span className={styles.networkLink} data-edge="compliance-validation" data-active={active === 2} aria-hidden="true"><ChevronLeft size={13} /><i /></span>
        </div>
        <div className={styles.networkOutlet} data-active={active === 3} aria-hidden="true"><svg viewBox="0 0 100 54" preserveAspectRatio="none" fill="none"><path d="M25 0V17Q25 27 29 27H46Q50 27 50 37V54" /><path className={styles.outletSignal} d="M25 0V17Q25 27 29 27H46Q50 27 50 37V54" /></svg><ChevronDown size={13} /></div>
        <figcaption className={styles.combinedSetup} data-active={active === 3}>
          <div className={styles.combinedPlant}><PlantBuilding type="shopfloor" /></div>
          <div><span className={styles.combinedEyebrow}>All four, working as one</span><h3>Your manufacturing setup.</h3><p><Check size={15} aria-hidden="true" />Industry workflows. Selected controls.<br />Verified setup checkpoints.</p></div>
        </figcaption>
        <div className={styles.setupPlayback}><span>{String(active + 1).padStart(2,"0")} / 04 · {SETUP_STEPS[active].name}</span><button className={styles.pause} type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play setup explainer" : "Pause setup explainer"}>{paused ? <Play size={14} /> : <Pause size={14} />}</button></div>
      </figure>
    </div></Container>
  </section>;
}
