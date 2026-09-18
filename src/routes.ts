import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('./routes/home.tsx'),
  route('bauang', './routes/bauang.tsx'),
  route('barangays', './routes/barangays.tsx'),
  route('barangays/:slug', './routes/barangay-detail.tsx'),
  route('procurement', './routes/procurement.tsx'),
  route('procurement/:recordId', './routes/procurement-detail.tsx'),
  route('search', './routes/search.tsx'),
  route('about', './routes/about.tsx'),
  route('about/sources', './routes/about-sources.tsx'),
  route('about/methodology', './routes/about-methodology.tsx'),
  route('*', './routes/not-found.tsx'),
] satisfies RouteConfig
