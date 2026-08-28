import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a root-relative path with the app's basePath (set for GitHub
 * Pages project hosting). Needed anywhere a path is passed as a literal
 * string rather than through next/link or next/image, which handle this
 * automatically.
 */
export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
