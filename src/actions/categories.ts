"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageCatalog } from "@/lib/rbac"

const CategorySchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  nameEn: z.string().min(1).max(200),
  nameAr: z.string().min(1).max(200),
  parentId: z.string().nullable().optional(),
})

async function requireCatalogAccess() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageCatalog((session.user as any).role)) throw new Error("Forbidden")
  return session
}

export async function createCategory(data: z.infer<typeof CategorySchema>) {
  await requireCatalogAccess()
  const validated = CategorySchema.parse(data)
  await prisma.category.create({ data: validated })
  revalidatePath("/admin/categories")
}

export async function updateCategory(id: string, data: z.infer<typeof CategorySchema>) {
  await requireCatalogAccess()
  const validated = CategorySchema.parse(data)
  await prisma.category.update({ where: { id }, data: validated })
  revalidatePath("/admin/categories")
}

export async function deleteCategory(id: string) {
  await requireCatalogAccess()
  const hasChildren = await prisma.category.count({ where: { parentId: id } })
  if (hasChildren > 0) throw new Error("Cannot delete category with subcategories")
  const hasParts = await prisma.part.count({ where: { categoryId: id } })
  if (hasParts > 0) throw new Error("Cannot delete category with parts")
  await prisma.category.delete({ where: { id } })
  revalidatePath("/admin/categories")
}
