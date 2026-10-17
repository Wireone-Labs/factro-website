"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import styles from "@/components/sections/demo-page.module.css";

const INTERESTS = ["Production","Quality & Compliance","Inventory","Sales & Procurement","Reports & Analytics","Something else"];
const COMPANY_SIZES = ["1–20 employees","21–100 employees","101–500 employees","500+ employees"];
function subscribeLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  return () => window.removeEventListener("popstate", callback);
}

export function DemoForm() {
  const search = useSyncExternalStore(subscribeLocation, () => window.location.search, () => "");
  const [selection, setSelection] = useState<string[] | null>(null);
  const interests = selection ?? (new URLSearchParams(search).get("interests")?.split(",").filter(label => INTERESTS.includes(label)) ?? []);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted" | "error">("idle");
  const started = useRef(false);
  const submitting = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setStatus("submitting");
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") ?? "").trim(), email: String(form.get("email") ?? "").trim(), company: String(form.get("company") ?? "").trim(), size: String(form.get("size") ?? ""), interests, message: String(form.get("message") ?? "").trim() };
    try {
      const response = await fetch("/api/demo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Request failed");
      setStatus("submitted");
      trackEvent("generate_lead", { company_size: payload.size, interest_count: interests.length });
    } catch {
      setStatus("error");
    } finally {
      submitting.current = false;
    }
  }

  if (status === "submitted") return <div className={`${styles.form} ${styles.success}`} role="status"><CheckCircle2 size={42} aria-hidden="true" /><h2>Thanks — we’ll be in touch.</h2><p>Our team will reach out within one business day to arrange your walkthrough.</p><Button href="/" variant="secondary">Back to homepage</Button></div>;

  return <form className={styles.form} onSubmit={submit} onFocusCapture={() => { if (!started.current) { started.current = true; trackEvent("demo_form_start"); } }} aria-labelledby="demo-form-title" aria-busy={status === "submitting"}>
    <h2 id="demo-form-title">Get your walkthrough</h2><p>We reach out within one business day.</p>
    <div className={styles.fields}><div><label htmlFor="demo-name">Full name <em>*</em></label><input id="demo-name" name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></div><div><label htmlFor="demo-email">Work email <em>*</em></label><input id="demo-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@company.com" /></div><div><label htmlFor="demo-company">Company <em>*</em></label><input id="demo-company" name="company" autoComplete="organization" required maxLength={180} placeholder="Company name" /></div><div><label htmlFor="demo-size">Company size <em>*</em></label><select id="demo-size" name="size" defaultValue="" required><option value="" disabled>Select</option>{COMPANY_SIZES.map(size => <option key={size}>{size}</option>)}</select></div></div>
    <fieldset><legend>What are you interested in?</legend><div className={styles.interests}>{INTERESTS.map(label => <button key={label} type="button" aria-pressed={interests.includes(label)} onClick={() => setSelection(interests.includes(label) ? interests.filter(item => item !== label) : [...interests,label])}>{label}</button>)}</div></fieldset>
    <div className={styles.message}><label htmlFor="demo-message">Anything else? <span>Optional</span></label><textarea id="demo-message" name="message" maxLength={4000} placeholder="Tell us about your plant, products or a workflow you want to see" rows={3} /></div>
    {status === "error" && <p className={styles.error} role="alert">We couldn’t send your request. Please try again, or <a href="mailto:hello@factro.io">email hello@factro.io</a>.</p>}
    <Button type="submit" disabled={status === "submitting"} className={styles.submit}>{status === "submitting" ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" />Sending</> : <>Book my walkthrough<ArrowRight size={16} aria-hidden="true" /></>}</Button>
    <p className={styles.privacy}><LockKeyhole size={11} aria-hidden="true" /><span>No commitment. We only use your details to arrange the demo. <Link href="/privacy">Privacy</Link></span></p>
  </form>;
}
