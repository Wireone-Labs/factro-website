import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconTileProps {
  icon: LucideIcon;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { box: "h-9 w-9 rounded-lg", icon: "h-4 w-4" },
  md: { box: "h-11 w-11 rounded-xl", icon: "h-5 w-5" },
  lg: { box: "h-13 w-13 rounded-2xl", icon: "h-6 w-6" },
};

export function IconTile({
  icon: Icon,
  className,
  iconClassName,
  size = "md",
}: IconTileProps) {
  const s = sizes[size];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center border border-brand-100 bg-brand-50 text-brand-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-all duration-200",
        s.box,
        className,
      )}
    >
      <Icon className={cn(s.icon, iconClassName)} strokeWidth={1.75} />
    </span>
  );
}
