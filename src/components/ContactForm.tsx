"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "./Reveal";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if ((fd.get("_honey") as string)?.length) return; // bot trap
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(SITE.contactEmail)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          message: fd.get("message"),
          _subject: "New message from the NG Studio website",
          _template: "table",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.success === "true" || json.success === true)) {
        setStatus("sent");
        form.reset();
      } else {
        setError(json.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-2xl border border-line bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-muted focus:border-coral focus:bg-paper";

  return (
    <div className="mx-auto max-w-2xl">
      <Reveal>
        <div className="relative overflow-hidden rounded-[32px] border border-line bg-paper p-6 shadow-lift sm:p-9">
          <div
            className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-sun), transparent 70%)" }}
          />

          {status === "sent" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative flex flex-col items-center gap-4 py-10 text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 14 }}
                className="grid h-16 w-16 place-items-center rounded-full bg-leaf/15 text-leaf"
              >
                <CheckCircle2 size={34} />
              </motion.div>
              <h3 className="font-display text-2xl font-extrabold">Message sent! 🎉</h3>
              <p className="max-w-sm text-ink-soft">
                Thanks for reaching out — we&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-2 rounded-xl border-2 border-ink px-5 py-2.5 text-sm font-bold"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} className="relative grid gap-4">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 text-sm font-bold tracking-[0.18em] text-coral uppercase">
                  <span className="h-0.5 w-8 rounded-full bg-coral" /> Say hello
                </p>
                <h3 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Get in touch
                </h3>
                <p className="mt-2 text-ink-soft">
                  Feedback, a bug, or a hello — drop us a message and we&apos;ll reply by email.
                </p>
              </div>

              {/* honeypot */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="text-sm font-semibold text-ink-soft">Your name</span>
                  <input name="name" required placeholder="Jane Doe" className={field} />
                </label>
                <label className="grid gap-1.5">
                  <span className="text-sm font-semibold text-ink-soft">Your email</span>
                  <input name="email" type="email" required placeholder="you@email.com" className={field} />
                </label>
              </div>

              <label className="grid gap-1.5">
                <span className="text-sm font-semibold text-ink-soft">Message</span>
                <textarea name="message" required rows={5} placeholder="Tell us what's on your mind…" className={`${field} resize-y`} />
              </label>

              {status === "error" && (
                <p className="rounded-xl bg-coral-soft px-4 py-3 text-sm font-semibold text-coral">{error}</p>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileTap={{ scale: 0.97 }}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-ink px-6 py-3.5 font-display font-bold text-white disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </div>
      </Reveal>
    </div>
  );
}
