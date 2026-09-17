import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { barangayCollectionSchema } from '../src/domain/civic-data/barangay.ts'
import { civicDocumentCollectionSchema } from '../src/domain/civic-data/document.ts'
import { emergencyContactCollectionSchema } from '../src/domain/civic-data/emergency.ts'
import { financialObservationCollectionSchema } from '../src/domain/civic-data/finance.ts'
import { governmentDirectorySchema } from '../src/domain/civic-data/government.ts'
import { municipalitySchema } from '../src/domain/civic-data/municipality.ts'
import {
  procurementCollectionSchema,
  procurementStagingDatasetSchema,
} from '../src/domain/civic-data/procurement.ts'
import { publicProjectCollectionSchema } from '../src/domain/civic-data/project.ts'
import { governmentServiceCollectionSchema } from '../src/domain/civic-data/service.ts'
import { sourceRegistrySchema } from '../src/domain/civic-data/source.ts'

const root = process.cwd()
const sourceRegistryPath = path.join(root, 'data', 'sources', 'registry.json')
const municipalityPath = path.join(root, 'data', 'normalized', 'municipality.json')
const barangaysPath = path.join(root, 'data', 'normalized', 'barangays.json')
const procurementPath = path.join(root, 'data', 'normalized', 'procurement.json')
const servicesPath = path.join(root, 'data', 'normalized', 'services.json')
const governmentPath = path.join(root, 'data', 'normalized', 'government.json')
const emergencyPath = path.join(root, 'data', 'normalized', 'emergency.json')
const financePath = path.join(root, 'data', 'normalized', 'financial-observations.json')
const documentsPath = path.join(root, 'data', 'normalized', 'documents.json')
const projectsPath = path.join(root, 'data', 'normalized', 'projects.json')
const procurementStagingPath = path.join(
  root,
  'data',
  'staging',
  'bauang-pmr-fy2024-completed-sample.json',
)

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

function formatIssues(issues) {
  return issues
    .map((issue) => {
      const location = issue.path.length > 0 ? issue.path.join('.') : 'root'
      return `  - ${location}: ${issue.message}`
    })
    .join('\n')
}

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

function parseOrExit(label, schema, data) {
  const result = schema.safeParse(data)

  if (!result.success) {
    console.error(`${label} validation failed:`)
    console.error(formatIssues(result.error.issues))
    process.exit(1)
  }

  return result.data
}

const registry = parseOrExit(
  'Source registry',
  sourceRegistrySchema,
  await readJson(sourceRegistryPath),
)
const municipality = parseOrExit(
  'Municipality',
  municipalitySchema,
  await readJson(municipalityPath),
)
const barangays = parseOrExit(
  'Barangay',
  barangayCollectionSchema,
  await readJson(barangaysPath),
)
const stagedProcurement = parseOrExit(
  'Procurement staging',
  procurementStagingDatasetSchema,
  await readJson(procurementStagingPath),
)
const procurementRecords = parseOrExit(
  'Normalized procurement',
  procurementCollectionSchema,
  await readJson(procurementPath),
)
const services = parseOrExit(
  'Services',
  governmentServiceCollectionSchema,
  await readJson(servicesPath),
)
const government = parseOrExit(
  'Government directory',
  governmentDirectorySchema,
  await readJson(governmentPath),
)
const emergencyContacts = parseOrExit(
  'Emergency contacts',
  emergencyContactCollectionSchema,
  await readJson(emergencyPath),
)
const financialObservations = parseOrExit(
  'Financial observations',
  financialObservationCollectionSchema,
  await readJson(financePath),
)
const documents = parseOrExit(
  'Civic documents',
  civicDocumentCollectionSchema,
  await readJson(documentsPath),
)
const projects = parseOrExit(
  'Public projects',
  publicProjectCollectionSchema,
  await readJson(projectsPath),
)

const sourceIds = new Set(registry.map((source) => source.id))

function validateSourceLink(label, provenance) {
  if (!sourceIds.has(provenance.sourceId)) {
    fail(`Unknown ${label} source ID: ${provenance.sourceId}`)
  }
}

validateSourceLink('municipality', municipality.provenance)

for (const barangay of barangays) {
  validateSourceLink(`source for ${barangay.name}`, barangay.provenance)

  if (barangay.municipalityId !== municipality.id) {
    fail(
      `Invalid municipality link for ${barangay.name}: expected ${municipality.id}, received ${barangay.municipalityId}`,
    )
  }

  if (barangay.populationReferencePeriod !== municipality.populationReferencePeriod) {
    fail(
      `Population reference period mismatch for ${barangay.name}: expected ${municipality.populationReferencePeriod}, received ${barangay.populationReferencePeriod}`,
    )
  }
}

if (barangays.length !== municipality.barangayCount) {
  fail(
    `Barangay count mismatch: municipality declares ${municipality.barangayCount}, normalized data contains ${barangays.length}`,
  )
}

const barangayPopulationTotal = barangays.reduce(
  (total, barangay) => total + barangay.population,
  0,
)

if (barangayPopulationTotal !== municipality.population) {
  fail(
    `Population total mismatch: municipality declares ${municipality.population}, barangays sum to ${barangayPopulationTotal}`,
  )
}

if (stagedProcurement.reviewStatus !== 'approved') {
  fail('Procurement staging data has not been approved for normalization')
}

if (!sourceIds.has(stagedProcurement.sourceId)) {
  fail(`Unknown procurement dataset source ID: ${stagedProcurement.sourceId}`)
}

for (const record of procurementRecords) {
  validateSourceLink(`procurement record ${record.papCode}`, record.provenance)

  if (record.reportingPeriod !== record.provenance.reportingPeriod) {
    fail(
      `Procurement reporting period mismatch for ${record.papCode}: record uses ${record.reportingPeriod}, provenance uses ${record.provenance.reportingPeriod}`,
    )
  }
}

const stagedIds = new Set(stagedProcurement.records.map((record) => record.id))
const normalizedIds = new Set(procurementRecords.map((record) => record.id))

if (
  stagedIds.size !== normalizedIds.size ||
  [...stagedIds].some((id) => !normalizedIds.has(id))
) {
  fail('Normalized procurement records do not match the approved staging record set')
}

for (const service of services) {
  validateSourceLink(`service ${service.id}`, service.provenance)
}

for (const official of government.officials) {
  validateSourceLink(`government official ${official.id}`, official.provenance)
}

for (const office of government.offices) {
  validateSourceLink(`government office ${office.id}`, office.provenance)
}

for (const contact of emergencyContacts) {
  validateSourceLink(`emergency contact ${contact.id}`, contact.provenance)
}

for (const observation of financialObservations) {
  validateSourceLink(`financial observation ${observation.id}`, observation.provenance)
}

for (const document of documents) {
  validateSourceLink(`document ${document.id}`, document.provenance)
}

for (const project of projects) {
  validateSourceLink(`project ${project.id}`, project.provenance)
}

if (process.exitCode) {
  process.exit(process.exitCode)
}

console.log(
  [
    `Data validation passed: ${registry.length} sources`,
    '1 municipality',
    `${barangays.length} barangays`,
    `${procurementRecords.length} normalized procurement records`,
    `${services.length} services`,
    `${government.officials.length} officials`,
    `${government.offices.length} offices`,
    `${emergencyContacts.length} emergency contacts`,
    `${financialObservations.length} financial observations`,
    `${documents.length} civic documents`,
    `${projects.length} public projects`,
  ].join(', ') + '.',
)
