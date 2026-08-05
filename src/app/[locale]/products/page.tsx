import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import ProductsPageClient from "./ProductsPageClient"
import { breadcrumbJsonLd, buildMetadata, productListJsonLd } from "@/lib/seo"
import { getCategoryImage, getProductImage } from "@/data/catalog-assets"
import { products as fallbackProducts } from "@/data/products"
import { categories as fallbackCategories } from "@/data/categories"
import { brands as fallbackBrands } from "@/data/brands"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isAr = locale === "ar"
  return buildMetadata({
    title: isAr
      ? "كتالوج قطع غيار المعدات الثقيلة | ريادة فنتشرز HESP"
      : "Heavy Equipment Spare Parts Catalog | HESP",
    description: isAr
      ? "تصفح كتالوج قطع غيار المعدات الثقيلة الكامل: قطع حفارات وجرافات ورافعات ولودرات ومحركات لكاتربيلر وكوماتسو وفولفو وJCB وهيتاشي. توصيل سريع في جميع أنحاء المملكة."
      : "Browse our complete catalog of heavy equipment spare parts. Excavator, bulldozer, crane, loader, and engine parts for CAT, Komatsu, Volvo, JCB, Hitachi. تصفح كتالوج قطع غيار المعدات الثقيلة.",
    path: "/products",
    locale,
    keywords: [
      "heavy equipment spare parts catalog",
      "construction equipment parts Riyadh",
      "undercarriage parts",
      "ground engaging tools",
      "engine and transmission parts",
      "excavator parts supplier",
      "bulldozer parts Riyadh",
      "crane parts Saudi Arabia",
      "loader parts catalog",
      "OEM heavy machinery parts",
      "aftermarket heavy equipment parts KSA",
      "قطع غيار المعدات الثقيلة",
      "كتالوج قطع غيار معدات ثقيلة",
      "قطع غيار الحفارات",
      "قطع غيار الجرافات",
    ],
  })
}

// Live catalog: ISR every 5 min + on-demand revalidation on admin edits.
export const revalidate = 300

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
let rawParts: any[] = []
  let rawCategories: any[] = []
  let rawBrands: any[] = []

  if (!process.env.DATABASE_URL) {
    // Fallback to the bundled static catalog when DATABASE_URL is not provided
    // (e.g. first deploy on a fresh Vercel account before env vars are added).
    rawParts = fallbackProducts.map((p) => ({
      id: p.id, sku: p.partNumber, nameEn: p.nameEN, nameAr: p.nameAR,
      descriptionEn: p.descriptionEN || null, descriptionAr: p.descriptionAR || null,
      category: { slug: p.category }, brand: { slug: p.brand }, images: [],
      stockQty: p.inStock ? 10 : 0, listPrice: p.featured ? 100 : null, categoryId: p.category,
    }))
    rawCategories = fallbackCategories.map((c) => ({
      id: c.id, slug: c.slug, nameEn: c.nameEN, nameAr: c.nameAR,
      parentId: null, image: c.image,
    }))
    rawBrands = fallbackBrands.map((b) => ({
      id: b.id, slug: b.slug, nameEn: b.name, nameAr: b.nameAR,
    }))
  } else {
    const results = await Promise.all([
      prisma.part.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "desc" },
        include: { category: true, brand: true, images: { take: 1 } },
      }),
      prisma.category.findMany({ orderBy: { nameEn: "asc" } }),
      prisma.brand.findMany({ orderBy: { nameEn: "asc" } }),
    ])
    rawParts = results[0]
    rawCategories = results[1]
    rawBrands = results[2]
  }

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
  const brandNameBySlug = new Map(brands.map((b) => [b.slug, b.name]))

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale, [
          { name: "Home", url: "/" }, { name: "Products", url: "/products" },
        ])) }}
      />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd(locale, products.map((p) => ({
          name: p.nameEN,
          url: `/products/${p.category}`,
          image: p.image,
          sku: p.partNumber,
          brand: brandNameBySlug.get(p.brand),
          inStock: p.inStock,
        })))) }}
      />
      <ProductsPageClient
        productsData={JSON.parse(JSON.stringify(products))}
        categoriesData={JSON.parse(JSON.stringify(categories))}
        brandsData={JSON.parse(JSON.stringify(brands))}
      />
    </>
  )
}
