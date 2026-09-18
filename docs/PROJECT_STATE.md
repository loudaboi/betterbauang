# BetterBauang Project State

Status: Active implementation reference  
Last synchronized: 2026-09-19

This file tracks the current V1 implementation state and the next work.

Read alongside:

- `docs/DATA_PROVENANCE.md`
- `docs/TECHNICAL_ARCHITECTURE.md`
- `docs/EXPERIENCE_FOUNDATION.md`
- `CONTRIBUTING.md`

The repository is executable truth. If documentation and code disagree, inspect the current development branch before changing either.

## 1. Git and release boundary

Development branch:

`build/betterbauang-v0`

Stable release branch:

`main`

Do not modify, merge, rebase, reset, force-push, or otherwise move `main` without explicit approval.

Production release is not approved.

## 2. Product rule

BetterBauang is an independent civic information layer for Bauang, La Union.

Core rule:

**No source, no civic claim.**

The product should help residents:

- understand and access municipal services;
- find current government officials and contacts;
- find barangays and current barangay leadership/contact information where source-ready;
- inspect public finance, procurement, disclosures, audits, and properly attributed infrastructure;
- understand verified statistics about Bauang;
- trace material civic information to authoritative sources.

Missing information stays missing. Historical information is never silently presented as current.

## 3. Approved V1 information architecture

### Persistent emergency strip

A compact emergency hotline strip sits above the main header.

Emergency does not need a standalone page. Full details and provenance belong in Contact.

### Main header

```text
BetterBauang
Home
Services
Government
Statistics
Transparency
Contact
EN / FIL / ILO
```

Do not add separate top-level navigation for Search, Barangays, Procurement, About, eLGU, or Emergency.

Relationship to primary sections:

```text
Barangays   → Government
Procurement → Transparency
Emergency   → persistent strip + Contact
eLGU        → relevant service pages
About/Trust → footer/supporting links
Search      → Find a Service inside Home/Services
```

### Route consolidation rule

Normalized data does not automatically justify its own route.

Approved V1 decisions:

- `/barangays` and `/barangays/:slug` are retired. Barangays live inside Government.
- Barangay normalized data remains required for Government, Statistics, and provenance.
- `/bauang` is development scaffolding. Statistics must absorb its useful municipality-reference information before the route is retired.
- Procurement belongs conceptually under Transparency. Existing procurement URLs may remain implementation routes if useful, but Procurement is not a primary navigation section.
- About, Sources, and Methodology remain supporting trust routes.

## 4. Delivery approach

Data work and visual work now move together instead of waiting for one large redesign at the end.

Rules:

- civic claims remain source-gated regardless of presentation work;
- shared design tokens and reusable components come before one-off page styling;
- page structure and content hierarchy must be planned before that page is rebuilt visually;
- brand colors, spacing, radii, states, and other reusable values belong in tokens rather than scattered hardcoded values;
- shadcn/ui is a source for selected reusable components, not the BetterBauang visual identity;
- visual work must not invent missing data or preserve obsolete routes for design convenience;
- accessibility and responsive behavior are part of each page build, not a later patch.

## 5. Current implementation state

### IA/search cleanup

Status: **COMPLETE**

Completed:

- superseded `/search` route removed;
- Pagefind removed;
- site-wide search intentionally not part of V1;
- Find a Service remains the approved discovery model for Services;
- static-first architecture preserved.

### Contact + emergency strip

Status: **COMPLETE**

Completed:

- current reviewed MDRRMO, MHO, PNP Bauang MPS, BFP Bauang, and Unified 911 contacts normalized;
- persistent emergency strip implemented;
- `/contact` built and prerendered;
- verified general municipal contact information published;
- older non-current emergency numbers are not surfaced as current.

### Services

Status: **COMPLETE**

Completed:

- eleven source-ready service records normalized;
- `/services` and `/services/:service` built and prerendered;
- requirements, steps, fees, processing time, forms, provider information, and official transaction links are shown only where reviewed sources support them;
- official eLGU transactions are linked rather than recreated;
- Find a Service runs only over normalized service records.

### Government

Status: **IN PROGRESS — LEADERSHIP/CONTACT SOURCE CLOSURE**

Core work already completed:

- current mayor, vice mayor, and Sangguniang Bayan roster normalized from reviewed current government sources;
- reviewed general municipal contact integrated;
- `/government` built and prerendered;
- redundant `/barangays` and `/barangays/:slug` routes removed;
- all 39 PSA-backed barangay records preserved;
- all 39 barangay names presented directly in Government;
- Government added to live navigation;
- stale 2024 barangay-leadership/contact material was not promoted as current 2026 data.

The barangay implementation supports:

```text
Barangay name
Current Punong Barangay, when verified
Verified direct phone number(s), when available
Leadership/contact provenance and last-verified date
```

The normalized barangay schema has a separate optional `punongBarangay` record with its own provenance. Missing fields are omitted rather than filled with `TBA`, guesses, or stale directory data.

Still required:

