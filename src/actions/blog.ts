"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageBlog, canDelete } from "@/lib/rbac"

const BlogSchema = z.object({
  slug: z.string().min(1).max(300).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),
  titleEn: z.string().min(1).max(300),
  titleAr: z.string().min(1).max(300),
  excerptEn: z.string().max(1000).optional().default(""),
  excerptAr: z.string().max(1000).optional().default(""),
  bodyEn: z.string().min(1),
  bodyAr: z.string().min(1),
  coverImageUrl: z.string().max(500).optional().default(""),
  metaTitleEn: z.string().max(200).optional().default(""),
  metaTitleAr: z.string().max(200).optional().default(""),
  metaDescEn: z.string().max(500).optional().default(""),
  metaDescAr: z.string().max(500).optional().default(""),
  primaryKeyword: z.string().max(200).optional().default(""),
  keywords: z.array(z.string()).optional().default([]),
  published: z.boolean().optional().default(false),
})

export type BlogInput = z.infer<typeof BlogSchema>

async function requireBlogRole() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canManageBlog(role)) throw new Error("Forbidden")
  return { session, role }
}

export async function createPost(data: BlogInput) {
  await requireBlogRole()
  const parsed = BlogSchema.parse(data)

  const post = await prisma.blogPost.create({
    data: {
      slug: parsed.slug,
      titleEn: parsed.titleEn,
      titleAr: parsed.titleAr,
      excerptEn: parsed.excerptEn || null,
      excerptAr: parsed.excerptAr || null,
      bodyEn: parsed.bodyEn,
      bodyAr: parsed.bodyAr,
      coverImageUrl: parsed.coverImageUrl || null,
      metaTitleEn: parsed.metaTitleEn || null,
      metaTitleAr: parsed.metaTitleAr || null,
      metaDescEn: parsed.metaDescEn || null,
      metaDescAr: parsed.metaDescAr || null,
      primaryKeyword: parsed.primaryKeyword || null,
      keywords: parsed.keywords ?? [],
      published: parsed.published,
      publishedAt: parsed.published ? new Date() : null,
    },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  return { id: post.id }
}

export async function updatePost(id: string, data: BlogInput) {
  await requireBlogRole()
  const parsed = BlogSchema.parse(data)

  const existing = await prisma.blogPost.findUnique({ where: { id } })
  if (!existing) throw new Error("Post not found")

  const wasPublished = existing.published
  const nowPublished = parsed.published

  await prisma.blogPost.update({
    where: { id },
    data: {
      slug: parsed.slug,
      titleEn: parsed.titleEn,
      titleAr: parsed.titleAr,
      excerptEn: parsed.excerptEn || null,
      excerptAr: parsed.excerptAr || null,
      bodyEn: parsed.bodyEn,
      bodyAr: parsed.bodyAr,
      coverImageUrl: parsed.coverImageUrl || null,
      metaTitleEn: parsed.metaTitleEn || null,
      metaTitleAr: parsed.metaTitleAr || null,
      metaDescEn: parsed.metaDescEn || null,
      metaDescAr: parsed.metaDescAr || null,
      primaryKeyword: parsed.primaryKeyword || null,
      keywords: parsed.keywords ?? [],
      published: nowPublished,
      publishedAt: nowPublished && !wasPublished ? new Date() : existing.publishedAt,
    },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
  revalidatePath(`/blog/${parsed.slug}`)
}

export async function deletePost(id: string) {
  const { role } = await requireBlogRole()
  if (!canDelete(role)) throw new Error("Forbidden")

  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) throw new Error("Post not found")

  await prisma.blogPost.delete({ where: { id } })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}

export async function togglePublish(id: string) {
  await requireBlogRole()
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) throw new Error("Post not found")

  const newPublished = !post.published
  await prisma.blogPost.update({
    where: { id },
    data: {
      published: newPublished,
      publishedAt: newPublished && !post.publishedAt ? new Date() : post.publishedAt,
    },
  })

  revalidatePath("/admin/blog")
  revalidatePath("/blog")
}
