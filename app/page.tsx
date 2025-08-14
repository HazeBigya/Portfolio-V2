"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Zap, Brain, Shield, Clock } from "lucide-react";
import { BackgroundFX } from "@/components/background-fx";
import { ContactActions } from "@/components/contact-actions";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/section-header";
import { SiteHeader } from "@/components/site-header";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { AIOrbs } from "@/components/ai-orbs";
import { useState } from "react";

export default function Page() {
  const [showMoreAws, setShowMoreAws] = useState(false);
  const awsCore = [
    "Lambda",
    "S3",
    "IVS",
    "EC2/ECS/ELB",
    "SNS",
    "Step Functions",
    "MediaConvert",
    "Route 53/CloudFront",
  ];
  const awsMore = [ "Athena/Glue", "IoT Core",  "Amplify", "WAF", "KMS/Secrets Manager", "API Gateway",];
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white antialiased scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        {/* HERO */}
        <section className="relative pt-28 md:pt-36">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-10">
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
                  className="mt-5 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl md:text-7xl"
                >
                  <span className="block text-white">{"BIGYA TULADHAR"}</span>
                  <span className="mt-2 block bg-gradient-to-r from-fuchsia-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    {"Senior FullStack & Cloud Developer"}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="mt-6 max-w-3xl text-lg text-white/75 sm:text-xl"
                >
                  {
                    "With 6+ years architecting full‑stack systems, I specialize in ultra‑low latency livestreaming, real‑time telemetry, AI‑powered analytics, and AWS cost optimization (40% reduction). I build secure, scalable products that deliver exceptional UX while maximizing cloud ROI through pragmatic service choices."
                  }
                </motion.p>

                {/* Animated skill chips */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {[
                    "Cloud Architecture",
                    "Real‑Time Systems",
                    "AI Integrations",
                    "AWS Cost Optimization",
                    "CI/CD & DevOps"
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
                    <a href="/bigya_cv.pdf" aria-label={"Download resume as PDF"} download>
                      <ArrowDownToLine className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
                      {"Download Resume"}
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

              {/* Quick highlights */}
              <div className="mt-2 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    icon: <Zap className="h-5 w-5 text-emerald-400" />,
                    k: "Real‑Time Dashboards",
                    v: "IoT Core MQTT + WebSockets telemetry for live audience insights"
                  },
                  {
                    icon: <Brain className="h-5 w-5 text-fuchsia-400" />,
                    k: "AI Insights Engine",
                    v: "Automated summaries, Q&A generation, and post‑event reports"
                  },
                  {
                    icon: <Shield className="h-5 w-5 text-purple-400" />,
                    k: "Secure HLS Pipeline",
                    v: "End‑to‑end encryption with token‑based authentication"
                  },
                  {
                    icon: <Clock className="h-5 w-5 text-emerald-400" />,
                    k: "Ultra‑Low Latency",
                    v: "IVS streaming at ~0.3ms with global edge distribution"
                  }
                ].map((item, idx) => (
                  <motion.div
                    key={item.k}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className="group rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 transition duration-300 hover:border-white/20 hover:from-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div className="text-sm font-medium text-white/80">{item.k}</div>
                    </div>
                    <div className="mt-3 text-base text-white/80 group-hover:text-white/90">{item.v}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS & TOOLS */}
        <section id="skills" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Expertise"} title={"Skills & Tools"} />

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-fuchsia-300">{"Frontend Mastery"}</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "Vue",
                    "React",
                    "jQuery",
                    "Next.js",
                    "SCSS",
                    "Tailwind",
                    "Bootstrap"
                  ].map((s) => (
                    <Badge
                      key={s}
                      className="border-fuchsia-500/20 bg-fuchsia-500/10 px-3 py-1.5 text-white hover:bg-fuchsia-500/20"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-purple-300">{"Backend & APIs"}</div>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "TypeScript", "JavaScript", "Python", "Express", "REST", "WebSockets", "Serverless", "OpenAPI",].map((s) => (
                    <Badge
                      key={s}
                      className="border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-white hover:bg-purple-500/20"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-emerald-300">{"AWS Cloud"}</div>
                <div className="flex flex-wrap gap-2">
                  {[...awsCore, ...(showMoreAws ? awsMore : [])].map((s) => (
                    <Badge
                      key={s}
                      className="border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-white hover:bg-emerald-500/20"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="mt-3">
                  <button
                    className="text-xs text-emerald-300 hover:text-emerald-200"
                    onClick={() => setShowMoreAws((v) => !v)}
                  >
                    {showMoreAws ? "Show less" : "Show more"}
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-amber-300">{"Data & Storage"}</div>
                <div className="flex flex-wrap gap-2">
                  {["MongoDB", "MySQL", "PostgreSQL", "Redis", "Valkey", "IndexedDB", "ElastiCache", "DynamoDB"].map(
                    (s) => (
                      <Badge
                        key={s}
                        className="border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-white hover:bg-amber-500/20"
                      >
                        {s}
                      </Badge>
                    )
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-rose-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-rose-300">{"DevOps & CI/CD"}</div>
                <div className="flex flex-wrap gap-2">
                  {["Jenkins", "Docker", "CloudFormation", "GitHub Actions", "GitLab CI/CD", "Bash", "YAML", "AWS CLI", "Nginx", "Apache"].map(
                    (s) => (
                      <Badge
                        key={s}
                        className="border-rose-500/20 bg-rose-500/10 px-3 py-1.5 text-white hover:bg-rose-500/20"
                      >
                        {s}
                      </Badge>
                    )
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent p-6"
              >
                <div className="mb-4 text-base font-medium text-blue-300">{"Emerging Tech"}</div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI/LLMs",
                    "HLS",
                    "WebRTC",
                    "IoT",
                    "MQTT",
                    "Real-time Analytics",
                    "Wowza",
                    "Edge Computing",
                    "Hybrid Apps"
                  ].map((s) => (
                    <Badge
                      key={s}
                      className="border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-white hover:bg-blue-500/20"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* AWS Cost Optimization callout */}
            <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 p-6">
              <div className="text-sm uppercase tracking-widest text-white/70">{"Cloud & Cost Optimization"}</div>
              <div className="mt-2 text-lg text-white">
                {"Strategic AWS architecture delivering 40% cost reduction while improving performance"}
              </div>
              <ul className="mt-3 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
                <li>{"• Lambda migration from x64 to ARM Graviton for better price‑performance"}</li>
                <li>{"• EC2 right‑sizing and Spot instances for compute‑intensive workloads"}</li>
                <li>{"• Wowza streaming on auto‑scaled EC2 for predictable live events"}</li>
                <li>{"• DynamoDB capacity optimization with on‑demand/provisioned switching"}</li>
                <li>{"• S3 intelligent tiering/lifecycle for media storage efficiency"}</li>
                <li>{"• CloudFront tuned caching and regional edge deployments"}</li>
              </ul>
            </div>
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
                  pillars: ["Ultra‑Low Latency Streaming", "AI‑Powered Analytics", "AWS Cost Optimization"],
                  highlights: [
                    "Architected telemetry and analytics backed by IoT Core MQTT and WebSockets for 50K+ concurrent viewers.",
                    "Interactive event features: live Q&A, surveys, polls, and quizzes across 50+ productions.",
                    "AI pipeline that auto‑generates Q&A, summarizes livestreams, and delivers post‑event insight reports.",
                    "Secure HLS delivery with token‑based encryption/decryption and access control.",
                    "Migrated 1000+ videos to adaptive HLS with AWS MediaConvert, improving quality and reducing bandwidth.",
                    "Cut cloud spend by ~40% via Lambda Graviton migration, EC2 right‑sizing, and DynamoDB capacity tuning.",
                    "Jenkins CI/CD pipelines enabling consistent releases across microservices.",
                    "IoT Core MQTT + Redis/Valkey for live metrics; automated domain setup and dynamic localization."
                  ],
                  tech: [
                    "WebSockets",
                    "MQTT",
                    "IoT Core",
                    "AI/LLMs",
                    "HLS",
                    "IVS",
                    "AWS",
                    "DynamoDB",
                    "Redis",
                    "Valkey",
                    "Jenkins"
                  ]
                },
                {
                  company: "Bitsky.bet",
                  role: "Full‑Stack Engineer (Part‑time)",
                  period: "6 months · 2024 · Remote",
                  pillars: ["Payments & Bonuses", "Game Integrations", "Ops Dashboards"],
                  highlights: [
                    "Integrated games from providers (e.g., Fortune Panda) and configured bonus mechanics.",
                    "Implemented Stripe for deposits/withdrawals and user balance management.",
                    "Built internal dashboards for game telemetry, payouts, and incident tracking."
                  ],
                  tech: ["Node.js", "TypeScript", "React", "PostgreSQL", "Stripe", "Docker"]
                },
                {
                  company: "Dosro",
                  role: "Backend & DevOps Engineer (Side Project)",
                  period: "2021 – Present",
                  pillars: ["Scalable E‑commerce Backend", "AWS Infrastructure", "CI/CD Automation"],
                  highlights: [
                    "Second‑hand marketplace with microservices backend and real‑time inventory management.",
                    "Provisioned AWS infra with networking/security and observability; cost optimization built‑in.",
                    "Jenkins pipelines with containerized services for reliable, repeatable deployments."
                  ],
                  tech: ["AWS", "Jenkins", "Docker", "Node.js", "PostgreSQL", "Redis", "Valkey", "CloudFront"]
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
                    "Agile leadership of 5–8 engineers; introduced CI/CD and code review to reduce regressions."
                  ],
                  tech: ["React", "Node.js", "Stripe", "Cloudflare", "GoDaddy", "Jira", "Trello", "MySQL"]
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
                    "5 hybrid mobile apps with offline‑first data sync and conflict resolution."
                  ],
                  tech: ["IndexedDB", "Node.js", "MongoDB", "Cordova", "JavaScript", "REST APIs"]
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
                    "Customer service portal with status tracking, SLA alerts, and proactive notifications."
                  ],
                  tech: ["Node.js", "PostgreSQL", "React", "Google Maps API", "WebSockets", "Redis"]
                },
                {
                  company: "Xena Tech Nepal",
                  role: "Web Developer (Contract)",
                  period: "5 months · 2018 · Kathmandu, Nepal",
                  pillars: ["Laravel & WordPress", "SEO", "Travel Websites"],
                  highlights: [
                    "Delivered travel/tourism websites with custom Laravel modules and WordPress themes.",
                    "Implemented on‑page SEO and performance improvements for better discovery.",
                    "Set up forms, booking flows, and content workflows tailored for agencies."
                  ],
                  tech: ["Laravel", "WordPress", "PHP", "MySQL", "SEO", "cPanel"]
                }
              ]}
            />
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Background"} title={"Education"} />
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-7">
                <div className="text-xl font-medium text-white">{"BACHELOR'S Degree in Information Management"}</div>
                <div className="mt-1 text-white/70">{"Tribhuvan University · 2014 – 2018"}</div>
                <div className="mt-4 text-sm text-white/80">
                  {"Foundations in information systems, software engineering, and data—applied to production systems."}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 p-6 md:p-7">
                <div className="text-sm uppercase tracking-widest text-white/70">{"Focus Areas"}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["Software Engineering", "Databases", "Cloud & Networking", "Human‑Computer Interaction"].map(
                    (s) => (
                      <Badge key={s} className="border-white/10 bg-white/5 px-3 py-1.5 text-white">
                        {s}
                      </Badge>
                    )
                  )}
                </div>
              </div>
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
                  href: "https://novaweb.live",
                  img: "/nova-dynamic-media-dashboard.png",
                  desc: "Event livestreaming platform with AI analytics"
                },
                {
                  name: "Aitken Vanson",
                  href: "https://aitkenvanson.com/",
                  img: "/aiteken-vanson-platform.png",
                  desc: "Financial analytics dashboard with real-time data"
                },
                {
                  name: "Swivt Technologies",
                  href: "https://swivt.io/",
                  img: "/Swivt.png",
                  desc: "CMS and booking platforms for multiple industries"
                },
                {
                  name: "Upaya",
                  href: "https://upaya.com.np/",
                  img: "/Upaya.png",
                  desc: "Core web platform and integrations"
                },
                {
                  name: "Upaya Business Solution",
                  href: "https://ubs.com.np/",
                  img: "/UBS.png",
                  desc: "Business services portal with integrated CRM"
                },
                {
                  name: "Crystal Academy",
                  href: "https://crystalacademy.edu.np",
                  img: "/crystal-academy-ui.png",
                  desc: "Online learning platform with interactive courses"
                },
                {
                  name: "WorkItPT",
                  href: "https://workitpt-admin.vercel.app",
                  img: "/workitpt-admin.png",
                  desc: "Fitness coaching admin with real-time engagement"
                },
                {
                  name: "Citi977",
                  href: "https://citi977.com.np/",
                  img: "/Citi977.png",
                  desc: "City service portal prototype with live telemetry"
                },
                {
                  name: "Dosro Marketplace",
                  href: undefined,
                  img: "/dosro-marketplace-ui.png",
                  desc: "Second-hand e-commerce with secure payments"
                },
                {
                  name: "Upaya Accounting",
                  href: undefined,
                  img: "/UpayaAcc.png",
                  desc: "Modern Nepal‑focused accounting: ledgers, VAT, invoices, bank reconciliation, reports."
                },
                {
                  name: "Landmark Discovery Treks",
                  href: "https://www.landmarkdiscoverytreks.com/",
                  img: "/landmark-discovery-treks-homepage.png",
                  desc: "Trekking website with tour listings, itineraries, and lead capture."
                },
                {
                  name: "Bitsky.bet",
                  href: "https://www.bitsky.bet/",
                  img: "/online-casino-dashboard.png",
                  desc: "Game integrations, Stripe payments, bonus engine, and operational dashboards."
                }
              ].map((p, i) => {
                const Card = (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                  >
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
                );
                return p.href ? (
                  <a key={p.name} href={p.href} target="_blank" rel="noreferrer">
                    {Card}
                  </a>
                ) : (
                  Card
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-28">
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeader eyebrow={"Let's build"} title={"Contact"} />
            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
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
            </div>
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
              <a href="#experience" className="hover:text-white">
                {"Experience"}
              </a>
              <a href="#education" className="hover:text-white">
                {"Education"}
              </a>
              <a href="#projects" className="hover:text-white">
                {"Projects"}
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
