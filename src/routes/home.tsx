import { Link } from 'react-router'

const currentDestinations = [
  {
    to: '/barangays',
    title: 'Barangays',
    description: 'Browse reviewed barangay reference pages and their published source context.',
  },
  {
    to: '/bauang',
    title: 'About Bauang',
    description: 'View municipal reference information with explicit source and reporting context.',
  },
  {
    to: '/procurement',
    title: 'Procurement',
    description: 'Review the historical procurement records currently published by BetterBauang.',
  },
  {
    to: '/about/sources',
    title: 'Sources',
    description: 'See the official source material registered behind published civic information.',
  },
] as const

export default function HomeRoute() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-neutral-500">BetterBauang</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-neutral-950 sm:text-6xl">
          Find public information about Bauang.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
          BetterBauang is an independent civic information project for Bauang, La Union. Search reviewed pages or browse the public information currently available.
        </p>

        <form action="/search" className="mt-8 max-w-2xl" method="get">
          <label className="block text-sm font-medium text-neutral-800" htmlFor="home-search">
            Search BetterBauang
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              className="min-h-12 min-w-0 flex-1 rounded-none border border-neutral-300 bg-white px-4 text-base text-neutral-950 placeholder:text-neutral-500"
              id="home-search"
              name="q"
              placeholder="What are you looking for?"
              type="search"
            />
            <button
              className="min-h-12 shrink-0 border border-neutral-950 bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
      </section>

      <section className="mt-16 max-w-4xl border-t border-neutral-200 pt-8 sm:mt-20">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Available now</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            These destinations currently contain reviewed, published information. Other civic domains will join this hierarchy only after their records pass review.
          </p>
        </div>

        <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
          {currentDestinations.map((item) => (
            <Link
              className="grid min-h-24 gap-2 py-5 hover:bg-neutral-50 sm:grid-cols-[12rem_1fr] sm:gap-8"
              key={item.to}
              to={item.to}
            >
              <span className="font-medium text-neutral-950">{item.title}</span>
              <span className="max-w-2xl text-sm leading-6 text-neutral-600">{item.description}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14 max-w-4xl border-t border-neutral-200 pt-8">
        <h2 className="text-xl font-semibold tracking-[-0.02em]">Trust the source, not the interface</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
          BetterBauang keeps published civic information traceable to its underlying evidence and distinguishes current information from historical records.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium">
          <Link className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" to="/about/sources">
            Sources
          </Link>
          <Link className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" to="/about/methodology">
            Methodology
          </Link>
          <Link className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" to="/about">
            About and corrections
          </Link>
        </div>
      </section>
    </main>
  )
}
