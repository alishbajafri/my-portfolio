import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ExternalLink, Github, Play, X } from "lucide-react";
import { youtubeId, type Project } from "@/data/portfolio";

function MediaFrame({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  const vid = youtubeId(project.videoUrl);

  if (playing && vid) {
    return (
      <div className="aspect-video w-full bg-black">
        <iframe
          className="size-full"
          src={`https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&mute=1&rel=0`}
          title={`${project.title} demo video`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-border bg-card">
      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={`${project.title} screenshot`}
          loading="lazy"
          className="size-full object-cover"
        />
      ) : vid ? (
        <img
          src={`https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`}
          alt={`${project.title} demo thumbnail`}
          loading="lazy"
          className="size-full object-cover"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            PROJECT_IMAGE_URL
          </span>
          <span className="text-xs text-muted-foreground/70">Screenshot goes here</span>
        </div>
      )}
      {vid && (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play ${project.title} demo`}
          className="group absolute inset-0 flex items-center justify-center bg-background/40 transition-colors hover:bg-background/20"
        >
          <span className="flex size-16 items-center justify-center rounded-full bg-copper text-primary-foreground transition-transform duration-400 group-hover:scale-110">
            <Play className="ml-0.5 size-6 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  const vid = project ? youtubeId(project.videoUrl) : null;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[70] overflow-y-auto bg-background/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto my-8 w-[min(1100px,92vw)] border border-border bg-background"
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-border bg-background/95 px-6 py-5 backdrop-blur md:px-10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper">
                  {project.category}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.03em] md:text-5xl">
                  {project.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close project"
                className="flex size-11 shrink-0 items-center justify-center border border-border transition-colors hover:border-copper hover:text-copper"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-10">
              <MediaFrame project={project} />

              {!vid && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Demo coming soon — add PROJECT_VIDEO_URL
                </p>
              )}

              <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.description}
              </p>

              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Key features
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {project.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm">
                        <span className="mt-2 size-1 shrink-0 bg-copper" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Technology stack
                  </h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((t) => (
                      <span
                        key={t}
                        className="border border-border px-3 py-1.5 font-mono text-[11px] text-sand"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {project.apps && (
                <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3">
                  {project.apps.map((app) => (
                    <div key={app.name} className="bg-background p-6">
                      <div className="mb-4 aspect-video border border-border bg-card">
                        {app.imageUrl ? (
                          <img
                            src={app.imageUrl}
                            alt={`${app.name} screenshot`}
                            loading="lazy"
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="flex size-full items-center justify-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                            PROJECT_IMAGE_URL
                          </div>
                        )}
                      </div>
                      <h5 className="font-display text-lg tracking-tight">{app.name}</h5>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {app.description}
                      </p>
                      {youtubeId(app.videoUrl) ? (
                        <a
                          href={app.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex items-center gap-2 text-xs text-copper underline-offset-4 hover:underline"
                        >
                          <Play className="size-3" /> Watch demo
                        </a>
                      ) : (
                        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/70">
                          Demo coming soon
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
                <ActionLink href={project.liveUrl} label="View Live" icon={ExternalLink} primary />
                <ActionLink href={project.githubUrl} label="View Code" icon={Github} />
                <ActionLink href={project.videoUrl} label="Watch Demo" icon={Play} />
                {project.caseStudyUrl && (
                  <ActionLink href={project.caseStudyUrl} label="Case Study" icon={ExternalLink} />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ActionLink({
  href,
  label,
  icon: Icon,
  primary,
}: {
  href: string;
  label: string;
  icon: typeof Play;
  primary?: boolean;
}) {
  if (!href) {
    return (
      <span className="flex cursor-not-allowed items-center gap-2 border border-border/60 px-6 py-3.5 text-sm text-muted-foreground/60">
        <Icon className="size-4" /> {label} — link coming soon
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group relative flex items-center gap-2 overflow-hidden border px-6 py-3.5 text-sm transition-colors ${
        primary ? "border-copper bg-copper text-primary-foreground" : "border-border hover:border-copper hover:text-copper"
      }`}
    >
      <Icon className="size-4" /> {label}
    </a>
  );
}
