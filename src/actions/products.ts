"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const ProductSchema = z.object({
  nameEN: z.string().min(1),
  nameAR: z.string().min(1),
  descriptionEN: z.string(),
  descriptionAR: z.string(),
  category: z.string().min(1),
  brand: z.string().min(1),
  image: z.string(),
  partNumber: z.string().min(1),
  inStock: z.boolean(),
  featured: z.boolean(),
})

export async function createProduct(data: z.infer<typeof ProductSchema>) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const validated = ProductSchema.parse(data)
  const slug = validated.nameEN.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  await prisma.product.create({ data: { ...validated, slug } })
  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath("/")
}

export async function updateProduct(id: string, data: z.infer<typeof ProductSchema>) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const validated = ProductSchema.parse(data)
  await prisma.product.update({ where: { id }, data: validated })
  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath("/")
}

export async function deleteProduct(id: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  await prisma.product.delete({ where: { id } })
  revalidatePath("/admin/products")
  revalidatePath("/products")
}
