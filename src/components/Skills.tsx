import { motion } from "motion/react";
import { useState } from "react";
import { SKILLS } from "@/data/portfolio";
import { Reveal, SectionLabel } from "./motion-primitives";

export function Skills() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="skills" className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
      <SectionLabel index="04">Skills</SectionLabel>

      <div className="grid gap-4 md:grid-cols-2">
        {SKILLS.map((group, gi) => (
          <Reveal key={group.label} delay={gi}>
            <div className="depth-card h-full rounded-[1.5rem] p-7 md:p-10">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper">
                {group.label}
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {group.items.map((s) => (
                  <motion.li
                    key={s}
                    onHoverStart={() => setActive(s)}
                    onHoverEnd={() => setActive(null)}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`cursor-default rounded-full border px-4 py-2.5 font-display text-base tracking-tight shadow-[0_8px_20px_rgba(23,33,43,0.08)] transition-all duration-300 md:text-lg ${
                      active === s
                        ? "border-copper bg-copper text-primary-foreground"
                        : "border-border bg-white/60 text-foreground"
                    }`}
                  >
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
