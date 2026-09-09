"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

/* Light/dark switch. Reflects the class set pre-paint by the inline script in
 * root, then flips it and persists the choice. No provider, no dependency. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    try {
      localStorage.setItem("theme", next ? "dark" : "light")
    } catch {
      // ignore
    }
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-surface text-muted-foreground transition-colors hover:text-foreground ${className}`}
    >
      {dark ? <Sun className="h-4 w-4" strokeWidth={1.75} /> : <Moon className="h-4 w-4" strokeWidth={1.75} />}
    </button>
  )
}
