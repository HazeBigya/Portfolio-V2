"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Project } from "../lib/projects"
import { BookingChatPreview } from "./booking-chat-preview"

/* Project card. Same frame and typography as the case-study cards (hairline
 * border, surface fill, brand action link), with a square thumbnail on top. */
export function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.35, ease: "easeOut", delay: (index % 6) * 0.05 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[14px] border border-hairline bg-surface transition-colors duration-300 hover:border-brand/40"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-hairline bg-surface-2">
        {p.visual === "booking-chat" ? (
          <BookingChatPreview />
        ) : (
          <img
            src={p.img || "/placeholder.svg"}
            alt={`${p.name} showcase`}
            loading="lazy"
            decoding="async"
            width={800}
            height={800}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="text-lg font-semibold text-foreground">{p.name}</div>
        <div className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</div>
        {p.href && (
          <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            Visit site
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.75} />
          </div>
        )}
      </div>
    </motion.div>
  )

  return p.href ? (
    <a href={p.href} target="_blank" rel="noreferrer" className="block h-full">
      {card}
    </a>
  ) : (
    card
  )
}
