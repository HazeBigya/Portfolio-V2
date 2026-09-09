/* Calm, theme-aware ambience. One faint brand-tinted glow near the top and a
 * soft vignette. No drifting neon blobs, no tri-gradient. Static by design, so
 * nothing to gate on reduced motion. */
export function BackgroundFX() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--brand), transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, transparent 55%, color-mix(in oklch, var(--foreground) 6%, transparent) 100%)",
        }}
      />
    </div>
  )
}
