/**
 * Single source of truth for all CV / portfolio factual data.
 *
 * Everything the site says about who Bigya is, where he worked, and what he
 * built lives here. Rebuild the site as many times as you like — the facts do
 * not drift, because there is exactly one place to change them.
 *
 * Presentation (icons, gradients, colours, animations) stays in the components.
 * This file is data only.
 */

export type Accent = "fuchsia" | "purple" | "amber" | "rose" | "emerald" | "blue"

export type Project = {
  name: string
  href?: string
  img: string
  desc: string
  /** Optional key selecting a live component preview instead of an image. */
  visual?: "booking-chat"
}

export type ExperienceItem = {
  company: string
  role: string
  period: string
  /** Optional context line rendered under the company (e.g. engagement note). */
  note?: string
  pillars?: string[]
  highlights: string[]
  tech?: string[]
}

export type SkillGroup = {
  title: string
  accent: Accent
  items: string[]
}

/* ------------------------------------------------------------------ profile */

export const PROFILE = {
  name: "Bigya Tuladhar",
  shortTitle: "Senior Full-Stack & Cloud Engineer",
  tagline: "Senior Full-Stack & Cloud Engineer · AWS Serverless · Generative AI & RAG",
  availability: "Available for senior roles & consulting",
  email: "bigyatuladhar07@gmail.com",
  phone: "+977 9818372334",
  location: "Kathmandu, Nepal",
  linkedinUrl: "https://www.linkedin.com/in/bigya-tuladhar/",
  githubUrl: "https://github.com/HazeBigya",
  resumeUrl: "/Bigya_Tuladhar_CV.pdf",
  siteUrl: "https://bigya.com.np",
  summary:
    "Senior full-stack and cloud engineer with 8+ years of experience, currently the sole owner of the AI platform at Nova Dynamic Media, a live-events company. I care about reliability under real pressure over features that only work in a demo, and I've led development teams of 3 to 8 people while staying hands-on with architecture and code rather than stepping back into pure management.",
  heroParagraph:
    "I build agentic workflows, RAG systems, and AI‑powered assistants for live enterprise events — alongside ultra‑low‑latency streaming and real‑time interaction at scale. 8+ years across the full stack, with a track record of cutting AWS costs 40% while improving performance.",
} as const

/* --------------------------------------------------------------------- meta */

export const META = {
  title:
    "Bigya Tuladhar — Senior Full-Stack & Cloud Engineer | AWS Serverless | Generative AI & RAG",
  description:
    "I build agentic workflows, RAG systems and AI-powered assistants for live enterprise events — plus ultra-low-latency streaming, real-time interaction at scale, and 50–60% AWS cost optimization. 8+ years across the full stack.",
  knowsAbout: [
    "Agentic Workflows",
    "RAG",
    "AWS",
    "AppSync",
    "Bedrock",
    "Bedrock AgentCore",
    "Real-time systems",
    "Cloud cost optimization",
  ],
} as const

/* -------------------------------------------------------------------- stats */

export const STATS: { label: string; color: Accent }[] = [
  { label: "40% AWS cost reduction", color: "emerald" },
  { label: "50K+ concurrent viewers", color: "purple" },
  { label: "50+ live productions", color: "fuchsia" },
]

export const HERO_CHIPS = [
  "Cloud Architecture",
  "Real‑Time Systems",
  "Agentic Workflows & RAG",
  "AWS Cost Optimization",
  "CI/CD & DevOps",
]

/* ------------------------------------------------------------------- skills */

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Languages & Frontend",
    accent: "fuchsia",
    items: ["JavaScript", "TypeScript", "Python", "React", "Vue", "Next.js", "Tailwind", "Flutter", "jQuery"],
  },
  {
    title: "Backend & APIs",
    accent: "purple",
    items: ["Node.js", "NestJS", "Express", "FastAPI", "GraphQL", "Serverless", "REST", "WebSockets", "PHP"],
  },
  {
    title: "Data & Storage",
    accent: "amber",
    items: ["PostgreSQL", "MongoDB", "MySQL", "DynamoDB", "Redis", "Valkey", "ElastiCache", "IndexedDB"],
  },
  {
    title: "DevOps & IaC",
    accent: "rose",
    items: [
      "AWS CDK",
      "CloudFormation",
      "Terraform",
      "Serverless Framework",
      "AWS CodeBuild",
      "GitHub Actions",
      "Docker",
      "Jenkins",
      "K6 / JMeter",
    ],
  },
  {
    title: "AWS Cloud",
    accent: "emerald",
    items: [
      "Bedrock",
      "AgentCore",
      "AppSync",
      "Step Functions",
      "Lambda",
      "Kinesis Firehose",
      "Glue",
      "Athena",
      "KMS",
      "MediaConvert",
      "IVS",
      "DynamoDB",
      "S3",
      "CloudFront",
      "EC2",
      "ECS",
      "ECR",
      "Amplify",
      "Cognito",
      "SQS",
      "SNS",
      "VPC",
      "WAF",
      "GuardDuty",
      "IoT Core",
    ],
  },
  {
    title: "AI & Emerging Tech",
    accent: "blue",
    items: [
      "RAG",
      "Agentic Workflows",
      "LangGraph",
      "Bedrock AgentCore",
      "Vector DBs",
      "Embeddings",
      "Semantic Search",
      "Knowledge Bases",
      "LLMs (Claude, Nova, DeepSeek)",
      "Grounding & Guardrails",
      "Cross-Region Inference Failover",
      "Prompt Engineering",
      "HLS",
      "WebRTC",
      "MQTT",
    ],
  },
]

