/* Case-study content. Single source of truth — the index and detail pages
 * render from here, and react-router.config.ts prerenders one page per slug.
 *
 * TODO(gemini): values tagged `verify:` are seeded from the CV. Replace with
 * the real numbers / specifics pulled from the Gemini build chats:
 *   - hard before/after metrics (latency, %, $, concurrency)
 *   - the exact constraint that forced each decision
 *   - anything tried that failed (great case-study material)
 */

export type Verdict = "chosen" | "rejected"

/* Long-form article section. When a study has `sections`, the detail page
 * renders them as the main body (headings + paragraphs + explained bullets)
 * for research-paper depth, instead of the terse problem/decision/architecture. */
export type Section = {
  heading: string
  paragraphs?: string[]
  bullets?: { label?: string; text: string }[]
}

/* A node in the architecture flow diagram (rendered left→right with arrows). */
export type DiagramNode = { label: string; note?: string }

export type CaseStudy = {
  slug: string
  title: string
  tagline: string
  accent: string // hex, drives per-study accent glow
  duration?: string
  role?: string
  /** The situation + the constraint that made it hard. */
  problem: string
  /** Options weighed, with why each was kept or dropped. */
  options: { label: string; verdict: Verdict; note: string }[]
  /** The decision in one or two sentences. */
  decision: string
  /** Architecture / data flow as ordered steps. */
  architecture: string[]
  /** Hard outcomes. */
  results: { value: string; metric: string }[]
  stack: string[]
  /** One takeaway / what you'd tell another engineer. */
  lesson: string
  /** Optional long-form body. When present, the detail page renders these as
   * the article instead of the terse problem/decision/architecture blocks. */
  sections?: Section[]
  /** Optional link to a live/interactive demo of this work. */
  demoHref?: string
  demoLabel?: string
  /** Optional architecture flow diagram (rendered as a node→node flow). */
  diagram?: DiagramNode[]
  /** Optional real architecture image (takes precedence over `diagram`). */
  diagramImage?: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "iot-core-to-appsync",
    title: "From IoT Core to AppSync",
    tagline: "Re-platforming real-time audience interaction for scale",
    accent: "#a855f7",
    duration: "Nova Dynamic Media",
    role: "Principal Full-Stack & Cloud Engineer",
    problem:
      "Live Q&A, polls, surveys, quizzes and synchronized slideshows ran on AWS IoT Core / MQTT. IoT Core is excellent for device telemetry, but a raw MQTT Pub/Sub model created real friction for interactive, user-facing live events as audiences scaled: browsers (especially on mobile / unstable networks) had to maintain heavy MQTT client connections; raw Pub/Sub has no strict schema, so the team hand-rolled serialization, payload validation and parsing on both ends; and Pub/Sub delivers messages but holds no application state — showing a poll result or Q&A thread to someone who just refreshed meant separately querying DynamoDB, creating race conditions between the live stream and the state database.",
    options: [
      { label: "Stay on IoT Core / MQTT", verdict: "rejected", note: "Heavy client connections, no schema, and state decoupled from delivery — race conditions on reconnect/refresh." },
      { label: "Self-managed WebSocket layer", verdict: "rejected", note: "Would own scaling, auth, reconnection and schema ourselves — too much undifferentiated heavy lifting." },
      { label: "AWS AppSync + GraphQL", verdict: "chosen", note: "Native subscriptions over WebSockets, one strongly-typed graph for mutations/queries/subscriptions, direct DynamoDB + Lambda integration." },
    ],
    decision:
      "Migrated to AWS AppSync. GraphQL subscriptions handle real-time sync over standard WebSockets (no MQTT wrappers), a single strongly-typed schema unifies mutations (write), queries (fetch current state) and subscriptions (live updates), and AppSync resolves directly against DynamoDB + Lambda — writing a change and broadcasting it to thousands of connected attendees in one round-trip.",
    architecture: [
      "One typed schema: mutations (write), queries (fetch current state) and subscriptions (live updates) live in a single strongly-typed GraphQL graph — AppSync handles serialization, payload validation and parsing that we used to hand-roll on both ends.",
      "Mission Control: a unified moderator dashboard pushes mutations — publish a poll, trigger a quiz, advance a synchronized slide.",
      "Mutation→subscription loop: a slide change issues one GraphQL mutation; AppSync writes the new state to DynamoDB and broadcasts it to every subscribed device in a single round-trip, in fractions of a second.",
      "Grounded state on reconnect: DynamoDB sits directly behind the graph, so a client returning from a network drop just queries the true current state instead of replaying a missed Pub/Sub stream.",
      "Advanced Q&A: live upvoting, nested direct replies to attendees, and a low-latency teleprompter view for speakers — kept in sync with the Amazon IVS video stream.",
    ],
    results: [
      { value: "50+", metric: "enterprise live events delivered on AppSync" },
      { value: "High-concurrency", metric: "absorbed peak spikes — thousands voting & asking at once" },
      { value: "Zero dropped messages", metric: "reconnects read true state straight from DynamoDB" },
      { value: "In-sync", metric: "slides, captions & engagement locked to the IVS low-latency stream" },
      { value: "Faster shipping", metric: "built-in resolvers + validation cut backend boilerplate" },
      { value: "Faster sync", metric: "live updates land in fractions of a second" },
    ],
    stack: ["AppSync", "GraphQL", "DynamoDB", "Lambda", "WebSockets", "Amazon IVS"],
    diagram: [
      { label: "Moderator / Client", note: "Mission Control" },
      { label: "AppSync", note: "GraphQL mutation" },
      { label: "Resolver → DynamoDB", note: "source of truth" },
      { label: "Subscription fan-out", note: "filtered by eventId" },
      { label: "Audience devices", note: "live update" },
    ],
    diagramImage: "/arch-appsync.webp",
    lesson:
      "Pick the abstraction that matches your domain. MQTT shines for devices; interactive event UX maps far more cleanly onto GraphQL — subscriptions for delivery plus DynamoDB-backed queries for state kills the live-stream-vs-database race condition and cuts backend boilerplate.",
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Nova Dynamic Media runs large-scale enterprise live events — webcasts, conferences and hybrid productions where the audience isn't just watching, they're participating. During a session, attendees submit and upvote questions, answer live polls and quizzes, respond to surveys, and follow slides that advance in lockstep with the speaker, all on top of an ultra-low-latency Amazon IVS video stream.",
          "Every one of those interactions has to reach thousands of devices in near real time, and stay correct when someone's phone drops off the venue Wi-Fi and reconnects. The original platform delivered this real-time layer with AWS IoT Core over MQTT — a Pub/Sub design borrowed from the IoT world. It worked at small scale, but as audiences and feature complexity grew, the seams started to show.",
        ],
      },
      {
        heading: "Why IoT Core fell short",
        paragraphs: [
          "IoT Core is purpose-built for device telemetry — millions of sensors publishing small messages. A user-facing, interactive event is a different problem, and three mismatches kept surfacing:",
        ],
        bullets: [
          {
            label: "Heavy client connections",
            text: "Web browsers had to hold an MQTT client connection open. On mobile and flaky venue networks that meant extra weight, reconnection edge cases, and battery/perf overhead just to receive a poll update.",
          },
          {
            label: "No schema, hand-rolled everything",
            text: "Raw Pub/Sub has no strict data contract, so the team manually handled serialization, payload validation and parsing on both the backend and every client — error-prone boilerplate that grew with each new feature.",
          },
          {
            label: "Delivery without state",
            text: "MQTT delivers a message but stores nothing. To show the current poll result or Q&A thread to someone who just refreshed, the app had to separately query DynamoDB — racing the live Pub/Sub stream against the state database and occasionally showing stale or missed data.",
          },
        ],
      },
      {
        heading: "Why AppSync",
        paragraphs: [
          "AWS AppSync collapses the real-time problem and the state problem into one managed GraphQL backend, which is exactly the shape of this domain.",
          "Subscriptions ride standard WebSockets under the hood — no MQTT wrapper for the browser to manage. A single strongly-typed schema unifies mutations (writing data), queries (fetching current state) and subscriptions (listening for live updates), so validation and parsing come for free. And AppSync resolves directly against DynamoDB and Lambda, so one operation can persist a change and broadcast it to every connected attendee in a single round-trip.",
          "We considered building our own WebSocket layer, but that meant owning scaling, auth, reconnection and schema ourselves — undifferentiated heavy lifting AppSync already does well.",
        ],
      },
      {
        heading: "How we re-engineered the pipeline",
        paragraphs: [
          "The migration turned a fragmented messaging system into one strongly-typed real-time data graph, with DynamoDB as the single source of truth and AppSync owning the WebSocket fan-out. Design goals: keep the hot path resolver-only (no Lambda latency), scope every broadcast to its event, and make state idempotent so reconnects and retries can't corrupt it.",
        ],
        bullets: [
          {
            label: "Schema & subscription filtering",
            text: "One typed schema models the domain — mutations (publishPoll, advanceSlide, submitQuestion, upvote), queries (getEventState), and subscriptions (onEventUpdate(eventId)). AppSync enhanced subscription filters bind each subscription to its eventId, so a mutation fans out only to that event's devices instead of every connected client.",
          },
          {
            label: "Resolver-only hot path",
            text: "Most operations use AppSync resolvers (VTL/JS) mapped straight to DynamoDB — no Lambda in the critical path, removing cold-start and invocation latency. Multi-step flows use pipeline resolvers; Lambda data sources are reserved for genuinely complex cases.",
          },
          {
            label: "DynamoDB single-table design",
            text: "A single table with composite keys (PK EVENT#{id}, SK POLL#/QUESTION#/SLIDE#) serves every access pattern, with GSIs for upvote-ordered question feeds. Atomic counters (ADD) handle upvotes; conditional writes give optimistic concurrency so duplicate or out-of-order mutations can't clobber state.",
          },
          {
            label: "Mutation→subscription loop",
            text: "A slide change is one mutation: the resolver persists new state to DynamoDB and AppSync broadcasts the result to every subscribed device in fractions of a second — one round-trip, no separate publish step, no drift between what's stored and what's shown.",
          },
          {
            label: "Grounded state on reconnect",
            text: "Because the store sits directly behind the graph, a device back from a network drop just runs getEventState and gets the canonical current state — no fragile replay of a Pub/Sub stream it missed offline.",
          },
          {
            label: "Tiered auth & Mission Control",
            text: "Cognito authorizes moderators with field-level rules (only staff can publish/advance); attendees subscribe under a read-only tier. Mission Control is the single surface issuing those privileged mutations — live upvoting, nested replies, and the speaker teleprompter channel, all kept in step with the ultra-low-latency Amazon IVS stream.",
          },
        ],
      },
      {
        heading: "The impact",
        paragraphs: [
          "Across 50+ enterprise live events, the AppSync architecture delivered wins that were both technical and felt by the business:",
        ],
        bullets: [
          { label: "High-concurrency scale", text: "Absorbed massive spikes when thousands of attendees voted or asked questions at the same moment during peak sessions." },
          { label: "Correctness by design", text: "With DynamoDB behind the GraphQL interface, state is always grounded — a brief disconnect no longer means lost or stale data; the client just re-fetches the truth." },
          { label: "Perfect sync", text: "Slides, live captions and engagement elements stay locked to the ultra-low-latency IVS stream, so what the audience sees and what they interact with never drift apart." },
          { label: "Developer velocity", text: "Built-in resolvers and schema validation removed a layer of backend boilerplate, so the team shipped new event features faster." },
        ],
      },
    ],
  },
  {
    slug: "ai-rag-event-copilot",
    title: "An AI RAG Copilot for Live Events",
    tagline: "Grounded Q&A, chatbots, and agents over event knowledge",
    accent: "#e879f9",
    duration: "Nova Dynamic Media",
    role: "Principal Full-Stack & Cloud Engineer",
    problem:
      "At high-concurrency live events, moderators and speakers were overwhelmed by the volume of real-time interaction (Q&A, polls, surveys) and complex event data. Pulling metrics, summarizing a session, or finding a fact buried in a transcript meant manual reporting or tedious DB queries; a plain LLM couldn't answer about a specific live session because it lacked that event's context; and hallucinated facts are a compliance and reputation disaster mid-webcast.",
    options: [
      { label: "Prompt an LLM with no grounding", verdict: "rejected", note: "No event context, and hallucinations are unacceptable on a live enterprise webcast." },
      { label: "Self-hosted vector DB + custom embedding pipeline", verdict: "rejected", note: "Heavy infra to provision plus custom chunking/embedding code to own and maintain." },
      { label: "AWS Bedrock + Knowledge Bases + Agents", verdict: "chosen", note: "Managed, serverless RAG over our S3 data, secure access to Claude, and agents that can call our APIs." },
    ],
    decision:
      "Built a fully serverless generative-AI layer on AWS Bedrock. Knowledge Bases for Bedrock handle the RAG heavy lifting — parsing, chunking and embedding raw S3 event assets into a vector store to ground answers in truth — while Bedrock Agents turn the AI from a chat window into an assistant that can call backend APIs and answer operational questions in plain language. Claude is the foundation model, with event data kept private.",
    architecture: [
      "Ingest: Kinesis Firehose streams live activity, Q&A and logs into S3.",
      "Managed RAG: S3 links directly to a Bedrock Knowledge Base — new transcripts/Q&A/slides are auto-indexed into a vector store via semantic embeddings.",
      "Moderator copilot: a secure chat queries the Knowledge Base, pulls relevant chunks, and feeds them to Claude for a grounded answer.",
      "Metrics agent: a Bedrock Agent with an OpenAPI schema over our analytics endpoints — asks like 'unique users from Japan in the last hour?' get parsed, the right Lambda invoked, and a conversational answer returned.",
    ],
    results: [
      { value: "Zero", metric: "hallucinations — answers strictly grounded in the data lake" },
      { value: "Hours → instant", metric: "post-event reporting automated into a conversational assistant" },
      { value: "Plain-language", metric: "moderators query live metrics without writing reports" },
    ],
    stack: ["AWS Bedrock", "Knowledge Bases", "Bedrock Agents", "Claude", "Kinesis Firehose", "S3", "Lambda", "RAG"],
    diagram: [
      { label: "Event assets", note: "S3 data lake" },
      { label: "Bedrock KB", note: "OpenSearch vector index" },
      { label: "RetrieveAndGenerate", note: "top-k + metadata filter" },
      { label: "Claude + Guardrails", note: "grounded, compliant" },
      { label: "Cited answer", note: "to moderator / audience" },
    ],
    diagramImage: "/arch-rag.webp",
    lesson:
      "For enterprise AI, trust is the product. Managed RAG (Bedrock Knowledge Bases) grounded every answer in the event's own data, and Agents made it actionable — far more valuable than a bigger ungrounded model.",
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Nova Dynamic Media runs large-scale enterprise live events — webcasts and conferences where the audience actively participates. Every session generates a constant stream of interaction data on top of the live video: questions and upvotes, poll and survey responses, transcripts, and engagement metrics, all tied to that specific event.",
          "The team wanted to put that data to work with AI: a copilot to help moderators run the room live, chatbots that let audiences ask about the content during and after a session, and a way to query event metrics in plain language instead of building a report. The hard part was never 'add an LLM' — it was making the AI accurate and trustworthy on one event's private data, in real time, in front of enterprise clients.",
        ],
      },
      {
        heading: "The challenge",
        paragraphs: [
          "During large-scale, high-concurrency virtual events, moderators and speakers were overwhelmed by the sheer volume of real-time audience interaction and the size of the event datasets behind it.",
        ],
        bullets: [
          { label: "The manual bottleneck", text: "Generating metrics, summarizing a presentation, or finding information buried in historical transcripts meant manual report generation or tedious database queries." },
          { label: "The context gap", text: "Standard LLM APIs couldn't give accurate, real-time answers about a specific live session — they had no context for that event's unique data." },
          { label: "The hallucination risk", text: "Ungrounded AI chat invents facts. During an active enterprise webcast that's a compliance and reputation disaster, not a quirk." },
        ],
      },
      {
        heading: "Why AWS Bedrock & Knowledge Bases",
        paragraphs: [
          "We chose the Bedrock ecosystem to build a fully serverless, managed AI layer — solving these problems without provisioning heavy vector-database infrastructure or hand-writing chunking and embedding pipelines.",
        ],
        bullets: [
          { label: "Amazon Bedrock", text: "Instant, secure access to foundation models like Claude, with data privacy guaranteed — our event data never trains public models." },
          { label: "Knowledge Bases for Bedrock", text: "Handled the entire RAG flow — parsing, chunking and embedding raw S3 event assets into a vector store to ground the AI in absolute truth." },
          { label: "Bedrock Agents", text: "Gave the AI actionable capability — calling backend APIs and answering operational questions in plain language, not just chatting." },
        ],
      },
      {
        heading: "How we implemented it",
        paragraphs: [
          "The system is a serverless, event-driven pipeline that runs from raw event assets all the way to grounded inference, in four layers — ingestion, a managed RAG index, a retrieval-augmented chat path, and an action-taking agent — each scoped per event and locked down with least-privilege IAM.",
        ],
        bullets: [
          {
            label: "Ingestion & data lake",
            text: "Live activity, Q&A and event logs stream through Amazon Kinesis Firehose, which buffers on size/time and writes partitioned objects (by event and date) into S3. Transcripts and presentation assets land under the same per-event prefixes, giving one durable, queryable source of truth.",
          },
          {
            label: "Managed RAG index",
            text: "Each S3 prefix is wired to a Bedrock Knowledge Base backed by an OpenSearch Serverless vector index. New objects trigger an incremental ingestion job that chunks documents (fixed-size with overlap), embeds them with a Titan/Cohere embeddings model, and stores the vectors alongside event-scoped metadata — so a retrieval can never cross event boundaries.",
          },
          {
            label: "Retrieval-augmented chat path",
            text: "The frontend calls AppSync (Cognito-authenticated); a resolver Lambda issues a Bedrock RetrieveAndGenerate request. Top-k semantic search returns the most relevant chunks under a metadata filter for the active event, the context is assembled into a Claude prompt, and the grounded answer streams back with source citations. Bedrock Guardrails enforce PII/compliance policy on every response.",
          },
          {
            label: "Agentic metrics layer",
            text: "A Bedrock Agent exposes action groups defined by an OpenAPI schema mapped to our analytics endpoints. On a plain-language question it runs a ReAct-style loop — parse intent → select the right action → invoke the backing Lambda (which reads the live Valkey/S3 telemetry) → synthesize a conversational answer — holding per-session state for follow-up questions.",
          },
          {
            label: "Security & multi-tenant isolation",
            text: "userId and tenant are taken from the AppSync authorizer context, every Lambda runs under least-privilege IAM, and event-scoped metadata filtering keeps one client's data invisible to another client's queries — table stakes for enterprise webcasts.",
          },
        ],
      },
      {
        heading: "The outcome",
        bullets: [
          { label: "Zero hallucinations", text: "Strictly grounding Claude's prompts in the vector data lake gave accurate, context-specific answers with full reliability." },
          { label: "Less operational overhead", text: "Moderators moved from manual data tracking to a unified dashboard where the AI grouped, summarized and answered audience queries automatically." },
          { label: "Instant insights", text: "Post-event reporting that used to take hours or days became an instant, conversational assistant for both audiences and clients." },
        ],
      },
    ],
    demoHref: "/ai-demo",
    demoLabel: "Try the interactive AI demo",
  },
  {
    slug: "live-telemetry-valkey",
    title: "Real-Time Presence Telemetry at Scale",
    tagline: "Stateless heartbeats + Valkey, not WebSockets + Redis",
    accent: "#34d399",
    duration: "Nova Dynamic Media",
    role: "Principal Full-Stack & Cloud Engineer",
    problem:
      "Show stream moderators, on a live Mission Control dashboard, exactly how many users are watching a stream right now — for events of 200 to 3,000 concurrent viewers. The obvious pattern (API Gateway WebSockets + DynamoDB listening for $connect/$disconnect) had two fatal flaws: a hard 500-handshakes/second connection wall that throttled thousands of simultaneous joins, and 'ghost users' — dirty mobile disconnects that AWS takes up to 10 minutes to clean up, inflating the live count by ~10%.",
    options: [
      { label: "API Gateway WebSockets + DynamoDB", verdict: "rejected", note: "500 conn/sec wall drops simultaneous joiners with 429s; dirty disconnects leave ghost users for up to 10 min; high WCU cost for high-frequency writes." },
      { label: "Traditional Redis for the live cache", verdict: "rejected", note: "Costlier and not serverless; Valkey gives the same in-memory model with better price/performance for this workload." },
      { label: "Stateless AppSync mutations + Valkey sorted set", verdict: "chosen", note: "Stateless HTTPS heartbeats bypass the connection wall; a self-cleaning Valkey sorted set ages out ghosts; WebSockets kept only where they belong — the dashboard." },
    ],
    decision:
      "Built a stateless 'Pulse' telemetry pipeline. Viewers send a lightweight GraphQL mutation heartbeat every 30s over standard HTTPS (no persistent connection), a Lambda records presence in a Valkey in-memory sorted set keyed by timestamp, and the few moderators get the live count over a single reliable AppSync WebSocket subscription. Historical telemetry streams to S3 via Kinesis Firehose for post-event analytics.",
    architecture: [
      "Viewer side: the player fires a sendHeartbeat GraphQL mutation every 30s over HTTPS — stateless, so it bypasses the WebSocket connection limit.",
      "State engine: a Lambda runs ZADD into a Valkey sorted set (key event:{id}:live_users, score=now, member=userId from the AppSync authorizer).",
      "Dashboard: moderators open one AppSync WebSocket subscription; a service queries Valkey for users active in the last 60s and pushes the count.",
      "History: raw telemetry streams to S3 via Kinesis Firehose for post-event reporting.",
    ],
    results: [
      { value: "10k req/s", metric: "stateless ingestion — 3,000 simultaneous joins, zero throttling" },
      { value: "10 min → 60s", metric: "max presence inaccuracy as ghost users age out" },
      { value: "Memory, not WCU", metric: "heartbeats hit Valkey, not a transactional DB — major cost cut" },
    ],
    stack: ["AppSync", "GraphQL", "Valkey", "Lambda", "Kinesis Firehose", "S3", "WebSockets"],
    diagram: [
      { label: "Viewer", note: "heartbeat · 30s HTTPS" },
      { label: "AppSync mutation", note: "stateless ingest" },
      { label: "Lambda ZADD", note: "presence write" },
      { label: "Valkey sorted set", note: "last-60s actives" },
      { label: "Dashboard", note: "WebSocket subscription" },
    ],
    diagramImage: "/arch-valkey.webp",
    lesson:
      "WebSockets are magnificent for pushing data down to a select group of clients (a moderator dashboard, live chat). But stateless HTTP heartbeats are the industry standard for ingesting high-concurrency presence telemetry — and pairing them with an in-memory Valkey sorted set creates a resilient, self-cleaning, low-cost system.",
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Our live-streaming telemetry platform supports events of 200 to 3,000 concurrent viewers. The core requirement sounds simple: track exactly how many users are actively watching a stream at any moment, and show that number to moderators on a real-time Mission Control dashboard.",
          "The standard industry pattern points to AWS API Gateway WebSockets paired with a transactional database like DynamoDB, listening for $connect and $disconnect events. Stress-testing and an architectural audit revealed that pattern would fail us in two specific, fatal ways under real live-event traffic.",
        ],
      },
      {
        heading: "The challenge",
        bullets: [
          {
            label: "The 500/sec connection wall (thundering herd)",
            text: "API Gateway WebSockets allow ~500 new handshakes per second by default. Live events are a thundering herd — thousands join the exact second it starts. With 3,000 simultaneous joiners, AWS would throttle and drop ~2,500 with 429 errors, and raising the quota needs historical metrics you don't have yet on a new platform.",
          },
          {
            label: "The mobile 'ghost user' problem",
            text: "WebSockets are persistent, stateful connections. When a phone loses 5G, enters an elevator, or dies, it's a dirty disconnect — no goodbye packet. API Gateway can take up to 10 minutes (idle timeout) to tear down the zombie connection, so ghost users falsely inflate the live count by roughly 10% and the data stops being trustworthy for stakeholders.",
          },
        ],
      },
      {
        heading: "The 'Pulse' architecture",
        paragraphs: [
          "Instead of fighting stateful connections, we moved viewers to a stateless 'text-message' pulse pattern — mirroring how giants like YouTube and Twitch handle presence telemetry.",
        ],
        bullets: [
          { label: "Stateless HTTP heartbeats", text: "The video player runs a background timer; every 30 seconds it sends a lightweight sendHeartbeat GraphQL mutation over standard HTTPS." },
          { label: "Infinite-scale ingestion", text: "HTTPS mutations are stateless — they open, deliver, and close — so they bypass the 500/sec WebSocket wall entirely and let AWS absorb thousands of requests per second out of the box." },
          { label: "Self-cleaning state engine (Valkey)", text: "Each heartbeat triggers a Lambda that runs ZADD on a Valkey sorted set: key event:{eventId}:live_users, score = current timestamp, member = userId (from the AppSync authorizer context)." },
          { label: "Hybrid delivery", text: "WebSockets stay where they earn their keep — the dashboard. The handful of moderators open one reliable AppSync WebSocket subscription; a background service periodically queries Valkey for users active in the last 60s and pushes the unified count." },
        ],
      },
      {
        heading: "Why Valkey over Redis",
        paragraphs: [
          "The live count is a hot, high-frequency workload: thousands of heartbeats per second, each a tiny write and a windowed read. Writing those straight into a transactional disk database (DynamoDB) means astronomical Write Capacity Unit costs.",
          "An in-memory cache is the right tool — and we chose Valkey over traditional Redis for better price/performance and a serverless-friendly fit, keeping the same sorted-set model without the cost. Historical telemetry still lands durably and cheaply in S3 via Kinesis Firehose for post-event analytics.",
        ],
      },
      {
        heading: "The impact",
        bullets: [
          { label: "Zero throttling, infinite scale", text: "Routing check-ins through stateless AppSync mutations unlocked a default ~10,000 req/sec tier — 3,000 users can hit 'Join' in the same millisecond with no errors and no custom quota increase." },
          { label: "Ghost users eliminated", text: "A deliberate 60-second grace window lets heartbeats lapse naturally; Valkey's sorted set ages absent users out on the next cycle. Max inaccuracy dropped from a 10-minute delay to a tight, predictable 60-second ceiling." },
          { label: "Drastic cost optimization", text: "High-frequency writes moved from expensive transactional WCUs to ultra-low-latency, low-cost memory, with history streamed to S3 — real-time presence at a fraction of the cost." },
        ],
      },
    ],
  },
  {
    slug: "aws-cost-optimization",
    title: "Cutting AWS Cost 50–60% — While Going Faster",
    tagline: "How I debugged spend and got performance as a bonus",
    accent: "#f59e0b",
    duration: "Nova Dynamic Media",
    role: "Principal Full-Stack & Cloud Engineer",
    problem:
      "AWS spend was climbing faster than usage justified, and a chunk of it was structural waste: a telemetry log table in DynamoDB had swelled past 5TB, cache nodes sat over-provisioned and idle between events, and Lambdas ran on x86 with bloated deployment packages. The goal: cut the bill hard without degrading a live, latency-sensitive product — and ideally make it faster.",
    options: [
      { label: "Blanket downsizing", verdict: "rejected", note: "Cutting capacity across the board risks performance regressions on the live path." },
      { label: "Reserved Instances / Savings Plans only", verdict: "rejected", note: "Committing spend without fixing the underlying waste just locks the waste in for a year." },
      { label: "Measure, then re-architect the cost drivers", verdict: "chosen", note: "Find the biggest line items, then make targeted changes that cut cost and improve performance at the same time." },
    ],
    decision:
      "Treated cost as a debugging problem: ranked spend by driver, then re-architected the biggest ones. Lambdas moved to Graviton2 and were slimmed; ElastiCache became Valkey Serverless; a 5TB+ DynamoDB telemetry table was replaced with a Valkey + Kinesis Firehose → S3 + Glue/Athena pipeline; EC2 went onto tuned Auto Scaling; and backups were tiered by environment. Net spend down sharply with performance improved, not traded away.",
    architecture: [
      "Compute: Lambda x86 → Graviton2 (arm64); deployment artifacts slimmed 15MB → ~700KB.",
      "Cache: ElastiCache for Redis → Valkey Serverless (pay-as-you-go, no idle nodes).",
      "Data: 5TB+ DynamoDB telemetry table → Valkey (hot) + Firehose→S3 (cold) + Glue/Athena.",
      "Infra: EC2 Auto Scaling, API Gateway throttling/caching, environment-tiered AWS Backup.",
    ],
    results: [
      { value: "Up to 34%", metric: "better price-performance from Graviton2 alone" },
      { value: "15MB → 700KB", metric: "Lambda artifact size — faster cold starts, shorter duration" },
      { value: "5TB+ offloaded", metric: "telemetry moved off DynamoDB to an S3 data lake" },
    ],
    stack: ["Graviton2", "Lambda", "Valkey Serverless", "DynamoDB", "Kinesis Firehose", "S3", "Glue", "Athena", "EC2 Auto Scaling"],
    diagram: [
      { label: "Live events", note: "logs + telemetry" },
      { label: "Valkey", note: "hot live data" },
      { label: "Kinesis Firehose", note: "buffered stream" },
      { label: "S3 data lake", note: "cheap long-term" },
      { label: "Glue + Athena", note: "pay-per-query reports" },
    ],
    lesson:
      "Cost optimization is a debugging problem, not a haircut: measure first, then fix the structural drivers. The biggest wins — Graviton2, slimmer artifacts, serverless Valkey, and S3 instead of a 5TB DynamoDB table — lowered the bill and improved performance at the same time.",
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "The platform's AWS bill was growing faster than the business behind it. Some of that was real growth, but a lot was structural waste accumulated as the system scaled — the kind that compounds quietly until someone reads the cost & usage report line by line.",
          "The constraint that made this interesting: the product is a live, latency-sensitive streaming platform. Any cost change that slowed event ingestion, the moderator dashboard, or video delivery was off the table. So the bar wasn't just 'cheaper' — it was 'cheaper without regressions, ideally faster.'",
        ],
      },
      {
        heading: "Compute & serverless efficiency",
        bullets: [
          { label: "Graviton2 migration", text: "Moved Lambda functions from x86_64 to Graviton2 (arm64) — up to ~34% better price-performance for the same workload, essentially a free win once the runtimes were ARM-compatible." },
          { label: "Artifact slimming", text: "Cut average Lambda deployment packages from ~15MB to ~700KB. Smaller bundles download and unpack faster, which directly shrinks cold-start time and execution duration — so the perf win and the cost win are the same change." },
        ],
      },
      {
        heading: "Database & caching overhaul",
        paragraphs: [
          "The largest single line item was data — both a bloated cache tier and a telemetry table that had no business being in a transactional database.",
        ],
        bullets: [
          { label: "ElastiCache → Valkey Serverless", text: "Migrated from provisioned ElastiCache for Redis to Valkey Serverless — a true pay-as-you-go model that eliminates paying for idle, over-provisioned cache nodes between events while keeping the performance." },
          { label: "Offloading a 5TB+ table", text: "A telemetry log table had swelled past 5TB in DynamoDB — extremely expensive for what is really append-only log data. Replaced it with a serverless pipeline: Valkey holds the hot, live data; Kinesis Firehose streams logs to S3 for cheap long-term storage; Glue catalogs them and Athena runs pay-per-query SQL straight against S3 for reporting." },
          { label: "Capacity tuning", text: "Tuned the remaining DynamoDB tables — provisioned vs. on-demand — to match actual read/write patterns instead of paying for peak capacity around the clock." },
        ],
      },
      {
        heading: "Media & infrastructure automation",
        bullets: [
          { label: "HLS pipeline", text: "Streamlined video conversion to HLS, trimming compute overhead and storage cost in the transcoding step." },
          { label: "EC2 Auto Scaling", text: "Precise Auto Scaling groups spin instances up for traffic spikes and back down during quiet hours, so we stop paying for idle capacity overnight." },
          { label: "API Gateway tuning", text: "Tuned throttling, caching and payload sizes to cut unnecessary execution and downstream invocation cost." },
        ],
      },
      {
        heading: "Smart backup strategy",
        paragraphs: [
          "Backups are a silent cost sink when every environment is treated like production. We split AWS Backup policies by environment:",
        ],
        bullets: [
          { label: "Production", text: "Daily, multi-region backups for high availability and disaster recovery — where it's worth paying for." },
          { label: "Test / non-critical", text: "Dialed back to weekly, single-region — no more premium multi-region storage fees for data nobody would restore." },
        ],
      },
    ],
  },
]

export const caseStudySlugs = CASE_STUDIES.map((c) => c.slug)

export function getCaseStudy(slug: string | undefined) {
  return CASE_STUDIES.find((c) => c.slug === slug)
}
