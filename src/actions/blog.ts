"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const BlogSchema = z.object({
  titleEN: z.string().min(1),
  titleAR: z.string().min(1),
  excerptEN: z.string(),
  excerptAR: z.string(),
  contentEN: z.string(),
  contentAR: z.string(),
  image: z.string(),
  date: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  metaTitleEN: z.string(),
  metaTitleAR: z.string(),
  metaDescEN: z.string(),
  metaDescAR: z.string(),
})

export async function createPost(data: z.infer<typeof BlogSchema>) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const validated = BlogSchema.parse(data)
  const slug = validated.titleEN.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  await prisma.blogPost.create({ data: { ...validated, slug } })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function updatePost(id: string, data: z.infer<typeof BlogSchema>) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  const validated = BlogSchema.parse(data)
  await prisma.blogPost.update({ where: { id }, data: validated })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function deletePost(id: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  await prisma.blogPost.delete({ where: { id } })
  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
