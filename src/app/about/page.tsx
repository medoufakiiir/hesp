import type { Metadata } from "next"
import AboutPageClient from "./AboutPageClient"

export const metadata: Metadata = {
  title: "About Riyada Ventures | عن ريادة فنتشرز | Heavy Equipment Parts Supplier",
  description: "Learn about Riyada Ventures — Saudi Arabia's trusted heavy equipment spare parts supplier since 2009. Our mission, vision, and commitment to the Saudi industrial sector.",
  alternates: { canonical: "https://riyada-ventures.com/about" },
}

export default function AboutPage() {
  return <AboutPageClient />
}
