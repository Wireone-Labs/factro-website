import type { LucideIcon } from "lucide-react";
import { IconTile } from "@/components/ui/icon-tile";
import { cn } from "@/lib/utils";

export function InfoCard({
  icon,
  title,
  description,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "h-full rounded-2xl border border-line bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_36px_-18px_rgba(15,14,23,0.15)]",
        className,
      )}
    >
      <IconTile icon={icon} size="sm" />
      <h3 className="mt-4 text-sm font-semibold text-ink-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">{description}</p>
    </div>
  );
}
