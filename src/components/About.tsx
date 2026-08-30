import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/data/portfolio";
import { Reveal, RevealText, SectionLabel } from "./motion-primitives";

const FACTS = [
  { value: "7th Semester", label: "BS Software Engineering" },
  { value: "3.66", label: "CGPA", counter: 3.66 },
  { value: "AI + Full Stack", label: "Core Focus" },
];

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return <span ref={ref}>{v.toFixed(2)}</span>;
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-24">
      <SectionLabel index="01">About</SectionLabel>

      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[500px] [perspective:1200px]"
          >
            <div className="absolute -left-5 top-8 h-[78%] w-[78%] rounded-[1.75rem] border border-border bg-white/40 shadow-[0_24px_55px_rgba(23,33,43,0.12)]" />
            <div className="depth-card relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border bg-card">
              {PROFILE.aboutImageUrl ? (
                <img
                  src={PROFILE.aboutImageUrl}
                  alt="Alishba Fatima working"
                  loading="lazy"
                  className="size-full object-cover"
                />
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    ABOUT_IMAGE_URL
                  </span>
                  <span className="text-xs text-muted-foreground/70">
                    Professional photograph goes here
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            <RevealText text="Building with Code, intelligence, and purpose." />
          </h2>

          <Reveal delay={1} className="mt-8 max-w-xl space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              I'm Alishba Fatima, a BS Software Engineering student at Sir Syed University of
              Engineering &amp; Technology (SSUET), currently in my 7th semester. I work across AI,
              full-stack development, mobile applications, backend systems and software engineering.
            </p>
            <p>
              I care about software that is genuinely useful — clean architecture, thoughtful
              interfaces, and systems that hold up under real users.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="depth-card group rounded-[1.25rem] p-6"
              >
                <div className="font-display text-2xl font-semibold tracking-tight text-copper">
                  {f.counter ? <Counter to={f.counter} /> : f.value}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {f.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
