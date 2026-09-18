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
- understand current officials and barangay leadership where source-ready;
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

### Route consolidation rule

The final public route surface should match the information architecture rather than preserve scaffolding for its own sake.

Approved V1 cleanup decisions:

- Barangay data remains a first-class normalized dataset, but separate `/barangays` and `/barangays/:slug` presentation is not required when the pages do not provide distinct resident value. Barangays should be presented directly inside Government.
- The current `/bauang` reference page is development scaffolding. Its useful municipality statistics belong in Statistics and, selectively, the final Home snapshot. Retire the standalone route when that information has been absorbed.
- Procurement remains a Transparency responsibility. Existing procurement routes may remain as implementation URLs if useful, but Procurement must not behave as a separate primary product section.
- About, Sources, and Methodology remain supporting trust routes and footer destinations.

Do not create route depth merely because normalized records exist.

## 4. V1 section responsibilities

### Home

Resident entry point.

Final responsibilities:

- clear BetterBauang purpose;
- Find a Service;
- popular/useful services;
- emergency access;
- quick links to Government, Statistics, Transparency, and Contact;
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

Answers: **Who represents Bauang locally and how do residents reach the local government?**

V1 contains:

- current elected municipal officials;
- reviewed general municipal contact information;
- all 39 barangays;
- current Punong Barangay and direct contact information only where a competent current source supports it;
- legislation only if source-ready.

A comprehensive municipal-office bureaucracy directory is **not** a V1 completion requirement. Office-specific information should appear in Services or Contact when that is more useful to residents and when the source supports it.

Separate barangay profile pages are not a V1 requirement. They should exist only if they contain enough distinct, verified resident-useful information to justify another destination.

### Statistics

Answers: **What do verified data say about Bauang?**

Contains period-labeled statistics such as municipality population, barangay population, PSGC/geographic classifications, and only other indicators supported by competent sources.

Statistics should absorb the useful reference information currently exposed by the development-only `/bauang` page before that route is retired.

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
- Municipal Hall/general municipal contact information;
- verified municipal office contacts when source-ready;
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

Status: **COMPLETE**

Completed:

- current Bauang MDRRMO, MHO, PNP Bauang MPS, and BFP emergency contacts normalized from the Municipality's August 16, 2026 emergency advisory;
- Unified 911 normalized separately from current official DILG guidance;
- older non-current emergency numbers are not presented as current;
- verified general municipal trunk line, mobile number, and email normalized from the official Bauang eLGU contact surface;
- `/contact` built and statically prerendered with tap-to-call links, source links, and last-verified context;
- persistent emergency strip added above the main header using normalized reviewed data;
- official Municipality website and eLGU destinations exposed as external government links;
- no `/emergency` route added.

### Services

Status: **COMPLETE**

Completed:

- eleven source-ready service records normalized from the reviewed BPLO Citizen's Charter PDF and official Bauang eLGU service surface;
- duplicate new-business channel variants and duplicate Mayor's Clearance entries consolidated into resident-facing records;
- requirements, where-to-secure information, citizen steps, published fees, processing times, and provider offices surfaced only where the reviewed source supports them;
- source-limited eLGU records for Local Civil Registry copy requests and Community Tax Certificate / Cedula intentionally omit unverified requirements, fees, and processing times;
- official eLGU routing exposed for supported online transactions without recreating accounts, applications, or payments;
- official Municipality-hosted Business Permit Application Form normalized and linked to new and renewal business services;
- `/services` and `/services/:service` built and statically prerendered from normalized service records;
- lightweight Find a Service implemented over normalized service data only;
- Services added to live navigation;
- no site-wide global search or Pagefind reintroduced;
- the current directory is intentionally limited to source-ready records and is not presented as a complete inventory of every municipal transaction.

### Government

Status: **COMPLETE**

Completed:

