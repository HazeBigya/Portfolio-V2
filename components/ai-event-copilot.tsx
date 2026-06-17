"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Bot, MessageSquare, Send, Sparkles } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"

/* ============================================================================
 * FICTIONAL KNOWLEDGE BASE — edit everything here.
 * ----------------------------------------------------------------------------
 * This is an ORIGINAL, from-scratch concept demo. All data below is invented
 * for a made-up conference ("TechConf 2026"). No real company, product, or
 * person. Everything runs client-side: no API, no backend, no network calls,
 * no localStorage/sessionStorage.
 *
 * - `KB.entries` powers Q&A Generation + the RAG Chatbot.
 *     • `keywords` drive the chatbot's keyword match.
 *     • `source`   is the "grounded in:" citation tag.
 * - `ANALYTICS` powers Agent Mode (the fake "event dataset" the agent queries).
 * ========================================================================== */

type KBEntry = {
  id: string
  source: string
  keywords: string[]
  question: string
  answer: string
}

const KB: { event: string; entries: KBEntry[] } = {
  event: "TechConf 2026",
  entries: [
    {
      id: "keynote",
      source: "Keynote Agenda",
      keywords: ["keynote", "speaker", "open", "opening", "aria", "venn", "who"],
      question: "Who is delivering the TechConf 2026 keynote?",
      answer:
        "Dr. Aria Venn, Chief AI Architect at Helios Labs, opens TechConf 2026 with a keynote on grounded enterprise agents.",
    },
    {
      id: "schedule",
      source: "Event Schedule",
      keywords: ["when", "date", "dates", "schedule", "day", "days", "track", "tracks"],
      question: "When does TechConf 2026 run?",
      answer:
        "TechConf 2026 runs March 18–20, 2026, across three tracks: AI Platforms, Real-Time Systems, and Cloud Cost.",
    },
    {
      id: "venue",
      source: "Venue Operations",
      keywords: ["venue", "where", "location", "capacity", "seats", "hall", "held"],
      question: "Where is it held and what is the capacity?",
      answer:
        "The event is at the Meridian Convention Center — main hall capacity 4,200 seats plus three breakout theaters.",
    },
    {
      id: "product",
      source: "Product Brief · NimbusStream X1",
      keywords: ["product", "nimbus", "nimbusstream", "spec", "specs", "latency", "x1", "stream", "streaming"],
      question: "What are the NimbusStream X1 specs?",
      answer:
        "NimbusStream X1 delivers sub-300ms live latency, adaptive HLS up to 4K, and token-based stream encryption.",
    },
    {
      id: "sponsors",
      source: "Sponsorship Deck",
      keywords: ["sponsor", "sponsors", "partner", "partners", "headline"],
      question: "Who are the headline sponsors?",
      answer:
        "Headline sponsors are Helios Labs, Vantage Cloud, and Orbit Analytics, with twelve supporting partners.",
    },
    {
      id: "attendees",
      source: "Registration Analytics",
      keywords: ["attendee", "attendees", "registered", "people", "joined", "many", "count"],
      question: "How many attendees registered?",
      answer: "9,840 attendees registered for TechConf 2026 — a 27% increase over TechConf 2025.",
    },
    {
      id: "workshops",
      source: "Workshop Catalog",
      keywords: ["workshop", "workshops", "session", "sessions", "hands-on", "lab", "labs"],
      question: "What hands-on workshops are offered?",
      answer:
        "Six hands-on labs, including ‘Build a RAG copilot’, ‘Real-time data with AppSync’, and ‘Cutting cloud cost 40%’.",
    },
  ],
}

/* The fake dataset Agent Mode "queries". Pure local object. */
const ANALYTICS = {
  dataset: "techconf_2026_attendance.json",
  totalAttendees: 9840,
  peakConcurrent: 6120,
  topCountry: { name: "United States", pct: 34 },
  devices: [
    { label: "Desktop", value: 52 },
    { label: "Mobile", value: 38 },
    { label: "Tablet", value: 10 },
  ],
}

/* The four questions Q&A Generation "produces" from the KB. */
const GENERATED_IDS = ["keynote", "product", "attendees", "workshops"]

/* Suggested chips for the RAG chatbot. */
const SUGGESTED_IDS = ["keynote", "venue", "product", "sponsors"]

/* ---------------------------------------------------------------------------
 * Agent Mode presets — each maps a plain-language question to scripted
 * reasoning steps and a result renderer reading from ANALYTICS.
 * ------------------------------------------------------------------------- */
type AgentPreset = {
  id: string
  label: string
  steps: string[]
  render: "stat" | "country" | "devices"
}

