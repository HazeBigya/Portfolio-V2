import { SectionHeader } from "@/components/section-header"

function ExperienceItem({
  role,
  company,
  period,
  points = [],
}: { role: string; company: string; period: string; points?: string[] }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="text-lg font-medium text-white">{role}</div>
        <div className="text-sm text-white/60">{period}</div>
      </div>
      <div className="mt-1 text-sm text-white/70">{company}</div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/80">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  )
}

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <SectionHeader eyebrow={"Career"} title={"Experience"} />
        <div className="mt-8 space-y-8">
          <ExperienceItem
            role={"Senior FullStack Cloud Developer"}
            company={"Nova Dynamic Media"}
            period={"02/2022 – Present · Hong Kong"}
            points={[
              "Live user telemetry via WebSockets for engagement dashboards.",
              "AI integrations: stream summarization, AI‑generated Q&A, post‑event insights.",
              "HLS encryption/decryption for secure video delivery.",
              "1000+ videos converted to HLS with AWS MediaConvert.",
              "DynamoDB with monolith & microservices for scale.",
              "IVS real‑time streaming (~0.3 ms).",
              "Interactivity for 50+ events: surveys, slides, polls, quizzes, Q&A.",
              "IoT Core + Redis for live event stats.",
              "Custom pages via in‑house builder (jQuery/Vue), domain automation, localization.",
            ]}
          />
          <ExperienceItem
            role={"Senior FullStack Developer / Web Team Lead"}
            company={"Swivt Technologies"}
            period={"01/2022 – 12/2023 · Lalitpur, Nepal"}
            points={[
              "Custom CMS for online school & multi‑ecommerce.",
              "Bookings +100% via online system.",
              "Stripe integration; 5+ sites hosted (Cloudflare/GoDaddy).",
              "Team leadership with Jira/Trello across 5 projects.",
            ]}
          />
          <ExperienceItem
            role={"Full Stack Developer"}
            company={"Upaya Business Solutions"}
            period={"12/2018 – 01/2022 · Kathmandu, Nepal"}
            points={[
              "Accounting & CRM systems per department.",
              "Automated reports (daily/weekly/monthly).",
              "IndexedDB search for 1M+ records (0.3–0.7s).",
              "5 hybrid apps with Cordova.",
            ]}
          />
          <ExperienceItem
            role={"Full Stack Developer"}
            company={"Upaya (Logistics)"}
            period={"06/2018 – 02/2019 · Kathmandu, Nepal"}
            points={[
              "Logistics management system with 5‑member team.",
              "Real‑time GPS tracking for shipments.",
              "Centralized support portal; dynamic pricing engine.",
            ]}
          />
        </div>
      </div>
    </div>
  )
}