- current mayor, vice mayor, and ten-member Sangguniang Bayan roster reverified against the Provincial Government of La Union Bauang profile on 2026-09-18;
- recent 2026 official PGLU/LGU-Bauang reporting used as a corroborating freshness check for the current municipal leadership;
- term dates intentionally remain unknown because the reviewed roster source does not state them;
- council members retain the source's generic `Sangguniang Bayan Member` role label rather than inferred committee, federation, or ex-officio roles;
- existing verified Municipality of Bauang general contact integrated without inventing unverified office responsibilities or direct official contact details;
- `/government` built and statically prerendered;
- redundant public `/barangays` and `/barangays/:slug` routes and prerenders removed;
- all 39 PSA-backed barangay records preserved as normalized production data for Government and Statistics;
- all 39 barangay names presented directly within `/government` rather than through low-value profile pages;
- freshness research reviewed available barangay-leadership/contact material, but a complete current competent-source corpus for all 39 Punong Barangays and direct contact numbers was not available through the reviewed public sources;
- a complete 2024 barangay leadership/contact roster encountered during research was not promoted as current September 2026 civic data;
- current Punong Barangay/contact fields therefore remain omitted unless a competent current source passes freshness review;
- Government added to live navigation;
- political imagery, endorsements, rankings, and unsupported descriptive claims are not part of the Government section.

Current barangay leadership/contact acquisition remains a source improvement, not a blocker for the V1 Government information architecture. Do not fill missing current names or phone numbers from stale or third-party directories.

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
- absorb useful municipality reference information currently exposed by `/bauang`;
- retire `/bauang` after that information is safely integrated;
- add new indicators only if they materially improve V1.

### Transparency: Finances

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

### Transparency: Procurement

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

Existing procurement URLs do not make Procurement a primary navigation section.

### Transparency: Documents and audits

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

### Transparency: Infrastructure

Status: **CONDITIONAL**

Already have:

- DPWH source family and attribution rule;
- project schema.

Still need:

- acquire/verify a limited useful Bauang project corpus before publishing;
- preserve actual implementing agency and source lifecycle status.

Infrastructure is optional for V1 if a defensible useful corpus is not source-ready. Do not block the rebuild waiting for completeness.

### Languages

Status: **ARCHITECTURE READY / CONTENT NOT READY**

Already have locale architecture for `en`, `fil`, and `ilo`.

Publish Filipino and Ilocano only after reviewed civic content is ready. Do not use runtime AI translation as authoritative civic content.

### Visual design and accessibility

Status: **FUNCTIONAL FOUNDATION ONLY / FINAL UI DEFERRED**

Current implementation may use enough styling to remain readable, responsive, keyboard-usable, and testable while the information architecture and civic verticals are rebuilt.

Do **not** lock the final BetterBauang visual system, redesign individual verticals, or treat temporary presentation as final before the rebuild is complete.

After Government finalization, Transparency, Statistics, and route consolidation are complete, stop feature work and conduct a dedicated UI planning phase before implementation.

That UI planning phase must evaluate the complete resident-facing product together, including:

- typography and type scale;
- spacing and grid;
- page/section hierarchy;
- header and emergency strip treatment;
- service discovery and service-detail patterns;
- Government roster and barangay presentation;
- Transparency tables, document lists, finance summaries, and procurement patterns;
- Statistics presentation;
- provenance/source treatment;
- buttons, links, interaction states, and official external-link treatment;
- mobile navigation and responsive behavior;
- final homepage composition;
- accessibility across the complete system.

Approved broad direction remains: modern public-service product, strong typography, disciplined whitespace, restrained civic accent, clear lists/tables, minimal shadows/cards, no gradients/glow, no seal imitation.

Those are constraints for the later design plan, not permission to start the final visual implementation early.

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

Finish the rebuild before final UI design.

```text
1. IA/search cleanup                         COMPLETE
2. Contact + emergency strip                 COMPLETE
3. Services                                  COMPLETE
4. Government core                           COMPLETE
5. Government finalization                   COMPLETE
6. Transparency                              NEXT
7. Statistics + retire absorbed /bauang route
8. Rebuild closure + route/link/data QA
9. UI planning gate                          REQUIRES EXPLICIT APPROVAL
10. Final homepage + visual system
11. Languages + trust + SEO + accessibility + public QA
```

### Rebuild phase rule

Until step 8 is complete:

- prioritize source closure, normalized data, information architecture, route consolidation, resident task completeness, responsive functionality, and accessibility baseline;
- use neutral functional presentation where needed;
- do not spend implementation cycles polishing a final visual identity that may be invalidated by remaining content structures.

### UI planning gate

At step 9, **stop before coding the final UI**.

The complete product should be reviewed as one system. Produce and approve a deliberate UI plan before changing the visual system or final homepage. The plan should identify the design direction, reusable patterns, page hierarchy, responsive behavior, and rollout order.

Do not silently transition from rebuild work into final visual design.

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
5. execute only the current `NEXT` step unless explicitly approved to do more.
