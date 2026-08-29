import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/ui/icon-tile";
import type { MegaMenu } from "@/data/nav";
import { cn } from "@/lib/utils";

export function MegaMenuPanel({ menu }: { menu: MegaMenu }) {
  const colCount = menu.columns.length;
  const panelWidth =
    colCount >= 5
      ? "w-[min(96vw,1180px)]"
      : colCount === 4
        ? "w-[min(94vw,960px)]"
        : "w-[min(90vw,680px)]";
  const gridCols =
    colCount >= 5
      ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      : colCount === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-3";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-white/95 shadow-[0_24px_60px_-20px_rgba(15,14,23,0.25)] backdrop-blur-xl",
        panelWidth,
      )}
    >
      <div className="border-b border-line px-6 py-4">
        <p className="text-sm text-ink-500">{menu.description}</p>
      </div>

      <div className={cn("grid gap-x-6 gap-y-8 p-6", gridCols)}>
        {menu.columns.map((col) => (
          <div key={col.heading}>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
              {col.heading}
            </p>
            <ul className="flex flex-col gap-0.5">
              {col.items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group -mx-2 flex items-start gap-3 rounded-xl p-2 transition-colors hover:bg-mist"
                  >
                    <IconTile
                      icon={item.icon}
                      size="sm"
                      className="mt-0.5 transition-colors duration-200 group-hover:border-brand-200 group-hover:bg-brand-100"
                    />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-ink-900">
                        {item.label}
                      </span>
                      <span className="block text-xs text-ink-400">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {menu.footerLabel && menu.footerHref && (
        <div className="border-t border-line bg-mist/50 px-6 py-3">
          <Link
            href={menu.footerHref}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            {menu.footerLabel}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
