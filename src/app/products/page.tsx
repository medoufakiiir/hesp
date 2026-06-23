import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import ProductsPageClient from "./ProductsPageClient"
import { breadcrumbJsonLd } from "@/lib/seo"

export const metadata: Metadata = {
  title: "Heavy Equipment Spare Parts Catalog | قطع غيار المعدات الثقيلة",
  description: "Browse our complete catalog of heavy equipment spare parts. Excavator, bulldozer, crane, loader, and engine parts for CAT, Komatsu, Volvo, JCB, Hitachi. تصفح كتالوج قطع غيار المعدات الثقيلة.",
  alternates: { canonical: "https://riyada-ventures.com/products" },
}

export default async function ProductsPage() {
  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { nameEN: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ])

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