1. complete one dedicated current-source pass for Punong Barangays and direct contacts;
2. normalize every record that passes freshness/source review;
3. document unresolved coverage instead of filling gaps from stale material;
4. complete Government hierarchy, tap-to-call, and provenance QA.

A perfect 39/39 leadership/contact corpus is desirable but must not become an indefinite blocker if competent current sources do not publish complete coverage.

### Statistics

Status: **CORE DATA READY / PAGE NOT BUILT**

Already available:

- municipality identity;
- all 39 barangays;
- PSGC identifiers and classifications;
- 2024 POPCEN municipality and barangay populations;
- explicit reference-period/source metadata.

Still required:

- build `/statistics`;
- absorb useful municipality-reference information currently exposed by `/bauang`;
- retire `/bauang` after that migration;
- add only source-ready indicators that materially improve V1.

### Transparency

Status: **SOURCE MATERIAL PARTLY READY / PAGE NOT BUILT**

Available source families and groundwork include:

- BLGF FY2025 annual fiscal datasets;
- BLGF FY2026 Q1 SRE data;
- FY2025 LDRRMF and SEF data;
- Bauang FDP 2025 and 2026 material;
- normalized historical FY2024 procurement records;
- FY2025 PMR and CY2026 first-semester PMR source material;
- Updated/Supplemental APP material;
- PhilGEPS source layer;
- COA Bauang Compliance Audit Report 2024;
- finance, procurement, document, and project schemas.

Before implementation, audit the complete Transparency surface and lock the resident-facing V1 structure. Infrastructure remains optional if a useful defensible corpus is not source-ready.

### Languages

Status: **ARCHITECTURE READY / CONTENT NOT READY**

Supported locale architecture:

```text
en
fil
ilo
```

EN remains canonical. Publish Filipino and Ilocano only after reviewed translated civic content exists. Runtime AI translation is not authoritative civic content.

### UI foundation

Status: **COMPLETE**

The repository now has:

- a Tailwind CSS semantic token layer;
- a centralized provisional purple brand ramp and warm neutral surfaces;
- shadcn/ui project configuration for source-owned components;
- `@/*` aliases in TypeScript and Vite;
- Lucide selected as the icon vocabulary when icons are introduced;
- a rule that charting is added through the approved component layer only when Statistics or Transparency actually needs a chart.

The exact purple ramp, typography, and complete component inventory are still design decisions, not frozen constants.

No Kapwa or full UI framework is part of the BetterBauang stack.

## 6. Current work

Two tracks can now move in parallel.

### Civic data

**Next: Government leadership/contact source closure and Government functional QA.**

```text
current competent official source discovery
→ source registration
→ extraction/staging if needed
→ freshness and conflict review
→ normalize supported Punong Barangay/contact records
→ Government functional QA
→ validation + CI
```

### Product/UI

**Next: plan the Home structure, then build the homepage with the shared visual system.**

The Home structure is not considered approved merely because the visual foundation exists. Decide the hierarchy and content composition first, then implement it.

Government source closure does not block Home visual work. Home visual work does not relax Government source rules.

## 7. Remaining work

Civic/data track:

```text
Government leadership/contact closure + QA
→ Transparency audit + implementation
→ Statistics + retire /bauang
→ route/link/data QA
```

Product/UI track:

```text
UI foundation                           COMPLETE
→ Home structure plan + homepage build NEXT
→ apply shared patterns to existing Services, Government, and Contact
→ build Transparency and Statistics with the shared system as those sections are implemented
→ final cross-product responsive/accessibility/visual QA
```

Languages, trust/SEO cleanup, and public-release QA follow once the V1 product is complete enough to review as a whole.

## 8. Source material already worked

Research/source-closure sessions have used:

- `BPLO-FINAL.pdf`
- `Bauang Citizen's Charter.zip`
- `Bauang PMR.zip`
- `Bauang FDP 2025.zip`
- `Bauang FDP 2026.zip`
- `BLGF.zip`

Raw research files are not production data merely because they were reviewed.

If a future session cannot access a raw source needed for new extraction, do not reconstruct the missing facts from memory. Use existing normalized/source-registry records where sufficient or reacquire the source.

## 9. Architecture boundary

Keep the current static-first architecture:

- React 19;
- React Router Framework Mode;
- TypeScript strict;
- Tailwind CSS;
- selected source-owned shadcn/ui components as needed;
- Zod;
- static prerendering;
- Cloudflare Workers Static Assets.

Do not add a database, auth, CMS, runtime API, global search service, runtime AI, queue, or similar infrastructure without a demonstrated requirement and explicit approval.

## 10. Validation and handoff

Before completing an implementation step:

```bash
npm run validate:data
npm run lint
npm run build
```

Check GitHub Actions after pushing.

A new session must:

1. verify `build/betterbauang-v0` and current HEAD;
2. confirm `main` is untouched;
3. read `PROJECT_STATE.md`, `DATA_PROVENANCE.md`, `TECHNICAL_ARCHITECTURE.md`, and `EXPERIENCE_FOUNDATION.md`;
4. inspect the current implementation before editing;
5. keep civic data work and UI work within the two current tracks above unless explicit approval changes them.
