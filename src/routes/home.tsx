import { Link } from 'react-router'

const currentDestinations = [
  {
    to: '/services',
    title: 'Services',
    description: 'Find reviewed municipal services, requirements, steps, and official transaction routes.',
  },
  {
    to: '/government',
    title: 'Government',
    description: 'See reviewed municipal officials, general municipal contact information, and Bauang\'s 39 barangays.',
  },
  {
    to: '/contact',
    title: 'Contact',
    description: 'Find reviewed emergency and general municipal contact information.',
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
          Public information about Bauang, made easier to use.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-700 sm:text-lg">
          BetterBauang is an independent civic information project for Bauang, La Union. Browse the reviewed public information currently available while the remaining V1 civic sections and source gaps are completed from verified evidence.
        </p>
      </section>

      <section className="mt-16 max-w-4xl border-t border-neutral-200 pt-8 sm:mt-20">
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold tracking-[-0.02em]">Available now</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            These pages are available during the V1 information-architecture transition. Existing reference pages will be integrated into their final sections as those sections are completed.
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
