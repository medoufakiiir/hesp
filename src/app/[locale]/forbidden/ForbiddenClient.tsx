"use client"

import { useTranslations } from "next-intl"
import StatusScreen from "@/components/shared/StatusScreen"

export default function ForbiddenClient() {
  const t = useTranslations("errorPages.forbidden")

  return (
    <StatusScreen
      code="403"
      eyebrow={t("eyebrow")}
      title={t("title")}
      message={t("message")}
      primary={{ label: t("homeBtn"), href: "/" }}
      // /admin lives outside the [locale] segment — must bypass the locale-aware Link.
      secondary={{ label: t("dashboardBtn"), href: "/admin/dashboard", plain: true }}
    />
  )
}
