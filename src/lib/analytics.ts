import { logEvent as firebaseLogEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase";

export async function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  const analytics = await getFirebaseAnalytics();
  if (!analytics) return;
  firebaseLogEvent(analytics, eventName, params);
}
