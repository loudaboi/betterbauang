import { Link, useLoaderData } from 'react-router'

import { getBarangays, getMunicipality, getSourceById } from '../lib/civic-data.server.ts'

export async function loader() {
  const [municipality, barangays] = await Promise.all([
    getMunicipality(),
    getBarangays(),
  ])
  const source = await getSourceById(municipality.provenance.sourceId)

  if (!source) {
    throw new Response('Source not found', { status: 500 })
  }

  return { municipality, barangays, source }
}

export default function BarangaysRoute() {
  const { municipality, barangays, source } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <Link className="text-sm underline" to="/bauang">
        Bauang
      </Link>

      <header className="mt-8">
        <h1 className="text-4xl font-semibold">Barangays</h1>
        <p className="mt-4 max-w-2xl text-neutral-700">
          All {barangays.length} barangays of {municipality.name}, with PSA codes, classification, and {municipality.populationReferencePeriod} population.
        </p>
      </header>

      <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
        {barangays.map((barangay) => (
          <li key={barangay.id}>
            <Link
              className="flex items-center justify-between gap-6 py-4"
              to={`/barangays/${barangay.slug}`}
            >
              <span className="font-medium">{barangay.name}</span>
              <span className="text-sm text-neutral-600">
                {barangay.population.toLocaleString('en-PH')}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="font-semibold">Source</h2>
        <p className="mt-2 text-sm text-neutral-700">
          {source.publisher}, {source.title}. Population reference period: {municipality.populationReferencePeriod}.
        </p>
        <a className="mt-2 inline-block text-sm underline" href={source.url} rel="noreferrer" target="_blank">
          Open official source
        </a>
      </section>
    </main>
  )
}
