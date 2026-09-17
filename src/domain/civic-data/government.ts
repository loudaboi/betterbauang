import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const governmentContactSchema = z
  .object({
    type: z.enum(['phone', 'email', 'website']),
    value: z.string().min(1),
    label: z.string().min(1).nullable().optional(),
  })
  .strict()

export const governmentOfficialSchema = z
  .object({
    id: z.string().regex(/^official-[a-z0-9-]+$/),
    displayName: z.string().min(1),
    role: z.string().min(1),
    officeOrBody: z.string().min(1),
    termStart: z.iso.date().nullable(),
    termEnd: z.iso.date().nullable(),
    contacts: z.array(governmentContactSchema),
    provenance: provenanceSchema,
  })
  .strict()

export const governmentOfficeSchema = z
  .object({
    id: z.string().regex(/^office-[a-z0-9-]+$/),
    name: z.string().min(1),
    summary: z.string().min(1).nullable(),
    address: z.string().min(1).nullable(),
    contacts: z.array(governmentContactSchema),
    officialUrl: z.url().nullable(),
    provenance: provenanceSchema,
  })
  .strict()

export const governmentDirectorySchema = z
  .object({
    officials: z.array(governmentOfficialSchema),
    offices: z.array(governmentOfficeSchema),
  })
  .strict()

export type GovernmentOfficial = z.infer<typeof governmentOfficialSchema>
export type GovernmentOffice = z.infer<typeof governmentOfficeSchema>
