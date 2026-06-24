export const revalidate = 3600
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { categories as staticCategories } from "@/data/categories"
import { breadcrumbJsonLd } from "@/lib/seo"
import CategoryPageClient from "./CategoryPageClient"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const sc = staticCategories.find((c) => c.slug === slug)
  const dbCat = !sc ? await prisma.category.findUnique({ where: { slug } }) : null
  if (!sc && !dbCat) return {}

  const title = sc?.metaTitleEN || `${dbCat?.nameEn} | Heavy Equipment Spare Parts`
  const desc = sc?.metaDescEN || `Browse ${dbCat?.nameEn} spare parts for heavy equipment.`
  return {
    title, description: desc,
    alternates: { canonical: `https://riyada-ventures.com/products/${slug}` },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const sc = staticCategories.find((c) => c.slug === slug)
  const dbCat = await prisma.category.findUnique({ where: { slug } })
  if (!sc && !dbCat) notFound()

  const category = sc || {
    id: dbCat!.id, slug: dbCat!.slug,
    nameEN: dbCat!.nameEn, nameAR: dbCat!.nameAr,
    descriptionEN: "", descriptionAR: "", image: "", icon: "",
    metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "",
    keywordsEN: [] as string[], keywordsAR: [] as string[], productCount: 0,
  }

  const rawParts = await prisma.part.findMany({
    where: { isActive: true, category: { slug } },
    include: { brand: true, images: { take: 1 } },
  })
  const categoryProducts = rawParts.map((p) => ({
    id: p.id, slug: p.sku, nameEN: p.nameEn, nameAR: p.nameAr,
    descriptionEN: p.descriptionEn || "", descriptionAR: p.descriptionAr || "",
    image: p.images?.[0]?.url || "/images/equipment/gear-parts.jpg",
    category: slug, brand: p.brand?.slug || "",
    partNumber: p.sku, inStock: p.stockQty > 0, featured: !!p.listPrice,
  }))

  const rawOther = await prisma.category.findMany({ where: { slug: { not: slug } } })
  const otherCategories = rawOther.map((c) => {
    const s = staticCategories.find((sc) => sc.slug === c.slug)
    return s || {
      id: c.id, slug: c.slug,
      nameEN: c.nameEn, nameAR: c.nameAr,
      descriptionEN: "", descriptionAR: "", image: "", icon: "",
      metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "",
      keywordsEN: [] as string[], keywordsAR: [] as string[], productCount: 0,
    }
  })

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products" },
            { name: category.nameEN, url: `/products/${slug}` },
          ])),
        }}
      />
      <CategoryPageClient category={category} products={categoryProducts} otherCategories={otherCategories} />
    </>
  )
}
