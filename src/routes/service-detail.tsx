import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router'

import { ProvenancePanel } from '../components/civic/ProvenancePanel.tsx'
import type { GovernmentService } from '../domain/civic-data/service.ts'
import { getServiceBySlug, getSourceById } from '../lib/civic-data.server.ts'

function channelLabel(channel: GovernmentService['channels'][number]) {
  if (channel === 'in-person') return 'In person'
  if (channel === 'online') return 'Online'
  return 'Online + in person'
}

function formatPeso(amount: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount)
}

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.service

  if (!slug) {
    throw new Response('Service not found', { status: 404 })
  }

  const service = await getServiceBySlug(slug)

  if (!service) {
    throw new Response('Service not found', { status: 404 })
  }

  const source = await getSourceById(service.provenance.sourceId)

  if (!source) {
    throw new Response('Source not found', { status: 500 })
  }

  return { service, source }
}

export default function ServiceDetailRoute() {
  const { service, source } = useLoaderData<typeof loader>()
  const hasDetailedProcess =
    service.requirements.length > 0 || service.processingTime !== null || service.fees.length > 0

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        className="inline-flex min-h-11 items-center text-sm font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
        to="/services"
      >
        ← All services
      </Link>

      <header className="mt-7 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
          {service.category}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-5xl">
          {service.title}
        </h1>
        {service.summary ? (
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">{service.summary}</p>
        ) : null}
      </header>

      <dl className="mt-10 grid gap-x-10 gap-y-6 border-y border-neutral-200 py-7 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-neutral-500">Provider</dt>
          <dd className="mt-1 text-sm font-medium leading-6 text-neutral-950">{service.providerOffice}</dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Channel</dt>
          <dd className="mt-1 text-sm font-medium text-neutral-950">
            {service.channels.map(channelLabel).join(' · ')}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-neutral-500">Processing time</dt>
          <dd className="mt-1 text-sm font-medium leading-6 text-neutral-950">
            {service.processingTime ?? 'Not yet published by BetterBauang'}
          </dd>
        </div>
      </dl>

      {service.officialUrl ? (
        <section
          className="mt-8 border-l-2 border-neutral-900 pl-5"
          aria-labelledby="official-service-heading"
        >
          <h2 className="text-sm font-semibold text-neutral-950" id="official-service-heading">
            Official government service
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            The transaction happens on the official government system, not on BetterBauang.
          </p>
          <a
            className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
            href={service.officialUrl}
            rel="noreferrer"
            target="_blank"
          >
            Continue to official eLGU <span className="ml-1" aria-hidden="true">↗</span>
          </a>
        </section>
      ) : null}

      {!hasDetailedProcess ? (
        <section
          className="mt-10 border-y border-neutral-200 py-6"
          aria-labelledby="source-limited-heading"
        >
          <h2 className="font-semibold text-neutral-950" id="source-limited-heading">
            What is verified so far
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            BetterBauang has verified this official online service route. Requirements, fees, and processing time are not published here until a reviewed source supports them.
          </p>
        </section>
      ) : null}

      {service.requirements.length > 0 ? (
        <section className="mt-12" aria-labelledby="requirements-heading">
          <h2
            className="text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
            id="requirements-heading"
          >
            What you need
          </h2>
          <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            {service.requirements.map((requirement) => (
              <div
                className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_minmax(12rem,0.65fr)] sm:gap-8"
                key={`${requirement.name}-${requirement.whereToSecure ?? ''}`}
              >
                <p className="text-sm font-medium leading-6 text-neutral-950">{requirement.name}</p>
                <div>
                  {requirement.whereToSecure ? (
                    <p className="text-sm leading-6 text-neutral-600">
                      <span className="text-neutral-500">Where to secure: </span>
                      {requirement.whereToSecure}
                    </p>
                  ) : null}
                  {requirement.notes ? (
                    <p className="mt-1 text-sm leading-6 text-neutral-500">{requirement.notes}</p>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12" aria-labelledby="steps-heading">
        <h2
          className="text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
          id="steps-heading"
        >
          What to do
        </h2>
        <ol className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
          {service.steps.map((step) => (
            <li
              className="grid gap-3 py-5 sm:grid-cols-[2rem_minmax(0,1fr)] sm:gap-5"
              key={step.order}
            >
              <span className="text-sm font-semibold tabular-nums text-neutral-400">{step.order}</span>
              <div>
                <h3 className="font-semibold text-neutral-950">{step.title}</h3>
                {step.details ? (
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">{step.details}</p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {service.fees.length > 0 ? (
        <section className="mt-12" aria-labelledby="fees-heading">
          <h2
            className="text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
            id="fees-heading"
          >
            Fees
          </h2>
          <dl className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            {service.fees.map((fee) => (
              <div
                className="grid gap-2 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8"
                key={fee.label}
              >
                <div>
                  <dt className="text-sm font-medium text-neutral-950">{fee.label}</dt>
                  {fee.notes ? (
                    <dd className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">
                      {fee.notes}
                    </dd>
                  ) : null}
                </div>
                <dd className="text-sm font-semibold tabular-nums text-neutral-950">
                  {fee.amount === null ? 'Variable' : formatPeso(fee.amount)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ) : hasDetailedProcess ? (
        <section className="mt-12" aria-labelledby="fees-heading">
          <h2
            className="text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
            id="fees-heading"
          >
            Fees
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            No verified fee amount is published in this normalized record. BetterBauang does not interpret an unspecified amount as zero.
          </p>
        </section>
      ) : null}

      {service.audience.length > 0 ? (
        <section
          className="mt-12 border-t border-neutral-200 pt-6"
          aria-labelledby="audience-heading"
        >
          <h2 className="font-semibold text-neutral-950" id="audience-heading">
            Who may use this service
          </h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">{service.audience.join(', ')}</p>
        </section>
      ) : null}

      {service.provenance.pageReference ? (
        <p className="mt-10 text-xs leading-5 text-neutral-500">
          Source reference: {service.provenance.pageReference}
        </p>
      ) : null}

      <ProvenancePanel provenance={service.provenance} source={source} />
    </main>
  )
}
