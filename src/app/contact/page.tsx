import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"
import { buildMetadata } from "@/lib/seo"

export const metadata: Metadata = buildMetadata({
  title: "Contact Us | Heavy Equipment Parts Riyadh | HESP",
  description: "Contact Riyada Ventures for heavy equipment spare parts in Saudi Arabia. WhatsApp +966 55 228 2868, Riyadh office, fast response. تواصل معنا لقطع غيار المعدات الثقيلة.",
  path: "/contact",
  keywords: [
    "heavy equipment spare parts supplier Saudi Arabia",
    "construction equipment parts Riyadh",
    "contact heavy equipment parts supplier",
    "B2B heavy equipment parts",
    "تواصل معنا",
    "موردي قطع غيار معدات ثقيلة الرياض",
  ],
})

export default function ContactPage() {
  return <ContactPageClient />
}
