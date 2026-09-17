import type { Config } from '@react-router/dev/config'

import { getBarangays } from './src/lib/civic-data.server.ts'

export default {
  appDirectory: 'src',
  ssr: false,
  async prerender() {
    const barangays = await getBarangays()

    return [
      '/',
      '/bauang',
      '/barangays',
      ...barangays.map((barangay) => `/barangays/${barangay.slug}`),
    ]
  },
} satisfies Config
