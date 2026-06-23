export interface Category {
  id: string
  slug: string
  nameEN: string
  nameAR: string
  descriptionEN: string
  descriptionAR: string
  image: string
  icon: string
  metaTitleEN: string
  metaTitleAR: string
  metaDescEN: string
  metaDescAR: string
  keywordsEN: string[]
  keywordsAR: string[]
  productCount: number
}

export const categories: Category[] = [
  {
    id: "excavator-parts",
    slug: "excavator-parts",
    nameEN: "Excavator Parts",
    nameAR: "قطع غيار حفارات",
    descriptionEN: "Complete range of excavator spare parts including hydraulic cylinders, boom arms, buckets, track chains, sprockets, rollers, swing motors, and final drives. Compatible with CAT, Komatsu, Hitachi, Volvo, and all major brands.",
    descriptionAR: "مجموعة كاملة من قطع غيار الحفارات تشمل الأسطوانات الهيدروليكية والأذرع والجرافات وسلاسل الجنزير والعجلات المسننة والبكرات ومحركات الدوران ومحركات الحركة النهائية. متوافقة مع كاتربيلر وكوماتسو وهيتاشي وفولفو وجميع العلامات الكبرى.",
    image: "/images/equipment/excavator-1.jpg",
    icon: "Shovel",
    metaTitleEN: "Excavator Spare Parts Supplier Saudi Arabia | OEM & Aftermarket",
    metaTitleAR: "قطع غيار حفارات في السعودية | قطع أصلية وبديلة",
    metaDescEN: "Buy excavator spare parts in Saudi Arabia. Hydraulic pumps, boom cylinders, track links, buckets & more for CAT, Komatsu, Hitachi. Fast delivery across KSA.",
    metaDescAR: "اشترِ قطع غيار الحفارات في السعودية. مضخات هيدروليكية، أسطوانات، سلاسل جنزير والمزيد لكاتربيلر وكوماتسو وهيتاشي. توصيل سريع في المملكة.",
    keywordsEN: ["excavator parts", "excavator spare parts Saudi Arabia", "CAT excavator parts", "Komatsu excavator parts", "hydraulic excavator parts"],
    keywordsAR: ["قطع غيار حفارات", "قطع حفارات السعودية", "قطع غيار حفار كاتربيلر"],
    productCount: 2450,
  },
  {
    id: "bulldozer-parts",
    slug: "bulldozer-parts",
    nameEN: "Bulldozer & Dozer Parts",
    nameAR: "قطع غيار جرافات",
    descriptionEN: "Premium bulldozer spare parts including blades, cutting edges, track shoes, undercarriage components, transmission parts, and engine components. For CAT D-series, Komatsu D-series, and more.",
    descriptionAR: "قطع غيار جرافات متميزة تشمل الشفرات وحواف القطع وأحذية الجنزير ومكونات الهيكل السفلي وقطع ناقل الحركة ومكونات المحرك. لسلسلة كاتربيلر D وكوماتسو D والمزيد.",
    image: "/images/equipment/bulldozer-1.jpg",
    icon: "Tractor",
    metaTitleEN: "Bulldozer Parts Supplier Saudi Arabia | Dozer Undercarriage & Blades",
    metaTitleAR: "قطع غيار جرافات في السعودية | شفرات وهيكل سفلي",
    metaDescEN: "Quality bulldozer spare parts for CAT, Komatsu & more. Dozer blades, undercarriage, track shoes, cutting edges. Delivery across Saudi Arabia.",
    metaDescAR: "قطع غيار جرافات عالية الجودة لكاتربيلر وكوماتسو والمزيد. شفرات، هيكل سفلي، أحذية جنزير. توصيل في أنحاء السعودية.",
    keywordsEN: ["bulldozer parts", "dozer parts Saudi Arabia", "CAT bulldozer parts", "dozer blade", "undercarriage parts"],
    keywordsAR: ["قطع غيار جرافات", "شفرات جرافة", "قطع هيكل سفلي"],
    productCount: 1800,
  },
  {
    id: "crane-parts",
    slug: "crane-parts",
    nameEN: "Crane & Lifting Parts",
    nameAR: "قطع غيار رافعات",
    descriptionEN: "Crane spare parts and lifting equipment components including wire ropes, sheaves, hooks, boom sections, hydraulic cylinders, slewing rings, and outrigger parts for tower, mobile, and crawler cranes.",
    descriptionAR: "قطع غيار الرافعات ومكونات معدات الرفع تشمل حبال السلك والبكرات والخطاطيف وأقسام الذراع والأسطوانات الهيدروليكية وحلقات الدوران وأجزاء الدعامات للرافعات البرجية والمتحركة والزاحفة.",
    image: "/images/equipment/crane-1.jpg",
    icon: "CopyPlus",
    metaTitleEN: "Crane Parts Supplier Saudi Arabia | Tower & Mobile Crane Components",
    metaTitleAR: "قطع غيار رافعات في السعودية | مكونات رافعات برجية ومتحركة",
    metaDescEN: "Crane spare parts for tower, mobile & crawler cranes. Wire ropes, sheaves, hydraulic cylinders, slewing rings. Supplier in Saudi Arabia with fast delivery.",
    metaDescAR: "قطع غيار رافعات برجية ومتحركة وزاحفة. حبال سلك، بكرات، أسطوانات هيدروليكية. مورد في السعودية مع توصيل سريع.",
    keywordsEN: ["crane parts", "tower crane parts", "mobile crane parts Saudi Arabia", "crane wire rope", "slewing ring"],
    keywordsAR: ["قطع غيار رافعات", "قطع رافعة برجية", "حبال رافعة"],
    productCount: 1200,
  },
  {
    id: "loader-parts",
    slug: "loader-parts",
    nameEN: "Loader Parts",
    nameAR: "قطع غيار لودرات",
    descriptionEN: "Wheel loader and backhoe loader spare parts including buckets, teeth, hydraulic pumps, transmission parts, axle components, and cab accessories. For CAT, Komatsu, Volvo, JCB, and more.",
    descriptionAR: "قطع غيار اللودرات الأمامية والخلفية تشمل الجرافات والأسنان والمضخات الهيدروليكية وقطع ناقل الحركة ومكونات المحور وإكسسوارات الكابينة. لكاتربيلر وكوماتسو وفولفو وJCB والمزيد.",
    image: "/images/equipment/loader-1.jpg",
    icon: "Container",
    metaTitleEN: "Loader Spare Parts Saudi Arabia | Wheel Loader & Backhoe Parts",
    metaTitleAR: "قطع غيار لودرات في السعودية | قطع لودر أمامي وخلفي",
    metaDescEN: "Wheel loader & backhoe loader spare parts. Buckets, hydraulic pumps, transmission parts for CAT, Komatsu, Volvo, JCB. Saudi Arabia delivery.",
    metaDescAR: "قطع غيار لودرات أمامية وخلفية. جرافات، مضخات هيدروليكية، قطع ناقل حركة لكاتربيلر وكوماتسو وفولفو وJCB. توصيل في السعودية.",
    keywordsEN: ["loader parts", "wheel loader parts", "backhoe loader parts Saudi Arabia", "CAT loader parts"],
    keywordsAR: ["قطع غيار لودرات", "قطع لودر أمامي", "مضخة لودر"],
    productCount: 1650,
  },
  {
    id: "road-construction-parts",
    slug: "road-construction-parts",
    nameEN: "Road Construction Parts",
    nameAR: "قطع غيار إنشاء الطرق",
    descriptionEN: "Road construction equipment parts including compactor drums, grader blades, paver screeds, milling teeth, asphalt plant components, and roller bearings. For all major road construction brands.",
    descriptionAR: "قطع غيار معدات إنشاء الطرق تشمل أسطوانات الضغط وشفرات المسويات وألواح الرصف وأسنان الطحن ومكونات محطات الأسفلت وكراسي التحميل. لجميع العلامات التجارية الكبرى.",
    image: "/images/equipment/compactor-1.jpg",
    icon: "Route",
    metaTitleEN: "Road Construction Parts Saudi Arabia | Compactor, Grader & Paver Parts",
    metaTitleAR: "قطع غيار معدات الطرق في السعودية | هراسات ومسويات وآلات رصف",
    metaDescEN: "Road construction equipment parts — compactor drums, grader blades, paver screeds, milling teeth. Supplier in Saudi Arabia.",
    metaDescAR: "قطع غيار معدات إنشاء الطرق — أسطوانات ضغط، شفرات مسويات، ألواح رصف. مورد في السعودية.",
    keywordsEN: ["road construction parts", "compactor parts", "grader parts Saudi Arabia", "paver parts", "asphalt plant parts"],
    keywordsAR: ["قطع إنشاء طرق", "قطع هراسات", "شفرات مسوية"],
    productCount: 980,
  },
  {
    id: "engine-hydraulic-parts",
    slug: "engine-hydraulic-parts",
    nameEN: "Engine & Hydraulic Parts",
    nameAR: "قطع محركات وهيدروليك",
    descriptionEN: "Engine and hydraulic system components including turbochargers, fuel injectors, water pumps, hydraulic pumps, control valves, hydraulic motors, cylinders, filters, and hoses for all heavy equipment brands.",
    descriptionAR: "مكونات المحركات والأنظمة الهيدروليكية تشمل الشواحن التوربينية وحاقنات الوقود ومضخات المياه والمضخات الهيدروليكية وصمامات التحكم والمحركات الهيدروليكية والأسطوانات والفلاتر والخراطيم لجميع علامات المعدات الثقيلة.",
    image: "/images/equipment/hydraulic-parts.jpg",
    icon: "Cog",
    metaTitleEN: "Engine & Hydraulic Parts Saudi Arabia | Pumps, Valves & Turbochargers",
    metaTitleAR: "قطع محركات وهيدروليك في السعودية | مضخات وصمامات وشواحن",
    metaDescEN: "Engine & hydraulic spare parts for heavy equipment. Turbochargers, hydraulic pumps, control valves, fuel injectors. Fast delivery in Saudi Arabia.",
    metaDescAR: "قطع غيار محركات وهيدروليك للمعدات الثقيلة. شواحن توربينية، مضخات هيدروليكية، صمامات تحكم. توصيل سريع في السعودية.",
    keywordsEN: ["engine parts", "hydraulic parts", "hydraulic pump", "turbocharger heavy equipment", "hydraulic valve Saudi Arabia"],
    keywordsAR: ["قطع محركات", "قطع هيدروليك", "مضخة هيدروليكية", "شاحن توربيني"],
    productCount: 3200,
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug)
}
