"use client"

import { motion, useReducedMotion } from "framer-motion"

export function BackgroundFX() {
  const reduce = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Static base layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/10 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-700/10 via-purple-700/10 to-emerald-600/10" />

      {/* Drift blob — hero ambience */}
      {reduce ? (
        <div className="absolute left-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-fuchsia-500/15 blur-3xl" />
      ) : (
        <motion.div
          className="absolute h-[600px] w-[600px] rounded-full bg-fuchsia-500/15 blur-3xl will-change-transform"
          initial={{ x: "5vw", y: "5vh" }}
          animate={{
            x: ["5vw", "55vw", "30vw", "5vw"],
            y: ["5vh", "10vh", "40vh", "5vh"],
          }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  )
}
