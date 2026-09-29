import { PrismaClient } from "@prisma/client"
import { posts as blogPosts } from "../src/data/blog-posts/core"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding blog posts...")

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        titleEn: post.titleEn,
        titleAr: post.titleAr,
        excerptEn: post.excerptEn,
        excerptAr: post.excerptAr,
        bodyEn: post.bodyEn,
        bodyAr: post.bodyAr,
        coverImageUrl: post.coverImageUrl,
        metaTitleEn: post.metaTitleEn,
        metaTitleAr: post.metaTitleAr,
        metaDescEn: post.metaDescEn,
        metaDescAr: post.metaDescAr,
        primaryKeyword: post.primaryKeyword,
        keywords: post.keywords,
        published: post.published,
        publishedAt: post.publishedAt,
      },
      create: post,
    })
    console.log(`  ✓ ${post.slug}`)
  }

  console.log(`✓ Blog posts seeded (${blogPosts.length})`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
