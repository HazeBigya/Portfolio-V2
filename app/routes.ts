import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("ai-demo", "routes/ai-demo.tsx"),
  route("projects", "routes/projects.tsx"),
  route("case-studies", "routes/case-studies.tsx"),
  route("case-studies/:slug", "routes/case-study.tsx"),
] satisfies RouteConfig;
