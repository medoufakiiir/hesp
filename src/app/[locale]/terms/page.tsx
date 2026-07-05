import type { Metadata } from "next"
import { setRequestLocale } from "next-intl/server"
import { buildMetadata } from "@/lib/seo"
import { termsDoc } from "@/data/legal/terms"
import LegalArticle from "@/components/shared/LegalArticle"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: locale === "ar"
      ? "شروط الاستخدام | ريادة فنتشرز - قطع غيار المعدات الثقيلة"
      : "Terms of Service | Riyada Ventures - HESP",
    description: locale === "ar"
      ? "شروط استخدام منصة HESP لتوريد قطع غيار المعدات الثقيلة في السعودية: الطلبات وعروض الأسعار، الأسعار والدفع، الشحن، الإرجاع والضمان، والقانون الواجب التطبيق."
      : "Terms of service for the HESP heavy equipment spare parts platform in Saudi Arabia: ordering and quotations, pricing and payment, delivery, returns and warranty, and governing law.",
    path: "/terms",
    locale,
  })
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <LegalArticle doc={termsDoc} locale={locale} />
}
