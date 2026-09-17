import { Link, useLoaderData } from 'react-router'

import { getProcurementRecords, getSourceById } from '../lib/civic-data.server.ts'

const phpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

export async function loader() {
  const records = await getProcurementRecords()
  const firstRecord = records[0]

  if (!firstRecord) {
    throw new Response('Procurement records not found', { status: 500 })
  }

  const source = await getSourceById(firstRecord.provenance.sourceId)

  if (!source) {
    throw new Response('Source not found', { status: 500 })
  }

  return { records, source, reportingPeriod: firstRecord.reportingPeriod }
}

export default function ProcurementRoute() {
  const { records, source, reportingPeriod } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <Link className="text-sm underline" to="/">
        BetterBauang
      </Link>

      <header className="mt-8">
        <p className="text-sm text-neutral-600">Historical records</p>
        <h1 className="mt-2 text-4xl font-semibold">Procurement</h1>
        <p className="mt-4 max-w-2xl text-neutral-700">
          Verified historical records from {source.publisher}&apos;s {source.title}. This dataset covers {reportingPeriod} and should not be read as a list of current procurement opportunities.
        </p>
      </header>

      <ul className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200">
        {records.map((record) => (
          <li key={record.id}>
            <Link className="block py-5" to={`/procurement/${record.id}`}>
              <p className="font-medium">{record.title}</p>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-600">
                <span>{record.papCode}</span>
                <span>{record.procurementMode}</span>
                <span>ABC {phpFormatter.format(record.abc)}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-12 border-t border-neutral-200 pt-6">
        <h2 className="font-semibold">Source</h2>
        <p className="mt-2 text-sm text-neutral-700">
          {source.publisher}, {source.title}. Reporting period: {reportingPeriod}.
        </p>
        <a className="mt-2 inline-block text-sm underline" href={source.url} rel="noreferrer" target="_blank">
          Open official source
        </a>
      </section>
    </main>
  )
}
