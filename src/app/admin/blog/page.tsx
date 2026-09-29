import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageBlog, FORBIDDEN_ROUTE } from "@/lib/rbac"
import { prisma } from "@/lib/db"
import { bundledBlogRecords, missingBundledPosts } from "@/lib/blog"
import AdminBlogClient from "./AdminBlogClient"

export default async function AdminBlogPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canManageBlog(role)) redirect(FORBIDDEN_ROUTE)

  // `dbReady` is false when DATABASE_URL is unset or the database can't be
  // queried (e.g. right after moving to a new Vercel account). The public
  // blog keeps serving the bundled articles in that case; here we show them
  // read-only and explain what to fix.
  let dbReady = false
  let posts: Awaited<ReturnType<typeof prisma.blogPost.findMany>> = []
  if (process.env.DATABASE_URL) {
    try {
      posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } })
      dbReady = true
    } catch (err) {
      console.error("[admin/blog] database unavailable:", err)
    }
  }
  if (!dbReady) {
    posts = bundledBlogRecords
  }
  const missingCount = dbReady ? missingBundledPosts(posts.map((p) => p.slug)).length : 0

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

  return <AdminBlogClient posts={serialized} dbReady={dbReady} missingCount={missingCount} />
}
