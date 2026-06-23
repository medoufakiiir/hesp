export interface Product {
  id: string
  slug: string
  nameEN: string
  nameAR: string
  descriptionEN: string
  descriptionAR: string
  category: string
  brand: string
  image: string
  partNumber: string
  inStock: boolean
  featured: boolean
}

export const products: Product[] = [
  {
    id: "1", slug: "hydraulic-pump-cat-320d", nameEN: "Hydraulic Pump Assembly", nameAR: "مضخة هيدروليكية", descriptionEN: "High-pressure hydraulic main pump for CAT 320D/320D2 excavators. OEM quality replacement.", descriptionAR: "مضخة هيدروليكية رئيسية عالية الضغط لحفارات كاتربيلر 320D/320D2. بديل بجودة OEM.", category: "excavator-parts", brand: "caterpillar", image: "/images/Hydraulic Pump Assembly.jpg", partNumber: "272-6955", inStock: true, featured: true,
  },
  {
    id: "2", slug: "turbocharger-komatsu-pc300", nameEN: "Turbocharger Series X", nameAR: "شاحن توربيني سلسلة X", descriptionEN: "Turbocharger for Komatsu PC300-8 / PC350-8 with SA6D114E engine. Direct fit replacement.", descriptionAR: "شاحن توربيني لكوماتسو PC300-8 / PC350-8 بمحرك SA6D114E. بديل مباشر.", category: "engine-hydraulic-parts", brand: "komatsu", image: "/images/Turbocharger Series X.jpg", partNumber: "6745-81-8040", inStock: true, featured: true,
  },
  {
    id: "3", slug: "air-filter-heavy-duty", nameEN: "Heavy Duty Air Filter", nameAR: "فلتر هواء شاق", descriptionEN: "Heavy duty air filter element for CAT, Komatsu, and Volvo excavators and loaders. Universal fit.", descriptionAR: "فلتر هواء للخدمة الشاقة لحفارات ولودرات كاتربيلر وكوماتسو وفولفو. مقاس عالمي.", category: "engine-hydraulic-parts", brand: "caterpillar", image: "/images/Heavy Duty Air Filter.jpg", partNumber: "6I-2503", inStock: true, featured: true,
  },
  {
    id: "4", slug: "ecu-control-module", nameEN: "Control Module ECU", nameAR: "وحدة تحكم إلكترونية", descriptionEN: "Electronic control unit (ECU) for CAT 320D excavator. Programmed and ready to install.", descriptionAR: "وحدة تحكم إلكترونية (ECU) لحفار كاتربيلر 320D. مبرمجة وجاهزة للتركيب.", category: "engine-hydraulic-parts", brand: "caterpillar", image: "/images/Control Module ECU.jpg", partNumber: "309-7700", inStock: true, featured: true,
  },
  {
    id: "5", slug: "industrial-radiator", nameEN: "Industrial Radiator", nameAR: "رديتر صناعي", descriptionEN: "Heavy duty radiator for Komatsu PC200-8 excavator. Aluminum core with brass tanks.", descriptionAR: "رديتر صناعي للخدمة الشاقة لحفار كوماتسو PC200-8. قلب ألومنيوم مع خزانات نحاسية.", category: "engine-hydraulic-parts", brand: "komatsu", image: "/images/industrial-radiator.jpg", partNumber: "20Y-03-31111", inStock: true, featured: true,
  },
  {
    id: "6", slug: "bearing-grease-high-temp", nameEN: "High-Temp Bearing Grease", nameAR: "شحم تحميل عالي الحرارة", descriptionEN: "High temperature bearing grease for heavy equipment. Suitable for all construction machinery.", descriptionAR: "شحم تحميل عالي الحرارة للمعدات الثقيلة. مناسب لجميع معدات البناء.", category: "engine-hydraulic-parts", brand: "caterpillar", image: "/images/High-Temp Bearing Grease.jpg", partNumber: "GREASE-HT500", inStock: true, featured: false,
  },
  {
    id: "7", slug: "track-chain-cat-320", nameEN: "Track Chain Assembly", nameAR: "سلسلة جنزير", descriptionEN: "Complete track chain assembly for CAT 320 series excavators. Greased & sealed.", descriptionAR: "مجموعة سلسلة جنزير كاملة لحفارات كاتربيلر سلسلة 320. مشحمة ومحكمة.", category: "excavator-parts", brand: "caterpillar", image: "/images/equipment/excavator-1.jpg", partNumber: "CR5350/49", inStock: true, featured: false,
  },
  {
    id: "8", slug: "dozer-blade-d6", nameEN: "Dozer Blade Cutting Edge", nameAR: "حافة قطع شفرة جرافة", descriptionEN: "Heat-treated cutting edge for CAT D6 bulldozer blade. High carbon steel.", descriptionAR: "حافة قطع معالجة حرارياً لشفرة جرافة كاتربيلر D6. فولاذ عالي الكربون.", category: "bulldozer-parts", brand: "caterpillar", image: "/images/equipment/bulldozer-1.jpg", partNumber: "4T-6381", inStock: true, featured: false,
  },
  {
    id: "9", slug: "crane-wire-rope", nameEN: "Crane Wire Rope 16mm", nameAR: "حبل سلك رافعة 16مم", descriptionEN: "High strength crane wire rope, 16mm diameter, 6x36 construction. For tower and mobile cranes.", descriptionAR: "حبل سلك رافعة عالي القوة، قطر 16مم، تركيب 6x36. للرافعات البرجية والمتحركة.", category: "crane-parts", brand: "liebherr", image: "/images/equipment/crane-1.jpg", partNumber: "WR-1636-200", inStock: true, featured: false,
  },
  {
    id: "10", slug: "loader-bucket-teeth", nameEN: "Loader Bucket Teeth Set", nameAR: "طقم أسنان جرافة لودر", descriptionEN: "Set of 5 bucket teeth for CAT 950/966 wheel loaders. Forged alloy steel with pins and locks.", descriptionAR: "طقم 5 أسنان جرافة للودرات كاتربيلر 950/966. فولاذ سبائك مطروق مع دبابيس وأقفال.", category: "loader-parts", brand: "caterpillar", image: "/images/equipment/loader-1.jpg", partNumber: "1U3352", inStock: true, featured: false,
  },
  {
    id: "11", slug: "compactor-drum-shell", nameEN: "Compactor Drum Shell", nameAR: "غلاف أسطوانة هراسة", descriptionEN: "Replacement drum shell for vibratory road rollers. High-strength steel construction.", descriptionAR: "غلاف أسطوانة بديل للهراسات الاهتزازية. تصنيع فولاذ عالي القوة.", category: "road-construction-parts", brand: "volvo", image: "/images/equipment/compactor-1.jpg", partNumber: "DS-VV-1200", inStock: true, featured: false,
  },
  {
    id: "12", slug: "hydraulic-cylinder-excavator", nameEN: "Boom Hydraulic Cylinder", nameAR: "أسطوانة هيدروليكية للذراع", descriptionEN: "Boom hydraulic cylinder for Komatsu PC200-8 excavator. Chrome-plated rod, hardened seals.", descriptionAR: "أسطوانة هيدروليكية للذراع لحفار كوماتسو PC200-8. قضيب مطلي بالكروم، حشوات مقواة.", category: "excavator-parts", brand: "komatsu", image: "/images/equipment/hydraulic-parts.jpg", partNumber: "707-01-XA110", inStock: true, featured: false,
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug)
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brand === brandSlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
