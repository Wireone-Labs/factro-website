"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;

    // Defer to idle so Firebase Analytics' gtag.js injection doesn't
    // compete with the initial render for main-thread time.
    let cancelled = false;
    const fire = () => {
      if (!cancelled) trackEvent("page_view", { page_path });
    };

    const hasIdleCallback = typeof window.requestIdleCallback === "function";
    const idleId = hasIdleCallback
      ? window.requestIdleCallback(fire)
      : window.setTimeout(fire, 1);

    return () => {
      cancelled = true;
      if (hasIdleCallback) {
        window.cancelIdleCallback(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, [pathname, searchParams]);

  return null;
}
