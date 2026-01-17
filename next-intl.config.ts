import { getRequestConfig } from "next-intl/server"
import { routing } from "./i18n/routing"

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: (
      await (locale === "en"
        ? import("./i18n/en.json")
        : locale === "fr"
          ? import("./i18n/fr.json")
          : import("./i18n/ar.json"))
    ).default,
  }
})
