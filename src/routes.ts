import { index, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  index('./routes/home.tsx'),
  route('bauang', './routes/bauang.tsx'),
  route('barangays', './routes/barangays.tsx'),
  route('barangays/:slug', './routes/barangay-detail.tsx'),
  route('*', './routes/not-found.tsx'),
] satisfies RouteConfig
