import { motion } from "motion/react";
import { EDUCATION } from "@/data/portfolio";
import { SectionLabel } from "./motion-primitives";

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
      <SectionLabel index="05">Education</SectionLabel>

      <div className="relative">
        <motion.span
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-border"
        />
        {EDUCATION.map((e, i) => (
          <motion.div
            key={e.degree}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group relative grid gap-2 py-8 pl-8 md:grid-cols-[180px_1fr] md:gap-10 md:pl-12"
          >
            <span className="absolute -left-[4px] top-11 size-2 rounded-full bg-border transition-colors duration-400 group-hover:bg-copper" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper md:pt-2">
              {e.period}
            </p>
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-[-0.03em] md:text-3xl">
                {e.degree}
              </h3>
              <p className="mt-1.5 text-muted-foreground">{e.school}</p>
              {e.detail && (
                <p className="mt-2 font-mono text-xs tracking-[0.12em] text-sand">{e.detail}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
