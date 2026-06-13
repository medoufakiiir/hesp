"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerContainer, scaleIn, fadeInUp } from "@/lib/motion"

const categoryImages = [
  "/images/equipment/excavator-1.jpg",
  "/images/equipment/bulldozer-1.jpg",
  "/images/equipment/crane-1.jpg",
  "/images/equipment/loader-1.jpg",
  "/images/equipment/compactor-1.jpg",
  "/images/equipment/hydraulic-parts.jpg",
]

export default function ProductCategories() {
  const { t, isArabic } = useLang()

  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="products" className="py-20 lg:py-28 bg-brand-iron">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`mb-16 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <motion.p variants={fadeInUp} className="text-brand-amber text-xs font-semibold uppercase tracking-widest mb-3">
            {t.categories.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className={`text-brand-white leading-none mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,6vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,7vw,6rem)]"
            }`}
          >
            {t.categories.title}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className={`text-brand-muted max-w-xl ${isArabic ? "font-arabic mr-auto" : ""}`}
          >
            {t.categories.sub}
          </motion.p>
        </motion.div>

        {/* 3×2 grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {t.categories.items.map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={scrollToContact}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-64
                border border-brand-amber/10 hover:border-brand-amber/40
                shadow-2xl shadow-black/40 transition-all duration-300"
            >
              {/* Background image */}
              <Image
                src={categoryImages[i]}
                alt={item.nameEN}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105
                  transition-all duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10
                group-hover:from-brand-iron/90 group-hover:via-brand-amber/10 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div>
                  <h3
                    className={`text-brand-white font-bold leading-tight mb-1 ${
                      isArabic ? "font-arabic text-xl" : "font-display font-extrabold uppercase text-2xl"
                    }`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    {item.nameEN}
                  </h3>
                  <p
                    className={`text-brand-muted text-sm leading-snug ${isArabic ? "font-arabic" : ""}`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    {item.descEN}
                  </p>
                </div>
                <div className={`mt-4 flex ${isArabic ? "justify-start flex-row-reverse" : "justify-between"} items-center`}>
                  <span className="text-brand-amber text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    {isArabic ? "اطلب الآن" : "Request Quote"}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-brand-amber/20 group-hover:bg-brand-amber
                    flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight size={16} className="text-brand-amber group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>

              {/* Top tag */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm border border-brand-white/10
                text-brand-white/70 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                {isArabic ? "قطع غيار" : "Spare Parts"}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
