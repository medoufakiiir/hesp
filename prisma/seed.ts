import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { products } from "../src/data/products"
import { categories } from "../src/data/categories"
import { brands } from "../src/data/brands"
import { blogPosts } from "../src/data/blog"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // 1. Admin user
  const hashedPassword = await bcrypt.hash("hesp2024", 12)
  await prisma.user.upsert({
    where: { email: "admin@riyada-ventures.com" },
    update: {},
    create: {
      email: "admin@riyada-ventures.com",
      name: "Admin",
      password: hashedPassword,
      role: "admin",
    },
  })
  console.log("✓ Admin user created")

  // 2. Categories
  for (const c of categories) {
    await prisma.category.upsert({
      where: { id: c.id },
      update: {},
      create: c as any,
    })
  }
  console.log(`✓ ${categories.length} categories seeded`)

  // 3. Brands
  for (const b of brands) {
    await prisma.brand.upsert({
      where: { id: b.id },
      update: {},
      create: b as any,
    })
  }
  console.log(`✓ ${brands.length} brands seeded`)

  // 4. Products
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        nameEN: p.nameEN,
        nameAR: p.nameAR,
        descriptionEN: p.descriptionEN,
        descriptionAR: p.descriptionAR,
        category: p.category,
        brand: p.brand,
        image: p.image,
        partNumber: p.partNumber,
        inStock: p.inStock,
        featured: p.featured,
      },
    })
  }
  console.log(`✓ ${products.length} products seeded`)

  // 5. Blog posts
  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        titleEN: post.titleEN,
        titleAR: post.titleAR,
        excerptEN: post.excerptEN,
        excerptAR: post.excerptAR,
        contentEN: post.contentEN,
        contentAR: post.contentAR,
        image: post.image,
        date: post.date,
        author: post.author,
        tags: post.tags,
        metaTitleEN: post.metaTitleEN,
        metaTitleAR: post.metaTitleAR,
        metaDescEN: post.metaDescEN,
        metaDescAR: post.metaDescAR,
      },
    })
  }
  console.log(`✓ ${blogPosts.length} blog posts seeded`)

  // 6. Site settings
  const settings = [
    { key: "phone", value: "+966552282868" },
    { key: "email", value: "info@riyada-ventures.com" },
    { key: "address_en", value: "Al Faisaliyyah, Riyadh 12882, KSA" },
    { key: "address_ar", value: "الفيصلية، الرياض 12882، المملكة العربية السعودية" },
    { key: "whatsapp", value: "966552282868" },
  ]
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: { ...s, updatedAt: new Date() },
    })
  }
  console.log("✓ Site settings seeded")

  console.log("🎉 Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
