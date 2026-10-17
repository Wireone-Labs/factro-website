"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { MegaMenuPanel } from "@/components/layout/mega-menu-panel";
import { NAV_ITEMS, SIGN_IN_URL, BOOK_DEMO_HREF } from "@/data/nav";
import { cn } from "@/lib/utils";

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => { if (desktop.matches) onClose(); };
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close menu"]')?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab") return;
      const controls = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  function close() { setExpanded(null); onClose(); }

  return <AnimatePresence>{open && <>
    <motion.div aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .2 }} className="fixed inset-0 z-40 bg-ink-950/40 backdrop-blur-sm xl:hidden" onClick={close} />
    <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Navigation" initial={reducedMotion ? false : { x: "100%" }} animate={{ x: 0 }} exit={{ x: reducedMotion ? 0 : "100%", opacity: reducedMotion ? 0 : 1 }} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 36 }} className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white shadow-2xl xl:hidden">
      <div className="flex shrink-0 items-center justify-between border-b border-line px-5 py-4">
        <Logo />
        <button type="button" onClick={close} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-ink-50"><X className="h-5 w-5" aria-hidden="true" /></button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
        {NAV_ITEMS.map(item => <div key={item.label} className="border-b border-line/70 last:border-0">
          {item.menu ? <>
            <button type="button" onClick={() => setExpanded(expanded === item.label ? null : item.label)} className={cn("flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left text-base font-medium", expanded === item.label ? "bg-[#edf0ff] text-[#273cff]" : "text-ink-900")} aria-expanded={expanded === item.label} aria-controls={`mobile-menu-${item.menu.layout}`}>
              {item.label}<ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-200", expanded === item.label && "rotate-180")} />
            </button>
            <AnimatePresence initial={false}>{expanded === item.label && <motion.div id={`mobile-menu-${item.menu.layout}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .2, ease: [.22,1,.36,1] }} className="overflow-hidden">
              <div className="pb-4 pt-2"><MegaMenuPanel menu={item.menu} onNavigate={close} /></div>
            </motion.div>}</AnimatePresence>
          </> : <Link href={item.href} onClick={close} className="block rounded-lg px-3 py-3.5 text-base font-medium text-ink-900">{item.label}</Link>}
        </div>)}
      </div>
      <div className="flex shrink-0 flex-col gap-2 border-t border-line px-5 py-4">
        <Button href={SIGN_IN_URL} variant="secondary" className="w-full" event="sign_in_click" eventParams={{ location: "mobile_nav" }}>Sign in</Button>
        <Button href={BOOK_DEMO_HREF} className="w-full bg-[#2635f5] hover:bg-[#1827db]" onClick={close} event="book_demo_click" eventParams={{ location: "mobile_nav" }}>Book a demo</Button>
      </div>
    </motion.div>
  </>}</AnimatePresence>;
}
