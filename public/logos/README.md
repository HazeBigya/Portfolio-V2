# Hero tech logos

`HeroAIVisual` (`components/hero-ai-visual.tsx`) loads orbiting logos from this folder.
Drop the official SVGs here with these EXACT filenames. Until a file exists, that
node renders a clean accent-colored monogram fallback (nothing looks broken).

Square SVGs work best (they're shown at 28×28 inside a white circular chip).

| File            | Tech       | Where to get it                                                        |
|-----------------|------------|------------------------------------------------------------------------|
| `bedrock.svg`   | AWS Bedrock| AWS Architecture Icons (Asset Package → Machine Learning → Bedrock)    |
| `lambda.svg`    | AWS Lambda | AWS Architecture Icons (Compute → Lambda)                              |
| `appsync.svg`   | AWS AppSync| AWS Architecture Icons (App Integration → AppSync)                     |
| `dynamodb.svg`  | DynamoDB   | AWS Architecture Icons (Database → DynamoDB)                           |
| `redis.svg`     | Redis      | https://www.redis.io brand assets / simpleicons.org (`redis`)         |
| `graphql.svg`   | GraphQL    | https://graphql.org brand assets / simpleicons.org (`graphql`)        |

`RAG` and `Vector DB` are concepts (no brand mark) — they use built-in Lucide
icons, so no file is needed for them.

AWS Architecture Icons: https://aws.amazon.com/architecture/icons/
