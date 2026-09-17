import type { ReactNode } from 'react'
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import './index.css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
  return (
    <>
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link className="font-semibold" to="/">
            BetterBauang
          </Link>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Primary">
            <Link className="underline" to="/bauang">Bauang</Link>
            <Link className="underline" to="/barangays">Barangays</Link>
            <Link className="underline" to="/procurement">Procurement</Link>
            <Link className="underline" to="/about">About</Link>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-neutral-600">
          <p>
            BetterBauang is an independent community civic-tech project and is not an official website of the Municipality of Bauang.
          </p>
          <nav className="mt-3 flex gap-5" aria-label="Trust and methodology">
            <Link className="underline" to="/about/sources">Sources</Link>
            <Link className="underline" to="/about/methodology">Methodology</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
