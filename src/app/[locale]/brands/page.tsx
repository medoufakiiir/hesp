import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import BrandsPageClient from "./BrandsPageClient"
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo"
import { getBrandLogo } from "@/data/catalog-assets"
import { brands as staticBrands } from "@/data/brands"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return buildMetadata({
    title: "Heavy Equipment Brands | CAT, Komatsu, Volvo | HESP",
    description: "Spare parts for all major heavy equipment brands: Caterpillar, Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr, Doosan, Hyundai. قطع غيار لجميع العلامات التجارية الكبرى.",
    path: "/brands",
    locale,
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
}

// Live catalog: ISR every 5 min + on-demand revalidation on admin edits.
export const revalidate = 300

export default async function BrandsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  let rawBrands: { id: string; slug: string; nameEn: string; nameAr: string; logoUrl: string | null }[] = []
  if (!process.env.DATABASE_URL) {
    // Fallback to the bundled static brands catalog when DATABASE_URL is not provided
    // (e.g. first deploy on a fresh Vercel account before env vars are added).
    rawBrands = staticBrands.map((b) => ({
      id: b.id, slug: b.slug, nameEn: b.name, nameAr: b.nameAR, logoUrl: null,
    }))
  } else {
    rawBrands = await prisma.brand.findMany({ orderBy: { nameEn: "asc" } })
  }

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale, [
          { name: "Home", url: "/" }, { name: "Brands", url: "/brands" },
        ])) }}
      />
      <BrandsPageClient brandsData={JSON.parse(JSON.stringify(brands))} />
    </>
  )
}
