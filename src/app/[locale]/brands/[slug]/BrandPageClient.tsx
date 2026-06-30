"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { ArrowUpRight, Package, MessageCircle, Globe, Calendar } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import type { Brand } from "@/data/brands"
import type { Product } from "@/data/products"
import type { Category } from "@/data/categories"
import { staggerContainer, scaleIn, fadeInUp } from "@/lib/motion"
import { toArabicNum } from "@/lib/utils"

interface Props {
  brand: Brand
  products: Product[]
  relatedCategories: Category[]
}

export default function BrandPageClient({ brand, products, relatedCategories }: Props) {
  const isArabic = useLocale() === "ar"

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      <div className="pt-32 lg:pt-36 pb-16 border-b border-brand-amber/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[
            { labelEN: "Brands", labelAR: "العلامات التجارية", href: "/brands" },
            { labelEN: brand.name, labelAR: brand.nameAR },
          ]} />
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}
            className={`mt-8 ${isArabic ? "text-right" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
            <motion.div variants={fadeInUp} className={`flex items-center gap-4 mb-6 ${isArabic ? "flex-row-reverse" : ""}`}>
              <div className={`flex items-center gap-3 text-brand-white/30 text-xs ${isArabic ? "flex-row-reverse" : ""}`}>
                <div className="flex items-center gap-1.5"><Globe size={12} /><span>{brand.country}</span></div>
                <span className="w-px h-3 bg-brand-white/10" />
                <div className="flex items-center gap-1.5"><Calendar size={12} /><span>{isArabic ? `تأسست ${toArabicNum(brand.founded)}` : `Est. ${brand.founded}`}</span></div>
              </div>
            </motion.div>
            <motion.h1 variants={fadeInUp}
              className={`text-brand-white leading-none mb-6 ${
                isArabic ? "font-arabic font-bold text-5xl" : "font-display font-extrabold uppercase tracking-tight text-6xl"
              }`}>
              {brand.name}
            </motion.h1>
            {isArabic && <motion.p variants={fadeInUp} className="text-brand-amber text-2xl font-arabic mb-6">{brand.nameAR}</motion.p>}
            <motion.p variants={fadeInUp} className={`text-brand-muted text-lg max-w-3xl leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
              {isArabic ? brand.descriptionAR : brand.descriptionEN}
            </motion.p>
            <motion.div variants={fadeInUp} className={`mt-8 flex gap-4 ${isArabic ? "flex-row-reverse" : ""}`}>
              <Link href="/quote"
                className={`inline-flex items-center gap-3 bg-brand-amber text-white font-bold
                  text-xs px-8 py-4 rounded-xl hover:bg-brand-gold transition-all
                  ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}>
                <MessageCircle size={16} />
                {isArabic ? `طلب قطع ${brand.nameAR}` : `Request ${brand.name} Parts`}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Categories for this brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className={`text-brand-white font-bold text-2xl mb-8
          ${isArabic ? "font-arabic text-right" : "font-display font-extrabold uppercase tracking-tight"}`}>
          {isArabic ? `فئات قطع ${brand.nameAR}` : `${brand.name} Part Categories`}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedCategories.map((cat) => (
            <Link key={cat.id} href={`/products/${cat.slug}`}>
              <div className="group relative rounded-2xl overflow-hidden h-36 border border-brand-amber/10
                hover:border-brand-amber/40 transition-all duration-300 hover:-translate-y-1">
                <Image src={cat.image} alt={isArabic ? cat.nameAR : cat.nameEN} fill sizes="25vw"
                  className="object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                <div className="absolute bottom-3 start-3 end-3">
                  <h3 className={`text-brand-white font-semibold text-sm ${isArabic ? "font-arabic text-right" : ""}`}>
                    {isArabic ? cat.nameAR : cat.nameEN}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      {products.length > 0 && (
        <div className="bg-brand-steel py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-brand-white font-bold text-2xl mb-8
              ${isArabic ? "font-arabic text-right" : "font-display font-extrabold uppercase tracking-tight"}`}>
              {isArabic ? `منتجات ${brand.nameAR}` : `${brand.name} Products`}
            </h2>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {products.map((product) => (
                <motion.div key={product.id} variants={scaleIn}>
                  <div className="group rounded-2xl overflow-hidden border border-brand-amber/10
                    hover:border-brand-amber/40 bg-brand-plate shadow-xl shadow-black/30
                    transition-all duration-300 hover:-translate-y-1.5">
                    <div className="relative h-40 overflow-hidden">
                      <Image src={product.image} alt={isArabic ? product.nameAR : product.nameEN}
                        fill sizes="25vw"
                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-plate via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Package size={11} className="text-brand-amber" />
                        <span className="text-brand-amber/60 text-[9px] font-bold uppercase tracking-widest">{product.partNumber}</span>
                      </div>
                      <h3 className={`text-brand-white font-semibold text-sm mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                        {isArabic ? product.nameAR : product.nameEN}
                      </h3>
                      <Link href="/quote"
                        className={`flex items-center gap-2 text-brand-amber text-xs font-semibold hover:text-brand-gold transition-colors ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}>
                        {isArabic ? "اطلب الآن" : "Request Quote"}
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
