import { Link } from 'react-router'

import type { EmergencyContact } from '../../domain/civic-data/emergency.ts'
import { toTelHref } from '../../lib/phone.ts'

type EmergencyStripConfig = {
  id: string
  label: string
}

const emergencyStripOrder: readonly EmergencyStripConfig[] = [
  { id: 'emergency-unified-911', label: 'Unified 911' },
  { id: 'emergency-bauang-mdrrmo', label: 'MDRRMO' },
  { id: 'emergency-bauang-pnp', label: 'Police' },
  { id: 'emergency-bauang-bfp', label: 'Fire' },
  { id: 'emergency-bauang-mho', label: 'Health' },
]

type EmergencyItem = EmergencyStripConfig & {
  contact: EmergencyContact
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5 shrink-0" fill="none" viewBox="0 0 24 24">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8.09 9.65a16 16 0 0 0 6 6l1.19-1.19a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  )
}

function HotlineLink({ item, duplicate = false }: { item: EmergencyItem; duplicate?: boolean }) {
  const phoneNumber = item.contact.phoneNumbers[0]

  return (
    <a
      aria-label={duplicate ? undefined : `Call ${item.contact.agency} at ${phoneNumber}`}
      className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 text-xs transition-colors hover:bg-white/15"
      href={toTelHref(phoneNumber)}
      tabIndex={duplicate ? -1 : undefined}
    >
      <PhoneIcon />
      <span className="font-medium">{item.label}:</span>
      <span className="font-semibold tabular-nums">{phoneNumber}</span>
    </a>
  )
}

function EmergencyItems({ items, duplicate = false }: { items: EmergencyItem[]; duplicate?: boolean }) {
  return (
    <div
      aria-hidden={duplicate ? true : undefined}
      className="bb-emergency-ticker-copy flex shrink-0 items-center gap-2 pl-4 pr-6 sm:pl-6"
    >
      <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">
        Emergency Hotlines
      </span>

      {items.map((item) => (
        <HotlineLink duplicate={duplicate} item={item} key={item.contact.id} />
      ))}

      <Link
        className="inline-flex min-h-8 shrink-0 items-center px-2 text-xs font-semibold hover:underline"
        tabIndex={duplicate ? -1 : undefined}
        to="/contact"
      >
        All contacts <span className="ml-1" aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

export function EmergencyStrip({ contacts }: { contacts: EmergencyContact[] }) {
  const items: EmergencyItem[] = emergencyStripOrder.flatMap((item) => {
    const contact = contacts.find((candidate) => candidate.id === item.id)
    return contact ? [{ ...item, contact }] : []
  })

  return (
    <aside className="bg-destructive text-destructive-foreground" aria-label="Emergency hotlines">
      <div className="bb-emergency-ticker overflow-hidden xl:hidden">
        <div className="bb-emergency-ticker-track">
          <EmergencyItems items={items} />
          <EmergencyItems duplicate items={items} />
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-center gap-4 px-6 py-1.5 xl:flex xl:px-8">
        <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">
          Emergency Hotlines
        </span>

        <div className="flex flex-1 items-center justify-center gap-2">
          {items.map((item) => (
            <HotlineLink item={item} key={item.contact.id} />
          ))}
        </div>

        <Link className="shrink-0 text-xs font-semibold hover:underline" to="/contact">
          All contacts <span className="ml-1" aria-hidden="true">→</span>
        </Link>
      </div>
    </aside>
  )
}
