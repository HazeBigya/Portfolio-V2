import { useParams } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Sparkles, X } from "lucide-react";
import { BackgroundFX } from "../../components/background-fx";
import { SiteHeader } from "../../components/site-header";
import { FlowDiagram } from "../../components/flow-diagram";
import { getCaseStudy } from "../../lib/case-studies";
import { seo, SITE_URL, SITE_NAME } from "../../lib/seo";

export function meta({ params }: { params: { slug?: string } }) {
  const study = getCaseStudy(params.slug);
  if (!study) {
    return seo({ title: "Case study not found · Bigya Tuladhar", description: "Case study not found.", path: "/case-studies" });
  }
  const path = `/case-studies/${study.slug}`;
  return [
    ...seo({
      title: `${study.title} · Case Study — Bigya Tuladhar`,
      description: study.tagline + " — " + study.problem.slice(0, 150),
      path,
      type: "article",
    }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: study.title,
        description: study.tagline,
        author: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
        mainEntityOfPage: `${SITE_URL}${path}`,
        keywords: study.stack.join(", "),
      },
    },
  ];
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <div className="relative min-h-screen overflow-clip bg-black text-white">
        <SiteHeader />
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-4 px-6 text-center">
          <h1 className="text-2xl font-semibold">{"Case study not found"}</h1>
          <a href="/case-studies" className="text-emerald-300 hover:underline">
            {"← All case studies"}
          </a>
        </div>
      </div>
    );
  }

  const reveal = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10%" },
    transition: { duration: 0.35, ease: "easeOut" },
  } as const;

  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white antialiased scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        {/* HERO */}
        <section className="relative pt-28 md:pt-36">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: study.accent }}
          />
          <div className="mx-auto max-w-4xl px-6">
            <a href="/case-studies" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              {"All case studies"}
            </a>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-white/50">
              {study.duration && <span>{study.duration}</span>}
              {study.role && <span className="text-white/30">·</span>}
              {study.role && <span>{study.role}</span>}
            </div>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{study.title}</h1>
            <p className="mt-4 text-lg text-white/70">{study.tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {study.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white"
                  style={{ boxShadow: `inset 0 0 0 1px ${study.accent}33` }}
                >
                  {s}
                </span>
              ))}
            </div>

            {study.demoHref && (
              <a
                href={study.demoHref}
                className="group mt-6 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-black"
                style={{ background: study.accent }}
              >
                <Sparkles className="h-4 w-4" />
                {study.demoLabel ?? "Try the live demo"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}

            <div
              className="mt-8 h-1 w-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${study.accent}, transparent)` }}
            />
          </div>
        </section>

        {/* RESULTS up top — the payoff first */}
        <section className="relative mt-12">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div {...reveal} className="grid gap-4 sm:grid-cols-3">
              {study.results.map((r) => (
                <div key={r.metric} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-bold" style={{ color: study.accent }}>
                    {r.value}
                  </div>
                  <div className="mt-1 text-sm text-white/70">{r.metric}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROBLEM (terse studies only — sectioned studies fold this into their article) */}
        {!study.sections && (
          <Section title="The problem" reveal={reveal}>
            <p className="text-white/80 leading-relaxed">{study.problem}</p>
          </Section>
        )}

        {/* OPTIONS */}
        {study.options.length > 0 && (
          <Section title="Options on the table" reveal={reveal}>
            <div className="space-y-3">
              {study.options.map((o) => {
                const chosen = o.verdict === "chosen";
                return (
                  <div
                    key={o.label}
                    className={`flex gap-3 rounded-2xl border p-4 ${
                      chosen ? "border-emerald-500/30 bg-emerald-500/5" : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div
                      className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        chosen ? "bg-emerald-400 text-black" : "bg-white/10 text-white/60"
                      }`}
                    >
                      {chosen ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                    </div>
                    <div>
                      <div className="font-medium text-white">{o.label}</div>
                      <div className="mt-0.5 text-sm text-white/70">{o.note}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* ARCHITECTURE DIAGRAM — real image if provided, else node-flow */}
        {(study.diagramImage || study.diagram) && (
          <Section title="Architecture at a glance" reveal={reveal}>
            {study.diagramImage ? (
              <a
                href={study.diagramImage}
                target="_blank"
                rel="noreferrer"
                className="block overflow-hidden rounded-2xl border border-white/10 bg-white"
              >
                <img
                  src={study.diagramImage}
                  alt={`${study.title} — architecture diagram`}
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
              </a>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-5">
                <FlowDiagram nodes={study.diagram!} accent={study.accent} />
              </div>
            )}
          </Section>
        )}

        {/* LONG-FORM ARTICLE (sectioned studies) or terse decision/architecture */}
        {study.sections ? (
          study.sections.map((s) => (
            <Section key={s.heading} title={s.heading} reveal={reveal}>
              {s.paragraphs?.map((p, i) => (
                <p key={i} className="mt-4 text-[17px] leading-relaxed text-white/80 first:mt-0">
                  {p}
                </p>
              ))}
              {s.bullets && (
                <ul className="mt-5 space-y-4">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: study.accent }}
                      />
                      <span className="text-[17px] leading-relaxed text-white/80">
                        {b.label && <span className="font-semibold text-white">{b.label}: </span>}
                        {b.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Section>
          ))
        ) : (
          <>
            <Section title="The decision" reveal={reveal}>
              <p className="text-white/80 leading-relaxed">{study.decision}</p>
            </Section>
            <Section title="How it works" reveal={reveal}>
              <ol className="space-y-3">
                {study.architecture.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-black"
                      style={{ background: study.accent }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-white/80">{step}</span>
                  </li>
                ))}
              </ol>
            </Section>
          </>
        )}

        {/* LESSON */}
        <Section title="What I took away" reveal={reveal}>
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 p-6 text-lg text-white/85">
            {study.lesson}
          </div>
        </Section>

        {/* CTA */}
        <section className="relative mt-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-white/80">{"Want the deeper architecture behind this? Let's talk."}</div>
              <a
                href="/#contact"
                className="inline-flex items-center gap-1 rounded-md border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                {"Get in touch"}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-8">
              <a href="/case-studies" className="text-sm text-white/60 hover:text-white">
                {"← All case studies"}
              </a>
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

function Section({
  title,
  reveal,
  children,
}: {
  title: string;
  reveal: object;
  children: React.ReactNode;
}) {
  return (
    <section className="relative mt-14">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div {...reveal}>
          <h2 className="mb-4 text-sm uppercase tracking-widest text-white/50">{title}</h2>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
