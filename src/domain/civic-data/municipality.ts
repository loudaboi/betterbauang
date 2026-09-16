import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const municipalitySchema = z
  .object({
    recordType: z.literal('municipality'),
    id: z.string().min(1),
    name: z.string().min(1),
    officialName: z.string().min(1),
    province: z.string().min(1),
    region: z.string().min(1),
    psgc: z.string().regex(/^\d{10}$/),
    correspondenceCode: z.string().regex(/^\d{9}$/),
    incomeClass: z.string().min(1),
    barangayCount: z.number().int().nonnegative(),
    population: z.number().int().nonnegative(),
    populationReferencePeriod: z.string().min(1),
    provenance: provenanceSchema,
  })
  .strict()

export type Municipality = z.infer<typeof municipalitySchema>
