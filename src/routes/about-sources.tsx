import { useLoaderData } from 'react-router'

import { getSources } from '../lib/civic-data.server.ts'

const authorityLabels = {
  A: 'Primary competent government publisher',
  B: 'Other official government publisher or repository',
  C: 'Reputable secondary source',
  D: 'Discovery-only or community surface',
} as const

const statusLabels = {
  READY: 'Suitable for direct structured use with normal validation',
  CONDITIONAL: 'Requires freshness, version, or document checks',
  DISCOVERY: 'Used to locate stronger evidence',
  GAP: 'Needed source has not yet been obtained',
} as const

export async function loader() {
  return { sources: await getSources() }
}

export default function SourcesRoute() {
  const { sources } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <header>
        <p className="text-sm text-neutral-600">About</p>
        <h1 className="mt-2 text-4xl font-semibold">Sources</h1>
        <p className="mt-4 max-w-2xl text-neutral-700">
          BetterBauang registers the source material used by published civic records. Authority and production status describe how a source may be used; they do not make every field on a page automatically current.
        </p>
      </header>

      <div className="mt-10 border-y border-neutral-200">
        {sources.map((source) => (
          <article className="border-b border-neutral-200 py-6 last:border-b-0" key={source.id}>
            <p className="font-mono text-xs text-neutral-500">{source.id}</p>
            <h2 className="mt-2 text-xl font-semibold">{source.title}</h2>
            <p className="mt-1 text-neutral-700">{source.publisher}</p>

            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-neutral-500">Domains</dt>
                <dd className="mt-1">{source.domains.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Authority</dt>
                <dd className="mt-1">
                  {source.authority} · {authorityLabels[source.authority]}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Production status</dt>
                <dd className="mt-1">
                  {source.status} · {statusLabels[source.status]}
                </dd>
              </div>
              <div>
                <dt className="text-neutral-500">Retrieved</dt>
                <dd className="mt-1">{source.retrievedAt}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-neutral-500">Freshness</dt>
                <dd className="mt-1">{source.freshness ?? 'No freshness note recorded'}</dd>
              </div>
            </dl>

            <a
              className="mt-5 inline-block underline"
              href={source.url}
              rel="noreferrer"
              target="_blank"
            >
              Open original source
            </a>
          </article>
        ))}
      </div>
    </main>
  )
}
