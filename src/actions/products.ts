"use server"

import { auth } from "@/lib/auth"
import { z } from "zod"
import { canManageProducts, canDelete } from "@/lib/rbac"

const ProductSchema = z.object({
  nameEN: z.string().min(1).max(200),
  nameAR: z.string().min(1).max(200),
  descriptionEN: z.string().max(2000),
  descriptionAR: z.string().max(2000),
  category: z.string().min(1).max(100),
  brand: z.string().min(1).max(100),
  image: z.string().max(500),
  partNumber: z.string().min(1).max(100),
  inStock: z.boolean(),
  featured: z.boolean(),
})

type ProductInput = z.infer<typeof ProductSchema>

async function requireRole(minRole: "manager" | "super_admin") {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as Record<string, unknown>).role as string
  if (minRole === "manager" && !canManageProducts(role)) throw new Error("Forbidden")
  if (minRole === "super_admin" && !canDelete(role)) throw new Error("Forbidden")
  return session
}

export async function createProduct(_data: ProductInput) {
  await requireRole("manager")
}

export async function updateProduct(_id: string, _data: ProductInput) {
  await requireRole("manager")
}

export async function deleteProduct(_id: string) {
  await requireRole("super_admin")
}
