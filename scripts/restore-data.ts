// Repopulates a fresh database — e.g. after moving the project to a new
// Vercel account, where the old Neon/Postgres database (users, blog posts)
// did not come along.
//
//   1. Creates or resets the admin login from ADMIN_EMAIL / ADMIN_PASSWORD.
//   2. Inserts every bundled blog article (src/data/blog-posts, 120 posts)
//      that is missing from the database, as published. Existing posts are
//      never modified.
//
// Usage (after `npx prisma db push` against the new database):
//   ADMIN_EMAIL=you@example.com ADMIN_PASSWORD='...' npm run db:restore
//   npm run db:restore -- --count-only
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { bundledBlogPosts } from "../src/data/blog-posts"

const prisma = new PrismaClient()

async function main() {
  if (process.argv.includes("--count-only")) {
    const total = await prisma.blogPost.count()
    const published = await prisma.blogPost.count({ where: { published: true } })
    const users = await prisma.user.count()
    console.log(`blog posts: total=${total} published=${published} (bundled=${bundledBlogPosts.length})`)
    console.log(`users: ${users}`)
    return
  }

  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const password = process.env.ADMIN_PASSWORD
  if (email && password) {
    const passwordHash = await bcrypt.hash(password, 12)
    await prisma.user.upsert({
      where: { email },
      update: { passwordHash, role: "SUPER_ADMIN", isActive: true },
      create: { email, name: "Super Admin", passwordHash, role: "SUPER_ADMIN", isActive: true },
    })
    console.log(`✓ Admin login ready: ${email}`)
  } else {
    console.log("• ADMIN_EMAIL / ADMIN_PASSWORD not set — skipping admin user")
  }

  const existing = new Set((await prisma.blogPost.findMany({ select: { slug: true } })).map((p) => p.slug))
  const missing = bundledBlogPosts.filter((p) => !existing.has(p.slug))
  if (missing.length > 0) {
    await prisma.blogPost.createMany({ data: missing, skipDuplicates: true })
  }
  console.log(`✓ Blog posts restored: ${missing.length} inserted, ${existing.size} already present`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
