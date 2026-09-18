export function toTelHref(value: string) {
  return `tel:${value.replace(/[^\d+]/g, '')}`
}
