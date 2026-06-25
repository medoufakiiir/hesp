export const revalidate = 3600
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { brands as staticBrands } from "@/data/brands"
import { breadcrumbJsonLd } from "@/lib/seo"
import { getCategoryImage, getProductImage } from "@/data/catalog-assets"
import BrandPageClient from "./BrandPageClient"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const brand = staticBrands.find((b) => b.slug === slug)
    || await prisma.brand.findUnique({ where: { slug } })
  if (!brand) return {}

  const name = "name" in brand ? brand.name : (brand as any).nameEn
  return {
    title: ("metaTitleEN" in brand && brand.metaTitleEN) || `${name} Parts | Heavy Equipment Spare Parts`,
    description: ("metaDescEN" in brand && brand.metaDescEN) || `Browse ${name} spare parts for heavy equipment.`,
    alternates: { canonical: `https://riyada-ventures.com/brands/${slug}` },
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const staticBrand = staticBrands.find((b) => b.slug === slug)
  const dbBrand = await prisma.brand.findUnique({ where: { slug } })
  if (!staticBrand && !dbBrand) notFound()

  const brand = staticBrand || {
    id: dbBrand!.id,
    slug: dbBrand!.slug,
    name: dbBrand!.nameEn,
    nameAR: dbBrand!.nameAr,
    descriptionEN: "",
    descriptionAR: "",
    country: "",
    founded: "",
    metaTitleEN: "",
    metaTitleAR: "",
    metaDescEN: "",
    metaDescAR: "",
    categories: [] as string[],
  }

  const rawParts = await prisma.part.findMany({
    where: { isActive: true, brand: { slug } },
    include: { category: true, images: { take: 1 } },
  })
  const brandProducts = rawParts.map((p) => ({
    id: p.id, slug: p.sku, nameEN: p.nameEn, nameAR: p.nameAr,
    descriptionEN: p.descriptionEn || "", descriptionAR: p.descriptionAr || "",
    image: getProductImage(p.images?.[0]?.url, p.category?.slug, p.sku),
    category: p.category?.slug || "", brand: slug,
    partNumber: p.sku, inStock: p.stockQty > 0, featured: !!p.listPrice,
  }))

  const relatedCatSlugs = brand.categories || []
  const relatedCategories = relatedCatSlugs.length > 0
    ? (await prisma.category.findMany({ where: { slug: { in: relatedCatSlugs } } }))
        .map(c => ({
          id: c.id, slug: c.slug, nameEN: c.nameEn, nameAR: c.nameAr,
          descriptionEN: "", descriptionAR: "", image: getCategoryImage(c.slug), icon: "",
          metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "",
          keywordsEN: [] as string[], keywordsAR: [] as string[], productCount: 0,
        }))
    : []

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
          { name: brand.name, url: `/brands/${slug}` },
        ])) }}
      />
      <BrandPageClient brand={brand} products={brandProducts} relatedCategories={relatedCategories} />
    </>
  )
}
