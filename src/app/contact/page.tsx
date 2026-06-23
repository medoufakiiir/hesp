import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Riyada Ventures | اتصل بنا | Heavy Equipment Parts Saudi Arabia",
  description: "Contact Riyada Ventures for heavy equipment spare parts in Saudi Arabia. WhatsApp +966 55 228 2868, email info@riyada-ventures.com. Riyadh office. تواصل معنا.",
  alternates: { canonical: "https://riyada-ventures.com/contact" },
}

export default function ContactPage() {
  return <ContactPageClient />
}
