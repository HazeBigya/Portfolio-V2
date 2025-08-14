export function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 mt-24">
      <div className="text-sm uppercase tracking-widest text-white/50">{eyebrow}</div>
      <h2 className="mt-3 bg-gradient-to-r from-fuchsia-300 via-purple-300 to-emerald-300 bg-clip-text text-3xl font-semibold text-transparent sm:text-4xl">
        {title}
      </h2>
    </div>
  )
}
