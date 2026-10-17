"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Ban, Building2, Check, CheckCheck, Cloud, Database, FileCheck2, Fingerprint, Globe2, KeyRound, Laptop, LockKeyhole, MapPin, Server, ShieldCheck, Smartphone, Wifi } from "lucide-react";
import { TRUST_LAYERS } from "./security-trust-data";
import { useVisualCycle } from "./use-visual-cycle";
import styles from "./security-trust-assets.module.css";

const AUTOMATIC = { pauseOnHover: false, pauseOnFocus: "never" as const };

const PEOPLE = [
  { name: "Priya Raman", employee: "EMP-1042", designation: "QA reviewer", location: "Hosur · Quality lab", ip: "192.0.2.24", device: "New laptop", browser: "Chrome · Windows 11", requested: "09:41 IST" },
  { name: "Arjun Sharma", employee: "EMP-1086", designation: "Production supervisor", location: "Bengaluru · Head office", ip: "198.51.100.42", device: "Shop-floor tablet", browser: "Safari · iPadOS", requested: "09:43 IST" },
];

function Avatar({ person, small = false }: { person: number; small?: boolean }) {
  return <svg className={styles.avatar} data-small={small} viewBox="0 0 48 48" aria-hidden="true">
    <rect width="48" height="48" rx="24" fill={person === 0 ? "#e8e4ff" : "#dcf3ed"} />
    {person === 0 && <path d="M12 37V18C12 3 36 3 36 18V38Z" fill="#33344b" />}
    <path d="M5 48C6 34 16 32 24 32S42 34 43 48" fill={person === 0 ? "#7772c5" : "#278573"} />
    <path d="M20 28H28V35Q24 40 20 35Z" fill="#b97853" />
    <ellipse cx="24" cy="21" rx="9" ry="12" fill={person === 0 ? "#e5ad88" : "#c48c66"} />
    <path d={person === 0 ? "M14 21V16Q16 7 25 9Q36 9 34 22L30 17Q22 19 19 13L16 21Z" : "M14 20V14Q15 7 25 8L34 12L35 21L30 16Q23 19 17 16L16 22Z"} fill="#33344b" />
    <path d="M20 22H21M27 22H28" stroke="#44362d" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 27Q24 29 27 27" stroke="#955d48" strokeWidth="1.1" fill="none" strokeLinecap="round" />
  </svg>;
}

function AssetFrame({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  const element = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (element.current) observer.observe(element.current);
    const updateVisibility = () => setTabVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", updateVisibility); };
  }, []);

  return <div ref={element} className={[styles.asset, className].filter(Boolean).join(" ")} data-native-asset data-animated={visible && tabVisible} role="group" aria-label={label}>{children}</div>;
}

function Progress({ count, active }: { count: number; active: number }) {
  return <div className={styles.progress} aria-hidden="true">{Array.from({ length: count }, (_, index) => <span key={index} data-active={active === index} />)}</div>;
}

export function SecurityLayerStack() {
  const { active, regionRef } = useVisualCycle(TRUST_LAYERS.length, 2400, AUTOMATIC);
  return <AssetFrame className={styles.layerFrame} label="Automatic demonstration of five layers of request protection"><div ref={regionRef}>
    <div className={styles.eyebrow}><span><ShieldCheck size={14} />Request protection</span><small>Internet → encrypted storage</small></div>
    <ol className={styles.layerStack}>{TRUST_LAYERS.map(({ name, icon: Icon, controls }, index) => <li key={name} className={styles.layer} data-active={active === index}>
      <span className={styles.layerIcon}><Icon size={21} aria-hidden="true" /></span>
      <span className={styles.layerName}><small>0{index + 1}</small><strong>{name}</strong></span>
      <span className={styles.layerTags}>{controls.map(control => <span key={control}>{control}</span>)}</span>
      <Check size={15} className={styles.layerCheck} aria-hidden="true" />
    </li>)}</ol>
    <Progress count={5} active={active} />
  </div></AssetFrame>;
}

