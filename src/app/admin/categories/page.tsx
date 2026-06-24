export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageCatalog } from "@/lib/rbac"
import CategoriesClient from "./CategoriesClient"

export default async function CategoriesPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canManageCatalog((session.user as any).role)) redirect("/admin/dashboard")

  const categories = await prisma.category.findMany({
    orderBy: { nameEn: "asc" },
    include: { parent: { select: { nameEn: true } }, _count: { select: { parts: true, children: true } } },
  })

  return (
    <CategoriesClient
      categories={categories.map((c) => ({
        id: c.id, slug: c.slug, nameEn: c.nameEn, nameAr: c.nameAr,
        parentId: c.parentId, parentName: c.parent?.nameEn || null,
        partCount: c._count.parts, childCount: c._count.children,
      }))}
      allCategories={categories.map((c) => ({ id: c.id, nameEn: c.nameEn }))}
    />
  )
}
