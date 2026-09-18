import { Link, useLoaderData } from 'react-router'

import { ProvenancePanel } from '../components/civic/ProvenancePanel.tsx'
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
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <header>
        <p className="text-sm font-medium text-neutral-500">{municipality.officialName}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          {municipality.name}, {municipality.province}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
          Verified municipal reference information from the Philippine Statistics Authority.
        </p>
      </header>

      <dl className="mt-10 grid gap-x-8 gap-y-7 border-t border-neutral-200 pt-8 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-neutral-500">Population</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-[-0.02em]">
            {municipality.population.toLocaleString('en-PH')}
          </dd>
          <dd className="mt-1 text-sm text-neutral-500">{municipality.populationReferencePeriod}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Barangays</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-[-0.02em]">{municipality.barangayCount}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Income class</dt>
          <dd className="mt-1">{municipality.incomeClass} class municipality</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">PSGC</dt>
          <dd className="mt-1 font-mono text-sm">{municipality.psgc}</dd>
        </div>
      </dl>

      <p className="mt-10">
        <Link
          className="inline-flex min-h-11 items-center text-sm font-medium underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
          to="/government#barangays"
        >
          View Bauang&apos;s {municipality.barangayCount} barangays in Government
        </Link>
      </p>

      <ProvenancePanel provenance={municipality.provenance} source={source} />
    </main>
  )
}
