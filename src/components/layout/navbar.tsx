"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { MegaMenuPanel } from "@/components/layout/mega-menu-panel";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NAV_ITEMS, SIGN_IN_URL, BOOK_DEMO_HREF } from "@/data/nav";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activeItem = NAV_ITEMS.find((item) => item.label === openMenu);

  return (
    <header className="fixed inset-x-0 top-4 z-50 sm:top-5">
      <Container className="max-w-6xl">
        <div className="relative" onMouseLeave={scheduleClose}>
          <nav className="relative flex items-center justify-between gap-2 rounded-full border border-line/70 bg-white/85 py-1.5 pr-2 pl-6 shadow-[0_10px_40px_-14px_rgba(15,14,23,0.18)] backdrop-blur-xl">
            <Logo />

            <div className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center xl:flex">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                const isOpen = openMenu === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => {
                      clearCloseTimer();
                      setOpenMenu(item.menu ? item.label : null);
                    }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "relative z-10 flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                        isActive ? "text-ink-900" : "text-ink-500 hover:text-ink-900",
                      )}
                    >
                      <span className="relative">
                        {item.label}
                        {isActive && !isOpen && (
                          <span className="absolute inset-x-0 -bottom-1.5 h-0.5 rounded-full bg-brand-500" />
                        )}
                      </span>
                      {item.menu && (
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-transform duration-200",
                            isOpen && "rotate-180",
                          )}
                        />
                      )}
                    </Link>

                    {isOpen && (
                      <motion.div
                        layoutId="nav-hover-pill"
                        className="absolute inset-0 rounded-full bg-mist"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40,
                          mass: 0.4,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="hidden items-center gap-1 xl:flex">
              <Button href={SIGN_IN_URL} variant="ghost" size="md">
                Sign in
              </Button>
              <Button
                href={BOOK_DEMO_HREF}
                size="md"
                className="group shadow-[0_0_0_2px_#ffffff,0_0_0_4px_var(--color-brand-400)]"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-900 xl:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </nav>

          <AnimatePresence>
            {activeItem?.menu && (
              <motion.div
                key={activeItem.label}
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={clearCloseTimer}
                className="absolute top-full left-1/2 z-40 mt-3 hidden -translate-x-1/2 xl:block"
              >
                <MegaMenuPanel menu={activeItem.menu} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
