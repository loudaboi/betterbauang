import { useEffect, useState } from 'react'
import { Link } from 'react-router'

type PagefindResultData = {
  url: string
  plain_excerpt?: string
  meta: Record<string, string | undefined>
}

type PagefindSearchResult = {
  data: () => Promise<PagefindResultData>
}

type PagefindSearchResponse = {
  results: PagefindSearchResult[]
}

type PagefindModule = {
  init: () => Promise<void> | void
  search: (term: string) => Promise<PagefindSearchResponse>
}

type SearchStatus = 'idle' | 'loading' | 'ready' | 'error'

let pagefindPromise: Promise<PagefindModule> | null = null

function loadPagefind() {
  if (!pagefindPromise) {
    const bundlePath = '/pagefind/pagefind.js'
    pagefindPromise = import(/* @vite-ignore */ bundlePath).then(
      (module) => module as unknown as PagefindModule,
    )
  }

  return pagefindPromise
}

function resultContext(result: PagefindResultData) {
  const category = result.meta.category ?? 'BetterBauang'
  const period = result.meta.period

  return period ? `${category} · ${period}` : category
}

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [results, setResults] = useState<PagefindResultData[]>([])
  const [status, setStatus] = useState<SearchStatus>('idle')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nextQuery = params.get('q')?.trim() ?? ''

    setInputValue(nextQuery)
    setQuery(nextQuery)
  }, [])

  useEffect(() => {
    if (!query) {
      setResults([])
      setStatus('idle')
      return
    }

    let cancelled = false

    async function runSearch() {
      setStatus('loading')

      try {
        const pagefind = await loadPagefind()
        await pagefind.init()

        const search = await pagefind.search(query)
        const loadedResults = await Promise.all(search.results.map((result) => result.data()))

        if (!cancelled) {
          setResults(loadedResults)
          setStatus('ready')
        }
      } catch {
        if (!cancelled) {
          setResults([])
          setStatus('error')
        }
      }
    }

    void runSearch()

    return () => {
      cancelled = true
    }
  }, [query])

  const resultCount = results.length
  const statusMessage =
    status === 'loading'
      ? `Searching for ${query}.`
      : status === 'error'
        ? 'Search is temporarily unavailable.'
        : status === 'ready'
          ? `${resultCount} ${resultCount === 1 ? 'result' : 'results'} for ${query}.`
          : 'Enter a search term.'

  return (
    <section className="mt-8">
      <form action="/search" method="get">
        <label className="block text-sm font-medium text-neutral-800" htmlFor="global-search">
          Search BetterBauang
        </label>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            className="min-h-12 min-w-0 flex-1 rounded-none border border-neutral-300 bg-white px-4 text-base text-neutral-950 placeholder:text-neutral-500"
            id="global-search"
            name="q"
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="Enter a place, record, or topic"
            type="search"
            value={inputValue}
          />
          <button
            className="min-h-12 shrink-0 border border-neutral-950 bg-neutral-950 px-5 text-sm font-medium text-white hover:bg-neutral-800"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

      <p aria-live="polite" className="sr-only" role="status">
        {statusMessage}
      </p>

      {!query && (
        <p className="mt-8 text-sm leading-6 text-neutral-600">
          Enter a search term to find reviewed BetterBauang pages.
        </p>
      )}

      {query && status === 'loading' && (
        <p className="mt-8 text-sm text-neutral-600">Searching…</p>
      )}

      {query && status === 'error' && (
        <div className="mt-8 border-y border-neutral-200 py-6">
          <h2 className="font-semibold">Search is temporarily unavailable</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
            Browse the published sections below or try the search again after reloading the page.
          </p>
        </div>
      )}

      {query && status === 'ready' && resultCount === 0 && (
        <div className="mt-8 border-y border-neutral-200 py-6">
          <h2 className="font-semibold">No results found</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            No reviewed BetterBauang page matched “{query}”. Try a broader term or browse the current sections below.
          </p>
        </div>
      )}

      {query && status === 'ready' && resultCount > 0 && (
        <div className="mt-8">
          <p className="text-sm text-neutral-600">
            {resultCount} {resultCount === 1 ? 'result' : 'results'} for “{query}”
          </p>
          <ol className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
            {results.map((result) => (
              <li className="py-6" key={result.url}>
                <p className="text-xs font-medium uppercase tracking-[0.08em] text-neutral-500">
                  {resultContext(result)}
                </p>
                <h2 className="mt-2 text-lg font-semibold tracking-[-0.015em]">
                  <Link
                    className="underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
                    to={result.url}
                  >
                    {result.meta.title ?? result.url}
                  </Link>
                </h2>
                {result.plain_excerpt && (
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                    {result.plain_excerpt}
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  )
}
