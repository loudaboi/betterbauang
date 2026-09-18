import type { ReactNode } from 'react'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from 'react-router'

import { EmergencyStrip } from './components/layout/EmergencyStrip.tsx'
import { SiteHeader } from './components/layout/SiteHeader.tsx'
import { getEmergencyContacts } from './lib/civic-data.server.ts'
import { defaultLocale } from './lib/i18n.ts'
import './index.css'

export async function loader() {
  return { emergencyContacts: await getEmergencyContacts() }
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
        className="sr-only z-50 bg-card px-4 py-3 text-sm font-medium text-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Skip to content
      </a>

      <EmergencyStrip contacts={emergencyContacts} />
      <SiteHeader />

      <div id="main-content" tabIndex={-1}>
        <Outlet />
      </div>

      <footer className="mt-16 border-t border-border bg-card">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm sm:px-6 md:grid-cols-[1fr_auto]">
          <p className="max-w-2xl leading-6 text-muted-foreground">
            BetterBauang is an independent community civic-tech project and is not an official website of the Municipality of Bauang.
          </p>
          <nav
            className="flex flex-wrap gap-x-5 gap-y-3 text-muted-foreground"
            aria-label="Trust and methodology"
          >
            <Link className="hover:text-foreground" to="/about/sources">
              Sources
            </Link>
            <Link className="hover:text-foreground" to="/about/methodology">
              Methodology
            </Link>
            <Link className="hover:text-foreground" to="/about">
              About
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
