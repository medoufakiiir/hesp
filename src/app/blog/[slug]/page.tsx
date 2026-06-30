import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo"
import BlogPostClient from "./BlogPostClient"

// ISR: regenerate post pages at most once per minute so edits and new
// posts go live without a redeploy.
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post || !post.published) return {}

  const title = post.metaTitleEn || post.titleEn
  const description = post.metaDescEn || post.excerptEn || ""
  const base = buildMetadata({
    title, description, path: `/blog/${slug}`,
    keywords: post.keywords.length > 0 ? post.keywords : undefined,
    ogImage: post.coverImageUrl || undefined,
  })

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: (post.publishedAt || post.createdAt).toISOString(),
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post || !post.published) notFound()

  const relatedRaw = await prisma.blogPost.findMany({
    where: { published: true, slug: { not: slug } },
    orderBy: { publishedAt: "desc" },
    take: 2,
  })

  const toClient = (p: typeof post) => ({
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
  })

  const postData = toClient(post)
  const related = relatedRaw.map(toClient)

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({
          title: post.titleEn, description: post.excerptEn || "",
          image: post.coverImageUrl || "/images/equipment/workshop.jpg",
          date: (post.publishedAt || post.createdAt).toISOString(),
          author: "Riyada Engineering Team", slug: post.slug,
        })) }}
      />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.titleEn, url: `/blog/${slug}` },
        ])) }}
      />
      <BlogPostClient post={postData} relatedPosts={related} />
    </>
  )
}
