/** Shape of a blog post bundled in the repo — mirrors the Prisma BlogPost
 * columns so the same objects can be seeded into the DB or served directly. */
export interface BlogSeedPost {
  slug: string
  titleEn: string
  titleAr: string
  excerptEn?: string | null
  excerptAr?: string | null
  bodyEn: string
  bodyAr: string
  coverImageUrl?: string | null
  metaTitleEn?: string | null
  metaTitleAr?: string | null
  metaDescEn?: string | null
  metaDescAr?: string | null
  primaryKeyword?: string | null
  keywords: string[]
  published?: boolean
  publishedAt?: Date | null
}
