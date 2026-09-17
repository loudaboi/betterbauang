import { Link, useLoaderData } from 'react-router'

import { getMunicipality, getSourceById } from '../lib/civic-data.server.ts'

export async function loader() {
  const municipality = await getMunicipality()
  const source = await getSourceById(municipality.provenance.sourceId)

  if (!source) {
    throw new Response('Source not found', { status: 500 })
  }

  return { municipality, source }
}

export default function BauangRoute() {
  const { municipality, source } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <Link className="text-sm underline" to="/">
        BetterBauang
      </Link>

      <header className="mt-8">
        <p className="text-sm text-neutral-600">{municipality.officialName}</p>
        <h1 className="mt-2 text-4xl font-semibold">{municipality.name}, {municipality.province}</h1>
        <p className="mt-4 text-neutral-700">
          Verified municipal reference information from the Philippine Statistics Authority.
        </p>
      </header>

      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-neutral-600">Population</dt>
          <dd className="mt-1 text-2xl font-semibold">{municipality.population.toLocaleString()}</dd>
          <dd className="text-sm text-neutral-600">{municipality.populationReferencePeriod}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Barangays</dt>
          <dd className="mt-1 text-2xl font-semibold">{municipality.barangayCount}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Income class</dt>
          <dd className="mt-1">{municipality.incomeClass} class municipality</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">PSGC</dt>
          <dd className="mt-1 font-mono text-sm">{municipality.psgc}</dd>
        </div>
      </dl>

      <p className="mt-10">
        <Link className="underline" to="/barangays">
          View all {municipality.barangayCount} barangays
        </Link>
      </p>

      <section className="mt-12 border-t border-neutral-200 pt-6">
        <h2 className="font-semibold">Source</h2>
        <p className="mt-2 text-sm text-neutral-700">
          {source.publisher}, {source.title}. Last verified {municipality.provenance.lastVerifiedAt}.
        </p>
        <a className="mt-2 inline-block text-sm underline" href={source.url} rel="noreferrer" target="_blank">
          Open official source
        </a>
      </section>
    </main>
  )
}
