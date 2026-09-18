import { useLoaderData } from 'react-router'

import type { GovernmentOffice } from '../domain/civic-data/government.ts'
import type { Provenance } from '../domain/civic-data/provenance.ts'
import type { Source } from '../domain/civic-data/source.ts'
import {
  getEmergencyContacts,
  getGovernmentDirectory,
  getSources,
} from '../lib/civic-data.server.ts'
import { toTelHref } from '../lib/phone.ts'

const dateFormatter = new Intl.DateTimeFormat('en-PH', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
})

function formatDate(value: string) {
  return dateFormatter.format(new Date(`${value}T00:00:00Z`))
}

function SourceLine({
  provenance,
  source,
}: {
  provenance: Provenance
  source: Source
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-5 text-neutral-500">
      <span>Last verified {formatDate(provenance.lastVerifiedAt)}</span>
      {provenance.publishedAt ? (
        <span>Source published {formatDate(provenance.publishedAt)}</span>
      ) : null}
      <a
        className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-700"
        href={source.url}
        rel="noreferrer"
        target="_blank"
      >
        {source.publisher}: {source.title} <span aria-hidden="true">↗</span>
      </a>
    </div>
  )
}

type GovernmentContact = GovernmentOffice['contacts'][number]

function GovernmentContactLink({ contact }: { contact: GovernmentContact }) {
  const label = contact.label ?? contact.type

  if (contact.type === 'phone') {
    return (
      <div>
        <dt className="text-sm text-neutral-500">{label}</dt>
        <dd className="mt-1">
          <a
            className="inline-flex min-h-11 items-center text-base font-medium tabular-nums text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
            href={toTelHref(contact.value)}
          >
            {contact.value}
          </a>
        </dd>
      </div>
    )
  }

  if (contact.type === 'email') {
    return (
      <div>
        <dt className="text-sm text-neutral-500">{label}</dt>
        <dd className="mt-1">
          <a
            className="inline-flex min-h-11 items-center break-all text-base font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
            href={`mailto:${contact.value}`}
          >
            {contact.value}
          </a>
        </dd>
      </div>
    )
  }

  return (
    <div>
      <dt className="text-sm text-neutral-500">{label}</dt>
      <dd className="mt-1">
        <a
          className="inline-flex min-h-11 items-center break-all text-base font-medium text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
          href={contact.value}
          rel="noreferrer"
          target="_blank"
        >
          {contact.value} <span className="ml-1" aria-hidden="true">↗</span>
        </a>
      </dd>
    </div>
  )
}

export async function loader() {
  const [emergencyContacts, government, sources] = await Promise.all([
    getEmergencyContacts(),
    getGovernmentDirectory(),
    getSources(),
  ])

  const sourceById = new Map(sources.map((source) => [source.id, source]))

  const emergency = emergencyContacts.map((contact) => {
    const source = sourceById.get(contact.provenance.sourceId)

    if (!source) {
      throw new Response(`Source not found for ${contact.id}`, { status: 500 })
    }

    return { contact, source }
  })

  const municipalOffice = government.offices.find(
    (office) => office.id === 'office-municipality-of-bauang',
  )

  let municipalContact = null

  if (municipalOffice) {
    const source = sourceById.get(municipalOffice.provenance.sourceId)

    if (!source) {
      throw new Response('Source not found for municipal contact', { status: 500 })
    }

    municipalContact = { office: municipalOffice, source }
  }

  const officialChannels = ['SRC-001', 'SRC-005'].map((sourceId) => {
    const source = sourceById.get(sourceId)

    if (!source) {
      throw new Response(`Official channel source not found: ${sourceId}`, { status: 500 })
    }

    return source
  })

  return { emergency, municipalContact, officialChannels }
}

export default function ContactRoute() {
  const { emergency, municipalContact, officialChannels } = useLoaderData<typeof loader>()

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-neutral-500">Contact Bauang</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-5xl">
          Emergency and municipal contacts
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
          Reviewed contact information from official government sources. Emergency contacts are time-sensitive, so BetterBauang shows when each record was last verified.
        </p>
      </header>

      <section className="mt-14" aria-labelledby="emergency-heading">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-red-700">Emergency</p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
            id="emergency-heading"
          >
            Emergency contacts
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Call the national 911 hotline or the relevant Bauang emergency service below. Use the complete local number list here rather than relying on older contact directories.
          </p>
        </div>

        <div className="mt-7 divide-y divide-neutral-200 border-y border-neutral-200">
          {emergency.map(({ contact, source }) => (
            <article className="py-6" key={contact.id}>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-8">
                <div>
                  <h3 className="text-lg font-semibold tracking-[-0.015em] text-neutral-950">
                    {contact.agency}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-neutral-600">{contact.service}</p>
                  {contact.availabilityNotes ? (
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                      {contact.availabilityNotes}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start gap-1 sm:items-end">
                  {contact.phoneNumbers.map((phoneNumber) => (
                    <a
                      aria-label={`Call ${contact.agency} at ${phoneNumber}`}
                      className="inline-flex min-h-11 items-center text-base font-semibold tabular-nums text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                      href={toTelHref(phoneNumber)}
                      key={phoneNumber}
                    >
                      {phoneNumber}
                    </a>
                  ))}
                </div>
              </div>

              <SourceLine provenance={contact.provenance} source={source} />
            </article>
          ))}
        </div>
      </section>

      {municipalContact ? (
        <section className="mt-16 border-t border-neutral-200 pt-8" aria-labelledby="municipal-contact-heading">
          <div className="max-w-2xl">
            <h2
              className="text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
              id="municipal-contact-heading"
            >
              General municipal contact
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {municipalContact.office.summary}
            </p>
          </div>

          <dl className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {municipalContact.office.contacts.map((contact) => (
              <GovernmentContactLink contact={contact} key={`${contact.type}-${contact.value}`} />
            ))}
          </dl>

          <SourceLine
            provenance={municipalContact.office.provenance}
            source={municipalContact.source}
          />
        </section>
      ) : null}

      <section className="mt-16 border-t border-neutral-200 pt-8" aria-labelledby="official-channels-heading">
        <div className="max-w-2xl">
          <h2
            className="text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
            id="official-channels-heading"
          >
            Official online channels
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            These links leave BetterBauang and open official government destinations.
          </p>
        </div>

        <div className="mt-7 divide-y divide-neutral-200 border-y border-neutral-200">
          {officialChannels.map((source) => (
            <a
              className="grid min-h-20 gap-1 py-4 hover:bg-neutral-50 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-8"
              href={source.url}
              key={source.id}
              rel="noreferrer"
              target="_blank"
            >
              <span>
                <span className="block font-medium text-neutral-950">{source.title}</span>
                <span className="mt-1 block text-sm text-neutral-500">{source.publisher}</span>
              </span>
              <span className="text-sm font-medium text-neutral-700">
                Open official site <span aria-hidden="true">↗</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <p className="mt-10 max-w-2xl text-sm leading-6 text-neutral-500">
        BetterBauang intentionally omits contact details that have not passed source and freshness review. Missing information is not filled with guesses or placeholders.
      </p>
    </main>
  )
}
