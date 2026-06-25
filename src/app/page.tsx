import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { faqJsonLd } from "@/lib/seo"
import {
  getCategoryImage, getProductImage, getBrandLogo,
  HOMEPAGE_CATEGORY_SLUGS, FEATURED_PRODUCT_CATEGORY_SLUGS,
} from "@/data/catalog-assets"

const LoadingScreen = dynamic(() => import("@/components/cinematic/LoadingScreen"))
// Idle-gated wrapper around ScrollHero/Scene3D — keeps the 1MB Three.js bundle
// off the critical path so it can't block initial render (TBT fix).
const ScrollHero = dynamic(() => import("@/components/cinematic/HeroDeferred"), {
  loading: () => <div className="h-screen bg-brand-iron" />,
})
const CinematicStats = dynamic(() => import("@/components/cinematic/CinematicStats"), {
  loading: () => <div className="h-64 bg-brand-iron" />,
})
const TwoWorlds = dynamic(() => import("@/components/cinematic/TwoWorlds"), {
  loading: () => <div className="min-h-screen bg-brand-iron" aria-hidden="true" />,
})
const ClosingCTA = dynamic(() => import("@/components/cinematic/ClosingCTA"), {
  loading: () => <div className="min-h-screen bg-brand-iron" aria-hidden="true" />,
})
const ProductCategories = dynamic(() => import("@/components/ProductCategories"))
const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"))
const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"))
const BrandsCarousel = dynamic(() => import("@/components/BrandsCarousel"))
const Testimonials = dynamic(() => import("@/components/Testimonials"))
const ContactCTA = dynamic(() => import("@/components/ContactCTA"))
const FAQSection = dynamic(() => import("@/components/FAQSection"))
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"))

const homeFaqs = [
  {
    questionEN: "What types of heavy equipment spare parts do you supply?",
    questionAR: "ما أنواع قطع غيار المعدات الثقيلة التي توفرونها؟",
    answerEN: "We supply a comprehensive range of spare parts for excavators, bulldozers, cranes, loaders, road construction equipment, and engine/hydraulic components. Our inventory covers parts for all major brands including CAT, Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr, Doosan, and Hyundai CE.",
    answerAR: "نوفر مجموعة شاملة من قطع الغيار للحفارات والجرافات والرافعات واللودرات ومعدات إنشاء الطرق ومكونات المحركات والهيدروليك. يغطي مخزوننا قطع جميع العلامات التجارية الكبرى بما في ذلك كاتربيلر وكوماتسو وفولفو وJCB وهيتاشي.",
  },
  {
    questionEN: "Do you offer OEM or aftermarket parts?",
    questionAR: "هل توفرون قطع أصلية أو بديلة؟",
    answerEN: "We offer both OEM (Original Equipment Manufacturer) and premium aftermarket parts. Our aftermarket parts are sourced from certified manufacturers and meet or exceed OEM specifications, offering significant cost savings without compromising quality.",
    answerAR: "نوفر كلاً من قطع الغيار الأصلية (OEM) وقطع الغيار البديلة المتميزة. قطعنا البديلة مصدرها مصنعون معتمدون وتلبي أو تتجاوز مواصفات OEM، مما يوفر وفورات كبيرة في التكاليف دون المساومة على الجودة.",
  },
  {
    questionEN: "How fast is delivery within Saudi Arabia?",
    questionAR: "ما سرعة التوصيل داخل المملكة العربية السعودية؟",
    answerEN: "We offer same-day pickup in Riyadh, express air freight delivery in 3-5 business days across Saudi Arabia, and standard shipping in 21-30 days. We maintain a large local inventory to ensure fast availability of common parts.",
    answerAR: "نوفر استلام في نفس اليوم في الرياض، وشحن جوي سريع خلال 3-5 أيام عمل في أنحاء المملكة، وشحن عادي خلال 21-30 يوماً. نحتفظ بمخزون محلي كبير لضمان توفر القطع الشائعة بسرعة.",
  },
  {
    questionEN: "How can I request a quote for a specific part?",
    questionAR: "كيف يمكنني طلب عرض سعر لقطعة معينة؟",
    answerEN: "You can request a quote through our website's quote form, via WhatsApp at +966 55 228 2868, by email at info@riyada-ventures.com, or by calling us directly. Please provide the part number, equipment model, and quantity for the fastest response.",
    answerAR: "يمكنك طلب عرض سعر من خلال نموذج عرض الأسعار على موقعنا، أو عبر واتساب على الرقم 966552282868+، أو بالبريد الإلكتروني على info@riyada-ventures.com، أو بالاتصال المباشر. يرجى تقديم رقم القطعة وموديل المعدات والكمية للحصول على أسرع رد.",
  },
  {
    questionEN: "Do you ship internationally outside Saudi Arabia?",
    questionAR: "هل تشحنون دولياً خارج المملكة العربية السعودية؟",
    answerEN: "Yes, we serve over 30 countries across the Middle East, Africa, and Asia. International shipping is available via air freight and sea freight with competitive rates and reliable delivery times.",
    answerAR: "نعم، نخدم أكثر من 30 دولة في الشرق الأوسط وأفريقيا وآسيا. الشحن الدولي متاح عبر الشحن الجوي والبحري بأسعار تنافسية ومواعيد تسليم موثوقة.",
  },
]

