"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const INTERESTS = [
  { label: "Production", minutes: 8 },
  { label: "Quality & Compliance", minutes: 8 },
  { label: "Inventory", minutes: 6 },
  { label: "Sales & Procurement", minutes: 5 },
  { label: "Reports & Analytics", minutes: 4 },
  { label: "Something else", minutes: 2 },
];

const COMPANY_SIZES = [
  "1–20 employees",
  "21–100 employees",
  "101–500 employees",
  "500+ employees",
];

const fieldClasses =
  "w-full rounded-xl border border-line bg-ink-50/60 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100";

export function DemoForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [preSelected, setPreSelected] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const hasStarted = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get("interests");
    if (!fromQuery) return;
    const matched = fromQuery
      .split(",")
      .filter((label) => INTERESTS.some((i) => i.label === label));
    if (matched.length === 0) return;
    setInterests(matched);
    setPreSelected(new Set(matched));
    trackEvent("demo_form_prefilled", { interest_count: matched.length });
  }, []);

  const handleFormFocus = () => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    trackEvent("demo_form_start");
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const estimatedMinutes = interests.reduce((total, interest) => {
    const match = INTERESTS.find((i) => i.label === interest);
    return total + (match?.minutes ?? 0);
  }, 0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      size: String(formData.get("size") ?? ""),
      interests,
      message: String(formData.get("message") ?? ""),
    };

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("submitted");
      trackEvent("generate_lead", {
        company_size: payload.size,
        interest_count: interests.length,
      });
    } catch {
      setStatus("error");
    }
  };

  if (status === "submitted") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center rounded-3xl border border-line bg-white px-8 py-12 text-center shadow-[0_30px_80px_-28px_rgba(15,14,23,0.22)]"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink-900">
          Thanks — we&apos;ll be in touch
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-500">
          Someone from our team will reach out within one business day to
          schedule your walkthrough.
        </p>
        <Button href="/" variant="secondary" className="mt-8">
          Back to homepage
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={handleFormFocus}
      className="relative rounded-3xl border border-line bg-white p-5 shadow-[0_30px_80px_-28px_rgba(15,14,23,0.22)] sm:p-7"
    >
      <p className="text-sm font-semibold text-ink-900">Get your walkthrough</p>
      <p className="mt-1 text-xs leading-relaxed text-ink-400">
        Fill this in and we&apos;ll reach out within one business day.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-700"
          >
            <User className="h-3.5 w-3.5 text-ink-400" />
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jordan Patel"
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-700"
          >
            <Mail className="h-3.5 w-3.5 text-ink-400" />
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jordan@company.com"
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-700"
          >
            <Building2 className="h-3.5 w-3.5 text-ink-400" />
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            required
            placeholder="Company name"
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="size"
            className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-ink-700"
          >
            <Users className="h-3.5 w-3.5 text-ink-400" />
            Company size
          </label>

          <div className="relative">
            <select
              id="size"
              name="size"
              required
              defaultValue=""
              className={cn(
                fieldClasses,
                "appearance-none pr-10",
                "[&:invalid]:text-ink-400",
                "[&:valid]:text-ink-900",
              )}
            >
              <option value="" disabled>
                Select company size
              </option>

              {COMPANY_SIZES.map((size) => (
                <option key={size} value={size} className="text-ink-900">
                  {size}
                </option>
              ))}
            </select>

            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-ink-700">
          What are you interested in?
        </p>

        <AnimatePresence>
          {preSelected.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 8 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-1.5 rounded-lg bg-brand-50/70 px-2.5 py-1.5 text-[11px] font-medium text-brand-700">
                <Sparkles className="h-3 w-3 shrink-0" />
                Pre-selected from what you flagged as costing you time
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-1.5">
          {INTERESTS.map(({ label }) => {
            const active = interests.includes(label);
            const highlighted = preSelected.has(label);
            return (
              <button
                key={label}
                type="button"
                onClick={() => toggleInterest(label)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-brand-300 bg-brand-50 text-brand-700"
                    : "border-line bg-white text-ink-500 hover:border-ink-300 hover:text-ink-900",
                  highlighted &&
                    active &&
                    "ring-2 ring-brand-300 ring-offset-1",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {estimatedMinutes > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 10 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-2 rounded-xl border border-brand-100 bg-brand-50/70 px-3 py-2 text-xs font-medium text-brand-700">
                <Clock className="h-3.5 w-3.5" />
                Est. walkthrough time: ~{estimatedMinutes} minutes
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4">
        <label
          htmlFor="message"
          className="mb-1.5 block text-xs font-medium text-ink-700"
        >
          Anything else?{" "}
          <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          placeholder="Tell us a bit about your facility or what you're looking to solve"
          className={cn(fieldClasses, "resize-none min-h-28")}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden text-xs font-medium text-red-600"
          >
            Something went wrong sending your request. Please try again, or
            email us directly.
          </motion.p>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="group mt-5 w-full sm:w-auto"
      >
        <AnimatePresence mode="wait" initial={false}>
          {status === "submitting" ? (
            <motion.span
              key="submitting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              Submit
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </form>
  );
}
