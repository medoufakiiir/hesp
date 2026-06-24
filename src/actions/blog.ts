"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageProducts, canDelete } from "@/lib/rbac"

const BlogSchema = z.object({
  titleEN: z.string().min(1).max(300),
  titleAR: z.string().min(1).max(300),
  excerptEN: z.string().max(500),
  excerptAR: z.string().max(500),
  contentEN: z.string().min(1),
  contentAR: z.string(),
  image: z.string().max(500),
  date: z.string(),
  author: z.string().max(100),
  tags: z.array(z.string().max(50)),
  metaTitleEN: z.string().max(200),
  metaTitleAR: z.string().max(200),
  metaDescEN: z.string().max(500),
  metaDescAR: z.string().max(500),
})

async function requireRole(minRole: "manager" | "super_admin") {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as any).role
  if (minRole === "manager" && !canManageProducts(role)) throw new Error("Forbidden")
  if (minRole === "super_admin" && !canDelete(role)) throw new Error("Forbidden")
  return session
}

export async function createPost(data: z.infer<typeof BlogSchema>) {
  await requireRole("manager")
  const validated = BlogSchema.parse(data)
  const slug = validated.titleEN.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
  await prisma.blogPost.create({ data: { ...validated, slug } })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function updatePost(id: string, data: z.infer<typeof BlogSchema>) {
  await requireRole("manager")
  const validated = BlogSchema.parse(data)
  await prisma.blogPost.update({ where: { id }, data: validated })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function deletePost(id: string) {
  await requireRole("super_admin")
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
