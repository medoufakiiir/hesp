import { prisma } from "@/lib/db"
import AdminBlogClient from "./AdminBlogClient"

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <AdminBlogClient
      posts={posts.map((p) => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() }))}
    />
  )
}
