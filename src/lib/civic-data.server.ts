import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { barangayCollectionSchema } from '../domain/civic-data/barangay.ts'
import { civicDocumentCollectionSchema } from '../domain/civic-data/document.ts'
import { emergencyContactCollectionSchema } from '../domain/civic-data/emergency.ts'
import { financialObservationCollectionSchema } from '../domain/civic-data/finance.ts'
import { governmentDirectorySchema } from '../domain/civic-data/government.ts'
import { municipalitySchema } from '../domain/civic-data/municipality.ts'
import { procurementCollectionSchema } from '../domain/civic-data/procurement.ts'
import { publicProjectCollectionSchema } from '../domain/civic-data/project.ts'
import { governmentServiceCollectionSchema } from '../domain/civic-data/service.ts'
import { sourceRegistrySchema } from '../domain/civic-data/source.ts'

const root = process.cwd()

async function readJson(relativePath: string) {
  return JSON.parse(await readFile(path.join(root, relativePath), 'utf8'))
}

const municipalityPromise = readJson('data/normalized/municipality.json').then((data) =>
  municipalitySchema.parse(data),
)

const barangaysPromise = readJson('data/normalized/barangays.json').then((data) =>
  barangayCollectionSchema.parse(data),
)

const procurementPromise = readJson('data/normalized/procurement.json').then((data) =>
  procurementCollectionSchema.parse(data),
)

const servicesPromise = readJson('data/normalized/services.json').then((data) =>
  governmentServiceCollectionSchema.parse(data),
)

const governmentPromise = readJson('data/normalized/government.json').then((data) =>
  governmentDirectorySchema.parse(data),
)

const emergencyPromise = readJson('data/normalized/emergency.json').then((data) =>
  emergencyContactCollectionSchema.parse(data),
)

const financialObservationsPromise = readJson(
  'data/normalized/financial-observations.json',
).then((data) => financialObservationCollectionSchema.parse(data))

const documentsPromise = readJson('data/normalized/documents.json').then((data) =>
  civicDocumentCollectionSchema.parse(data),
)

const projectsPromise = readJson('data/normalized/projects.json').then((data) =>
  publicProjectCollectionSchema.parse(data),
)

const sourcesPromise = readJson('data/sources/registry.json').then((data) =>
  sourceRegistrySchema.parse(data),
)

export async function getMunicipality() {
  return municipalityPromise
}

export async function getBarangays() {
  return barangaysPromise
}

export async function getProcurementRecords() {
  return procurementPromise
}

export async function getProcurementRecordById(recordId: string) {
  const records = await getProcurementRecords()
  return records.find((record) => record.id === recordId) ?? null
}

export async function getServices() {
  return servicesPromise
}

export async function getServiceBySlug(slug: string) {
  const services = await getServices()
  return services.find((service) => service.id === `service-${slug}`) ?? null
}

export async function getGovernmentDirectory() {
  return governmentPromise
}

export async function getEmergencyContacts() {
  return emergencyPromise
}

export async function getFinancialObservations() {
  return financialObservationsPromise
}

export async function getCivicDocuments() {
  return documentsPromise
}

export async function getPublicProjects() {
  return projectsPromise
}

export async function getSources() {
  return sourcesPromise
}

export async function getSourceById(sourceId: string) {
  const sources = await getSources()
  return sources.find((source) => source.id === sourceId) ?? null
}
