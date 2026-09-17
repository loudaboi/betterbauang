import { Link } from 'react-router'

export default function AboutRoute() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <header>
        <p className="text-sm text-neutral-600">About</p>
        <h1 className="mt-2 text-4xl font-semibold">BetterBauang</h1>
        <p className="mt-4 max-w-2xl text-neutral-700">
          BetterBauang is an independent, open-source civic information and transparency project for Bauang, La Union. Its purpose is to make public information about Bauang easier to find, understand, verify, and use.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Independent and unofficial</h2>
        <p className="mt-3 text-neutral-700">
          BetterBauang is an independent community civic-tech project and is not an official website of the Municipality of Bauang. Official government systems and original source documents remain authoritative.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Corrections</h2>
        <p className="mt-3 text-neutral-700">
          If you find a material error, report it so the underlying source can be checked. Confirmed inaccuracies should be corrected promptly while legitimate historical versions are preserved.
        </p>
        <a
          className="mt-3 inline-block underline"
          href="https://github.com/loudaboi/betterbauang/issues"
          rel="noreferrer"
          target="_blank"
        >
          Report an issue on GitHub
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Contributing</h2>
        <p className="mt-3 text-neutral-700">
          BetterBauang is open source. Contributions should keep civic claims traceable to authoritative evidence and follow the project&apos;s review and data-provenance rules.
        </p>
        <a
          className="mt-3 inline-block underline"
          href="https://github.com/loudaboi/betterbauang/blob/main/CONTRIBUTING.md"
          rel="noreferrer"
          target="_blank"
        >
          Read the contribution guide
        </a>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">AI-assisted development</h2>
        <p className="mt-3 text-neutral-700">
          BetterBauang uses AI-assisted development and data-processing tools. Published civic information is governed by source-verification and human-review requirements.
        </p>
      </section>

      <nav className="mt-12 flex flex-wrap gap-6 border-t border-neutral-200 pt-6" aria-label="About BetterBauang">
        <Link className="underline" to="/about/sources">
          Sources
        </Link>
        <Link className="underline" to="/about/methodology">
          Methodology
        </Link>
      </nav>
    </main>
  )
}
