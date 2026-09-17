import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const financialPeriodBasisSchema = z.enum([
  'annual',
  'quarterly-ytd',
  'quarterly-point',
  'other',
])

export const financialUnitSchema = z.enum(['PHP', 'percent', 'count', 'ratio', 'other'])

export const financialObservationSchema = z
  .object({
    id: z.string().regex(/^finance-[a-z0-9-]+$/),
    indicator: z.string().min(1),
    value: z.number(),
    unit: financialUnitSchema,
    geography: z.string().min(1),
    referencePeriod: z.string().min(1),
    periodBasis: financialPeriodBasisSchema,
    sourceDataset: z.string().min(1),
    provenance: provenanceSchema,
  })
  .strict()

export const financialObservationCollectionSchema = z.array(financialObservationSchema)

export type FinancialObservation = z.infer<typeof financialObservationSchema>
