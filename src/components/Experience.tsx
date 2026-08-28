import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { EXPERIENCE } from "@/data/portfolio";
import { Reveal, SectionLabel } from "./motion-primitives";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="experience"
      className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36"
    >
      <SectionLabel index="02">Experience</SectionLabel>

      <div className="grid gap-12 lg:grid-cols-[0.4fr_1fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">
              {EXPERIENCE.period}
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {EXPERIENCE.location}
            </p>
          </div>
        </Reveal>

        <div className="relative border-l border-border pl-8 md:pl-12">
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-copper"
          />
          <Reveal>
            <h3 className="font-display text-[clamp(1.75rem,4vw,3rem)] font-semibold leading-tight tracking-[-0.03em]">
              {EXPERIENCE.role}
            </h3>
            <p className="mt-2 text-base text-copper md:text-lg">{EXPERIENCE.company}</p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              {EXPERIENCE.summary}
            </p>
          </Reveal>

          <div className="mt-10 border-t border-border">
            {EXPERIENCE.groups.map((g, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={g.label} delay={i}>
                  <div className="border-b border-border">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                    >
                      <span className="font-display text-lg tracking-tight transition-colors duration-300 group-hover:text-copper md:text-xl">
                        {g.label}
                      </span>
                      <span className="flex size-8 shrink-0 items-center justify-center border border-border text-copper transition-colors duration-300 group-hover:border-copper">
                        {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="grid gap-2 pb-6 sm:grid-cols-2">
                            {g.items.map((item, k) => (
                              <motion.li
                                key={item}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 + k * 0.04, duration: 0.4 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="mt-2 size-1 shrink-0 bg-copper" />
                                {item}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
