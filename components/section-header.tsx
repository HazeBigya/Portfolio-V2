/* Section heading. A small brand tick, an optional plain-language tag, and the
 * title. No uppercase-tracked eyebrow, no gradient text. */
export function SectionHeader({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-8 mt-24">
      <div className="flex items-center gap-2">
        <span className="h-3 w-0.5 rounded-full bg-brand" />
        {eyebrow && <span className="text-sm font-medium text-brand">{eyebrow}</span>}
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2>
    </div>
  )
}
