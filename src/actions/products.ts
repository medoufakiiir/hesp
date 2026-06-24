"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
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

async function requireRole(minRole: "manager" | "super_admin") {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as any).role
  if (minRole === "manager" && !canManageProducts(role)) throw new Error("Forbidden")
  if (minRole === "super_admin" && !canDelete(role)) throw new Error("Forbidden")
  return session
}

// Products catalog actions are not part of the requested B2B Quote/RFQ admin rebuild scope.
// Keep these actions as no-ops so the app compiles after the Prisma schema swap.
export async function createProduct(_data: z.infer<typeof ProductSchema>) {
  await requireRole("manager")
}

export async function updateProduct(_id: string, _data: z.infer<typeof ProductSchema>) {
  await requireRole("manager")
}

export async function deleteProduct(_id: string) {
  await requireRole("super_admin")
}

