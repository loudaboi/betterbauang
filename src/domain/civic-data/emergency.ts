import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const emergencyContactSchema = z
  .object({
    id: z.string().regex(/^emergency-[a-z0-9-]+$/),
    agency: z.string().min(1),
    service: z.string().min(1),
    phoneNumbers: z.array(z.string().min(1)).min(1),
    email: z.email().nullable(),
    availabilityNotes: z.string().min(1).nullable(),
    provenance: provenanceSchema,
  })
  .strict()

export const emergencyContactCollectionSchema = z.array(emergencyContactSchema)

export type EmergencyContact = z.infer<typeof emergencyContactSchema>
