import type { MetadataRoute } from "next"
import { prisma } from "@/lib/db"
import { SITE_URL } from "@/lib/seo"
import { routing } from "@/i18n/routing"
import { categories as fallbackCategories } from "@/data/categories"
import { brands as fallbackBrands } from "@/data/brands"
import { products as fallbackProducts } from "@/data/products"
import { blogPosts as fallbackPosts } from "@/data/blog"

export const revalidate = 3600

type RouteDef = {
  path: string
  /** Only set when a real DB timestamp exists. Static routes omit it: stamping
   * them with the regeneration time made all 178 URLs claim to change hourly,
   * which teaches Google to distrust the field entirely. */
  lastModified?: string
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>
  priority: number
}

/** Expands one logical route into one sitemap entry per locale, each
 * cross-referencing the others via hreflang alternates. */
function localizedEntries(route: RouteDef): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${route.path}`]),
  )
  return routing.locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${route.path}`,
    ...(route.lastModified ? { lastModified: route.lastModified } : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: { languages },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let categories: { slug: string; updatedAt: Date }[] = []
  let brands: { slug: string; updatedAt: Date }[] = []
  let posts: { slug: string; publishedAt?: Date | null; updatedAt?: Date | null }[] = []
  let parts: { sku: string; updatedAt: Date }[] = []

  if (!process.env.DATABASE_URL) {
    categories = fallbackCategories.map((c) => ({ slug: c.slug, updatedAt: new Date() }))
    brands = fallbackBrands.map((b) => ({ slug: b.slug, updatedAt: new Date() }))
    posts = fallbackPosts.map((p) => ({ slug: p.slug, publishedAt: new Date(p.date), updatedAt: new Date(p.date) }))
    parts = fallbackProducts.map((p) => ({ sku: p.sku || p.id || "", updatedAt: new Date() }))
  } else {
    const results = await Promise.all([
      prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.brand.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.blogPost.findMany({
        where: { published: true },
        select: { slug: true, publishedAt: true, updatedAt: true },
      }),
      prisma.part.findMany({
        where: { isActive: true },
        select: { sku: true, updatedAt: true },
      }),
    ])

    categories = results[0]
    brands = results[1]
    posts = results[2]
    parts = results[3]
  }

  const routes: RouteDef[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/products", changeFrequency: "weekly", priority: 0.9 },
    { path: "/brands", changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/quote", changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/returns-policy", changeFrequency: "yearly", priority: 0.3 },
    ...categories.map((c): RouteDef => ({
      path: `/products/${c.slug}`,
      lastModified: c.updatedAt.toISOString(),
      changeFrequency: "weekly",
      priority: 0.85,
    })),
    ...brands.map((b): RouteDef => ({
      path: `/brands/${b.slug}`,
      lastModified: b.updatedAt.toISOString(),
      changeFrequency: "monthly",
      priority: 0.75,
    })),
    ...parts.map((p): RouteDef => ({
      path: `/parts/${encodeURIComponent(p.sku)}`,
      lastModified: p.updatedAt.toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
    ...posts.map((p): RouteDef => ({
      path: `/blog/${p.slug}`,
      lastModified: (p.updatedAt || p.publishedAt || new Date()).toISOString(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ]

  return routes.flatMap(localizedEntries)
}
