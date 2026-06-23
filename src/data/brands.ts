export interface Brand {
  id: string
  slug: string
  name: string
  nameAR: string
  descriptionEN: string
  descriptionAR: string
  country: string
  founded: string
  metaTitleEN: string
  metaTitleAR: string
  metaDescEN: string
  metaDescAR: string
  categories: string[]
}

export const brands: Brand[] = [
  {
    id: "caterpillar",
    slug: "caterpillar",
    name: "Caterpillar (CAT)",
    nameAR: "كاتربيلر",
    descriptionEN: "Caterpillar Inc. is the world's largest manufacturer of construction and mining equipment. We supply genuine and OEM-quality aftermarket parts for all CAT models including 320, 330, 336, D6, D7, D8, 950, 966, and more.",
    descriptionAR: "كاتربيلر هي أكبر شركة مصنعة لمعدات البناء والتعدين في العالم. نوفر قطع أصلية وبديلة بجودة OEM لجميع موديلات كاتربيلر بما في ذلك 320، 330، 336، D6، D7، D8، 950، 966 والمزيد.",
    country: "USA",
    founded: "1925",
    metaTitleEN: "Caterpillar (CAT) Spare Parts Saudi Arabia | Genuine & Aftermarket",
    metaTitleAR: "قطع غيار كاتربيلر في السعودية | أصلية وبديلة",
    metaDescEN: "Buy Caterpillar CAT spare parts in Saudi Arabia. Genuine OEM & quality aftermarket parts for excavators, bulldozers, loaders. Fast KSA delivery.",
    metaDescAR: "اشترِ قطع غيار كاتربيلر في السعودية. قطع أصلية OEM وبديلة عالية الجودة للحفارات والجرافات واللودرات. توصيل سريع.",
    categories: ["excavator-parts", "bulldozer-parts", "loader-parts", "engine-hydraulic-parts"],
  },
  {
    id: "komatsu",
    slug: "komatsu",
    name: "Komatsu",
    nameAR: "كوماتسو",
    descriptionEN: "Komatsu is the world's second largest manufacturer of construction equipment. We stock parts for PC200, PC300, PC400, WA380, WA470, D65, D85, D155 and the full Komatsu range.",
    descriptionAR: "كوماتسو هي ثاني أكبر شركة مصنعة لمعدات البناء في العالم. نوفر قطع غيار لـ PC200، PC300، PC400، WA380، WA470، D65، D85، D155 والمجموعة الكاملة من كوماتسو.",
    country: "Japan",
    founded: "1921",
    metaTitleEN: "Komatsu Spare Parts Saudi Arabia | OEM Parts for All Models",
    metaTitleAR: "قطع غيار كوماتسو في السعودية | قطع أصلية لجميع الموديلات",
    metaDescEN: "Komatsu spare parts supplier in Saudi Arabia. PC200, PC300, WA380, D65 parts. Hydraulic pumps, undercarriage, engine parts with fast delivery.",
    metaDescAR: "مورد قطع غيار كوماتسو في السعودية. قطع PC200، PC300، WA380، D65. مضخات هيدروليكية، هيكل سفلي، قطع محرك مع توصيل سريع.",
    categories: ["excavator-parts", "bulldozer-parts", "loader-parts", "engine-hydraulic-parts"],
  },
  {
    id: "volvo",
    slug: "volvo",
    name: "Volvo CE",
    nameAR: "فولفو",
    descriptionEN: "Volvo Construction Equipment parts for excavators, wheel loaders, articulated haulers, and compactors. We supply parts for EC210, EC240, EC360, L60, L90, L120, A25, A30, and more.",
    descriptionAR: "قطع غيار فولفو لمعدات البناء للحفارات واللودرات والشاحنات المفصلية والهراسات. نوفر قطع لـ EC210، EC240، EC360، L60، L90، L120، A25، A30 والمزيد.",
    country: "Sweden",
    founded: "1832",
    metaTitleEN: "Volvo CE Parts Saudi Arabia | Excavator & Loader Spare Parts",
    metaTitleAR: "قطع غيار فولفو في السعودية | قطع حفارات ولودرات",
    metaDescEN: "Volvo Construction Equipment spare parts in Saudi Arabia. Parts for EC-series excavators, L-series loaders, A-series haulers. Fast delivery.",
    metaDescAR: "قطع غيار فولفو لمعدات البناء في السعودية. قطع لحفارات سلسلة EC، لودرات سلسلة L. توصيل سريع.",
    categories: ["excavator-parts", "loader-parts", "road-construction-parts"],
  },
  {
    id: "jcb",
    slug: "jcb",
    name: "JCB",
    nameAR: "جي سي بي",
    descriptionEN: "JCB spare parts for backhoe loaders, excavators, telehandlers, and skid steers. Parts available for 3CX, 4CX, JS200, JS220, 535-95, and the complete JCB range.",
    descriptionAR: "قطع غيار JCB للودرات الخلفية والحفارات والرافعات التلسكوبية. قطع متوفرة لـ 3CX، 4CX، JS200، JS220، 535-95 والمجموعة الكاملة من JCB.",
    country: "UK",
    founded: "1945",
    metaTitleEN: "JCB Parts Saudi Arabia | Backhoe Loader & Excavator Parts",
    metaTitleAR: "قطع غيار JCB في السعودية | قطع لودر خلفي وحفارات",
    metaDescEN: "JCB spare parts supplier Saudi Arabia. 3CX, 4CX backhoe parts, JS-series excavator parts, telehandler components. Fast KSA delivery.",
    metaDescAR: "مورد قطع غيار JCB في السعودية. قطع 3CX، 4CX، حفارات سلسلة JS. توصيل سريع في المملكة.",
    categories: ["excavator-parts", "loader-parts", "engine-hydraulic-parts"],
  },
  {
    id: "hitachi",
    slug: "hitachi",
    name: "Hitachi",
    nameAR: "هيتاشي",
    descriptionEN: "Hitachi Construction Machinery parts including ZX-series excavators, wheel loaders, and mining equipment. Parts for ZX200, ZX330, ZX350, ZX470, and all Hitachi models.",
    descriptionAR: "قطع غيار هيتاشي لمعدات البناء تشمل حفارات سلسلة ZX واللودرات ومعدات التعدين. قطع لـ ZX200، ZX330، ZX350، ZX470 وجميع موديلات هيتاشي.",
    country: "Japan",
    founded: "1910",
    metaTitleEN: "Hitachi Parts Saudi Arabia | ZX Excavator & Mining Parts",
    metaTitleAR: "قطع غيار هيتاشي في السعودية | قطع حفارات ZX والتعدين",
    metaDescEN: "Hitachi construction equipment parts in Saudi Arabia. ZX-series excavator parts, mining equipment components. Fast delivery across KSA.",
    metaDescAR: "قطع غيار هيتاشي لمعدات البناء في السعودية. قطع حفارات سلسلة ZX، مكونات معدات التعدين. توصيل سريع.",
    categories: ["excavator-parts", "crane-parts", "engine-hydraulic-parts"],
  },
  {
    id: "john-deere",
    slug: "john-deere",
    name: "John Deere",
    nameAR: "جون ديير",
    descriptionEN: "John Deere construction and forestry equipment parts. We supply parts for 210G, 350G excavators, 644K, 744K loaders, 850K dozers, and more.",
    descriptionAR: "قطع غيار جون ديير لمعدات البناء والغابات. نوفر قطع لحفارات 210G، 350G، لودرات 644K، 744K، جرافات 850K والمزيد.",
    country: "USA",
    founded: "1837",
    metaTitleEN: "John Deere Parts Saudi Arabia | Construction Equipment Parts",
    metaTitleAR: "قطع غيار جون ديير في السعودية | قطع معدات بناء",
    metaDescEN: "John Deere construction equipment spare parts in Saudi Arabia. Excavator, loader, dozer parts with fast delivery.",
    metaDescAR: "قطع غيار جون ديير لمعدات البناء في السعودية. قطع حفارات، لودرات، جرافات مع توصيل سريع.",
    categories: ["excavator-parts", "bulldozer-parts", "loader-parts"],
  },
  {
    id: "liebherr",
    slug: "liebherr",
    name: "Liebherr",
    nameAR: "ليبهر",
    descriptionEN: "Liebherr equipment parts for tower cranes, mobile cranes, excavators, and mining equipment. Parts for LTM, LTR, R-series, and T-series models.",
    descriptionAR: "قطع غيار ليبهر للرافعات البرجية والرافعات المتحركة والحفارات ومعدات التعدين. قطع لموديلات LTM، LTR، سلسلة R وسلسلة T.",
    country: "Switzerland",
    founded: "1949",
    metaTitleEN: "Liebherr Parts Saudi Arabia | Crane & Heavy Equipment Parts",
    metaTitleAR: "قطع غيار ليبهر في السعودية | قطع رافعات ومعدات ثقيلة",
    metaDescEN: "Liebherr spare parts for cranes, excavators & mining equipment in Saudi Arabia. Tower crane parts, mobile crane components. Fast delivery.",
    metaDescAR: "قطع غيار ليبهر للرافعات والحفارات ومعدات التعدين في السعودية. قطع رافعات برجية، مكونات رافعات متحركة. توصيل سريع.",
    categories: ["crane-parts", "excavator-parts", "engine-hydraulic-parts"],
  },
  {
    id: "doosan",
    slug: "doosan",
    name: "Doosan",
    nameAR: "دوسان",
    descriptionEN: "Doosan Infracore equipment parts for DX-series excavators, wheel loaders, and articulated dump trucks. Full parts coverage for all Doosan models.",
    descriptionAR: "قطع غيار دوسان للحفارات سلسلة DX واللودرات وشاحنات التفريغ المفصلية. تغطية كاملة لقطع جميع موديلات دوسان.",
    country: "South Korea",
    founded: "1896",
    metaTitleEN: "Doosan Parts Saudi Arabia | DX Excavator & Loader Parts",
    metaTitleAR: "قطع غيار دوسان في السعودية | قطع حفارات DX ولودرات",
    metaDescEN: "Doosan spare parts in Saudi Arabia. DX-series excavator parts, loader components. Quality aftermarket & OEM parts with delivery.",
    metaDescAR: "قطع غيار دوسان في السعودية. قطع حفارات سلسلة DX، مكونات لودرات. قطع بديلة وأصلية عالية الجودة مع توصيل.",
    categories: ["excavator-parts", "loader-parts", "engine-hydraulic-parts"],
  },
  {
    id: "hyundai",
    slug: "hyundai",
    name: "Hyundai CE",
    nameAR: "هيونداي",
    descriptionEN: "Hyundai Construction Equipment parts for HX-series excavators, HL-series wheel loaders, and more. OEM and aftermarket parts available.",
    descriptionAR: "قطع غيار هيونداي لمعدات البناء لحفارات سلسلة HX ولودرات سلسلة HL والمزيد. قطع أصلية وبديلة متوفرة.",
    country: "South Korea",
    founded: "1972",
    metaTitleEN: "Hyundai CE Parts Saudi Arabia | Excavator & Loader Parts",
    metaTitleAR: "قطع غيار هيونداي في السعودية | قطع حفارات ولودرات",
    metaDescEN: "Hyundai construction equipment parts in Saudi Arabia. HX excavators, HL loaders. OEM & aftermarket parts.",
    metaDescAR: "قطع غيار هيونداي لمعدات البناء في السعودية. حفارات HX، لودرات HL. قطع أصلية وبديلة.",
    categories: ["excavator-parts", "loader-parts"],
  },
]

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}

export function getAllBrandSlugs(): string[] {
  return brands.map((b) => b.slug)
}
