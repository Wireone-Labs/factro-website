"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MegaMenuPanel } from "@/components/layout/mega-menu-panel";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS, SIGN_IN_URL, BOOK_DEMO_HREF } from "@/data/nav";
import { cn } from "@/lib/utils";
import styles from "./navbar.module.css";

export function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const openedByHover = useRef(false);
  const focusMenu = useRef(false);
  const reducedMotion = useReducedMotion();
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => {
      const focusedTrigger = headerRef.current?.querySelector('button[aria-expanded="true"]') === document.activeElement;
      if (!panelRef.current?.contains(document.activeElement) && !(focusedTrigger && !openedByHover.current)) setOpenMenu(null);
    }, 140);
  };

  useEffect(() => {
    if (!openMenu) return;
    if (focusMenu.current) {
      panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      focusMenu.current = false;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      setOpenMenu(null);
      triggerRefs.current[openMenu]?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openMenu]);

  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);

  const activeItem = NAV_ITEMS.find((item) => item.label === openMenu);

  return (
    <header ref={headerRef} data-site-header className={cn(styles.header, "absolute inset-x-0 top-0 z-50 min-[1920px]:[&_nav_img]:h-8")} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose(); }}>
        <AnimatePresence>{activeItem?.menu && <motion.div key="menu-backdrop" aria-hidden="true" className={styles.scrim} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : .18 }} onClick={() => setOpenMenu(null)} />}</AnimatePresence>
        <div className="relative" onMouseLeave={scheduleClose}>
          <nav aria-label="Main navigation" className={cn(styles.nav, "relative flex items-center justify-between gap-2")}>
            <div className={styles.logo}><Logo /></div>

            <div className={cn(styles.links, "absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center xl:flex")}>
              {NAV_ITEMS.map(item => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                const isOpen = openMenu === item.label;
                return <div key={item.label} onPointerEnter={event => {
                  if (event.pointerType !== "mouse") return;
                  clearCloseTimer();
                  if (item.menu && !isOpen) openedByHover.current = true;
                  setOpenMenu(item.menu ? item.label : null);
                }}>
                  {item.menu ? <button type="button" ref={element => { triggerRefs.current[item.label] = element; }} className={styles.menuTrigger} data-open={isOpen} aria-expanded={isOpen} aria-controls={`navigation-${item.menu.layout}`} onFocus={clearCloseTimer} onClick={event => {
                    clearCloseTimer();
                    const nextMenu = isOpen && !openedByHover.current ? null : item.label;
                    openedByHover.current = false;
                    focusMenu.current = Boolean(nextMenu) && event.detail === 0;
                    setOpenMenu(nextMenu);
                  }} onKeyDown={event => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    clearCloseTimer();
                    openedByHover.current = false;
                    if (isOpen) panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
                    else { focusMenu.current = true; setOpenMenu(item.label); }
                  }}>{item.label}<ChevronDown size={13} aria-hidden="true" /></button> : <Link href={item.href} className={styles.menuTrigger} aria-current={isActive ? "page" : undefined} onFocus={() => { clearCloseTimer(); setOpenMenu(null); }} onClick={() => setOpenMenu(null)}>{item.label}</Link>}
                </div>;
              })}
            </div>

            <div className={cn(styles.actions, "hidden items-center gap-1 xl:flex")}>
              <Button
                href={SIGN_IN_URL}
                variant="ghost"
                size="md"
                event="sign_in_click"
                eventParams={{ location: "navbar" }}
              >
                Sign in
              </Button>
              <Button
                href={BOOK_DEMO_HREF}
                size="md"
                className={cn("group", styles.demoButton)}
                event="book_demo_click"
                eventParams={{ location: "navbar" }}
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 xl:hidden"
              onClick={() => { setOpenMenu(null); setMobileOpen(true); }}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>

          <AnimatePresence>
            {activeItem?.menu && (
              <motion.div
                key={activeItem.label}
                ref={panelRef}
                id={`navigation-${activeItem.menu.layout}`}
                data-layout={activeItem.menu.layout}
                initial={reducedMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -6 }}
                transition={{ duration: reducedMotion ? 0 : .18, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={clearCloseTimer}
                onFocus={clearCloseTimer}
                className={styles.popover}
              >
                <MegaMenuPanel menu={activeItem.menu} onNavigate={() => setOpenMenu(null)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      <MobileNav open={mobileOpen} onClose={closeMobile} />
    </header>
  );
}
