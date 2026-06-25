import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import BrandsPageClient from "./BrandsPageClient"
import { breadcrumbJsonLd } from "@/lib/seo"
import { getBrandLogo } from "@/data/catalog-assets"
import { brands as staticBrands } from "@/data/brands"

export const metadata: Metadata = {
  title: "Heavy Equipment Brands | CAT, Komatsu, Volvo Parts | العلامات التجارية",
  description: "Spare parts for all major heavy equipment brands: Caterpillar, Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr, Doosan, Hyundai. قطع غيار لجميع العلامات التجارية الكبرى.",
  alternates: { canonical: "https://riyada-ventures.com/brands" },
}

export default async function BrandsPage() {
  const rawBrands = await prisma.brand.findMany({ orderBy: { nameEn: "asc" } })
  const brands = rawBrands.map((b) => {
    // The DB Brand model only stores name/slug/logo. The rich copy (description,
    // country, founded) lives in the static catalog — merge it in by slug so the
    // cards aren't rendered with empty bodies.
    const meta = staticBrands.find((s) => s.slug === b.slug)
      || staticBrands.find((s) => s.name.toLowerCase() === b.nameEn.toLowerCase())
    return {
      id: b.id, slug: b.slug, name: b.nameEn, nameAR: b.nameAr,
      logo: getBrandLogo(b.slug, b.logoUrl) ?? "",
      description: meta?.descriptionEN ?? "",
      descriptionAR: meta?.descriptionAR ?? "",
      country: meta?.country ?? "",
      founded: meta?.founded ?? "",
      categories: meta?.categories ?? [],
    }
  })

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
