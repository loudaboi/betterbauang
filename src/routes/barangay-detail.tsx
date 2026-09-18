import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'

import { getBarangayBySlug, getSourceById } from '../lib/civic-data.server.ts'

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug

  if (!slug) {
    throw new Response('Barangay not found', { status: 404 })
  }

  const barangay = await getBarangayBySlug(slug)

  if (!barangay) {
    throw new Response('Barangay not found', { status: 404 })
  }

  const source = await getSourceById(barangay.provenance.sourceId)

  if (!source) {
    throw new Response('Source not found', { status: 500 })
  }

  return { barangay, source }
}

export default function BarangayDetailRoute() {
  const { barangay, source } = useLoaderData<typeof loader>()

  return (
    <main data-pagefind-body data-pagefind-meta="category:Barangay" data-pagefind-filter="category:Barangay" className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <Link className="text-sm underline" to="/barangays">
        All barangays
      </Link>

      <header className="mt-8">
        <p className="text-sm text-neutral-600">Barangay of Bauang, La Union</p>
        <h1 className="mt-2 text-4xl font-semibold">{barangay.name}</h1>
      </header>

      <dl className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-neutral-600">Population</dt>
          <dd className="mt-1 text-2xl font-semibold">{barangay.population.toLocaleString('en-PH')}</dd>
          <dd data-pagefind-meta="period" className="text-sm text-neutral-600">{barangay.populationReferencePeriod}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Classification</dt>
          <dd className="mt-1 capitalize">{barangay.classification}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">PSGC</dt>
          <dd className="mt-1 font-mono text-sm">{barangay.psgc}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Correspondence code</dt>
          <dd className="mt-1 font-mono text-sm">{barangay.correspondenceCode}</dd>
        </div>
      </dl>

      <section className="mt-12 border-t border-neutral-200 pt-6">
        <h2 className="font-semibold">Source</h2>
        <p className="mt-2 text-sm text-neutral-700">
          {source.publisher}, {source.title}. Last verified {barangay.provenance.lastVerifiedAt}.
        </p>
        <a className="mt-2 inline-block text-sm underline" href={source.url} rel="noreferrer" target="_blank">
          Open official source
        </a>
      </section>
    </main>
  )
}
