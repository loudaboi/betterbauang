import { Link } from 'react-router'

import { GlobalSearch } from '../components/search/GlobalSearch.tsx'

export default function SearchRoute() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-neutral-500">Search</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
          Search BetterBauang
        </h1>
        <p className="mt-5 text-base leading-7 text-neutral-700">
          Search the reviewed public-information pages currently published on BetterBauang.
        </p>
      </header>

      <GlobalSearch />

      <noscript>
        <p className="mt-8 border-y border-neutral-200 py-6 text-sm leading-6 text-neutral-700">
          Search requires JavaScript in this static build. You can still browse the published sections below.
        </p>
      </noscript>

      <nav className="mt-12 border-t border-neutral-200 pt-6" aria-label="Browse published information">
        <p className="text-sm font-medium text-neutral-800">Browse current sections</p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" to="/bauang">
            About Bauang
          </Link>
          <Link className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" to="/barangays">
            Barangays
          </Link>
          <Link className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" to="/procurement">
            Procurement
          </Link>
          <Link className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" to="/about/sources">
            Sources
          </Link>
        </div>
      </nav>
    </main>
  )
}
