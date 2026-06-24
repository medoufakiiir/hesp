"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Globe, Calendar } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"

export default function BrandsPageClient({ brandsData }: { brandsData: Record<string, any>[] }) {
  const { isArabic } = useLang()
  const brands = brandsData

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      {/* Cinematic Header */}
      <section className="relative pt-32 lg:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.04] blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ labelEN: "Brands", labelAR: "العلامات التجارية" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 ${isArabic ? "text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              {isArabic ? "العلامات التجارية" : "Our Brands"}
            </p>
            <h1 className={`text-brand-white leading-[0.95] mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,7vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,8vw,6rem)]"
            }`}>
              {isArabic ? "كل العلامات\nالكبرى" : "Every Major\nBrand"}
            </h1>
            <p className={`text-brand-muted text-lg max-w-2xl ${isArabic ? "font-arabic" : ""}`}>
              {isArabic
                ? "نوفر قطع أصلية وبديلة من أكبر شركات تصنيع المعدات الثقيلة في العالم."
                : "We source genuine and aftermarket parts from the world's leading heavy equipment manufacturers."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 40, rotateX: 6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotateY: 2, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Link href={`/brands/${brand.slug}`}>
                <div className="group relative p-8 rounded-2xl h-full cursor-pointer overflow-hidden
                  bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
                  backdrop-blur-sm border border-white/[0.07]
                  hover:border-brand-amber/25 hover:shadow-2xl hover:shadow-brand-amber/10
                  transition-[border,box-shadow] duration-500">

                  {/* Top glass line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
                  {/* Hover glow */}
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                    bg-gradient-to-br from-brand-amber/[0.08] via-transparent to-brand-amber/[0.03] pointer-events-none" />

                  <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                    <div className={`flex items-start justify-between mb-6 ${isArabic ? "flex-row-reverse" : ""}`}>
                      <div>
                        <h2 className={`text-brand-white font-display font-extrabold uppercase text-2xl tracking-tight mb-1
                          ${isArabic ? "font-arabic text-right" : ""}`}>
                          {brand.name}
                        </h2>
                        {isArabic && <p className="text-brand-amber/60 text-sm font-arabic">{brand.nameAR}</p>}
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.08]
                        group-hover:bg-brand-amber group-hover:border-brand-amber
                        flex items-center justify-center transition-all duration-300 flex-shrink-0">
                        <ArrowUpRight size={18} className="text-brand-white/40 group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    <p className={`text-brand-muted text-sm leading-relaxed line-clamp-3 mb-6
                      ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? brand.descriptionAR.slice(0, 120) + "..." : brand.descriptionEN.slice(0, 120) + "..."}
                    </p>

                    <div className="h-px bg-white/[0.04] mb-4" />

                    <div className={`flex items-center gap-4 text-brand-white/25 text-xs ${isArabic ? "flex-row-reverse" : ""}`}>
                      <div className="flex items-center gap-1.5">
                        <Globe size={12} className="text-brand-amber/50" />
                        <span>{brand.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={12} className="text-brand-amber/50" />
                        <span>{isArabic ? `تأسست ${brand.founded}` : `Est. ${brand.founded}`}</span>
                      </div>
                    </div>
                  </div>

                  {/* Corner index */}
                  <span className="absolute top-3 right-4 text-brand-white/[0.02] group-hover:text-brand-amber/[0.06]
                    font-display font-extrabold text-7xl transition-colors duration-500 pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
