import type { Config } from '@react-router/dev/config'

import { getBarangays, getProcurementRecords } from './src/lib/civic-data.server.ts'

export default {
  appDirectory: 'src',
  ssr: false,
  async prerender() {
    const [barangays, procurementRecords] = await Promise.all([
      getBarangays(),
      getProcurementRecords(),
    ])

    return [
      '/',
      '/contact',
      '/bauang',
      '/barangays',
      ...barangays.map((barangay) => `/barangays/${barangay.slug}`),
      '/procurement',
      ...procurementRecords.map((record) => `/procurement/${record.id}`),
      '/about',
      '/about/sources',
      '/about/methodology',
    ]
  },
} satisfies Config
