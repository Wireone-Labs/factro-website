import Image from "next/image";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { PLATFORM_STATS } from "@/data/stats";

const LOOP_STATS = [...PLATFORM_STATS, ...PLATFORM_STATS];

export function Proof() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mask-fade-x overflow-hidden border-b border-line pb-16">
        <div className="animate-marquee flex w-max items-stretch gap-5 [animation-play-state:running] hover:[animation-play-state:paused]">
          {LOOP_STATS.map((stat, i) => (
            <div
              key={`${stat.label}-${i}`}
              className="flex shrink-0 flex-col justify-center gap-1 rounded-2xl border border-line bg-white px-7 py-4"
            >
              <span className="text-2xl font-semibold whitespace-nowrap tracking-tight text-ink-900 sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs whitespace-nowrap text-ink-500 sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Container>
        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <Quote className="mx-auto h-8 w-8 text-brand-300" />
          <p className="text-balance mt-6 text-xl font-medium leading-relaxed text-ink-900 sm:text-2xl">
            &ldquo;Most plants do not have a compliance problem. They have an
            observability problem. Factro closes that gap in the
            architecture, not with another checklist.&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-white">
              <Image
                src="/brand/logo-mark.png"
                alt=""
                width={18}
                height={20}
                className="h-5 w-auto"
              />
            </span>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink-900">
                The Factro Team
              </p>
              <p className="text-xs text-ink-400">Wireone Labs</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
