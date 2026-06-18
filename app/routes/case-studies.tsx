import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BackgroundFX } from "../../components/background-fx";
import { SiteHeader } from "../../components/site-header";
import { CASE_STUDIES } from "../../lib/case-studies";
import { seo } from "../../lib/seo";

export function meta() {
  return seo({
    title: "Case Studies — Bigya Tuladhar",
    description:
      "Engineering case studies: IoT Core → AppSync, AI RAG copilots, live telemetry with Valkey, Flutter QR check-in, and cutting AWS cost 50–60%.",
    path: "/case-studies",
  });
}

export default function CaseStudiesIndex() {
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white antialiased scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        <section className="relative pt-28 md:pt-36">
          <div className="mx-auto max-w-6xl px-6">
            <a href="/#projects" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              {"Back to portfolio"}
            </a>

            <div className="mt-6 text-sm uppercase tracking-widest text-white/50">{"Deep dives"}</div>
            <h1 className="mt-3 bg-gradient-to-r from-fuchsia-300 via-purple-300 to-emerald-300 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
              {"Case Studies"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              {
                "The decisions behind the systems — why I chose what I chose, the trade-offs, and what the numbers did. Problem → options → decision → results."
              }
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {CASE_STUDIES.map((c, i) => (
                <motion.a
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                  whileHover={{ y: -4, boxShadow: `0 18px 50px -16px ${c.accent}` }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-3xl"
                    style={{ background: c.accent }}
                  />
                  <div className="relative">
                    <div className="text-xs uppercase tracking-widest text-white/50">{c.duration}</div>
                    <div className="mt-2 text-xl font-semibold text-white">{c.title}</div>
                    <div className="mt-1 text-sm text-white/70">{c.tagline}</div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {c.stack.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 inline-flex items-center gap-1 text-sm font-medium" style={{ color: c.accent }}>
                      {"Read case study"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mt-24 border-t border-white/10 bg-black/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <a href="/" className="text-sm text-white/60 hover:text-white">
            {"← Bigya Tuladhar"}
          </a>
          <div className="text-sm text-white/60">
            {"© "}
            {new Date().getFullYear()}
            {" BIGYA TULADHAR"}
          </div>
        </div>
      </footer>
    </div>
  );
}
