"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./hero-event-flow.module.css";

const CONVEYOR_PATH = "M178 290V466Q178 490 200 510L490 730Q510 750 540 750H900Q930 750 950 730L1240 510Q1262 490 1262 466V290";
const EVENT_CHANNELS = [
  { name: "Invoicing", x: 178, y: 290 },
  { name: "Planning", x: 178, y: 475 },
  { name: "Procurement", x: 350, y: 624 },
  { name: "Production", x: 720, y: 750 },
  { name: "Quality", x: 1065, y: 642 },
  { name: "Dispatch", x: 1220, y: 525 },
  { name: "Settlements", x: 1262, y: 290 },
];
const MODULE_NAMES = EVENT_CHANNELS.map((channel) => channel.name);
const MAIL_ROUTES = EVENT_CHANNELS.flatMap(source => EVENT_CHANNELS.filter(destination => destination !== source).map(destination => ({
  source: source.name,
  destination: destination.name,
  path: `M${source.x} ${source.y - 65}Q${(source.x + destination.x) / 2} ${Math.max(360, Math.min(source.y, destination.y) - 110)} ${destination.x} ${destination.y - 65}`,
})));
const PRODUCT_TYPES = ["medicine", "car-door", "box", "food-packet", "bottle-case"] as const;
const BACKEND_LAYERS = [
  { id: "compliance-engine", name: "Compliance Engine", color: "#0F6E56", soft: "#eff8f5" },
  { id: "orchestrator", name: "Task Manager", color: "#D9822B", soft: "#fcf6ed" },
  { id: "agentic-ai", name: "Intelligence Layer", color: "#4F4BD8", soft: "#f3f2fc" },
  { id: "backend-service", name: "Backend Service", color: "#A32D2D", soft: "#fbf1f1" },
  { id: "ai-agents", name: "AI Agents", color: "#A32D2D", soft: "#fbf1f1" },
];


function DepartmentMail() {
  const [routeIndex, setRouteIndex] = useState<number | null>(null);
  const route = routeIndex === null ? null : MAIL_ROUTES[routeIndex];

  return <g aria-hidden="true">
    <rect width="1" height="1" className={styles.mailClock} onAnimationIteration={() => setRouteIndex(previous => {
      const candidates = MAIL_ROUTES.map((route, index) => ({ route, index })).filter(({ route, index }) => index !== previous && (previous === null
        || route.source !== MAIL_ROUTES[previous].destination || route.destination !== MAIL_ROUTES[previous].source));
      return candidates[Math.floor(Math.random() * candidates.length)].index;
    })} />
    {route && <g key={routeIndex} data-mail-route={`${route.source} → ${route.destination}`}>
      <path d={route.path} className={styles.handoffRoute} />
      <g className={styles.handoffMessage} style={{ offsetPath: `path('${route.path}')` }}>
        <g className={styles.paperPlane}>
          <path d="M18 0L-15 -12L-8 0L-15 12Z" fill="white" stroke="#527fc7" strokeWidth="1.5" />
          <path d="M18 0L-8 0L-15 12Z" fill="#dce8ff" stroke="#527fc7" strokeWidth="1.2" />
        </g>
      </g>
    </g>}
  </g>;
}

function BackendLayers({ activeStep }: { activeStep: number }) {
  const [activeLayer, setActiveLayer] = useState(0);
  const station = EVENT_CHANNELS[activeStep];
  const evidencePath = `M${station.x} ${station.y}Q${station.x} 342 720 361V545`;

  return <g className={styles.backendLayers} data-backend-layers>
    <rect width="1" height="1" className={styles.stackClock} onAnimationIteration={() => setActiveLayer(layer => (layer + 1) % BACKEND_LAYERS.length)} />
    <path d={evidencePath} className={styles.backendSpine} />
    <g key={activeStep} className={styles.backendSignal} style={{ offsetPath: `path('${evidencePath}')` }}>
      <circle r="8" fill="#7b91b8" opacity=".12" /><circle r="3" fill="#6d85b1" />
    </g>
    {BACKEND_LAYERS.map(layer => <circle key={layer.id} data-layer-port={layer.id} cx="720" cy="545" r="1" opacity="0" />)}
    <g transform="translate(417.6 237) scale(.42)">
    {[...BACKEND_LAYERS].reverse().map((layer, reverseIndex) => {
      const index = BACKEND_LAYERS.length - 1 - reverseIndex;
      const top = 280 + index * 28;
      const active = index === activeLayer;
      const corners: [number, number][] = [[720, top], [870, top + 85], [720, top + 170], [570, top + 85]];
      return <g key={layer.id} className={styles.backendLayer} data-layer={layer.id} data-active={active} style={{ "--layer-color": layer.color, "--layer-soft": layer.soft, "--stack-offset": `${index >= activeLayer ? 150 : 0}px` } as CSSProperties}>
        <path d={roundedPath(corners.map(([horizontal, vertical]) => [horizontal, vertical + 22]), 14)} className={styles.layerEdge} />
        <path d={roundedPath(corners, 14)} className={styles.layerSurface} />
        <path d={`M570 ${top + 85}V${top + 107}M720 ${top + 170}V${top + 192}M870 ${top + 85}V${top + 107}`} className={styles.layerSeams} />
        {[[720, top + 12], [852, top + 85], [720, top + 158], [588, top + 85]].map(([horizontal, vertical]) => <ellipse key={`${horizontal}-${vertical}`} cx={horizontal} cy={vertical} rx="2.5" ry="1.4" className={styles.layerFastener} />)}
        <g transform={`translate(720 ${top + 85})`} className={styles.layerCore}>
          <path d={roundedPath([[0, -25], [60, 9], [0, 43], [-60, 9]], 9)} className={styles.coreEdge} />
          <path d={roundedPath([[0, -39], [60, -5], [0, 29], [-60, -5]], 9)} className={styles.coreSurface} />
          <path d="M-20 -27L40 7M-40 -16L20 18" className={styles.coreSeams} />
        </g>
        <g className={styles.layerCaption}>
          <path d={`M890 ${top + 85}H932`} />
          <text x="946" y={top + 85} dominantBaseline="middle">{layer.name}</text>
        </g>
      </g>;
    })}
    </g>
  </g>;
}

function Mixer() {
  return (
    <g stroke="#738897" strokeWidth="1">
      <ellipse cy="32" rx="35" ry="13" fill="#d8e5ee" opacity=".4" stroke="none" />
      <path d="M-24 1V30M24 1V30" strokeWidth="4" />
      <path d="M-30 -61V-7C-30 15 30 15 30 -7V-61Z" fill="#eaf4f7" />
      <ellipse cy="-61" rx="30" ry="12" fill="#f8fcff" />
      <path d="M-29 -31C-10 -18 10 -18 29 -31V-7C29 11 -29 11 -29 -7Z" fill="#edc84d" opacity=".8" stroke="none" />
      <ellipse cy="-31" rx="28" ry="10" fill="#f7df76" stroke="#c5a23d" />
      <path d="M0 -83V-19" strokeWidth="4" />
      <g transform="translate(0 -31) scale(1 .36)"><g className={styles.mixerBlades}><path d="M0 0Q-31 -29 -21 -5L0 0Q29 -31 5 -21L0 0Q31 29 21 5L0 0Q-29 31 -5 21Z" fill="#8c824e" stroke="#6f693f" /></g></g>
      <rect x="-11" y="-92" width="22" height="17" rx="5" fill="#d8e7ee" />
      <path d="M-6 -86H6M-6 -81H6" stroke="#9aaebb" />
      <path d="M30 -9H40V8" fill="none" strokeWidth="4" />
      <circle className={styles.beacon} cx="-20" cy="-43" r="3" fill="#d849ae" stroke="none" />
    </g>
  );
}

function roundedPath(points: [number, number][], radius = 3) {
  return points.map((point, index) => {
    const previous = points[(index + points.length - 1) % points.length];
    const next = points[(index + 1) % points.length];
    const before = Math.min(radius / Math.hypot(previous[0] - point[0], previous[1] - point[1]), .5);
    const after = Math.min(radius / Math.hypot(next[0] - point[0], next[1] - point[1]), .5);
    return `${index === 0 ? "M" : "L"}${point[0] + (previous[0] - point[0]) * before} ${point[1] + (previous[1] - point[1]) * before}Q${point[0]} ${point[1]} ${point[0] + (next[0] - point[0]) * after} ${point[1] + (next[1] - point[1]) * after}`;
  }).join(" ") + "Z";
}

