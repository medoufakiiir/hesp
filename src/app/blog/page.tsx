import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import BlogPageClient from "./BlogPageClient"

export const metadata: Metadata = {
  title: "Heavy Equipment Blog | Maintenance Tips & Parts Guides | مدونة المعدات الثقيلة",
  description: "Expert articles on heavy equipment maintenance, spare parts selection, and fleet management. Tips for Saudi Arabia's construction industry. مقالات متخصصة عن صيانة المعدات الثقيلة.",
  alternates: { canonical: "https://riyada-ventures.com/blog" },
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { date: "desc" } })
  return <BlogPageClient postsData={JSON.parse(JSON.stringify(posts))} />
}
