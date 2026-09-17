# BetterBauang Data Provenance

## Principle

No source, no civic claim.

Published civic information must be traceable to evidence and must remain distinguishable from unreviewed extraction or research material.

## Data boundary

```text
data/
├── sources/
├── staging/
└── normalized/
```

### sources

Contains source registrations and metadata describing authoritative material used by BetterBauang.

### staging

Contains candidate, extracted, incomplete, or unreviewed records.

Staging data is never production data.

### normalized

Contains reviewed civic records that may be consumed by the production application.

Promotion into normalized data must be visible and reviewable in Git.

Phase 4G establishes normalized boundaries for:

- municipality and barangays;
- procurement;
- services;
- government officials and offices;
- emergency contacts;
- financial observations;
- civic documents, including forms, disclosures, and audits;
- public projects.

An empty normalized collection means the domain contract exists but no record has yet passed publication review. It is not permission to render placeholder civic facts.

## Required source metadata

At minimum, a registered source should identify:

- stable source ID;
- publisher or agency;
- title;
- original URL or document;
- source domain or subject;
- authority classification;
- retrieval date;
- verification notes when applicable.

## Publication rules

- Missing values remain unknown.
- Historical information must not be presented as current.
- Reporting periods must be explicit where applicable.
- Time-sensitive facts require freshness metadata.
- Conflicting official sources must be recorded rather than silently reconciled.
- A technically valid record may still be rejected during human review.
- AI-assisted extraction may enter staging, but AI output is never treated as evidence by itself.
- Procurement lifecycle states must not be collapsed into a generic status when the source distinguishes them.
- Procurement completion must not be treated as proof that an underlying infrastructure project has completed its full physical lifecycle.
- National or provincial projects located in Bauang must retain the actual implementing-agency attribution.

## Field-level source precedence

Source precedence is field-specific. No single source family is authoritative for every Bauang field.

### Geography and population

Use PSA / PSGC for:

- municipality identifiers;
- barangay composition;
- urban/rural classification where published;
- current published population values and their census/reference period.

### Services

Use the Municipality of Bauang Citizen's Charter for reviewed service requirements, steps, fees, processing times, and responsible offices.

Use DICT / Bauang eLGU as the authoritative transaction destination where an official online transaction already exists. BetterBauang explains and routes; it does not recreate government accounts, applications, or payments.

### Government and offices

Use current competent LGU/PGLU records for officeholders and office information. Reverify current officeholders before release and after known change events.

### Emergency

Prefer the newest dedicated official emergency advisory or competent emergency agency publication over older generic footer/contact information. Conflicting older contacts remain internally traceable as superseded rather than being merged into the current list.

### Fiscal data

Use BLGF SRE and related LGU fiscal datasets for standardized fiscal observations such as actual receipts and expenditures.

Use Bauang/DILG Full Disclosure records for the original disclosure documents and their stated reporting periods.

Quarterly SRE observations must preserve their source semantics. Where BLGF identifies quarterly SRE as cumulative year-to-date, BetterBauang must switch between reporting snapshots rather than add quarters together.

Approved/planned appropriations must come from the applicable budget document rather than being inferred from actual receipts/expenditures.

### Procurement

Keep procurement source roles distinct:

```text
APP / Updated APP / Supplemental APP
→ procurement planning

PMR
→ procurement monitoring / execution snapshot

PhilGEPS
→ published opportunities and award records

FDP Bid Results / BAC records
→ period-specific results and documentary evidence
```

Only join records when identifiers and source evidence make the relationship defensible.

### Infrastructure

Use the competent implementing agency, such as DPWH, for national infrastructure records. Location in Bauang does not make a project a Municipality of Bauang project.

### Audits

Use Commission on Audit records as the primary audit source. Surface original records and carefully reviewed factual summaries; do not create unsupported audit scores or misconduct claims.

## Freshness classes

### Class A — highly time-sensitive

Examples:

- emergency contacts;
- service routes and fees;
- current officeholders.

Behavior:

- verify at launch;
- review on known change events;
- show last verified;
- remove or warn on action-oriented information when verification becomes overdue.

### Class B — periodic administrative data

Examples:

- procurement;
- Full Disclosure records;
- financial observations;
- project lifecycle status.

Behavior:

- align review with the publisher's reporting cadence;
- retain the reporting/as-of period;
- warn when an expected publication window passes without a new record.

### Class C — statistical releases

Examples:

- census/population;
- future CMCI observations.

Behavior:

- update when the competent agency releases a new reference period;
- preserve older releases as historical.

### Class D — stable identity/geography

Examples:

- PSGC code;
- barangay composition.

Behavior:

- monitor competent-agency changes;
- verify periodically rather than continuously.

## Source failure and document availability

If an official URL or document endpoint fails:

- preserve its source metadata;
- preserve the official listing and stated period where verified;
- record retrieval failure explicitly;
- look for a moved/current copy from the same competent agency;
- do not silently replace it with an unrelated third-party copy.

A document may therefore be recorded as `officially-listed-retrieval-failed` without implying any reason for the failure.

## External material

Government documents, images, third-party content, and externally published records retain their applicable source rights and conditions. The repository software license does not automatically relicense external source material.
