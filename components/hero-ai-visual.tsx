"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { Brain, Cloud, Database, type LucideIcon } from "lucide-react"

/* Modern, AI-futuristic hero core: a glowing computer chip wrapped in a
 * rotating dotted sunburst halo, with real tech logos orbiting on circuit
 * rings. Oversized — it bleeds past the right viewport edge (clipped by the
 * page's overflow-clip) for an immersive, half-cut look.
 *
 * Logos load from /public/logos/*.svg; each node falls back to a clean
 * accent-colored monogram if its SVG is missing.
 *
 * Pure SVG + framer-motion (transform/opacity only). Reduced-motion aware. */

type Node = {
  key: string
  label: string
  monogram: string
  accent: string
  logo?: string
  icon?: LucideIcon
}

const NODES: Node[] = [
  { key: "lambda", label: "Lambda", monogram: "λ", accent: "#ed7100", logo: "/logos/lambda.svg" },
  { key: "dynamodb", label: "DynamoDB", monogram: "DDB", accent: "#4053d6", logo: "/logos/dynamodb.svg" },
  { key: "appsync", label: "AppSync", monogram: "AS", accent: "#e7157b", logo: "/logos/appsync.svg" },
  { key: "redis", label: "Redis", monogram: "RD", accent: "#ff4438", logo: "/logos/redis.svg" },
  { key: "graphql", label: "GraphQL", monogram: "GQL", accent: "#e10098", logo: "/logos/graphql.svg" },
  { key: "bedrock", label: "Bedrock", monogram: "BR", accent: "#01a88d" },
  { key: "rag", label: "RAG", monogram: "RAG", accent: "#a855f7", icon: Brain },
  { key: "vectordb", label: "Vector DB", monogram: "VDB", accent: "#60a5fa", icon: Database },
]

/* Dotted sunburst halo — two dense rings of dots around the core (viewBox 200). */
const HALO_DOTS = [
  { radius: 66, count: 44 },
  { radius: 80, count: 54 },
].flatMap(({ radius, count }) =>
  Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2
    return {
      x: +(100 + Math.cos(a) * radius).toFixed(2),
      y: +(100 + Math.sin(a) * radius).toFixed(2),
      r: i % 2 ? 1.1 : 1.7,
    }
  }),
)

/* Pre-computed orbit positions (percent within the rotating track box). */
const ORBIT = NODES.map((n, i) => {
  const a = (i / NODES.length) * Math.PI * 2
  return {
    ...n,
    left: +(50 + Math.cos(a) * 45).toFixed(2),
    top: +(50 + Math.sin(a) * 45).toFixed(2),
  }
})

function LogoNode({ node }: { node: Node }) {
  const [err, setErr] = useState(false)
  const Icon = node.icon
  const showImg = node.logo && !err
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-2"
      style={{ boxShadow: `0 0 18px -2px ${node.accent}aa`, ["--tw-ring-color" as string]: node.accent }}
      title={node.label}
    >
      {showImg ? (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img src={node.logo} alt={node.label} className="h-7 w-7 object-contain" onError={() => setErr(true)} />
      ) : Icon ? (
        <Icon className="h-6 w-6" style={{ color: node.accent }} />
      ) : (
        <span className="text-[11px] font-bold leading-none" style={{ color: node.accent }}>
          {node.monogram}
        </span>
      )}
    </div>
  )
}

