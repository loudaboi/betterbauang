import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const punongBarangaySchema = z
  .object({
    name: z.string().min(1),
    phoneNumbers: z.array(z.string().min(1)),
    provenance: provenanceSchema,
  })
  .strict()

export const barangaySchema = z
  .object({
    recordType: z.literal('barangay'),
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    psgc: z.string().regex(/^\d{10}$/),
    correspondenceCode: z.string().regex(/^\d{9}$/),
    classification: z.enum(['urban', 'rural']),
    municipalityId: z.string().min(1),
    population: z.number().int().nonnegative(),
    populationReferencePeriod: z.string().min(1),
    punongBarangay: punongBarangaySchema.nullable().optional(),
    provenance: provenanceSchema,
  })
  .strict()

export const barangayCollectionSchema = z.array(barangaySchema).superRefine((barangays, ctx) => {
  const ids = new Set<string>()
  const psgcCodes = new Set<string>()
  const slugs = new Set<string>()

  barangays.forEach((barangay, index) => {
    for (const [value, set, field] of [
      [barangay.id, ids, 'id'],
      [barangay.psgc, psgcCodes, 'psgc'],
      [barangay.slug, slugs, 'slug'],
    ] as const) {
      if (set.has(value)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate ${field}: ${value}`,
          path: [index, field],
        })
      }

      set.add(value)
    }
  })
})

export type PunongBarangay = z.infer<typeof punongBarangaySchema>
export type Barangay = z.infer<typeof barangaySchema>
