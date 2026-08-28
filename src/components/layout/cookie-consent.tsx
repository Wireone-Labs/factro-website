"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/ui/icon-tile";

const STORAGE_KEY = "factro-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const respond = (choice: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore storage errors (private browsing, disabled storage, etc).
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-[70] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[26rem]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-line bg-white/95 p-5 shadow-[0_30px_70px_-24px_rgba(15,14,23,0.28)] backdrop-blur-xl">
            <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-brand-200/40 blur-2xl" />

            <div className="relative flex items-start gap-3.5">
              <IconTile icon={Cookie} className="shrink-0" />
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-ink-900">
                  We use cookies
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                  Just enough to remember your preferences and understand how
                  the site is used — nothing sold, nothing shared. See our{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-brand-600 underline underline-offset-2 hover:text-brand-700"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for details.
                </p>
              </div>
            </div>

            <div className="relative mt-4 flex justify-end gap-2">
              <Button
                variant="ghost"
                size="md"
                className="h-9 px-4 text-sm"
                onClick={() => respond("declined")}
              >
                Decline
              </Button>
              <Button
                variant="primary"
                size="md"
                className="h-9 px-4 text-sm"
                onClick={() => respond("accepted")}
              >
                Accept all
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
