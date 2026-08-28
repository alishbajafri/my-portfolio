import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { CONTACT } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="grain relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-14 md:px-10 md:py-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
              Alishba Fatima
            </p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              AI Engineer &amp; Full-Stack Developer
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
            <FooterLink href={CONTACT.linkedinUrl} label="LinkedIn" placeholder="LINKEDIN_URL" />
            <FooterLink href={CONTACT.githubUrl} label="GitHub" placeholder="GITHUB_URL" />
            <FooterLink href={`mailto:${CONTACT.email}`} label="Email" placeholder="" />
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] tracking-[0.12em] text-muted-foreground">
            © 2026 Alishba Fatima. All rights reserved.
          </p>
          <motion.button
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-copper"
          >
            Back to top
            <span className="flex size-9 items-center justify-center border border-border transition-colors group-hover:border-copper">
              <ArrowUp className="size-4" />
            </span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  placeholder,
}: {
  href: string;
  label: string;
  placeholder: string;
}) {
  if (!href) {
    return (
      <span
        title={`Add ${placeholder} in src/data/portfolio.ts`}
        className="text-sm text-muted-foreground/60"
      >
        {label} — {placeholder}
      </span>
    );
  }
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      className="group relative text-sm transition-colors hover:text-copper"
    >
      {label}
      <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-copper transition-transform duration-400 group-hover:scale-x-100" />
    </a>
  );
}
