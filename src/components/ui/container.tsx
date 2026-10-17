import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[var(--page-container-width,80rem)] px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