/* --------------------------------------------------------------- experience */

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "Nova Dynamic Media",
    role: "Senior Full-Stack & Cloud Engineer",
    period: "Feb 2022 – Present · Hong Kong (Remote)",
    note: "Engaged via Swivt Technologies through Dec 2024; joined Nova full‑time Jan 2024.",
    pillars: ["Agentic Workflows & RAG", "Real‑Time Interaction at Scale", "AWS Cost Optimization"],
    highlights: [
      "Sole owner of the AI platform: a production RAG system on AWS Bedrock (S3 Vectors, hierarchical chunking, semantic search) powering a live moderator copilot and post‑event AI assistants with source‑backed answers.",
      "Own the agentic AI layer end to end — a natural‑language event‑metrics agent (query generation, validation, reasoning steps), automated QnA grouping, and AI report generation — now running on Amazon Bedrock AgentCore with infrastructure provisioned via Terraform.",
      "Cut throttling failures 60–70% under burst load with cross‑region Bedrock inference failover and exponential backoff, keeping the live copilot responsive at peak.",
      "Real‑time audience interaction (live Q&A with upvoting and direct replies, speaker teleprompter, polls, surveys, quizzes, synchronized slideshows) built on AWS AppSync + GraphQL + DynamoDB — migrated from the older IoT Core/MQTT setup for better scale. 50+ productions.",
      "Live AI chatbot for audiences + a post‑event AI chatbot for asking about the presentation, on the same RAG system.",
      "Livestream summarization and AI‑driven insight reporting.",
      "Created Mission Control, a unified moderator dashboard.",
      "Telemetry pipeline: Kinesis Firehose → S3 for storage, Redis/Valkey for live stats; processed with AWS Glue + Athena for reports and AI insights.",
      "Mass email system: SQS queues import users into the platform, a Step Functions workflow adds them to Mailgun mailing lists (primary provider), with AWS SES as backup.",
      "Live video transcription and translation with real‑time captions in each viewer's own language.",
      "Encrypted stored video and reports with AWS KMS.",
      "QR‑based check‑in app built with Flutter, plus attendance reporting.",
      "Secure HLS delivery with token‑based encryption/decryption and access control; migrated 1000+ videos to adaptive HLS with AWS MediaConvert, improving quality and reducing bandwidth.",
      "Cut cloud spend by ~40% via Lambda Graviton migration, EC2 right‑sizing, and DynamoDB capacity tuning.",
      "Migrated CI/CD from Jenkins to AWS CodeBuild for consistent, multi‑account, cross‑region releases across microservices.",
    ],
    tech: [
      "AppSync",
      "GraphQL",
      "Bedrock",
      "AgentCore",
      "RAG",
      "LangGraph",
      "Terraform",
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
      "SQS",
      "Mailgun",
      "KMS",
      "Cognito",
      "Flutter",
      "CodeBuild",
      "AWS",
    ],
  },
  {
    company: "Tissha Cosmetics",
    role: "Co-Founder",
    period: "Dec 2025 – Present · Remote",
    pillars: ["E‑commerce from the ground up", "Infrastructure & Architecture", "Team Leadership"],
    highlights: [
      "Co-founded a cosmetics e‑commerce company from the ground up, driving the platform from concept to production.",
      "Lead a team of 3 engineers across product and infrastructure.",
      "Set up VPS servers, system infrastructure, and platform architecture.",
    ],
    tech: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "VPS"],
  },
  {
    company: "Bitsky.bet",
    role: "Senior Full‑Stack Developer",
    period: "2024 · Remote",
    pillars: ["Payments & Wallet", "Game Integrations", "Reconciliation"],
    highlights: [
      "Integrated third‑party game provider APIs — session management, webhook callbacks, and real‑time balance updates.",
      "Built a secure Stripe wallet system in NestJS for deposits, payouts, and reconciliation.",
      "Bonus and points system based on gaming performance.",
      "Built internal dashboards for game telemetry, payouts, and incident tracking.",
    ],
    tech: ["NestJS", "Node.js", "TypeScript", "React", "PostgreSQL", "Stripe", "Docker"],
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
    role: "Senior Full‑Stack Developer · Web Team Lead",
    period: "Jan 2022 – Dec 2023 · Lalitpur, Nepal",
    note: "Agency role; primary engagement was leading the Nova Dynamic Media platform (above).",
    pillars: ["Custom CMS Platform", "E‑commerce & Booking", "Team Leadership"],
    highlights: [
      "Modular CMS powering 12+ client properties (schools, e‑commerce) with reusable components.",
      "Built Crystal Academy, an online e‑learning platform with courses, tests, and certificates.",
      "Built e‑commerce platforms including a Taekwondo studio store and Aitken Vanson (shoe retailer) with Stripe‑integrated booking.",
      "Booking system that increased reservations by 100% with integrated analytics and A/B testing, plus a Google Calendar booking system.",
      "Stripe payments with high availability; Cloudflare performance optimizations across sites.",
      "Managed hosting for all client projects on GoDaddy, optimizing frontend delivery with Cloudflare caching, edge configuration, and DNS/CDN routing.",
      "Agile leadership of 5–8 engineers; introduced CI/CD and code review to reduce regressions.",
    ],
    tech: ["React", "Node.js", "Stripe", "Cloudflare", "GoDaddy", "Google Calendar API", "Jira", "Trello", "MySQL"],
  },
  {
    company: "Upaya Business Solutions",
    role: "Full Stack Developer",
    period: "Jun 2018 – Jan 2022 · Kathmandu, Nepal",
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
    period: "Jun 2018 – Feb 2019 · Kathmandu, Nepal",
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
]

