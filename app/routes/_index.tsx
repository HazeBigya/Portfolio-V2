import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { ArrowDownToLine, Zap, Brain, Languages, Clock } from "lucide-react";
import { BackgroundFX } from "../../components/background-fx";
import { ContactActions } from "../../components/contact-actions";
import { motion } from "framer-motion";
import { SectionHeader } from "../../components/section-header";
import { SiteHeader } from "../../components/site-header";
import { ExperienceTimeline } from "../../components/experience-timeline";
import { AIOrbs } from "../../components/ai-orbs";
import { HeroAIVisual } from "../../components/hero-ai-visual";
import { ResumePreview } from "../../components/resume-preview";
import { SkillBadge } from "../../components/skill-badge";
import { ProjectCard } from "../../components/project-card";
import { PROJECTS } from "../../lib/projects";
import { CASE_STUDIES } from "../../lib/case-studies";
import { ArrowRight } from "lucide-react";
import { seo, SITE_URL, SITE_NAME } from "../../lib/seo";
import { PROFILE, META, STATS, HERO_CHIPS, SKILL_GROUPS, EXPERIENCE, EDUCATION, type Accent } from "../../data/cv";

/* Accent → Tailwind classes for the skill-group cards. */
const SKILL_ACCENT: Record<Accent, { card: string; title: string; badge: string }> = {
  fuchsia: {
    card: "from-fuchsia-500/10",
    title: "text-fuchsia-300",
    badge: "border-fuchsia-500/20 bg-fuchsia-500/10 text-white hover:bg-fuchsia-500/20",
  },
  purple: {
    card: "from-purple-500/10",
    title: "text-purple-300",
    badge: "border-purple-500/20 bg-purple-500/10 text-white hover:bg-purple-500/20",
  },
  amber: {
    card: "from-amber-500/10",
    title: "text-amber-300",
    badge: "border-amber-500/20 bg-amber-500/10 text-white hover:bg-amber-500/20",
  },
  rose: {
    card: "from-rose-500/10",
    title: "text-rose-300",
    badge: "border-rose-500/20 bg-rose-500/10 text-white hover:bg-rose-500/20",
  },
  emerald: {
    card: "from-emerald-500/10",
    title: "text-emerald-300",
    badge: "border-emerald-500/20 bg-emerald-500/10 text-white hover:bg-emerald-500/20",
  },
  blue: {
    card: "from-blue-500/10",
    title: "text-blue-300",
    badge: "border-blue-500/20 bg-blue-500/10 text-white hover:bg-blue-500/20",
  },
};

/* Accent → chip dot colour for the hero stat badges. */
const STAT_ACCENT: Record<Accent, { badge: string; dot: string }> = {
  emerald: { badge: "border-emerald-500/20 bg-emerald-500/10 hover:bg-emerald-500/20", dot: "bg-emerald-400" },
  purple: { badge: "border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20", dot: "bg-purple-400" },
  fuchsia: { badge: "border-fuchsia-500/20 bg-fuchsia-500/10 hover:bg-fuchsia-500/20", dot: "bg-fuchsia-400" },
  amber: { badge: "border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20", dot: "bg-amber-400" },
  rose: { badge: "border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20", dot: "bg-rose-400" },
  blue: { badge: "border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20", dot: "bg-blue-400" },
};

