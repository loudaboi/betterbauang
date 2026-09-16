import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { barangayCollectionSchema } from '../src/domain/civic-data/barangay.ts'
import { municipalitySchema } from '../src/domain/civic-data/municipality.ts'
import { procurementStagingDatasetSchema } from '../src/domain/civic-data/procurement.ts'
import { sourceRegistrySchema } from '../src/domain/civic-data/source.ts'

const root = process.cwd()
const sourceRegistryPath = path.join(root, 'data', 'sources', 'registry.json')
const municipalityPath = path.join(root, 'data', 'normalized', 'municipality.json')
const barangaysPath = path.join(root, 'data', 'normalized', 'barangays.json')
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

const registryResult = sourceRegistrySchema.safeParse(await readJson(sourceRegistryPath))

if (!registryResult.success) {
  console.error('Source registry validation failed:')
  console.error(formatIssues(registryResult.error.issues))
  process.exit(1)
}

const municipalityResult = municipalitySchema.safeParse(await readJson(municipalityPath))

if (!municipalityResult.success) {
  console.error('Municipality validation failed:')
  console.error(formatIssues(municipalityResult.error.issues))
  process.exit(1)
}

const barangaysResult = barangayCollectionSchema.safeParse(await readJson(barangaysPath))

if (!barangaysResult.success) {
  console.error('Barangay validation failed:')
  console.error(formatIssues(barangaysResult.error.issues))
  process.exit(1)
}

const procurementStagingResult = procurementStagingDatasetSchema.safeParse(
  await readJson(procurementStagingPath),
)

if (!procurementStagingResult.success) {
  console.error('Procurement staging validation failed:')
  console.error(formatIssues(procurementStagingResult.error.issues))
  process.exit(1)
}

const sourceIds = new Set(registryResult.data.map((source) => source.id))
const municipality = municipalityResult.data
const barangays = barangaysResult.data
const procurementRecords = procurementStagingResult.data.records

if (!sourceIds.has(municipality.provenance.sourceId)) {
  fail(`Unknown municipality source ID: ${municipality.provenance.sourceId}`)
}

for (const barangay of barangays) {
  if (!sourceIds.has(barangay.provenance.sourceId)) {
    fail(`Unknown source ID for ${barangay.name}: ${barangay.provenance.sourceId}`)
  }

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

if (!sourceIds.has(procurementStagingResult.data.sourceId)) {
  fail(
    `Unknown procurement dataset source ID: ${procurementStagingResult.data.sourceId}`,
  )
}

for (const record of procurementRecords) {
  if (!sourceIds.has(record.provenance.sourceId)) {
    fail(`Unknown procurement source ID for ${record.papCode}: ${record.provenance.sourceId}`)
  }

  if (record.provenance.sourceId !== procurementStagingResult.data.sourceId) {
    fail(
      `Procurement source mismatch for ${record.papCode}: dataset uses ${procurementStagingResult.data.sourceId}, record uses ${record.provenance.sourceId}`,
    )
  }

  if (record.reportingPeriod !== record.provenance.reportingPeriod) {
    fail(
      `Procurement reporting period mismatch for ${record.papCode}: record uses ${record.reportingPeriod}, provenance uses ${record.provenance.reportingPeriod}`,
    )
  }
}

if (process.exitCode) {
  process.exit(process.exitCode)
}

console.log(
  `Data validation passed: ${registryResult.data.length} sources, 1 municipality, ${barangays.length} barangays, ${procurementRecords.length} staged procurement records.`,
)
