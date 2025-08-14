"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type Item = {
  company: string
  role: string
  period: string
  highlights: string[]
  tech?: string[]
  pillars?: string[] // Top 3 impressive skills
}

export function ExperienceTimeline({ items }: { items: Item[] }) {
  return (
    <div className="relative">
      {/* vertical line */}
      <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-fuchsia-400/40 via-purple-400/30 to-emerald-400/40 sm:block" />
      <div className="space-y-8">
        {items.map((it, idx) => (
          <motion.div
            key={it.company + idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.45 }}
            className="relative pl-0 sm:pl-12"
          >
            {/* node */}
            <div className="absolute left-0 top-3 hidden h-3 w-3 -translate-x-1.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 sm:block" />
            <div className="rounded-3xl border border-white/10 bg-white/5 p-7 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="text-2xl font-semibold text-white">{it.role}</div>
                <div className="text-sm text-white/60">{it.period}</div>
              </div>
              <div className="mt-1 text-white/70">{it.company}</div>

              {it.pillars && it.pillars.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {it.pillars.slice(0, 3).map((p, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-400/15 via-purple-400/15 to-fuchsia-400/15 px-3 py-1 text-xs text-white ring-1 ring-white/10"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}

              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {it.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {it.tech && it.tech.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {it.tech.map((t) => (
                    <Badge key={t} className="border-white/10 bg-white/5 px-3 py-1.5 text-white">
                      {t}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
