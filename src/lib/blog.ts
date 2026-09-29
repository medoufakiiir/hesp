import { prisma } from "./db"
import { bundledBlogPosts } from "@/data/blog-posts"

/** A blog post in the Prisma BlogPost shape, whether it came from the DB or
 * from the articles bundled in src/data/blog-posts. */
export interface BlogRecord {
  id: string
  slug: string
  titleEn: string
  titleAr: string
  excerptEn: string | null
  excerptAr: string | null
  bodyEn: string
  bodyAr: string
  coverImageUrl: string | null
  metaTitleEn: string | null
  metaTitleAr: string | null
  metaDescEn: string | null
  metaDescAr: string | null
  primaryKeyword: string | null
  keywords: string[]
  published: boolean
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

/** The bundled articles as BlogRecords (read-only, not in the DB). */
export const bundledBlogRecords: BlogRecord[] = bundledBlogPosts.map((p) => ({
  ...p,
  id: `bundled-${p.slug}`,
  createdAt: p.publishedAt,
  updatedAt: p.publishedAt,
}))

/**
 * Blog posts from the database, or null when the database can't be used
 * (DATABASE_URL unset, unreachable, schema not pushed) or holds no posts yet.
 * A null result means "serve the bundled articles instead" — this is what
 * keeps the blog alive after a fresh deploy / Vercel account move where the
 * new database is empty.
 */
async function loadDbPosts(): Promise<BlogRecord[] | null> {
  if (!process.env.DATABASE_URL) return null
  try {
    const rows = await prisma.blogPost.findMany()
    return rows.length > 0 ? rows : null
  } catch (err) {
    console.error("[blog] database unavailable, serving bundled posts:", err)
    return null
  }
}

const byNewest = (a: BlogRecord, b: BlogRecord) =>
  (b.publishedAt ?? b.createdAt).getTime() - (a.publishedAt ?? a.createdAt).getTime()

/** All published posts, newest first. */
export async function getPublishedPosts(): Promise<BlogRecord[]> {
  const rows = (await loadDbPosts()) ?? bundledBlogRecords
  return rows.filter((p) => p.published).sort(byNewest)
}

/** One published post by slug, or null. */
export async function getPublishedPost(slug: string): Promise<BlogRecord | null> {
  const posts = await getPublishedPosts()
  return posts.find((p) => p.slug === slug) ?? null
}

/** Bundled posts whose slug is not in the database yet — what the admin
 * "Restore" action and scripts/restore-data.ts will insert. */
export function missingBundledPosts(existingSlugs: Iterable<string>) {
  const have = new Set(existingSlugs)
  return bundledBlogPosts.filter((p) => !have.has(p.slug))
}

export { bundledBlogPosts }

/** Client-component shape used by the public blog pages. */
export function toBlogPostData(p: BlogRecord) {
  return {
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
  }
}
