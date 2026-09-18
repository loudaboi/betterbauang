import { useState } from 'react'
import { Link, NavLink } from 'react-router'

const livePrimaryNav = [
  { to: '/services', label: 'Services' },
  { to: '/government', label: 'Government' },
  { to: '/contact', label: 'Contact' },
] as const

function LanguageControls() {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1"
      aria-label="Language availability"
    >
      <span className="min-w-9 rounded-md bg-primary px-2.5 py-1.5 text-center text-xs font-semibold text-primary-foreground">
        EN
      </span>
      <span
        aria-disabled="true"
        className="min-w-9 rounded-md px-2.5 py-1.5 text-center text-xs font-semibold text-muted-foreground opacity-55"
        title="Filipino content is not yet published"
      >
        FIL
      </span>
      <span
        aria-disabled="true"
        className="min-w-9 rounded-md px-2.5 py-1.5 text-center text-xs font-semibold text-muted-foreground opacity-55"
        title="Ilocano content is not yet published"
      >
        ILO
      </span>
    </div>
  )
}

function PrimaryNavigation({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col lg:flex-row lg:items-center lg:gap-8" aria-label="Primary">
      {livePrimaryNav.map((item) => (
        <NavLink
          className={({ isActive }) =>
            [
              'flex min-h-12 items-center border-b border-border text-base font-medium transition-colors lg:min-h-11 lg:border-b-0',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
            ].join(' ')
          }
          key={item.to}
          onClick={onNavigate}
          to={item.to}
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}

function Brand({ mobile = false }: { mobile?: boolean }) {
  return (
    <Link className="min-w-0 text-foreground" to="/" aria-label="BetterBauang home">
      <span
        className={
          mobile
            ? 'block text-base font-semibold tracking-[-0.02em]'
            : 'block text-lg font-semibold tracking-[-0.025em]'
        }
      >
        BetterBauang
      </span>
      {!mobile && (
        <span className="mt-0.5 block whitespace-nowrap text-[0.6875rem] leading-4 text-muted-foreground">
          Independent Civic Community Portal for Bauang
        </span>
      )}
    </Link>
  )
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="relative border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-6 xl:px-8">
        <div className="hidden min-h-20 grid-cols-[minmax(17rem,1fr)_auto_minmax(17rem,1fr)] items-center gap-8 lg:grid">
          <div className="justify-self-start">
            <Brand />
          </div>

          <PrimaryNavigation />

          <div className="justify-self-end">
            <LanguageControls />
          </div>
        </div>

        <div className="flex min-h-16 items-center justify-between gap-4 lg:hidden">
          <div className="flex min-w-0 items-center gap-3">
            {/* The approved logo asset will be inserted here once it is supplied. */}
            <Brand mobile />
          </div>

          <button
            aria-controls="mobile-site-menu"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="relative flex size-11 shrink-0 items-center justify-center text-foreground"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            <span
              className={`absolute h-px w-5 bg-current transition-transform ${mobileOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5'}`}
            />
            <span
              className={`absolute h-px w-5 bg-current transition-opacity ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`absolute h-px w-5 bg-current transition-transform ${mobileOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5'}`}
            />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="absolute left-0 right-0 top-full z-40 border-b border-border bg-card lg:hidden"
          id="mobile-site-menu"
        >
          <div className="mx-auto max-w-7xl px-4 pb-5 sm:px-6">
            <PrimaryNavigation onNavigate={() => setMobileOpen(false)} />

            <div className="flex items-center justify-between gap-6 border-b border-border py-5">
              <span className="text-xs font-medium text-muted-foreground">Languages</span>
              <LanguageControls />
            </div>

            <div className="pt-5">
              <p className="text-xs font-semibold text-foreground">BetterLGU</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Independent Civic Community Portal for Bauang
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
