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
  /** Featured studies render as a large lead card on the home list. */
  featured?: boolean
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
    slug: "ai-booking-assistant",
    title: "An AI Receptionist That Books Appointments",
    tagline: "A provider-agnostic booking agent, grounded in a real schedule",
    accent: "#35d6a4",
    featured: true,
    duration: "Personal project",
    role: "Solo — design, build, ship",
    demoHref: "https://github.com/HazeBigya/AI-Booking-Assistant",
    demoLabel: "View on GitHub",
    problem:
      "A patient should be able to book an appointment just by chatting, or speaking, the way they would with a good front-desk person. That is easy to demo and hard to trust. A booking assistant must never invent a time or a price, must never book two people into the same slot, and must prove a patient's email is real before it promises a calendar invite. It also should not be welded to a single AI vendor, because the cheapest good model and the best voice rarely come from the same company.",
    options: [
      { label: "Free-form LLM answers", verdict: "rejected", note: "A model left to answer freely will cheerfully hallucinate a time or a price that does not exist. Unusable for real bookings." },
      { label: "Tool-constrained agent over a real database", verdict: "chosen", note: "The model can only call a few functions; every answer comes from the live schedule and price list. It cannot make anything up." },
      { label: "Single vendor (OpenAI only)", verdict: "rejected", note: "Lock-in, and voice needs a second account anyway. One outage takes the whole assistant down." },
      { label: "Provider-agnostic adapter", verdict: "chosen", note: "One interface over OpenAI, Anthropic, Gemini and Bedrock. Swapping provider is a settings change; a backup provider answers if the first fails." },
    ],
    decision:
      "A tool-calling agent whose entire power is eight functions over a PostgreSQL schedule. Every value the model produces is validated before a tool runs, the database itself enforces the one rule that must never break (no double-booking), and which AI company does the thinking is a line of config, not a rewrite.",
    architecture: [
      "A patient chats or speaks in the browser. The front end sends messages through one HTTP entry and never touches the database directly.",
      "A thin connector authenticates the request, hands the message to the backend, and returns the answer. It does no thinking of its own.",
      "The model may only call eight tools (list services, find professionals, check availability, request and verify a login code, list my appointments, create and cancel a booking). It cannot reach the database, the internet or the file system on its own.",
      "Availability is read from the live schedule with past and already-booked times removed, so the agent can never offer a slot that is taken or gone.",
      "Booking is email-verified: a 6-digit code proves the address is real before any calendar invite is sent. The code is hashed, single-use, and expires in ten minutes.",
      "PostgreSQL rejects a second overlapping booking at the moment it is written, one row at a time. If two people tap the same slot in the same second, only one wins.",
      "The provider is a config choice. One adapter covers OpenAI, Anthropic, Gemini and Bedrock; a backup chain answers the same message if the first provider is slow or down.",
      "Only the last fifteen messages go to the model. The booking lives in the database, not in the model's memory, so the tools are the memory.",
    ],
    results: [
      { value: "0", metric: "double-bookings — enforced in the database, not app code" },
      { value: "4 providers", metric: "OpenAI, Anthropic, Gemini, Bedrock — swap by config" },
      { value: "8 tools", metric: "the agent's entire surface area" },
      { value: "Voice or text", metric: "same booking path underneath" },
      { value: "216 tests", metric: "suite runs with no AI or email setup" },
    ],
    stack: ["Next.js 14", "TypeScript", "PostgreSQL", "Drizzle", "OpenAI", "Anthropic", "Bedrock", "Docker"],
    diagram: [
      { label: "Patient", note: "chat or voice" },
      { label: "API connector", note: "auth only" },
      { label: "Agent", note: "8 tools" },
      { label: "PostgreSQL schedule", note: "source of truth" },
      { label: "Email code + invite", note: "verified booking" },
    ],
    lesson:
      "Grounding beats cleverness. Constrain the model to a few database-backed tools and let the database enforce the one rule that must never break. The LLM becomes a friendly interface, not the source of truth, and the whole thing stays safe to put in front of real people.",
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "This started as a side project I built for myself, to see how far a chat-first booking flow could go while staying genuinely safe. The example is a dental clinic because that is a concrete scheduling problem, but nothing inside is dental: the same product runs a physiotherapy or eye clinic by changing the list of treatments and staff.",
          "A patient opens a web page, types or speaks, and the assistant answers and books their appointment. It runs on the clinic's own machine, so the patient list stays with them. The only thing that leaves is the conversation itself, sent to the AI company that writes the replies, never the database.",
        ],
      },
      {
        heading: "How it works",
        paragraphs: [
          "A booking reads like a normal front-desk conversation, in a few short messages:",
        ],
        bullets: [
          { label: "Ask", text: "The patient says what they need. The assistant answers from real information: the treatment, the price, which professionals do it, and the times that are actually open." },
          { label: "Verify", text: "When the patient picks a time, the assistant emails a 6-digit code and asks for it back. That one step proves the email is real, so the confirmation and calendar invite have somewhere to go." },
          { label: "Book", text: "The assistant writes the appointment and emails a confirmation with the calendar invite attached, so it drops straight into the patient's calendar." },
        ],
      },
      {
        heading: "What it will not do (on purpose)",
        paragraphs: [
          "The safety of the assistant is mostly a list of things it cannot do, and that list is enforced, not merely intended:",
        ],
        bullets: [
          { label: "Never invents", text: "Every time and price comes from the real schedule and price list. There is no tool for making one up." },
          { label: "Never double-books", text: "The database refuses a second overlapping booking at the moment of writing, so even two taps in the same second cannot collide." },
          { label: "Never books as someone else", text: "A patient can only see and change their own appointments; the login code, not a password, is what proves who they are." },
          { label: "Stays in its lane", text: "Asked about anything outside the clinic's treatments and appointments, it says so. It can only do what its tools allow, and there is no tool for anything else." },
        ],
      },
      {
        heading: "Provider-agnostic by design",
        paragraphs: [
          "The product is not tied to any AI company. Most vendors copy the OpenAI message format, so a single adapter already covers OpenAI, Anthropic, Gemini and OpenRouter; adding one of those is a new row in a table, not new code. Bedrock and Google's native API get their own thin adapters.",
          "Because the assistant uses AI for three separate jobs — the brain that writes replies, the ears that turn speech to text, and the mouth that turns text back to speech — each one chooses its provider independently. A clinic can run a cheap model for the conversation and pay for quality only where the patient actually hears it. Each role also takes a backup chain: if the first provider fails or is slow, the next answers the same message and the patient sees no error.",
        ],
      },
      {
        heading: "Why PostgreSQL",
        paragraphs: [
          "A booking links a patient, a professional and a treatment, and a professional only does some treatments. That is rows and links, which is what a relational database is for. Between the relational options I chose PostgreSQL for one reason: it can refuse two overlapping bookings by itself. My own code might let both through under load, but the database checks at the moment it writes, one write at a time, so the second is rejected. Double-booking is the one mistake this product cannot make, and that guarantee lives in the database, not in hopeful application logic.",
        ],
      },
    ],
  },
  {
    slug: "agentcore-qna-grouping",
    title: "Grouping Live Audience Questions With an Agent",
    tagline: "Clustering thousands of event questions on Amazon Bedrock AgentCore",
    accent: "#35d6a4",
    duration: "Nova Dynamic Media · in progress",
    role: "Sole owner of the AI platform",
    problem:
      "A busy live session generates thousands of audience questions, but most of them are the same handful of concerns asked in different words and different languages. In one real dev session, 7,857 submitted questions carried only 69 distinct meanings. A moderator cannot read all of them live, and simple keyword matching misses paraphrases and cross-language duplicates entirely. The job is to group near-duplicate questions, rank them by how many people asked, let a moderator narrow by topic in plain language, and do all of it reproducibly without ever silently dropping a real question.",
    options: [
      { label: "Keyword / exact-match grouping", verdict: "rejected", note: "Misses paraphrases and cross-language duplicates. 'When does it go on sale?' and its Cantonese phrasing never meet." },
      { label: "Embedding + agglomerative clustering", verdict: "chosen", note: "Group by meaning, not words. Complete linkage makes the similarity floor a hard promise every pair in a group clears." },
      { label: "Titan v2 embeddings", verdict: "rejected", note: "At its shipped floor, recall on genuine paraphrases was zero; it matched near-identical strings, never rewordings." },
      { label: "Amazon Nova 2 embeddings", verdict: "chosen", note: "Embeds across languages directly, so a Chinese and English version of one question land close without a translation crutch." },
    ],
    decision:
      "A LangGraph pipeline on Amazon Bedrock AgentCore with a deterministic middle and only its two ends model-driven, both failing open. Questions are normalized, translated to a common language for a shared representative, embedded with Nova 2, then clustered under complete linkage against a similarity floor measured on a hand-labeled set. Infrastructure is provisioned in Terraform.",
    architecture: [
      "Read one session's questions from the platform table. The agent is scoped to a single event and session and is strictly read-only; it can never write the platform's data.",
      "Normalize in code: strip HTML, drop moderator-rejected, blank, or identity-less records. Filtering runs in Python, not as a database filter, so legacy records written before the schema settled are not silently discarded.",
      "Pivot: translate distinct texts to English so differently-worded and cross-language phrasings collapse onto one representative and share a cache entry.",
      "Embed the distinct texts with Amazon Nova 2, which handles languages directly. Vectors are cached by content hash and model id, so a re-run is nearly free.",
      "Cluster agglomeratively under complete linkage: a group forms only when every pair inside it clears a 0.77 similarity floor, so no member sits below the floor relative to another.",
      "Represent each group by its medoid — the most central real question in the group, so the moderator always sees words an attendee actually wrote.",
      "Report the shape honestly: '7,857 questions, 69 distinct, found 43'. A moderator can narrow by topic in plain language or cap how many groups are shown.",
    ],
    results: [
      { value: "7,857 → 69", metric: "questions collapsed to distinct meanings, one dev session" },
      { value: "~100x", metric: "dedup saving on embedding the largest session" },
      { value: "0.985 AUC", metric: "Nova 2 on a hand-labeled paraphrase benchmark" },
      { value: "~90s", metric: "warm run on a 69-text session (down from ~16 min cold, unpooled)" },
      { value: "Read-only", metric: "the agent never writes the platform's data" },
    ],
    stack: ["Bedrock AgentCore", "LangGraph", "Amazon Nova 2", "DynamoDB", "Terraform", "Python"],
    diagram: [
      { label: "Load", note: "scoped, read-only" },
      { label: "Normalize", note: "strip + filter" },
      { label: "Pivot", note: "translate, cached" },
      { label: "Embed", note: "Nova 2, cached" },
      { label: "Cluster", note: "complete linkage" },
      { label: "Report", note: "medoid + demand" },
    ],
    lesson:
      "Keep the deterministic core deterministic and let only the ends be model-driven, both failing open. A moderator can see when nothing was narrowed; they cannot see questions that were silently dropped. So when a stage fails, degrade to a slightly worse grouping, never to nothing.",
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "Nova's live events already push real-time questions to moderators. The missing piece was sense-making: when thousands of questions arrive, which concerns actually matter, and how many people share each one. This agent is the answer, and it is the piece I am building now on Amazon Bedrock AgentCore.",
          "The hard part is not clustering in the abstract. It is doing it reproducibly, across languages, on a corpus that is mostly repetition, without ever dropping a genuine attendee question because of a schema quirk or a model hiccup.",
        ],
      },
      {
        heading: "Why translate before embedding",
        paragraphs: [
          "The pivot to a common language is load-bearing for two reasons. It collapses Traditional and Simplified and English phrasings of one question onto a single string, so they share one cache entry and one embedding, and it gives the moderator a representative they can actually read. Newer multilingual embeddings narrow the gap on raw cross-language matching, but the pivot still earns its place on cost and on display.",
        ],
      },
      {
        heading: "Choosing the similarity floor",
        paragraphs: [
          "The floor is a property of the embedder, not of the problem, so it was measured, not guessed: a hand-labeled set of attendee questions with deliberate near-miss traps (an attendee limit against a poll limit, a free trial against enterprise pricing). The earlier embedder looked fine on a load-test full of literal edit variants but had near-zero recall on genuine rewordings, which is exactly the case that matters. The current floor sits at the benchmark's F1 peak, chosen because under-merging is invisible to a moderator while over-merging is not.",
        ],
      },
      {
        heading: "Read-only and fail-open",
        paragraphs: [
          "Two rules keep the feature safe to ship. The agent reads the platform's data and never writes it; grouping is a derived view stored in the agent's own table, so dropping those records changes nothing else. And every model-driven stage fails open: a text that cannot be translated is grouped in its original language, a text that cannot be embedded is left out, and neither fails the run. A worse grouping always beats returning nothing.",
        ],
      },
    ],
  },
  {
    slug: "iot-core-to-appsync",
    title: "From IoT Core to AppSync",
    tagline: "Re-platforming real-time audience interaction for scale",
    accent: "#a855f7",
    duration: "Nova Dynamic Media",
    role: "Senior Full-Stack & Cloud Engineer",
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
    stack: ["AppSync", "GraphQL", "Cognito", "DynamoDB", "Lambda", "WebSockets", "Amazon IVS"],
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
    role: "Senior Full-Stack & Cloud Engineer",
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
    slug: "ivs-low-latency-streaming",
    title: "Ultra-Low-Latency Live Streaming on Amazon IVS",
    tagline: "Real-time video and secure HLS delivery for enterprise events",
    accent: "#35d6a4",
    duration: "Nova Dynamic Media",
    role: "Senior Full-Stack & Cloud Engineer",
    problem:
      "Enterprise live events are only real if the video is real-time. Q&A, polls and synchronized slides all refer to what the speaker just said, so a multi-second broadcast delay pulls the interaction out of sync with the moment it belongs to. On top of the live path, a back catalog of over a thousand recorded sessions had to play smoothly across phones and unreliable networks, stay access-controlled for gated content, and not run up a bandwidth bill.",
    options: [
      { label: "Standard HLS / RTMP broadcast", verdict: "rejected", note: "Ten to thirty seconds of latency. The audience would be voting on a slide the speaker left half a minute ago." },
      { label: "Self-managed WebRTC SFU", verdict: "rejected", note: "Owning scaling, TURN servers and recording ourselves — undifferentiated heavy lifting for a small team." },
      { label: "Amazon IVS low-latency", verdict: "chosen", note: "Managed low-latency playback that scales, and integrates with the rest of the AWS stack the platform already runs on." },
      { label: "Raw public HLS files for VOD", verdict: "rejected", note: "No access control. Gated and paid sessions need entitlement, not an open URL." },
    ],
    decision:
      "Amazon IVS carries the live low-latency path so the interactive layer stays locked to the stream, a secure HLS pipeline with token-based encryption serves on-demand and gated content, and the legacy library was migrated to adaptive-bitrate HLS with AWS MediaConvert.",
    architecture: [
      "Live sessions broadcast through Amazon IVS for low-latency playback, so the audience sees the speaker in near real time.",
      "The interactive layer (AppSync Q&A, polls, synchronized slides and captions) is held in lockstep with the IVS stream, so a poll or slide lands with the moment it refers to.",
      "On-demand and gated video is served over HLS with token-based encryption and access control, so only entitled viewers can play a session.",
      "Over a thousand legacy videos were migrated to adaptive-bitrate HLS with AWS MediaConvert, improving quality across devices and cutting bandwidth against the old single-rate delivery.",
      "Playback analytics — watch time, framerate, completion — feed the telemetry pipeline that powers reporting and the e-learning progress bar.",
    ],
    results: [
      { value: "Near real-time", metric: "live playback, interaction stays in sync with the stream" },
      { value: "1,000+ videos", metric: "migrated to adaptive HLS with MediaConvert" },
      { value: "Lower bandwidth", metric: "adaptive bitrate versus single-rate delivery" },
      { value: "Access-controlled", metric: "token-based HLS encryption on gated content" },
      { value: "Multi-device", metric: "smooth playback across phones and weak networks" },
    ],
    stack: ["Amazon IVS", "HLS", "AWS MediaConvert", "CloudFront", "AppSync", "KMS"],
    diagram: [
      { label: "Broadcast", note: "live session" },
      { label: "Amazon IVS", note: "low-latency" },
      { label: "CloudFront edge", note: "global" },
      { label: "Viewer", note: "in sync with interaction" },
    ],
    lesson:
      "Match the latency budget to the interaction. If the audience acts on what they just saw, the video path has to be real-time; a managed low-latency service for live plus a secured adaptive-HLS path for the library covers both without owning streaming infrastructure.",
  },
  {
    slug: "elearning-platform",
    title: "An E-Learning Layer for Live Events",
    tagline: "Verified video progress, quizzes, and certificates at 1000+ users",
    accent: "#35d6a4",
    duration: "Nova Dynamic Media",
    role: "Full-Stack Engineer",
    problem:
      "Events needed to double as accredited courses. A viewer's progress through each session had to be tracked against a real completion bar, they had to pass a quiz, and only then earn a certificate that could be verified later. Admins then needed reports across thousands of users, and the naive version of that — fetch everything, format in memory — times out well before a thousand rows.",
    options: [
      { label: "Third-party LMS", verdict: "rejected", note: "A separate silo that does not know about the live event, its auth, or its streaming analytics." },
      { label: "Build on the serverless stack", verdict: "chosen", note: "Reuse the platform's auth, storage and video analytics; the course and the event are one system." },
      { label: "Compute completion in the browser", verdict: "rejected", note: "Unreliable and gameable. A certificate has to be earned on evidence the server trusts." },
    ],
    decision:
      "A serverless e-learning API, split into viewer and admin services, that tracks real watch progress against a completion threshold, scores quizzes server-side, issues PDF and PNG certificates with unique validation IDs, and generates bulk admin reports built to handle over a thousand users at a time.",
    architecture: [
      "The viewer API records watch progress per session and instance (watch time, furthest play position, completion percentage) and marks a course complete only at the threshold — measured against real playback, not a button click.",
      "Quizzes are submitted and scored on the backend; attempts, best score and pass/fail are tracked, and multiple-choice questions are auto-graded.",
      "On completion plus a passing score, a certificate is issued as PDF and PNG with a unique validation ID so it can be checked later, and an email notification goes out.",
      "The admin API generates course-progression, certificate and quiz reports across every user, fetching in parallel and formatting to Excel and CSV.",
      "Reports are stored in S3 and distributed through CloudFront; parallel fetches and tight DynamoDB queries keep a 1000+ user report inside the Lambda budget.",
    ],
    results: [
      { value: "1,000+ users", metric: "per report, generated without timing out" },
      { value: "Server-side", metric: "quizzes graded and verified on the backend" },
      { value: "Verifiable", metric: "PDF/PNG certificates carry a unique validation ID" },
      { value: "Real progress", metric: "completion tracked to a watch bar, not a click" },
      { value: "Excel / CSV", metric: "bulk admin reports via S3 and CloudFront" },
    ],
    stack: ["Lambda", "DynamoDB", "S3", "CloudFront", "ExcelJS", "PDF-lib", "Node.js 22"],
    diagram: [
      { label: "Watch + quiz", note: "viewer API" },
      { label: "DynamoDB", note: "progress + scores" },
      { label: "Certificate", note: "PDF/PNG + validation id" },
      { label: "Admin report", note: "Excel/CSV → S3/CDN" },
    ],
    lesson:
      "Completion has to be earned and verified on the server, or a certificate means nothing. Track real watch progress, grade on the backend, and give every certificate a validation ID so it can be checked long after the event.",
  },
  {
    slug: "ai-event-reporting",
    title: "AI Reporting and Summaries for Live Events",
    tagline: "Step Functions aggregation and grounded Bedrock summaries over event data",
    accent: "#35d6a4",
    duration: "Nova Dynamic Media · in progress",
    role: "Sole owner of the AI platform",
    problem:
      "After an event, organizers want one comprehensive report — attendees, user activity, login history, Q&A, polls, surveys — plus plain-language summaries and insight. That data is spread across several DynamoDB tables and an Athena telemetry store, one of those queries is asynchronous, and the obvious implementation re-fetches every user's profile inside every report branch. It also cannot hang on a long HTTP request while all of that runs.",
    options: [
      { label: "One large Lambda does everything", verdict: "rejected", note: "Times out, cannot cleanly wait on the async Athena query, and every failure restarts the whole thing." },
      { label: "Step Functions orchestration", verdict: "chosen", note: "Parallel branches, a proper wait-and-poll loop for Athena, and retries per step." },
      { label: "Re-fetch user profiles per branch", verdict: "rejected", note: "The same batch profile lookup repeated in every report branch — redundant and slow." },
      { label: "Build one attendee dictionary", verdict: "chosen", note: "Resolve userId to profile once, then hydrate every branch from it." },
    ],
    decision:
      "An HTTP call starts a Step Function that fans out across the report domains and returns an execution id; clients poll for status, so nothing hangs on a long connection. Every branch hydrates from a single attendee dictionary, and Amazon Bedrock (Converse over a Knowledge Base, with role-based model fallback chains) writes the summaries.",
    architecture: [
      "The HTTP request starts a Step Function and returns an execution ARN. Clients poll a status endpoint, so there is no long-lived request to time out.",
      "It fetches the event profile and session list, then builds one attendee dictionary (userId to profile) as the single source of truth for hydration.",
      "Parallel branches run: user activity from Athena behind a wait-and-choice poll loop, login history from DynamoDB, and Q&A, poll and survey as Map states fanned out over sessions.",
      "Each branch hydrates names and groups from the attendee dictionary instead of re-querying user profiles, turning many redundant reads into one.",
      "Bedrock Converse over a Knowledge Base (S3 Vectors) generates transcription summaries, question sets and the comprehensive report, with role-based model fallback chains so one model outage does not stop the run.",
      "Reports render to Excel and CSV, land in S3, and ship through CloudFront; the report password is encrypted with KMS.",
    ],
    results: [
      { value: "One report", metric: "attendees, activity, logins, QnA, polls, surveys unified" },
      { value: "Async by design", metric: "Step Functions plus status polling, no long HTTP" },
      { value: "Fewer reads", metric: "one attendee dictionary hydrates every branch" },
      { value: "Model fallback", metric: "role-based chains survive a provider outage" },
      { value: "Grounded", metric: "summaries come from a knowledge base, not free-form text" },
    ],
    stack: ["Step Functions", "AWS Bedrock", "Knowledge Base", "Athena", "DynamoDB", "KMS"],
    diagram: [
      { label: "Start + attendee dict", note: "single hydration source" },
      { label: "Parallel branches", note: "Athena, DynamoDB, Map states" },
      { label: "Bedrock summarize", note: "KB-grounded" },
      { label: "Report", note: "Excel/CSV → S3/CDN" },
    ],
    lesson:
      "Orchestrate, do not monolith. A Step Function handles the async Athena poll and the parallel fan-out cleanly, and building the user dictionary once turns N redundant profile lookups into one. Keep the AI summaries grounded in a knowledge base so the report reflects the event, not the model's imagination.",
  },
  {
    slug: "live-telemetry-valkey",
    title: "Real-Time Presence Telemetry at Scale",
    tagline: "Stateless heartbeats + Valkey, not WebSockets + Redis",
    accent: "#34d399",
    duration: "Nova Dynamic Media",
    role: "Senior Full-Stack & Cloud Engineer",
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
    role: "Senior Full-Stack & Cloud Engineer",
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
