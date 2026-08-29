import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";
import { CONTACT, PROFILE } from "@/data/portfolio";
import { RevealText } from "./motion-primitives";

const DISCIPLINES = ["AI", "Full-Stack Development", "Mobile Applications", "Software Engineering"];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0.15]);

  return (
    <section
      id="home"
      ref={ref}
      className="grain relative flex min-h-[88svh] flex-col justify-end overflow-hidden pt-20"
    >
      {/* ambient background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={reduced ? {} : { opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="hero-3d-orb -right-28 top-8 size-[52vw] max-w-[700px] opacity-80"
        />
        <motion.div
          animate={reduced ? {} : { opacity: [0.22, 0.45, 0.22], y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="hero-3d-orb left-[-8%] top-[18%] size-[28vw] max-w-[320px] opacity-70"
        />
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px)] [background-size:12.5%_100%]" />
      </div>

      <motion.div style={{ y, opacity: fade }} className="relative mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-copper opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-copper" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Available for freelance projects &amp; opportunities
          </span>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <h1 className="font-display text-[clamp(3rem,11vw,10.5rem)] font-semibold leading-[0.86] tracking-[-0.045em]">
              <RevealText text="Alishba" inView={false} delay={0.25} />
              <br />
              <span className="text-sand">
                <RevealText text="Fatima" inView={false} delay={0.4} />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 font-display text-xl tracking-tight text-copper sm:text-2xl"
            >
              AI Engineer &amp; Full-Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Software Engineering student building intelligent, scalable, and user-focused digital
              experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => scrollToId("projects")}
                className="group relative overflow-hidden bg-sand px-7 py-4 text-sm font-medium text-background"
              >
                <span className="absolute inset-0 -translate-x-full bg-copper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                <span className="relative flex items-center gap-2">
                  View My Work
                  <ArrowDownRight className="size-4 transition-transform duration-400 group-hover:translate-y-0.5" />
                </span>
              </button>

              <button
                onClick={() => scrollToId("contact")}
                className="group relative overflow-hidden border border-border px-7 py-4 text-sm font-medium"
              >
                <span className="absolute inset-0 -translate-y-full bg-secondary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative flex items-center gap-2">
                  Let's Work Together
                  <ArrowUpRight className="size-4 transition-transform duration-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </button>

              {CONTACT.cvUrl ? (
                <a
                  href={CONTACT.cvUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 px-2 py-4 text-sm text-muted-foreground underline-offset-8 transition-colors hover:text-copper hover:underline"
                >
                  <Download className="size-4" /> Download CV
                </a>
              ) : (
                <span className="flex items-center gap-2 px-2 py-4 text-sm text-muted-foreground/60">
                  <Download className="size-4" /> Download CV unavailable
                </span>
              )}
            </motion.div>
          </div>

          {/* profile image slot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-[430px] [perspective:1200px]">
              <div className="absolute -left-8 top-8 h-[72%] w-[76%] rounded-[1.75rem] border border-border/80 bg-copper/10 blur-sm" />
              <div className="absolute -right-5 bottom-8 h-[58%] w-[52%] rounded-[1.5rem] border border-border/80 bg-white/30" />
              <div className="depth-card relative aspect-[4/5] w-full overflow-hidden rounded-[1.75rem] bg-card">
                {PROFILE.heroImageUrl ? (
                  <img
                    src={PROFILE.heroImageUrl}
                    alt="Portrait of Alishba Fatima"
                    loading="eager"
                    className="size-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                  />
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-2 p-6 text-center">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      PROFILE_IMAGE_URL
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      Professional photo goes here
                    </span>
                  </div>
                )}
                <span className="absolute -left-px -top-px size-3 border-l border-t border-copper" />
                <span className="absolute -bottom-px -right-px size-3 border-b border-r border-copper" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* discipline marquee */}
        <div className="mt-14 overflow-hidden border-y border-border py-4 md:mt-20">
          <motion.div
            animate={reduced ? {} : { x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex w-max gap-10 whitespace-nowrap"
          >
            {[...Array(4)].map((_, r) =>
              DISCIPLINES.map((d) => (
                <span
                  key={`${r}-${d}`}
                  className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground"
                >
                  {d}
                  <span className="text-copper">◆</span>
                </span>
              )),
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