export function FoundationAuditAsset() {
  return <AssetFrame className={styles.miniLog} label="Example audit log with authors and recorded changes">
    <header><strong><FileCheck2 size={13} />Audit log</strong><span>Append-only</span></header>
    <table><thead><tr><th>Time / author</th><th>Recorded change</th></tr></thead><tbody>
      <tr><td><time>09:41</time>Priya R.</td><td><strong>B-2281 · Yield</strong><span>96.2% <ArrowRight size={10} />96.8%</span></td></tr>
      <tr><td><time>09:43</time>Arjun S.</td><td><strong>PO-0016 · Status</strong><span>Draft <ArrowRight size={10} />Submitted</span></td></tr>
      <tr><td><time>09:45</time>Priya R.</td><td><strong>SOP-014 · Revision</strong><span>03 <ArrowRight size={10} />04</span></td></tr>
    </tbody></table><footer><LockKeyhole size={11} />History retained · hashes linked</footer>
  </AssetFrame>;
}

export function FoundationAccessAsset() {
  return <AssetFrame className={styles.miniAccess} label="Example separation between recording and approving roles">
    <header><strong><ShieldCheck size={14} />Role boundary</strong><span>Enforced</span></header>
    {PEOPLE.map((person, index) => <div className={styles.miniPermission} key={person.employee}><Avatar person={index} small /><div><strong>{person.designation}</strong><span>{index === 0 ? "Review + approve" : "Record + submit"}</span></div><span className={styles.permissionStatus}>{index === 0 ? "Sign" : "Edit"}</span></div>)}
    <footer><LockKeyhole size={12} /><span>Recorder <b>≠</b> approver</span></footer>
  </AssetFrame>;
}

export function FoundationDataAsset() {
  return <AssetFrame className={styles.miniVault} label="Records, files and backups protected with a tenant-specific key">
    <div className={styles.vaultKey}><KeyRound size={17} /><span>Your tenant key</span><Fingerprint size={20} /></div>
    <div className={styles.vaultLine} />
    <div className={styles.vaultStores}>{[{ name: "Records", icon: Database }, { name: "Files", icon: FileCheck2 }, { name: "Backups", icon: Server }].map(({ name, icon: Icon }) => <div key={name}><span><Icon size={24} /><LockKeyhole size={11} /></span><strong>{name}</strong></div>)}</div>
    <footer>Encrypted · separated from other tenants</footer>
  </AssetFrame>;
}

export function DatabaseEncryptionAsset() {
  const { active, regionRef } = useVisualCycle(3, 2600, AUTOMATIC);
  return <AssetFrame className={styles.databaseFrame} label="Animated database encryption layers: tenant isolation, AES-256 encryption and a tenant-specific key"><div ref={regionRef}>
    <div className={styles.eyebrow}><span><ShieldCheck size={15} />Your tenant</span><small>Encryption layers</small></div>
    <div className={styles.databaseBoundary}>
      <span className={styles.boundaryLabel}><i>01</i>Tenant isolation</span>
      <div className={styles.encryptedLayer}>
        <span className={styles.boundaryLabel}><i>02</i>AES-256 encryption</span>
        <div className={styles.databaseCore}><div className={styles.cylinder} aria-hidden="true"><span /><span /><span /><LockKeyhole size={25} /></div><div><strong>Encrypted database</strong><code key={active}>{["a7f2 9c41 e8b0 3d65", "4e19 b8c2 7a60 f3d1", "d204 6f9a c1e8 05b7"][active]}</code><small>Unreadable without your key</small></div></div>
      </div>
    </div>
    <div className={styles.keyConnection} aria-hidden="true"><i /><i /><i /></div>
    <div className={styles.tenantKey}><span><KeyRound size={23} /></span><div><small>03 · Tenant-specific key</small><strong>A key used only for your company</strong></div><Fingerprint size={29} /></div>
    <div className={styles.encryptionTargets}>{["Database", "Files", "Backups"].map((target, index) => <span key={target} data-active={active === index}><LockKeyhole size={12} />{target}</span>)}</div>
  </div></AssetFrame>;
}

