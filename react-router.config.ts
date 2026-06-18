import type { Config } from "@react-router/dev/config";
import { caseStudySlugs } from "./lib/case-studies";

export default {
  ssr: false,
  prerender: [
    "/",
    "/ai-demo",
    "/projects",
    "/case-studies",
    ...caseStudySlugs.map((s) => `/case-studies/${s}`),
  ],
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
} satisfies Config;
