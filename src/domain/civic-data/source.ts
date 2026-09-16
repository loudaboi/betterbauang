import { z } from 'zod'

export const sourceIdSchema = z.string().regex(/^SRC-\d{3,}$/)

export const sourceAuthoritySchema = z.enum(['A', 'B', 'C', 'D'])

export const sourceStatusSchema = z.enum([
  'READY',
  'CONDITIONAL',
  'DISCOVERY',
  'GAP',
])

export const sourceSchema = z
  .object({
    id: sourceIdSchema,
    publisher: z.string().min(1),
    title: z.string().min(1),
    url: z.url(),
    authority: sourceAuthoritySchema,
    domains: z.array(z.string().min(1)).min(1),
    status: sourceStatusSchema,
    retrievedAt: z.iso.date(),
    freshness: z.string().min(1).nullable().optional(),
    notes: z.string().min(1).nullable().optional(),
  })
  .strict()

export const sourceRegistrySchema = z.array(sourceSchema).superRefine((sources, ctx) => {
  const seen = new Set<string>()

  sources.forEach((source, index) => {
    if (seen.has(source.id)) {
      ctx.addIssue({
        code: 'custom',
        message: `Duplicate source ID: ${source.id}`,
        path: [index, 'id'],
      })
    }

    seen.add(source.id)
  })
})

export type Source = z.infer<typeof sourceSchema>