export function meta() {
  return [
    ...seo({
      title: META.title,
      description: META.description,
      path: "/",
    }),
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Person",
        name: SITE_NAME,
        jobTitle: PROFILE.shortTitle,
        url: SITE_URL,
        email: `mailto:${PROFILE.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "Nepal" },
        sameAs: [PROFILE.linkedinUrl, PROFILE.githubUrl],
        knowsAbout: META.knowsAbout,
      },
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
  ];
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white antialiased scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        {/* HERO */}
        <section className="relative pt-28 md:pt-36">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[3fr_2fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/60" />
                  {PROFILE.availability}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="mt-5 font-semibold leading-tight tracking-tight"
                >
                  <span className="block text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl">
                    {PROFILE.name.toUpperCase()}
                  </span>
                  <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="mt-2 block bg-gradient-to-r from-fuchsia-400 via-purple-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-2xl font-medium text-transparent sm:text-3xl md:text-4xl"
                  >
                    {PROFILE.tagline}
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="mt-6 max-w-3xl text-lg text-white/75 sm:text-xl"
                >
                  {PROFILE.heroParagraph}
                </motion.p>

                {/* Stat chips */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                    >
                      <Badge className={`px-3 py-1.5 ${STAT_ACCENT[stat.color].badge}`}>
                        <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${STAT_ACCENT[stat.color].dot}`} />
                        {stat.label}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                {/* Animated skill chips */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {HERO_CHIPS.map((chip, i) => (
                    <motion.div
                      key={chip}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.05 }}
                    >
                      <Badge className="border-white/10 bg-white/5 px-3 py-1.5 text-white hover:bg-white/10">
                        {chip}
                      </Badge>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="mt-10 flex flex-wrap gap-3"
                >
                  <Button
                    asChild
                    className="group border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 text-black hover:opacity-90"
                  >
                    <a href="#resume" aria-label={"View résumé section"}>
                      <ArrowDownToLine className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                      {"View Resume"}
                    </a>
                  </Button>
                  <Button variant="outline" asChild className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                    <a href="#projects" aria-label={"Jump to projects"}>
                      {"View Projects"}
                    </a>
                  </Button>
                </motion.div>

                <div className="mt-10">
                  <ContactActions
                    email={PROFILE.email}
                    phone={PROFILE.phone}
                    location={PROFILE.location}
                    linkedinUrl={PROFILE.linkedinUrl}
                    githubUrl={PROFILE.githubUrl}
                  />
                </div>

                {/* Subtle animated gradient bar */}
                <motion.div
                  className="mt-12 h-1 w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ transformOrigin: "left center" }}
                />
              </div>

              <HeroAIVisual />
            </div>

            {/* Quick highlights */}
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-purple-400" />,
                    k: "Real‑Time Interaction",
                    v: "AWS AppSync + GraphQL for live Q&A, polls, and quizzes at scale.",
                    cls: "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6 transition duration-300 hover:border-purple-500/30 hover:from-purple-500/20",
                    spot: "rgba(168,85,247,0.18)",
                  },
                  {
                    icon: <Brain className="h-5 w-5 text-fuchsia-400" />,
                    k: "Agentic Workflows & RAG",
                    v: "AWS Bedrock RAG over a vector knowledge base — powering moderator copilots, chatbots, and plain‑language agentic workflows.",
                    cls: "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-6 transition duration-300 hover:border-fuchsia-500/30 hover:from-fuchsia-500/20",
                    spot: "rgba(217,70,239,0.18)",
                  },
                  {
                    icon: <Languages className="h-5 w-5 text-emerald-400" />,
                    k: "Real‑Time Translation",
                    v: "Live transcription with real‑time captions translated into each viewer's own language.",
                    cls: "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6 transition duration-300 hover:border-emerald-500/30 hover:from-emerald-500/20",
                    spot: "rgba(16,185,129,0.18)",
                  },
                  {
                    icon: <Clock className="h-5 w-5 text-blue-400" />,
                    k: "Ultra‑Low Latency",
                    v: "IVS streaming at ~0.3ms with global edge distribution",
                    cls: "group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-6 transition duration-300 hover:border-blue-500/30 hover:from-blue-500/20",
                    spot: "rgba(59,130,246,0.18)",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={item.k}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.05 }}
                    whileHover={{ y: -4, scale: 1.015, boxShadow: `0 16px 50px -16px ${item.spot}`, transition: { duration: 0.2 } }}
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
                      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
                      e.currentTarget.style.setProperty("--spot-opacity", "1")
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty("--spot-opacity", "0")
                    }}
                    className={item.cls}
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                      style={{
                        opacity: "var(--spot-opacity, 0)",
                        background: `radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%), ${item.spot}, transparent 60%)`,
                      }}
                    />
                    <div className="relative">
                      <div className="flex items-center gap-3">
                        {item.icon}
                        <div className="text-sm font-medium text-white/80">{item.k}</div>
                      </div>
                      <div className="mt-3 text-base text-white/80 group-hover:text-white/90">{item.v}</div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>

        {/* SKILLS & TOOLS */}
        <section id="skills" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Expertise"} title={"Skills & Tools"} />

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SKILL_GROUPS.map((group, gi) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: "easeOut", delay: gi * 0.05 }}
                  className={`rounded-2xl border border-white/10 bg-gradient-to-br ${SKILL_ACCENT[group.accent].card} to-transparent p-6`}
                >
                  <div className={`mb-4 text-base font-medium ${SKILL_ACCENT[group.accent].title}`}>{group.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <SkillBadge key={s} name={s} className={`px-3 py-1.5 ${SKILL_ACCENT[group.accent].badge}`} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AWS Cost Optimization callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 p-6"
            >
              <div className="text-sm uppercase tracking-widest text-white/70">{"AI & Real-Time Architecture"}</div>
              <div className="mt-2 text-lg text-white">
                {"AI RAG systems and AppSync powering grounded answers and live interaction at scale"}
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                <li>{"• RAG system on AWS Bedrock grounding answers in event data"}</li>
                <li>{"• Agentic workflow for querying live metrics in plain language"}</li>
                <li>{"• Moderator copilot generating and answering audience questions live"}</li>
                <li>{"• Live and post-event chatbots plus livestream summarization"}</li>
                <li>{"• AWS AppSync + GraphQL real-time Q&A, polls, surveys, and quizzes"}</li>
                <li>{"• Migrated from IoT Core/MQTT to AppSync for better scale"}</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CASE STUDIES (preview) */}
        <section id="case-studies" className="scroll-mt-28 relative">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Deep dives"} title={"Case Studies"} />
            <p className="-mt-4 mb-8 max-w-2xl text-white/70">
              {"The decisions behind the systems — problem, options, the call I made, and what the numbers did."}
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CASE_STUDIES.slice(0, 3).map((c, i) => (
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
                    <div className="text-lg font-semibold text-white">{c.title}</div>
                    <div className="mt-1 text-sm text-white/70">{c.tagline}</div>
                    <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium" style={{ color: c.accent }}>
                      {"Read case study"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="/case-studies"
                className="group inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                {`View all ${CASE_STUDIES.length} case studies`}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Career"} title={"Experience"} />
            <ExperienceTimeline items={EXPERIENCE} />
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Background"} title={"Education"} />
            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7"
              >
                <div className="text-xl font-medium text-white">{EDUCATION.degree}</div>
                <div className="mt-1 text-white/70">{`${EDUCATION.school} · ${EDUCATION.period}`}</div>
                <div className="mt-4 text-sm text-white/80">{EDUCATION.blurb}</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.08 }}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 p-6 md:p-7"
              >
                <div className="text-sm uppercase tracking-widest text-white/70">{"Focus Areas"}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {EDUCATION.focus.map((s) => (
                    <Badge key={s} className="border-white/10 bg-white/5 px-3 py-1.5 text-white">
                      {s}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-28 relative">
          <AIOrbs />
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Selected"} title={"Projects"} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.slice(0, 6).map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
            <div className="mt-8">
              <a
                href="/projects"
                className="group inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
              >
                {`View all ${PROJECTS.length} projects`}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        {/* AI EVENT COPILOT — teaser linking to the full demo */}
        <section id="ai-copilot" className="scroll-mt-28 relative">
          <AIOrbs />
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Capability"} title={"AI Event Copilot"} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 p-8"
            >
              <p className="max-w-3xl text-lg text-white/80">
                {
                  "I build AI copilots for live enterprise events — RAG-grounded Q&A generation, knowledge-base chatbots, and agents that query event data on demand. I put together an interactive, client-side demo of those patterns (fictional data) so you can try it yourself."
                }
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="/ai-demo"
                  className="group inline-flex items-center gap-2 rounded-md border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 px-4 py-2 text-sm font-medium text-black hover:opacity-90"
                >
                  {"Try the interactive demo"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/case-studies/ai-rag-event-copilot"
                  className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
                >
                  {"Read the case study"}
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* RÉSUMÉ */}
        <section id="resume" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Document"} title={"Résumé"} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <ResumePreview />
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Let's build"} title={"Contact"} />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-base text-white/80">
                {"Tell me about your product, timeline, and what success looks like. I'll respond within 24–48 hours."}
              </p>
              <div className="mt-6">
                <ContactActions
                  email={PROFILE.email}
                  phone={PROFILE.phone}
                  location={PROFILE.location}
                  linkedinUrl={PROFILE.linkedinUrl}
                  githubUrl={PROFILE.githubUrl}
                />
              </div>
              <div className="mt-6">
                <Button
                  asChild
                  className="border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 text-black hover:opacity-90"
                >
                  <a href={PROFILE.resumeUrl} download>
                    <ArrowDownToLine className="mr-2 h-4 w-4" />
                    {"Download Resume"}
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative mt-24 border-t border-white/10 bg-black/60 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <nav className="flex flex-wrap items-center gap-5 text-sm text-white/60">
              <a href="#skills" className="hover:text-white">
                {"Skills & Tools"}
              </a>
              <a href="#ai-copilot" className="hover:text-white">
                {"AI Copilot"}
              </a>
              <a href="#experience" className="hover:text-white">
                {"Experience"}
              </a>
              <a href="#education" className="hover:text-white">
                {"Education"}
              </a>
              <a href="#projects" className="hover:text-white">
                {"Projects"}
              </a>
              <a href="/case-studies" className="hover:text-white">
                {"Case Studies"}
              </a>
              <a href="#resume" className="hover:text-white">
                {"Résumé"}
              </a>
              <a href="#contact" className="hover:text-white">
                {"Contact"}
              </a>
            </nav>
            <div className="text-sm text-white/60">
              {"© "}
              {new Date().getFullYear()}
              {" BIGYA TULADHAR · All rights reserved"}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