export function RequestProtectionAsset() {
  const { active, regionRef } = useVisualCycle(TRUST_LAYERS.length, 2200, AUTOMATIC);
  return <AssetFrame label="Request path from edge to encrypted storage"><div ref={regionRef} className={styles.requestPath}>{TRUST_LAYERS.map(({ name, icon: Icon, description, controls }, index) => <article key={name} data-active={active === index}>
    <header><span className={styles.pathNode}><Icon size={22} aria-hidden="true" /></span><span>0{index + 1}</span>{index < TRUST_LAYERS.length - 1 && <ArrowRight size={15} aria-hidden="true" />}</header>
    <h3>{name}</h3><p>{description}</p>
    <ul className={styles.controlRows}>{controls.map((control, controlIndex) => <li key={control}><span>0{controlIndex + 1}</span><strong>{control}</strong><i aria-hidden="true" /></li>)}</ul>
    <footer><span />{active === index ? "Checking request" : "Control layer"}</footer>
  </article>)}</div></AssetFrame>;
}

export function ClientApprovalAsset() {
  const { active, regionRef } = useVisualCycle(8, 1600, AUTOMATIC);
  const personIndex = Math.floor(active / 4);
  const stage = active % 4;
  const person = PEOPLE[personIndex];
  const Device = personIndex === 0 ? Laptop : Smartphone;
  return <AssetFrame className={styles.clientFrame} label="Two illustrative client approval requests, automatically alternating"><div ref={regionRef}>
    <div className={styles.eyebrow}><span><Laptop size={14} />New clients</span><small>Request {personIndex + 1} / 2</small></div>
    <div className={styles.approvalRequest} key={person.employee}>
      <div className={styles.requestPerson}><Avatar person={personIndex} /><div><strong>{person.name}</strong><span>{person.designation}</span><small>{person.employee}</small></div><span className={styles.statusBadge} data-approved={stage === 3}>{stage === 3 ? <Check size={11} /> : <ClockFace />}{stage === 3 ? "Approved" : "Pending"}</span></div>
      <div className={styles.deviceDetail}><Device size={24} /><div><strong>{person.device}</strong><span>{person.browser}</span></div><small>{person.requested}</small></div>
      <dl className={styles.requestDetails}><div><dt><MapPin size={12} />Location</dt><dd>{person.location}</dd></div><div><dt><Wifi size={12} />IP address</dt><dd><code>{person.ip}</code></dd></div></dl>
      <div className={styles.requestChecks}>{["Identity verified", "Network permitted"].map((check, index) => <span key={check} data-complete={stage > index}><Check size={12} />{check}</span>)}</div>
    </div>
    <div className={styles.approvalDecision} data-approved={stage === 3}><span>{stage === 3 ? <CheckCheck size={18} /> : <ShieldCheck size={18} />}</span><div><strong>{stage < 2 ? "Checking the request" : stage === 2 ? "Waiting for administrator" : "Approved by Meera Krishnan"}</strong><small>{stage === 3 ? "Approval recorded · client access granted" : "No access until an administrator approves"}</small></div></div>
    <Progress count={4} active={stage} />
  </div></AssetFrame>;
}

function ClockFace() {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" aria-hidden="true"><circle cx="6" cy="6" r="4.5" /><path d="M6 3V6L8 7" /></svg>;
}

const NETWORKS = [
  { name: "Plant network", location: "Hosur", ip: "192.0.2.24", range: "192.0.2.0/24", allowed: true },
  { name: "Head office", location: "Bengaluru", ip: "198.51.100.42", range: "198.51.100.0/24", allowed: true },
  { name: "Unknown network", location: "Outside the approved boundary", ip: "203.0.113.18", range: "No matching network policy", allowed: false },
];

