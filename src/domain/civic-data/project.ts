import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const implementingAgencyLevelSchema = z.enum([
  'municipal',
  'provincial',
  'national',
  'other',
])

export const publicProjectSchema = z
  .object({
    id: z.string().regex(/^project-[a-z0-9-]+$/),
    title: z.string().min(1),
    location: z.string().min(1),
    implementingAgency: z.string().min(1),
    implementingAgencyLevel: implementingAgencyLevelSchema,
    fundingSource: z.string().min(1).nullable(),
    appropriatedAmount: z.number().nonnegative().nullable(),
    currency: z.literal('PHP'),
    contractor: z.string().min(1).nullable(),
    sourceLifecycleStatus: z.string().min(1).nullable(),
    relatedProcurementIds: z.array(z.string().min(1)),
    provenance: provenanceSchema,
  })
  .strict()

export const publicProjectCollectionSchema = z.array(publicProjectSchema)

export type PublicProject = z.infer<typeof publicProjectSchema>
