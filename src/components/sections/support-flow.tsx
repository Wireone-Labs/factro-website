"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import styles from "./support-flow.module.css";

const TICKETS = [
  { id: "SUP-1042", status: "Resolved", title: "Configure a batch approval workflow", module: "Technical assistance · Production", owner: "Maya", initials: "MY", request: "Help us set up a two-stage review for our new product line, with separate production and QA approvers.", reply: "Configured the production and QA approval stages. We verified both sign-offs on a sample batch with your team, and the workflow is ready to use.", time: "10:42" },
  { id: "SUP-1043", status: "Assigned", title: "Connect our ERP material catalogue", module: "Integration guidance · Master data", owner: "Arjun", initials: "AJ", request: "We’d like technical guidance on mapping material codes and units of measure from our ERP to Factro.", reply: "Your mapping template is ready. We’ll review the field definitions and validate a sample import with your IT team.", time: "10:08" },
  { id: "SUP-1038", status: "Resolved", title: "Prepare an inspection evidence pack", module: "Product assistance · Quality", owner: "Maya", initials: "MY", request: "Can you guide our QA team through exporting batch records, signed approvals and their audit history for an inspection?", reply: "We completed a guided walkthrough with QA. The team has verified the export and saved the steps for their next inspection.", time: "10:21" },
];

export function SupportFlow() {
  const reducedMotion = useReducedMotion();
  const stackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stackRef, { once: true, amount: 0.35 });
  const tickets = [...TICKETS].reverse();
  return <div className={styles.scene}>
    <div ref={stackRef} className={styles.tickets} aria-label="Example technical support tickets">
      {tickets.map((ticket, index) => {
        const expanded = ticket.id === TICKETS[0].id;
        return <motion.article key={ticket.id} className={styles.supportTicket} data-status={ticket.status} data-expanded={expanded}
          aria-hidden={!expanded} style={{ top: expanded ? undefined : index * 12, zIndex: index + 1 }}
          initial={reducedMotion ? false : { opacity: 0, x: 0, y: 90, rotate: 0 }}
          animate={reducedMotion ? { opacity: 1, x: 0, y: 0, rotate: 0 } : inView ? { opacity: [0, 1, 1, 1], x: [0, index % 2 ? 75 : -75, index % 2 ? -22 : 22, 0], y: [90, -20 - index * 10, 8, 0], rotate: [0, index % 2 ? 9 : -9, index % 2 ? -3 : 3, expanded ? 0 : index === 0 ? -1 : 0.5] } : { opacity: 0, x: 0, y: 90, rotate: 0 }}
          transition={{ duration: reducedMotion ? 0 : 1.5, delay: reducedMotion ? 0 : index * 0.16, times: [0, 0.4, 0.75, 1], ease: "easeInOut" }}>
          {expanded && <><h3 className={styles.ticketHeading}>
            <span className={styles.ticketHeader}><span>{ticket.id}</span><span className={styles.status}>{ticket.status}</span></span>
            <span className={styles.ticketTitle}>{ticket.title}</span>
          </h3>
          <div className={styles.ticketBody}>
            <p className={styles.module}>{ticket.module}</p>
            <dl className={styles.ticketMetadata}>
              <div><dt>Created date</dt><dd><time dateTime="2026-09-28T09:00:00+05:30">28 Sep 2026 · 09:00</time></dd></div>
              <div><dt>Assignee</dt><dd>{ticket.owner} · Support</dd></div>
              <div><dt>Resolution date</dt><dd><time dateTime="2026-09-28T10:42:00+05:30">28 Sep 2026 · 10:42</time></dd></div>
              <div><dt>TAT <span>(turnaround time)</span></dt><dd>1 h 42 min</dd></div>
            </dl>
            <p className={styles.requestText}>{ticket.request}</p>
            <div className={styles.reply}><span className={styles.avatar}>{ticket.initials}</span><div><p><strong>{ticket.owner} · Support</strong><time>{ticket.time}</time></p><p>{ticket.reply}</p></div></div>
          </div></>}
        </motion.article>;
      })}
    </div>
  </div>;
}
