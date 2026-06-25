export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canViewCatalog } from "@/lib/rbac"
import { resolvePermissions } from "@/lib/permissions"
import PartsClient from "./PartsClient"

export default async function PartsPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canViewCatalog((session.user as Record<string, unknown>).role as string)) redirect("/admin/dashboard")

  const [parts, categories, brands] = await Promise.all([
    prisma.part.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: { select: { nameEn: true } },
        brand: { select: { nameEn: true } },
        images: { take: 1, select: { url: true } },
      },
    }),
    prisma.category.findMany({ orderBy: { nameEn: "asc" }, select: { id: true, nameEn: true } }),
    prisma.brand.findMany({ orderBy: { nameEn: "asc" }, select: { id: true, nameEn: true } }),
  ])

  const canEdit = (session.user as Record<string, unknown>).role as string !== "SALES"

  return (
    <PartsClient
      parts={parts.map((p) => ({
        id: p.id, sku: p.sku, oemNumber: p.oemNumber,
        nameEn: p.nameEn, nameAr: p.nameAr,
        categoryName: p.category.nameEn, brandName: p.brand?.nameEn || "—",
        categoryId: p.categoryId, brandId: p.brandId,
        listPrice: p.listPrice ? Number(p.listPrice) : null,
        stockQty: p.stockQty, isActive: p.isActive,
        image: p.images[0]?.url || null,
      }))}
      categories={categories}
      brands={brands}
      canEdit={canEdit}
      canExport={(await resolvePermissions("products")).canExport}
    />
  )
}
