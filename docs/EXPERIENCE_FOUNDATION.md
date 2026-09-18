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
- find government officials, barangay leadership, offices, and contacts where source-ready;
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

## Route and destination discipline

Normalized data does not automatically deserve its own page.

Prefer the smallest route surface that helps a resident complete a task or understand a civic subject.

For V1:

- Barangays belong inside Government. Separate barangay index/detail pages are unnecessary when they only repeat identity, population, or source metadata already available elsewhere.
- A separate barangay profile becomes justified only when there is enough distinct verified resident-useful content, such as additional officials, local services, facilities, or other maintainable records.
- Municipality-level reference statistics belong in Statistics and, selectively, the Home snapshot rather than requiring a permanent standalone `About Bauang` destination.
- Procurement belongs conceptually under Transparency even if implementation URLs remain separate for maintainability.
- Trust routes may remain separate because they support verification rather than primary navigation.

Do not preserve development scaffolding as permanent information architecture without a resident-use justification.

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
- shortcuts to Government, Statistics, Transparency, and Contact;
- a small Bauang snapshot when useful;
- trust/source links.

Barangays are reached through Government rather than promoted as a separate primary Home destination.

### Services

Organize around resident needs rather than office bureaucracy.

Service pages should make requirements, steps, fees, processing time, responsible office, forms, and official transaction destinations clear.

### Government

Organize current elected municipal officials, reviewed general municipal contact information, and all 39 barangays.

The intended V1 barangay presentation supports:

```text
Barangay name
Punong Barangay, when current-source verified
Direct phone number(s), when current-source verified
Leadership/contact source and last-verified context
```

Rules:

- barangay identity may come from PSA/PSGC, but leadership/contact must carry separate current provenance;
- phone numbers should be tap-to-call;
- omit unsupported fields rather than showing `TBA`, guesses, or stale values;
- residents should not need a separate barangay profile page merely to see the name, Punong Barangay, or contact number;
- partial verified coverage is acceptable after a documented current-source pass if competent sources do not support all 39 records.

Government functional hierarchy should be completed during the rebuild across executive leadership, Sangguniang Bayan, municipal contact, barangays, and provenance. That is information architecture and functional QA, not the final visual-design pass.

A complete municipal-office bureaucracy directory is not required for V1. Office-specific information should live in Services or Contact when that better matches the resident task.

### Statistics

Present period-labeled, sourced data without decorative dashboard behavior.

Absorb useful municipality-reference information that otherwise exists only as development scaffolding.

### Transparency

Organize finances, procurement, public documents, audits, and appropriately attributed infrastructure in one understandable section.

### Contact

Provide the complete contact layer:

- emergency contacts;
- Municipal Hall/general municipal contact;
- municipal offices where current contact details are source-ready;
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

BetterBauang should eventually feel like a modern public-service product rather than a generic municipal template.

Approved broad direction:

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

### UI timing rule

The rebuild comes first.

Until Government source closure and functional QA, Transparency, Statistics, and route consolidation are complete, presentation work should be limited to what is needed for readability, responsive behavior, accessibility, and functional QA.

Do not lock a final visual system or redesign individual verticals in isolation during the rebuild.

After the rebuild is complete, stop feature work and run a dedicated UI planning phase before visual implementation. That plan should evaluate the complete product together and define reusable patterns for typography, spacing, hierarchy, navigation, lists/tables, civic-data presentation, provenance, mobile behavior, and the final Home composition.

The broad visual direction above is a constraint for that later plan, not a substitute for it.

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

Accessibility baseline work remains part of each rebuild vertical. Final cross-device accessibility review happens after the visual system is applied.

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
