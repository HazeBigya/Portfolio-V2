"use client"

import { motion } from "framer-motion"

export function AIOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute top-[-1rem] left-6 h-40 w-40 rounded-full bg-fuchsia-500/20 blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-20 right-6 h-56 w-56 rounded-full bg-purple-500/20 blur-3xl"
        animate={{ y: [0, -24, 0], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-1rem] left-1/3 h-48 w-48 rounded-full bg-emerald-400/20 blur-3xl"
        animate={{ y: [0, 18, 0], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}
