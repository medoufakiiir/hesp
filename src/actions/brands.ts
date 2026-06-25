"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageCatalog } from "@/lib/rbac"

const BrandSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  nameEn: z.string().min(1).max(200),
  nameAr: z.string().min(1).max(200),
  logoUrl: z.string().max(500).nullable().optional(),
})

async function requireCatalogAccess() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageCatalog((session.user as Record<string, unknown>).role as string)) throw new Error("Forbidden")
  return session
}

export async function createBrand(data: z.infer<typeof BrandSchema>) {
  await requireCatalogAccess()
  const validated = BrandSchema.parse(data)
  await prisma.brand.create({ data: validated })
  revalidatePath("/admin/brands")
}

export async function updateBrand(id: string, data: z.infer<typeof BrandSchema>) {
  await requireCatalogAccess()
  const validated = BrandSchema.parse(data)
  await prisma.brand.update({ where: { id }, data: validated })
  revalidatePath("/admin/brands")
}

export async function deleteBrand(id: string) {
  await requireCatalogAccess()
  const hasParts = await prisma.part.count({ where: { brandId: id } })
  if (hasParts > 0) throw new Error("Cannot delete brand with parts")
  await prisma.brand.delete({ where: { id } })
  revalidatePath("/admin/brands")
}