export const metadata: Metadata = {
  title: "Riyada Ventures | Heavy Equipment Spare Parts Saudi Arabia | قطع غيار معدات ثقيلة السعودية",
  description: "Saudi Arabia's premier heavy equipment spare parts supplier. CAT, Komatsu, Volvo, JCB, Hitachi parts. Fast delivery across KSA. قطع غيار المعدات الثقيلة — توصيل سريع.",
  alternates: { canonical: "https://riyada-ventures.com" },
}

// Read live catalog data: regenerate at most every 5 min, and instantly
// on-demand whenever the admin panel mutates the catalog (revalidateCatalog).
// Without this the page is prerendered once at build time and would show
// stale counts (e.g. 0 parts) that never match the admin panel.
export const revalidate = 300

export default async function Home() {
  const { prisma } = await import("@/lib/db")
  const [rawCategories, rawFeaturedParts, rawBrands] = await Promise.all([
    prisma.category.findMany({ where: { slug: { in: [...HOMEPAGE_CATEGORY_SLUGS] } } }),
    prisma.part.findMany({
      where: {
        isActive: true,
        category: { slug: { in: [...FEATURED_PRODUCT_CATEGORY_SLUGS] } },
      },
      orderBy: { listPrice: "desc" },
      include: { category: true, brand: true, images: { take: 1 } },
    }),
    prisma.brand.findMany({ orderBy: { nameEn: "asc" } }),
  ])
  // Real part counts per homepage category (aggregating each parent's children).
  const catCounts = await Promise.all(
    HOMEPAGE_CATEGORY_SLUGS.map((slug) =>
      prisma.part.count({
        where: { isActive: true, category: { OR: [{ slug }, { parent: { slug } }] } },
      })
    )
  )
  const countBySlug: Record<string, number> = Object.fromEntries(
    HOMEPAGE_CATEGORY_SLUGS.map((slug, i) => [slug, catCounts[i]])
  )
  // Order the curated categories explicitly (findMany order isn't guaranteed).
  const cats = HOMEPAGE_CATEGORY_SLUGS
    .map((slug) => rawCategories.find((c) => c.slug === slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((c) => ({
      id: c.id, slug: c.slug, nameEN: c.nameEn, nameAR: c.nameAr,
      image: getCategoryImage(c.slug),
      productCount: countBySlug[c.slug] ?? 0,
    }))
  // One part per featured category → every card shows a distinct image.
  const featured = FEATURED_PRODUCT_CATEGORY_SLUGS
    .map((slug) => rawFeaturedParts.find((p) => p.category?.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      id: p.id, slug: p.sku, nameEN: p.nameEn, nameAR: p.nameAr,
      descriptionEN: p.descriptionEn || "", descriptionAR: p.descriptionAr || "",
      image: getProductImage(p.images?.[0]?.url, p.category?.slug, p.sku),
      category: p.category?.slug || "", brand: p.brand?.slug || "",
      partNumber: p.sku, inStock: p.stockQty > 0, featured: true,
    }))
  const brandList = rawBrands.map((b) => ({
    id: b.id, slug: b.slug, name: b.nameEn, nameAR: b.nameAr,
    logo: getBrandLogo(b.slug, b.logoUrl),
  }))
  return (
    <main className="min-h-screen bg-brand-iron">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs.map(f => ({ question: f.questionEN, answer: f.answerEN })))) }}
      />
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />

      {/* ── Cinematic sections ── */}
      <ScrollHero />
      <CinematicStats />
      <div className="section-divider" />
      <TwoWorlds />
      <div className="section-divider" />
      <ClosingCTA />

      {/* ── Existing sections ── */}
      <div className="section-divider" />
      <ProductCategories categoriesData={cats} />
      <div className="section-divider" />
      <FeaturedProducts productsData={featured} />
      <div className="section-divider" />
      <WhyChooseUs />
      <div className="section-divider" />
      <BrandsCarousel brandsData={brandList} />
      <div className="section-divider" />
      <Testimonials />
      <div className="section-divider" />
      <FAQSection faqs={homeFaqs} />
      <div className="section-divider" />
      <ContactCTA />
      <Footer />
    </main>
  )
}
