import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import BlogPageClient from "./BlogPageClient"

export const metadata: Metadata = {
  title: "Heavy Equipment Blog | Maintenance Tips & Parts Guides | مدونة المعدات الثقيلة",
  description: "Expert articles on heavy equipment maintenance, spare parts selection, and fleet management. Tips for Saudi Arabia's construction industry. مقالات متخصصة عن صيانة المعدات الثقيلة.",
  alternates: { canonical: "https://riyada-ventures.com/blog" },
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  })

  const postsData = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    titleEN: p.titleEn,
    titleAR: p.titleAr,
    excerptEN: p.excerptEn || "",
    excerptAR: p.excerptAr || "",
    contentEN: p.bodyEn,
    contentAR: p.bodyAr,
    image: p.coverImageUrl || "/images/equipment/workshop.jpg",
    date: (p.publishedAt || p.createdAt).toISOString().split("T")[0],
    author: "Riyada Engineering Team",
    tags: p.keywords,
    metaTitleEN: p.metaTitleEn || "",
    metaTitleAR: p.metaTitleAr || "",
    metaDescEN: p.metaDescEn || "",
    metaDescAR: p.metaDescAr || "",
  }))

  return <BlogPageClient postsData={postsData} />
}
