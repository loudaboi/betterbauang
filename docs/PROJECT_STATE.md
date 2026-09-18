# BetterBauang Project State

Status: Active implementation reference  
Last synchronized: 2026-09-18

This file records the current V1 direction, feature readiness, and next implementation step.

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
- find the right government office or contact;
- understand officials, offices, and barangays;
- inspect public finance, procurement, disclosures, audits, and properly attributed infrastructure;
- understand verified statistics about Bauang;
- trace material civic information to authoritative sources.

## 3. Approved V1 information architecture

### Persistent top strip

A compact emergency hotline strip sits above the main header.

Use only reviewed current emergency contacts. Support tap-to-call on mobile.

Emergency does **not** need a standalone page. Full contact context, sources, and verification belong in `Contact`.

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

Do not add separate top-level navigation for:

- Search;
- Barangays;
- Procurement;
- About;
- eLGU;
- Emergency.

Relationship to primary sections:

```text
Barangays   → Government
Procurement → Transparency
Emergency   → persistent strip + Contact
eLGU        → relevant service pages
About/Trust → footer/supporting links
Search      → Find a Service inside Home/Services
```

Legislative becomes a primary destination only if a maintainable official corpus later justifies it.

## 4. V1 section responsibilities

### Home

Resident entry point.

Final responsibilities:

- clear BetterBauang purpose;
- Find a Service;
- popular/useful services;
- emergency access;
- quick links to Government, Statistics, Transparency, Contact, and Barangays;
- a small period-labeled Bauang snapshot;
- Sources, Methodology, and Corrections.

The current homepage is development scaffolding, not the final design target.

### Services

Answers: **What do I need to do?**

Expected routes:

```text
/services
/services/:service
```

Service pages should expose only reviewed information such as:

- purpose;
- who may avail;
- requirements;
- where requirements are secured;
- citizen steps;
- agency actions where useful;
- fees;
- processing time;
- responsible office/personnel where published;
- official forms;
- official eLGU or other transaction destination when applicable;
- source and last-verified context.

V1 search is primarily **Find a Service**, implemented over normalized service records.

### Government

Answers: **Who and where is the local government?**

Contains:

- current elected officials;
- municipal offices and responsibilities;
- government/contact directory;
- all 39 barangays;
- legislation only if source-ready.

### Statistics

Answers: **What do verified data say about Bauang?**

Contains period-labeled statistics such as municipality population, barangay population, PSGC/geographic classifications, and only other indicators supported by competent sources.

### Transparency

Answers: **What is government spending, procuring, building, and publishing?**

Contains:

- finances and budget context;
- fund utilization where supported;
- procurement;
- Full Disclosure documents;
- audits;
- appropriately attributed infrastructure/projects.

### Contact

Answers: **Who do I need to reach?**

Contains:

- full emergency contact directory;
- Municipal Hall contact/location information;
- verified municipal office contacts;
- official Municipality channels;
- appropriate official external destinations.

### Footer / trust layer

Contains supporting project information:

- About BetterBauang;
- Sources;
- Methodology;
- Corrections / report an error;
- official Municipality website;
- GitHub / contribution links.

## 5. Current implementation state

### Cleanup

Status: **COMPLETE**

Completed:

- superseded public `/search` route removed;
- Pagefind implementation and dependency removed;
- Pagefind-specific page metadata removed;
- header reduced to currently live navigation while preserving the approved final IA in documentation;
- current homepage kept as transition scaffolding;
- existing reviewed municipality, barangay, procurement, provenance, and trust work preserved;
- static-first architecture preserved.

Do not reintroduce site-wide global search unless a later demonstrated need justifies it.

### Contact + emergency strip

Status: **NEXT — SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- reviewed 2026 Bauang emergency hotline advisory for MDRRMO, Municipal Health, PNP, and BFP;
- older Citizen's Charter emergency contacts retained for conflict/supersession handling;
- municipal website and Charter contact sources;
- emergency domain schema and empty normalized collection.

Still need:

- normalize the current emergency records;
- verify Municipal Hall and any office contacts intended for V1;
- build `/contact`;
- add the persistent tap-to-call emergency strip;
- expose source and last-verified context on Contact;
- keep EN / FIL / ILO controls in the main header area.

No `/emergency` page.

### Services

Status: **SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- Municipality Citizen's Charter source family;
- reviewed office-level Charter bundle;
- BPLO service PDF;
- official downloadable forms identified during source closure;
- official Bauang eLGU transaction destination;
- service schema and empty normalized collection.

Still need:

- normalize resident-facing services;
- consolidate duplicates/channel variants;
- organize by resident need;
- map forms and verified eLGU destinations;
- build `/services` and service detail pages;
- implement lightweight Find a Service.

### Government

Status: **SOURCE ACQUIRED / NEEDS CURRENT REVERIFICATION**

Already have:

- PGLU Bauang profile source;
- supporting official reporting gathered during source closure;
- government schema and empty normalized collection;
- all 39 barangays already normalized from PSA/PSGC.

Still need:

