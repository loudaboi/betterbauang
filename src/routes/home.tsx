import { Link } from 'react-router'

export default function HomeRoute() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-semibold">BetterBauang</h1>
      <p className="mt-4 max-w-xl text-neutral-700">
        Independent civic information and transparency for Bauang, La Union.
      </p>

      <nav className="mt-10 flex gap-6" aria-label="Explore BetterBauang">
        <Link className="underline" to="/bauang">
          Bauang overview
        </Link>
        <Link className="underline" to="/barangays">
          Barangays
        </Link>
      </nav>
    </main>
  )
}
