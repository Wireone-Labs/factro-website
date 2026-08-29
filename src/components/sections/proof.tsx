import Image from "next/image";
import { Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Reveal } from "@/components/ui/reveal";
import { PLATFORM_STATS } from "@/data/stats";

export function Proof() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-8 border-b border-line pb-16 sm:grid-cols-4">
          {PLATFORM_STATS.map((stat) => (
            <RevealItem key={stat.label} className="text-center sm:text-left">
              <p className="text-3xl font-semibold tracking-tight text-ink-900 sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-ink-500">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mx-auto mt-16 max-w-3xl text-center">
          <Quote className="mx-auto h-8 w-8 text-brand-300" />
          <p className="text-balance mt-6 text-xl font-medium leading-relaxed text-ink-900 sm:text-2xl">
            &ldquo;Most plants do not have a compliance problem. They have an
            observability problem. Factro closes that gap in the
            architecture, not with another checklist.&rdquo;
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 rounded-full border border-line bg-white p-1"
            />
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
