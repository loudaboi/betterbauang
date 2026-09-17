# BetterBauang

BetterBauang is an independent, open-source civic information and transparency project for the Municipality of Bauang, La Union.

Its purpose is to make public local-government information easier to find, understand, verify, and use.

> BetterBauang is an independent community civic-tech project and is not an official website of the Municipality of Bauang.

## Status

Phase 4 product implementation is in progress.

The current application consumes validated normalized civic data and prerenders its public civic routes as static HTML. Production deployment has not yet been released.

## What BetterBauang is for

The project is being built to help people more easily:

* find official local-government services and destinations;
* understand municipal and barangay information;
* access verified government information;
* inspect public procurement records;
* trace important civic information back to its original source.

BetterBauang does not replace official government transaction systems. Where an official service already exists, the project should explain it clearly and direct users to the official destination.

## Principles

* No source, no civic claim.
* Official sources remain authoritative.
* Civic information should be traceable to evidence.
* Current and historical information must be clearly distinguished.
* Missing information must not be guessed.
* BetterBauang is nonpartisan and independent.
* Accessibility and maintainability are product requirements.

## Development

Current technical baseline:

* React 19
* React Router 8 Framework Mode
* Vite 8
* TypeScript strict mode
* Tailwind CSS 4
* Zod 4
* Oxlint
* npm with a committed lockfile
* static prerendering

Node.js is pinned in `.node-version`.

Install dependencies and run the current project checks with:

```bash
npm ci
npm run validate:data
npm run lint
npm run build
```

The public static build output is `build/client`.

BetterBauang does not currently require a runtime database, API server, authentication system, CMS, or application server. The deployment target is Cloudflare Workers Static Assets.

## BetterLGU

BetterBauang participates in the BetterLGU civic-tech ecosystem while remaining independently maintained.

BetterLGU participation does not make BetterBauang an official government portal.

## Contributing

See `CONTRIBUTING.md` for contribution and civic-data requirements.

## License

MIT License. See `LICENSE`.
