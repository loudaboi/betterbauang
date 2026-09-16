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

## Source precedence

Source precedence is field-specific.

Examples:

- PSA is canonical for PSGC identity, barangay composition, and published population data.
- Official government transactional systems remain authoritative for the transactions they provide.
- Procurement records should point to PhilGEPS, municipal procurement records, or the competent original government publisher.

Do not assume every field on an official page is equally current.

## External material

Government documents, images, third-party content, and externally published records retain their applicable source rights and conditions. The repository software license does not automatically relicense external source material.
