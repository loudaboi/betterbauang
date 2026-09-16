import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

import { normalizedRecordBaseSchema } from '../src/domain/civic-data/provenance.ts'
import { sourceRegistrySchema } from '../src/domain/civic-data/source.ts'

const root = process.cwd()
const sourceRegistryPath = path.join(root, 'data', 'sources', 'registry.json')
const normalizedRoot = path.join(root, 'data', 'normalized')

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

async function findJsonFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      files.push(...(await findJsonFiles(entryPath)))
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.json')) {
      files.push(entryPath)
    }
  }

  return files
}

function formatIssues(issues) {
  return issues
    .map((issue) => {
      const location = issue.path.length > 0 ? issue.path.join('.') : 'root'
      return `  - ${location}: ${issue.message}`
    })
    .join('\n')
}

const registryJson = await readJson(sourceRegistryPath)
const registryResult = sourceRegistrySchema.safeParse(registryJson)

if (!registryResult.success) {
  console.error('Source registry validation failed:')
  console.error(formatIssues(registryResult.error.issues))
  process.exit(1)
}

const sourceIds = new Set(registryResult.data.map((source) => source.id))
const normalizedFiles = await findJsonFiles(normalizedRoot)

let recordCount = 0
let hasErrors = false

for (const filePath of normalizedFiles) {
  const json = await readJson(filePath)
  const records = Array.isArray(json) ? json : [json]

  records.forEach((record, index) => {
    const result = normalizedRecordBaseSchema.safeParse(record)
    const displayPath = path.relative(root, filePath)
    const recordLabel = records.length > 1 ? `${displayPath}[${index}]` : displayPath

    if (!result.success) {
      hasErrors = true
      console.error(`Invalid normalized record: ${recordLabel}`)
      console.error(formatIssues(result.error.issues))
      return
    }

    if (!sourceIds.has(result.data.provenance.sourceId)) {
      hasErrors = true
      console.error(
        `Unknown source ID in ${recordLabel}: ${result.data.provenance.sourceId}`,
      )
      return
    }

    recordCount += 1
  })
}

if (hasErrors) {
  process.exit(1)
}

console.log(
  `Data validation passed: ${registryResult.data.length} sources, ${recordCount} normalized records.`,
)
