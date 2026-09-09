"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

type Item = {
  company: string
  role: string
  period: string
  note?: string
  highlights: string[]
  tech?: string[]
  pillars?: string[]
}

export function ExperienceTimeline({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="relative">
      {/* vertical line */}
      {reduceMotion ? (
        <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-brand/40 sm:block" />
      ) : (
        <>
          <div className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-hairline sm:block" />
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="pointer-events-none absolute left-4 top-0 hidden h-full w-px bg-brand sm:block"
          />
        </>
      )}
      <div className="space-y-8">
        {items.map((it, idx) => (
          <motion.div
            key={it.company + idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.35, ease: "easeOut", delay: idx * 0.05 }}
            className="relative pl-0 sm:pl-12"
          >
            {/* node */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute left-0 top-6 hidden h-3 w-3 -translate-x-1.5 rounded-full bg-brand ring-4 ring-brand/20 sm:block"
            />
            <div className="rounded-[14px] border border-hairline bg-surface p-7 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{it.role}</div>
                <div className="font-num text-sm text-muted-foreground">{it.period}</div>
              </div>
              <div className="mt-1 text-muted-foreground">{it.company}</div>
              {it.note && <div className="mt-1 text-xs italic text-muted-foreground/70">{it.note}</div>}

              {it.pillars && it.pillars.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {it.pillars.slice(0, 3).map((p, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-full border border-hairline bg-surface-2 px-3 py-1 text-xs text-muted-foreground"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}

              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-foreground/85">
                {it.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-2 h-px w-3 shrink-0 bg-brand" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {it.tech && it.tech.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2 border-t border-hairline pt-5">
                  {it.tech.map((t) => (
                    <span key={t} className="font-num rounded-full border border-hairline px-2.5 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
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