export function HeroAIVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none relative hidden h-[520px] lg:block" aria-hidden="true">
      {/* oversized stage, anchored to bleed moderately off the right edge */}
      <div className="absolute right-[-14%] top-1/2 h-[560px] w-[560px] -translate-y-1/2">
        {/* ambient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-emerald-400/20 blur-3xl" />

        {/* circuit + dotted halo */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>

          <circle cx="100" cy="100" r="60" fill="url(#coreGlow)" />

          {[44, 92].map((r, i) => (
            <motion.circle
              key={r}
              cx="100"
              cy="100"
              r={r}
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth={0.4}
              strokeDasharray={i === 0 ? "2 4" : "1 6"}
              animate={reduce ? { opacity: 0.3 } : { rotate: i === 0 ? 360 : -360, opacity: [0.2, 0.45, 0.2] }}
              style={{ transformOrigin: "100px 100px" }}
              transition={reduce ? undefined : { duration: 40 - i * 8, repeat: Infinity, ease: "linear" }}
            />
          ))}

          <motion.g
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            {HALO_DOTS.map((d, i) => (
              <motion.circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.r}
                fill="#7dd3fc"
                animate={reduce ? { opacity: 0.5 } : { opacity: [0.25, 0.85, 0.25] }}
                transition={reduce ? undefined : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: (i % 9) * 0.22 }}
              />
            ))}
          </motion.g>
        </svg>

        {/* rotating orbit track with tech logos */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-[86%] w-[86%] -translate-x-1/2 -translate-y-1/2"
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {ORBIT.map((n) => (
            <motion.div
              key={n.key}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.left}%`, top: `${n.top}%` }}
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <LogoNode node={n} />
            </motion.div>
          ))}
        </motion.div>

        {/* core — glowing computer chip */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-fuchsia-500/25 via-purple-600/20 to-emerald-400/20 backdrop-blur"
          style={{ boxShadow: "0 0 90px -10px rgba(168,85,247,0.7), inset 0 0 40px -10px rgba(255,255,255,0.35)" }}
          animate={reduce ? {} : { scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {!reduce && (
            <motion.div
              className="absolute inset-3 rounded-full border border-dashed border-white/25"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
          )}

          <ChipMark reduce={!!reduce} />
        </motion.div>
      </div>
    </div>
  )
}

/* Glowing computer chip — pins on all four sides, an inner die with a contact
 * grid, no text. Pulsing glow. */
function ChipMark({ reduce }: { reduce: boolean }) {
  const pins = [28, 36, 44, 52]
  return (
    <motion.svg
      viewBox="0 0 80 80"
      className="relative h-24 w-24"
      animate={reduce ? {} : { scale: [1, 1.06, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 12px rgba(217,70,239,0.85))" }}
    >
      <defs>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="45%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>

      {/* pins */}
      <g stroke="url(#chipGrad)" strokeWidth="2.2" strokeLinecap="round">
        {pins.map((p) => (
          <line key={`t${p}`} x1={p} y1="13" x2={p} y2="22" />
        ))}
        {pins.map((p) => (
          <line key={`b${p}`} x1={p} y1="58" x2={p} y2="67" />
        ))}
        {pins.map((p) => (
          <line key={`l${p}`} x1="13" y1={p} x2="22" y2={p} />
        ))}
        {pins.map((p) => (
          <line key={`r${p}`} x1="58" y1={p} x2="67" y2={p} />
        ))}
      </g>

      {/* chip body */}
      <rect x="22" y="22" width="36" height="36" rx="8" fill="#0b0b14" stroke="url(#chipGrad)" strokeWidth="2" />

      {/* inner die */}
      <rect x="31" y="31" width="18" height="18" rx="3" fill="none" stroke="url(#chipGrad)" strokeWidth="1.4" />
      {/* contact grid */}
      <g stroke="url(#chipGrad)" strokeWidth="0.9" opacity="0.85">
        <line x1="40" y1="31" x2="40" y2="49" />
        <line x1="31" y1="40" x2="49" y2="40" />
      </g>
      {/* corner pads */}
      <g fill="url(#chipGrad)">
        <circle cx="34.5" cy="34.5" r="1.4" />
        <circle cx="45.5" cy="34.5" r="1.4" />
        <circle cx="34.5" cy="45.5" r="1.4" />
        <circle cx="45.5" cy="45.5" r="1.4" />
      </g>
      {/* pulsing center node */}
      <motion.circle
        cx="40"
        cy="40"
        r="2.4"
        fill="#fff"
        animate={reduce ? { opacity: 0.9 } : { opacity: [0.4, 1, 0.4], r: [2, 3, 2] }}
        transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}
