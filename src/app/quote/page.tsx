import type { Metadata } from "next"
import QuotePageClient from "./QuotePageClient"

export const metadata: Metadata = {
  title: "Request a Quote | طلب عرض سعر | Heavy Equipment Spare Parts",
  description: "Request a quote for heavy equipment spare parts. Get competitive pricing on CAT, Komatsu, Volvo, JCB, Hitachi parts. Fast response within 2 hours. طلب عرض سعر لقطع غيار المعدات الثقيلة.",
  alternates: { canonical: "https://riyada-ventures.com/quote" },
}

export default function QuotePage() {
  return <QuotePageClient />
}
