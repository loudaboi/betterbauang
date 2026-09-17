import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const civicDocumentTypeSchema = z.enum([
  'citizens-charter',
  'form',
  'full-disclosure',
  'budget',
  'procurement-plan',
  'procurement-report',
  'audit',
  'other',
])

export const civicDocumentAvailabilitySchema = z.enum([
  'available',
  'officially-listed-retrieval-failed',
  'unavailable',
])

export const civicDocumentSchema = z
  .object({
    id: z.string().regex(/^document-[a-z0-9-]+$/),
    type: civicDocumentTypeSchema,
    title: z.string().min(1),
    issuingAgency: z.string().min(1),
    reportingPeriod: z.string().min(1).nullable(),
    publicationDate: z.iso.date().nullable(),
    originalUrl: z.url().nullable(),
    availability: civicDocumentAvailabilitySchema,
    relatedRecordIds: z.array(z.string().min(1)),
    provenance: provenanceSchema,
  })
  .strict()

export const civicDocumentCollectionSchema = z.array(civicDocumentSchema)

export type CivicDocument = z.infer<typeof civicDocumentSchema>
