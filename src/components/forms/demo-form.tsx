"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const INTERESTS = [
  "Production",
  "Quality & Compliance",
  "Inventory",
  "Sales & Procurement",
  "Reports & Analytics",
  "Something else",
];

const COMPANY_SIZES = [
  "1–20 employees",
  "21–100 employees",
  "101–500 employees",
  "500+ employees",
];

const ROLES = [
  "Plant Manager / Operations",
  "Quality / Compliance",
  "IT / Systems",
  "Founder / Leadership",
  "Other",
];

const fieldClasses =
  "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-300 transition-colors focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100";

export function DemoForm() {
  const [interests, setInterests] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "submitted">(
    "idle",
  );

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // Mock submission — no backend wired up yet.
    setTimeout(() => setStatus("submitted"), 900);
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
      className="rounded-3xl border border-line bg-white p-5 shadow-[0_30px_80px_-28px_rgba(15,14,23,0.22)] sm:p-7"
    >
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1 block text-xs font-medium text-ink-700">
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
          <label htmlFor="email" className="mb-1 block text-xs font-medium text-ink-700">
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
          <label htmlFor="company" className="mb-1 block text-xs font-medium text-ink-700">
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
          <label htmlFor="role" className="mb-1 block text-xs font-medium text-ink-700">
            Role
          </label>
          <select id="role" name="role" required defaultValue="" className={fieldClasses}>
            <option value="" disabled>
              Select your role
            </option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="size" className="mb-1 block text-xs font-medium text-ink-700">
            Company size
          </label>
          <select id="size" name="size" required defaultValue="" className={fieldClasses}>
            <option value="" disabled>
              Select company size
            </option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-medium text-ink-700">
          What are you interested in?
        </p>
        <div className="flex flex-wrap gap-1.5">
          {INTERESTS.map((interest) => {
            const active = interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-brand-300 bg-brand-50 text-brand-700"
                    : "border-line bg-white text-ink-500 hover:border-ink-300 hover:text-ink-900",
                )}
              >
                {interest}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-1 block text-xs font-medium text-ink-700">
          Anything else? <span className="font-normal text-ink-400">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={2}
          placeholder="Tell us a bit about your facility or what you're looking to solve"
          className={cn(fieldClasses, "resize-none")}
        />
      </div>

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
              Book my demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </motion.span>
          )}
        </AnimatePresence>
      </Button>
    </form>
  );
}
