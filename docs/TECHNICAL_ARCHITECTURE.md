# BetterBauang Technical Architecture

## Goal

BetterBauang should remain technically small while ensuring published civic information is source-linked, validated, reviewable, and maintainable.

## Current application baseline

- React 19
- React Router 8 Framework Mode
- Vite 8
- TypeScript strict mode
- Tailwind CSS 4
- Zod 4
- Oxlint
- npm with a committed lockfile
- static prerendering

Node.js 22.23.2 is pinned in `.node-version`.

## Rendering

BetterBauang uses React Router Framework Mode with `ssr: false`.

Canonical public civic routes are prerendered during the production build. `react-router.config.ts` derives barangay and procurement detail routes from validated normalized civic data rather than maintaining a duplicate route list.

The public deployable output is:

```text
build/client
```

React Router may also produce build-time server artifacts while prerendering. Those artifacts do not create a production application server or runtime backend.

Core civic information is emitted as generated HTML rather than depending on client JavaScript to become readable.

## Static search

Global search uses Pagefind as a build-time static index.

The production build flow is:

```text
TypeScript project build
→ React Router static prerender
→ build/client
→ Pagefind indexes reviewed generated HTML
→ build/client/pagefind
```

The application exposes a prerendered `/search` route. Search state uses the normal `?q=` URL parameter, while the browser loads the generated `/pagefind/pagefind.js` bundle and static index. Search does not require an application API, runtime database, Worker search handler, Meilisearch, or runtime AI.

Reviewed pages opt into global search with `data-pagefind-body`. Search-result metadata uses a stable category field and an optional reporting/reference period. Future civic routes join the same index only after they contain reviewed publishable content.

Home and the Search route are intentionally outside the primary Pagefind result corpus. Raw source PDFs are not added as primary global-search records during Phase 4G.3.

## Civic data architecture

```text
official source
→ source registration
→ staging
→ schema and domain validation
→ human review
→ normalized production data
→ static prerender
```

Directories:

```text
data/
├── sources/
├── staging/
└── normalized/
```

The production application must not consume staging data.

`src/lib/civic-data.server.ts` reads normalized JSON during build/server execution and validates it again through the existing Zod schemas. Routes do not fetch civic data from a runtime API.

## Runtime validation

Zod is the runtime validation layer for civic data.

Validation covers the implemented civic domains and their provenance, identifiers, dates, URLs, controlled statuses, and domain invariants.

## MVP infrastructure rules

Do not add a runtime database, authentication, CMS, application API, analytics, queue, vector database, object storage, or runtime AI service unless an approved product requirement requires it.

The current application has no runtime database, API server, authentication system, CMS, or application server.

## CI

GitHub Actions uses the Node.js version pinned in `.node-version` and runs the existing project contract:

```text
npm ci
npm run validate:data
npm run lint
npm run build
```

CI validates the application and civic-data build. `npm run build` also generates the Pagefind static search index after prerendering. CI is separate from Cloudflare deployment.

## Deployment

The deployment target is Cloudflare Workers Static Assets.

`wrangler.jsonc` is asset-only and points to `build/client`. It does not define a Worker `main` entry point, runtime bindings, or backend services.

Production deployment and Cloudflare account connection remain separate release steps and are not performed by CI.

## Architecture rule

Prefer the smallest implementation that satisfies a demonstrated BetterBauang requirement.
