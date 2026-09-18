import type { Config } from '@react-router/dev/config'

import { getBarangays, getProcurementRecords, getServices } from './src/lib/civic-data.server.ts'

export default {
  appDirectory: 'src',
  ssr: false,
  async prerender() {
    const [barangays, procurementRecords, services] = await Promise.all([
      getBarangays(),
      getProcurementRecords(),
      getServices(),
    ])

    return [
      '/',
      '/services',
      ...services.map((service) => `/services/${service.id.replace(/^service-/, '')}`),
      '/government',
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
