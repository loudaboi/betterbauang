# BetterBauang Experience Foundation

Status: Approved V1 experience direction  
Last synchronized: 2026-09-18

## Purpose

This document defines the shared resident-facing product experience for BetterBauang.

It does not replace source/provenance rules and does not justify publishing unreviewed civic data.

## Product posture

BetterBauang is an independent public-information layer for Bauang, La Union.

The interface should help residents:

- understand and access municipal services;
- find government offices, officials, barangays, and contacts;
- inspect statistics and transparency information;
- reach emergency contacts quickly;
- verify where material civic information came from.

The product must remain visibly independent from the Municipality of Bauang.

## Approved V1 header

### Emergency strip

The topmost utility is a compact emergency hotline strip.

It should:

- use only reviewed current emergency contacts;
- support tap-to-call on mobile;
- remain readable without overwhelming the page;
- link residents to fuller contact context where useful.

Emergency information does not require a standalone page. Full details, sources, and verification context belong in `Contact`.

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

Language controls belong in the main header area.

Do not add separate primary navigation for:

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

Legislative should become a primary destination only if a maintainable official legislation corpus later justifies it. Otherwise relevant laws/ordinances belong under Government.

## Service discovery

V1 search is primarily **Find a Service**.

It should help residents locate services using normal terms such as:

- birth certificate;
- business permit;
- cedula;
- working permit;
- social assistance;
- building permit.

Find a Service belongs prominently on Home and Services.

Do not create a separate global-search-first product unless a future demonstrated need justifies it.

## Page hierarchy

Prefer:

1. resident task or page subject;
2. current useful information;
3. action or destination;
4. period/context;
5. source and verification cues;
6. supporting or historical detail.

Do not lead with:

- political imagery;
- municipal slogans;
- tourism-first content;
- decorative undated statistics;
- generic dashboard-card grids.

## Section responsibilities

### Home

Help a resident orient quickly.

Use:

- Find a Service;
- popular/useful services;
- emergency access;
- shortcuts to Government, Statistics, Transparency, Contact, and Barangays;
- a small Bauang snapshot when useful;
- trust/source links.

### Services

Organize around resident needs rather than office bureaucracy.

Service pages should make requirements, steps, fees, processing time, responsible office, forms, and official transaction destinations clear.

### Government

Organize officials, municipal offices, government directory information, and Barangays.

### Statistics

Present period-labeled, sourced data without decorative dashboard behavior.

### Transparency

Organize finances, procurement, public documents, audits, and appropriately attributed infrastructure in one understandable section.

### Contact

Provide the complete contact layer:

- emergency contacts;
- Municipal Hall;
- municipal offices;
- official government channels and destinations.

## Provenance presentation

Material civic pages should use a shared source-and-verification pattern that can expose:

- publisher;
- source title;
- reporting period when applicable;
- verification status;
- last verified date;
- source freshness note when useful;
- original official source link.

Source metadata should remain accessible without dominating the resident's primary task.

## Freshness presentation

Use plain-language states where possible:

- `verified` → Verified
- `partial` → Partially verified
- `conflicting` → Conflicting official sources
- `stale` → Verification overdue
- `superseded` → Superseded
- `historical` → Historical
- `unverified` → Unverified

Historical records must look historical. Stale action-oriented information must not continue to look current.

## Localization

Canonical source interpretation remains English.

Supported locale architecture:

```text
en
fil
ilo
```

Only reviewed language content should be publicly exposed.

Do not use runtime AI translation for published civic claims.

## Responsive shell

The shared shell must:

- remain readable on narrow mobile widths;
- keep the independent/unofficial identity visible;
- provide keyboard-accessible navigation;
- include skip-to-content;
- provide usable tap targets;
- keep emergency access practical on mobile;
- avoid unnecessary cards, shadows, and visual chrome.

## Visual direction

BetterBauang should feel like a modern public-service product rather than a generic municipal template.

Prefer:

- strong typography;
- generous but disciplined whitespace;
- one restrained civic accent;
- clear lists and tables;
- subtle separators;
- consistent external-government-link treatment;
- minimal shadows;
- minimal decorative cards;
- excellent mobile layouts.

Avoid:

- gradients and glow;
- seal imitation;
- visual clutter such as unrelated currency/weather tickers;
- oversized political imagery;
- decorative complexity that competes with civic information.

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

The approved experience does not require:

- database;
- authentication;
- CMS;
- runtime API server;
- analytics;
- notifications;
- runtime AI.

The civic-data path remains:

```text
official source
→ source registration
→ staging when needed
→ schema/domain validation
→ human review
→ normalized production data
→ prerendered application
```
