import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: "Contact Us | Heavy Equipment Parts Riyadh | HESP",
    description: "Contact Riyada Ventures for heavy equipment spare parts in Saudi Arabia. WhatsApp +966 55 228 2868, Riyadh office, fast response. تواصل معنا لقطع غيار المعدات الثقيلة.",
    path: "/contact",
    locale,
    keywords: [
      "heavy equipment spare parts supplier Saudi Arabia",
      "construction equipment parts Riyadh",
      "contact heavy equipment parts supplier",
      "B2B heavy equipment parts",
      "تواصل معنا",
      "موردي قطع غيار معدات ثقيلة الرياض",
    ],
  })
}

export default function ContactPage() {
  return <ContactPageClient />
}
