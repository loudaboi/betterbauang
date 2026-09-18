import { Link, useLoaderData } from 'react-router'

import { ProvenancePanel } from '../components/civic/ProvenancePanel.tsx'
import type { GovernmentOffice } from '../domain/civic-data/government.ts'
import {
  getBarangays,
  getGovernmentDirectory,
  getMunicipality,
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

type GovernmentContact = GovernmentOffice['contacts'][number]

function ContactLink({ contact }: { contact: GovernmentContact }) {
  const label = contact.label ?? contact.type

  if (contact.type === 'phone') {
    return (
      <div>
        <dt className="text-sm text-neutral-500">{label}</dt>
        <dd className="mt-1">
          <a
            className="inline-flex min-h-11 items-center text-sm font-semibold tabular-nums text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
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
            className="inline-flex min-h-11 items-center break-all text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
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
          className="inline-flex min-h-11 items-center break-all text-sm font-semibold text-neutral-950 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
          href={contact.value}
          rel="noreferrer"
          target="_blank"
        >
          Official website <span className="ml-1" aria-hidden="true">↗</span>
        </a>
      </dd>
    </div>
  )
}

export async function loader() {
  const [government, barangays, municipality, sources] = await Promise.all([
    getGovernmentDirectory(),
    getBarangays(),
    getMunicipality(),
    getSources(),
  ])

  const sourceById = new Map(sources.map((source) => [source.id, source]))
  const rosterSourceId = government.officials[0]?.provenance.sourceId
  const rosterSource = rosterSourceId ? sourceById.get(rosterSourceId) : null

  if (!rosterSource) {
    throw new Response('Government roster source not found', { status: 500 })
  }

  const municipalOffice = government.offices.find(
    (office) => office.id === 'office-municipality-of-bauang',
  )

  let municipalContact = null

  if (municipalOffice) {
    const source = sourceById.get(municipalOffice.provenance.sourceId)

    if (!source) {
      throw new Response('Municipal contact source not found', { status: 500 })
    }

    municipalContact = { office: municipalOffice, source }
  }

  const barangaySource = sourceById.get(municipality.provenance.sourceId)

  if (!barangaySource) {
    throw new Response('Barangay source not found', { status: 500 })
  }

  return {
    government,
    barangays,
    rosterSource,
    municipalContact,
    barangaySource,
    barangayProvenance: municipality.provenance,
  }
}

export default function GovernmentRoute() {
  const {
    government,
    barangays,
    rosterSource,
    municipalContact,
    barangaySource,
    barangayProvenance,
  } = useLoaderData<typeof loader>()

  const mayor = government.officials.find((official) => official.role === 'Mayor')
  const viceMayor = government.officials.find((official) => official.role === 'Vice Mayor')
  const councilMembers = government.officials.filter(
    (official) => official.role === 'Sangguniang Bayan Member',
  )
  const rosterProvenance = government.officials[0]?.provenance

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-sm font-medium text-neutral-500">Government</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-5xl">
          Local government of Bauang
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-700">
          Current elected officials, reviewed municipal contact information, and Bauang&apos;s 39 barangays. BetterBauang publishes only records tied to an identified government source.
        </p>
      </header>

      <section className="mt-14" aria-labelledby="officials-heading">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
            Elected officials
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
            id="officials-heading"
          >
            Current municipal roster
          </h2>
          {rosterProvenance ? (
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Last verified {formatDate(rosterProvenance.lastVerifiedAt)}. Term dates are not displayed because the reviewed roster source does not state them.
            </p>
          ) : null}
        </div>

        <div className="mt-7 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
          {[mayor, viceMayor].map((official) =>
            official ? (
              <article className="bg-white p-5 sm:p-6" key={official.id}>
                <p className="text-sm text-neutral-500">{official.role}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-neutral-950">
                  {official.displayName}
                </h3>
              </article>
            ) : null,
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold tracking-[-0.015em] text-neutral-950">
            Sangguniang Bayan
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Members are shown using the role label published by the source. BetterBauang does not infer committee, federation, or other specific council roles that are not stated in the reviewed roster.
          </p>

          <ol className="mt-5 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
            {councilMembers.map((official) => (
              <li className="bg-white px-5 py-4 text-sm font-medium text-neutral-950" key={official.id}>
                {official.displayName}
              </li>
            ))}
          </ol>
        </div>

        {rosterProvenance ? (
          <ProvenancePanel provenance={rosterProvenance} source={rosterSource} />
        ) : null}
      </section>

      {municipalContact ? (
        <section
          className="mt-16 border-t border-neutral-200 pt-8"
          aria-labelledby="municipal-office-heading"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
              Municipal contact
            </p>
            <h2
              className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
              id="municipal-office-heading"
            >
              {municipalContact.office.name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {municipalContact.office.summary}
            </p>
          </div>

          <dl className="mt-7 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {municipalContact.office.contacts.map((contact) => (
              <ContactLink contact={contact} key={`${contact.type}-${contact.value}`} />
            ))}
          </dl>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
            {municipalContact.office.officialUrl ? (
              <a
                className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                href={municipalContact.office.officialUrl}
                rel="noreferrer"
                target="_blank"
              >
                Open official contact page <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            <Link
              className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
              to="/contact"
            >
              Emergency and contact directory
            </Link>
          </div>

          <ProvenancePanel
            provenance={municipalContact.office.provenance}
            source={municipalContact.source}
          />
        </section>
      ) : null}

      <section
        className="mt-16 border-t border-neutral-200 pt-8"
        aria-labelledby="barangays-heading"
        id="barangays"
      >
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500">
            Local communities
          </p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-neutral-950"
            id="barangays-heading"
          >
            {barangays.length} barangays
          </h2>
          <p className="mt-3 text-sm leading-6 text-neutral-600">
            Bauang&apos;s barangays are listed here as part of Government. Current Punong Barangay and direct contact details are shown only after a competent current source passes review; older directories are not treated as current merely because they are complete.
          </p>
        </div>

        <ul className="mt-7 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2 lg:grid-cols-3">
          {barangays.map((barangay) => (
            <li className="bg-white px-4 py-4" key={barangay.id}>
              <span className="text-sm font-medium text-neutral-950">{barangay.name}</span>
            </li>
          ))}
        </ul>

        <ProvenancePanel provenance={barangayProvenance} source={barangaySource} />
      </section>

      <p className="mt-10 max-w-2xl text-sm leading-6 text-neutral-500">
        BetterBauang omits office responsibilities, direct official contacts, and other government details that have not yet passed source and freshness review.
      </p>
    </main>
  )
}
