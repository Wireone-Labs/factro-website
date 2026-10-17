"use client";

import { useState } from "react";
import type { ComplianceMatrixRow, IndustryControl, MappedStandard } from "@/data/industries";
import styles from "./industry-pages.module.css";

export function IndustryControlsList({ controls, matrix, matrixStandards, mappedStandards }: { controls: IndustryControl[]; matrix: ComplianceMatrixRow[]; matrixStandards: string[]; mappedStandards: MappedStandard[] }) {
  const [selected, setSelected] = useState<string>();
  const active = mappedStandards.find(standard => standard.matrixName === selected)?.matrixName ?? mappedStandards[0]?.matrixName;
  const visible = controls.map((control,index) => ({ ...control, index })).filter(control => {
    if (!active) return true;
    const row = matrix.find(entry => entry.area === control.area);
    return row?.marks[matrixStandards.indexOf(active)] === true;
  });
  return <div><div className={styles.filters} role="group" aria-label="Filter controls by standard">{mappedStandards.map(standard => <button key={standard.name} type="button" aria-pressed={active === standard.matrixName} onClick={() => setSelected(standard.matrixName)}>{standard.name}</button>)}</div><div className="sr-only" role="status">{visible.length} controls shown{active ? ` for ${active}` : ""}</div><div className={styles.controls}>{visible.map(control => <article key={control.text} className={styles.control}><span>{String(control.index + 1).padStart(2,"0")}</span><p>{control.text}</p></article>)}</div></div>;
}
