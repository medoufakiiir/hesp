"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Package, MessageCircle } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/shared/PageHeader"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"
import type { Category } from "@/data/categories"
import type { Product } from "@/data/products"
import { staggerContainer, scaleIn, fadeInUp } from "@/lib/motion"
import { toArabicNum } from "@/lib/utils"

interface Props {
  category: Category
  products: Product[]
  otherCategories: Category[]
}

export default function CategoryPageClient({ category, products, otherCategories }: Props) {
  const { isArabic } = useLang()

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      {/* Hero banner */}
      <div className="relative pt-24 lg:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={category.image} alt={isArabic ? category.nameAR : category.nameEN}
            fill className="object-cover opacity-15 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-iron/80 via-brand-iron/90 to-brand-iron" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <Breadcrumb items={[
            { labelEN: "Products", labelAR: "المنتجات", href: "/products" },
            { labelEN: category.nameEN, labelAR: category.nameAR },
          ]} />
          <motion.div
            initial="hidden" animate="visible"
            variants={staggerContainer}
            className={`mt-8 ${isArabic ? "text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <motion.p variants={fadeInUp} className={`text-brand-amber text-xs font-semibold mb-3 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
              {isArabic ? `${toArabicNum(category.productCount)}+ قطعة متوفرة` : `${category.productCount}+ Parts Available`}
            </motion.p>
            <motion.h1 variants={fadeInUp}
              className={`text-brand-white leading-none mb-6 ${
                isArabic
                  ? "font-arabic font-bold text-[clamp(2.5rem,6vw,5rem)]"
                  : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,7vw,5.5rem)]"
              }`}>
              {isArabic ? category.nameAR : category.nameEN}
            </motion.h1>
            <motion.p variants={fadeInUp}
              className={`text-brand-muted text-lg max-w-3xl leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
              {isArabic ? category.descriptionAR : category.descriptionEN}
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8">
              <Link href="/quote"
                className={`inline-flex items-center gap-3 bg-brand-amber text-white font-bold
                  text-xs px-8 py-4 rounded-xl hover:bg-brand-gold transition-all
                  shadow-lg shadow-brand-amber/25 ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}>
                <MessageCircle size={16} />
                {isArabic ? "طلب عرض سعر" : "Request Quote"}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Products in this category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className={`text-brand-white font-bold text-2xl mb-10
          ${isArabic ? "font-arabic text-right" : "font-display font-extrabold uppercase tracking-tight"}`}>
          {isArabic ? "المنتجات في هذه الفئة" : "Products in This Category"}
        </h2>

        {products.length > 0 ? (
          <motion.div
            variants={staggerContainer} initial="hidden" animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={scaleIn}>
                <div className="group rounded-2xl overflow-hidden border border-brand-amber/10
                  hover:border-brand-amber/40 bg-brand-plate shadow-xl shadow-black/30
                  transition-all duration-300 hover:-translate-y-1.5">
                  <div className="relative h-44 overflow-hidden">
                    <Image src={product.image} alt={isArabic ? product.nameAR : product.nameEN}
                      fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale-[20%] group-hover:grayscale-0
                        group-hover:scale-105 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-plate via-transparent to-transparent" />
                    {product.inStock && (
                      <div className={`absolute top-3 end-3 bg-green-600/90 text-white text-[8px] font-bold
                        px-2 py-0.5 rounded-full flex items-center gap-1 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
                        <span className="w-1 h-1 rounded-full bg-green-300 animate-pulse" />
                        {isArabic ? "متوفر" : "In Stock"}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={11} className="text-brand-amber" />
                      <span className="text-brand-amber/60 text-[9px] font-bold uppercase tracking-widest">
                        {product.partNumber}
                      </span>
                    </div>
                    <h3 className={`text-brand-white font-semibold text-sm mb-1 ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? product.nameAR : product.nameEN}
                    </h3>
                    <p className={`text-brand-muted text-xs line-clamp-2 mb-3 ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? product.descriptionAR : product.descriptionEN}
                    </p>
                    <Link href="/quote"
                      className={`flex items-center gap-2 text-brand-amber text-xs font-semibold
                        hover:text-brand-gold transition-colors group/btn ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}>
                      {isArabic ? "اطلب الآن" : "Request Quote"}
                      <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-brand-plate rounded-2xl border border-brand-amber/10">
            <p className={`text-brand-muted text-lg mb-4 ${isArabic ? "font-arabic" : ""}`}>
              {isArabic ? "لا توجد منتجات معروضة حالياً. تواصل معنا لطلب أي قطعة." : "No products listed yet. Contact us to request any part."}
            </p>
            <Link href="/quote"
              className={`inline-flex items-center gap-2 bg-brand-amber text-white text-xs font-bold
                px-6 py-3 rounded-xl hover:bg-brand-gold transition-all ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
              {isArabic ? "طلب عرض سعر" : "Get Quote"}
            </Link>
          </div>
        )}
      </div>

      {/* Other Categories */}
      <div className="bg-brand-steel py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-brand-white font-bold text-2xl mb-8
            ${isArabic ? "font-arabic text-right" : "font-display font-extrabold uppercase tracking-tight"}`}>
            {isArabic ? "فئات أخرى" : "Other Categories"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {otherCategories.map((cat) => (
              <Link key={cat.id} href={`/products/${cat.slug}`}>
                <div className="group relative rounded-2xl overflow-hidden h-32 border border-brand-amber/10
                  hover:border-brand-amber/40 transition-all duration-300 hover:-translate-y-1">
                  <Image src={cat.image} alt={isArabic ? cat.nameAR : cat.nameEN}
                    fill sizes="20vw"
                    className="object-cover grayscale-[50%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
                  <div className="absolute bottom-3 start-3 end-3">
                    <h3 className={`text-brand-white font-semibold text-xs ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? cat.nameAR : cat.nameEN}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
