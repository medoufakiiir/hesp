import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPublishedPost, getPublishedPosts, toBlogPostData } from "@/lib/blog"
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo"
import BlogPostClient from "./BlogPostClient"

// ISR: regenerate post pages at most once per minute so edits and new
// posts go live without a redeploy.
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) return {}

  const title = post.metaTitleEn || post.titleEn
  const description = post.metaDescEn || post.excerptEn || ""
  const base = buildMetadata({
    title, description, path: `/blog/${slug}`, locale,
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

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getPublishedPost(slug)
  if (!post) notFound()

  const related = (await getPublishedPosts())
    .filter((p) => p.slug !== slug)
    .slice(0, 2)
    .map(toBlogPostData)
  const postData = toBlogPostData(post)

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({
          title: post.titleEn, description: post.excerptEn || "",
          image: post.coverImageUrl || "/images/equipment/workshop.jpg",
          date: (post.publishedAt || post.createdAt).toISOString(),
          author: "Riyada Engineering Team", slug: post.slug, locale,
        })) }}
      />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(locale, [
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.titleEn, url: `/blog/${slug}` },
        ])) }}
      />
      <BlogPostClient post={postData} relatedPosts={related} />
    </>
  )
}
