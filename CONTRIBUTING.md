# Contributing to BetterBauang

BetterBauang is an independent, open-source civic information project for Bauang, La Union.

## Before contributing

- Keep changes focused and reviewable.
- Do not invent, infer, or guess civic facts.
- Material civic data must be traceable to an authoritative source.
- Do not place unreviewed data directly in production data.
- Do not copy LGU-specific production data from another BetterLGU project.
- Do not broaden product scope without a documented reason.

## Civic data workflow

Use the project data boundary:

```text
source
→ staging
→ validation
→ human review
→ normalized
```

Only `data/normalized` is intended for production civic records.

See `docs/DATA_PROVENANCE.md` before changing civic data.

## Development

Run the available project checks before submitting changes:

```bash
npm run lint
npm run validate:data
npm run build
```

Test commands will be added when the first domain behavior requires them.

## AI-assisted work

AI tools may assist research, engineering, testing, documentation, and data extraction.

AI output is not civic evidence. Substantially AI-assisted contributions should be disclosed in the pull request when relevant.

## Conduct

Participation is subject to `CODE_OF_CONDUCT.md`.
