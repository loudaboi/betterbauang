import { Link } from 'react-router'

import type { EmergencyContact } from '../../domain/civic-data/emergency.ts'
import { toTelHref } from '../../lib/phone.ts'

const emergencyStripOrder = [
  { id: 'emergency-unified-911', label: '911', compact: true },
  { id: 'emergency-bauang-mdrrmo', label: 'MDRRMO' },
  { id: 'emergency-bauang-pnp', label: 'Police' },
  { id: 'emergency-bauang-bfp', label: 'Fire' },
  { id: 'emergency-bauang-mho', label: 'Health' },
] as const

type EmergencyItem = (typeof emergencyStripOrder)[number] & {
  contact: EmergencyContact
}

function EmergencyItems({ items, duplicate = false }: { items: EmergencyItem[]; duplicate?: boolean }) {
  return (
    <div
      aria-hidden={duplicate ? true : undefined}
      className="bb-emergency-ticker-copy flex shrink-0 items-center gap-5 pr-10"
    >
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">Emergency</span>

      {items.map(({ contact, label, compact }) => {
        const phoneNumber = contact.phoneNumbers[0]

        return (
          <a
            aria-label={duplicate ? undefined : `Call ${contact.agency} at ${phoneNumber}`}
            className="inline-flex min-h-9 shrink-0 items-center gap-1.5 text-xs hover:underline"
            href={toTelHref(phoneNumber)}
            key={contact.id}
            tabIndex={duplicate ? -1 : undefined}
          >
            {compact ? (
              <span className="font-bold tabular-nums">911</span>
            ) : (
              <>
                <span className="font-medium opacity-85">{label}</span>
                <span className="font-semibold tabular-nums">{phoneNumber}</span>
              </>
            )}
          </a>
        )
      })}

      <Link
        className="inline-flex min-h-9 shrink-0 items-center text-xs font-semibold hover:underline"
        tabIndex={duplicate ? -1 : undefined}
        to="/contact"
      >
        All contacts <span className="ml-1" aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

export function EmergencyStrip({ contacts }: { contacts: EmergencyContact[] }) {
  const items = emergencyStripOrder.flatMap((item) => {
    const contact = contacts.find((candidate) => candidate.id === item.id)
    return contact ? [{ ...item, contact }] : []
  })

  return (
    <aside className="bg-destructive text-destructive-foreground" aria-label="Emergency contacts">
      <div className="bb-emergency-ticker overflow-hidden lg:hidden">
        <div className="bb-emergency-ticker-track pl-4 sm:pl-6">
          <EmergencyItems items={items} />
          <EmergencyItems duplicate items={items} />
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-center gap-5 px-6 py-1 lg:flex xl:px-8">
        <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">
          Emergency
        </span>

        <div className="flex flex-1 items-center justify-center gap-x-5">
          {items.map(({ contact, label, compact }) => {
            const phoneNumber = contact.phoneNumbers[0]

            return (
              <a
                aria-label={`Call ${contact.agency} at ${phoneNumber}`}
                className="inline-flex min-h-9 items-center gap-1.5 text-xs hover:underline"
                href={toTelHref(phoneNumber)}
                key={contact.id}
              >
                {compact ? (
                  <span className="font-bold tabular-nums">911</span>
                ) : (
                  <>
                    <span className="font-medium opacity-85">{label}</span>
                    <span className="font-semibold tabular-nums">{phoneNumber}</span>
                  </>
                )}
              </a>
            )
          })}
        </div>

        <Link className="shrink-0 text-xs font-semibold hover:underline" to="/contact">
          All contacts <span className="ml-1" aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  )
}
