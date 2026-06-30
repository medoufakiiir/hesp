import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Every locale gets a URL prefix (including English at /en/...) so the bare
  // domain never serves ambiguous, duplicate-content pages to crawlers.
  localePrefix: "always",
})
