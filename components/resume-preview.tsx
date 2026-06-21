"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowDownToLine, Eye, EyeOff } from "lucide-react"
import { Button } from "./ui/button"

/* Résumé card: PDF preview is collapsed by default and revealed on demand via
 * the Preview toggle. Download is always available. */
export function ResumePreview() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 ring-2 ring-emerald-500/50" />
          {"Bigya Tuladhar — Senior Full-Stack & Cloud Engineer · AI & Cloud"}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="resume-preview-panel"
            className="border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            {open ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {open ? "Hide preview" : "Preview résumé"}
          </Button>
          <Button
            asChild
            className="border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 text-black hover:opacity-90"
          >
            <a href="/bigya_cv.pdf" download aria-label={"Download résumé as PDF"}>
              <ArrowDownToLine className="mr-2 h-4 w-4" />
              {"Download PDF"}
            </a>
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="resume-preview-panel"
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <object
              data="/bigya_cv.pdf#view=FitH"
              type="application/pdf"
              className="h-[60vh] w-full bg-neutral-900 md:h-[85vh]"
              aria-label={"Résumé preview"}
            >
              <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                <p className="text-sm text-white/70">{"Inline preview isn't supported on this device."}</p>
                <Button asChild variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10">
                  <a href="/bigya_cv.pdf" target="_blank" rel="noreferrer">
                    {"Open résumé in a new tab"}
                  </a>
                </Button>
              </div>
            </object>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
