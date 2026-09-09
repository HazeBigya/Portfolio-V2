import { Button } from "../../components/ui/button";
import { ArrowDownToLine, ArrowRight, Layers, Cloud, Workflow, Sparkles, Radio, Database, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { BackgroundFX } from "../../components/background-fx";
import { ContactActions } from "../../components/contact-actions";
import { motion } from "framer-motion";
import { SectionHeader } from "../../components/section-header";
import { SiteHeader } from "../../components/site-header";
import { ExperienceTimeline } from "../../components/experience-timeline";
import { ResumePreview } from "../../components/resume-preview";
import { SkillBadge } from "../../components/skill-badge";
import { ProjectCard } from "../../components/project-card";
import { PROJECTS } from "../../lib/projects";
import { HOME_PROJECTS } from "../../data/cv";
import { CASE_STUDIES } from "../../lib/case-studies";
import { seo, SITE_URL, SITE_NAME } from "../../lib/seo";
import {
  PROFILE,
  META,
  STATS,
  SKILL_GROUPS,
  EXPERIENCE,
  EDUCATION,
  AI_HIGHLIGHT,
  DOMAINS,
  HIGHLIGHT_LEAD,
} from "../../data/cv";

export function meta() {
  return [
    ...seo({ title: META.title, description: META.description, path: "/" }),
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

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
};

/* Icons paired to DOMAINS (same order) for the hero breadth card. */
const DOMAIN_ICONS = [Layers, Cloud, Workflow, Sparkles, Radio, Database];

export default function HomePage() {
  const featuredStudy = CASE_STUDIES.find((c) => c.featured);
  const restStudies = CASE_STUDIES.filter((c) => c !== featuredStudy);

  return (
    <div className="relative min-h-[100dvh] overflow-clip bg-background text-foreground scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        {/* HERO */}
        <section className="relative overflow-hidden pt-28 md:pt-32">
          {/* textured backdrop: faint grid fading toward the top, hero only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(90%_65%_at_50%_0%,black,transparent)]"
            style={{
              backgroundImage:
                "linear-gradient(var(--hairline) 1px, transparent 1px), linear-gradient(90deg, var(--hairline) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1 text-xs text-muted-foreground"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-brand/70 motion-safe:animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                  {PROFILE.availability}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className="mt-6 text-5xl font-semibold leading-[1.0] tracking-tight text-foreground sm:text-6xl md:text-7xl"
                >
                  Senior Full-Stack
                  <br />
                  <span className="text-muted-foreground/50">&</span> Cloud Engineer<span className="text-brand">.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
                >
                  {PROFILE.summary}
                </motion.p>

                {/* discreet contact row */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.12 }}
                  className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
                >
                  <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
                    <Mail className="h-4 w-4" strokeWidth={1.75} />
                    {PROFILE.email}
                  </a>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" strokeWidth={1.75} />
                    {PROFILE.location}
                  </span>
                  <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
                    <Linkedin className="h-4 w-4" strokeWidth={1.75} />
                    LinkedIn
                  </a>
                  <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
                    <Github className="h-4 w-4" strokeWidth={1.75} />
                    GitHub
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  <Button asChild size="lg" className="bg-brand text-brand-foreground hover:bg-brand/90">
                    <a href="#projects">View work</a>
                  </Button>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand"
                  >
                    Get in touch
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </a>
                </motion.div>

                {/* stats — larger, tabular, hairline-topped */}
                <motion.dl
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 }}
                  className="mt-12 flex max-w-xl flex-wrap gap-x-10 gap-y-4 border-t border-hairline pt-6"
                >
                  {STATS.map((s) => (
                    <div key={s.label} className="min-w-[6.5rem]">
                      <dt className="font-num text-3xl font-semibold tracking-tight text-foreground">{s.value}</dt>
                      <dd className="mt-1 text-xs leading-snug text-muted-foreground">{s.label}</dd>
                    </div>
                  ))}
                </motion.dl>
              </div>

              {/* breadth — icons signal a broad engineer, not an AI-only specialist */}
              <motion.aside
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border border-hairline bg-surface p-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.25)] lg:p-7"
              >
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="h-3 w-0.5 rounded-full bg-brand" />
                  Works across
                </div>
                <ul className="mt-5 space-y-4">
                  {DOMAINS.map((d, i) => {
                    const Icon = DOMAIN_ICONS[i]
                    return (
                      <li key={d} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface-2 text-brand">
                          <Icon className="h-4 w-4" strokeWidth={1.75} />
                        </span>
                        <span className="text-sm leading-snug text-foreground/85">{d}</span>
                      </li>
                    )
                  })}
                </ul>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* SKILLS & TOOLS — the breadth; this is the expertise section.
            Masonry columns so short groups don't leave gaps (no motion transform
            on the groups: transforms break CSS multi-column flow). */}
        <section id="skills" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Expertise" title="Skills & Tools" />
            <motion.div {...reveal} className="gap-x-12 sm:columns-2 lg:columns-3">
              {SKILL_GROUPS.map((group) => (
                <div key={group.title} className="mb-9 break-inside-avoid">
                  <div className="mb-4 font-num text-xs uppercase tracking-wider text-muted-foreground">
                    {group.title}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <SkillBadge key={s} name={s} />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CAREER HIGHLIGHT — the hardest / most impressive build, scoped to Nova
            so it never reads as the ceiling of the skillset above. */}
        <section id="highlight" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Career highlight" title="RAG, Agents & Real-Time Systems" />
            <motion.div {...reveal}>
              <p className="max-w-3xl text-lg leading-relaxed text-foreground">{HIGHLIGHT_LEAD}</p>
              <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
                <p className="text-lg leading-snug text-muted-foreground">{AI_HIGHLIGHT.summary}</p>
                <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {AI_HIGHLIGHT.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-px w-3 shrink-0 bg-brand" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CASE STUDIES — full list lives here; each links to its own article */}
        <section id="case-studies" className="scroll-mt-28 relative">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader title="Case Studies" />
            <p className="-mt-4 mb-8 max-w-2xl text-muted-foreground">
              The decisions behind the systems: problem, options, the call I made, and what the numbers did.
            </p>

            {featuredStudy && (
              <motion.a
                href={`/case-studies/${featuredStudy.slug}`}
                {...reveal}
                whileHover={{ y: -4 }}
                className="group relative mb-5 grid overflow-hidden rounded-[14px] border border-hairline bg-surface p-7 transition-colors hover:border-brand/40 md:grid-cols-[1.5fr_1fr] md:p-9"
              >
                <div>
                  <div className="text-xs font-medium text-brand">Featured</div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{featuredStudy.title}</div>
                  <div className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{featuredStudy.tagline}</div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    Read case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                  </div>
                </div>
                <ul className="mt-6 space-y-3 border-t border-hairline pt-6 md:mt-0 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  {featuredStudy.results.slice(0, 3).map((r) => (
                    <li key={r.metric}>
                      <div className="font-num text-lg text-foreground">{r.value}</div>
                      <div className="text-xs leading-snug text-muted-foreground">{r.metric}</div>
                    </li>
                  ))}
                </ul>
              </motion.a>
            )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {restStudies.map((c, i) => (
                <motion.a
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col overflow-hidden rounded-[14px] border border-hairline bg-surface p-6 transition-colors hover:border-brand/40"
                >
                  {c.duration && <div className="font-num text-xs text-muted-foreground">{c.duration}</div>}
                  <div className="mt-2 text-lg font-semibold text-foreground">{c.title}</div>
                  <div className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{c.tagline}</div>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    Read case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow="Career" title="Experience" />
            <ExperienceTimeline items={EXPERIENCE} />
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader title="Education" />
            <div className="grid gap-5 lg:grid-cols-2">
              <motion.div {...reveal} className="rounded-[14px] border border-hairline bg-surface p-6 md:p-7">
                <div className="text-xl font-medium text-foreground">{EDUCATION.degree}</div>
                <div className="mt-1 font-num text-sm text-muted-foreground">{`${EDUCATION.school} · ${EDUCATION.period}`}</div>
                <div className="mt-4 text-sm leading-relaxed text-muted-foreground">{EDUCATION.blurb}</div>
              </motion.div>
              <motion.div
                {...reveal}
                transition={{ ...reveal.transition, delay: 0.08 }}
                className="rounded-[14px] border border-hairline bg-surface p-6 md:p-7"
              >
                <div className="text-sm text-muted-foreground">Focus areas</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {EDUCATION.focus.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-hairline bg-surface-2 px-3 py-1.5 text-sm text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-28 relative">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader title="Projects" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {HOME_PROJECTS.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
            <div className="mt-8">
              <a
                href="/projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-brand"
              >
                {`View all ${PROJECTS.length} projects`}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.75} />
              </a>
            </div>
          </div>
        </section>

        {/* AI EVENT COPILOT teaser */}
        <section id="ai-copilot" className="scroll-mt-28 relative">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader title="AI Event Copilot" />
            <motion.div {...reveal} className="overflow-hidden rounded-[14px] border border-hairline bg-surface p-8">
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                I build AI copilots for live enterprise events: RAG-grounded Q&A generation, knowledge-base chatbots,
                and agents that query event data on demand. I put together an interactive, client-side demo of those
                patterns (fictional data) so you can try it yourself.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
                  <a href="/ai-demo">Try the interactive demo</a>
                </Button>
                <a
                  href="/case-studies/ai-rag-event-copilot"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-brand"
                >
                  Read the case study
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* RESUME */}
        <section id="resume" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader title="Résumé" />
            <motion.div {...reveal}>
              <ResumePreview />
            </motion.div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader title="Contact" />
            <motion.div {...reveal} className="rounded-[14px] border border-hairline bg-surface p-6 md:p-8">
              <p className="max-w-2xl text-lg leading-relaxed text-foreground">
                Tell me about your product, timeline, and what success looks like. I respond within 24 to 48 hours.
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
                <Button asChild className="bg-brand text-brand-foreground hover:bg-brand/90">
                  <a href={PROFILE.resumeUrl} download>
                    <ArrowDownToLine className="mr-2 h-4 w-4" strokeWidth={1.75} />
                    Download résumé
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="relative mt-24 border-t border-hairline py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <nav className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <a href="#skills" className="hover:text-foreground">Skills</a>
              <a href="#experience" className="hover:text-foreground">Experience</a>
              <a href="#projects" className="hover:text-foreground">Projects</a>
              <a href="#case-studies" className="hover:text-foreground">Case Studies</a>
              <a href="#resume" className="hover:text-foreground">Résumé</a>
              <a href="#contact" className="hover:text-foreground">Contact</a>
            </nav>
            <div className="text-sm text-muted-foreground">
              {"© "}
              {new Date().getFullYear()}
              {" Bigya Tuladhar"}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
