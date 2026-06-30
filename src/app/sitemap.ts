import type { MetadataRoute } from "next"
import { prisma } from "@/lib/db"
import { SITE_URL } from "@/lib/seo"

export const revalidate = 3600

const BASE = SITE_URL

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const [categories, brands, posts] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.brand.findMany({ select: { slug: true } }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { slug: true, publishedAt: true, updatedAt: true },
    }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/quote`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ]

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/products/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }))

  const brandPages: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${BASE}/brands/${b.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }))

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: (p.updatedAt || p.publishedAt || new Date()).toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...brandPages, ...blogPages]
}
