import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageBlog } from "@/lib/rbac"
import { prisma } from "@/lib/db"
import AdminBlogClient from "./AdminBlogClient"

export default async function AdminBlogPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  const role = (session.user as any).role
  if (!canManageBlog(role)) redirect("/admin/dashboard")

  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  })

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
