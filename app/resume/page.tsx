import { Button } from "@/components/ui/button"
import { SectionHeader } from "@/components/section-header"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <div className="flex items-center justify-between gap-4">
          <SectionHeader eyebrow={"Profile"} title={"Resume"} />
          <Button
            asChild
            className="border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 text-black hover:opacity-90"
          >
            <a href="/bigya_cv.pdf" download>{"Download PDF"}</a>
          </Button>
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">{"Summary"}</div>
              <p className="mt-2 text-sm text-white/80">
                {
                  "Dynamic Senior FullStack Developer with deep experience in cloud, real‑time systems, and UX. Specializing in livestream technology (IVS, WebSockets), AI summarization & Q&A, secure HLS delivery, and team leadership to ship high‑impact products."
                }
              </p>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">{"Experience"}</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-white/80">
                <li>{"Nova Dynamic Media — Senior FullStack Cloud Developer (02/2022 – Present · Hong Kong)"}</li>
                <li>{"Swivt Technologies — Senior FullStack Developer / Web Team Lead (01/2022 – 12/2023 · Nepal)"}</li>
                <li>{"Upaya Business Solutions — Full Stack Developer (12/2018 – 01/2022 · Nepal)"}</li>
                <li>{"Upaya (Logistics) — Full Stack Developer (06/2018 – 02/2019 · Nepal)"}</li>
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">{"Contact"}</div>
              <div className="mt-3 text-sm text-white/80 space-y-1">
                <div>{"Kathmandu, Nepal"}</div>
                <div>{"+977 9818372334"}</div>
                <div>{"bigyatuladhar07@gmail.com"}</div>
                <a
                  href="https://www.linkedin.com/in/bigya-tuladhar/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-300 hover:text-emerald-200"
                >
                  {"LinkedIn"}
                </a>
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">{"Skills"}</div>
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                {[
                  "JavaScript",
                  "TypeScript",
                  "Node.js",
                  "React",
                  "Vue",
                  "AWS",
                  "DynamoDB",
                  "Serverless",
                  "IVS",
                  "WebSockets",
                  "HLS",
                  "Redis",
                  "MongoDB",
                  "MySQL",
                  "PostgreSQL",
                  "IoT Core",
                  "IndexedDB",
                  "Jenkins",
                  "Heroku",
                  "CloudFormation",
                  "Cordova",
                  "AI/LLMs",
                ].map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-lg font-medium">{"Education"}</div>
              <div className="mt-2 text-sm text-white/80">
                {"BACHELOR’S Degree in Information Management · Tribhuvan University · 2014 – 2018"}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}
