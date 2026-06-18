import { ArrowLeft } from "lucide-react";
import { BackgroundFX } from "../../components/background-fx";
import { SiteHeader } from "../../components/site-header";
import { ProjectCard } from "../../components/project-card";
import { PROJECTS } from "../../lib/projects";
import { seo } from "../../lib/seo";

export function meta() {
  return seo({
    title: "Projects — Bigya Tuladhar",
    description:
      "Selected projects by Bigya Tuladhar — livestreaming platforms, AI analytics dashboards, e-commerce, CMS, and booking systems built end to end.",
    path: "/projects",
  });
}

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen overflow-clip bg-black text-white antialiased scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        <section className="relative pt-28 md:pt-36">
          <div className="mx-auto max-w-6xl px-6">
            <a href="/#projects" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              {"Back to portfolio"}
            </a>

            <div className="mt-6 text-sm uppercase tracking-widest text-white/50">{"Selected"}</div>
            <h1 className="mt-3 bg-gradient-to-r from-fuchsia-300 via-purple-300 to-emerald-300 bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
              {"Projects"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/70">
              {"Platforms, dashboards, and apps I've built end to end — across livestreaming, AI, e-commerce, and more."}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} />
              ))}
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
