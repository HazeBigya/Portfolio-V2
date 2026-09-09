import { Mic, SendHorizonal } from "lucide-react"

/* A real (if compact) preview of the AI Booking Assistant's chat UI, used as the
 * project-card visual. Not a screenshot mock: it is the actual layout — header,
 * message bubbles, suggested time slots, input bar — scaled to fit the card's
 * thumbnail box. Reuses the portfolio's fuchsia/purple/emerald palette so it
 * sits naturally beside the photographic thumbnails. */
export function BookingChatPreview() {
  return (
    <div className="absolute inset-0 flex flex-col bg-gradient-to-br from-[#0b0b12] via-[#0d0b16] to-[#0a0f0d] text-white">
      {/* header */}
      <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[11px] font-medium text-white/90">Booking Assistant</span>
        <span className="ml-auto text-[9px] text-emerald-300/80">online</span>
      </div>

      {/* conversation */}
      <div className="flex flex-1 flex-col justify-center gap-1.5 px-3 py-1">
        <div className="max-w-[80%] self-start rounded-2xl rounded-tl-sm bg-white/10 px-2.5 py-1.5 text-[10px] leading-snug text-white/85">
          Hi! I can book you in. What day works?
        </div>
        <div className="max-w-[70%] self-end rounded-2xl rounded-br-sm bg-gradient-to-r from-fuchsia-500 to-purple-500 px-2.5 py-1.5 text-[10px] leading-snug text-white">
          Tuesday afternoon
        </div>
        <div className="mt-0.5 flex flex-wrap gap-1 self-start">
          {["2:00", "3:30", "4:15"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[9px] font-medium text-emerald-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* input bar */}
      <div className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
        <div className="flex flex-1 items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[9px] text-white/40">
          Type a message
        </div>
        <Mic className="h-3.5 w-3.5 text-white/40" strokeWidth={2} />
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-emerald-400 text-black">
          <SendHorizonal className="h-3 w-3" strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}
