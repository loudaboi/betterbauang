import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'

import { getProcurementRecordById, getSourceById } from '../lib/civic-data.server.ts'

const phpFormatter = new Intl.NumberFormat('en-PH', {
  style: 'currency',
  currency: 'PHP',
})

const dateFormatter = new Intl.DateTimeFormat('en-PH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

function formatDate(value: string | null) {
  return value ? dateFormatter.format(new Date(`${value}T00:00:00Z`)) : 'Not available in this record'
}

function formatMoney(value: number | null) {
  return value === null ? 'Not available in this record' : phpFormatter.format(value)
}

function formatRecordStatus(value: string) {
  const words = value.replaceAll('-', ' ')
  return words.charAt(0).toUpperCase() + words.slice(1)
}

export async function loader({ params }: LoaderFunctionArgs) {
  const recordId = params.recordId

  if (!recordId) {
    throw new Response('Procurement record not found', { status: 404 })
  }

  const record = await getProcurementRecordById(recordId)

  if (!record) {
    throw new Response('Procurement record not found', { status: 404 })
  }

  const source = await getSourceById(record.provenance.sourceId)

  if (!source) {
    throw new Response('Source not found', { status: 500 })
  }

  return { record, source }
}

export default function ProcurementDetailRoute() {
  const { record, source } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <Link className="text-sm underline" to="/procurement">
        All procurement records
      </Link>

      <header className="mt-8">
        <p className="text-sm text-neutral-600">{record.reportingPeriod} historical procurement record</p>
        <h1 className="mt-2 text-4xl font-semibold">{record.title}</h1>
        <p className="mt-4 font-mono text-sm text-neutral-600">{record.papCode}</p>
        <p className="mt-4 max-w-2xl text-neutral-700">
          This page reports information recorded in {source.title}. It describes a historical procurement record, not current procurement activity.
        </p>
      </header>

      <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-neutral-600">Procurement record status</dt>
          <dd className="mt-1">{formatRecordStatus(record.recordStatus)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Procurement method</dt>
          <dd className="mt-1">{record.procurementMode}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">End user / office</dt>
          <dd className="mt-1">{record.endUser}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Source of funds</dt>
          <dd className="mt-1">{record.sourceOfFunds}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Approved Budget for the Contract</dt>
          <dd className="mt-1 text-xl font-semibold">{phpFormatter.format(record.abc)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Contract cost</dt>
          <dd className="mt-1 text-xl font-semibold">{formatMoney(record.contractCost)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Notice of award</dt>
          <dd className="mt-1">{formatDate(record.noticeOfAwardDate)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Contract signing</dt>
          <dd className="mt-1">{formatDate(record.contractSigningDate)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Notice to proceed</dt>
          <dd className="mt-1">{formatDate(record.noticeToProceedDate)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Delivery / completion term</dt>
          <dd className="mt-1">{record.deliveryCompletionTerm ?? 'Not available in this record'}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Delivery / completion / acceptance date</dt>
          <dd className="mt-1">{formatDate(record.deliveryCompletionAcceptanceDate)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-600">Reporting period</dt>
          <dd className="mt-1">{record.reportingPeriod}</dd>
        </div>
      </dl>

      <p className="mt-8 text-sm text-neutral-600">
        The procurement record status is limited to what the normalized procurement data establishes. It is not a broader claim about the lifecycle or completion of an underlying public project.
      </p>

      <section className="mt-12 border-t border-neutral-200 pt-6">
        <h2 className="font-semibold">Source and provenance</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-neutral-600">Source</dt>
            <dd className="mt-1">{source.publisher}, {source.title}</dd>
          </div>
          <div>
            <dt className="text-neutral-600">Verification status</dt>
            <dd className="mt-1 capitalize">{record.provenance.verificationStatus}</dd>
          </div>
          <div>
            <dt className="text-neutral-600">Retrieved</dt>
            <dd className="mt-1">{record.provenance.retrievedAt}</dd>
          </div>
          <div>
            <dt className="text-neutral-600">Last verified</dt>
            <dd className="mt-1">{record.provenance.lastVerifiedAt}</dd>
          </div>
        </dl>
        <a className="mt-4 inline-block text-sm underline" href={source.url} rel="noreferrer" target="_blank">
          Open official source
        </a>
      </section>
    </main>
  )
}
