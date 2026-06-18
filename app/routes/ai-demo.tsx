import { ArrowLeft, ArrowRight, Bot, MessageSquare, Sparkles } from "lucide-react";
import { BackgroundFX } from "../../components/background-fx";
import { SiteHeader } from "../../components/site-header";
import { AIEventCopilot } from "../../components/ai-event-copilot";
import { seo } from "../../lib/seo";

const MODES = [
  {
    icon: Sparkles,
    title: "AI Q&A Generation",
    body: "Generates audience questions from a knowledge base, each with a grounded answer and a cited source — the moderator copilot pattern.",
    accent: "text-fuchsia-300",
  },
  {
    icon: MessageSquare,
    title: "RAG Chatbot",
    body: "Keyword-matches your question against the knowledge base and answers in a 'Based on [source]…' grounded style, with a friendly fallback when it can't.",
    accent: "text-purple-300",
  },
  {
    icon: Bot,
    title: "Agent Mode",
    body: "Plans a query, 'reads' a local dataset, and returns a conversational answer with an inline stat — the plain-language metrics agent pattern.",
    accent: "text-emerald-300",
  },
];

export function meta() {
  return seo({
    title: "AI Event Copilot — Interactive Demo · Bigya Tuladhar",
    description:
      "An original, client-side concept demo of the AI copilots I build for live enterprise events: RAG-grounded Q&A generation, a knowledge-base chatbot, and an agent that queries event data on demand. Fictional data.",
    path: "/ai-demo",
  });
}

export default function AIDemoPage() {
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white antialiased scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        <section className="relative pt-28 md:pt-36">
          <div className="mx-auto max-w-6xl px-6">
            <a href="/#ai-copilot" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              {"Back to portfolio"}
            </a>

            <div className="mt-6 text-sm uppercase tracking-widest text-white/50">{"Capability"}</div>
            <h1 className="mt-3 bg-gradient-to-r from-fuchsia-300 via-purple-300 to-emerald-300 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
              {"AI Event Copilot — concept demo"}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-white/75">
              {
                "This is an original, from-scratch recreation of the AI copilots I build for live enterprise events — the same patterns described in my AI/RAG case study, running entirely in your browser on fictional data. No backend, no API keys, no network calls."
              }
            </p>

            {/* what you're seeing */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {MODES.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-5 w-5 ${m.accent}`} />
                      <div className="font-medium text-white">{m.title}</div>
                    </div>
                    <p className="mt-2 text-sm text-white/70">{m.body}</p>
                  </div>
                );
              })}
            </div>

            {/* the interactive demo */}
            <div className="mt-10">
              <AIEventCopilot />
            </div>

            {/* production context */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-emerald-500/10 p-6">
              <div className="max-w-2xl text-white/80">
                {
                  "In production this runs on AWS Bedrock — Knowledge Bases for managed RAG, Bedrock Agents for live metric queries, grounded in event data via a Kinesis Firehose → S3 pipeline."
                }
              </div>
              <a
                href="/case-studies/ai-rag-event-copilot"
                className="group inline-flex shrink-0 items-center gap-2 rounded-md border-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-emerald-400 px-4 py-2 text-sm font-medium text-black hover:opacity-90"
              >
                {"Read the case study"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mt-24 border-t border-white/10 bg-black/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <a href="/" className="text-sm text-white/60 hover:text-white">
            {"← Bigya Tuladhar"}
          </a>
          <div className="text-sm text-white/60">
            {"© "}
            {new Date().getFullYear()}
            {" BIGYA TULADHAR"}
          </div>
        </div>
      </footer>
    </div>
  );
}
