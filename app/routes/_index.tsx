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
import { AIEventCopilot } from "../../components/ai-event-copilot";
import { HeroAIVisual } from "../../components/hero-ai-visual";
import { ResumePreview } from "../../components/resume-preview";
import { SkillBadge } from "../../components/skill-badge";

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
                  {"Available for senior roles & consulting"}
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05 }}
                  className="mt-5 font-semibold leading-tight tracking-tight"
                >
                  <span className="block text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl">
                    {"BIGYA TULADHAR"}
                  </span>
                  <motion.span
                    animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="mt-2 block bg-gradient-to-r from-fuchsia-400 via-purple-400 to-emerald-400 bg-[length:200%_auto] bg-clip-text text-2xl font-medium text-transparent sm:text-3xl md:text-4xl"
                  >
                    {"Senior FullStack & Cloud Developer"}
                  </motion.span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="mt-6 max-w-3xl text-lg text-white/75 sm:text-xl"
                >
                  {
                    "I build AI agents, RAG systems, and AI‑powered assistants for live enterprise events — alongside ultra‑low‑latency streaming and real‑time interaction at scale. 8+ years across the full stack, with a track record of cutting AWS costs 40% while improving performance."
                  }
                </motion.p>

                {/* Stat chips */}
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {[
                    { label: "40% AWS cost reduction", color: "emerald" },
                    { label: "50K+ concurrent viewers", color: "purple" },
                    { label: "50+ live productions", color: "fuchsia" },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                    >
                      {stat.color === "emerald" && (
                        <Badge className="border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-white hover:bg-emerald-500/20">
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          {stat.label}
                        </Badge>
                      )}
                      {stat.color === "purple" && (
                        <Badge className="border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-white hover:bg-purple-500/20">
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-purple-400" />
                          {stat.label}
                        </Badge>
                      )}
                      {stat.color === "fuchsia" && (
                        <Badge className="border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1.5 text-white hover:bg-fuchsia-500/20">
                          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                          {stat.label}
                        </Badge>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Animated skill chips */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {[
                    "Cloud Architecture",
                    "Real‑Time Systems",
                    "AI Agents & RAG",
                    "AWS Cost Optimization",
                    "CI/CD & DevOps",
                  ].map((chip, i) => (
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
                    email={"bigyatuladhar07@gmail.com"}
                    phone={"+977 9818372334"}
                    location={"Kathmandu, Nepal"}
                    linkedinUrl={"https://www.linkedin.com/in/bigya-tuladhar/"}
                    githubUrl={"https://github.com/HazeBigya"}
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
                    k: "AI Agents & RAG",
                    v: "AWS Bedrock RAG over a vector knowledge base — powering moderator copilots, chatbots, and plain‑language agents.",
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-fuchsia-300">{"Frontend Mastery"}</div>
                <div className="flex flex-wrap gap-2">
                  {["JavaScript", "TypeScript", "React", "Vue", "jQuery", "Next.js", "Tailwind"].map((s) => (
                    <SkillBadge key={s} name={s} className="border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1.5 text-white hover:bg-fuchsia-500/20" />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-purple-300">{"Backend & APIs"}</div>
                <div className="flex flex-wrap gap-2">
                  {["GraphQL", "Serverless", "Node.js", "Express", "REST", "WebSockets", "PHP"].map((s) => (
                    <SkillBadge key={s} name={s} className="border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-white hover:bg-purple-500/20" />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-amber-300">{"Data & Storage"}</div>
                <div className="flex flex-wrap gap-2">
                  {["Valkey", "Redis", "ElastiCache", "PostgreSQL", "MongoDB", "MySQL", "IndexedDB"].map(
                    (s) => (
                      <SkillBadge key={s} name={s} className="border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-white hover:bg-amber-500/20" />
                    ),
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-rose-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-rose-300">{"DevOps & CI/CD"}</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AWS CodeBuild",
                    "CloudFormation",
                    "Terraform",
                    "GitHub Actions",
                    "Docker",
                    "Jenkins",
                    "Wowza",
                    "Monitoring",
                  ].map(
                    (s) => (
                      <SkillBadge key={s} name={s} className="border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-white hover:bg-rose-500/20" />
                    ),
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-emerald-300">{"AWS Cloud"}</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Bedrock",
                    "AppSync",
                    "Step Functions",
                    "Kinesis Firehose",
                    "Glue",
                    "Athena",
                    "KMS",
                    "MediaConvert",
                    "IVS",
                    "Lambda",
                    "DynamoDB",
                    "S3",
                    "CloudFront",
                    "EC2",
                    "ECS",
                    "IoT Core",
                  ].map((s) => (
                    <SkillBadge key={s} name={s} className="border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-white hover:bg-emerald-500/20" />
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: "easeOut", delay: 0.25 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-blue-300">{"Emerging Tech"}</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "RAG",
                    "AI Agents",
                    "Vector DBs",
                    "Embeddings",
                    "Semantic Search",
                    "LLMs (Claude)",
                    "HLS",
                    "WebRTC",
                    "IoT",
                    "MQTT",
                    "Real-time Analytics",
                    "Edge Computing",
                    "Hybrid Apps",
                  ].map((s) => (
                    <SkillBadge key={s} name={s} className="border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-white hover:bg-blue-500/20" />
                  ))}
                </div>
              </motion.div>
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
                <li>{"• AI agents for querying live metrics in plain language"}</li>
                <li>{"• Moderator copilot generating and answering audience questions live"}</li>
                <li>{"• Live and post-event chatbots plus livestream summarization"}</li>
                <li>{"• AWS AppSync + GraphQL real-time Q&A, polls, surveys, and quizzes"}</li>
                <li>{"• Migrated from IoT Core/MQTT to AppSync for better scale"}</li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* AI EVENT COPILOT — concept demo */}
        <section id="ai-copilot" className="scroll-mt-28 relative">
          <AIOrbs />
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Capability"} title={"AI Event Copilot — concept demo"} />
            <AIEventCopilot />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Career"} title={"Experience"} />
            <ExperienceTimeline
              items={[
                {
                  company: "Nova Dynamic Media",
                  role: "Senior FullStack Cloud Developer",
                  period: "02/2022 – Present · Hong Kong",
                  pillars: ["AI Agents & RAG", "Real‑Time Interaction at Scale", "AWS Cost Optimization"],
                  highlights: [
                    "Real‑time audience interaction (live Q&A with upvoting and direct replies, speaker teleprompter, polls, surveys, quizzes, synchronized slideshows) built on AWS AppSync + GraphQL + DynamoDB — migrated from the older IoT Core/MQTT setup for better scale. 50+ productions.",
                    "AI moderator copilot built on an AWS Bedrock RAG system (event content indexed into a vector knowledge base) that generates, groups, and answers audience questions live.",
                    "Live AI chatbot for audiences + a post‑event AI chatbot for asking about the presentation, on the same RAG system.",
                    "Livestream summarization and AI‑driven insight reporting.",
                    "An AI agent (AWS Bedrock) for querying live user metrics in plain language as an alternative to report generation.",
                    "Created Mission Control, a unified moderator dashboard.",
                    "Telemetry pipeline: Kinesis Firehose → S3 for storage, Redis/Valkey for live stats; processed with AWS Glue + Athena for reports and AI insights.",
                    "Live video transcription and translation with real‑time captions.",
                    "Encrypted stored video and reports with AWS KMS.",
                    "QR‑based check‑in app built with Flutter, plus attendance reporting.",
                    "Secure HLS delivery with token‑based encryption/decryption and access control; migrated 1000+ videos to adaptive HLS with AWS MediaConvert, improving quality and reducing bandwidth.",
                    "Cut cloud spend by ~40% via Lambda Graviton migration, EC2 right‑sizing, and DynamoDB capacity tuning.",
                    "Migrated CI/CD from Jenkins to AWS CodeBuild for consistent releases across microservices.",
                  ],
                  tech: [
                    "AppSync",
                    "GraphQL",
                    "Bedrock",
                    "RAG",
                    "IVS",
                    "HLS",
                    "MediaConvert",
                    "DynamoDB",
                    "Redis",
                    "Valkey",
                    "Step Functions",
                    "Kinesis Firehose",
                    "Glue",
                    "Athena",
                    "KMS",
                    "Flutter",
                    "CodeBuild",
                    "AWS",
                  ],
                },
                {
                  company: "Bitsky.bet",
                  role: "Senior Full‑Stack Developer / Team Lead",
                  period: "6 months · 2024 · Remote",
                  pillars: ["Payments & Bonuses", "Game Integrations", "Ops Dashboards"],
                  highlights: [
                    "Integrated games from providers (e.g., Fortune Panda) and configured bonus mechanics.",
                    "Implemented Stripe for deposits/withdrawals and user balance management.",
                    "Bonus and points system based on gaming performance.",
                    "Built internal dashboards for game telemetry, payouts, and incident tracking.",
                  ],
                  tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Stripe", "Docker"],
                },
                {
                  company: "Dosro",
                  role: "Backend & DevOps Engineer (Side Project)",
                  period: "2021 – Present",
                  pillars: ["Scalable E‑commerce Backend", "AWS Infrastructure", "CI/CD Automation"],
                  highlights: [
                    "Second‑hand marketplace with microservices backend and real‑time inventory management.",
                    "Provisioned AWS infra with networking/security and observability; cost optimization built‑in.",
                    "Jenkins pipelines with containerized services for reliable, repeatable deployments.",
                  ],
                  tech: ["AWS", "Jenkins", "Docker", "Node.js", "PostgreSQL", "Redis", "Valkey", "CloudFront"],
                },
                {
                  company: "Swivt Technologies",
                  role: "Senior FullStack Developer · Web Team Lead",
                  period: "01/2022 – 12/2023 · Lalitpur, Nepal",
                  pillars: ["Custom CMS Platform", "E‑commerce & Booking", "Team Leadership"],
                  highlights: [
                    "Modular CMS powering 12+ client properties (schools, e‑commerce) with reusable components.",
                    "Booking system that increased reservations by 100% with integrated analytics and A/B testing.",
                    "Stripe payments with high availability; Cloudflare performance optimizations across sites.",
                    "Agile leadership of 5–8 engineers; introduced CI/CD and code review to reduce regressions.",
                  ],
                  tech: ["React", "Node.js", "Stripe", "Cloudflare", "GoDaddy", "Jira", "Trello", "MySQL"],
                },
                {
                  company: "Upaya Business Solutions",
                  role: "Full Stack Developer",
                  period: "12/2018 – 01/2022 · Kathmandu, Nepal",
                  pillars: ["ERP/CRM", "Compliance Workflows", "Hybrid Apps"],
                  highlights: [
                    "ERP with accounting & CRM across multiple departments; role‑based access and audit trails.",
                    "Company registration/renewal workflows and compliance deadline tracking dashboards.",
                    "Search across 1M+ records in 0.3–0.7 seconds using IndexedDB and optimized algorithms.",
                    "Automated reporting cadence (daily/weekly/monthly), saving 15+ engineer hours weekly.",
                    "5 hybrid mobile apps with offline‑first data sync and conflict resolution.",
                  ],
                  tech: ["IndexedDB", "Node.js", "MongoDB", "Cordova", "JavaScript", "REST APIs"],
                },
                {
                  company: "Upaya (Logistics)",
                  role: "Full Stack Developer",
                  period: "06/2018 – 02/2019 · Kathmandu, Nepal",
                  pillars: ["End‑to‑End Logistics Partner", "Real‑Time GPS Tracking", "Dynamic Pricing"],
                  highlights: [
                    "Built end‑to‑end logistics features for B2B parcel delivery: order intake, routing, and proof of delivery.",
                    "Geofenced GPS tracking that improved on‑time delivery by 40% with live fleet telemetry.",
                    "Dynamic pricing engine using route length, vehicle type, traffic patterns, and demand.",
                    "Customer service portal with status tracking, SLA alerts, and proactive notifications.",
                  ],
                  tech: ["Node.js", "PostgreSQL", "React", "Google Maps API", "WebSockets", "Redis"],
                },
                {
                  company: "Xena Tech Nepal",
                  role: "Web Developer (Contract)",
                  period: "5 months · 2018 · Kathmandu, Nepal",
                  pillars: ["Laravel & WordPress", "SEO", "Travel Websites"],
                  highlights: [
                    "Delivered travel/tourism websites with custom Laravel modules and WordPress themes.",
                    "Implemented on‑page SEO and performance improvements for better discovery.",
                    "Set up forms, booking flows, and content workflows tailored for agencies.",
                  ],
                  tech: ["Laravel", "WordPress", "PHP", "MySQL", "SEO", "cPanel"],
                },
              ]}
            />
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
                <div className="text-xl font-medium text-white">{"BACHELOR'S Degree in Information Management"}</div>
                <div className="mt-1 text-white/70">{"Tribhuvan University · 2014 – 2018"}</div>
                <div className="mt-4 text-sm text-white/80">
                  {"Foundations in information systems, software engineering, and data—applied to production systems."}
                </div>
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
                  {["Software Engineering", "Databases", "Cloud & Networking", "Human‑Computer Interaction"].map(
                    (s) => (
                      <Badge key={s} className="border-white/10 bg-white/5 px-3 py-1.5 text-white">
                        {s}
                      </Badge>
                    ),
                  )}
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
              {[
                {
                  name: "Nova Dynamic Media",
                  href: "https://www.novaweb.live/",
                  img: "/nova-dynamic-media-dashboard.png",
                  desc: "Enterprise livestreaming platform with AI analytics",
                },
                {
                  name: "Aitken Vanson",
                  href: "https://aitkenvanson.com/",
                  img: "/aiteken-vanson-platform.png",
                  desc: "Financial analytics dashboard with real-time data",
                },
                {
                  name: "Swivt Technologies",
                  href: "https://swivt.io/",
                  img: "/swivt-tech-suite.png",
                  desc: "CMS and booking platforms for multiple industries",
                },
                {
                  name: "Upaya",
                  href: "https://upaya.com.np/",
                  img: "/upaya-website.png",
                  desc: "Core web platform and integrations",
                },
                {
                  name: "Upaya Business Solution",
                  href: "https://ubs.com.np/",
                  img: "/ubs-portal.png",
                  desc: "Business services portal with integrated CRM",
                },
                {
                  name: "Crystal Academy",
                  href: "https://crystalacademy.org/",
                  img: "/crystal-academy-ui.png",
                  desc: "Online learning platform with interactive courses",
                },
                {
                  name: "WorkItPT",
                  href: "https://workitpt-admin.vercel.app",
                  img: "/workitpt-admin.png",
                  desc: "Fitness coaching admin with real-time engagement",
                },
                {
                  name: "Citi977",
                  href: undefined,
                  img: "/citi977-ui.png",
                  desc: "City service portal prototype with live telemetry",
                },
                {
                  name: "Dosro Marketplace",
                  href: undefined,
                  img: "/dosro-marketplace-ui.png",
                  desc: "Second-hand e-commerce with secure payments",
                },
                {
                  name: "Lekhapal Accounting",
                  href: undefined,
                  img: "/nepal-business-accounting-ledger-app-ui.png",
                  desc: "Nepal-focused accounting: ledgers, VAT, invoices, bank reconciliation, and statements.",
                },
                {
                  name: "Landmark Discovery Treks",
                  href: "https://www.landmarkdiscoverytreks.com/",
                  img: "/landmark-discovery-treks-homepage.png",
                  desc: "Trekking website with tour listings, itineraries, and lead capture.",
                },
                {
                  name: "Bitsky.bet",
                  href: "https://bitsky.bet",
                  img: "/online-casino-dashboard.png",
                  desc: "Game integrations, Stripe payments, bonus engine, and operational dashboards.",
                },
              ].map((p, i) => {
                const Card = (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.05 }}
                    whileHover={{ y: -4, scale: 1.015, boxShadow: "0 16px 50px -16px rgba(168,85,247,0.45)", transition: { duration: 0.2 } }}
                    onMouseMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`)
                      e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`)
                      e.currentTarget.style.setProperty("--spot-opacity", "1")
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.setProperty("--spot-opacity", "0")
                    }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-300 hover:border-white/20"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-200"
                      style={{
                        opacity: "var(--spot-opacity, 0)",
                        background:
                          "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.12), transparent 60%)",
                      }}
                    />
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={p.img || "/placeholder.svg?height=160&width=480&query=tech%20project%20thumbnail"}
                        alt={`${p.name} showcase`}
                        className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="text-white">{p.name}</div>
                        <span className="text-xs text-emerald-300 opacity-0 transition group-hover:opacity-100">
                          {"Visit ↗"}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-white/60">{p.desc}</div>
                    </div>
                  </motion.div>
                )
                return p.href ? (
                  <a key={p.name} href={p.href} target="_blank" rel="noreferrer">
                    {Card}
                  </a>
                ) : (
                  Card
                )
              })}
            </div>
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
                  email={"bigyatuladhar07@gmail.com"}
                  phone={"+977 9818372334"}
                  location={"Kathmandu, Nepal"}
                  linkedinUrl={"https://www.linkedin.com/in/bigya-tuladhar/"}
                />
              </div>
              <div className="mt-6">
                <Button
                  asChild
                  className="border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 text-black hover:opacity-90"
                >
                  <a href="/bigya_cv.pdf" download>
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
