import type { Metadata } from "next"
import QuotePageClient from "./QuotePageClient"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: "Request a Quote | Heavy Equipment Parts | HESP",
    description: "Request a quote for heavy equipment spare parts. Get competitive pricing on CAT, Komatsu, Volvo, JCB, Hitachi parts. Fast response within 2 hours. طلب عرض سعر لقطع غيار المعدات الثقيلة.",
    path: "/quote",
    locale,
    keywords: [
      "request a quote heavy equipment parts",
      "heavy equipment spare parts supplier Saudi Arabia",
      "Caterpillar parts Saudi Arabia",
      "Komatsu spare parts KSA",
      "B2B heavy equipment parts",
      "طلب عرض سعر قطع غيار",
      "عرض سعر قطع غيار معدات ثقيلة",
    ],
  })
}

export default function QuotePage() {
  return <QuotePageClient />
}
