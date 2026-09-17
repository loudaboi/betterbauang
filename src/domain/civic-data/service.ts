import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const serviceChannelSchema = z.enum(['in-person', 'online', 'hybrid'])

export const serviceRequirementSchema = z
  .object({
    name: z.string().min(1),
    whereToSecure: z.string().min(1).nullable().optional(),
    notes: z.string().min(1).nullable().optional(),
  })
  .strict()

export const serviceStepSchema = z
  .object({
    order: z.number().int().positive(),
    title: z.string().min(1),
    details: z.string().min(1).nullable().optional(),
  })
  .strict()

export const serviceFeeSchema = z
  .object({
    label: z.string().min(1),
    amount: z.number().nonnegative().nullable(),
    currency: z.literal('PHP'),
    notes: z.string().min(1).nullable().optional(),
  })
  .strict()

export const governmentServiceSchema = z
  .object({
    id: z.string().regex(/^service-[a-z0-9-]+$/),
    title: z.string().min(1),
    category: z.string().min(1),
    summary: z.string().min(1).nullable().optional(),
    providerOffice: z.string().min(1),
    audience: z.array(z.string().min(1)),
    requirements: z.array(serviceRequirementSchema),
    steps: z.array(serviceStepSchema),
    fees: z.array(serviceFeeSchema),
    processingTime: z.string().min(1).nullable(),
    channels: z.array(serviceChannelSchema).min(1),
    officialUrl: z.url().nullable(),
    relatedDocumentIds: z.array(z.string().min(1)),
    sourceEdition: z.string().min(1).nullable(),
    provenance: provenanceSchema,
  })
  .strict()

export const governmentServiceCollectionSchema = z.array(governmentServiceSchema)

export type GovernmentService = z.infer<typeof governmentServiceSchema>