export function NetworkBoundaryAsset() {
  const { active, regionRef } = useVisualCycle(3, 3400, AUTOMATIC);
  const network = NETWORKS[active];
  return <AssetFrame className={styles.networkFrame} label="Animated network policy allowing two approved sites and refusing an unknown network"><div ref={regionRef}>
    <div className={styles.eyebrow}><span><Globe2 size={14} />Network policy</span><small>2 approved sites</small></div>
    <div className={styles.networkMap} data-network={active}>
      <svg viewBox="0 0 500 270" fill="none" aria-hidden="true">
        <path d="M0 45H500M0 90H500M0 135H500M0 180H500M0 225H500M50 0V270M100 0V270M150 0V270M200 0V270M250 0V270M300 0V270M350 0V270M400 0V270M450 0V270" className={styles.mapGrid} />
        <path d="M-20 199Q78 178 93 112T212 46T355 75T520 15M-20 228Q85 207 115 129T233 77T368 109T520 44" className={styles.mapContour} />
        <rect x="30" y="28" width="296" height="208" rx="38" className={styles.zoneOutline} />
        <path d="M115 82C185 82 175 135 260 135" className={styles.networkRoute} data-active={active === 0} />
        <path d="M115 190C180 190 180 135 260 135" className={styles.networkRoute} data-active={active === 1} />
        <path d="M421 135H345" className={styles.refusedRoute} data-active={active === 2} />
        <circle cx="345" cy="135" r="10" className={styles.stopNode} /><path d="M341 131L349 139M349 131L341 139" stroke="#f79291" strokeWidth="1.5" />
      </svg>
      <span className={styles.zoneLabel}>Approved boundary</span>
      <div className={styles.plantPin} data-active={active === 0}><span><Building2 size={21} /></span><strong>Plant</strong><small>Hosur</small></div>
      <div className={styles.officePin} data-active={active === 1}><span><Building2 size={21} /></span><strong>Head office</strong><small>Bengaluru</small></div>
      <div className={styles.gateway}><span><ShieldCheck size={27} /></span><strong>Factro</strong></div>
      <div className={styles.deniedPin} data-active={active === 2}><span><Globe2 size={21} /></span><strong>Unknown</strong><small>Untrusted network</small></div>
    </div>
    <div className={styles.networkEvent} key={active} data-allowed={network.allowed}><div><strong>{network.name}</strong><small>{network.location}</small></div><span>{network.allowed ? <Check size={12} /> : <Ban size={12} />}{network.allowed ? "Permitted" : "Refused"}</span><code>{network.ip}</code><small>{network.range}</small></div>
    <p className={styles.networkNote}><LockKeyhole size={12} />A valid password does not override your network policy.</p>
  </div></AssetFrame>;
}

const AUDIT_ENTRIES = [
  { id: "1041", person: 1, time: "09:41:12", record: "PO-0016 · Quantity", before: "25 kg", after: "24 kg", reason: "Matched to PLN-12", previous: "7c1e…a90b", hash: "e44f…12d3", signed: false },
  { id: "1042", person: 0, time: "09:43:06", record: "B-2281 · Release", before: "In QA", after: "Approved", reason: "Release conditions verified", previous: "e44f…12d3", hash: "9b07…c5e1", signed: true },
  { id: "1043", person: 0, time: "09:45:22", record: "SOP-014 · Revision", before: "03", after: "04", reason: "Change control CC-0218", previous: "9b07…c5e1", hash: "31da…7f40", signed: true },
  { id: "1044", person: 1, time: "09:48:10", record: "B-2282 · Stage", before: "Dispensing", after: "Blending", reason: "Weights checked by a second person", previous: "31da…7f40", hash: "82bf…c6a1", signed: false },
  { id: "1045", person: 0, time: "09:51:34", record: "AR-0280 · Result", before: "Pending review", after: "Verified", reason: "Test results meet the specification", previous: "82bf…c6a1", hash: "0d25…6ef8", signed: true },
  { id: "1046", person: 1, time: "09:54:09", record: "GRN-0042 · Location", before: "Receiving bay", after: "Bin A-04", reason: "Put-away after QC release", previous: "0d25…6ef8", hash: "a90c…e142", signed: false },
];

export function AuditTrailAsset() {
  return <AssetFrame className={styles.auditFrame} label="Continuously scrolling illustrative audit records and electronic signatures">
    <div className={styles.eyebrow}><span><FileCheck2 size={15} />Audit trail</span><small><LockKeyhole size={11} />Append-only</small></div>
    <div className={styles.auditColumns}><span>Event / record</span><span>Author / signature</span></div>
    <div className={styles.auditViewport}><div className={styles.auditTrack}>{[0, 1].map(copy => <ol key={copy} aria-hidden={copy === 1 ? true : undefined}>{AUDIT_ENTRIES.map(entry => {
      const person = PEOPLE[entry.person];
      return <li className={styles.auditEntry} key={entry.id}>
        <div className={styles.auditChange}><small>#{entry.id}<time>{entry.time} IST</time></small><strong>{entry.record}</strong><p><span>{entry.before}</span><ArrowRight size={12} /><b>{entry.after}</b></p><span className={styles.auditReason}>{entry.reason}</span></div>
        <div className={styles.auditAuthor}><Avatar person={entry.person} small /><div><strong>{person.name}</strong><span>{person.designation}</span><code>{person.ip}</code><small data-signed={entry.signed}>{entry.signed ? <Fingerprint size={11} /> : <Check size={11} />}{entry.signed ? "Signed · fresh sign-in" : "Change recorded"}</small></div></div>
        <div className={styles.hash}><LockKeyhole size={11} /><span>Previous <code>{entry.previous}</code></span><ArrowRight size={11} /><span>Hash <code>{entry.hash}</code></span><ShieldCheck size={12} /></div>
      </li>;
    })}</ol>)}</div></div>
    <footer><CheckCheck size={14} /><span>Linked hashes preserve the sequence of changes.</span></footer>
  </AssetFrame>;
}

