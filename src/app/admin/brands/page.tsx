export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageCatalog } from "@/lib/rbac"
import BrandsClient from "./BrandsClient"

export default async function BrandsPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canManageCatalog((session.user as Record<string, unknown>).role as string)) redirect("/admin/dashboard")

  const brands = await prisma.brand.findMany({
    orderBy: { nameEn: "asc" },
    include: { _count: { select: { parts: true } } },
  })

  return (
    <BrandsClient
      brands={brands.map((b) => ({
        id: b.id, slug: b.slug, nameEn: b.nameEn, nameAr: b.nameAr,
        logoUrl: b.logoUrl, partCount: b._count.parts,
      }))}
    />
  )
}
