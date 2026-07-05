import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import ForbiddenClient from "./ForbiddenClient"

// Landing page for authenticated admin users whose role can't access a
// section (see FORBIDDEN_ROUTE in @/lib/rbac). Never indexed, never in the
// sitemap.
export const metadata: Metadata = {
  title: "403 — Access Denied | الوصول مرفوض",
  robots: { index: false, follow: false },
}

export default async function ForbiddenPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ForbiddenClient />
}
