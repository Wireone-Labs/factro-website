import { track } from "@vercel/analytics";

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  track(eventName, params);
}
