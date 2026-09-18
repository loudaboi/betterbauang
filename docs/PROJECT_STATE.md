# BetterBauang Project State

Status: Active implementation reference  
Last synchronized: 2026-09-18

This file is the authoritative V1 implementation sequence and completion-state reference.

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

## 4. Rebuild and UI boundary

Finish the information, data, route, and resident-task rebuild before final visual design.

During the rebuild:

- source closure, normalization, route consolidation, semantic hierarchy, responsive functionality, and accessibility baseline are in scope;
- neutral functional presentation is allowed where necessary;
- final typography, spacing system, visual identity, page composition, component styling, and final homepage design are deferred.

After rebuild closure, stop feature work and conduct a dedicated UI planning phase before changing the final visual system.

Do not silently transition from rebuild work into UI design.

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

Status: **IN PROGRESS — LEADERSHIP/CONTACT SOURCE CLOSURE NEXT**

Core work already completed:

- current mayor, vice mayor, and Sangguniang Bayan roster normalized from reviewed current government sources;
- reviewed general municipal contact integrated;
- `/government` built and prerendered;
- redundant `/barangays` and `/barangays/:slug` routes removed;
- all 39 PSA-backed barangay records preserved;
- all 39 barangay names presented directly in Government;
- Government added to live navigation;
- stale 2024 barangay-leadership/contact material was not promoted as current 2026 data.

Implementation contract now supports the intended barangay information model:

```text
Barangay name
Current Punong Barangay, when verified
Verified direct phone number(s), when available
Leadership/contact provenance and last-verified date
```

The normalized barangay schema has a separate optional `punongBarangay` record with its own provenance. Barangay leadership/contact claims must not inherit PSA population/geography provenance.

The Government page renders leadership/contact information only when such reviewed normalized data exists. Missing fields are omitted. Do not render `TBA`, guessed names, guessed numbers, or stale directory entries as current.

Government is **not complete yet**.

Still required before Transparency:

1. conduct a dedicated current-source acquisition pass for Bauang's 39 Punong Barangays and direct contact numbers using competent current official sources;
2. verify records individually or from a current authoritative directory;
3. normalize every record that passes freshness/source review into the separate `punongBarangay` field;
4. document unresolved coverage rather than filling gaps from stale material;
5. perform a final functional Government hierarchy/source QA covering executive leadership, Sangguniang Bayan, municipal contact, barangays, tap-to-call behavior, and provenance presentation.

A perfect 39/39 leadership/contact corpus is desirable but is not allowed to become an indefinite blocker. If a dedicated current-source pass cannot support complete coverage, record the coverage limitation, omit unsupported fields, finish the functional QA, and then close Government.

Do **not** start Transparency until this source-closure pass and Government functional QA are completed and documented.

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

Status: **SOURCE MATERIAL PARTLY READY / IMPLEMENTATION DEFERRED UNTIL GOVERNMENT CLOSES**

Available source families and existing groundwork include:

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

Do not assume a Transparency sub-order from this inventory. When Government closes, first audit the complete Transparency surface and lock the resident-facing V1 structure before implementing its finance, procurement, document/audit, and optional infrastructure pieces.

Infrastructure remains optional if a useful defensible corpus is not source-ready.

### Languages

Status: **ARCHITECTURE READY / CONTENT NOT READY**

Supported locale architecture:

```text
en
fil
ilo
```

EN remains canonical during the rebuild. Publish Filipino and Ilocano only after reviewed translated civic content exists. Runtime AI translation is not authoritative civic content.

### Visual design

Status: **FINAL UI DEFERRED**

Current styling exists only to keep the product readable, responsive, accessible, and testable during the rebuild.

The later UI planning gate must evaluate the full product together, including:

- typography and type scale;
- grid and spacing;
- header and emergency strip;
- service discovery/detail patterns;
- Government leadership and barangay presentation;
- Transparency tables, documents, finance, and procurement;
- Statistics;
- provenance treatment;
- buttons, links, and external-government-link patterns;
- mobile navigation and responsive behavior;
- final Home composition;
- accessibility.

Broad constraint: modern public-service product, strong typography, disciplined whitespace, restrained civic accent, clear lists/tables, minimal shadows/cards, no gradients/glow, no seal imitation.

## 6. Current NEXT task

**Government leadership/contact source closure.**

Execution sequence:

```text
current competent official source discovery
→ source registration
→ extraction/staging if needed
→ freshness and conflict review
→ normalize only supported Punong Barangay/contact records
→ Government functional hierarchy/source QA
→ validation + CI
→ mark Government COMPLETE
```

Do not move to Transparency merely because route consolidation is complete.

## 7. Remaining implementation sequence

```text
1. IA/search cleanup                              COMPLETE
2. Contact + emergency strip                      COMPLETE
3. Services                                       COMPLETE
4. Government core + barangay route consolidation COMPLETE
5. Government leadership/contact source closure   NEXT
6. Government functional hierarchy + source QA
7. Transparency audit + implementation
8. Statistics + retire absorbed /bauang route
9. Rebuild closure + route/link/data QA
10. UI planning gate                              REQUIRES EXPLICIT APPROVAL
11. Final homepage + visual system
12. Languages + trust + SEO + accessibility + public QA
```

At step 10, stop before coding the final UI and produce an explicit design plan for approval.

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
5. execute only the current `NEXT` task unless explicit approval changes the sequence.
