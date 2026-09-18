# BetterBauang Project State

Status: Active handoff and roadmap reference  
Last synchronized: 2026-09-18

This file records the current implementation state and near-term roadmap. It is intentionally compact.

It does not replace:

- `docs/DATA_PROVENANCE.md` for evidence, source precedence, and freshness rules;
- `docs/TECHNICAL_ARCHITECTURE.md` for implementation architecture;
- `docs/EXPERIENCE_FOUNDATION.md` for shared product-experience rules;
- `CONTRIBUTING.md` for contribution requirements.

When this file conflicts with the executable repository state, inspect the current branch and reconcile the documentation rather than assuming this file is newer.

## 1. Git and release boundary

Development branch:

`build/betterbauang-v0`

Stable release branch:

`main`

Do not modify, merge, rebase, reset, force-push, or otherwise move `main` without explicit approval.

At the time this state was synchronized, `main` remained at:

`832a07c4508e2c7523c3f70e6a33c969f6dba06a`

Production release is not approved.

Development changes must remain focused, pass the repository checks, and stay on the development branch until separately reviewed for release.

## 2. Current phase state

```text
Phase 0  Constitution & Governance                 COMPLETE
Phase 1  Bauang Research / Source Audit            COMPLETE
Phase 2  Product Definition                        COMPLETE
Phase 3  Technical Architecture                    COMPLETE

Phase 4A Repository foundation                     COMPLETE
Phase 4B Civic-data foundation                     COMPLETE
Phase 4C PSA municipality + barangays              COMPLETE
Phase 4D Procurement vertical slice                COMPLETE
Phase 4E Static civic application foundation       COMPLETE
Phase 4F CI + deployment preparation               COMPLETE

Phase 4G.1 Source Closure                          COMPLETE
Phase 4G.2 Experience Foundation                   COMPLETE
Phase 4G.3 Homepage + Global Search                NEXT
```

Phase 4G.1 expanded the earlier narrow MVP only where authoritative Bauang source gates were closed. Source discovery should not continue broadly unless implementation exposes a specific evidence gap.

## 3. Current product posture

BetterBauang is an independent public-information layer for Bauang, La Union.

It should help residents:

- find and understand government services;
- reach official government transaction destinations;
- find verified emergency information;
- understand municipal offices, officials, and barangays;
- inspect public finance and procurement records;
- inspect appropriately attributed infrastructure and public documents;
- verify where material civic information came from.

BetterBauang must remain visibly independent from the Municipality of Bauang and must not imitate an official municipal portal.

Core rule:

**No source, no civic claim.**

Unknown is valid. Historical is not current. Conflicting official sources must remain explicit.

## 4. Current V1 product surface

The evidence-supported V1 direction now includes:

- Home;
- Global Search;
- Emergency;
- Services;
- official downloadable forms;
- Government and municipal offices;
- Barangays;
- Transparency;
- Finances and Full Disclosure records;
- Procurement;
- limited infrastructure records with correct implementing-agency attribution;
- public documents and audit records;
- About Bauang and statistics;
- Sources and Methodology;
- Corrections;
- accessibility baseline;
- localization architecture for English, Filipino, and Ilocano.

Only English is publicly exposed until Filipino and Ilocano content has been reviewed for the relevant civic domain.

## 5. Source roles

Source precedence is field-specific. See `docs/DATA_PROVENANCE.md` for the full rules.

### Municipality, population, and barangays

PSA / PSGC is canonical for municipality identifiers, barangay composition, and current published population values with their reference period.

### Services and eLGU

The Municipality of Bauang Citizen's Charter is the canonical process source for reviewed:

- eligibility;
- requirements;
- steps;
- fees;
- processing time;
- responsible office.

Official Bauang downloadable forms are the document layer for corresponding services.

DICT / Bauang eLGU is the official online transaction destination where the government already provides the transaction.

The intended relationship is:

```text
Citizen's Charter
→ process, requirements, fees, timing

Official Bauang forms
→ downloadable government documents

eLGU
→ official online transaction

BetterBauang
→ discovery, explanation, verification, and routing
```

BetterBauang must not rebuild eLGU accounts, applications, payments, or identity workflows merely to keep users on BetterBauang.

### Emergency

Use the newest dedicated official emergency advisory or competent emergency-agency publication. Older conflicting contacts remain traceable as superseded rather than merged into the current list.

### Government

Use current competent LGU/PGLU records for officeholders and offices. Current officeholders require release-time reverification and re-checking after known change events.

### Finances

BLGF is the standardized source for fiscal observations such as actual receipts and expenditures.

Bauang / DILG Full Disclosure records preserve the original disclosure documents and reporting-period snapshots.

Quarterly SRE data must preserve the source's cumulative year-to-date semantics where applicable and must not be summed as independent quarters.

### Procurement

Keep source roles distinct:

```text
APP / Updated APP / Supplemental APP
→ planning

PMR
→ monitoring / execution snapshot

PhilGEPS
→ current opportunities and published awards

FDP Bid Results / BAC records
→ period-specific results and documentary evidence
```

Do not infer record relationships unless identifiers and source evidence support the match.

### Infrastructure

DPWH or the actual implementing agency remains authoritative for national infrastructure records.

A project being physically located in Bauang does not make it a Municipality of Bauang project.

### Audits