const AGENT_PRESETS: AgentPreset[] = [
  {
    id: "attendees",
    label: "How many attendees joined?",
    steps: ["Planning query", `Querying ${ANALYTICS.dataset}`, "Aggregating registrations", "Result"],
    render: "stat",
  },
  {
    id: "country",
    label: "Top country?",
    steps: ["Planning query", `Querying ${ANALYTICS.dataset}`, "Grouping by country", "Result"],
    render: "country",
  },
  {
    id: "devices",
    label: "Device breakdown?",
    steps: ["Planning query", `Querying ${ANALYTICS.dataset}`, "Computing device split", "Result"],
    render: "devices",
  },
]

const byId = (id: string) => KB.entries.find((e) => e.id === id)!

/* Shared card styling lifted from the site's design language. */
const cardCls =
  "rounded-2xl border border-white/10 bg-white/5 p-5"
const pillCls =
  "inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-400/15 via-purple-400/15 to-fuchsia-400/15 px-3 py-1 text-xs text-white ring-1 ring-white/10"

/* ===========================================================================
 * MODE 1 — AI Q&A GENERATION
 * ========================================================================= */
function QAGeneration() {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<"idle" | "generating" | "done">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current) }, [])

  const generate = useCallback(() => {
    setPhase("generating")
    const delay = reduce ? 0 : 650
    timer.current = setTimeout(() => setPhase("done"), delay)
  }, [reduce])

  const items = GENERATED_IDS.map(byId)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={generate}
          disabled={phase === "generating"}
          className="border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 text-black hover:opacity-90"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          {phase === "done" ? "Regenerate Questions" : "Generate Questions"}
        </Button>
        <span className="text-xs text-white/50">
          {phase === "generating" ? "Reading knowledge base…" : "Generated from the TechConf 2026 knowledge base"}
        </span>
      </div>

      <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence>
          {phase === "done" &&
            items.map((it, i) => (
              <motion.div
                key={it.id}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: reduce ? 0 : i * 0.1 }}
                className={cardCls}
              >
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-fuchsia-300" />
                  <div className="text-sm font-medium text-white">{it.question}</div>
                </div>
                <div className="mt-3 text-sm text-white/75">{it.answer}</div>
                <div className="mt-4">
                  <span className={pillCls}>grounded in: {it.source}</span>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {phase === "idle" && (
        <p className="text-sm text-white/40">
          Press <span className="text-white/70">Generate Questions</span> to see AI-drafted questions and grounded answers.
        </p>
      )}
    </div>
  )
}

/* ===========================================================================
 * MODE 2 — RAG CHATBOT
 * ========================================================================= */
type ChatMsg = { id: number; role: "user" | "bot"; text: string; source?: string }

const FALLBACK = "I can only answer from the TechConf 2026 knowledge base. Try asking about the keynote, venue, product specs, sponsors, or attendees."

function matchEntry(input: string): KBEntry | null {
  const q = input.toLowerCase()
  let best: { entry: KBEntry; hits: number } | null = null
  for (const entry of KB.entries) {
    const hits = entry.keywords.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0)
    if (hits > 0 && (!best || hits > best.hits)) best = { entry, hits }
  }
  return best?.entry ?? null
}

