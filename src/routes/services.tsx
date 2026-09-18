import { useMemo, useState } from 'react'
import { Link, useLoaderData } from 'react-router'

import type { GovernmentService } from '../domain/civic-data/service.ts'
import { getServices } from '../lib/civic-data.server.ts'

function serviceHref(service: GovernmentService) {
  return `/services/${service.id.replace(/^service-/, '')}`
}

function channelLabel(channel: GovernmentService['channels'][number]) {
  if (channel === 'in-person') return 'In person'
  if (channel === 'online') return 'Online'
  return 'Online + in person'
}

export async function loader() {
  return { services: await getServices() }
}

export default function ServicesRoute() {
  const { services } = useLoaderData<typeof loader>()
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()

  const filteredServices = useMemo(() => {
    if (!normalizedQuery) return services

    return services.filter((service) => {
      const searchable = [
        service.title,
        service.category,
        service.summary ?? '',
        service.providerOffice,
        ...service.audience,
        ...service.requirements.map((requirement) => requirement.name),
      ]
        .join(' ')
        .toLowerCase()

      return searchable.includes(normalizedQuery)
    })
  }, [normalizedQuery, services])

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-neutral-500">Services</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-5xl">
          Find the government service you need.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
          Search the reviewed Bauang services currently published by BetterBauang. Detailed requirements are shown only where an official source has been reviewed.
        </p>
      </header>

      <section className="mt-12 max-w-3xl" aria-labelledby="find-service-heading">
        <h2 className="text-lg font-semibold tracking-[-0.015em]" id="find-service-heading">
          Find a Service
        </h2>
        <label className="mt-4 block" htmlFor="service-search">
          <span className="sr-only">Search services</span>
          <input
            className="min-h-12 w-full border border-neutral-300 bg-white px-4 text-base text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-neutral-950"
            id="service-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try business permit, cedula, working permit..."
            type="search"
            value={query}
          />
        </label>
        <p className="mt-3 text-sm text-neutral-500" aria-live="polite">
          {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} found
        </p>
      </section>

      <section className="mt-10" aria-label="Service results">
        {filteredServices.length > 0 ? (
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {filteredServices.map((service) => (
              <Link
                className="grid gap-3 py-6 hover:bg-neutral-50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8"
                key={service.id}
                to={serviceHref(service)}
              >
                <span>
                  <span className="block text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">
                    {service.category}
                  </span>
                  <span className="mt-2 block text-lg font-semibold tracking-[-0.015em] text-neutral-950">
                    {service.title}
                  </span>
                  {service.summary ? (
                    <span className="mt-2 block max-w-2xl text-sm leading-6 text-neutral-600">
                      {service.summary}
                    </span>
                  ) : null}
                  <span className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-500">
                    <span>{service.providerOffice}</span>
                    <span>{service.channels.map(channelLabel).join(' · ')}</span>
                    {service.processingTime ? <span>{service.processingTime}</span> : null}
                  </span>
                </span>
                <span className="text-sm font-medium text-neutral-700">
                  View service <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="border-y border-neutral-200 py-8">
            <p className="font-medium text-neutral-950">No reviewed service matches that search.</p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
              Try a shorter term. BetterBauang only searches the reviewed service records currently published here.
            </p>
          </div>
        )}
      </section>

      <p className="mt-10 max-w-2xl text-sm leading-6 text-neutral-500">
        This is not a complete directory of every municipal transaction. Services are added only after their official source and current process have been reviewed.
      </p>
    </main>
  )
}