COA is the primary audit source.

BetterBauang may surface original audit documents and carefully reviewed factual summaries. It must not convert audit material into unsupported misconduct claims, rankings, or scores.

## 6. Current data state

The repository already contains reviewed production data for:

- municipality identity;
- all 39 barangays;
- 2024 POPCEN population data;
- the initial historical FY2024 procurement slice.

Phase 4G.2 established validated normalized boundaries for:

- services;
- government officials and offices;
- emergency contacts;
- financial observations;
- civic documents, including forms, disclosures, and audits;
- public projects.

Those newer collections are intentionally empty until records pass source registration, validation, and human review. Empty collections are not placeholders and must not be populated with guessed civic facts.

The production path remains:

```text
official source
→ source registration
→ staging
→ schema/domain validation
→ human review
→ normalized production data
→ static prerender
```

Production UI never consumes staging data.

## 7. Current architecture

The approved architecture remains:

- React 19;
- React Router 8 Framework Mode;
- Vite 8;
- TypeScript strict mode;
- Tailwind CSS 4;
- Zod 4;
- Oxlint;
- static prerendering;
- `ssr: false`;
- Cloudflare static deployment.

Do not add a runtime database, authentication, CMS, application API, Meilisearch, queue, object storage, analytics, runtime AI, or similar infrastructure without a demonstrated requirement and explicit approval.

## 8. Search direction

Pagefind is the approved global static-search foundation.

It is not yet implemented.

Global Search is for discovery across useful BetterBauang pages and reviewed document metadata. It should not become a replacement for domain-specific filtering.

Examples:

- a service query should lead to the BetterBauang service explanation and then its official destination such as eLGU when applicable;
- a barangay query should lead to the canonical barangay page;
- procurement-specific filtering remains in Procurement;
- raw source PDFs should not overwhelm useful reviewed BetterBauang pages.

Search-result categories may include services, emergency, government, barangays, procurement, transparency/finance, documents/audits, infrastructure, and About content as those routes become publishable.

## 9. Experience direction

Target primary navigation as routes become useful:

```text
Services
Government
Barangays
Transparency
About
Search
```

Utility access should eventually include:

```text
Emergency
EN / FIL / ILO
```

Do not publish dead navigation.

The homepage should become a public-information entry point centered on resident jobs and search, not a generic municipal landing page.

Do not lead with:

- mayoral imagery;
- political slogans;
- tourism-first content;
- generic dashboard-card clutter;
- decorative undated metrics;
- gradients or visual effects that weaken information hierarchy.

Brand-specific logo and color decisions remain deferred until the brand phase.

## 10. Remaining Phase 4G roadmap

### 4G.3 — Homepage + Global Search

Next.

Primary goals:

- establish homepage hierarchy around resident tasks;
- implement Pagefind-based static global search;
- define useful result metadata/categories;
- preserve mobile and accessibility behavior;
- surface only routes that contain useful reviewed content;
- prepare entry points for later Services, Emergency, Government, and Transparency phases without publishing fake or dead features.

### 4G.4 — Emergency

Promote reviewed emergency records and build the high-freshness emergency experience.

### 4G.5 — Services

Normalize and publish resident-facing Citizen's Charter services, map official forms, and route online transactions to eLGU or other authoritative destinations.

### 4G.6 — Government + Offices

Publish verified officeholders and municipal office information with source and freshness metadata.

### 4G.7 — Transparency

Build the structured transparency experience for finances, procurement, disclosures/documents, audits, and appropriately attributed infrastructure.

### 4G.8 — About Bauang + Barangays + Statistics

Improve municipal context, barangay discovery, and period-labeled statistics using reviewed sources.

### 4G.9 — Reviewed Filipino / Ilocano coverage

Expose Filipino and Ilocano only after the relevant civic content has been reviewed. Do not use runtime AI translation for published civic claims.

### 4G.10 — Brand + Trust + Accessibility + SEO

Finalize BetterBauang identity, corrections/trust affordances, accessibility review, metadata, sitemap, and search/social presentation.

The identity must not imitate the municipal seal or imply official-government status.

### 4G.11 — Public QA

Run final cross-device, accessibility, route, source, freshness, broken-link, and content review before release consideration.

## 11. Deferred or evidence-gated work

Do not expand scope merely because another BetterLGU project contains a feature.

Currently deferred or evidence-gated:

- comprehensive ordinances/resolutions explorer until a maintainable official corpus exists;
- current CMCI presentation until an actual current Bauang record is acquired and reviewed;
- deep budget analytics;
- contractor or supplier profiles;
- inferred procurement-award-project timelines;
- audit scoring;
- offline PWA;
- resident accounts;
- saved/followed records;
- notifications;
- public API;
- runtime AI question answering.

Source discovery may reopen for a specific domain only when implementation exposes a concrete gap.

## 12. Validation and handoff rule

Before considering an implementation phase complete, run:

```bash
npm run validate:data
npm run lint
npm run build
```

At the time Phase 4G.2 closed, CI passed all three checks.

For a new development session:

1. verify the active branch and current HEAD;
2. read this file;
3. read the relevant architecture/provenance/experience contract;
4. inspect the current implementation before proposing changes;
5. report contradictions or stale documentation;
6. make a small phase-specific plan;
7. wait for approval before implementation unless the user explicitly instructs otherwise.
