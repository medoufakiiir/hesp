import type { MetadataRoute } from "next"
import { prisma } from "@/lib/db"
import { blogPosts } from "@/data/blog"

export const dynamic = "force-dynamic"

const BASE = "https://riyada-ventures.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  const [categories, brands] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.brand.findMany({ select: { slug: true } }),
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

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.date,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...brandPages, ...blogPages]
}
