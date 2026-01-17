import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  try {
    return {
      locale,
      messages: (await import(`./${locale}.json`)).default,
    }
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error)
    // Fallback to default locale
    return {
      locale: routing.defaultLocale,
      messages: (await import(`./${routing.defaultLocale}.json`)).default,
    }
  }
})