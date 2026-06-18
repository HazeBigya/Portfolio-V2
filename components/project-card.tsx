"use client"

import { motion } from "framer-motion"
import type { Project } from "../lib/projects"

export function ProjectCard({ project: p, index = 0 }: { project: Project; index?: number }) {
  const card = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.35, ease: "easeOut", delay: (index % 6) * 0.05 }}
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
      className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors duration-300 hover:border-white/20"
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
          src={p.img || "/placeholder.svg"}
          alt={`${p.name} showcase`}
          loading="lazy"
          decoding="async"
          width={1000}
          height={400}
          className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div className="text-white">{p.name}</div>
          {p.href && (
            <span className="text-xs text-emerald-300 opacity-0 transition group-hover:opacity-100">{"Visit ↗"}</span>
          )}
        </div>
        <div className="mt-1 text-xs text-white/60">{p.desc}</div>
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
