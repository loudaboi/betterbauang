# BetterBauang Project State

Status: Active implementation reference  
Last synchronized: 2026-09-18

This file records where BetterBauang is now, the approved V1 information architecture, what evidence is already available, and what still needs implementation or verification.

It does not replace:

- `docs/DATA_PROVENANCE.md` for evidence, source precedence, and freshness;
- `docs/TECHNICAL_ARCHITECTURE.md` for the current implementation architecture;
- `docs/EXPERIENCE_FOUNDATION.md` for shared UX rules;
- `CONTRIBUTING.md` for contribution requirements.

The repository is executable truth. If implementation and this file disagree, inspect the current branch before changing either.

## 1. Git and release boundary

Development branch:

`build/betterbauang-v0`

Stable release branch:

`main`

Do not modify, merge, rebase, reset, force-push, or otherwise move `main` without explicit approval.

Production release is not approved.

At this synchronization point the development branch still contains the previous global Pagefind search implementation. That product direction is superseded by the V1 plan below and should be removed through a normal corrective change, not by rewriting Git history.

## 2. Product rule

BetterBauang is an independent civic information layer for Bauang, La Union.

Core rule:

**No source, no civic claim.**

The product should reduce the effort required to:

- understand and access municipal services;
- find the right government office or contact;
- understand who represents and administers Bauang;
- inspect public finance, procurement, disclosures, audits, and appropriately attributed infrastructure;
- understand verified statistics about Bauang;
- trace material civic information to its authoritative source.

BetterBauang must remain visibly independent from the Municipality of Bauang and must not imitate an official government portal.

## 3. Approved V1 information architecture

### Persistent emergency strip

The topmost site utility is a compact emergency hotline strip using reviewed current contacts.

It is for immediate access, especially on mobile, and should support tap-to-call.

Emergency information does **not** need a standalone page. Full contact context, source, and verification details belong in `Contact`.

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

Language controls live in the main header area, not in a separate product section.

Do not add separate top-level navigation for:

- Search;
- Barangays;
- Procurement;
- About;
- eLGU;
- Emergency.

Those belong in the appropriate product section described below.

### Home

Resident entry point.

Final homepage responsibilities:

- clear BetterBauang purpose;
- `Find a Service` search;
- popular/useful services;
- emergency access;
- quick access to Government, Statistics, Transparency, and Barangays;
- selected Bauang facts with explicit reporting periods;
- trust links such as Sources, Methodology, and Corrections.

The current homepage is development scaffolding and is not the final design target.

### Services

Answers: **What do I need to do?**

```text
/services
/services/:service
```

Expected service experience:

- Find a Service search/filter;
- resident-oriented categories;
- service purpose;
- who may avail;
- requirements;
- where each requirement is secured;
- citizen steps;
- agency actions when useful;
- fees;
- processing time;
- responsible office/personnel where published;
- official downloadable form where available;
- official eLGU or other transaction destination where applicable;
- source and last-verified context.

Search in V1 is primarily **service discovery**, not a separate global-search product.

### Government

Answers: **Who and where is the local government?**

```text
/government
```

Contains:

- current elected officials;
- municipal offices and responsibilities;
- government/contact directory;
- all 39 barangays;
- legislation only if a maintainable official corpus becomes available.

Existing barangay detail routes may remain, but Barangays are conceptually part of Government rather than a primary header destination.

### Statistics

Answers: **What do verified data say about Bauang?**

```text
/statistics
```

Contains period-labeled statistics such as:

- municipality population;
- barangay population;
- PSGC/geographic classifications;
- other demographic or municipal indicators only when supported by competent sources.

Do not create decorative or undated metric dashboards.

### Transparency

Answers: **What is government spending, procuring, building, and publishing?**

```text
/transparency
```

Contains:

- finances and budget context;
- fund utilization where supported;
- procurement;
- Full Disclosure documents;
- audits;
- appropriately attributed infrastructure/projects.

Procurement remains a domain inside Transparency rather than a permanent top-level navigation item.

### Contact

Answers: **Who do I need to reach?**

```text
/contact
```

Contains:

- full emergency contact directory;
- Municipal Hall contact/location information;
- verified municipal office contacts;
- official Municipality channels;
- appropriate official external destinations.

The persistent emergency strip is the fast-access version of this information; Contact is the complete context and verification layer.

### Footer / trust layer

