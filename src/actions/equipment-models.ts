"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageCatalog } from "@/lib/rbac"

const EquipmentModelSchema = z.object({
  make: z.string().min(1).max(200),
  model: z.string().min(1).max(200),
  year: z.string().max(10).nullable().optional(),
})

async function requireCatalogAccess() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageCatalog((session.user as Record<string, unknown>).role as string)) throw new Error("Forbidden")
  return session
}

export async function createEquipmentModel(data: z.infer<typeof EquipmentModelSchema>) {
  await requireCatalogAccess()
  const validated = EquipmentModelSchema.parse(data)
  await prisma.equipmentModel.create({ data: validated })
  revalidatePath("/admin/equipment-models")
}

export async function updateEquipmentModel(id: string, data: z.infer<typeof EquipmentModelSchema>) {
  await requireCatalogAccess()
  const validated = EquipmentModelSchema.parse(data)
  await prisma.equipmentModel.update({ where: { id }, data: validated })
  revalidatePath("/admin/equipment-models")
}

export async function deleteEquipmentModel(id: string) {
  await requireCatalogAccess()
  await prisma.equipmentModel.delete({ where: { id } })
  revalidatePath("/admin/equipment-models")
}
