export const revalidate = 3600
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { categories as staticCategories } from "@/data/categories"
import { breadcrumbJsonLd } from "@/lib/seo"
import { getCategoryImage, getProductImage } from "@/data/catalog-assets"
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

  const category = {
    ...(sc || {
      id: dbCat!.id, slug: dbCat!.slug,
      nameEN: dbCat!.nameEn, nameAR: dbCat!.nameAr,
      descriptionEN: "", descriptionAR: "", icon: "",
      metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "",
      keywordsEN: [] as string[], keywordsAR: [] as string[], productCount: 0,
    }),
    image: getCategoryImage(slug),
  }

  // Match the category itself OR (when it's a parent) any of its child categories,
  // so a top-level page like /products/filters shows all oil/fuel/air/hydraulic filters.
  const rawParts = await prisma.part.findMany({
    where: { isActive: true, category: { OR: [{ slug }, { parent: { slug } }] } },
    include: { brand: true, category: true, images: { take: 1 } },
  })
  const categoryProducts = rawParts.map((p) => ({
    id: p.id, slug: p.sku, nameEN: p.nameEn, nameAR: p.nameAr,
    descriptionEN: p.descriptionEn || "", descriptionAR: p.descriptionAr || "",
    image: getProductImage(p.images?.[0]?.url, p.category?.slug, p.sku),
    category: p.category?.slug || slug, brand: p.brand?.slug || "",
    partNumber: p.sku, inStock: p.stockQty > 0, featured: !!p.listPrice,
  }))

  const rawOther = await prisma.category.findMany({ where: { slug: { not: slug } } })
  const otherCategories = rawOther.map((c) => {
    const s = staticCategories.find((sc) => sc.slug === c.slug)
    return {
      ...(s || {
        id: c.id, slug: c.slug,
        nameEN: c.nameEn, nameAR: c.nameAr,
        descriptionEN: "", descriptionAR: "", icon: "",
        metaTitleEN: "", metaTitleAR: "", metaDescEN: "", metaDescAR: "",
        keywordsEN: [] as string[], keywordsAR: [] as string[], productCount: 0,
      }),
      image: getCategoryImage(c.slug),
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
