import { z } from 'zod'

import { sourceIdSchema } from './source.ts'

export const verificationStatusSchema = z.enum([
  'verified',
  'partial',
  'conflicting',
  'stale',
  'superseded',
  'historical',
  'unverified',
])

export const extractionMethodSchema = z.enum([
  'manual',
  'structured-import',
  'ai-assisted',
  'derived',
])

export const provenanceSchema = z
  .object({
    sourceId: sourceIdSchema,
    publishedAt: z.iso.date().nullable().optional(),
    reportingPeriod: z.string().min(1).nullable().optional(),
    retrievedAt: z.iso.date(),
    lastVerifiedAt: z.iso.date(),
    pageReference: z.string().min(1).nullable().optional(),
    verificationStatus: verificationStatusSchema,
    extractionMethod: extractionMethodSchema.optional(),
    reviewer: z.string().min(1).nullable().optional(),
    notes: z.string().min(1).nullable().optional(),
  })
  .strict()

export const normalizedRecordBaseSchema = z
  .object({
    id: z.string().min(1),
    provenance: provenanceSchema,
  })
  .passthrough()

export type Provenance = z.infer<typeof provenanceSchema>
