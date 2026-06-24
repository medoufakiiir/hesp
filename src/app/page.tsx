import type { Metadata } from "next"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import { LoadingScreen, ScrollHero, CinematicStats } from "@/components/cinematic"
import ProductCategories from "@/components/ProductCategories"
import FeaturedProducts from "@/components/FeaturedProducts"
import WhyChooseUs from "@/components/WhyChooseUs"
import BrandsCarousel from "@/components/BrandsCarousel"
import Testimonials from "@/components/Testimonials"
import ContactCTA from "@/components/ContactCTA"
import Footer from "@/components/Footer"
import FAQSection from "@/components/FAQSection"
import ScrollProgress from "@/components/ScrollProgress"
import { faqJsonLd } from "@/lib/seo"

const TwoWorlds = dynamic(() => import("@/components/cinematic/TwoWorlds"), {
  loading: () => <div className="min-h-screen bg-brand-iron" aria-hidden="true" />,
})

const ClosingCTA = dynamic(() => import("@/components/cinematic/ClosingCTA"), {
  loading: () => <div className="min-h-screen bg-brand-iron" aria-hidden="true" />,
})

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

export default async function Home() {
  const { prisma } = await import("@/lib/db")
  const { categories: staticCategories } = await import("@/data/categories")
  const [rawCategories, rawParts] = await Promise.all([
    prisma.category.findMany({ orderBy: { nameEn: "asc" } }),
    prisma.part.findMany({
      where: { isActive: true, listPrice: { not: null } },
      take: 8,
      include: { category: true, brand: true, images: { take: 1 } },
    }),
  ])
  const cats = rawCategories.map((c: any) => {
    const sc = staticCategories.find((s: any) => s.slug === c.slug)
    return {
      id: c.id, slug: c.slug, nameEN: c.nameEn, nameAR: c.nameAr,
      image: sc?.image || "/images/equipment/gear-parts.jpg",
    }
  })
  const featured = rawParts.map((p: any) => ({
    id: p.id, slug: p.sku, nameEN: p.nameEn, nameAR: p.nameAr,
    descriptionEN: p.descriptionEn || "", descriptionAR: p.descriptionAr || "",
    image: p.images?.[0]?.url || "/images/equipment/gear-parts.jpg",
    category: p.category?.slug || "", brand: p.brand?.slug || "",
    partNumber: p.sku, inStock: p.stockQty > 0, featured: true,
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
      <BrandsCarousel />
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
