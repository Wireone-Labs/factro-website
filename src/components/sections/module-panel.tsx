import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { IconTile } from "@/components/ui/icon-tile";
import type { CoreModule } from "@/data/modules";

export function ModulePanel({ module }: { module: CoreModule }) {
  const Icon = module.icon;

  if (module.screenshot) {
    return (
      <div className="flex flex-col gap-5 rounded-3xl border border-line bg-white p-4 sm:p-5">
        <div className="overflow-hidden rounded-2xl border border-line">
          <Image
            src={module.screenshot.src}
            alt={module.screenshot.alt}
            width={module.screenshot.width}
            height={module.screenshot.height}
            className="h-auto w-full"
          />
        </div>

        <div className="flex flex-col gap-2.5 px-2 pb-2 sm:px-3 sm:pb-3">
          {module.points.map((point) => (
            <div
              key={point}
              className="flex items-center gap-3 rounded-xl border border-line bg-white/90 px-4 py-3 text-sm text-ink-700 shadow-[0_1px_2px_rgba(15,14,23,0.03)]"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-500" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-8">
      <Icon
        className="pointer-events-none absolute -right-8 -bottom-8 h-44 w-44 text-ink-50"
        strokeWidth={1}
      />

      <div className="relative">
        <div className="flex items-center gap-3">
          <IconTile icon={Icon} />
          <span className="text-sm font-semibold text-ink-900">
            {module.tag}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          {module.points.map((point) => (
            <div
              key={point}
              className="flex items-center gap-3 rounded-xl border border-line bg-white/90 px-4 py-3 text-sm text-ink-700 shadow-[0_1px_2px_rgba(15,14,23,0.03)]"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-500" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
