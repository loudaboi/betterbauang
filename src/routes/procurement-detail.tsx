import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'

import { ProvenancePanel } from '../components/civic/ProvenancePanel.tsx'
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
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        className="inline-flex min-h-11 items-center text-sm font-medium text-neutral-600 hover:text-neutral-950"
        to="/procurement"
      >
        ← All procurement records
      </Link>

      <header className="mt-6">
        <p className="text-sm font-medium text-neutral-500">{record.reportingPeriod} historical procurement record</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{record.title}</h1>
        <p className="mt-4 font-mono text-sm text-neutral-500">{record.papCode}</p>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
          This page reports information recorded in {source.title}. It describes a historical procurement record, not current procurement activity.
        </p>
      </header>

      <dl className="mt-10 grid gap-x-8 gap-y-7 border-t border-neutral-200 pt-8 sm:grid-cols-2">
        <div>
          <dt className="text-sm text-neutral-500">Procurement record status</dt>
          <dd className="mt-1">{formatRecordStatus(record.recordStatus)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Procurement method</dt>
          <dd className="mt-1">{record.procurementMode}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">End user / office</dt>
          <dd className="mt-1">{record.endUser}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Source of funds</dt>
          <dd className="mt-1">{record.sourceOfFunds}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Approved Budget for the Contract</dt>
          <dd className="mt-1 text-xl font-semibold tracking-[-0.02em]">{phpFormatter.format(record.abc)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Contract cost</dt>
          <dd className="mt-1 text-xl font-semibold tracking-[-0.02em]">{formatMoney(record.contractCost)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Notice of award</dt>
          <dd className="mt-1">{formatDate(record.noticeOfAwardDate)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Contract signing</dt>
          <dd className="mt-1">{formatDate(record.contractSigningDate)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Notice to proceed</dt>
          <dd className="mt-1">{formatDate(record.noticeToProceedDate)}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Delivery / completion term</dt>
          <dd className="mt-1">{record.deliveryCompletionTerm ?? 'Not available in this record'}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Delivery / completion / acceptance date</dt>
          <dd className="mt-1">{formatDate(record.deliveryCompletionAcceptanceDate)}</dd>
        </div>
      </dl>

      <p className="mt-8 max-w-2xl text-sm leading-6 text-neutral-600">
        The procurement record status is limited to what the normalized procurement data establishes. It is not a broader claim about the lifecycle or completion of an underlying public project.
      </p>

      <ProvenancePanel provenance={record.provenance} source={source} />
    </main>
  )
}
