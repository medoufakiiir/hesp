export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import AdminProductsClient from "./AdminProductsClient"

export default async function AdminProductsPage() {
  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.category.findMany({ orderBy: { nameEN: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <AdminProductsClient
      products={products.map((p) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() }))}
      categories={categories.map((c) => ({ id: c.id, slug: c.slug, nameEN: c.nameEN, nameAR: c.nameAR }))}
      brands={brands.map((b) => ({ id: b.id, slug: b.slug, name: b.name, nameAR: b.nameAR }))}
    />
  )
}
