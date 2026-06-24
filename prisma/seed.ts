import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("Seeding database...")

  // ── 1. Super Admin ──
  const superAdminPassword = await bcrypt.hash("hesp2024", 12)
  await prisma.user.upsert({
    where: { email: "admin@riyada-ventures.com" },
    update: { passwordHash: superAdminPassword, name: "Super Admin", role: "SUPER_ADMIN", isActive: true },
    create: { email: "admin@riyada-ventures.com", name: "Super Admin", passwordHash: superAdminPassword, role: "SUPER_ADMIN", isActive: true },
  })
  console.log("✓ Super admin seeded")

  // ── 2. Categories (top-level + subcategories) ──
  const categoryData: { slug: string; nameEn: string; nameAr: string; children?: { slug: string; nameEn: string; nameAr: string }[] }[] = [
    {
      slug: "engine-parts", nameEn: "Engine Parts", nameAr: "محركات",
      children: [
        { slug: "pistons", nameEn: "Pistons & Liners", nameAr: "مكابس وبطانات" },
        { slug: "gaskets", nameEn: "Gaskets & Seals", nameAr: "حشوات وموانع تسرب" },
        { slug: "turbochargers", nameEn: "Turbochargers", nameAr: "شواحن توربينية" },
        { slug: "injectors", nameEn: "Fuel Injectors", nameAr: "رشاشات وقود" },
      ],
    },
    {
      slug: "hydraulics", nameEn: "Hydraulics", nameAr: "نظام هيدروليك",
      children: [
        { slug: "hydraulic-pumps", nameEn: "Hydraulic Pumps", nameAr: "مضخات هيدروليك" },
        { slug: "hydraulic-cylinders", nameEn: "Hydraulic Cylinders", nameAr: "أسطوانات هيدروليك" },
        { slug: "hydraulic-valves", nameEn: "Hydraulic Valves", nameAr: "صمامات هيدروليك" },
        { slug: "hydraulic-hoses", nameEn: "Hoses & Fittings", nameAr: "خراطيم وتوصيلات" },
        { slug: "seal-kits", nameEn: "Seal Kits", nameAr: "أطقم حشوات" },
      ],
    },
    {
      slug: "undercarriage", nameEn: "Undercarriage", nameAr: "الهيكل السفلي",
      children: [
        { slug: "track-chains", nameEn: "Track Chains", nameAr: "سلاسل الجنزير" },
        { slug: "rollers", nameEn: "Rollers", nameAr: "بكرات" },
        { slug: "idlers", nameEn: "Idlers & Sprockets", nameAr: "بكرات التوجيه والتروس" },
        { slug: "track-shoes", nameEn: "Track Shoes & Pads", nameAr: "أحذية الجنزير" },
      ],
    },
    {
      slug: "transmission-drivetrain", nameEn: "Transmission & Drivetrain", nameAr: "ناقل الحركة",
      children: [
        { slug: "final-drives", nameEn: "Final Drives", nameAr: "محركات نهائية" },
        { slug: "gears-clutches", nameEn: "Gears & Clutches", nameAr: "تروس وقوابض" },
      ],
    },
    {
      slug: "electrical", nameEn: "Electrical", nameAr: "كهرباء",
      children: [
        { slug: "alternators-starters", nameEn: "Alternators & Starters", nameAr: "مولدات ومحركات بدء" },
        { slug: "sensors", nameEn: "Sensors", nameAr: "حساسات" },
        { slug: "wiring-harnesses", nameEn: "Wiring Harnesses", nameAr: "أحزمة أسلاك" },
      ],
    },
    {
      slug: "filters", nameEn: "Filters", nameAr: "فلاتر",
      children: [
        { slug: "oil-filters", nameEn: "Oil Filters", nameAr: "فلاتر زيت" },
        { slug: "fuel-filters", nameEn: "Fuel Filters", nameAr: "فلاتر وقود" },
        { slug: "air-filters", nameEn: "Air Filters", nameAr: "فلاتر هواء" },
        { slug: "hydraulic-filters", nameEn: "Hydraulic Filters", nameAr: "فلاتر هيدروليك" },
      ],
    },
    {
      slug: "cooling-system", nameEn: "Cooling System", nameAr: "نظام التبريد",
      children: [
        { slug: "radiators", nameEn: "Radiators", nameAr: "مشعات" },
        { slug: "water-pumps", nameEn: "Water Pumps", nameAr: "مضخات مياه" },
        { slug: "cooling-fans", nameEn: "Cooling Fans", nameAr: "مراوح تبريد" },
      ],
    },
    {
      slug: "ground-engaging-tools", nameEn: "Ground Engaging Tools (GET)", nameAr: "أدوات الحفر",
      children: [
        { slug: "bucket-teeth", nameEn: "Bucket Teeth", nameAr: "أسنان الدلو" },
        { slug: "cutting-edges", nameEn: "Cutting Edges", nameAr: "حواف القطع" },
        { slug: "adapters", nameEn: "Adapters", nameAr: "محولات" },
      ],
    },
    { slug: "seals-fasteners", nameEn: "Seals & Fasteners", nameAr: "حشوات ومثبتات" },
    { slug: "cabin-body", nameEn: "Cabin & Body", nameAr: "الكابينة والهيكل" },
  ]

  const categoryMap: Record<string, string> = {}
  for (const cat of categoryData) {
    const parent = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { nameEn: cat.nameEn, nameAr: cat.nameAr },
      create: { slug: cat.slug, nameEn: cat.nameEn, nameAr: cat.nameAr },
    })
    categoryMap[cat.slug] = parent.id
    if (cat.children) {
      for (const child of cat.children) {
        const c = await prisma.category.upsert({
          where: { slug: child.slug },
          update: { nameEn: child.nameEn, nameAr: child.nameAr, parentId: parent.id },
          create: { slug: child.slug, nameEn: child.nameEn, nameAr: child.nameAr, parentId: parent.id },
        })
        categoryMap[child.slug] = c.id
      }
    }
  }
  console.log("✓ Categories seeded (" + Object.keys(categoryMap).length + ")")

  // ── 3. Brands ──
  const brandData = [
    { slug: "caterpillar", nameEn: "Caterpillar", nameAr: "كاتربيلر" },
    { slug: "komatsu", nameEn: "Komatsu", nameAr: "كوماتسو" },
    { slug: "volvo-ce", nameEn: "Volvo CE", nameAr: "فولفو للمعدات" },
    { slug: "hitachi", nameEn: "Hitachi", nameAr: "هيتاشي" },
    { slug: "jcb", nameEn: "JCB", nameAr: "جي سي بي" },
    { slug: "hyundai", nameEn: "Hyundai CE", nameAr: "هيونداي للمعدات" },
    { slug: "doosan", nameEn: "Doosan / Develon", nameAr: "دوسان / ديفيلون" },
    { slug: "liebherr", nameEn: "Liebherr", nameAr: "ليبهر" },
    { slug: "case", nameEn: "Case", nameAr: "كيس" },
    { slug: "kobelco", nameEn: "Kobelco", nameAr: "كوبيلكو" },
    { slug: "sany", nameEn: "SANY", nameAr: "ساني" },
    { slug: "xcmg", nameEn: "XCMG", nameAr: "إكس سي إم جي" },
    { slug: "bobcat", nameEn: "Bobcat", nameAr: "بوبكات" },
    { slug: "john-deere", nameEn: "John Deere", nameAr: "جون ديير" },
    { slug: "perkins", nameEn: "Perkins", nameAr: "بيركنز" },
    { slug: "cummins", nameEn: "Cummins", nameAr: "كمنز" },
    { slug: "donaldson", nameEn: "Donaldson", nameAr: "دونالدسون" },
    { slug: "fleetguard", nameEn: "Fleetguard", nameAr: "فليتغارد" },
    { slug: "baldwin", nameEn: "Baldwin", nameAr: "بالدوين" },
    { slug: "bosch", nameEn: "Bosch", nameAr: "بوش" },
    { slug: "itr-berco", nameEn: "ITR / Berco", nameAr: "آي تي آر / بيركو" },
  ]

  const brandMap: Record<string, string> = {}
  for (const b of brandData) {
    const brand = await prisma.brand.upsert({
      where: { slug: b.slug },
      update: { nameEn: b.nameEn, nameAr: b.nameAr },
      create: { slug: b.slug, nameEn: b.nameEn, nameAr: b.nameAr },
    })
    brandMap[b.slug] = brand.id
  }
  console.log("✓ Brands seeded (" + brandData.length + ")")

  // ── 4. Equipment Models ──
  const modelData = [
    { make: "Caterpillar", model: "320D", year: "2018" },
    { make: "Caterpillar", model: "336F", year: "2020" },
    { make: "Caterpillar", model: "950H", year: "2019" },
    { make: "Caterpillar", model: "D6T", year: "2021" },
    { make: "Caterpillar", model: "140M", year: "2019" },
    { make: "Komatsu", model: "PC200-8", year: "2020" },
    { make: "Komatsu", model: "PC300-8", year: "2019" },
    { make: "Komatsu", model: "WA380-6", year: "2021" },
    { make: "Komatsu", model: "D65EX-18", year: "2020" },
    { make: "Volvo CE", model: "EC210D", year: "2021" },
    { make: "Volvo CE", model: "EC350E", year: "2022" },
    { make: "Volvo CE", model: "L120H", year: "2020" },
    { make: "Hitachi", model: "ZX200-6", year: "2021" },
    { make: "Hitachi", model: "ZX350LC-6", year: "2020" },
    { make: "JCB", model: "3CX", year: "2022" },
    { make: "JCB", model: "JS220", year: "2021" },
    { make: "Hyundai CE", model: "HX220S", year: "2022" },
    { make: "Doosan / Develon", model: "DX225LC-5", year: "2021" },
    { make: "Liebherr", model: "R920", year: "2022" },
    { make: "SANY", model: "SY215C", year: "2023" },
    { make: "XCMG", model: "XE215DA", year: "2023" },
    { make: "Kobelco", model: "SK200-10", year: "2021" },
    { make: "Case", model: "CX210D", year: "2022" },
    { make: "Bobcat", model: "E85", year: "2023" },
    { make: "John Deere", model: "210G", year: "2022" },
  ]

  const modelMap: Record<string, string> = {}
  for (const m of modelData) {
    const em = await prisma.equipmentModel.upsert({
      where: { make_model_year: { make: m.make, model: m.model, year: m.year } },
      update: {},
      create: { make: m.make, model: m.model, year: m.year },
    })
    modelMap[`${m.make}|${m.model}`] = em.id
  }
  console.log("✓ Equipment models seeded (" + modelData.length + ")")

  // ── 5. Company ──
  await prisma.company.upsert({
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
      contacts: {
        create: [{ name: "Ahmed Ali", email: "ahmed@demo.com", phone: "+966500000001", position: "Procurement", isPrimary: true }],
      },
    },
  })
  console.log("✓ Company seeded")

  // ── 6. Parts (~80 sample parts) ──
  type PartSeed = {
    sku: string; nameEn: string; nameAr: string; category: string; brand: string
    listPrice?: number; stockQty: number; compat: string[]
  }

  const parts: PartSeed[] = [
    // ── Engine Parts ──
    { sku: "SAMPLE-CAT-320D-AIR-FILTER", nameEn: "Heavy Duty Air Filter", nameAr: "فلتر هواء ثقيل", category: "air-filters", brand: "caterpillar", listPrice: 120, stockQty: 42, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-CAT-PISTON-KIT-C7", nameEn: "Piston Kit C7 Engine", nameAr: "طقم مكبس محرك C7", category: "pistons", brand: "caterpillar", listPrice: 1850, stockQty: 8, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-PC200-PISTON", nameEn: "Piston Assembly SAA6D107", nameAr: "مكبس محرك SAA6D107", category: "pistons", brand: "komatsu", listPrice: 1620, stockQty: 12, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-CAT-GASKET-HEAD-C9", nameEn: "Head Gasket Set C9", nameAr: "طقم جوان رأس C9", category: "gaskets", brand: "caterpillar", listPrice: 980, stockQty: 15, compat: ["Caterpillar|336F"] },
    { sku: "SAMPLE-KOM-GASKET-KIT-6D", nameEn: "Full Gasket Kit 6D102", nameAr: "طقم جوانات كامل 6D102", category: "gaskets", brand: "komatsu", listPrice: 1100, stockQty: 10, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-CAT-TURBO-320D", nameEn: "Turbocharger GT2556S", nameAr: "شاحن توربيني GT2556S", category: "turbochargers", brand: "caterpillar", listPrice: 4200, stockQty: 4, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-TURBO-PC300", nameEn: "Turbocharger HX40W", nameAr: "شاحن توربيني HX40W", category: "turbochargers", brand: "komatsu", listPrice: 3800, stockQty: 3, compat: ["Komatsu|PC300-8"] },
    { sku: "SAMPLE-BOSCH-INJ-320D", nameEn: "Common Rail Injector CR", nameAr: "رشاش وقود كومن ريل", category: "injectors", brand: "bosch", listPrice: 2100, stockQty: 18, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-PERK-INJ-1104", nameEn: "Fuel Injector 1104D", nameAr: "رشاش وقود 1104D", category: "injectors", brand: "perkins", listPrice: 1500, stockQty: 20, compat: ["JCB|3CX"] },
    { sku: "SAMPLE-CUM-LINER-6BT", nameEn: "Cylinder Liner 6BT", nameAr: "بطانة أسطوانة 6BT", category: "pistons", brand: "cummins", listPrice: 650, stockQty: 25, compat: ["Komatsu|PC200-8", "Hyundai CE|HX220S"] },

    // ── Hydraulics ──
    { sku: "SAMPLE-CAT-HYD-PUMP-320D", nameEn: "Main Hydraulic Pump AP2D36", nameAr: "مضخة هيدروليك رئيسية AP2D36", category: "hydraulic-pumps", brand: "caterpillar", listPrice: 8500, stockQty: 3, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-HYD-PUMP-PC200", nameEn: "Hydraulic Main Pump HPV95", nameAr: "مضخة هيدروليك رئيسية HPV95", category: "hydraulic-pumps", brand: "komatsu", listPrice: 9200, stockQty: 2, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-VOLVO-HYD-PUMP-EC210", nameEn: "Hydraulic Pump K3V112DT", nameAr: "مضخة هيدروليك K3V112DT", category: "hydraulic-pumps", brand: "volvo-ce", listPrice: 7800, stockQty: 4, compat: ["Volvo CE|EC210D"] },
    { sku: "SAMPLE-CAT-BOOM-CYL-320", nameEn: "Boom Cylinder Assembly", nameAr: "أسطوانة البوم الهيدروليكية", category: "hydraulic-cylinders", brand: "caterpillar", listPrice: 6500, stockQty: 2, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-ARM-CYL-PC200", nameEn: "Arm Cylinder", nameAr: "أسطوانة الذراع", category: "hydraulic-cylinders", brand: "komatsu", listPrice: 5800, stockQty: 3, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-HIT-BUCKET-CYL-ZX200", nameEn: "Bucket Cylinder", nameAr: "أسطوانة الدلو", category: "hydraulic-cylinders", brand: "hitachi", listPrice: 4200, stockQty: 5, compat: ["Hitachi|ZX200-6"] },
    { sku: "SAMPLE-CAT-CTRL-VALVE-320", nameEn: "Main Control Valve", nameAr: "صمام التحكم الرئيسي", category: "hydraulic-valves", brand: "caterpillar", listPrice: 5500, stockQty: 2, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-GENERIC-HYD-HOSE-1", nameEn: "High Pressure Hydraulic Hose 1/2\"", nameAr: "خرطوم هيدروليك ضغط عالي 1/2 بوصة", category: "hydraulic-hoses", brand: "caterpillar", listPrice: 280, stockQty: 50, compat: ["Caterpillar|320D", "Komatsu|PC200-8", "Volvo CE|EC210D"] },
    { sku: "SAMPLE-CAT-SEAL-KIT-320", nameEn: "Boom Cylinder Seal Kit", nameAr: "طقم حشوات أسطوانة البوم", category: "seal-kits", brand: "caterpillar", listPrice: 380, stockQty: 30, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-SEAL-KIT-PC200", nameEn: "Arm Cylinder Seal Kit", nameAr: "طقم حشوات أسطوانة الذراع", category: "seal-kits", brand: "komatsu", listPrice: 320, stockQty: 28, compat: ["Komatsu|PC200-8"] },

    // ── Undercarriage ──
    { sku: "SAMPLE-ITR-CHAIN-320D", nameEn: "Track Chain Assembly 49L", nameAr: "سلسلة جنزير 49 حلقة", category: "track-chains", brand: "itr-berco", listPrice: 4800, stockQty: 6, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-ITR-CHAIN-PC200", nameEn: "Track Chain Assembly PC200", nameAr: "سلسلة جنزير PC200", category: "track-chains", brand: "itr-berco", listPrice: 4500, stockQty: 8, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-CAT-ROLLER-TOP-320", nameEn: "Top Roller / Carrier Roller", nameAr: "بكرة علوية", category: "rollers", brand: "caterpillar", listPrice: 520, stockQty: 20, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-KOM-ROLLER-BTM-PC200", nameEn: "Bottom Roller / Track Roller", nameAr: "بكرة سفلية", category: "rollers", brand: "komatsu", listPrice: 580, stockQty: 18, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-CAT-IDLER-320D", nameEn: "Front Idler Assembly", nameAr: "بكرة توجيه أمامية", category: "idlers", brand: "caterpillar", listPrice: 1800, stockQty: 6, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-ITR-SPROCKET-320", nameEn: "Drive Sprocket", nameAr: "ترس الدفع", category: "idlers", brand: "itr-berco", listPrice: 1200, stockQty: 10, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-CAT-TRACK-SHOE-320", nameEn: "Track Shoe 600mm", nameAr: "حذاء جنزير 600 مم", category: "track-shoes", brand: "caterpillar", listPrice: 95, stockQty: 200, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-TRACK-SHOE-PC200", nameEn: "Track Shoe 500mm", nameAr: "حذاء جنزير 500 مم", category: "track-shoes", brand: "komatsu", listPrice: 85, stockQty: 180, compat: ["Komatsu|PC200-8"] },

    // ── Transmission & Drivetrain ──
    { sku: "SAMPLE-CAT-FINAL-DRIVE-320", nameEn: "Final Drive Motor Assembly", nameAr: "محرك الدفع النهائي", category: "final-drives", brand: "caterpillar", listPrice: 12500, stockQty: 2, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-FINAL-DRIVE-PC200", nameEn: "Travel Motor Assembly", nameAr: "موتور السير", category: "final-drives", brand: "komatsu", listPrice: 11800, stockQty: 2, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-CAT-SWING-GEAR-320", nameEn: "Swing Gear Ring", nameAr: "ترس الدوران", category: "gears-clutches", brand: "caterpillar", listPrice: 3200, stockQty: 3, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-VOLVO-CLUTCH-L120", nameEn: "Transmission Clutch Pack", nameAr: "طقم قابض ناقل الحركة", category: "gears-clutches", brand: "volvo-ce", listPrice: 4800, stockQty: 2, compat: ["Volvo CE|L120H"] },

    // ── Electrical ──
    { sku: "SAMPLE-CAT-ALTERNATOR-320", nameEn: "Alternator 24V 50A", nameAr: "مولد كهربائي 24 فولت 50 أمبير", category: "alternators-starters", brand: "caterpillar", listPrice: 1200, stockQty: 8, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-BOSCH-STARTER-24V", nameEn: "Starter Motor 24V 5.5kW", nameAr: "محرك بدء 24 فولت 5.5 كيلوواط", category: "alternators-starters", brand: "bosch", listPrice: 1600, stockQty: 6, compat: ["Caterpillar|320D", "Komatsu|PC200-8"] },
    { sku: "SAMPLE-KOM-PRESS-SENSOR", nameEn: "Hydraulic Pressure Sensor", nameAr: "حساس ضغط هيدروليك", category: "sensors", brand: "komatsu", listPrice: 420, stockQty: 15, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8"] },
    { sku: "SAMPLE-CAT-TEMP-SENSOR", nameEn: "Coolant Temperature Sensor", nameAr: "حساس حرارة المبرد", category: "sensors", brand: "caterpillar", listPrice: 180, stockQty: 25, compat: ["Caterpillar|320D", "Caterpillar|336F", "Caterpillar|950H"] },
    { sku: "SAMPLE-HIT-WIRING-ZX200", nameEn: "Engine Wiring Harness", nameAr: "حزمة أسلاك المحرك", category: "wiring-harnesses", brand: "hitachi", listPrice: 2200, stockQty: 3, compat: ["Hitachi|ZX200-6"] },
    { sku: "SAMPLE-CAT-WIRING-320D", nameEn: "Main Wiring Harness", nameAr: "حزمة أسلاك رئيسية", category: "wiring-harnesses", brand: "caterpillar", listPrice: 2800, stockQty: 2, compat: ["Caterpillar|320D"] },

    // ── Filters ──
    { sku: "SAMPLE-DON-OIL-FILTER-P55", nameEn: "Oil Filter P551807", nameAr: "فلتر زيت P551807", category: "oil-filters", brand: "donaldson", listPrice: 45, stockQty: 120, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-FLT-OIL-FILTER-LF9009", nameEn: "Oil Filter LF9009", nameAr: "فلتر زيت LF9009", category: "oil-filters", brand: "fleetguard", listPrice: 42, stockQty: 100, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8"] },
    { sku: "SAMPLE-BALD-OIL-FILTER-B7600", nameEn: "Oil Filter B7600", nameAr: "فلتر زيت B7600", category: "oil-filters", brand: "baldwin", listPrice: 38, stockQty: 90, compat: ["Volvo CE|EC210D", "Volvo CE|EC350E"] },
    { sku: "SAMPLE-DON-FUEL-FILTER-P55", nameEn: "Fuel Filter P551001", nameAr: "فلتر وقود P551001", category: "fuel-filters", brand: "donaldson", listPrice: 55, stockQty: 80, compat: ["Caterpillar|320D", "Caterpillar|336F", "Caterpillar|950H"] },
    { sku: "SAMPLE-FLT-FUEL-SEP-FS19732", nameEn: "Fuel/Water Separator FS19732", nameAr: "فاصل وقود/ماء FS19732", category: "fuel-filters", brand: "fleetguard", listPrice: 68, stockQty: 60, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8", "Komatsu|D65EX-18"] },
    { sku: "SAMPLE-DON-AIR-P82-PRIMARY", nameEn: "Primary Air Filter P828889", nameAr: "فلتر هواء أولي P828889", category: "air-filters", brand: "donaldson", listPrice: 95, stockQty: 50, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-DON-AIR-P82-SAFETY", nameEn: "Safety Air Filter P829333", nameAr: "فلتر هواء ثانوي P829333", category: "air-filters", brand: "donaldson", listPrice: 75, stockQty: 55, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-FLT-AIR-AF25708", nameEn: "Air Filter AF25708", nameAr: "فلتر هواء AF25708", category: "air-filters", brand: "fleetguard", listPrice: 88, stockQty: 45, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8"] },
    { sku: "SAMPLE-DON-HYD-FILTER-P17", nameEn: "Hydraulic Return Filter P173207", nameAr: "فلتر هيدروليك رجوع P173207", category: "hydraulic-filters", brand: "donaldson", listPrice: 110, stockQty: 35, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-KOM-HYD-FILTER-SUCT", nameEn: "Hydraulic Suction Strainer", nameAr: "مصفي هيدروليك شفط", category: "hydraulic-filters", brand: "komatsu", listPrice: 130, stockQty: 30, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8"] },

    // ── Cooling System ──
    { sku: "SAMPLE-CAT-RADIATOR-320D", nameEn: "Radiator Assembly", nameAr: "مجموعة المشع", category: "radiators", brand: "caterpillar", listPrice: 3500, stockQty: 3, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-RADIATOR-PC200", nameEn: "Radiator Core Assembly", nameAr: "مجموعة قلب المشع", category: "radiators", brand: "komatsu", listPrice: 3200, stockQty: 4, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-CAT-WATER-PUMP-C7", nameEn: "Water Pump C7 Engine", nameAr: "مضخة مياه محرك C7", category: "water-pumps", brand: "caterpillar", listPrice: 950, stockQty: 8, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-WATER-PUMP-6D102", nameEn: "Water Pump 6D102", nameAr: "مضخة مياه 6D102", category: "water-pumps", brand: "komatsu", listPrice: 880, stockQty: 10, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-CAT-FAN-CLUTCH-320", nameEn: "Fan Clutch Assembly", nameAr: "مجموعة قابض المروحة", category: "cooling-fans", brand: "caterpillar", listPrice: 1100, stockQty: 5, compat: ["Caterpillar|320D", "Caterpillar|336F"] },

    // ── Ground Engaging Tools ──
    { sku: "SAMPLE-CAT-TOOTH-J350", nameEn: "Bucket Tooth J350 Standard", nameAr: "سن دلو J350 قياسي", category: "bucket-teeth", brand: "caterpillar", listPrice: 65, stockQty: 200, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-KOM-TOOTH-PC200", nameEn: "Bucket Tooth ESCO Style", nameAr: "سن دلو نوع إسكو", category: "bucket-teeth", brand: "komatsu", listPrice: 58, stockQty: 180, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8"] },
    { sku: "SAMPLE-CAT-EDGE-320", nameEn: "Cutting Edge Bolt-On 1524mm", nameAr: "حافة قطع 1524 مم", category: "cutting-edges", brand: "caterpillar", listPrice: 420, stockQty: 15, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-CAT-ADAPTER-J350", nameEn: "Tooth Adapter J350", nameAr: "محول سن J350", category: "adapters", brand: "caterpillar", listPrice: 120, stockQty: 40, compat: ["Caterpillar|320D", "Caterpillar|336F"] },

    // ── Seals & Fasteners ──
    { sku: "SAMPLE-CAT-ORING-KIT", nameEn: "O-Ring Kit (Engine)", nameAr: "طقم حلقات دائرية (محرك)", category: "seals-fasteners", brand: "caterpillar", listPrice: 180, stockQty: 30, compat: ["Caterpillar|320D", "Caterpillar|336F"] },
    { sku: "SAMPLE-KOM-BOLT-TRACK", nameEn: "Track Bolt & Nut Set (per pair)", nameAr: "طقم مسمار وصامولة جنزير", category: "seals-fasteners", brand: "komatsu", listPrice: 8, stockQty: 500, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8"] },

    // ── Cabin & Body ──
    { sku: "SAMPLE-CAT-CABIN-GLASS-320", nameEn: "Front Window Glass", nameAr: "زجاج أمامي للكابينة", category: "cabin-body", brand: "caterpillar", listPrice: 850, stockQty: 5, compat: ["Caterpillar|320D"] },
    { sku: "SAMPLE-KOM-SEAT-PC200", nameEn: "Operator Seat with Suspension", nameAr: "مقعد المشغل مع ممتص صدمات", category: "cabin-body", brand: "komatsu", listPrice: 1400, stockQty: 4, compat: ["Komatsu|PC200-8", "Komatsu|PC300-8"] },
    { sku: "SAMPLE-CAT-MIRROR-320", nameEn: "Side Mirror Assembly", nameAr: "مجموعة مرآة جانبية", category: "cabin-body", brand: "caterpillar", listPrice: 220, stockQty: 12, compat: ["Caterpillar|320D", "Caterpillar|336F", "Caterpillar|950H"] },

    // ── Additional parts for brand coverage ──
    { sku: "SAMPLE-JCB-HYD-PUMP-3CX", nameEn: "Hydraulic Pump 3CX Backhoe", nameAr: "مضخة هيدروليك باك هو 3CX", category: "hydraulic-pumps", brand: "jcb", listPrice: 6200, stockQty: 3, compat: ["JCB|3CX"] },
    { sku: "SAMPLE-HYUNDAI-AIR-FILTER", nameEn: "Air Filter Element HX220S", nameAr: "فلتر هواء HX220S", category: "air-filters", brand: "hyundai", listPrice: 95, stockQty: 25, compat: ["Hyundai CE|HX220S"] },
    { sku: "SAMPLE-DOOSAN-TURBO-DX225", nameEn: "Turbocharger DX225LC", nameAr: "شاحن توربيني DX225LC", category: "turbochargers", brand: "doosan", listPrice: 3600, stockQty: 3, compat: ["Doosan / Develon|DX225LC-5"] },
    { sku: "SAMPLE-LIEBHERR-SWING-R920", nameEn: "Swing Motor R920", nameAr: "موتور الدوران R920", category: "final-drives", brand: "liebherr", listPrice: 8500, stockQty: 1, compat: ["Liebherr|R920"] },
    { sku: "SAMPLE-SANY-OIL-FILTER-215", nameEn: "Engine Oil Filter SY215C", nameAr: "فلتر زيت محرك SY215C", category: "oil-filters", brand: "sany", listPrice: 48, stockQty: 40, compat: ["SANY|SY215C"] },
    { sku: "SAMPLE-XCMG-FUEL-FILTER-215", nameEn: "Fuel Filter XE215DA", nameAr: "فلتر وقود XE215DA", category: "fuel-filters", brand: "xcmg", listPrice: 52, stockQty: 35, compat: ["XCMG|XE215DA"] },
    { sku: "SAMPLE-KOBELCO-HYD-CYL-SK200", nameEn: "Boom Cylinder SK200", nameAr: "أسطوانة بوم SK200", category: "hydraulic-cylinders", brand: "kobelco", listPrice: 5500, stockQty: 2, compat: ["Kobelco|SK200-10"] },
    { sku: "SAMPLE-CASE-TRACK-CX210", nameEn: "Track Chain CX210D", nameAr: "سلسلة جنزير CX210D", category: "track-chains", brand: "case", listPrice: 4600, stockQty: 4, compat: ["Case|CX210D"] },
    { sku: "SAMPLE-BOBCAT-HYD-PUMP-E85", nameEn: "Hydraulic Pump E85", nameAr: "مضخة هيدروليك E85", category: "hydraulic-pumps", brand: "bobcat", listPrice: 4800, stockQty: 3, compat: ["Bobcat|E85"] },
    { sku: "SAMPLE-JD-AIR-FILTER-210G", nameEn: "Air Filter 210G Excavator", nameAr: "فلتر هواء حفار 210G", category: "air-filters", brand: "john-deere", listPrice: 110, stockQty: 20, compat: ["John Deere|210G"] },
    { sku: "SAMPLE-PERK-GASKET-1104", nameEn: "Full Gasket Set 1104D", nameAr: "طقم جوانات كامل 1104D", category: "gaskets", brand: "perkins", listPrice: 750, stockQty: 12, compat: ["JCB|3CX"] },
    { sku: "SAMPLE-CUM-TURBO-HX35W", nameEn: "Turbocharger HX35W 6BT", nameAr: "شاحن توربيني HX35W 6BT", category: "turbochargers", brand: "cummins", listPrice: 3400, stockQty: 5, compat: ["Komatsu|PC200-8", "Hyundai CE|HX220S"] },

    // ── More filters for variety ──
    { sku: "SAMPLE-CAT-TRANS-FILTER", nameEn: "Transmission Oil Filter", nameAr: "فلتر زيت ناقل الحركة", category: "oil-filters", brand: "caterpillar", listPrice: 78, stockQty: 30, compat: ["Caterpillar|950H", "Caterpillar|D6T", "Caterpillar|140M"] },
    { sku: "SAMPLE-VOLVO-FUEL-FILTER-EC", nameEn: "Fuel Filter EC210D", nameAr: "فلتر وقود EC210D", category: "fuel-filters", brand: "volvo-ce", listPrice: 62, stockQty: 40, compat: ["Volvo CE|EC210D", "Volvo CE|EC350E"] },
    { sku: "SAMPLE-HIT-HYD-FILTER-ZX", nameEn: "Hydraulic Filter ZX200", nameAr: "فلتر هيدروليك ZX200", category: "hydraulic-filters", brand: "hitachi", listPrice: 115, stockQty: 28, compat: ["Hitachi|ZX200-6", "Hitachi|ZX350LC-6"] },

    // ── Cooling system extras ──
    { sku: "SAMPLE-VOLVO-RADIATOR-EC210", nameEn: "Radiator EC210D", nameAr: "مشع EC210D", category: "radiators", brand: "volvo-ce", listPrice: 3800, stockQty: 2, compat: ["Volvo CE|EC210D"] },
    { sku: "SAMPLE-HIT-WATER-PUMP-ZX200", nameEn: "Water Pump ZX200", nameAr: "مضخة مياه ZX200", category: "water-pumps", brand: "hitachi", listPrice: 920, stockQty: 6, compat: ["Hitachi|ZX200-6"] },

    // ── GET extras ──
    { sku: "SAMPLE-KOM-EDGE-PC200", nameEn: "Cutting Edge PC200 1320mm", nameAr: "حافة قطع PC200 1320 مم", category: "cutting-edges", brand: "komatsu", listPrice: 380, stockQty: 12, compat: ["Komatsu|PC200-8"] },
    { sku: "SAMPLE-VOLVO-TOOTH-EC210", nameEn: "Bucket Tooth EC210", nameAr: "سن دلو EC210", category: "bucket-teeth", brand: "volvo-ce", listPrice: 72, stockQty: 100, compat: ["Volvo CE|EC210D", "Volvo CE|EC350E"] },
  ]

  let partCount = 0
  for (const p of parts) {
    const catId = categoryMap[p.category]
    const bId = brandMap[p.brand]
    if (!catId || !bId) {
      console.warn(`⚠ Skipping ${p.sku}: category "${p.category}" or brand "${p.brand}" not found`)
      continue
    }

    const compatData = p.compat
      .map((c) => modelMap[c])
      .filter(Boolean)
      .map((equipmentModelId) => ({ equipmentModelId }))

    await prisma.part.upsert({
      where: { sku: p.sku },
      update: {
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        categoryId: catId,
        brandId: bId,
        listPrice: p.listPrice ?? null,
        stockQty: p.stockQty,
      },
      create: {
        sku: p.sku,
        nameEn: p.nameEn,
        nameAr: p.nameAr,
        categoryId: catId,
        brandId: bId,
        listPrice: p.listPrice ?? null,
        stockQty: p.stockQty,
        isActive: true,
        compatibility: compatData.length > 0 ? { create: compatData } : undefined,
      },
    })
    partCount++
  }
  console.log(`✓ Parts seeded (${partCount})`)

  // ── 7. Sample quote (keep existing if present) ──
  const existingQuote = await prisma.quote.findUnique({ where: { number: "RFQ-2026-0001" } })
  if (!existingQuote) {
    const firstPart = await prisma.part.findFirst({ where: { sku: "SAMPLE-CAT-320D-AIR-FILTER" } })
    if (firstPart) {
      const quote = await prisma.quote.create({
        data: {
          number: "RFQ-2026-0001",
          companyId: "comp-demo",
          status: "SUBMITTED",
          vatRate: 15,
          subtotal: 240,
          vatAmount: 36,
          total: 276,
          items: {
            create: [{ partId: firstPart.id, quantity: 2, unitPrice: 120, lineTotal: 240 }],
          },
        },
      })
      console.log("✓ Sample quote seeded:", quote.number)
    }
  } else {
    console.log("✓ Sample quote already exists")
  }

  console.log("🎉 Seed complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