Contains supporting project information rather than primary resident tasks:

- About BetterBauang;
- About Bauang context where useful;
- Sources;
- Methodology;
- Corrections / report an error;
- official Municipality website;
- GitHub / contribution links.

## 4. Feature readiness

Readiness states:

- **READY IN REPO** — reviewed normalized production data already exists.
- **SOURCE ACQUIRED** — authoritative source material has been collected/reviewed, but production normalization or UI work remains.
- **NEEDS VERIFICATION** — source exists, but current facts must be rechecked before publication.
- **NEEDS SOURCE** — required source corpus has not yet been sufficiently acquired.
- **DEFERRED** — not required for V1.

### Home

Status: **PARTIAL IMPLEMENTATION**

Already have:

- shared shell;
- static homepage route;
- municipality/barangay/procurement content to link into;
- provenance/trust components.

Still need:

- remove global-search-first treatment;
- build final resident-first composition after core sections exist;
- add Find a Service once service data is normalized;
- complete final visual-design pass.

### Emergency strip + Contact

Status: **SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- reviewed 2026 Bauang emergency hotline advisory for MDRRMO, Municipal Health, PNP, and BFP;
- older Citizen's Charter emergency contacts retained for conflict/supersession handling;
- municipal website and Charter contact sources.

Still need:

- normalize the current emergency/contact records;
- verify any Municipal Hall and office contacts intended for V1;
- implement tap-to-call emergency strip;
- implement `/contact`;
- expose source and last-verified context on Contact.

No standalone `/emergency` route is required.

### Services

Status: **SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- Municipality Citizen's Charter source family;
- reviewed office-level Charter bundle covering multiple municipal offices;
- BPLO service document with detailed resident-facing processes;
- official Bauang downloadable forms discovered during source closure;
- official Bauang eLGU transaction destination;
- service domain schema and empty normalized boundary.

Still need:

- extract and review resident-facing services into normalized records;
- consolidate duplicates and channel variants;
- categorize services by resident need rather than office structure;
- map forms to verified services;
- map eLGU links only where the Charter/official source supports the transaction;
- build `/services` and service detail pages;
- implement lightweight Find a Service search/filter over normalized service records.

Do not build accounts, payments, applications, or identity workflows already handled by eLGU.

### Government

Status: **SOURCE ACQUIRED / NEEDS CURRENT REVERIFICATION**

Already have:

- PGLU Bauang profile source;
- supporting recent official reporting for current mayor/vice mayor gathered during source closure;
- government schema and empty normalized boundary;
- all 39 barangays already normalized from PSA/PSGC.

Still need:

- reverify current officeholders immediately before publication/release;
- normalize the mayor, vice mayor, and Sangguniang Bayan roster;
- verify municipal office responsibilities and contact details intended for publication;
- implement `/government` and integrate Barangays beneath it.

Do not publish speculative biographies, campaign material, rankings, or unsupported political claims.

### Statistics

Status: **READY IN REPO for core V1 statistics**

Already have:

- municipality identity;
- all 39 barangays;
- PSGC identifiers;
- 2024 POPCEN municipality and barangay population data;
- period/source metadata.

Still need:

- build the `/statistics` experience from existing reviewed data;
- decide whether any additional statistical indicators materially improve V1 before adding new source work.

A statistics page does not require a new backend or dashboard framework.

### Transparency — Finances

Status: **SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- BLGF FY2025 annual fiscal datasets;
- BLGF FY2026 Q1 SRE data;
- FY2025 LDRRMF and SEF data;
- Bauang FDP 2025 and 2026 disclosure packages;
- fiscal domain schema and empty normalized boundary;
- documented source precedence and cumulative-YTD rules.

Still need:

- normalize a small useful set of fiscal observations;
- preserve annual vs quarterly/YTD semantics;
- organize original FDP documents by year/type/period;
- design straightforward tables/summaries before considering charts.

### Transparency — Procurement

Status: **PARTIAL READY IN REPO + NEWER SOURCES ACQUIRED**

Already have:

- normalized historical FY2024 PMR slice;
- FY2025 PMR source material;
- CY2026 first-semester PMR;
- Updated/Supplemental APP source material;
- PhilGEPS source layer;
- procurement schemas and existing pages.

Still need:

