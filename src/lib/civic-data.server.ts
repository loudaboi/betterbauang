import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { barangayCollectionSchema } from '../domain/civic-data/barangay.ts'
import { municipalitySchema } from '../domain/civic-data/municipality.ts'
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

const sourcesPromise = readJson('data/sources/registry.json').then((data) =>
  sourceRegistrySchema.parse(data),
)

export async function getMunicipality() {
  return municipalityPromise
}

export async function getBarangays() {
  return barangaysPromise
}

export async function getBarangayBySlug(slug: string) {
  const barangays = await getBarangays()
  return barangays.find((barangay) => barangay.slug === slug) ?? null
}

export async function getSourceById(sourceId: string) {
  const sources = await sourcesPromise
  return sources.find((source) => source.id === sourceId) ?? null
}
