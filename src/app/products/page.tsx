import type { Metadata } from "next"
import ProductsPageClient from "./ProductsPageClient"
import { breadcrumbJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Heavy Equipment Spare Parts Catalog | قطع غيار المعدات الثقيلة",
  description: "Browse our complete catalog of heavy equipment spare parts. Excavator, bulldozer, crane, loader, and engine parts for CAT, Komatsu, Volvo, JCB, Hitachi. تصفح كتالوج قطع غيار المعدات الثقيلة.",
  alternates: { canonical: "https://riyada-ventures.com/products" },
  openGraph: {
    title: "Heavy Equipment Spare Parts Catalog | Riyada Ventures",
    description: "Complete catalog of spare parts for all heavy equipment brands and categories.",
  },
}

export default function ProductsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
            ])
          ),
        }}
      />
      <ProductsPageClient />
    </>
  )
}
