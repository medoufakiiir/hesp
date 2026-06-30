import type { MetadataRoute } from "next"
import { prisma } from "@/lib/db"
import { SITE_URL } from "@/lib/seo"
import { routing } from "@/i18n/routing"

export const revalidate = 3600

type RouteDef = {
  path: string
  lastModified: string
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
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: { languages },
  }))
}

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

  const routes: RouteDef[] = [
    { path: "", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { path: "/products", lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { path: "/brands", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/about", lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { path: "/contact", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/quote", lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { path: "/blog", lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...categories.map((c): RouteDef => ({
      path: `/products/${c.slug}`, lastModified: now, changeFrequency: "weekly", priority: 0.85,
    })),
    ...brands.map((b): RouteDef => ({
      path: `/brands/${b.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.75,
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
