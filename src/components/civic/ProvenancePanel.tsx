import type { Provenance } from '../../domain/civic-data/provenance.ts'
import type { Source } from '../../domain/civic-data/source.ts'

const dateFormatter = new Intl.DateTimeFormat('en-PH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

const verificationLabels: Record<Provenance['verificationStatus'], string> = {
  verified: 'Verified',
  partial: 'Partially verified',
  conflicting: 'Conflicting official sources',
  stale: 'Verification overdue',
  superseded: 'Superseded',
  historical: 'Historical',
  unverified: 'Unverified',
}

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

export function ProvenancePanel({
  provenance,
  source,
}: {
  provenance: Provenance
  source: Source
}) {
  return (
    <section className="mt-12 border-t border-neutral-200 pt-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-semibold">Source and verification</h2>
        <span className="text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">
          {verificationLabels[provenance.verificationStatus]}
        </span>
      </div>

      <dl className="mt-4 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-neutral-500">Source</dt>
          <dd className="mt-1 text-neutral-900">
            {source.publisher}, {source.title}
          </dd>
        </div>
        <div>
          <dt className="text-neutral-500">Last verified</dt>
          <dd className="mt-1 text-neutral-900">{formatDate(provenance.lastVerifiedAt)}</dd>
        </div>
        {provenance.reportingPeriod ? (
          <div>
            <dt className="text-neutral-500">Reporting period</dt>
            <dd className="mt-1 text-neutral-900">{provenance.reportingPeriod}</dd>
          </div>
        ) : null}
        <div>
          <dt className="text-neutral-500">Retrieved</dt>
          <dd className="mt-1 text-neutral-900">{formatDate(provenance.retrievedAt)}</dd>
        </div>
      </dl>

      {source.freshness ? (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
          {source.freshness}
        </p>
      ) : null}

      <a
        className="mt-4 inline-flex min-h-11 items-center text-sm font-medium underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
        href={source.url}
        rel="noreferrer"
        target="_blank"
      >
        Open official source <span className="ml-1" aria-hidden="true">↗</span>
      </a>
    </section>
  )
}