function RagChatbot() {
  const reduce = useReducedMotion()
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const [stream, setStream] = useState<{ words: string[]; shown: number; source?: string } | null>(null)
  const idRef = useRef(0)
  const timers = useRef<Array<ReturnType<typeof setTimeout> | ReturnType<typeof setInterval>>>([])
  const logRef = useRef<HTMLDivElement>(null)

  const clearTimers = () => {
    timers.current.forEach((t) => { clearTimeout(t); clearInterval(t) })
    timers.current = []
  }
  useEffect(() => () => clearTimers(), [])

  // keep newest message in view inside the scroll container only (no page jump)
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [messages, thinking, stream])

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim()
      if (!text || thinking || stream) return
      clearTimers()
      const userMsg: ChatMsg = { id: idRef.current++, role: "user", text }
      setMessages((m) => [...m, userMsg])
      setInput("")

      const match = matchEntry(text)
      const answer = match ? `Based on ${match.source}: ${match.answer}` : FALLBACK
      const source = match?.source

      const commitInstant = () =>
        setMessages((m) => [...m, { id: idRef.current++, role: "bot", text: answer, source }])

      if (reduce) {
        commitInstant()
        return
      }

      setThinking(true)
      timers.current.push(
        setTimeout(() => {
          setThinking(false)
          const words = answer.split(" ")
          setStream({ words, shown: 0, source })
          const iv = setInterval(() => {
            setStream((s) => {
              if (!s) return s
              const next = s.shown + 1
              if (next >= s.words.length) {
                clearInterval(iv)
                setMessages((m) => [...m, { id: idRef.current++, role: "bot", text: answer, source }])
                // defer clearing the streaming bubble to next tick to avoid flash
                timers.current.push(setTimeout(() => setStream(null), 0))
                return { ...s, shown: s.words.length }
              }
              return { ...s, shown: next }
            })
          }, 45)
          timers.current.push(iv)
        }, 700),
      )
    },
    [reduce, thinking, stream],
  )

  return (
    <div className="space-y-4">
      <div
        ref={logRef}
        aria-live="polite"
        aria-label="Chat conversation"
        className="max-h-80 min-h-[10rem] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-black/30 p-4"
      >
        {messages.length === 0 && !thinking && !stream && (
          <p className="text-sm text-white/40">
            Ask about TechConf 2026 — or pick a suggested question below.
          </p>
        )}

        {messages.map((m) => (
          <Bubble key={m.id} role={m.role} text={m.text} source={m.source} />
        ))}

        {stream && (
          <Bubble
            role="bot"
            text={stream.words.slice(0, stream.shown).join(" ")}
            source={stream.shown >= stream.words.length ? stream.source : undefined}
            streaming
          />
        )}

        {thinking && (
          <div className="flex items-center gap-2 text-white/60">
            <Bot className="h-4 w-4 text-emerald-300" />
            <span className="flex gap-1" aria-label="Assistant is thinking">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-white/60"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {SUGGESTED_IDS.map(byId).map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => send(e.question)}
            disabled={thinking || !!stream}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/10 disabled:opacity-40"
          >
            {e.question}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input) }}
        className="flex items-center gap-2"
      >
        <label htmlFor="rag-input" className="sr-only">Ask the TechConf 2026 assistant</label>
        <Input
          id="rag-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the keynote, venue, product…"
          className="border-white/15 bg-white/5 text-white placeholder:text-white/40"
        />
        <Button
          type="submit"
          disabled={thinking || !!stream || !input.trim()}
          className="border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 text-black hover:opacity-90"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send</span>
        </Button>
      </form>
    </div>
  )
}

function Bubble({ role, text, source, streaming }: { role: "user" | "bot"; text: string; source?: string; streaming?: boolean }) {
  const isUser = role === "user"
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isUser
            ? "max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-r from-fuchsia-500/20 to-purple-500/20 px-3.5 py-2 text-sm text-white ring-1 ring-white/10"
            : "max-w-[85%] rounded-2xl rounded-bl-sm border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white/85"
        }
      >
        {!isUser && (
          <div className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-emerald-300/80">
            <Bot className="h-3 w-3" /> assistant
          </div>
        )}
        <span>{text}</span>
        {streaming && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-white/70" />}
        {source && (
          <div className="mt-2">
            <span className={pillCls}>grounded in: {source}</span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ===========================================================================
 * MODE 3 — AGENT MODE
 * ========================================================================= */
function AgentMode() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState<AgentPreset | null>(null)
  const [stepsShown, setStepsShown] = useState(0)
  const [done, setDone] = useState(false)
  const timers = useRef<Array<ReturnType<typeof setTimeout>>>([])

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => () => clearTimers(), [])

  const run = useCallback(
    (preset: AgentPreset) => {
      clearTimers()
      setActive(preset)
      setDone(false)

      if (reduce) {
        setStepsShown(preset.steps.length)
        setDone(true)
        return
      }

      setStepsShown(0)
      preset.steps.forEach((_, i) => {
        timers.current.push(
          setTimeout(() => {
            setStepsShown(i + 1)
            if (i === preset.steps.length - 1) setDone(true)
          }, 500 * (i + 1)),
        )
      })
    },
    [reduce],
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {AGENT_PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => run(p)}
            className={`rounded-full px-3.5 py-1.5 text-xs transition ring-1 ${
              active?.id === p.id
                ? "bg-gradient-to-r from-fuchsia-500/25 via-purple-500/25 to-emerald-400/25 text-white ring-white/20"
                : "border border-white/10 bg-white/5 text-white/80 ring-transparent hover:bg-white/10"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div aria-live="polite" className={cardCls + " min-h-[12rem]"}>
        {!active && (
          <p className="text-sm text-white/40">
            Pick a question. The agent plans, queries a local dataset, then returns a result.
          </p>
        )}

        {active && (
          <div className="space-y-4">
            {/* reasoning steps */}
            <ol className="space-y-2">
              {active.steps.map((step, i) => {
                const shown = i < stepsShown
                const isResult = i === active.steps.length - 1
                return (
                  <motion.li
                    key={step}
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: shown ? 1 : 0.25, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${
                        shown
                          ? isResult
                            ? "bg-emerald-400 text-black"
                            : "bg-purple-500/30 text-white ring-1 ring-purple-300/40"
                          : "bg-white/5 text-white/40"
                      }`}
                    >
                      {shown ? (isResult ? "✓" : i + 1) : i + 1}
                    </span>
                    <span className={shown ? "text-white/85" : "text-white/40"}>{step}</span>
                  </motion.li>
                )
              })}
            </ol>

            {/* result */}
            <AnimatePresence>
              {done && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <AgentResult render={active.render} reduce={!!reduce} />
                  <div className="mt-3 text-[11px] text-white/40">
                    Read from local <code className="text-white/60">{ANALYTICS.dataset}</code>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}

