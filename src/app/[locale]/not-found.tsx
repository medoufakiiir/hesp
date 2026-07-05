"use client"

import { useTranslations } from "next-intl"
import StatusScreen from "@/components/shared/StatusScreen"

// Localized 404 — rendered for notFound() calls anywhere under [locale],
// including the [...rest] catch-all that traps unknown localized paths.
// Client component so translations resolve from NextIntlClientProvider
// without needing request-time locale APIs.
export default function NotFound() {
  const t = useTranslations("errorPages.notFound")

  return (
    <StatusScreen
      code="404"
      eyebrow={t("eyebrow")}
      title={t("title")}
      message={t("message")}
      primary={{ label: t("homeBtn"), href: "/" }}
      secondary={{ label: t("catalogBtn"), href: "/products" }}
    />
  )
}
