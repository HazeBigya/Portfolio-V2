# Bigya Tuladhar — Portfolio

A modern, high‑performance portfolio built to showcase my work and skills across frontend, backend, and AWS cloud.

## Built with
- Next.js 15 (App Router) + React 19
- TypeScript
- Tailwind CSS 4
- Radix UI primitives (customized components in `components/ui`)
- Framer Motion (subtle animations)
- Lucide Icons

## What this showcases (my skills)
- Frontend: JavaScript/TypeScript, React, Vue, Tailwind, SCSS, Radix UI, animations (Framer Motion)
- Backend & APIs: Node.js, Express, REST, WebSockets, Serverless, OpenAPI
- AWS Cloud: Lambda, API Gateway, S3/CloudFront, IVS (Low Latency & Real‑Time), Step Functions, MediaConvert, Route 53, IoT Core, Athena/Glue, KMS/Secrets Manager, Amplify, WAF, SNS
- Data & Storage: DynamoDB, PostgreSQL, MySQL, MongoDB, Redis/Valkey, ElastiCache, IndexedDB
- DevOps & CI/CD: Jenkins, Docker, GitHub Actions, GitLab CI/CD, Bash, YAML, AWS CLI, Nginx/Apache

## Getting started
- Install deps: `pnpm i` or `npm i`
- Dev: `pnpm dev` or `npm run dev`
- Prod build: `pnpm build` or `npm run build`

## Static export (for S3 hosting)
This project can be exported as a static site and hosted on Amazon S3.

1) Ensure the config enables static export (already image optimization disabled):
```ts
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: 'export',            // add this line
  trailingSlash: true,         // optional; helpful for S3 website hosting
}
export default nextConfig
```

2) Build and export to `out/`:
```bash
pnpm build
# If needed: npx next export -o out
```

3) Upload `out/` to S3 (static website hosting):
- Create an S3 bucket with "Block all public access" disabled (or use CloudFront in front for better security)
- Enable static website hosting and note the endpoint
- Upload the contents of `out/` (not the folder itself)
- Set index document to `index.html`; error document to `404.html` (if present)

With CloudFront:
- Point a CloudFront distribution to the S3 bucket, cache static assets aggressively, and attach a domain via Route 53 + ACM SSL.

## Project structure
- `app/` — routes (`page.tsx`), layout (`layout.tsx`), and sections
- `components/` — UI and building blocks
- `public/` — static assets (images, `bigya_cv.pdf`)
