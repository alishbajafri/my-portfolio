import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useState, type MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { PROJECTS, youtubeId, type Project } from "@/data/portfolio";
import { SectionLabel } from "./motion-primitives";
import { ProjectModal } from "./ProjectModal";

function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 140, damping: 20, mass: 0.4 });
  const rotate = useTransform(sx, [-300, 300], [-6, 6]);
  const [hover, setHover] = useState(false);

  const vid = youtubeId(project.videoUrl);
  const preview = project.imageUrl || (vid ? `https://i.ytimg.com/vi/${vid}/hqdefault.jpg` : "");

  function move(e: MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-border"
    >
      <button
        onClick={onOpen}
        onMouseMove={move}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative flex w-full flex-col gap-6 py-8 text-left md:flex-row md:items-center md:gap-10 md:py-12"
      >
        <motion.span
          animate={{ x: hover ? 12 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[11px] tracking-[0.2em] text-copper md:w-16"
        >
          0{index + 1}
        </motion.span>

        <motion.div
          animate={{ x: hover ? 16 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <h3 className="font-display text-[clamp(1.75rem,5.5vw,4.25rem)] font-semibold leading-[1] tracking-[-0.04em] transition-colors duration-400 group-hover:text-copper">
            {project.title}
          </h3>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {project.category}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:hidden">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((t) => (
              <span
                key={t}
                className="border border-border px-2.5 py-1 font-mono text-[10px] text-muted-foreground transition-colors duration-300 group-hover:border-copper/40 group-hover:text-sand"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* mobile / tablet static preview */}
        <div className="aspect-video w-full overflow-hidden border border-border bg-card md:hidden">
          {preview ? (
            <img
              src={preview}
              alt={`${project.title} preview`}
              loading="lazy"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              PROJECT_IMAGE_URL
            </div>
          )}
        </div>

        {/* desktop cursor-following preview */}
        <motion.div
          style={{ x: sx, y: sy, rotate }}
          animate={{ opacity: hover ? 1 : 0, scale: hover ? 1 : 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute right-[12%] top-1/2 z-10 hidden aspect-video w-[300px] -translate-y-1/2 overflow-hidden border border-border bg-card md:block"
        >
          {preview ? (
            <img
              src={preview}
              alt=""
              aria-hidden
              loading="lazy"
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              PROJECT_IMAGE_URL
            </div>
          )}
        </motion.div>

        <motion.span
          animate={{ rotate: hover ? 45 : 0, borderColor: hover ? "var(--copper)" : "var(--border)" }}
          transition={{ duration: 0.4 }}
          className="relative z-20 hidden size-12 shrink-0 items-center justify-center border text-copper md:flex"
        >
          <ArrowUpRight className="size-5" />
        </motion.span>
      </button>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
      <SectionLabel index="03">Selected Work</SectionLabel>

      <div className="border-t border-border">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