- replace prototype/historical emphasis with a clearer procurement structure;
- normalize newer defensible records;
- keep APP planning, PMR execution, PhilGEPS opportunities/awards, and bid-result documents distinct;
- avoid inferred joins unless identifiers/source evidence prove them.

### Transparency — Documents and audits

Status: **SOURCE ACQUIRED / NEEDS NORMALIZATION**

Already have:

- Bauang FDP 2025 and 2026 document inventories;
- explicit handling for officially listed but retrieval-failed documents;
- COA Bauang Compliance Audit Report 2024;
- document schema and empty normalized boundary.

Still need:

- normalize document metadata;
- organize by reporting year/type;
- surface audit reports neutrally;
- link to original official documents where available.

### Transparency — Infrastructure

Status: **CONDITIONAL**

Already have:

- DPWH identified as the competent source family;
- project schema and attribution rule.

Still need:

- acquire/verify a limited useful Bauang project corpus before publishing the section;
- preserve actual implementing agency and source-specific lifecycle status.

Do not label a DPWH/provincial/national project as a Municipality of Bauang project simply because it is located in Bauang.

### Languages

Status: **ARCHITECTURE READY / CONTENT NOT READY**

Already have:

- locale architecture for `en`, `fil`, and `ilo`.

Still need:

- reviewed Filipino and Ilocano UI/content translations after English civic content stabilizes.

Do not publish machine/runtime AI translations as authoritative civic content.

### Visual design and accessibility

Status: **FOUNDATION EXISTS / FINAL PASS NEEDED**

Already have:

- responsive shell;
- skip navigation;
- visible focus baseline;
- provenance component;
- static/mobile architecture.

Still need:

- stronger BetterBauang visual identity;
- refined header and emergency strip;
- service-directory UX;
- better tables/list layouts;
- consistent external-government-link treatment;
- cross-device accessibility review.

The target is a modern public-service product: strong typography, whitespace, restrained civic accent, minimal shadows, minimal decorative cards, no gradients/glow, and no seal imitation.

## 5. Corrected implementation sequence

Build complete resident-facing verticals instead of more empty foundations.

### Step 1 — IA correction and cleanup

- update shared navigation to the approved V1 IA;
- remove Search from primary navigation;
- remove the `/search` global-search product and Pagefind dependency/build step unless a real later requirement justifies it;
- keep existing reviewed pages/data intact;
- do not rewrite Git history.

### Step 2 — Contact + emergency strip

- normalize reviewed emergency contacts;
- verify publishable Municipal Hall/contact information;
- build `/contact`;
- add persistent tap-to-call emergency strip;
- keep languages in the main header.

### Step 3 — Services

- normalize the reviewed Citizen's Charter corpus;
- map forms and eLGU destinations;
- build service directory/detail pages;
- implement Find a Service.

### Step 4 — Government

- reverify current officials;
- normalize officials/offices;
- build Government experience;
- integrate existing Barangays beneath Government.

### Step 5 — Transparency

- normalize useful fiscal observations;
- expand procurement from newer reviewed sources;
- organize FDP/public documents and audits;
- add infrastructure only if its source corpus closes sufficiently.

### Step 6 — Statistics

- build the statistics experience using current PSA/PSGC data;
- add only evidence-supported indicators that materially improve resident understanding.

### Step 7 — Final homepage + visual system

Once the actual core sections exist:

- finalize homepage hierarchy;
- surface useful services and shortcuts;
- refine BetterBauang identity and UI;
- avoid placeholder sections and generic municipal-template design.

### Step 8 — Languages, trust, SEO, accessibility, public QA

- reviewed FIL/ILO coverage;
- corrections/trust affordances;
- metadata/sitemap;
- accessibility and mobile QA;
- source/freshness review;
- broken-link review;
- release review.

## 6. Build discipline

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

A completed civic feature should make verified Bauang information more useful to a resident.

## 7. Architecture boundary

Keep the current static-first architecture unless a demonstrated product requirement proves otherwise:

- React 19;
- React Router Framework Mode;
- TypeScript strict;
- Tailwind CSS;
- Zod;
- static prerendering;
- Cloudflare static deployment.

Do not add a database, auth, CMS, runtime API, runtime AI, queues, or other infrastructure merely because another BetterLGU project uses them.

## 8. Validation

Before completing an implementation step:

```bash
npm run validate:data
npm run lint
npm run build
```

Check CI after pushing.

`main` remains untouched until explicit release approval.
