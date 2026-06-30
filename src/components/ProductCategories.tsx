"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { CategoryData } from "@/types/db"
import { toArabicNum } from "@/lib/utils"
import { useRef } from "react"

function Card3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 200, damping: 25 })
  const brightness = useTransform(y, [0, 0.5, 1], [1.15, 1, 0.9])
  const glareX = useTransform(x, [0, 1], ["-50%", "150%"])
  const glareY = useTransform(y, [0, 1], ["-50%", "150%"])

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }
  const handleLeave = () => { x.set(0.5); y.set(0.5) }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", filter: `brightness(${brightness.get()})` }}
      className={className}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glareX}px ${glareY}px, rgba(255,255,255,0.08) 0%, transparent 60%)`,
        }}
      />
    </motion.div>
  )
}

export default function ProductCategories({ categoriesData }: { categoriesData: CategoryData[] }) {
  const isArabic = useLocale() === "ar"
  const categories = categoriesData

  return (
    <section className="py-24 lg:py-32 bg-brand-iron relative overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      {/* 3D depth background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -right-32 w-96 h-96 rounded-full bg-brand-amber/[0.04] blur-[120px]" />
        <div className="absolute bottom-20 -left-32 w-72 h-72 rounded-full bg-brand-amber/[0.03] blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-16 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p className={`text-brand-amber text-xs font-semibold mb-3 ${isArabic ? "font-arabic" : "uppercase tracking-[0.25em]"}`}>
            {isArabic ? "فئات المنتجات" : "Product Categories"}
          </p>
          <h2 className={`text-brand-white leading-[0.95] mb-4 ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2.5rem,6vw,5rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,7vw,6rem)]"
          }`}>
            {isArabic ? "مصنوعة لكل آلة" : "Engineered for\nEvery Machine"}
          </h2>
          <p className={`text-brand-muted max-w-xl text-base leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
            {isArabic
              ? "قطع غيار متميزة تغطي الطيف الكامل من المعدات الثقيلة."
              : "Premium spare parts covering the full spectrum of heavy equipment."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/products/${cat.slug}`}>
                <Card3D className="group relative rounded-2xl overflow-hidden cursor-pointer h-72 border border-brand-white/[0.06] hover:border-brand-amber/30 shadow-2xl shadow-black/50 transition-[border] duration-500">
                  <Image
                    src={cat.image}
                    alt={isArabic ? cat.nameAR : cat.nameEN}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Multi-layer gradient for 3D depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6" style={{ transform: "translateZ(20px)" }}>
                    <h3
                      className={`text-brand-white font-bold leading-tight mb-2 ${
                        isArabic ? "font-arabic text-xl" : "font-display font-extrabold uppercase text-2xl tracking-tight"
                      }`}
                      dir={isArabic ? "rtl" : "ltr"}
                    >
                      {isArabic ? cat.nameAR : cat.nameEN}
                    </h3>
                    <p className={`text-brand-white/40 text-sm leading-snug line-clamp-2 ${isArabic ? "font-arabic" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
                      {isArabic ? (cat.descriptionAR || "").slice(0, 80) + "..." : (cat.descriptionEN || "").slice(0, 80) + "..."}
                    </p>
                    <div className={`mt-4 flex ${isArabic ? "justify-start flex-row-reverse" : "justify-between"} items-center`}>
                      <span className={`text-brand-amber text-xs font-semibold
                        opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
                        {isArabic ? `${toArabicNum(cat.productCount ?? 0)}+ قطعة` : `${cat.productCount ?? 0}+ parts`}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10
                        group-hover:bg-brand-amber group-hover:border-brand-amber flex items-center justify-center transition-all duration-300">
                        <ArrowUpRight size={18} className="text-brand-white/60 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Card3D>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 text-center"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 text-brand-amber text-sm font-semibold uppercase tracking-widest hover:text-brand-gold transition-colors"
          >
            {isArabic ? "عرض جميع المنتجات" : "View All Products"}
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
