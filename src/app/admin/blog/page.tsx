import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageBlog, FORBIDDEN_ROUTE } from "@/lib/rbac"
import { prisma } from "@/lib/db"
import { blogPosts } from "@/data/blog"
import AdminBlogClient from "./AdminBlogClient"

export default async function AdminBlogPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canManageBlog(role)) redirect(FORBIDDEN_ROUTE)

  let posts: any[] = []
  if (!process.env.DATABASE_URL) {
    posts = blogPosts.map((p) => ({
      ...p,
      createdAt: new Date(p.date),
      published: true,
      publishedAt: new Date(p.date),
    }))
  } else {
    posts = await prisma.blogPost.findMany({
      orderBy: { createdAt: "desc" },
    })
  }

  const serialized = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    titleEn: p.titleEn,
    titleAr: p.titleAr,
    excerptEn: p.excerptEn || "",
    excerptAr: p.excerptAr || "",
    bodyEn: p.bodyEn,
    bodyAr: p.bodyAr,
    coverImageUrl: p.coverImageUrl || "",
    metaTitleEn: p.metaTitleEn || "",
    metaTitleAr: p.metaTitleAr || "",
    metaDescEn: p.metaDescEn || "",
    metaDescAr: p.metaDescAr || "",
    primaryKeyword: p.primaryKeyword || "",
    keywords: p.keywords,
    published: p.published,
    publishedAt: p.publishedAt?.toISOString() || null,
    createdAt: p.createdAt.toISOString(),
  }))

  return <AdminBlogClient posts={serialized} />
}
