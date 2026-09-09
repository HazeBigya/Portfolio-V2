"use client"

import { Mail, Phone, MapPin, Linkedin, Github, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "./ui/button"

export function ContactActions({
  email = "example@email.com",
  phone = "+977 0000000000",
  location = "Kathmandu, Nepal",
  linkedinUrl = "#",
  githubUrl,
}: {
  email?: string
  phone?: string
  location?: string
  linkedinUrl?: string
  githubUrl?: string
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
    "inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-3 py-1.5 text-sm text-muted-foreground"

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className={itemClass}>
        <Mail className="h-4 w-4 text-brand" />
        {email}
        <Button
          variant="ghost"
          size="sm"
          className="-mr-2 ml-1 h-6 w-6 p-0 text-muted-foreground hover:bg-surface-2"
          onClick={() => copy(email, "email")}
          aria-label={"Copy email"}
        >
          {copied === "email" ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </span>

      <span className={itemClass}>
        <Phone className="h-4 w-4 text-brand" />
        {phone}
        <Button
          variant="ghost"
          size="sm"
          className="-mr-2 ml-1 h-6 w-6 p-0 text-muted-foreground hover:bg-surface-2"
          onClick={() => copy(phone, "phone")}
          aria-label={"Copy phone"}
        >
          {copied === "phone" ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </span>

      <span className={itemClass}>
        <MapPin className="h-4 w-4 text-brand" />
        {location}
      </span>

      <a href={linkedinUrl} target="_blank" rel="noreferrer" className={itemClass}>
        <Linkedin className="h-4 w-4 text-brand" />
        {"LinkedIn"}
      </a>

      {githubUrl && (
        <a href={githubUrl} target="_blank" rel="noreferrer" className={itemClass}>
          <Github className="h-4 w-4 text-brand" />
          {"GitHub"}
        </a>
      )}
    </div>
  )
}