function AgentResult({ render, reduce }: { render: AgentPreset["render"]; reduce: boolean }) {
  if (render === "stat") {
    return (
      <div>
        <div className="bg-gradient-to-r from-fuchsia-300 via-purple-300 to-emerald-300 bg-clip-text text-3xl font-semibold text-transparent">
          {ANALYTICS.totalAttendees.toLocaleString()}
        </div>
        <div className="mt-1 text-sm text-white/70">total registered attendees · peak {ANALYTICS.peakConcurrent.toLocaleString()} concurrent</div>
      </div>
    )
  }
  if (render === "country") {
    return (
      <div>
        <div className="text-sm text-white/70">Top country by attendance</div>
        <div className="mt-1 text-2xl font-semibold text-white">{ANALYTICS.topCountry.name}</div>
        <Bar label={ANALYTICS.topCountry.name} value={ANALYTICS.topCountry.pct} reduce={reduce} />
      </div>
    )
  }
  return (
    <div className="space-y-2">
      <div className="text-sm text-white/70">Device breakdown</div>
      {ANALYTICS.devices.map((d) => (
        <Bar key={d.label} label={d.label} value={d.value} reduce={reduce} />
      ))}
    </div>
  )
}

function Bar({ label, value, reduce }: { label: string; value: number; reduce: boolean }) {
  return (
    <div className="mt-2">
      <div className="mb-1 flex justify-between text-xs text-white/60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400"
          initial={reduce ? false : { width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={reduce ? { width: `${value}%` } : undefined}
        />
      </div>
    </div>
  )
}

/* ===========================================================================
 * SECTION SHELL
 * ========================================================================= */
const triggerCls =
  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-fuchsia-500/25 data-[state=active]:via-purple-500/25 data-[state=active]:to-emerald-400/25 data-[state=active]:text-white text-white/60"

export function AIEventCopilot() {
  return (
    <div className="mt-8">
      <p className="max-w-3xl text-base text-white/75">
        I build AI copilots for live enterprise events: RAG-grounded Q&amp;A generation, knowledge-base chatbots, and
        agents that query event data on demand. This is an original, from-scratch recreation of those patterns using
        fictional data — built to show the capability, not a production system.
      </p>

      <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 md:p-7">
        <Tabs defaultValue="qa" className="gap-6">
          <TabsList className="h-auto flex-wrap gap-1 rounded-full border border-white/10 bg-black/30 p-1">
            <TabsTrigger value="qa" className={triggerCls}>
              <Sparkles className="mr-1.5 h-4 w-4" /> Q&amp;A Generation
            </TabsTrigger>
            <TabsTrigger value="chat" className={triggerCls}>
              <MessageSquare className="mr-1.5 h-4 w-4" /> RAG Chatbot
            </TabsTrigger>
            <TabsTrigger value="agent" className={triggerCls}>
              <Bot className="mr-1.5 h-4 w-4" /> Agent Mode
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qa"><QAGeneration /></TabsContent>
          <TabsContent value="chat"><RagChatbot /></TabsContent>
          <TabsContent value="agent"><AgentMode /></TabsContent>
        </Tabs>

        <p className="mt-6 text-center text-xs text-white/40">
          Original concept demo · fictional data · runs entirely client-side.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-white/70">Want the architecture behind the real thing?</span>
        <a
          href="#contact"
          className="bg-gradient-to-r from-fuchsia-300 via-purple-300 to-emerald-300 bg-clip-text font-medium text-transparent hover:opacity-80"
        >
          Let&apos;s talk →
        </a>
      </div>
    </div>
  )
}
