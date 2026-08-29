import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Check, Loader2, Mail, Phone } from "lucide-react";
import { CONTACT, PROJECT_TYPES } from "@/data/portfolio";
import { sendContactMessage } from "@/lib/contact.functions";
import { Reveal, RevealText, SectionLabel } from "./motion-primitives";

const field =
  "w-full border border-border bg-transparent px-4 py-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-copper";

export function Contact() {
  const send = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    setError("");
    try {
      await send({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          projectType: String(fd.get("projectType") || ""),
          budget: String(fd.get("budget") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please email me directly.",
      );
    }
  }

  return (
    <section id="contact" className="grain relative border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-10 md:py-36">
        <SectionLabel index="06">Let's Work Together</SectionLabel>

        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] font-semibold leading-[0.98] tracking-[-0.04em]">
              <RevealText text="Have a project in mind?" />
              <br />
              <span className="text-copper">
                <RevealText text="Let's build it." delay={0.2} />
              </span>
            </h2>

            <Reveal delay={1} className="mt-8 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                Whether you need an AI-powered application, a full-stack product, a mobile
                application, or a custom software solution, let's talk.
              </p>
            </Reveal>

            <Reveal delay={2} className="mt-12 space-y-px border border-border bg-border">
              <a
                href={`mailto:${CONTACT.email}`}
                className="group flex items-center gap-4 bg-background p-5 transition-colors hover:bg-card"
              >
                <Mail className="size-4 text-copper" />
                <span className="text-sm">{CONTACT.email}</span>
              </a>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 bg-background p-5 transition-colors hover:bg-card"
              >
                <Phone className="size-4 text-copper" />
                <span className="text-sm">{CONTACT.phone}</span>
              </a>
              <div className="flex flex-wrap gap-6 bg-background p-5 text-sm">
                {CONTACT.linkedinUrl ? (
                  <a href={CONTACT.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-copper">
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-muted-foreground/60">LinkedIn unavailable</span>
                )}
              </div>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <div className="relative border border-border bg-card/40 p-6 md:p-10">
              <AnimatePresence mode="wait">
                {status === "sent" ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 14 }}
                      className="flex size-16 items-center justify-center rounded-full border border-copper text-copper"
                    >
                      <Check className="size-7" />
                    </motion.span>
                    <h3 className="mt-6 font-display text-3xl font-semibold tracking-tight">
                      Message sent
                    </h3>
                    <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                      Thank you for reaching out — I'll get back to you shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 border border-border px-6 py-3 text-sm transition-colors hover:border-copper hover:text-copper"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    className="space-y-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-copper">
                      Start a Project
                    </p>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" className="sr-only">
                          Name
                        </label>
                        <input id="c-name" name="name" required placeholder="Name" className={field} />
                      </div>
                      <div>
                        <label htmlFor="c-email" className="sr-only">
                          Email
                        </label>
                        <input
                          id="c-email"
                          name="email"
                          type="email"
                          required
                          placeholder="Email"
                          className={field}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-type" className="sr-only">
                          Project type
                        </label>
                        <select id="c-type" name="projectType" required defaultValue="" className={field}>
                          <option value="" disabled>
                            Project type
                          </option>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-background">
                              {t}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="c-budget" className="sr-only">
                          Budget (optional)
                        </label>
                        <input
                          id="c-budget"
                          name="budget"
                          placeholder="Budget (optional)"
                          className={field}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="c-message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        id="c-message"
                        name="message"
                        required
                        rows={6}
                        placeholder="Tell me about your project"
                        className={`${field} resize-none`}
                      />
                    </div>

                    {status === "error" && (
                      <p role="alert" className="text-sm text-destructive">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative w-full overflow-hidden bg-copper px-6 py-4 text-sm font-medium text-primary-foreground disabled:opacity-70"
                    >
                      <span className="relative flex items-center justify-center gap-2">
                        {status === "sending" && <Loader2 className="size-4 animate-spin" />}
                        {status === "sending" ? "Sending…" : "Send Message"}
                      </span>
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
