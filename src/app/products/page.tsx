import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import ProductsPageClient from "./ProductsPageClient"
import { breadcrumbJsonLd } from "@/lib/seo"
import { getCategoryImage, getProductImage } from "@/data/catalog-assets"

export const metadata: Metadata = {
  title: "Heavy Equipment Spare Parts Catalog | قطع غيار المعدات الثقيلة",
  description: "Browse our complete catalog of heavy equipment spare parts. Excavator, bulldozer, crane, loader, and engine parts for CAT, Komatsu, Volvo, JCB, Hitachi. تصفح كتالوج قطع غيار المعدات الثقيلة.",
  alternates: { canonical: "https://riyada-ventures.com/products" },
}

// Live catalog: ISR every 5 min + on-demand revalidation on admin edits.
export const revalidate = 300

export default async function ProductsPage() {
  const [rawParts, rawCategories, rawBrands] = await Promise.all([
    prisma.part.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      include: { category: true, brand: true, images: { take: 1 } },
    }),
    prisma.category.findMany({ orderBy: { nameEn: "asc" } }),
    prisma.brand.findMany({ orderBy: { nameEn: "asc" } }),
  ])

  const products = rawParts.map((p) => ({
    id: p.id, slug: p.sku, nameEN: p.nameEn, nameAR: p.nameAr,
    descriptionEN: p.descriptionEn || "", descriptionAR: p.descriptionAr || "",
    image: getProductImage(p.images?.[0]?.url, p.category?.slug, p.sku),
    category: p.category?.slug || "", brand: p.brand?.slug || "",
    partNumber: p.sku, inStock: p.stockQty > 0, featured: !!p.listPrice,
  }))
  // Active-part count per category (derived from the parts already fetched)
  // so each card shows a real "N parts" figure instead of 0. Parent/umbrella
  // categories have no direct parts, so roll their children's counts up.
  const ownCount = rawParts.reduce<Record<string, number>>((acc, p) => {
    if (p.categoryId) acc[p.categoryId] = (acc[p.categoryId] ?? 0) + 1
    return acc
  }, {})
  const totalCount: Record<string, number> = { ...ownCount }
  for (const c of rawCategories) {
    if (c.parentId) totalCount[c.parentId] = (totalCount[c.parentId] ?? 0) + (ownCount[c.id] ?? 0)
  }
  const categories = rawCategories.map((c) => ({
    id: c.id, slug: c.slug, nameEN: c.nameEn, nameAR: c.nameAr,
    image: getCategoryImage(c.slug),
    productCount: totalCount[c.id] ?? 0,
  }))
  const brands = rawBrands.map((b) => ({
    id: b.id, slug: b.slug, name: b.nameEn, nameAR: b.nameAr,
  }))

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", url: "/" }, { name: "Products", url: "/products" },
        ])) }}
      />
      <ProductsPageClient
        productsData={JSON.parse(JSON.stringify(products))}
        categoriesData={JSON.parse(JSON.stringify(categories))}
        brandsData={JSON.parse(JSON.stringify(brands))}
      />
    </>
  )
}
