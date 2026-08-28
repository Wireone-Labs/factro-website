import { CheckCircle2 } from "lucide-react";
import { IconTile } from "@/components/ui/icon-tile";
import type { CoreModule } from "@/data/modules";

export function ModulePanel({ module }: { module: CoreModule }) {
  const Icon = module.icon;

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
