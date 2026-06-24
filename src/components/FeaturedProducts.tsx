"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Package } from "lucide-react"
import { useLang } from "@/context/LangContext"

export default function FeaturedProducts({ productsData }: { productsData: Record<string, any>[] }) {
  const { isArabic } = useLang()
  const featured = productsData

  return (
    <section className="py-24 lg:py-32 bg-brand-steel relative overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-amber/[0.03] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.012]" style={{
          backgroundImage: "radial-gradient(rgba(217,119,6,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-14 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            {isArabic ? "المنتجات المميزة" : "Featured Products"}
          </p>
          <h2 className={`text-brand-white leading-[0.95] mb-4 ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2rem,5vw,4rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(2.5rem,6vw,5rem)]"
          }`}>
            {isArabic ? "أبرز قطع الغيار" : "Top Selling Parts"}
          </h2>
          <p className={`text-brand-muted max-w-xl text-base ${isArabic ? "font-arabic" : ""}`}>
            {isArabic
              ? "القطع الأكثر طلباً من عملائنا — متوفرة للتوصيل الفوري."
              : "Our most requested parts by fleet managers — ready for immediate dispatch."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5" style={{ perspective: "1000px" }}>
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotateX: -2, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link href={`/products/${product.category}`}>
                <div className="group rounded-2xl overflow-hidden cursor-pointer relative
                  bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent
                  backdrop-blur-sm border border-white/[0.06]
                  hover:border-brand-amber/25 hover:shadow-2xl hover:shadow-brand-amber/10
                  transition-[border,box-shadow] duration-500">

                  {/* Glass top highlight */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={isArabic ? product.nameAR : product.nameEN}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-plate via-brand-plate/30 to-transparent" />
                    {product.inStock && (
                      <div className="absolute top-3 right-3 bg-emerald-500/15 text-emerald-400 text-[9px] font-bold
                        uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/20 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {isArabic ? "متوفر" : "In Stock"}
                      </div>
                    )}
                  </div>

                  <div className="p-5 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={12} className="text-brand-amber" />
                      <span className="text-brand-amber/50 text-[10px] font-bold uppercase tracking-widest">
                        {product.partNumber}
                      </span>
                    </div>
                    <h3 className={`text-brand-white font-semibold text-sm mb-1 line-clamp-2
                      group-hover:text-brand-white transition-colors ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? product.nameAR : product.nameEN}
                    </h3>
                    <p className={`text-brand-muted text-xs line-clamp-2 mb-4 ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? product.descriptionAR.slice(0, 60) + "..." : product.descriptionEN.slice(0, 60) + "..."}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-brand-amber text-xs font-semibold uppercase tracking-widest
                        opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        {isArabic ? "اطلب الآن" : "Order Now"}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10
                        group-hover:bg-brand-amber group-hover:border-brand-amber
                        flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight size={14} className="text-brand-white/50 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-14 text-center"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08]
              text-brand-amber text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl
              hover:bg-brand-amber hover:text-white hover:border-brand-amber transition-all duration-300 backdrop-blur-sm"
          >
            {isArabic ? "تصفح الكتالوج الكامل" : "Browse Full Catalog"}
            <ArrowUpRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
