export const supportedLocales = ['en', 'fil', 'ilo'] as const

export type SupportedLocale = (typeof supportedLocales)[number]

export const defaultLocale: SupportedLocale = 'en'

export const publicLocales: readonly SupportedLocale[] = ['en']

export const localeLabels: Record<SupportedLocale, string> = {
  en: 'English',
  fil: 'Filipino',
  ilo: 'Ilocano',
}

export function isPublicLocale(locale: string): locale is SupportedLocale {
  return publicLocales.includes(locale as SupportedLocale)
}
