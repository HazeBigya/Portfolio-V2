"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

/* AI-futuristic hero core: a glowing computer chip at the center of a neural
 * network — real tech logos wired to the core with synapse lines and signal
 * pulses flowing inward (data feeding the "brain"). No carousel/orbit. The
 * stage is oversized and bleeds past the right viewport edge (clipped by the
 * page's overflow-clip) for an immersive look.
 *
 * Logos load from /public/logos/*.svg, with a monogram fallback if missing.
 * Pure SVG + framer-motion (transform/opacity only). Reduced-motion aware. */

type Tech = { key: string; label: string; monogram: string; accent: string; logo: string }

const TECH: Tech[] = [
  { key: "lambda", label: "Lambda", monogram: "λ", accent: "#ed7100", logo: "/logos/lambda.svg" },
  { key: "dynamodb", label: "DynamoDB", monogram: "DDB", accent: "#4053d6", logo: "/logos/dynamodb.svg" },
  { key: "appsync", label: "AppSync", monogram: "AS", accent: "#e7157b", logo: "/logos/appsync.svg" },
  { key: "s3", label: "S3", monogram: "S3", accent: "#569a31", logo: "/logos/s3.svg" },
  { key: "ec2", label: "EC2", monogram: "EC2", accent: "#ed7100", logo: "/logos/ec2.svg" },
  { key: "cloudfront", label: "CloudFront", monogram: "CF", accent: "#8c4fff", logo: "/logos/cloudfront.svg" },
  { key: "redis", label: "Redis", monogram: "RD", accent: "#ff4438", logo: "/logos/redis.svg" },
  { key: "graphql", label: "GraphQL", monogram: "GQL", accent: "#e10098", logo: "/logos/graphql.svg" },
]

const CENTER = 50
/* Fixed neural-node positions (viewBox/percent units, square stage). */
const NODES = TECH.map((t, i) => {
  const a = (-90 + i * (360 / TECH.length)) * (Math.PI / 180)
  const radius = i % 2 ? 43 : 38
  return {
    ...t,
    x: +(CENTER + Math.cos(a) * radius).toFixed(2),
    y: +(CENTER + Math.sin(a) * radius).toFixed(2),
  }
})

function LogoChip({ node }: { node: (typeof NODES)[number] }) {
  const [err, setErr] = useState(false)
  return (
    <div
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white"
      style={{ boxShadow: `0 0 20px -2px ${node.accent}cc`, outline: `2px solid ${node.accent}` }}
      title={node.label}
    >
      {err ? (
        <span className="text-[11px] font-bold leading-none" style={{ color: node.accent }}>
          {node.monogram}
        </span>
      ) : (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img src={node.logo} alt={node.label} className="h-7 w-7 object-contain" onError={() => setErr(true)} />
      )}
    </div>
  )
}

export function HeroAIVisual() {
  const reduce = useReducedMotion()

  return (
    <div className="pointer-events-none relative hidden h-[520px] lg:block" aria-hidden="true">
      {/* oversized stage, bleeding moderately off the right edge */}
      <div className="absolute right-[-14%] top-1/2 h-[560px] w-[560px] -translate-y-1/2">
        {/* ambient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-emerald-400/15 blur-3xl" />

        {/* neural network layer */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="synapse" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          <circle cx="50" cy="50" r="30" fill="url(#coreGlow)" />

          {/* synapse edges: core → each node, plus a faint web between neighbors */}
          {NODES.map((n, i) => {
            const next = NODES[(i + 1) % NODES.length]
            return (
              <g key={n.key}>
                <motion.line
                  x1={CENTER}
                  y1={CENTER}
                  x2={n.x}
                  y2={n.y}
                  stroke="url(#synapse)"
                  strokeWidth={0.4}
                  animate={reduce ? { opacity: 0.28 } : { opacity: [0.12, 0.4, 0.12] }}
                  transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
                />
                <line x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="url(#synapse)" strokeWidth={0.25} opacity={0.12} />
              </g>
            )
          })}

          {/* signal pulses flowing node → core (data feeding the brain) */}
          {!reduce &&
            NODES.map((n, i) => (
              <motion.circle
                key={`p-${n.key}`}
                r={0.9}
                fill={n.accent}
                animate={{ cx: [n.x, CENTER], cy: [n.y, CENTER], opacity: [0, 1, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeIn", delay: i * 0.35, repeatDelay: 0.6 }}
              />
            ))}
        </svg>

        {/* soft pulsing core rings (no rotation) */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
            style={{ width: `${30 + i * 14}%`, height: `${30 + i * 14}%` }}
            animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}

        {/* logo nodes (gentle float, no orbit) */}
        {NODES.map((n, i) => (
          <div
            key={n.key}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <motion.div
              animate={reduce ? {} : { y: [0, -6, 0] }}
              transition={{ duration: 3 + (i % 4) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            >
              <LogoChip node={n} />
            </motion.div>
          </div>
        ))}

        {/* core — glowing computer chip */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-fuchsia-500/25 via-purple-600/20 to-emerald-400/20 backdrop-blur"
          style={{ boxShadow: "0 0 90px -10px rgba(168,85,247,0.7), inset 0 0 40px -10px rgba(255,255,255,0.35)" }}
          animate={reduce ? {} : { scale: [1, 1.04, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChipMark reduce={!!reduce} />
        </motion.div>
      </div>
    </div>
  )
}

/* Glowing computer chip — pins on all four sides, an inner die with a contact
 * grid, no text. Pulsing center node. */
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

      <rect x="22" y="22" width="36" height="36" rx="8" fill="#0b0b14" stroke="url(#chipGrad)" strokeWidth="2" />
      <rect x="31" y="31" width="18" height="18" rx="3" fill="none" stroke="url(#chipGrad)" strokeWidth="1.4" />
      <g stroke="url(#chipGrad)" strokeWidth="0.9" opacity="0.85">
        <line x1="40" y1="31" x2="40" y2="49" />
        <line x1="31" y1="40" x2="49" y2="40" />
      </g>
      <g fill="url(#chipGrad)">
        <circle cx="34.5" cy="34.5" r="1.4" />
        <circle cx="45.5" cy="34.5" r="1.4" />
        <circle cx="34.5" cy="45.5" r="1.4" />
        <circle cx="45.5" cy="45.5" r="1.4" />
      </g>
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
