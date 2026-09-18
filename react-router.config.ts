import type { Config } from '@react-router/dev/config'

import { getProcurementRecords, getServices } from './src/lib/civic-data.server.ts'

export default {
  appDirectory: 'src',
  ssr: false,
  async prerender() {
    const [procurementRecords, services] = await Promise.all([
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
      '/procurement',
      ...procurementRecords.map((record) => `/procurement/${record.id}`),
      '/about',
      '/about/sources',
      '/about/methodology',
    ]
  },
} satisfies Config
