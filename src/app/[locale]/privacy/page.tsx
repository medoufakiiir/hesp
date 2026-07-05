import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { buildMetadata } from "@/lib/seo"
import { privacyDoc } from "@/data/legal/privacy"
import LegalArticle from "@/components/shared/LegalArticle"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: locale === "ar"
      ? "سياسة الخصوصية | ريادة فنتشرز - قطع غيار المعدات الثقيلة"
      : "Privacy Policy | Riyada Ventures - HESP",
    description: locale === "ar"
      ? "سياسة الخصوصية لمنصة HESP وفق نظام حماية البيانات الشخصية السعودي: البيانات التي نجمعها، وأغراض المعالجة، وملفات تعريف الارتباط، ومدد الاحتفاظ، وحقوقكم."
      : "Privacy policy for the HESP platform, aligned with the Saudi Personal Data Protection Law (PDPL): what we collect, why, cookies, retention periods, and your rights.",
    path: "/privacy",
    locale,
  })
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalArticle doc={privacyDoc} locale={locale} />
}