- reverify current officeholders before publication;
- normalize mayor, vice mayor, and Sangguniang Bayan roster;
- verify office responsibilities/contact details;
- build Government and integrate Barangays beneath it.

### Statistics

Status: **CORE DATA READY IN REPO**

Already have:

- municipality identity;
- all 39 barangays;
- PSGC identifiers;
- 2024 POPCEN municipality and barangay populations;
- period/source metadata.

Still need:

- build `/statistics` from existing reviewed data;
- add new indicators only if they materially improve V1.

### Transparency — Finances

Status: **SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- BLGF FY2025 annual fiscal datasets;
- BLGF FY2026 Q1 SRE data;
- FY2025 LDRRMF and SEF data;
- Bauang FDP 2025 and 2026 packages;
- finance schema and source-precedence rules.

Still need:

- normalize a small useful fiscal set;
- preserve annual vs quarterly/YTD semantics;
- organize original disclosure documents;
- prefer straightforward tables/summaries before charts.

### Transparency — Procurement

Status: **PARTIAL READY IN REPO + NEWER SOURCES ACQUIRED**

Already have:

- normalized historical FY2024 PMR slice;
- FY2025 PMR;
- CY2026 first-semester PMR;
- Updated/Supplemental APP material;
- PhilGEPS source layer;
- procurement schemas and existing pages.

Still need:

- normalize newer defensible records;
- keep APP planning, PMR execution, PhilGEPS opportunities/awards, and bid-result records distinct;
- avoid inferred joins without source evidence;
- integrate Procurement under Transparency.

### Transparency — Documents and audits

Status: **SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- Bauang FDP 2025 and 2026 inventories;
- retrieval-failure handling;
- COA Bauang Compliance Audit Report 2024;
- document schema.

Still need:

- normalize document metadata;
- organize by year/type;
- surface audits neutrally;
- link original official documents where available.

### Transparency — Infrastructure

Status: **CONDITIONAL**

Already have:

- DPWH source family and attribution rule;
- project schema.

Still need:

- acquire/verify a limited useful Bauang project corpus before publishing;
- preserve actual implementing agency and source lifecycle status.

### Languages

Status: **ARCHITECTURE READY / CONTENT NOT READY**

Already have locale architecture for `en`, `fil`, and `ilo`.

Publish Filipino and Ilocano only after reviewed civic content is ready. Do not use runtime AI translation as authoritative civic content.

### Visual design and accessibility

Status: **FOUNDATION EXISTS / FINAL PASS NEEDED**

Already have responsive shell, skip navigation, focus baseline, provenance component, and static/mobile architecture.

Still need a stronger BetterBauang visual system, refined header/emergency strip, excellent service UX, better tables/lists, consistent official-link treatment, and cross-device accessibility review.

Target: modern public-service product; strong typography, disciplined whitespace, restrained civic accent, minimal shadows/cards, no gradients/glow, no seal imitation.

## 6. Source material worked during source closure

The research session used these raw files as evidence inputs:

- `BPLO-FINAL.pdf`
- `Bauang Citizen's Charter.zip`
- `Bauang PMR.zip`
- `Bauang FDP 2025.zip`
- `Bauang FDP 2026.zip`
- `BLGF.zip`

These raw research files are **not production data merely because they were reviewed**.

If a future session cannot access one of these files, it must not reconstruct facts from memory or guess. Use the source registry/repo records where sufficient, or ask for the relevant raw file to be reattached before extracting new production records.

## 7. Implementation sequence

Build complete resident-facing verticals instead of more empty foundations.

```text
1. IA/search cleanup                    COMPLETE
2. Contact + emergency strip            NEXT
3. Services
4. Government
5. Transparency
6. Statistics
7. Final homepage + visual system
8. Languages + trust + SEO + accessibility + public QA
```

For each civic vertical:

```text
official source
→ source registration
→ extraction/staging when needed
→ schema/domain validation
→ human review
→ normalized production data
→ resident-facing page
→ navigation/home integration
→ mobile/accessibility/source QA
```

Do not call a feature complete because only a schema, empty JSON file, or planning document exists.

## 8. Architecture boundary

Keep the current static-first architecture:

- React 19;
- React Router Framework Mode;
- TypeScript strict;
- Tailwind CSS;
- Zod;
- static prerendering;
- Cloudflare static deployment.

Do not add a database, auth, CMS, runtime API, global search service, runtime AI, queues, or similar infrastructure without a demonstrated requirement and explicit approval.

## 9. Validation and handoff

Before completing an implementation step:

```bash
npm run validate:data
npm run lint
npm run build
```

Check CI after pushing.

A new session should:

1. verify `build/betterbauang-v0` and current HEAD;
2. confirm `main` is untouched;
3. read `PROJECT_STATE.md`, `DATA_PROVENANCE.md`, `TECHNICAL_ARCHITECTURE.md`, and `EXPERIENCE_FOUNDATION.md`;
4. inspect the current implementation before editing;
5. execute only the current `NEXT` vertical unless explicitly approved to do more.
