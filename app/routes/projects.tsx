import { ArrowLeft } from "lucide-react";
import { BackgroundFX } from "../../components/background-fx";
import { SiteHeader } from "../../components/site-header";
import { ProjectCard } from "../../components/project-card";
import { ALL_PROJECTS_ORDERED } from "../../data/cv";
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
    <div className="relative min-h-screen overflow-clip bg-background text-foreground antialiased scroll-smooth">
      <BackgroundFX />
      <SiteHeader />

      <main className="relative">
        <section className="relative pt-28 md:pt-36">
          <div className="mx-auto max-w-6xl px-6">
            <a href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              {"Back to portfolio"}
            </a>

            <div className="mt-6 text-sm font-medium text-brand">{"Selected"}</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {"Projects"}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              {"Platforms, dashboards, and apps I've built end to end — across livestreaming, AI, e-commerce, and more."}
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ALL_PROJECTS_ORDERED.map((p, i) => (
                <ProjectCard key={p.name} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative mt-24 border-t border-hairline bg-background/80 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <a href="/" className="text-sm text-muted-foreground hover:text-foreground">
            {"← Bigya Tuladhar"}
          </a>
          <div className="text-sm text-muted-foreground">
            {"© "}
            {new Date().getFullYear()}
            {" BIGYA TULADHAR"}
          </div>
        </div>
      </footer>
    </div>
  );
}