/* ---------------------------------------------------------------- education */

export const EDUCATION = {
  degree: "Bachelor's Degree in Information Management",
  school: "Tribhuvan University",
  period: "2014 – 2018",
  blurb:
    "Foundations in information systems, software engineering, and data—applied to production systems.",
  focus: ["Software Engineering", "Databases", "Cloud & Networking", "Human‑Computer Interaction"],
} as const

/* ----------------------------------------------------------------- projects */

export const PROJECTS: Project[] = [
  {
    name: "Nova Dynamic Media",
    href: "https://www.novaweb.live/",
    img: "/nova-dynamic-media-dashboard.webp",
    desc: "Enterprise livestreaming platform with AI analytics",
  },
  {
    name: "Tissha Cosmetics",
    href: "https://tissha.com/",
    img: "/tissha-homepage.png",
    desc: "Cosmetics e‑commerce platform I co-founded — built from the ground up.",
  },
  {
    name: "AI Booking Assistant",
    href: "https://github.com/HazeBigya/AI-Booking-Assistant",
    img: "",
    visual: "booking-chat",
    desc: "Personal side project — an AI receptionist that books appointments by chat or voice. Next.js 14, TypeScript, PostgreSQL/Drizzle, provider‑agnostic LLM (OpenAI, Anthropic, Gemini, Bedrock), grounded in real schedule data.",
  },
  {
    name: "Aitken Vanson",
    href: "https://aitkenvanson.com/",
    img: "/aiteken-vanson-platform.webp",
    desc: "Shoe retailer with Stripe‑integrated booking",
  },
  {
    name: "Swivt Technologies",
    href: "https://swivt.io/",
    img: "/swivt-tech-suite.webp",
    desc: "CMS and booking platforms for multiple industries",
  },
  {
    name: "Upaya",
    href: "https://upaya.com.np/",
    img: "/upaya-website.webp",
    desc: "Core web platform and integrations",
  },
  {
    name: "Upaya Business Solution",
    href: "https://ubs.com.np/",
    img: "/ubs-portal.webp",
    desc: "Business services portal with integrated CRM",
  },
  {
    name: "Crystal Academy",
    href: "https://crystalacademy.org/",
    img: "/crystal-academy-ui.webp",
    desc: "Online learning platform with interactive courses",
  },
  {
    name: "WorkItPT",
    href: "https://workitpt-admin.vercel.app",
    img: "/workitpt-admin.webp",
    desc: "Fitness coaching admin with real-time engagement",
  },
  {
    name: "Citi977",
    href: undefined,
    img: "/citi977-ui.webp",
    desc: "City service portal prototype with live telemetry",
  },
  {
    name: "Dosro Marketplace",
    href: undefined,
    img: "/dosro-marketplace-ui.webp",
    desc: "Second-hand e-commerce with secure payments",
  },
  {
    name: "Lekhapal Accounting",
    href: undefined,
    img: "/nepal-business-accounting-ledger-app-ui.webp",
    desc: "Nepal-focused accounting: ledgers, VAT, invoices, bank reconciliation, and statements.",
  },
  {
    name: "Landmark Discovery Treks",
    href: "https://www.landmarkdiscoverytreks.com/",
    img: "/landmark-discovery-treks-homepage.webp",
    desc: "Trekking website with tour listings, itineraries, and lead capture.",
  },
  {
    name: "Bitsky.bet",
    href: "https://bitsky.bet",
    img: "/online-casino-dashboard.webp",
    desc: "Game integrations, Stripe wallet, bonus engine, and operational dashboards.",
  },
]
