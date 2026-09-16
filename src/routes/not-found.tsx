import { Link } from 'react-router'

export function NotFoundRoute() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <Link className="mt-4 inline-block underline" to="/">
        Return home
      </Link>
    </main>
  )
}
