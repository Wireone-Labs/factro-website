"use client";

import { trackEvent } from "@/lib/analytics";

export function TrackedLink({
  href,
  event,
  eventParams,
  className,
  children,
}: {
  href: string;
  event: string;
  eventParams?: Record<string, string | number | boolean>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={() => trackEvent(event, eventParams)}
      className={className}
    >
      {children}
    </a>
  );
}
