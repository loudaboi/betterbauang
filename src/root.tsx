import type { ReactNode } from 'react'
import {
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router'

import { defaultLocale, localeLabels } from './lib/i18n.ts'
import './index.css'

const primaryNav = [
  { to: '/bauang', label: 'Bauang' },
  { to: '/barangays', label: 'Barangays' },
  { to: '/procurement', label: 'Procurement' },
  { to: '/about', label: 'About' },
  { to: '/search', label: 'Search' },
]

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
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
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
  return (
    <>
      <a
        className="sr-only z-50 bg-white px-4 py-3 text-sm font-medium focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Skip to content
      </a>

      <div className="border-b border-neutral-200 bg-neutral-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-xs text-neutral-600 sm:px-6">
          <span>Independent civic information for Bauang, La Union</span>
          <div className="flex shrink-0 items-center gap-4">
            <span>{localeLabels[defaultLocale]}</span>
            <Link className="hover:text-neutral-950" to="/about/sources">
              Sources
            </Link>
          </div>
        </div>
      </div>

      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex min-h-16 items-center justify-between gap-6">
            <Link className="text-base font-semibold tracking-[-0.01em] text-neutral-950" to="/">
              BetterBauang
            </Link>

            <PrimaryNav />

            <details className="group md:hidden">
              <summary className="flex min-h-11 cursor-pointer list-none items-center text-sm font-medium text-neutral-700">
                Menu
              </summary>
              <div className="absolute left-0 right-0 z-40 border-b border-neutral-200 bg-white px-4 shadow-sm sm:px-6">
                <PrimaryNav mobile />
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
          <nav className="flex flex-wrap gap-x-5 gap-y-3 text-neutral-700" aria-label="Trust and methodology">
            <Link className="hover:text-neutral-950" to="/about/sources">Sources</Link>
            <Link className="hover:text-neutral-950" to="/about/methodology">Methodology</Link>
            <Link className="hover:text-neutral-950" to="/about">About</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
