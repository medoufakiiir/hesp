import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // 1) Super admin
  const superAdminPassword = await bcrypt.hash("hesp2024", 12)
  await prisma.user.upsert({
    where: { email: "admin@riyada-ventures.com" },
    update: {
      passwordHash: superAdminPassword,
      name: "Super Admin",
      role: "SUPER_ADMIN",
      isActive: true,
    },
    create: {
      email: "admin@riyada-ventures.com",
      name: "Super Admin",
      passwordHash: superAdminPassword,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  })
  console.log("✓ Super admin seeded")

  // 2) Categories (tree)
  const rootId = "cat-engine"
  const catRoot = await prisma.category.upsert({
    where: { slug: "engine-parts" },
    update: {},
    create: {
      id: rootId,
      slug: "engine-parts",
      nameEn: "Engine Parts",
      nameAr: "قطع محرك",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  const catFilters = await prisma.category.upsert({
    where: { slug: "filters" },
    update: {},
    create: {
      slug: "filters",
      nameEn: "Filters",
      nameAr: "فلاتر",
      parentId: catRoot.id,
    },
  })

  console.log("✓ Categories seeded")

  // 3) Brands
  const brandCat = await prisma.brand.upsert({
    where: { slug: "caterpillar" },
    update: {},
    create: {
      slug: "caterpillar",
      nameEn: "Caterpillar",
      nameAr: "كاتربيلر",
      logoUrl: null,
    },
  })
  console.log("✓ Brands seeded")

  // 4) Equipment models
  const model1 = await prisma.equipmentModel.upsert({
    where: { make_model_year: { make: "Caterpillar", model: "320D", year: "2018" } },
    update: {},
    create: { make: "Caterpillar", model: "320D", year: "2018" },
  })

  // 5) Parts + images + compatibility
  const part1 = await prisma.part.upsert({
    where: { sku: "CAT-320D-ENGINE-FILTER" },
    update: {},
    create: {
      sku: "CAT-320D-ENGINE-FILTER",
      oemNumber: null,
      nameEn: "Heavy Duty Air Filter",
      nameAr: "فلتر هواء ثقيل",
      descriptionEn: "Heavy duty air filter for Caterpillar 320D.",
      descriptionAr: "فلتر هواء ثقيل لآليات كاتربيلر 320D.",
      categoryId: catFilters.id,
      brandId: brandCat.id,
      listPrice: 120.0,
      stockQty: 42,
      isActive: true,
      images: {
        create: [
          {
            url: "/images/Heavy%20Duty%20Air%20Filter.jpg",
            alt: "Heavy Duty Air Filter",
            sort: 0,
          },
        ],
      },
      compatibility: {
        create: [
          {
            equipmentModelId: model1.id,
          },
        ],
      },
    },
  })

  console.log(`✓ Seeded parts (e.g., ${part1.sku})`)

  // 6) Company + contact
  const company = await prisma.company.upsert({
    where: { id: "comp-demo" },
    update: {},
    create: {
      id: "comp-demo",
      name: "Demo Construction Co.",
      crNumber: "1234567890",
      vatNumber: "300000000000000",
      email: "sales@demo.com",
      phone: "+966500000000",
      addressLine: "Riyadh",
      city: "Riyadh",
      country: "SA",
      notes: null,
      contacts: {
        create: [
          {
            name: "Ahmed Ali",
            email: "ahmed@demo.com",
            phone: "+966500000001",
            position: "Procurement",
            isPrimary: true,
          },
        ],
      },
    },
  })

  // 7) Sample quote (minimal)
  const quote = await prisma.quote.create({
    data: {
      number: "RFQ-2026-0001",
      companyId: company.id,
      status: "SUBMITTED",
      vatRate: 15,
      subtotal: 0,
      vatAmount: 0,
      total: 0,
      items: {
        create: [
          {
            partId: part1.id,
            quantity: 2,
            unitPrice: 120.0,
            lineTotal: 240.0,
            description: null,
          },
        ],
      },
    },
  })

  await prisma.quote.update({
    where: { id: quote.id },
    data: {
      subtotal: 240.0,
      vatAmount: 36.0,
      total: 276.0,
    },
  })

  console.log("✓ Seeded sample quote")

  console.log("🎉 Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

