import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import BrandsPageClient from "./BrandsPageClient"
import { breadcrumbJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Heavy Equipment Brands | CAT, Komatsu, Volvo Parts | العلامات التجارية",
  description: "Spare parts for all major heavy equipment brands: Caterpillar, Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr, Doosan, Hyundai. قطع غيار لجميع العلامات التجارية الكبرى.",
  alternates: { canonical: "https://riyada-ventures.com/brands" },
}

export default async function BrandsPage() {
  const rawBrands = await prisma.brand.findMany({ orderBy: { nameEn: "asc" } })
  const brands = rawBrands.map((b) => ({
    id: b.id, slug: b.slug, name: b.nameEn, nameAR: b.nameAr,
    logo: b.logoUrl || "",
  }))

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", url: "/" }, { name: "Brands", url: "/brands" },
        ])) }}
      />
      <BrandsPageClient brandsData={JSON.parse(JSON.stringify(brands))} />
    </>
  )
}
