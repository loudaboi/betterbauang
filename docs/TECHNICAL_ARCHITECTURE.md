# BetterBauang Technical Architecture

## Goal

BetterBauang should remain technically small while ensuring published civic information is source-linked, validated, reviewable, and maintainable.

## Current application baseline

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Zod
- Oxlint
- npm with committed lockfile

The application currently uses a minimal client-side router during repository and data-foundation work.

Static rendering for public civic routes will be resolved before the application expands into its full civic route set.

## Civic data architecture

```text
official source
→ source registration
→ staging
→ schema and domain validation
→ human review
→ normalized production data
→ application
```

Directories:

```text
data/
├── sources/
├── staging/
└── normalized/
```

The production application must not consume staging data.

## Runtime validation

Zod is the runtime validation layer for civic data.

Initial validation should remain small:

- source metadata;
- provenance;
- stable IDs;
- dates;
- URLs where required;
- controlled status values.

Domain schemas should be added only when a real dataset requires them.

## MVP infrastructure rules

Do not add a runtime database, authentication, CMS, application API, analytics, queue, vector database, object storage, or runtime AI service unless an approved product requirement requires it.

Search, deployment, browser testing, and automation should be added when the application reaches the stage where they provide concrete value.

## Rendering

The final public civic application should expose important information as generated HTML rather than requiring client JavaScript to make core facts readable.

The current BrowserRouter setup is temporary and intentionally sufficient for foundation work.

## Testing and CI

Testing should grow with real behavior.

Initial order:

1. data validation;
2. unit/data tests;
3. CI for stable commands;
4. browser tests when meaningful user flows exist.

## Deployment

Cloudflare remains the intended hosting direction for the static public application.

Deployment configuration is deferred until the static output strategy is finalized.

## Architecture rule

Prefer the smallest implementation that satisfies a demonstrated BetterBauang requirement.
