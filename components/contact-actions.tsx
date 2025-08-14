"use client"

import { Mail, Phone, MapPin, Linkedin, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function ContactActions({
  email = "example@email.com",
  phone = "+977 0000000000",
  location = "Kathmandu, Nepal",
  linkedinUrl = "#",
}: {
  email?: string
  phone?: string
  location?: string
  linkedinUrl?: string
}) {
  const [copied, setCopied] = useState<string | null>(null)

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      setTimeout(() => setCopied(null), 1500)
    } catch {
      // no-op
    }
  }

  const itemClass =
    "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80"

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={itemClass}>
        <Mail className="h-4 w-4 text-emerald-300" />
        {email}
        <Button
          variant="ghost"
          size="sm"
          className="-mr-2 ml-1 h-6 w-6 p-0 text-white/70 hover:bg-white/10"
          onClick={() => copy(email, "email")}
          aria-label={"Copy email"}
        >
          {copied === "email" ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </span>

      <span className={itemClass}>
        <Phone className="h-4 w-4 text-emerald-300" />
        {phone}
        <Button
          variant="ghost"
          size="sm"
          className="-mr-2 ml-1 h-6 w-6 p-0 text-white/70 hover:bg-white/10"
          onClick={() => copy(phone, "phone")}
          aria-label={"Copy phone"}
        >
          {copied === "phone" ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </span>

      <span className={itemClass}>
        <MapPin className="h-4 w-4 text-emerald-300" />
        {location}
      </span>

      <a href={linkedinUrl} target="_blank" rel="noreferrer" className={itemClass}>
        <Linkedin className="h-4 w-4 text-emerald-300" />
        {"LinkedIn"}
      </a>
    </div>
  )
}
