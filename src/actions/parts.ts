"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageCatalog, canDelete } from "@/lib/rbac"
import { revalidateCatalog } from "@/lib/revalidate"

const PartSchema = z.object({
  sku: z.string().min(1).max(100),
  oemNumber: z.string().max(100).nullable().optional(),
  nameEn: z.string().min(1).max(200),
  nameAr: z.string().min(1).max(200),
  descriptionEn: z.string().max(5000).nullable().optional(),
  descriptionAr: z.string().max(5000).nullable().optional(),
  categoryId: z.string().min(1),
  brandId: z.string().nullable().optional(),
  listPrice: z.number().nonnegative().nullable().optional(),
  stockQty: z.number().int().nonnegative().default(0),
  isActive: z.boolean().default(true),
})

async function requireCatalogAccess() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageCatalog((session.user as Record<string, unknown>).role as string)) throw new Error("Forbidden")
  return session
}

export async function createPart(data: z.infer<typeof PartSchema>) {
  await requireCatalogAccess()
  const validated = PartSchema.parse(data)
  await prisma.part.create({ data: validated })
  revalidatePath("/admin/parts")
  revalidateCatalog()
}

export async function updatePart(id: string, data: z.infer<typeof PartSchema>) {
  await requireCatalogAccess()
  const validated = PartSchema.parse(data)
  await prisma.part.update({ where: { id }, data: validated })
  revalidatePath("/admin/parts")
  revalidateCatalog()
}

export async function deletePart(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canDelete((session.user as Record<string, unknown>).role as string)) throw new Error("Forbidden")
  await prisma.part.delete({ where: { id } })
  revalidatePath("/admin/parts")
  revalidateCatalog()
}
