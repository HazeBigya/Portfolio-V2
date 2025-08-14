export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      {/* Simplified, safe gradients (no arbitrary bracket values) */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/10 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-700/10 via-purple-700/10 to-emerald-600/10" />
    </div>
  )
}
