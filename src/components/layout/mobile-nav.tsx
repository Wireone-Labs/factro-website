"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { NAV_ITEMS, SIGN_IN_URL, BOOK_DEMO_HREF } from "@/data/nav";
import { cn } from "@/lib/utils";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm xl:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl xl:hidden"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="border-b border-line/70 last:border-0">
                  {item.menu ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(expanded === item.label ? null : item.label)
                        }
                        className="flex w-full items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium text-ink-900"
                        aria-expanded={expanded === item.label}
                      >
                        {item.label}
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-ink-400 transition-transform duration-200",
                            expanded === item.label && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col px-3 pb-4">
                              {item.menu.columns
                                .flatMap((col) => col.items)
                                .map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onClose}
                                    className="rounded-lg px-2 py-2 text-sm text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                                  >
                                    {sub.label}
                                  </Link>
                                ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-lg px-3 py-3.5 text-base font-medium text-ink-900"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-line px-5 py-5">
              <Button
                href={SIGN_IN_URL}
                variant="secondary"
                className="w-full"
                event="sign_in_click"
                eventParams={{ location: "mobile_nav" }}
              >
                Sign in
              </Button>
              <Button
                href={BOOK_DEMO_HREF}
                className="w-full"
                onClick={onClose}
                event="book_demo_click"
                eventParams={{ location: "mobile_nav" }}
              >
                Book a demo
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
