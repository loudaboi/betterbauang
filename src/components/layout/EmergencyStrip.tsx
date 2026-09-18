import { Link } from 'react-router'

import type { EmergencyContact } from '../../domain/civic-data/emergency.ts'
import { toTelHref } from '../../lib/phone.ts'

type HotlineIconName = 'phone' | 'warning' | 'shield' | 'fire' | 'health'

type EmergencyStripConfig = {
  id: string
  label: string
  icon: HotlineIconName
}

const emergencyStripOrder: readonly EmergencyStripConfig[] = [
  { id: 'emergency-unified-911', label: 'Unified 911', icon: 'phone' },
  { id: 'emergency-bauang-mdrrmo', label: 'MDRRMO', icon: 'warning' },
  { id: 'emergency-bauang-pnp', label: 'Police', icon: 'shield' },
  { id: 'emergency-bauang-bfp', label: 'Fire', icon: 'fire' },
  { id: 'emergency-bauang-mho', label: 'Health', icon: 'health' },
]

type EmergencyItem = EmergencyStripConfig & {
  contact: EmergencyContact
}

function HotlineIcon({ name }: { name: HotlineIconName }) {
  if (name === 'warning') {
    return (
      <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24">
        <path d="M12 2 22 20H2L12 2Z" fill="currentColor" />
        <path d="M11 8h2v6h-2V8Zm0 8h2v2h-2v-2Z" fill="var(--destructive)" />
      </svg>
    )
  }

  if (name === 'shield') {
    return (
      <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24">
        <path d="M12 2 4 5v6c0 5.1 3.3 9.5 8 11 4.7-1.5 8-5.9 8-11V5l-8-3Z" fill="currentColor" />
      </svg>
    )
  }

  if (name === 'fire') {
    return (
      <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24">
        <path
          d="M13.4 2c.5 3-1.1 4.8-2.7 6.5-1.1 1.2-1.9 2.3-1.4 4 .3 1 .9 1.7 1.8 2.3-.1-2.2 1-3.9 2.8-5.5 2.7 2.2 4.6 4.7 4.6 8A6.5 6.5 0 0 1 5.5 17c0-3.5 1.8-6.2 4.8-9C11.8 6.6 13 4.9 13.4 2Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  if (name === 'health') {
    return (
      <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24">
        <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg aria-hidden="true" className="size-4 shrink-0" viewBox="0 0 24 24">
      <path
        d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2a1.2 1.2 0 0 1 1.2-.3c1 .3 2.1.5 3.2.5.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2A17 17 0 0 1 2.8 4.2C2.8 3.5 3.3 3 4 3h3.4c.7 0 1.2.5 1.2 1.2 0 1.1.2 2.2.5 3.2.1.4 0 .9-.3 1.2l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" className="size-3.5" fill="none" viewBox="0 0 16 16">
      <path d="M3 8h9M9 4l4 4-4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" />
    </svg>
  )
}

function HotlineLink({ item, duplicate = false }: { item: EmergencyItem; duplicate?: boolean }) {
  const phoneNumber = item.contact.phoneNumbers[0]

  return (
    <a
      aria-label={duplicate ? undefined : `Call ${item.contact.agency} at ${phoneNumber}`}
      className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full bg-white/15 px-3.5 text-xs font-medium transition-colors hover:bg-white/25"
      href={toTelHref(phoneNumber)}
      tabIndex={duplicate ? -1 : undefined}
    >
      <HotlineIcon name={item.icon} />
      <span>{item.label}:</span>
      <span className="font-semibold tabular-nums">{phoneNumber}</span>
    </a>
  )
}

function AllHotlinesLink({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <Link
      className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold text-destructive transition-colors hover:bg-white/90"
      tabIndex={duplicate ? -1 : undefined}
      to="/contact"
    >
      All hotlines
      <ArrowIcon />
    </Link>
  )
}

function EmergencyItems({ items, duplicate = false }: { items: EmergencyItem[]; duplicate?: boolean }) {
  return (
    <div
      aria-hidden={duplicate ? true : undefined}
      className="bb-emergency-ticker-copy flex min-h-12 shrink-0 items-center gap-2.5 pl-4 pr-7 sm:pl-6"
    >
      <span className="mr-1 shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.13em]">
        Emergency Hotlines
      </span>

      {items.map((item) => (
        <HotlineLink duplicate={duplicate} item={item} key={item.contact.id} />
      ))}

      <AllHotlinesLink duplicate={duplicate} />
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

      <div className="mx-auto hidden min-h-12 max-w-7xl items-center gap-4 px-6 py-2 xl:flex xl:px-8">
        <span className="shrink-0 text-[0.6875rem] font-bold uppercase tracking-[0.13em]">
          Emergency Hotlines
        </span>

        <div className="flex flex-1 items-center justify-center gap-2.5">
          {items.map((item) => (
            <HotlineLink item={item} key={item.contact.id} />
          ))}
        </div>

        <AllHotlinesLink />
      </div>
    </aside>
  )
}
