import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[1400px] items-center justify-between px-6 transition-all duration-500 md:px-10 ${
            scrolled ? "h-16" : "h-20 md:h-24"
          }`}
        >
          <button
            onClick={() => scrollToId("home")}
            className="group font-display text-base font-semibold tracking-tight"
          >
            Alishba<span className="text-copper">.</span>
            <span className="ml-2 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
              AI · Full-Stack
            </span>
          </button>

          <ul className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => scrollToId(l.id)}
                  className="group relative py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-copper transition-transform duration-400 group-hover:scale-x-100" />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToId("contact")}
              className="group relative hidden overflow-hidden border border-copper px-5 py-2.5 text-sm text-copper sm:block"
            >
              <span className="absolute inset-0 -translate-y-full bg-copper transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="relative transition-colors duration-300 group-hover:text-primary-foreground">
                Let's Work Together
              </span>
            </button>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex size-11 items-center justify-center border border-border lg:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-background lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <span className="font-display text-base font-semibold">
                Alishba<span className="text-copper">.</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center border border-border"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="mt-6 px-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-border"
                >
                  <button
                    onClick={() => {
                      setOpen(false);
                      setTimeout(() => scrollToId(l.id), 350);
                    }}
                    className="flex w-full items-baseline gap-4 py-5 text-left"
                  >
                    <span className="font-mono text-[10px] text-copper">0{i + 1}</span>
                    <span className="font-display text-3xl tracking-tight">{l.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="px-6 pt-8"
            >
              <button
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollToId("contact"), 350);
                }}
                className="w-full bg-copper px-6 py-4 text-sm font-medium text-primary-foreground"
              >
                Let's Work Together
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
