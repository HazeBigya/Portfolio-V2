"use client"

import { Fragment } from "react"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import type { DiagramNode } from "../lib/case-studies"

/* On-brand architecture flow: data-driven nodes rendered left→right with
 * arrows, wrapping responsively. Pure layout + framer reveal. */
export function FlowDiagram({ nodes, accent }: { nodes: DiagramNode[]; accent: string }) {
  return (
    <div className="flex flex-wrap items-stretch gap-y-3">
      {nodes.map((n, i) => (
        <Fragment key={n.label + i}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.08 }}
            className="relative flex min-w-[120px] flex-col justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="absolute left-0 top-3 h-[calc(100%-1.5rem)] w-0.5 rounded-full" style={{ background: accent }} />
            <div className="pl-2 text-sm font-medium text-white">{n.label}</div>
            {n.note && <div className="pl-2 text-xs text-white/55">{n.note}</div>}
          </motion.div>
          {i < nodes.length - 1 && (
            <div className="flex items-center px-1.5 text-white/30">
              <ChevronRight className="h-5 w-5" />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
