"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowDownToLine, Eye, EyeOff } from "lucide-react"
import { Button } from "./ui/button"
import { PROFILE } from "../data/cv"

/* Résumé card: PDF preview is collapsed by default and revealed on demand via
 * the Preview toggle. Download is always available. */
export function ResumePreview() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()

  return (
    <div className="overflow-hidden rounded-[14px] border border-hairline bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {`${PROFILE.name}, ${PROFILE.shortTitle}`}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="resume-preview-panel"
            className="border-hairline bg-surface text-foreground hover:bg-surface-2"
          >
            {open ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {open ? "Hide preview" : "Preview résumé"}
          </Button>
          <Button
            asChild
            className="bg-brand text-brand-foreground hover:bg-brand/90"
          >
            <a href={PROFILE.resumeUrl} download aria-label={"Download résumé as PDF"}>
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
              data="/Bigya_Tuladhar_CV.pdf#view=FitH"
              type="application/pdf"
              className="h-[60vh] w-full bg-surface-2 md:h-[85vh]"
              aria-label={"Résumé preview"}
            >
              <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
                <p className="text-sm text-muted-foreground">{"Inline preview isn't supported on this device."}</p>
                <Button asChild variant="outline" className="border-hairline bg-surface text-foreground hover:bg-surface-2">
                  <a href="/Bigya_Tuladhar_CV.pdf" target="_blank" rel="noreferrer">
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
