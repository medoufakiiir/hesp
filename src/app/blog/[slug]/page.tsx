import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo"
import BlogPostClient from "./BlogPostClient"

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({ select: { slug: true } })
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return {}

  return {
    title: post.metaTitleEN,
    description: post.metaDescEN,
    alternates: { canonical: `https://riyada-ventures.com/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.metaTitleEN,
      description: post.metaDescEN,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.titleEN }],
      publishedTime: post.date,
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [post, related] = await Promise.all([
    prisma.blogPost.findUnique({ where: { slug } }),
    prisma.blogPost.findMany({ where: { slug: { not: slug } }, take: 2 }),
  ])

  if (!post) notFound()

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd({
          title: post.titleEN, description: post.excerptEN,
          image: post.image, date: post.date, author: post.author, slug: post.slug,
        })) }}
      />
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: post.titleEN, url: `/blog/${slug}` },
        ])) }}
      />
      <BlogPostClient post={post} relatedPosts={related} />
    </>
  )
}
