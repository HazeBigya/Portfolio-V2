"use client"

import { useEffect, useMemo, useState } from "react"

type Item = { href: string; label: string }

const navItems: Item[] = [
  { href: "#skills", label: "Skills & Tools" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("")

  // Scrollspy
  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", ""))
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    if (!("IntersectionObserver" in window) || els.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id)
        })
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const NavLinks = useMemo(
    () =>
      navItems.map((l) => {
        const isActive = active ? active === l.href : l.href === "#skills" // default to first section
        return (
          <a
            key={l.href}
            href={l.href}
            aria-current={isActive ? "page" : undefined}
            className={`text-sm transition ${isActive ? "text-white" : "text-white/70 hover:text-white"}`}
            onClick={() => setOpen(false)}
          >
            {l.label}
          </a>
        )
      }),
    [active],
  )

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#" className="group inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_3px] shadow-emerald-500/50" />
          <span className="bg-gradient-to-r from-fuchsia-300 via-purple-300 to-emerald-300 bg-clip-text text-sm font-semibold text-transparent">
            {"BIGYA TULADHAR"}
          </span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">{NavLinks}</nav>

        <button
          className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 p-2 text-white hover:bg-white/10 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{open ? "Close" : "Open"} menu</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <path
              d={open ? "M6 18L18 6M6 6l12 12" : "M3 6h18M3 12h18M3 18h18"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-black/70 md:hidden">
          <nav className="mx-auto max-w-6xl px-6 py-3">
            <div className="flex flex-col gap-3">{NavLinks}</div>
          </nav>
        </div>
      )}
    </header>
  )
}
