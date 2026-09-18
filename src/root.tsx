import type { ReactNode } from 'react'
import {
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'

import type { EmergencyContact } from './domain/civic-data/emergency.ts'
import { getEmergencyContacts } from './lib/civic-data.server.ts'
import { defaultLocale } from './lib/i18n.ts'
import { toTelHref } from './lib/phone.ts'
import './index.css'

const primaryNav = [
  { to: '/', label: 'Home' },
  { to: '/contact', label: 'Contact' },
] as const

const emergencyStripOrder = [
  { id: 'emergency-unified-911', label: 'National' },
  { id: 'emergency-bauang-mdrrmo', label: 'MDRRMO' },
  { id: 'emergency-bauang-pnp', label: 'Police' },
  { id: 'emergency-bauang-bfp', label: 'Fire' },
  { id: 'emergency-bauang-mho', label: 'Health' },
] as const

export async function loader() {
  return { emergencyContacts: await getEmergencyContacts() }
}

function EmergencyStrip({ contacts }: { contacts: EmergencyContact[] }) {
  const items = emergencyStripOrder.flatMap((item) => {
    const contact = contacts.find((candidate) => candidate.id === item.id)
    return contact ? [{ ...item, contact }] : []
  })

  return (
    <aside className="border-b border-red-200 bg-red-50" aria-label="Emergency contacts">
      <div className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.1em] text-red-800">
            Emergency
          </span>

          <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-1 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
            {items.map(({ contact, label }) => {
              const phoneNumber = contact.phoneNumbers[0]

              return (
                <a
                  aria-label={`Call ${contact.agency} at ${phoneNumber}`}
                  className="inline-flex min-h-9 items-center gap-1.5 text-xs text-red-950 hover:underline"
                  href={toTelHref(phoneNumber)}
                  key={contact.id}
                >
                  <span className="font-medium">{label}</span>
                  <span className="font-semibold tabular-nums">{phoneNumber}</span>
                </a>
              )
            })}

            <Link
              className="inline-flex min-h-9 items-center text-xs font-semibold text-red-950 hover:underline"
              to="/contact"
            >
              All contacts <span className="ml-1" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}

function PrimaryNav({ mobile = false }: { mobile?: boolean }) {
  return (
    <nav
      className={mobile ? 'grid gap-1 py-3' : 'hidden items-center gap-6 md:flex'}
      aria-label={mobile ? 'Primary mobile' : 'Primary'}
    >
      {primaryNav.map((item) => (
        <NavLink
          key={item.to}
          className={({ isActive }) =>
            [
              'min-h-11 items-center text-sm font-medium transition-colors',
              mobile ? 'flex border-t border-neutral-200 py-2' : 'inline-flex',
              isActive ? 'text-neutral-950' : 'text-neutral-600 hover:text-neutral-950',
            ].join(' ')
          }
          end
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function LanguageControls() {
  return (
    <div className="flex items-center gap-2 text-xs font-medium" aria-label="Language availability">
      <span className="border border-neutral-900 bg-neutral-900 px-2 py-1 text-white">EN</span>
      <span
        aria-disabled="true"
        className="border border-neutral-200 px-2 py-1 text-neutral-400"
        title="Filipino content is not yet published"
      >
        FIL
      </span>
      <span
        aria-disabled="true"
        className="border border-neutral-200 px-2 py-1 text-neutral-400"
        title="Ilocano content is not yet published"
      >
        ILO
      </span>
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang={defaultLocale}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>BetterBauang</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  const { emergencyContacts } = useLoaderData<typeof loader>()

  return (
    <>
      <a
        className="sr-only z-50 bg-white px-4 py-3 text-sm font-medium focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Skip to content
      </a>

      <EmergencyStrip contacts={emergencyContacts} />

      <header className="border-b border-neutral-200 bg-white">
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex min-h-16 items-center justify-between gap-4 sm:gap-6">
            <Link
              className="shrink-0 text-base font-semibold tracking-[-0.01em] text-neutral-950"
              to="/"
            >
              BetterBauang
            </Link>

            <PrimaryNav />

            <div className="ml-auto hidden md:block">
              <LanguageControls />
            </div>

            <details className="group md:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-medium text-neutral-700">
                Menu
              </summary>
              <div className="absolute left-0 right-0 z-40 border-b border-neutral-200 bg-white px-4 shadow-sm sm:px-6">
                <PrimaryNav mobile />
                <div className="border-t border-neutral-200 py-4">
                  <LanguageControls />
                </div>
              </div>
            </details>
          </div>
        </div>
      </header>

      <div id="main-content" tabIndex={-1}>
        <Outlet />
      </div>

      <footer className="mt-16 border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm sm:px-6 md:grid-cols-[1fr_auto]">
          <p className="max-w-2xl leading-6 text-neutral-600">
            BetterBauang is an independent community civic-tech project and is not an official website of the Municipality of Bauang.
          </p>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-3 text-neutral-700"
            aria-label="Trust and methodology"
          >
            <Link className="hover:text-neutral-950" to="/about/sources">
              Sources
            </Link>
            <Link className="hover:text-neutral-950" to="/about/methodology">
              Methodology
            </Link>
            <Link className="hover:text-neutral-950" to="/about">
              About
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
