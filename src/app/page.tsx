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
    question: "What types of heavy equipment spare parts do you supply?",
    answer: "We supply a comprehensive range of spare parts for excavators, bulldozers, cranes, loaders, road construction equipment, and engine/hydraulic components. Our inventory covers parts for all major brands including CAT, Komatsu, Volvo, JCB, Hitachi, John Deere, Liebherr, Doosan, and Hyundai CE."
  },
  {
    question: "Do you offer OEM or aftermarket parts?",
    answer: "We offer both OEM (Original Equipment Manufacturer) and premium aftermarket parts. Our aftermarket parts are sourced from certified manufacturers and meet or exceed OEM specifications, offering significant cost savings without compromising quality."
  },
  {
    question: "How fast is delivery within Saudi Arabia?",
    answer: "We offer same-day pickup in Riyadh, express air freight delivery in 3-5 business days across Saudi Arabia, and standard shipping in 21-30 days. We maintain a large local inventory to ensure fast availability of common parts."
  },
  {
    question: "How can I request a quote for a specific part?",
    answer: "You can request a quote through our website's quote form, via WhatsApp at +966 55 228 2868, by email at info@riyada-ventures.com, or by calling us directly. Please provide the part number, equipment model, and quantity for the fastest response."
  },
  {
    question: "Do you ship internationally outside Saudi Arabia?",
    answer: "Yes, we serve over 30 countries across the Middle East, Africa, and Asia. International shipping is available via air freight and sea freight with competitive rates and reliable delivery times."
  },
  {
    question: "ما أنواع قطع غيار المعدات الثقيلة التي توفرونها؟",
    answer: "نوفر مجموعة شاملة من قطع الغيار للحفارات والجرافات والرافعات واللودرات ومعدات إنشاء الطرق ومكونات المحركات والهيدروليك. يغطي مخزوننا قطع جميع العلامات التجارية الكبرى بما في ذلك كاتربيلر وكوماتسو وفولفو وJCB وهيتاشي."
  },
]

export const metadata: Metadata = {
  title: "Riyada Ventures | Heavy Equipment Spare Parts Saudi Arabia | قطع غيار معدات ثقيلة السعودية",
  description: "Saudi Arabia's premier heavy equipment spare parts supplier. CAT, Komatsu, Volvo, JCB, Hitachi parts. Fast delivery across KSA. قطع غيار المعدات الثقيلة — توصيل سريع.",
  alternates: { canonical: "https://riyada-ventures.com" },
}

export default async function Home() {
  const { prisma } = await import("@/lib/db")
  const [categoriesData, featuredData] = await Promise.all([
    prisma.category.findMany({ orderBy: { nameEN: "asc" } }),
    prisma.product.findMany({ where: { featured: true } }),
  ])
  const cats = JSON.parse(JSON.stringify(categoriesData))
  const featured = JSON.parse(JSON.stringify(featuredData))
  return (
    <main className="min-h-screen bg-brand-iron">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
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
