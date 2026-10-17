import { PillarsPage } from "@/components/sections/pillars-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pillars · Three pillars. One record.",
  description: "The Compliance Engine checks every action, Task Manager drives the work, and Factro AI connects the evidence. Explore the three pillars inside every Factro product.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return <PillarsPage />;
}
