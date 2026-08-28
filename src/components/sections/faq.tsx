"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { FAQS, type FaqItem } from "@/data/faq";
import { cn } from "@/lib/utils";

export function Faq({
  id = "faq",
  eyebrow = "FAQ",
  title = "Questions, answered",
  description = "Everything you need to know before bringing Factro to your plant.",
  faqs = FAQS,
}: {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  faqs?: FaqItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={id} className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className="mt-14 flex flex-col divide-y divide-line border-t border-b border-line">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq.question} delay={i * 0.03}>
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium text-ink-900">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-50 text-ink-500 transition-transform duration-300",
                        isOpen && "rotate-45 bg-brand-50 text-brand-600",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm leading-relaxed text-ink-500">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
