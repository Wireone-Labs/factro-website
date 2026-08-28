import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      className={cn("flex items-center shrink-0", className)}
      aria-label="Factro home"
    >
      <Image
        src="/brand/logo-wordmark-cropped.png"
        alt="Factro"
        width={883}
        height={243}
        className={cn(
          "h-6.5 w-auto",
          variant === "light" && "brightness-0 invert",
        )}
        priority
      />
    </Link>
  );
}