export function BackupAsset({ kind }: { kind: "continuous" | "daily" | "region" }) {
  const { active, regionRef } = useVisualCycle(kind === "daily" ? 7 : 4, 1900, AUTOMATIC);
  return <AssetFrame className={styles.backupVisual} label={"Automatic " + kind + " backup demonstration"}><div ref={regionRef}>
    {kind === "continuous" && <>
      <div className={styles.backupFlow}><span><Database size={25} /><small>Live database</small></span><div className={styles.transfer}><i><LockKeyhole size={10} /></i></div><span><Database size={25} /><small>Recovery log</small></span></div>
      <div className={styles.restorePoints}>{["10:40", "10:41", "10:42", "10:43"].map((time, index) => <span key={time} data-active={active === index}><i />{time}</span>)}</div>
      <p className={styles.backupStatus}><CheckCheck size={12} /><span>Restore point preserved</span><strong>{["10:40", "10:41", "10:42", "10:43"][active]}</strong></p>
    </>}
    {kind === "daily" && <>
      <div className={styles.snapshotTitle}><FileCheck2 size={25} /><div><strong>Daily snapshots</strong><small>Full copy · stored separately</small></div><LockKeyhole size={13} /></div>
      <div className={styles.calendar}>{["M", "T", "W", "T", "F", "S", "S"].map((day, index) => <span key={index} data-active={active === index}><small>{day}</small><i>{index < active ? <Check size={13} /> : 12 + index}</i></span>)}</div>
      <p className={styles.backupStatus}><LockKeyhole size={12} /><span>Encrypted snapshot</span><strong>{12 + active} Oct</strong></p>
    </>}
    {kind === "region" && <>
      <div className={styles.regions}><Globe2 className={styles.regionGlobe} size={130} strokeWidth={.6} /><span><Server size={25} /><small>Primary region</small></span><div className={styles.transfer}><i><LockKeyhole size={10} /></i></div><span><Cloud size={28} /><small>Second region</small></span></div>
      <div className={styles.replicaLabels}><span><Check size={11} />Separate location</span><span><LockKeyhole size={11} />Encrypted</span></div>
      <p className={styles.backupStatus}><CheckCheck size={12} /><span>{active % 2 === 0 ? "Encrypted copy transferring" : "Recovery copy verified"}</span><strong>{active % 2 === 0 ? "Sync" : "Ready"}</strong></p>
    </>}
  </div></AssetFrame>;
}

export function PrivateAiAsset() {
  const { active, regionRef } = useVisualCycle(3, 2300, AUTOMATIC);
  return <AssetFrame className={styles.aiVisual} label="Private AI processing within the tenant and user role"><div ref={regionRef}><div className={styles.eyebrow}><span><ShieldCheck size={14} />Where Factro AI runs</span></div><div className={styles.cloudBoundary}><span>Your private cloud</span><div className={styles.tenantBoundary}><span>Your tenant</span><div className={styles.roleBoundary}><span>The user’s role</span><div className={styles.modelFlow}><span><Database size={18} />Records</span><ArrowDown size={15} aria-hidden="true" /><div>{["Compliance Checker", "Deviation Analyst", "Factro AI"].map((agent, index) => <span key={agent} data-active={active === index}>{agent}</span>)}</div><ArrowDown size={15} aria-hidden="true" /><span><Server size={18} />Private models</span></div></div></div></div><p className={styles.aiCaption}>Nothing leaves the tenant. Models run privately.</p><span className={styles.aiScope}><CheckCheck size={13} aria-hidden="true" />Your records. Your permissions. Your decision.</span></div></AssetFrame>;
}
