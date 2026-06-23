"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LangContext"
import { blurFadeIn, staggerContainer } from "@/lib/motion"

const brands = [
  "Caterpillar", "Komatsu", "Volvo CE", "JCB", "Hitachi",
  "John Deere", "Liebherr", "Doosan", "Hyundai CE", "Manitowoc",
  "Cummins", "Perkins", "Bobcat", "Terex", "Deutz",
]

export default function BrandsCarousel() {
  const { t, isArabic } = useLang()

  const doubled = [...brands, ...brands]

  return (
    <section className="py-16 bg-brand-plate border-y border-brand-amber/10 overflow-hidden relative">
      {/* Subtle animated gradient bg */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand-amber/3 via-transparent to-brand-amber/3 pointer-events-none"
        animate={{ x: ["-50%", "50%"] }}
        transition={{ repeat: Infinity, duration: 12, ease: "linear", repeatType: "reverse" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`text-center ${isArabic ? "font-arabic" : ""}`}
        >
          <motion.p variants={blurFadeIn} className="text-brand-amber text-xs font-semibold uppercase tracking-widest mb-2">
            {t.brands.eyebrow}
          </motion.p>
          <motion.h2
            variants={blurFadeIn}
            className={`text-brand-white ${
              isArabic
                ? "font-arabic font-bold text-3xl"
                : "font-display font-extrabold uppercase tracking-tight text-4xl"
            }`}
          >
            {t.brands.title}
          </motion.h2>
        </motion.div>
      </div>

      {/* Marquee Row 1 — left to right */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-brand-plate to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-brand-plate to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee whitespace-nowrap">
          {doubled.map((brand, i) => (
            <span
              key={`row1-${i}`}
              className="inline-block mx-10 text-brand-white/25 hover:text-brand-amber
                transition-all duration-300 cursor-default select-none hover:scale-110"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {brand}
              <span className="ml-10 text-brand-amber/20">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — right to left (reverse) */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-brand-plate to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-brand-plate to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee-reverse whitespace-nowrap opacity-40">
          {doubled.map((brand, i) => (
            <span
              key={`row2-${i}`}
              className="inline-block mx-10 text-brand-white/15 select-none"
              style={{
                fontSize: "clamp(0.8rem, 1.5vw, 1.1rem)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              {brand}
              <span className="ml-10 text-brand-amber/10">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Brand grid with staggered reveal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3"
        >
          {brands.slice(0, 8).map((brand, i) => (
            <motion.div
              key={i}
              variants={blurFadeIn}
              whileHover={{ scale: 1.08, borderColor: "rgba(217, 119, 6, 0.5)" }}
              className="flex items-center justify-center py-4 px-3 bg-brand-steel/60
                border border-brand-amber/10 rounded-xl transition-all duration-300 cursor-default group"
            >
              <span className="text-brand-white/40 group-hover:text-brand-amber transition-colors duration-300
                text-xs font-bold uppercase tracking-wide text-center leading-tight">
                {brand}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
