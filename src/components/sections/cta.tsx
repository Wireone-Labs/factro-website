import { ArrowRight, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BOOK_DEMO_HREF, SALES_MAILTO } from "@/data/nav";

export function Cta({
  id = "cta",
  title = "See Factro run on your own production data",
  description = "Book a walkthrough with our team and see how production, quality, and compliance come together in one plant record.",
  primaryLabel = "Book a demo",
  primaryHref = BOOK_DEMO_HREF,
  secondaryLabel = "Email our team",
  secondaryHref = SALES_MAILTO,
}: {
  id?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section id={id} className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-ink-950 px-8 py-16 text-center sm:px-16 sm:py-20">
            <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/30 blur-3xl" />

            <div className="relative">
              <h2 className="text-balance mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {title}
              </h2>
              <p className="text-balance mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink-300">
                {description}
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href={primaryHref} variant="dark" size="lg" className="group">
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
                <Button
                  href={secondaryHref}
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {secondaryLabel}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
