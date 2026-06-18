"use client"

import { useState } from "react"
import { motion, useReducedMotion } from "framer-motion"

/* AI-futuristic hero core: a realistic processor chip mounted on a circuit
 * board at the center of a neural network — real tech logos wired to the core
 * with synapse lines and signal pulses flowing inward. No carousel/orbit.
 * Oversized; bleeds past the right viewport edge (clipped by overflow-clip).
 *
 * Logos load from /public/logos/*.svg (monogram fallback if missing).
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
const NODES = TECH.map((t, i) => {
  const a = (-90 + i * (360 / TECH.length)) * (Math.PI / 180)
  const radius = i % 2 ? 43 : 38
  return {
    ...t,
    x: +(CENTER + Math.cos(a) * radius).toFixed(2),
    y: +(CENTER + Math.sin(a) * radius).toFixed(2),
  }
})

/* PCB traces emanating from the chip (body box 30..70 in a 0..100 viewBox).
 * Right-angle "manhattan" routing out to a via pad. Deterministic (no random)
 * so SSR and client markup match. */
const PCB_TRACES = (() => {
  const along = [-12, 0, 12]
  const out = [16, 26, 20]
  const bend = [10, -12, 14]
  const traces: { pts: string; via: [number, number]; key: string }[] = []
  for (let s = 0; s < 4; s++) {
    for (let k = 0; k < 3; k++) {
      const a = along[k]
      const o = out[k]
      const b = bend[(s + k) % 3]
      let p0: [number, number], p1: [number, number], p2: [number, number]
      if (s === 0) {
        p0 = [50 + a, 30]
        p1 = [50 + a, 30 - o]
        p2 = [50 + a + b, 30 - o]
      } else if (s === 1) {
        p0 = [70, 50 + a]
        p1 = [70 + o, 50 + a]
        p2 = [70 + o, 50 + a + b]
      } else if (s === 2) {
        p0 = [50 + a, 70]
        p1 = [50 + a, 70 + o]
        p2 = [50 + a + b, 70 + o]
      } else {
        p0 = [30, 50 + a]
        p1 = [30 - o, 50 + a]
        p2 = [30 - o, 50 + a + b]
      }
      traces.push({ key: `${s}-${k}`, pts: `${p0[0]},${p0[1]} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`, via: p2 })
    }
  }
  return traces
})()

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
      <div className="absolute right-[-14%] top-1/2 h-[560px] w-[560px] -translate-y-1/2">
        {/* ambient glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fuchsia-500/20 via-purple-500/10 to-emerald-400/15 blur-3xl" />

        {/* neural network layer (logos ↔ core) */}
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

        {/* core — real chip on a circuit board */}
        <motion.div
          className="absolute left-1/2 top-1/2 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          animate={reduce ? {} : { scale: [1, 1.03, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* board glow */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{ boxShadow: "0 0 90px -10px rgba(168,85,247,0.55)", background: "radial-gradient(circle, rgba(124,58,237,0.18), transparent 70%)" }}
          />

          {/* PCB traces (larger than chip, spilling onto the board) */}
          <svg viewBox="0 0 100 100" className="absolute h-[150%] w-[150%] overflow-visible">
            <defs>
              <linearGradient id="trace" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6ee7b7" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
            {PCB_TRACES.map((t, i) => (
              <g key={t.key}>
                <polyline
                  points={t.pts}
                  fill="none"
                  stroke="url(#trace)"
                  strokeWidth={0.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.4}
                />
                <circle cx={t.via[0]} cy={t.via[1]} r={1.1} fill="none" stroke="url(#trace)" strokeWidth={0.5} opacity={0.5} />
                {!reduce && (
                  <motion.circle
                    r={0.8}
                    fill="#6ee7b7"
                    animate={{
                      cx: t.pts.split(" ").map((p) => +p.split(",")[0]),
                      cy: t.pts.split(" ").map((p) => +p.split(",")[1]),
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "linear", delay: (i % 5) * 0.5, repeatDelay: 1 }}
                  />
                )}
              </g>
            ))}
          </svg>

          <ChipMark reduce={!!reduce} />
        </motion.div>
      </div>

      {/* logo nodes (gentle float, no orbit) */}
      <div className="absolute right-[-14%] top-1/2 h-[560px] w-[560px] -translate-y-1/2">
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
      </div>
    </div>
  )
}

/* Realistic processor: square body, dense fine pins on all four sides, an
 * inner die with a contact grid, and a pin-1 orientation marker. No text. */
function ChipMark({ reduce }: { reduce: boolean }) {
  const pins = Array.from({ length: 11 }, (_, i) => +(33 + i * 3.4).toFixed(2))
  const padGrid = [43, 50, 57]
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="relative h-28 w-28"
      animate={reduce ? {} : { scale: [1, 1.04, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      style={{ filter: "drop-shadow(0 0 14px rgba(217,70,239,0.85))" }}
    >
      <defs>
        <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5d0fe" />
          <stop offset="45%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
        <linearGradient id="chipBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16161f" />
          <stop offset="100%" stopColor="#0a0a12" />
        </linearGradient>
      </defs>

      {/* pins (gold-ish fine legs) */}
      <g stroke="url(#chipGrad)" strokeWidth="1.4" strokeLinecap="round">
        {pins.map((p) => (
          <line key={`t${p}`} x1={p} y1="24" x2={p} y2="30" />
        ))}
        {pins.map((p) => (
          <line key={`b${p}`} x1={p} y1="70" x2={p} y2="76" />
        ))}
        {pins.map((p) => (
          <line key={`l${p}`} x1="24" y1={p} x2="30" y2={p} />
        ))}
        {pins.map((p) => (
          <line key={`r${p}`} x1="70" y1={p} x2="76" y2={p} />
        ))}
      </g>

      {/* chip body */}
      <rect x="30" y="30" width="40" height="40" rx="4" fill="url(#chipBody)" stroke="url(#chipGrad)" strokeWidth="1.6" />
      <rect x="32" y="32" width="36" height="36" rx="3" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />

      {/* inner die */}
      <rect x="40" y="40" width="20" height="20" rx="2" fill="none" stroke="url(#chipGrad)" strokeWidth="1.2" />
      {/* contact grid */}
      <g fill="url(#chipGrad)" opacity="0.9">
        {padGrid.flatMap((gx) => padGrid.map((gy) => <circle key={`${gx}-${gy}`} cx={gx} cy={gy} r="1.1" />))}
      </g>

      {/* pin-1 orientation marker */}
      <circle cx="35" cy="35" r="1.5" fill="#fff" opacity="0.8" />

      {/* live core node */}
      <motion.circle
        cx="50"
        cy="50"
        r="2.4"
        fill="#fff"
        animate={reduce ? { opacity: 0.9 } : { opacity: [0.4, 1, 0.4], r: [2, 3.2, 2] }}
        transition={reduce ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  )
}
