import { z } from 'zod'

import { provenanceSchema } from './provenance.ts'

export const procurementRecordStatusSchema = z.enum([
  'completed-procurement',
])

export const procurementRecordSchema = z
  .object({
    id: z.string().min(1),
    papCode: z.string().min(1),
    title: z.string().min(1),
    endUser: z.string().min(1),
    procurementMode: z.string().min(1),
    sourceOfFunds: z.string().min(1),
    abc: z.number().nonnegative(),
    contractCost: z.number().nonnegative().nullable(),
    noticeOfAwardDate: z.iso.date().nullable(),
    contractSigningDate: z.iso.date().nullable(),
    noticeToProceedDate: z.iso.date().nullable(),
    deliveryCompletionTerm: z.string().min(1).nullable(),
    deliveryCompletionAcceptanceDate: z.iso.date().nullable(),
    reportingPeriod: z.string().min(1),
    recordStatus: procurementRecordStatusSchema,
    remarks: z.string().min(1).nullable().optional(),
    provenance: provenanceSchema,
  })
  .strict()

export const procurementCollectionSchema = z
  .array(procurementRecordSchema)
  .superRefine((records, ctx) => {
    const ids = new Set<string>()
    const papCodes = new Set<string>()

    records.forEach((record, index) => {
      if (ids.has(record.id)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate procurement ID: ${record.id}`,
          path: [index, 'id'],
        })
      }

      if (papCodes.has(record.papCode)) {
        ctx.addIssue({
          code: 'custom',
          message: `Duplicate PAP code: ${record.papCode}`,
          path: [index, 'papCode'],
        })
      }

      ids.add(record.id)
      papCodes.add(record.papCode)
    })
  })

export const procurementStagingDatasetSchema = z
  .object({
    dataset: z.string().min(1),
    sourceId: z.string().min(1),
    extractedAt: z.iso.date(),
    reviewStatus: z.enum(['pending', 'approved']),
    reviewedAt: z.iso.date().optional(),
    records: procurementCollectionSchema,
  })
  .strict()
  .superRefine((dataset, ctx) => {
    if (dataset.reviewStatus === 'approved' && !dataset.reviewedAt) {
      ctx.addIssue({
        code: 'custom',
        message: 'Approved staging data requires reviewedAt',
        path: ['reviewedAt'],
      })
    }
  })

export type ProcurementRecord = z.infer<typeof procurementRecordSchema>
