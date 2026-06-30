import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import BrandsPageClient from "./BrandsPageClient"
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo"
import { getBrandLogo } from "@/data/catalog-assets"
import { brands as staticBrands } from "@/data/brands"

export const metadata: Metadata = buildMetadata({
  title: "Heavy Equipment Brands | CAT, Komatsu, Volvo | HESP",
  description: "Spare parts for all major heavy equipment brands: Caterpillar, Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr, Doosan, Hyundai. قطع غيار لجميع العلامات التجارية الكبرى.",
  path: "/brands",
  keywords: [
    "Caterpillar parts Saudi Arabia",
    "Komatsu spare parts KSA",
    "Volvo CE parts Saudi Arabia",
    "JCB parts Saudi Arabia",
    "Hitachi parts Saudi Arabia",
    "John Deere parts Saudi Arabia",
    "Liebherr parts Saudi Arabia",
    "heavy machinery parts Saudi Arabia",
    "OEM heavy machinery parts",
    "B2B heavy equipment parts",
    "قطع غيار كاتربيلر السعودية",
    "قطع غيار كوماتسو",
    "علامات تجارية معدات ثقيلة",
  ],
})

// Live catalog: ISR every 5 min + on-demand revalidation on admin edits.
export const revalidate = 300

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
