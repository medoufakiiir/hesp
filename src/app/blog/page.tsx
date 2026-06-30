import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import BlogPageClient from "./BlogPageClient"
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo"

// Re-query the database at most once per minute so newly published
// posts appear without needing a full redeploy (ISR).
export const revalidate = 60

export const metadata: Metadata = buildMetadata({
  title: "Heavy Equipment Blog | Maintenance Tips | HESP",
  description: "Expert articles on heavy equipment maintenance, spare parts selection, and fleet management. Tips for Saudi Arabia's construction industry. مقالات متخصصة عن صيانة المعدات الثقيلة.",
  path: "/blog",
  keywords: [
    "heavy equipment maintenance tips",
    "heavy machinery parts Saudi Arabia",
    "construction equipment parts Riyadh",
    "fleet management Saudi Arabia",
    "spare parts selection guide",
    "مقالات صيانة المعدات الثقيلة",
    "قطع غيار المعدات الثقيلة",
  ],
})

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

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", url: "/" }, { name: "Blog", url: "/blog" },
        ])) }}
      />
      <BlogPageClient postsData={postsData} />
    </>
  )
}
