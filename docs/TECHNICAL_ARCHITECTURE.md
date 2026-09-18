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

Canonical public civic routes are prerendered during the production build. `react-router.config.ts` derives service and procurement detail routes from validated normalized civic data rather than maintaining duplicate route lists.

Barangays remain normalized civic data consumed directly by Government and later Statistics. They do not have separate V1 public index/detail routes.

The public deployable output is:

```text
build/client
```

React Router may also produce build-time server artifacts while prerendering. Those artifacts do not create a production application server or runtime backend.

Core civic information is emitted as generated HTML rather than depending on client JavaScript to become readable.

## Search and discovery

V1 does not require a site-wide global-search subsystem.

The approved discovery pattern is resident-task navigation plus a lightweight `Find a Service` experience over normalized service records.

`Find a Service` does not justify a search server, external index, runtime API, database, or AI layer.

Domain-specific browsing and filtering remain inside the relevant section.

A broader site-wide search may be reconsidered only if later content volume and resident use demonstrate a real need.

## UI architecture

Tailwind CSS 4 is the BetterBauang design-system layer.

Shared visual values are expressed through semantic CSS variables and Tailwind theme tokens rather than hardcoded repeatedly in page components. The initial token layer includes a provisional purple brand ramp, warm neutral surfaces, semantic foreground/background roles, border/input roles, focus color, destructive state, and shared radii. Exact brand values may be tuned later without rewriting page markup.

`components.json` configures the repository for shadcn/ui. BetterBauang uses shadcn as a source for selected local components, not as a separate hosted UI runtime or as the product's visual identity.

Import aliases use:

```text
@/* → ./src/*
```

The component policy is:

- add a shadcn component only when the product uses it;
- keep generated component source in the repository so it can be adapted to BetterBauang tokens and accessibility requirements;
- do not preinstall a large component catalog;
- add any required package dependency together with its `package-lock.json` change because CI uses `npm ci`;
- use Lucide as the icon vocabulary when icons are introduced;
- add chart dependencies only when a Statistics or Transparency view actually benefits from a chart;
- prefer tables, lists, and plain values when they communicate the data more clearly than a chart;
- do not add Kapwa, MUI, Chakra, Mantine, Ant Design, or another full UI framework without a demonstrated need.

Page structure is not defined by the component library. Resident purpose, information hierarchy, and source-ready content are planned first; reusable components implement that plan afterward.

## Civic data architecture

```text
official source
→ source registration
→ staging when needed
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

### Barangay data boundary

Barangay records combine stable municipality/geography data with an optional separately provenanced current-leadership record.

The stable record includes fields such as PSGC identifiers, classification, and period-labeled population. Current barangay leadership/contact uses the optional `punongBarangay` object:

```text
punongBarangay.name
punongBarangay.phoneNumbers[]
punongBarangay.provenance
```

The leadership object is optional by design. Missing current evidence must not force placeholders or stale values into production data.

PSA provenance for stable barangay identity/population does not satisfy the provenance requirement for current Punong Barangay/contact claims.

## Runtime validation

Zod is the runtime validation layer for civic data.

Validation covers the implemented civic domains and their provenance, identifiers, dates, URLs, controlled statuses, and domain invariants.

## MVP infrastructure rules

Do not add a runtime database, authentication, CMS, application API, analytics, queue, vector database, object storage, search service, or runtime AI service unless an approved product requirement requires it.

The current application has no runtime database, API server, authentication system, CMS, or application server.

## CI

GitHub Actions uses the Node.js version pinned in `.node-version` and runs the existing project contract:

```text
npm ci
npm run validate:data
npm run lint
npm run build
```

CI validates the application and civic-data build. CI is separate from Cloudflare deployment.

## Deployment

The deployment target is Cloudflare Workers Static Assets.

`wrangler.jsonc` is asset-only and points to `build/client`. It does not define a Worker `main` entry point, runtime bindings, or backend services.

Production deployment and Cloudflare account connection remain separate release steps and are not performed by CI.

## Architecture rule

Prefer the smallest implementation that satisfies a demonstrated BetterBauang requirement.