function robotArmPose(shoulder: { x: number; y: number }, wrist: { x: number; y: number }, secondary: boolean, contact = false) {
  const deltaX = wrist.x - shoulder.x;
  const deltaY = wrist.y - shoulder.y;
  const distance = Math.max(.001, Math.hypot(deltaX, deltaY));
  const bend = Math.sqrt(Math.max(0, 52 ** 2 - (distance / 2) ** 2));
  const direction = secondary ? 1 : -1;
  const joint = {
    x: (shoulder.x + wrist.x) / 2 + direction * deltaY / distance * bend,
    y: (shoulder.y + wrist.y) / 2 - direction * deltaX / distance * bend,
  };
  return { joint, wrist, contact };
}

function RobotArm({ secondary = false }: { secondary?: boolean }) {
  const armRef = useRef<SVGGElement>(null);
  const shoulder = secondary ? { x: 790, y: 774 } : { x: 620, y: 699 };
  const [pose, setPose] = useState(() => robotArmPose(shoulder, { x: shoulder.x + (secondary ? 35 : -35), y: shoulder.y - 48 }, secondary));
  const contactStart = shoulder.x + (secondary ? 5 : -45);
  const contactEnd = shoulder.x + (secondary ? 45 : -5);

  useEffect(() => {
    const arm = armRef.current;
    const scene = arm?.ownerSVGElement;
    if (!arm || !scene) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const products = Array.from(scene.querySelectorAll<SVGCircleElement>("[data-product-anchor]"));
    let frame = 0;
    let lastUpdate = 0;
    const update = (now: number) => {
      frame = requestAnimationFrame(update);
      if (now - lastUpdate < 32 || scene.closest('[data-offscreen="true"]') || !scene.getClientRects().length) return;
      lastUpdate = now;
      const screenMatrix = arm.closest<SVGGElement>("[data-factory-world]")?.getScreenCTM() ?? scene.getScreenCTM();
      if (!screenMatrix) return;
      const inverse = screenMatrix.inverse();
      const candidates = motion.matches ? [] : products.map((product) => {
        const bounds = product.getBoundingClientRect();
        return new DOMPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2).matrixTransform(inverse);
      }).filter((point) => point.y > 735 && point.y < 765 && point.x > contactStart && point.x < contactEnd);
      const target = candidates.sort((first, second) => Math.abs(first.x - shoulder.x) - Math.abs(second.x - shoulder.x))[0];
      const rest = { x: shoulder.x + (secondary ? 35 : -35), y: shoulder.y - 48 };
      const engagement = target ? Math.min(1, (target.x - contactStart) / 8, (contactEnd - target.x) / 8) : 0;
      const blend = engagement * engagement * (3 - 2 * engagement);
      const wrist = target ? { x: rest.x + (target.x - rest.x) * blend, y: rest.y + (target.y - 36 - rest.y) * blend } : rest;
      const nextPose = robotArmPose({ x: shoulder.x, y: shoulder.y }, wrist, secondary, engagement === 1);
      setPose(previous => previous.contact === nextPose.contact && Math.abs(previous.wrist.x - wrist.x) < .01 && Math.abs(previous.wrist.y - wrist.y) < .01 ? previous : nextPose);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [secondary, shoulder.x, shoulder.y, contactStart, contactEnd]);

  const armPath = `M${shoulder.x} ${shoulder.y}L${pose.joint.x} ${pose.joint.y}L${pose.wrist.x} ${pose.wrist.y}`;
  return (
    <g ref={armRef} className={styles.robot} data-machine={secondary ? "paint-sprayer" : "transfer-arm"} data-contact={pose.contact}>
      <title>{secondary ? "Robotic spray painter coating passing objects" : "Material transfer arm"}</title>
      <g transform={`translate(${shoulder.x} ${shoulder.y + 25})`}><Block width={27} depth={23} height={32} color="#f5f9fc" side="#bfd0da" /></g>
      <ellipse cx={shoulder.x} cy={shoulder.y + 7} rx="14" ry="6" fill="#b6cbd6" stroke="#738897" />
      <path data-arm-link d={armPath} fill="none" stroke="#62798a" strokeWidth="12" />
      <path data-arm-link d={armPath} fill="none" stroke="#f9fcff" strokeWidth="10" />
      {secondary && <path data-paint-hose d={`M${shoulder.x + 12} ${shoulder.y + 22}Q${shoulder.x - 22} ${shoulder.y - 12} ${pose.wrist.x - 10} ${pose.wrist.y + 4}`} fill="none" stroke="#6b9bc4" strokeWidth="2.5" />}
      <circle cx={shoulder.x} cy={shoulder.y} r="8" fill="#c8dce7" stroke="#62798a" />
      <g data-arm-elbow transform={`translate(${pose.joint.x} ${pose.joint.y})`}><circle r="8" fill="#fff" stroke="#62798a" /><circle r="5" fill={secondary ? "#45a99b" : "#548aee"} /></g>
      <g data-arm-gripper transform={`translate(${pose.wrist.x} ${pose.wrist.y})`}>
        <circle r="7" fill="#c8dce7" stroke="#62798a" />
        {secondary ? <>
          <path d="M-17 -18H-3L-5 -3H-15Z" fill="#f5faff" stroke="#7895a8" />
          <path d="M-16 -12H-4L-5 -7H-15Z" fill="#75abe2" stroke="none" />
          <path d="M-18 -19H-2M-10 -3V3" stroke="#7895a8" strokeWidth="2" />
          <path d="M-13 1H4L8 8L2 13H-5L-7 7H-13Z" fill="#a6c2d4" stroke="#607f95" />
          <path d="M-5 8L-8 17H-3L0 11" fill="#7899b0" stroke="#607f95" />
          <path d="M0 12H6L4 18H1Z" fill="#558ab4" stroke="#607f95" />
          <g className={styles.paintSpray} stroke="none">
            <path d="M1 18L-12 31Q3 39 16 31L4 18Z" fill="#69a8e8" opacity=".35" />
            <path d="M2 19L-5 31Q3 35 10 31L3 19Z" fill="#8abcf0" opacity=".35" />
            <g className={styles.paintDroplets} fill="#4d96dc">
              <circle cx="1" cy="20" r=".9" /><circle cx="4" cy="22" r="1" /><circle cx="-3" cy="24" r=".9" />
              <circle cx="7" cy="25" r="1" /><circle cx="2" cy="27" r="1.1" /><circle cx="-7" cy="29" r=".8" /><circle cx="11" cy="29" r=".9" />
            </g>
          </g>
        </> : <>
          <path d="M0 7V13M0 13L-12 19V27L-8 29M0 13L12 19V27L8 29" fill="none" stroke="#62798a" strokeWidth="3" />
          <circle className={styles.contactLight} cy="13" r="2.5" fill="#43ba9f" />
        </>}
      </g>
    </g>
  );
}

function FinishedProduct({ type }: { type: typeof PRODUCT_TYPES[number] }) {
  return (
    <g transform="scale(.58)">
      <Block width={43} depth={27} height={5} color="#eeeaff" side="#aaaac8" />
      {type === "medicine" && <g transform="translate(3 -7) rotate(25)" stroke="#8793aa" strokeWidth=".8">
        <rect x="-19" y="-22" width="38" height="36" rx="5" fill="#f4f8fc" />
        {[-10, 9].flatMap((column) => [-12, 3].map((row) => <g key={`${column}-${row}`} transform={`translate(${column} ${row})`}><rect x="-5" y="-6" width="10" height="13" rx="5" fill="#dbc7ee" /><path d="M-5 0H5" stroke="#b69ccc" /></g>))}
      </g>}
      {type === "car-door" && <g transform="translate(2 -6)" stroke="#647d8c" strokeWidth="1.2">
        <path d="M-22 -36L8 -39L25 -20L23 13L-22 8Z" fill="#91b6ba" />
        <path d="M-17 -32L6 -34L18 -20L-17 -22Z" fill="#d9f2f8" />
        <path d="M-18 -16L20 -13M-17 3L17 7" fill="none" stroke="#b6d1d4" />
        <path d="M10 -9H17" stroke="#4e6b78" strokeWidth="3" />
        <path d="M-23 -19L-29 -21L-29 -14L-23 -12" fill="#657f8e" />
      </g>}
      {type === "box" && <g transform="translate(4 3)"><Block width={30} depth={26} height={30} color="#ecd3ac" side="#c8a77d" /><path d="M0 -28L29 -13L18 -7L-11 -22Z" fill="#fff0cb" /><path d="M-19 -5L-6 1V9L-19 3Z" fill="#fff7e9" /></g>}
      {type === "food-packet" && <g transform="translate(5 0)" stroke="#989872" strokeWidth=".8">
        <path d="M-17 -36H15L12 -26L20 4Q2 15 -20 4L-14 -26Z" fill="#ebdba1" /><path d="M-17 -36H15M-18 4Q2 13 18 4" strokeWidth="3" />
        <path d="M-15 -19Q0 -24 15 -19L18 -1Q0 6 -18 -1Z" fill="#719d81" stroke="none" /><path d="M0 -4V-17M0 -9Q-12 -15 -5 -18Q0 -18 0 -9M0 -7Q13 -13 6 -16Q1 -16 0 -7" fill="#f0e5b6" stroke="#f0e5b6" />
      </g>}
      {type === "bottle-case" && <g transform="translate(3 0)">
        <Block width={39} depth={29} height={14} color="#d4e5e0" side="#89b5a8" />
        {[-12, 1, 14].flatMap((column) => [0, 1].map((row) => <g key={`${column}-${row}`} transform={`translate(${column + row * 11} ${column / 2 + row * 7})`} stroke="#71978f" strokeWidth=".8">
          <path d="M-3 -30V-24Q-6 -22 -6 -19V-8Q0 -4 6 -8V-19Q6 -22 3 -24V-30Z" fill="#a8d6c4" />
          <rect x="-3" y="-33" width="6" height="5" rx="1" fill="#e7b54c" /><path d="M-6 -17H6V-10H-6Z" fill="#fff0c9" stroke="none" />
        </g>))}
        <path d="M-28 -2L10 17L39 2V13L10 28L-28 9Z" fill="#8dbbaa" stroke="#71978f" />
      </g>}
    </g>
  );
}

function Block({ width = 60, depth = 40, height = 40, color = "#fff", side = "#dce8ef" }: {
  width?: number; depth?: number; height?: number; color?: string; side?: string;
}) {
  return (
    <g stroke="#738897" strokeWidth=".85" strokeLinejoin="round">
      <path d={roundedPath([[width, width / 2 - height], [width - depth, (width + depth) / 2 - height], [width - depth, (width + depth) / 2], [width, width / 2]])} fill={side} />
      <path d={roundedPath([[0, -height], [width, width / 2 - height], [width - depth, (width + depth) / 2 - height], [-depth, depth / 2 - height]])} fill={color} />
      <path d={roundedPath([[-depth, depth / 2 - height], [width - depth, (width + depth) / 2 - height], [width - depth, (width + depth) / 2], [-depth, depth / 2]])} fill={side} />
    </g>
  );
}

function InvoicePrinter() {
  return <g data-machine="invoice-printer" stroke="#8199a8" strokeWidth="1" strokeLinejoin="round">
    <Block width={46} depth={30} height={25} color="#f3f8fc" side="#c5d6df" />
    <path d="M-13 -18L22 -1V-27L-13 -44Z" fill="#fff" />
    <path d="M-7 -33L15 -22M-7 -27L10 -18" stroke="#8cadd2" strokeWidth="2" />
    <path d="M-24 3L11 20V13L-24 -4Z" fill="#678493" />
    <path d="M-19 1L7 14L-4 28L-30 15Z" fill="#fff" />
    <path d="M-20 9L-2 18M-23 13L-9 20" stroke="#a7bbcb" />
    <circle cx="31" cy="4" r="2" fill="#49b797" stroke="none" />
  </g>;
}

function CashLocker() {
  return <g stroke="#738897" strokeWidth="1.2" strokeLinejoin="round">
    <Block width={54} depth={36} height={75} color="#eef5f8" side="#c3d6df" />
    <g transform="matrix(1 .5 0 1 -29 -50)">
      <rect width="42" height="54" rx="3" fill="#e5eef3" />
      <path d="M7 9H34" stroke="#5e7b8d" strokeWidth="3" />
      <circle cx="21" cy="32" r="10" fill="#f9fcfe" />
      <circle cx="21" cy="32" r="3" fill="#8aabbb" />
      <path d="M21 25V39M14 32H28M36 26V39M2 8V17M2 39V48" />
      <g className={styles.cashCredit}><path d="M10 -14H32V0H10Z" fill="#d7eee3" stroke="#82ac99" /><text x="21" y="-3" textAnchor="middle" fontSize="10" stroke="none" fill="#447d66">₹</text></g>
    </g>
  </g>;
}

function Hmi({ type = "desktop", mode = "overview" }: { type?: "desktop" | "laptop" | "tablet"; mode?: "overview" | "planning" | "accounting" | "invoicing" }) {
  return (
    <g stroke="#6b8395" strokeWidth="1" strokeLinejoin="round">
      {type === "desktop" && <><path d="M31 4V24L14 34L44 49L64 38L45 29V11Z" fill="#d6e3ed" /><path d="M31 24L45 31" /></>}
      {type === "laptop" && <path d="M-2 2L82 44L53 62Q49 64 44 62L-28 26Q-33 23 -27 19Z" fill="#e5edf4" />}
      <g transform="matrix(1 .5 0 1 0 0)">
        <rect x="-3" y="-73" width="86" height="78" rx={type === "tablet" ? 8 : 5} fill="#cedee9" />
        <rect x="0" y="-76" width="80" height="78" rx={type === "tablet" ? 7 : 5} fill="#f8fcff" />
        <rect x="6" y="-68" width="68" height="59" rx="3" fill="#eaf3ff" stroke="none" />
        <path d="M6 -57H74" stroke="#cbdcf1" />
        <circle cx="12" cy="-63" r="2" fill="#2451f4" stroke="none" />
        <path d="M19 -63H40M13 -48H37M13 -42H29" stroke="#879fb9" strokeWidth="2" />
        <path d="M13 -18V-32H22V-18M28 -18V-38H37V-18M43 -18V-45H52V-18" fill="#83b7f4" stroke="none" />
        <path className={styles.schedule} d="M12 -25L28 -29L41 -23L61 -43" fill="none" stroke="#34b9a4" strokeWidth="2" />
        <circle cx="66" cy="-17" r="3" fill="#43c9ac" stroke="none" />
        <circle cx="40" cy="-3" r="1.5" fill="#91a7b6" stroke="none" />
        {mode === "invoicing" && <g className={styles.approvalNotice}>
          <rect x="8" y="-52" width="64" height="27" rx="4" fill="#e5f8f0" stroke="#8ac8b0" strokeWidth=".7" />
          <circle cx="17" cy="-38" r="5" fill="#45a886" stroke="none" />
          <path d="M14 -38L16 -36L20 -41" fill="none" stroke="#fff" strokeWidth="1" />
          <text x="26" y="-40" fontSize="5.8" fill="#2a6c58" stroke="none">Order confirmed</text>
          <text x="26" y="-31" fontSize="4.8" fill="#67917f" stroke="none">Ready for planning</text>
        </g>}
        {mode === "planning" && <g>
          <rect x="8" y="-55" width="64" height="44" rx="2" fill="#edf4ff" stroke="none" />
          <path d="M12 -44H68M12 -33H68M12 -22H68M26 -51V-15M44 -51V-15M60 -51V-15" stroke="#d6e4f3" />
          {[{ x: 12, y: -48, width: 26 }, { x: 27, y: -37, width: 35 }, { x: 43, y: -26, width: 24 }].map((bar, index) => <rect key={bar.y} {...bar} height="6" rx="2" fill={index === 1 ? "#da48b2" : "#81b7f1"} className={styles.planBar} style={{ animationDelay: `${index * .45}s`, transformOrigin: `${bar.x}px ${bar.y}px` }} />)}
          <path className={styles.planCursor} d="M12 -52V-13" stroke="#d849ae" strokeWidth="1.5" />
        </g>}
        {mode === "accounting" && <g>
          <rect x="8" y="-55" width="64" height="44" rx="2" fill="#f5fbff" stroke="none" />
          <text x="12" y="-43" fontSize="6" fill="#6a8094" stroke="none">CASH CREDIT</text>
          <g className={styles.creditPosted}>
            <text x="12" y="-29" fontSize="10" fontWeight="600" fill="#ad268d" stroke="none">+ ₹18,500</text>
            <path d="M13 -20H44" stroke="#bad1dc" />
            <circle cx="61" cy="-23" r="6" fill="#d6f2e8" stroke="none" /><path d="M58 -23L60 -21L64 -26" fill="none" stroke="#299c7d" />
          </g>
        </g>}
      </g>
      {type === "laptop" && <><path d="M1 10L65 42L51 50L-13 18Z" fill="#bdcedd" stroke="none" /><path d="M17 37L34 45L25 50L8 42Z" fill="#f7fbff" strokeWidth=".6" /></>}
    </g>
  );
}

function LoadingBay() {
  return (
    <g transform="translate(1172 488) scale(.5)" data-machine="loading-bay" stroke="#8496a0" strokeWidth="1">
      <ellipse cx="24" cy="62" rx="78" ry="19" fill="#d7e3e8" opacity=".4" stroke="none" />
      <Block width={91} depth={58} height={20} color="#e5ecee" side="#bacbd2" />
      <path d="M-55 9V-93L25 -53V49Z" fill="#e8eff1" />
      <path d="M-55 -93L-40 -102L40 -62L25 -53Z" fill="#fafcfd" />
      <path d="M25 -53L40 -62V40L25 49Z" fill="#bbcdd5" />
      <path d="M-45 7V-75L15 -45V37Z" fill="#6c8795" />
      <path d="M-44 -74L14 -45V-5L-44 -34Z" fill="#c7d6dc" />
      {[-65, -55, -45].map((height) => <path key={height} d={`M-43 ${height}L13 ${height + 28}`} stroke="#93aab6" />)}
      <path d="M-49 12L-49 -8M20 46V26" stroke="#d9ab60" strokeWidth="6" />
      <path d="M39 22L90 47L112 38L62 13Z" fill="#d8e3e8" />
      <path d="M48 25L82 42M56 21L90 38M64 18L98 35" stroke="#adc0c9" />
      <g transform="translate(-8 19) scale(.68)"><Block width={30} depth={25} height={28} color="#ead9ba" side="#c9b08c" /><path d="M2 -26L29 -12L19 -7L-8 -21Z" fill="#fff0cb" /></g>
      <circle cx="-48" cy="-84" r="3" fill="#68bf9d" stroke="none" />
    </g>
  );
}

function Truck() {
  return (
    <g stroke="#667f91" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx="91" cy="84" rx="112" ry="27" fill="#d3e3ec" opacity=".4" stroke="none" />
      <g transform="translate(2 28)" fill="#adc0ce" stroke="none">
        {[0, 1, 2].map((puff) => <circle key={puff} r="5" className={styles.exhaust} style={{ animationDelay: `${puff * .6}s` }} />)}
      </g>
      <path d="M0 14L101 65L156 94L198 69V82L156 107L0 29Z" fill="#597184" />
      <path d="M0 -59Q0 -64 5 -61L99 -14L142 -39L46 -87Q42 -89 38 -87L3 -67Q0 -65 0 -59Z" fill="#fff" />
      <path d="M0 -59Q0 -63 5 -60L97 -14Q101 -12 101 -7V65L4 17Q0 15 0 11Z" fill="#edf4f9" />
      <path d="M101 -10L142 -34V39L101 65Z" fill="#d3e2ec" />
      <path d="M7 -46L94 -3M7 -36L94 7M7 -26L94 17" stroke="#c6d7e4" />
      <path d="M10 -7L47 11" stroke="#5ccbbb" strokeWidth="4" />
      <path d="M106 6L141 -14Q146 -17 150 -13L178 10L195 41Q199 49 199 58V72L158 96L106 70Z" fill="#d1ad4e" />
      <path d="M106 6L133 20Q139 23 142 30L157 62V95L106 70Z" fill="#aa863b" />
      <path d="M133 20L174 -4L150 -13Q146 -17 141 -14L106 6Z" fill="#eed58c" />
      <path d="M142 31L181 8L193 37L156 59Z" fill="#b9e0ef" />
      <g transform="translate(160 51)"><path className={styles.wiper} d="M0 0L7 -23" stroke="#577386" strokeWidth="2" /></g>
      <g transform="translate(181 39)"><path className={styles.wiper} d="M0 0L4 -23" stroke="#577386" strokeWidth="2" /></g>
      <path d="M113 17L130 26Q134 28 136 33L146 55L113 39Z" fill="#d9f0f7" />
      <path d="M111 48L140 63V78M116 52L123 55" fill="none" stroke="#f5e3ab" />
      <path d="M158 81L199 57V68L158 92Z" fill="#d9e5ef" />
      <path d="M164 65L172 60V66L164 71ZM187 51L194 47V53L187 57Z" fill="#fff6c8" stroke="none" />
      <path d="M175 69L185 63M175 73L185 67" stroke="#567289" />
      <path d="M147 48L152 44L156 50L152 53Z" fill="#3a556c" />
      {[{ x: 25, y: 39 }, { x: 126, y: 89 }].map((wheel) => <g key={wheel.x} transform={`translate(${wheel.x} ${wheel.y})`}><ellipse rx="16" ry="18" fill="#304858" stroke="#edf4f9" strokeWidth="3" /><ellipse rx="8" ry="9" fill="#b7ccd9" stroke="#6b8395" /><g transform="scale(.89 1)"><g className={styles.wheelSpokes}><path d="M-8 0H8M0 -8V8M-6 -6L6 6M-6 6L6 -6" stroke="#577587" strokeWidth="1.4" /></g></g><circle r="2.5" fill="#627f94" stroke="none" /></g>)}
    </g>
  );
}

function Carton({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <Block width={32} depth={26} height={26} color="#f8fcff" side="#ccdde6" />
      <path d="M3 -24L35 -8L22 -1L-10 -17Z" fill="#5ac6bb" stroke="#536779" strokeWidth=".7" />
      <path d="M-18 0L-5 6L-5 12L-18 6Z" fill="white" />
    </g>
  );
}

function Label({ x, y, active, children }: { x: number; y: number; active: boolean; children: string }) {
  return (
    <g data-factory-label transform={`translate(${x} ${y})`} className={styles.label} data-active={active}>
      <circle r="5" className={styles.moduleIndicator} />
      <text x="14" y="4">{children}</text>
    </g>
  );
}


function FilePayload() {
  return (
    <g transform="translate(-12 -25) skewY(15)" stroke="#8398af" strokeWidth=".9">
      <path d="M0 0H19L27 8V36H0Z" fill="#f7faff" />
      <path d="M19 0V8H27" fill="#d8e7fb" />
      <path d="M6 13H21M6 19H21M6 25H16" stroke="#7b9bc9" strokeWidth="1.7" />
      <circle cx="22" cy="32" r="5" fill="#83c8af" stroke="none" />
      <path d="M19 32L21 34L25 29" fill="none" stroke="#fff" />
    </g>
  );
}

function ConveyorItems() {
  return <>{PRODUCT_TYPES.map((type, index) => <g key={type} className={styles.parcel} data-product={type} data-rest-phase={index === 0 ? "file" : index === 1 ? "box" : "finished"} style={{ "--parcel-delay": `${-index * 8.8}s`, offsetPath: `path('${CONVEYOR_PATH}')`, offsetDistance: `${[12, 30, 66, 79, 91][index]}%` } as CSSProperties}>
    <g className={styles.filePayload}><FilePayload /></g>
    <g className={styles.boxPayload}><FinishedProduct type="box" /></g>
    <g className={styles.finishedPayload}><FinishedProduct type={type} /></g>
    <circle data-product-anchor r="1" fill="none" />
  </g>)}</>;
}

function PlanningDesk() {
  return <g transform="translate(110 470) scale(.55)" data-machine="planning">
    <Block width={150} depth={76} height={26} />
    <g transform="translate(-18 -39) scale(.74)"><Hmi mode="planning" /></g>
    <g transform="matrix(1 .5 -1 .5 0 -27)" data-desk-items>
      <g transform="translate(88 24)">
        <rect x="-2" y="-2" width="37" height="29" rx="2" fill="#b7d3dc" stroke="#7894a5" />
        <rect width="32" height="25" rx="1" fill="#fffdf4" stroke="#adbbbf" />
        <path d="M4 1V24M9 7H27M9 12H27M9 17H22" stroke="#a6bac6" strokeWidth=".8" />
      </g>
      <rect x="30" y="61" width="55" height="7" rx="1" fill="#e7cd86" stroke="#b59a55" />
      {[35, 42, 49, 56, 63, 70, 77].map((tick) => <path key={tick} d={`M${tick} 62V66`} stroke="#9c854e" strokeWidth=".7" />)}
      <rect x="105" y="4" width="15" height="13" fill="#f4dc7a" stroke="#d5c16d" />
      <rect x="126" y="21" width="15" height="13" fill="#e7b4ce" stroke="#c896b1" />
    </g>
  </g>;
}

function PlanningWhiteboard() {
  return <g transform="translate(242 501) scale(.55)" data-machine="planning-whiteboard" stroke="#8da4b2" strokeWidth="1" strokeLinejoin="round" strokeLinecap="round">
    <g transform="matrix(1 .5 0 1 0 0)">
      <path d="M-33 -29V8M55 -29V8" stroke="#9bb2bf" strokeWidth="4" />
      <path d="M-48 9H-17M40 9H71" stroke="#9bb2bf" strokeWidth="4" />
      <rect x="-49" y="-112" width="123" height="86" rx="5" fill="#d6e3e9" />
      <rect x="-45" y="-108" width="115" height="76" rx="3" fill="#fffefd" stroke="#b7cbd4" />
      <path d="M-36 -98H6" stroke="#7c9aaf" strokeWidth="2" />
      <rect x="-36" y="-88" width="18" height="12" rx="2" fill="#e8f1fc" stroke="#8eb3df" />
      <rect x="-4" y="-88" width="18" height="12" rx="2" fill="#e3f2ed" stroke="#8bbba9" />
      <path d="M-18 -82H-5M-9 -85L-5 -82L-9 -79M6 -76V-65H-22M-18 -68L-22 -65L-18 -62" fill="none" stroke="#8aa9c0" />
      <path d="M-36 -63V-42H15M-31 -48L-20 -53L-10 -49L0 -60L11 -63" fill="none" stroke="#92b6c7" />
      <path d="M25 -99H59" stroke="#7c9aaf" strokeWidth="2" />
      {[-86, -68, -50].map((height, index) => <g key={height} transform={`translate(27 ${height})`}>
        <rect x="-3" y="-5" width="9" height="9" rx="1.5" fill={index < 2 ? "#e6f4ec" : "#fff"} stroke="#9dbeb1" />
        {index < 2 && <path d="M-1 -1L1 1L5 -3" fill="none" stroke="#5aab8b" strokeWidth="1.7" />}
        <path d="M12 -2H31M12 2H25" stroke="#b4c5ce" />
      </g>)}
      <path d="M-48 -27H73" stroke="#9db5c2" strokeWidth="4" />
      <path d="M-28 -29H-14" stroke="#80a9d6" strokeWidth="3" />
      <path d="M-7 -29H6" stroke="#87b9a3" strokeWidth="3" />
    </g>
  </g>;
}

function ProcurementRack() {
  return <g transform="translate(340 586) scale(.5)" data-machine="procurement-rack">
    {[0, 48, 96].map((level) => <g key={level} transform={`translate(0 ${-level})`}>
      <Block width={84} depth={50} height={6} side="#91acbc" />
      {level > 0 && <><Carton x={-16} y={-8} scale={.72} /><Carton x={20} y={10} scale={.72} /><Carton x={52} y={26} scale={.72} /></>}
    </g>)}
    <path d="M-50 25V-118M34 67V-76M84 42V-101" stroke="#526c7c" strokeWidth="5" />
    <g className={styles.stockArrival}><Carton x={-48} y={37} scale={.9} /></g>
    <g className={styles.stockTransfer}><Carton x={52} y={-23} scale={.72} /></g>
    <g transform="translate(107 11) scale(.62)"><Hmi type="tablet" /></g>
  </g>;
}

function InventoryStation() {
  return <g transform="translate(316 660) scale(.52)" data-machine="inventory" stroke="#81949d" strokeWidth="1" strokeLinejoin="round">
    <Block width={110} depth={74} height={9} color="#e7eff2" side="#b9cdd5" />
    {[{ x: -18, y: -6 }, { x: 40, y: 24 }].map((tank, index) => <g key={tank.x} transform={`translate(${tank.x} ${tank.y})`}>
      <path d="M-18 -10V13M18 -10V13" stroke="#90a8b3" strokeWidth="4" />
      <path d="M-26 -104V-19Q-26 -2 0 -2Q26 -2 26 -19V-104Z" fill="#e4edf1" />
      <path d="M14 -104V-18Q14 -8 5 -3Q26 -3 26 -19V-104Z" fill="#c5d7df" stroke="none" />
      <path d="M-19 -96V-25" stroke="#fff" strokeWidth="3" opacity=".8" />
      <ellipse cy="-104" rx="26" ry="10" fill="#f7fafc" />
      <ellipse cy="-109" rx="9" ry="4" fill="#cedee5" />
      <path d="M-26 -87Q0 -75 26 -87M-26 -28Q0 -16 26 -28" fill="none" stroke="#b3c9d3" />
      <rect x="-7" y="-78" width="14" height="55" rx="5" fill="#f4fbfc" stroke="#9db8c4" />
      <rect x="-4" y="-63" width="8" height="37" rx="3" fill={index === 0 ? "#7ac9ba" : "#8dbce0"} stroke="none" className={styles.inventoryLevel} style={{ animationDelay: `${-index * 3}s` }} />
      <path d="M10 -69H15M10 -57H15M10 -45H15M10 -33H15" stroke="#93adb9" />
      <path d="M0 -3V10L28 24" fill="none" stroke="#8fa9b6" strokeWidth="4" />
      <g transform="translate(15 18)"><circle r="5" fill="#deecea" stroke="#68a491" /><path d="M-4 0H4M0 -4V4" stroke="#68a491" /></g>
    </g>)}
    <g transform="translate(86 -9)">
      <Block width={28} depth={24} height={20} color="#e6f0f3" side="#b8cfd6" />
      <path d="M1 -16V-78" stroke="#90aab7" strokeWidth="6" />
      <g transform="matrix(1 .5 0 1 -13 -116)">
        <rect width="43" height="48" rx="5" fill="#476575" stroke="#6c8999" />
        <rect x="5" y="6" width="33" height="29" rx="2" fill="#def3eb" stroke="none" />
        <path d="M11 14H31M11 20H25M11 26H29" stroke="#79baa5" strokeWidth="2" />
        <circle cx="21" cy="41" r="2" fill="#9ed4c3" stroke="none" />
      </g>
    </g>
  </g>;
}

function QualityGate({ x, y, incoming = false }: { x: number; y: number; incoming?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(.43)`} data-machine={incoming ? "incoming-quality" : "final-quality"}>
    <Block width={24} depth={57} height={146} color={incoming ? "#b6c5e4" : "#91d8ce"} side={incoming ? "#8fa5cb" : "#6bbdb1"} />
    <g transform="translate(95 -56)"><Block width={22} depth={54} height={144} /></g>
    <g transform="translate(0 -146)"><Block width={118} depth={57} height={17} /></g>
    <path d="M-46 -102L9 -75V-23L-46 -50Z" fill="#253b4a" stroke="#738897" />
    <g className={styles.qualityPass}>
      <path d="M-38 -87L1 -67V-39L-38 -59Z" fill="#b7f1e2" />
      <path d="M-30 -68L-22 -56L-8 -65" fill="none" stroke="#258878" strokeWidth="3" />
    </g>
    <g className={styles.qualityFail}>
      <path d="M-38 -87L1 -67V-39L-38 -59Z" fill="#ffd9df" />
      <path d="M-28 -74L-10 -50M-28 -60L-10 -64" fill="none" stroke="#d4476c" strokeWidth="3" />
    </g>
    <path className={styles.scan} d="M27 -117L86 -87L86 13L27 -17Z" fill="#57e4d1" opacity=".2" />
    <circle className={styles.beacon} cx="79" cy="-186" r="5" fill="#3bd1a4" />
  </g>;
}


function QualityLab() {
  return <g transform="translate(1112 646) scale(.53)" data-machine="final-quality" stroke="#7b929d" strokeWidth="1">
    <Block width={140} depth={75} height={32} color="#f3f9fa" side="#cadde2" />
    <g transform="translate(-23 -10)">
      <path d="M-14 -42H15L12 -35V-6Q0 2 -12 -6V-35Z" fill="#ecfaff" fillOpacity=".8" />
      <path d="M-11 -22Q0 -16 11 -22V-7Q0 -1 -11 -7Z" fill="#91d4d8" stroke="none" />
      <ellipse cy="-22" rx="11" ry="4" fill="#bbe9e5" />
      <path d="M-8 -33H-2M-8 -27H-4M-8 -17H-2" stroke="#79a3ae" />
      <circle cy="-14" r="2" className={styles.labBubble} fill="#e6ffff" stroke="none" />
    </g>
    <g transform="translate(24 -10)">
      <path d="M-6 -55H6V-31L22 -6Q24 2 14 4H-14Q-24 2 -22 -6L-6 -31Z" fill="#effbf9" fillOpacity=".85" />
      <path d="M-12 -19H12L19 -5Q20 0 12 1H-12Q-20 0 -19 -5Z" fill="#b7dba7" stroke="none" />
      <path d="M-8 -55H8M-6 -48H6" fill="none" />
      <circle cy="-10" r="2.3" className={styles.labBubble} style={{ animationDelay: "-.8s" }} fill="#f2ffdf" stroke="none" />
    </g>
    <g transform="translate(71 6)">
      <path d="M-8 -52H9L6 -47V-3Q0 2 -6 -3V-47Z" fill="#eef4fe" />
      <path d="M-5 -28H5V-4Q0 0 -5 -4Z" fill="#c2b5e4" stroke="none" />
      <path d="M-3 -42H3M-3 -35H3M-3 -21H3M-3 -14H3" stroke="#9b9cc3" />
      <path d="M-13 3H13" strokeWidth="3" />
    </g>
    <g transform="matrix(1 .5 -1 .5 13 10)" fill="#deedf2">
      <rect x="0" y="0" width="18" height="13" rx="5" /><rect x="24" y="0" width="18" height="13" rx="5" />
      <path d="M18 4H24M0 4L-7 -5M42 4L49 -5" fill="none" strokeWidth="2" />
    </g>
    <g transform="translate(102 24) matrix(1 .5 0 1 0 0)">
      <rect x="-10" y="-30" width="30" height="28" rx="4" fill="#3d586b" />
      <path className={styles.qualityPass} d="M-3 -16L3 -10L13 -22" fill="none" stroke="#8ae0bd" strokeWidth="3" />
      <path className={styles.qualityFail} d="M-2 -23L13 -8M-2 -8L13 -23" fill="none" stroke="#f49eab" strokeWidth="3" />
    </g>
  </g>;
}

function Grinder() {
  return <g transform="translate(540 704) scale(.54)" data-machine="grinder" stroke="#718795" strokeWidth="1">
    <Block width={68} depth={47} height={72} color="#f4f8fa" side="#c8d8e0" />
    <path d="M-34 -109L3 -128L57 -101L20 -82Z" fill="#f8fbfc" />
    <path d="M-34 -109L20 -82L13 -52L-17 -67Z" fill="#c8d8dd" />
    <path d="M20 -82L57 -101L39 -65L13 -52Z" fill="#9eb7c2" />
    <path d="M-22 -108L3 -120L43 -100L19 -88Z" fill="#65818d" />
    <g transform="translate(-8 -29) scale(1 .72)"><g className={styles.grinderRoller}>
      <circle r="16" fill="#8ba6b3" /><path d="M-13 -6L13 6M-13 6L13 -6M0 -15V15" stroke="#dce8ed" strokeWidth="4" />
    </g></g>
    <path d="M41 -17L77 1L66 15L31 -3Z" fill="#d9e5e9" />
    {[0, 1, 2].map((grain) => <circle key={grain} cx={grain * 7 - 3} cy="-111" r="2" fill="#d7b569" className={styles.grinderFeed} style={{ animationDelay: `${grain * .4}s` }} />)}
    <circle className={styles.beacon} cx="46" cy="-40" r="3" fill="#5cbba0" stroke="none" />
  </g>;
}

function PackagingMachine() {
  return <g transform="translate(867 707) scale(.54)" data-machine="packaging" stroke="#718795" strokeWidth="1">
    <Block width={98} depth={47} height={68} color="#f8fbfd" side="#d0dfe7" />
    <path d="M-35 -38L28 -7V27L-35 -5Z" fill="#53788e" />
    <path d="M-28 -29L20 -5V16L-28 -8Z" fill="#b1d2df" />
    <path d="M44 -47L88 -68V-5L44 17Z" fill="#435e70" />
    <path d="M50 -33L82 -49V-5L50 11Z" fill="#bdd8df" />
    <g className={styles.packagingPress}><path d="M49 -32L83 -49V-39L49 -22Z" fill="#e7b858" /></g>
    <g transform="translate(5 -87) scale(1 .55)"><g className={styles.packagingReel}>
      <circle r="22" fill="#d6e6ed" /><circle r="6" fill="#728c9c" /><path d="M0 -19V-8M0 8V19M-19 0H-8M8 0H19" stroke="#91abb9" strokeWidth="3" />
    </g></g>
    <path d="M20 -85L51 -57V-35" fill="none" stroke="#b6dbde" strokeWidth="9" opacity=".7" />
    <path d="M45 18L101 -9L129 5L74 33Z" fill="#dfe9ee" />
    <path d="M60 18L78 27M74 11L92 20M88 4L106 13" stroke="#a0b8c6" />
    <circle className={styles.beacon} cx="-21" cy="-48" r="4" fill="#68c8a6" stroke="none" />
  </g>;
}

function WeldingStation() {
  const stationRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const station = stationRef.current;
    const world = station?.closest<SVGGElement>("[data-factory-world]");
    if (!station || !world) return;
    const products = Array.from(world.querySelectorAll<SVGCircleElement>("[data-product-anchor]"));
    const links = station.querySelectorAll("[data-weld-link]");
    const elbow = station.querySelector<SVGCircleElement>("[data-weld-elbow]")!;
    const nozzle = station.querySelector<SVGPathElement>("[data-weld-nozzle]")!;
    const beams = station.querySelectorAll("[data-weld-beam]");
    const contact = station.querySelector<SVGGElement>("[data-weld-contact]")!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wrist = { x: 30, y: -35 };
    let frame = 0;
    let lastUpdate = 0;
    const update = (now: number) => {
      frame = requestAnimationFrame(update);
      if (now - lastUpdate < 32 || world.closest('[data-offscreen="true"]')) return;
      lastUpdate = now;
      station.dataset.welding = "false";
      if (motion.matches || !station.getClientRects().length) return;
      const worldMatrix = world.getScreenCTM();
      const stationMatrix = station.getScreenCTM();
      if (!worldMatrix || !stationMatrix) return;
      const inverseWorld = worldMatrix.inverse();
      const target = products.map(product => {
        const bounds = product.getBoundingClientRect();
        return new DOMPoint(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2).matrixTransform(inverseWorld);
      }).find(point => point.x >= 678 && point.x <= 736 && point.y > 740 && point.y < 760);
      const contactPoint = target
        ? new DOMPoint(target.x + 3.5, target.y - 8).matrixTransform(worldMatrix).matrixTransform(stationMatrix.inverse())
        : null;
      const desired = contactPoint ? { x: contactPoint.x, y: contactPoint.y - 50 } : { x: 30, y: -35 };
      wrist.x += (desired.x - wrist.x) * .42;
      wrist.y += (desired.y - wrist.y) * .42;
      const joint = { x: (wrist.x - 9) / 2 + 34, y: (wrist.y - 102) / 2 - 12 };
      const path = `M-25 -27L-38 -65L-9 -102L${joint.x} ${joint.y}L${wrist.x} ${wrist.y}`;
      links.forEach(link => link.setAttribute("d", path));
      elbow.setAttribute("cx", String(joint.x));
      elbow.setAttribute("cy", String(joint.y));
      nozzle.setAttribute("d", `M${wrist.x} ${wrist.y}v10`);
      if (!contactPoint) return;
      beams.forEach(beam => beam.setAttribute("d", `M${wrist.x} ${wrist.y + 10}L${contactPoint.x} ${contactPoint.y}`));
      contact.setAttribute("transform", `translate(${contactPoint.x} ${contactPoint.y})`);
      station.dataset.welding = String(Math.hypot(desired.x - wrist.x, desired.y - wrist.y) < 5);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <g ref={stationRef} transform="translate(701 697) scale(.55)" data-machine="welding" data-welding="false" stroke="#738897" strokeWidth="1.2">
    <title>Robotic welding station</title>
    <ellipse cx="20" cy="37" rx="68" ry="18" fill="#d8e5ee" opacity=".35" stroke="none" />
    <path d="M-38 -6V25M75 -1V29M25 22V48" fill="none" stroke="#93acba" strokeWidth="5" />
    <path d="M-45 -12L15 -42L85 -7V1L25 31L-45 -4Z" fill="#bdcfd9" />
    <path d="M-45 -12L15 -42L85 -7L25 23Z" fill="#edf5f8" />
    <path d="M25 23V31M-28 -4L-18 1M-9 6L1 11M10 15L19 20" fill="none" />
    <ellipse cx="-25" cy="-22" rx="14" ry="7" fill="#adc7d4" />
    <path data-weld-link d="M-25 -27L-38 -65L-9 -102L39 -67L30 -35" fill="none" stroke="#647d8f" strokeWidth="13" />
    <path data-weld-link d="M-25 -27L-38 -65L-9 -102L39 -67L30 -35" fill="none" stroke="#edf5f9" strokeWidth="9" />
    <circle cx="-38" cy="-65" r="7" fill="#c2d9e5" />
    <circle cx="-9" cy="-102" r="8" fill="#f7fbfe" />
    <circle cx="-9" cy="-102" r="4" fill="#548aee" stroke="none" />
    <circle data-weld-elbow cx="39" cy="-67" r="6" fill="#c2d9e5" />
    <path d="M-21 -27Q-56 -52 -45 -73Q-28 -119 -5 -112" fill="none" stroke="#8ea5b3" strokeWidth="2" />
    <path data-weld-nozzle d="M30 -35v10" stroke="#4c697b" strokeWidth="5" />
    <g className={styles.weldLaser} fill="none">
      <path data-weld-beam stroke="#ff3b4f" strokeWidth="7" opacity=".18" />
      <path data-weld-beam stroke="#ed2841" strokeWidth="2" />
      <g data-weld-contact stroke="none">
        <circle r="11" fill="#ff3b4f" opacity=".16" />
        <circle r="5" fill="#ff5363" opacity=".65" />
        <circle r="2.5" fill="#ffd9dc" />
        <path d="M-5 -3L-10 -7M5 -3L10 -8M-5 3L-11 6M5 3L10 8" fill="none" stroke="#ef4655" strokeWidth="1.5" />
      </g>
    </g>
  </g>;
}

function ProductionLine() {
  return <g data-machine="production">
    <WeldingStation />
    <Grinder />
    <g transform="translate(700 798) scale(.58)" data-machine="mixer"><Mixer /></g>
    <PackagingMachine />
    <RobotArm />
    <RobotArm secondary />
    <g transform="translate(746 730) scale(.38)"><Hmi type="tablet" /></g>
  </g>;
}


function LinearMonitor({ planning = false, accounting = false }: { planning?: boolean; accounting?: boolean }) {
  return <g>
    <rect x="-49" y="-109" width="98" height="66" rx="7" fill="#edf4f9" />
    <rect x="-43" y="-103" width="86" height="54" rx="3" fill="#fff" stroke="#cadce8" />
    {planning ? <g>
      <path d="M-34 -90H34M-34 -78H34M-34 -66H34M-12 -97V-56M12 -97V-56" stroke="#e3ebf4" />
      {[-92, -80, -68].map((height, index) => <rect key={height} x={-32 + index * 12} y={height} width="38" height="6" rx="3" fill={index === 1 ? "#94d4c2" : "#91b9ee"} stroke="none" className={styles.planBar} style={{ transformOrigin: `${-32 + index * 12}px ${height}px`, animationDelay: `${index * .4}s` }} />)}
    </g> : accounting ? <g className={styles.creditPosted} stroke="none">
      <text x="-33" y="-85" fontSize="8" fill="#698594">CREDIT RECEIVED</text>
      <text x="-33" y="-66" fontSize="14" fill="#299a7e">+ ₹18,500</text>
    </g> : <g className={styles.approvalNotice}>
      <rect x="-38" y="-94" width="76" height="33" rx="5" fill="#e5f5ed" stroke="#b8dfce" />
      <circle cx="-26" cy="-78" r="6" fill="#5ab99a" stroke="none" />
      <path d="M-29 -78L-27 -76L-23 -81" fill="none" stroke="#fff" />
      <text x="-15" y="-80" fontSize="6" fill="#357e68" stroke="none">Order confirmed</text>
      <text x="-15" y="-70" fontSize="5" fill="#6d9486" stroke="none">Ready for planning</text>
    </g>}
    <path d="M-8 -43V-29H8V-43M-20 -28H20" fill="#d3e1e9" />
    <rect x="-67" y="-23" width="134" height="8" rx="3" fill="#dce9ef" />
    <path d="M-55 -15V0M55 -15V0" strokeWidth="4" />
    {planning && <g>
      <rect x="27" y="-30" width="26" height="6" rx="1" fill="#f1d77a" />
      <path d="M30 -30V-26M36 -30V-26M42 -30V-26M48 -30V-26" stroke="#b09c59" />
      <rect x="-60" y="-30" width="25" height="6" rx="1" fill="#c5ddd9" />
      <rect x="31" y="-104" width="9" height="10" fill="#f2d881" stroke="none" />
    </g>}
  </g>;
}

function LinearQuality({ lab = false }: { lab?: boolean }) {
  return <g>
    {lab ? <>
      <rect x="-65" y="-21" width="130" height="8" rx="3" fill="#dce9ef" />
      <path d="M-53 -13V0M53 -13V0" strokeWidth="4" />
      <path d="M-44 -72H-17L-20 -66V-28Q-31 -21 -42 -28V-66Z" fill="#eefaff" />
      <path d="M-41 -48H-21V-29Q-31 -23 -41 -29Z" fill="#98d8d2" stroke="none" />
      <path d="M0 -85H16M3 -85V-59L-9 -33Q-11 -24 -3 -24H20Q28 -24 26 -33L13 -59V-85" fill="#f1fbff" />
      <path d="M-2 -45H19L25 -31Q26 -26 20 -26H-3Q-8 -26 -6 -32Z" fill="#b7adf0" stroke="none" />
      <path d="M39 -65H53V-26H39ZM35 -24H57" fill="#eaf8ff" />
      <path d="M42 -46H50V-28H42Z" fill="#f0d77b" stroke="none" />
      <circle cx="-32" cy="-34" r="2" fill="#fff" className={styles.labBubble} stroke="none" />
      <circle cx="8" cy="-33" r="2" fill="#fff" className={styles.labBubble} stroke="none" style={{ animationDelay: "-1s" }} />
    </> : <>
      <rect x="-56" y="-113" width="112" height="20" rx="5" fill="#e7eef8" />
      <rect x="-56" y="-96" width="19" height="96" rx="3" fill="#aec1df" />
      <rect x="37" y="-96" width="19" height="96" rx="3" fill="#dae5f1" />
      <path d="M-33 -83H33V-4H-33Z" fill="#b6f1e4" opacity=".22" stroke="none" />
      <path d="M-33 -77H33" stroke="#5ccab1" className={styles.scan} />
      <rect x="-17" y="-37" width="34" height="32" rx="3" fill="#ead6b2" />
      <path d="M-3 -36V-22H4V-36" fill="#fff1d6" />
    </>}
    <g transform={`translate(${lab ? 50 : 0} ${lab ? -100 : -104})`}>
      <g className={styles.qualityPass}><circle r="9" fill="#ddf4e9" stroke="#80bfa9" /><path d="M-4 0L-1 3L5 -4" fill="none" stroke="#3b9a7d" strokeWidth="2" /></g>
      <g className={styles.qualityFail}><circle r="9" fill="#fbe3e7" stroke="#d795a3" /><path d="M-3 -3L3 3M3 -3L-3 3" stroke="#c4647a" strokeWidth="2" /></g>
    </g>
  </g>;
}

function LinearProduction() {
  return <g>
    <g transform="translate(-137 0)">
      <rect x="-24" y="-62" width="48" height="62" rx="5" fill="#dfeaf0" />
      <path d="M-34 -103H34L18 -64H-18Z" fill="#f2f7fa" />
      <g transform="translate(0 -41)"><g className={styles.grinderRoller}><circle r="14" fill="#bdd3dc" /><path d="M-10 0H10M0 -10V10" /></g></g>
    </g>
    {[-76, 75].map((position, index) => <g key={position} transform={`translate(${position} 0)`}>
      <rect x="-15" y="-18" width="30" height="18" rx="4" fill="#c4dadf" />
      <g className={styles.linearArm} style={{ animationDelay: `${index * -2}s` }}>
        <path d="M0 -19L-12 -51L17 -78L34 -53" fill="none" stroke="#eef4f7" strokeWidth="12" />
        <path d="M0 -19L-12 -51L17 -78L34 -53" fill="none" strokeWidth="1.2" />
        <circle cx="-12" cy="-51" r="6" fill="#8bbcac" /><circle cx="17" cy="-78" r="5" fill="#a6c4d4" />
        <path d="M29 -53V-43M39 -53V-43" fill="none" strokeWidth="2" />
      </g>
    </g>)}
    <g>
      <path d="M-24 -19V0M24 -19V0" strokeWidth="4" />
      <rect x="-29" y="-96" width="58" height="77" rx="12" fill="#f0f9fa" />
      <path d="M-27 -65Q0 -58 27 -65V-31Q27 -21 17 -21H-17Q-27 -21 -27 -31Z" fill="#f0d361" stroke="none" />
      <path d="M0 -110V-30" stroke="#7c939e" strokeWidth="3" />
      <rect x="-13" y="-118" width="26" height="15" rx="4" fill="#bdd2df" />
      <g transform="translate(0 -48)"><g className={styles.mixerBlades}><ellipse rx="21" ry="5" fill="#fff1a9" /><ellipse rx="5" ry="16" fill="#ffe78b" /></g></g>
    </g>
    <g transform="translate(145 0)">
      <rect x="-33" y="-76" width="66" height="76" rx="5" fill="#d3e9e4" />
      <rect x="-24" y="-58" width="48" height="47" rx="3" fill="#f6fbfa" />
      <g className={styles.packagingPress}><path d="M-16 -54H16V-42H-16Z" fill="#97c3b7" /></g>
      <g transform="translate(0 -98)"><g className={styles.packagingReel}><circle r="18" fill="#eaf3f6" /><circle r="5" fill="#b4cbd5" /><path d="M-12 0H12M0 -12V12" /></g></g>
      <rect x="-13" y="-24" width="26" height="20" rx="3" fill="#cab9e9" />
    </g>
  </g>;
}

function LinearFactory({ activeStep }: { activeStep: number }) {
  const centers = [100, 300, 500, 800, 1200, 1500, 1700];
  return <div className={styles.linearFactory}>
    <div className={styles.linearBelt} aria-hidden="true" />
    <div className={styles.linearViewport} tabIndex={0} role="region" aria-label="Manufacturing stages: horizontally scrollable when motion is reduced">
      <svg className={styles.linearModules} viewBox="0 0 1800 230" width="1800" height="230" role="img" aria-label="Invoicing, planning, procurement, production, quality lab, quality checkpoint, dispatch and settlements move past a stationary straight conveyor" stroke="#8199a8" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round">
        <g id="linear-factory-modules">
          <g transform="translate(100 148)"><LinearMonitor /></g>
          <g transform="translate(161 132) scale(.75)"><InvoicePrinter /></g>
          <g transform="translate(300 148)"><LinearMonitor planning /></g>
          <g transform="translate(500 148)">
            <path d="M-57 -119V0M57 -119V0M-57 -82H57M-57 -42H57M-57 -2H57" fill="none" strokeWidth="4" />
            {[-80, -40, 0].map((height, index) => <g key={height} transform={`translate(0 ${height})`}>
              <rect x="-50" y="-30" width="40" height="27" rx="2" fill="#e9d8b9" /><path d="M-32 -30V-19H-25V-30" fill="#fff0d4" />
              <g className={index === 1 ? styles.stockArrival : undefined}><rect x="9" y="-30" width="40" height="27" rx="2" fill="#ddc8a4" /><path d="M26 -30V-19H33V-30" fill="#f9e8c6" /></g>
            </g>)}
          </g>
          <g transform="translate(800 148)"><LinearProduction /></g>
          <g transform="translate(1100 148)"><LinearQuality lab /></g>
          <g transform="translate(1300 148)"><LinearQuality /></g>
          <g transform="translate(1500 148)">
            <rect x="-72" y="-91" width="95" height="72" rx="6" fill="#edf3f7" />
            <path d="M23 -66H50Q56 -66 61 -56L77 -32V-15H23Z" fill="#d6b463" />
            <path d="M32 -59H49L64 -36H32Z" fill="#d6edf4" />
            <g transform="translate(58 -40)"><path d="M0 0L-8 -15" className={styles.wiper} strokeWidth="2" /></g>
            <path d="M-77 -18H81" strokeWidth="6" /><path d="M-59 -64H9M-59 -51H9" stroke="#cbd9e2" />
            {[-46, 49].map((position) => <g key={position} transform={`translate(${position} -13)`}><circle r="13" fill="#3e5564" /><g className={styles.wheelSpokes}><circle r="7" fill="#c2d3dd" /><path d="M-6 0H6M0 -6V6" /></g></g>)}
            <g transform="translate(-78 -18)"><circle r="4" className={styles.exhaust} fill="#b4c6cd" stroke="none" /></g>
          </g>
          <g transform="translate(1668 148)"><LinearMonitor accounting /></g>
          <g transform="translate(1771 134) scale(.8)"><CashLocker /></g>
          {centers.map((center, index) => <g key={center}>
            <path d={`M${center} 169V179`} stroke="#c5d8e3" />
            <Label x={center - MODULE_NAMES[index].length * 3.7} y={196} active={activeStep === index}>{MODULE_NAMES[index]}</Label>
          </g>)}
        </g>
        <use href="#linear-factory-modules" x="1800" className={styles.linearRepeat} aria-hidden="true" />
      </svg>
    </div>
    <div className={styles.linearNucleus} aria-hidden="true"><span />Intelligence Layer</div>
  </div>;
}

export function HeroEventFlow() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.illustration}>
      <span className={styles.cycleClock} aria-hidden onAnimationIteration={() => setActiveStep((step) => (step + 1) % MODULE_NAMES.length)} />
      <svg data-factory-scene className={styles.scene} viewBox="0 190 1440 720" role="img" aria-labelledby="factory-title factory-description" strokeLinejoin="round" strokeLinecap="round">
        <title id="factory-title">{MODULE_NAMES.join(" → ")}</title>
        <desc id="factory-description">Invoicing, planning, procurement, production, quality, dispatch and settlements surround five connected layers: Compliance Engine, Task Manager, Intelligence Layer, Backend Service and AI Agents. Paper planes carry messages between departments. The Compliance Engine enforces controls. Task Manager routes work, owners, deadlines and conversations. The Intelligence Layer uses RAG across SO to GDR, quality events, EBR and IPQC records to triage, analyse and deliver insights. Intelligence supports human decisions; it does not bypass approvals.</desc>
        <defs>
          <pattern id="factory-rollers" width="17" height="17" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 0V17" stroke="#879eaf" strokeWidth="1" /></pattern>
        </defs>
        <BackendLayers activeStep={activeStep} />
        <g id="factory-world" data-factory-world>
        <g fill="none" strokeLinejoin="round" strokeLinecap="round">
          <path d={CONVEYOR_PATH} stroke="#fff" strokeWidth="37" transform="translate(0 10)" />
          <path d={CONVEYOR_PATH} stroke="#b8cad5" strokeWidth="29" />
          <path d={CONVEYOR_PATH} stroke="url(#factory-rollers)" strokeWidth="26" />
          <path className={styles.belt} d={CONVEYOR_PATH} stroke="#f4fcff" strokeWidth="2" strokeDasharray="2 18" />
        </g>
        <ConveyorItems />
        <g transform="translate(163 274) scale(.56)" data-machine="invoicing">
          <Block width={110} depth={65} height={19} />
          <g transform="translate(-22 -44)"><Hmi type="laptop" mode="invoicing" /></g>
          <g transform="translate(62 5) scale(.8)"><InvoicePrinter /></g>
        </g>
        <Label x={78} y={354} active={activeStep === 0}>Invoicing</Label>
        <PlanningDesk />
        <PlanningWhiteboard />
        <Label x={83} y={558} active={activeStep === 1}>Planning</Label>
        <g data-machine="procurement">
          <ProcurementRack />
          <InventoryStation />
        </g>
        <Label x={269} y={747} active={activeStep === 2}>Procurement</Label>
        <ProductionLine />
        <Label x={677} y={850} active={activeStep === 3}>Production</Label>
        <g data-machine="quality">
          <QualityLab />
          <QualityGate x={1045} y={630} incoming />
        </g>
        <Label x={1120} y={731} active={activeStep === 4}>Quality</Label>
        <LoadingBay />
        <g transform="translate(1240 496) scale(.59)" data-machine="truck"><Truck /></g>
        <Label x={1280} y={595} active={activeStep === 5}>Dispatch</Label>
        <g transform="translate(1248 274) scale(.56)" data-machine="settlements">
          <Block width={140} depth={80} height={18} />
          <g transform="translate(-40 -40) scale(.85)"><Hmi type="desktop" mode="accounting" /></g>
          <g transform="translate(95 4)"><CashLocker /></g>
        </g>
        <Label x={1301} y={354} active={activeStep === 6}>Settlements</Label>
        <DepartmentMail />
        </g>
      </svg>
      <LinearFactory activeStep={activeStep} />
    </div>
  );
}
