import Link from "next/link"
import { SectionHeader } from "@/components/section-header"

const projects = [
  { name: "Nova Dynamic Media", href: "https://novaweblive.com/" },
  { name: "Upaya", href: "https://upaya.com.np/" },
  { name: "Crystal Academy", href: "https://crystalacademy.org/" },
  { name: "WorkItPT", href: "https://workitpt.goswivt.com/" },
  { name: "Upaya Business Solution", href: "https://ubs.com.np/" },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <SectionHeader eyebrow={"Selected"} title={"Projects"} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="text-white">{p.name}</div>
                <span className="text-xs text-emerald-300 opacity-0 transition group-hover:opacity-100">
                  {"Visit ↗"}
                </span>
              </div>
              <div className="mt-3 h-28 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                <img
                  src={"/placeholder.svg?height=160&width=480&query=neon%20grid%20tech%20thumbnail%20for%20project"}
                  alt={`${p.name} thumbnail placeholder`}
                  className="h-full w-full object-cover opacity-85 transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
