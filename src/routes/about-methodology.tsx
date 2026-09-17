const verificationStatuses = [
  ['Verified', 'Reviewed against the cited source and approved for publication.'],
  ['Partial', 'Only part of the record or source coverage has been verified.'],
  ['Conflicting', 'Relevant sources disagree, so the conflict is preserved rather than silently resolved.'],
  ['Stale', 'The information has passed its expected review window and should not be presented as current.'],
  ['Superseded', 'A newer verified record or source has replaced it for current use.'],
  ['Historical', 'Valid for its stated earlier reporting period, not a claim about the present.'],
  ['Unverified', 'Not approved as verified civic information.'],
] as const

export default function MethodologyRoute() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <header>
        <p className="text-sm text-neutral-600">About</p>
        <h1 className="mt-2 text-4xl font-semibold">Methodology</h1>
        <p className="mt-4 max-w-2xl text-neutral-700">
          BetterBauang follows a simple rule: no source, no civic claim. A polished interface does not replace evidence.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Publication pipeline</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-neutral-700">
          <li>Retrieve an official or otherwise appropriate source.</li>
          <li>Register the source and preserve its metadata.</li>
          <li>Place extracted or candidate records in staging.</li>
          <li>Run schema and domain validation, then human review.</li>
          <li>Promote approved records into normalized production data.</li>
          <li>Render the application from normalized records only.</li>
        </ol>
        <p className="mt-4 text-sm text-neutral-600">
          Staging data is never production data.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Source hierarchy</h2>
        <dl className="mt-4 space-y-3 text-neutral-700">
          <div><dt className="font-medium">A</dt><dd>Primary competent government publisher.</dd></div>
          <div><dt className="font-medium">B</dt><dd>Other official government publisher or repository.</dd></div>
          <div><dt className="font-medium">C</dt><dd>Reputable secondary source.</dd></div>
          <div><dt className="font-medium">D</dt><dd>Discovery-only or community surface.</dd></div>
        </dl>
        <p className="mt-4 text-neutral-700">
          Source precedence is field-specific. An official page is not automatically the most current source for every field it contains.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Verification status</h2>
        <dl className="mt-4 space-y-4">
          {verificationStatuses.map(([label, description]) => (
            <div key={label}>
              <dt className="font-medium">{label}</dt>
              <dd className="mt-1 text-neutral-700">{description}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Current and historical information</h2>
        <p className="mt-3 text-neutral-700">
          Historical is not current. Reporting periods are kept explicit, older records may remain available as historical context, and stale information should not be silently presented as current.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">AI-assisted processing</h2>
        <p className="mt-3 text-neutral-700">
          AI may assist research, extraction, engineering, testing, and data-quality work, but AI output is not civic evidence. Material civic facts still require an underlying source and human-review requirements before publication.
        </p>
      </section>
    </main>
  )
}
