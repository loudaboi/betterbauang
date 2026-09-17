# BetterBauang Experience Foundation

Status: Approved Phase 4G.2 implementation contract

## Purpose

Phase 4G.2 establishes the shared product experience before feature-specific pages expand.

It does not populate unreviewed civic data and does not introduce runtime infrastructure.

## Product posture

BetterBauang is a public-information layer for Bauang, La Union.

The interface should help residents:

- find a service or official destination;
- reach verified emergency information;
- understand government offices and barangays;
- inspect public finance, procurement, documents, and appropriately attributed projects;
- verify where a material civic claim came from.

The product must remain visibly independent from the Municipality of Bauang.

## Information architecture direction

Target primary navigation as feature routes become ready:

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

Do not publish dead navigation. A destination enters the shared navigation only when the corresponding route has useful, reviewed content.

## Responsive shell

The shared shell must:

- work without client-only navigation logic;
- remain readable on narrow mobile widths;
- keep the independent/unofficial identity visible;
- provide keyboard-accessible navigation;
- include a skip-to-content path;
- avoid decorative dashboard chrome and unnecessary cards;
- use restrained separators, typography, and whitespace rather than heavy borders or effects.

Brand-specific color and logo decisions remain deferred until the brand phase.

## Page hierarchy

Prefer:

1. resident task or page subject;
2. current information;
3. period/context;
4. source and verification cues;
5. historical or supporting detail.

Do not lead with political imagery, tourism content, decorative statistics, or municipal slogans.

## Provenance presentation

Material civic pages should use a shared source-and-verification pattern that can expose:

- publisher;
- source title;
- reporting period when applicable;
- verification status;
- last verified date;
- source freshness note when useful;
- link to the original official source.

Source metadata should be easy to reach without overwhelming the primary task.

## Freshness presentation

Use plain-language states rather than internal-only vocabulary where possible:

- `verified` → Verified
- `partial` → Partially verified
- `conflicting` → Conflicting official sources
- `stale` → Verification overdue
- `superseded` → Superseded
- `historical` → Historical
- `unverified` → Unverified

Historical records must look historical. Stale action-oriented information must not continue to look current.

## Localization foundation

Canonical editorial and source interpretation language remains English.

Supported locale architecture:

```text
en
fil
ilo
```

Only English is publicly exposed until Filipino and Ilocano content has been reviewed for the relevant civic domain.

Do not use runtime AI translation for published civic claims.

## Search

Pagefind remains the approved global static-search foundation.

Search is for page/document discovery. Domain-specific filtering, such as procurement filters, remains part of the relevant domain experience rather than being forced into global search.

## Accessibility

Baseline requirements:

- semantic landmarks and headings;
- visible keyboard focus;
- keyboard-operable navigation;
- sufficient text contrast;
- meaningful link text;
- mobile tap targets that do not require precision;
- no essential information conveyed only by color;
- source and verification information readable by assistive technology.

## Architecture boundary

Phase 4G.2 does not add:

- database;
- authentication;
- CMS;
- runtime API server;
- Meilisearch;
- analytics;
- notifications;
- runtime AI.

The approved path remains:

```text
official source
→ source registration
→ staging
→ schema/domain validation
→ human review
→ normalized production data
→ prerendered application
```
