import { Check, Circle, FileCheck2, LockKeyhole, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import type { CSSProperties } from "react";
import type { EnginePreview } from "@/data/product-engine-previews";
import styles from "./product-engine-preview.module.css";

function PreviewChart({ preview }: { preview: EnginePreview }) {
  const values = preview.values ?? [];
  const labels = preview.labels ?? [];
  if (preview.chart === "ring") return <div className={styles.readiness}>
    <div className={styles.ring} style={{ "--score": `${values[0]}%` } as CSSProperties}><strong>{preview.metric}<small>Readiness</small></strong></div>
    <ul>{labels.map((label, index) => <li key={label}><i data-tone={index} /><span>{label}</span><b>{values[index]}%</b></li>)}</ul>
  </div>;
  if (preview.chart === "horizontal") return <div className={styles.horizontal}>{values.map((value, index) => <div key={labels[index]}><span>{labels[index]}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>)}</div>;
  if (preview.chart === "line") {
    const points = values.map((value, index) => `${index * 300 / (values.length - 1)},${110 - value}`).join(" ");
    return <div className={styles.lineChart}><svg viewBox="-4 0 308 120" aria-hidden="true"><path d="M0 25H300M0 65H300M0 105H300" className={styles.gridLine} /><polygon points={`0,116 ${points} 300,116`} /><polyline points={points} />{values.map((value, index) => <circle key={index} cx={index * 300 / (values.length - 1)} cy={110 - value} r="3" />)}</svg><div className={styles.axis}>{labels.map(label => <span key={label}>{label}</span>)}</div></div>;
  }
  return <div className={styles.bars}>{values.map((value, index) => <div key={labels[index]}><div className={styles.barTrack}><div className={styles.bar} data-alert={preview.chart === "bars" && index === values.length - 1} style={{ height: `${value}%` }}>{preview.chart === "stacked" && <><i /><i /><i /></>}</div></div><span>{labels[index]}</span></div>)}</div>;
}

export function ProductEnginePreview({ preview }: { preview: EnginePreview }) {
  const Icon = preview.kind === "control" ? ShieldCheck : preview.kind === "work" ? Workflow : Sparkles;
  const held = preview.rows.some(row => row.state === "blocked");
  return <div className={styles.preview} data-kind={preview.kind} aria-label={`Illustrative ${preview.title}`}>
    <div className={styles.topbar}><span><Icon size={12} aria-hidden="true" />{preview.reference}</span><small>Demo</small></div>
    <div className={styles.body}>
      <div className={styles.title}><strong>{preview.title}</strong><span data-held={held}>{preview.status}</span></div>
      {preview.kind === "chart" ? <><div className={styles.metric}>{preview.chart !== "ring" && preview.metric}<span><i />From your records</span></div><PreviewChart preview={preview} /></> : <>
        <div className={styles.records}>{preview.rows.map(row => <div key={row.label} data-state={row.state}>
          <span className={styles.stateIcon}>{row.state === "done" ? <Check size={12} /> : row.state === "blocked" ? <LockKeyhole size={11} /> : <Circle size={11} />}</span>
          <div><strong>{row.label}</strong><span>{row.detail}</span></div>
          <i />
        </div>)}</div>
      </>}
      <p className={styles.note}><FileCheck2 size={12} aria-hidden="true" /><span>{preview.note}</span></p>
    </div>
  </div>;
}
