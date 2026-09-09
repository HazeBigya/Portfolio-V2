import { cn } from "../lib/utils"

/* Official docs for each skill. Anything not listed falls back to a web search,
 * so new skills still link somewhere sensible. */
const DOC_LINKS: Record<string, string> = {
  // Frontend
  JavaScript: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  TypeScript: "https://www.typescriptlang.org/docs/",
  React: "https://react.dev/",
  Vue: "https://vuejs.org/guide/introduction.html",
  jQuery: "https://api.jquery.com/",
  "Next.js": "https://nextjs.org/docs",
  Tailwind: "https://tailwindcss.com/docs",
  // Backend & APIs
  GraphQL: "https://graphql.org/learn/",
  Serverless: "https://www.serverless.com/framework/docs",
  "Node.js": "https://nodejs.org/en/docs",
  Express: "https://expressjs.com/",
  REST: "https://developer.mozilla.org/en-US/docs/Glossary/REST",
  WebSockets: "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API",
  PHP: "https://www.php.net/docs.php",
  // Data & Storage
  Valkey: "https://valkey.io/",
  Redis: "https://redis.io/docs/latest/",
  ElastiCache: "https://docs.aws.amazon.com/elasticache/",
  PostgreSQL: "https://www.postgresql.org/docs/",
  MongoDB: "https://www.mongodb.com/docs/",
  MySQL: "https://dev.mysql.com/doc/",
  IndexedDB: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API",
  // DevOps & CI/CD
  "AWS CodeBuild": "https://docs.aws.amazon.com/codebuild/",
  CloudFormation: "https://docs.aws.amazon.com/cloudformation/",
  Terraform: "https://developer.hashicorp.com/terraform/docs",
  "GitHub Actions": "https://docs.github.com/actions",
  Docker: "https://docs.docker.com/",
  Jenkins: "https://www.jenkins.io/doc/",
  Wowza: "https://www.wowza.com/docs",
  Monitoring: "https://docs.aws.amazon.com/cloudwatch/",
  // AWS Cloud
  Bedrock: "https://docs.aws.amazon.com/bedrock/",
  AppSync: "https://docs.aws.amazon.com/appsync/",
  "Step Functions": "https://docs.aws.amazon.com/step-functions/",
  "Kinesis Firehose": "https://docs.aws.amazon.com/firehose/",
  Glue: "https://docs.aws.amazon.com/glue/",
  Athena: "https://docs.aws.amazon.com/athena/",
  KMS: "https://docs.aws.amazon.com/kms/",
  MediaConvert: "https://docs.aws.amazon.com/mediaconvert/",
  IVS: "https://docs.aws.amazon.com/ivs/",
  Lambda: "https://docs.aws.amazon.com/lambda/",
  DynamoDB: "https://docs.aws.amazon.com/dynamodb/",
  S3: "https://docs.aws.amazon.com/s3/",
  CloudFront: "https://docs.aws.amazon.com/cloudfront/",
  EC2: "https://docs.aws.amazon.com/ec2/",
  ECS: "https://docs.aws.amazon.com/ecs/",
  "IoT Core": "https://docs.aws.amazon.com/iot/",
  // Emerging Tech
  RAG: "https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html",
  "Agentic Workflows": "https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html",
  "Vector DBs": "https://en.wikipedia.org/wiki/Vector_database",
  Embeddings: "https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html",
  "Semantic Search": "https://en.wikipedia.org/wiki/Semantic_search",
  "LLMs (Claude)": "https://docs.anthropic.com/",
  HLS: "https://developer.apple.com/streaming/",
  WebRTC: "https://webrtc.org/",
  IoT: "https://docs.aws.amazon.com/iot/",
  MQTT: "https://mqtt.org/",
  "Real-time Analytics": "https://en.wikipedia.org/wiki/Real-time_analytics",
  "Edge Computing": "https://en.wikipedia.org/wiki/Edge_computing",
  "Hybrid Apps": "https://cordova.apache.org/docs/en/latest/",
}

function urlFor(name: string) {
  return DOC_LINKS[name] ?? `https://www.google.com/search?q=${encodeURIComponent(name + " documentation")}`
}

/* A skill tag that links to official docs. Calm by default, brand outline on
 * hover. No glow, no shimmer, no per-group colour. */
export function SkillBadge({ name, className }: { name: string; className?: string }) {
  return (
    <a
      href={urlFor(name)}
      target="_blank"
      rel="noreferrer"
      aria-label={`${name} documentation (opens in new tab)`}
      className={cn(
        "inline-flex items-center rounded-full border border-hairline bg-surface px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-brand/50 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className,
      )}
    >
      {name}
    </a>
  )
}
