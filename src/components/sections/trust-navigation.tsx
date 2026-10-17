"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

const TOPICS = [
  { id: "overview", label: "Overview" },
  { id: "security", label: "Security" },
  { id: "privacy", label: "Privacy" },
  { id: "compliance", label: "Compliance" },
  { id: "ai", label: "AI & data" },
  { id: "resources", label: "Resources" },
];

export function TrustNavigation() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    function updateTopic() {
      const threshold = window.innerWidth < 640 ? 240 : 180;
      const current = TOPICS.filter(topic => {
        const section = document.getElementById(topic.id);
        return section && section.getBoundingClientRect().top <= threshold;
      }).at(-1);
      setActive(current?.id ?? "overview");
    }
    updateTopic();
    window.addEventListener("scroll", updateTopic, { passive: true });
    window.addEventListener("resize", updateTopic);
    return () => {
      window.removeEventListener("scroll", updateTopic);
      window.removeEventListener("resize", updateTopic);
    };
  }, []);

  return <nav aria-label="Trust Center topics" className="sticky top-[86px] z-20 border-y border-line bg-white/95 py-3 backdrop-blur-xl">
    <Container><div className="flex flex-wrap gap-1 sm:gap-2">{TOPICS.map(topic => <a key={topic.id} href={`#${topic.id}`} aria-current={active === topic.id ? "location" : undefined} className={cn("rounded-full px-3 py-2 text-xs font-medium transition-colors sm:px-4 sm:text-sm", active === topic.id ? "bg-brand-50 text-brand-600" : "text-ink-500 hover:bg-mist hover:text-ink-900")}>{topic.label}</a>)}</div></Container>
  </nav>;
}
