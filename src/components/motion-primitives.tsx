import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

export function useMotionOK() {
  return !useReducedMotion();
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: _as,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: never;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word text reveal. */
export function RevealText({
  text,
  className,
  delay = 0,
  inView = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...(inView ? { whileInView: "show" as const } : { animate: "show" as const })}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.045, delayChildren: delay }}
      style={{ display: "inline-block" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <Reveal className="mb-10 flex items-center gap-4 md:mb-14">
      <span className="font-mono text-xs tracking-[0.25em] text-copper">{index}</span>
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {children}
      </span>
      <span className="h-px flex-1 bg-border" />
    </Reveal>
  );
}
