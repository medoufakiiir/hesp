import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: "About Riyada Ventures | Heavy Equipment Parts Supplier",
    description: "Learn about Riyada Ventures — Saudi Arabia's trusted heavy equipment spare parts supplier. Our mission, vision, and commitment to the Saudi industrial sector. عن ريادة فنتشرز.",
    path: "/about",
    locale,
    keywords: [
      "heavy equipment spare parts supplier Saudi Arabia",
      "B2B heavy equipment parts",
      "OEM heavy machinery parts",
      "heavy machinery parts Saudi Arabia",
      "trusted spare parts supplier Riyadh",
      "موردي قطع غيار معدات ثقيلة",
      "عن ريادة فنتشرز",
      "شركة قطع غيار معدات ثقيلة السعودية",
    ],
  })
}

export default function AboutPage() {
  return <AboutPageClient />
}
