"use client"

import { motion } from "framer-motion"
import { useLang } from "@/context/LangContext"
import { fadeInUp } from "@/lib/motion"

const brands = [
  "Caterpillar", "Komatsu", "Volvo CE", "JCB", "Hitachi",
  "John Deere", "Liebherr", "Doosan", "Hyundai CE", "Manitowoc",
  "Cummins", "Perkins", "Bobcat", "Terex", "Deutz",
]

export default function BrandsCarousel() {
  const { t, isArabic } = useLang()

  const doubled = [...brands, ...brands]

  return (
    <section className="py-16 bg-brand-plate border-y border-brand-amber/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`text-center ${isArabic ? "font-arabic" : ""}`}
        >
          <motion.p variants={fadeInUp} className="text-brand-amber text-xs font-semibold uppercase tracking-widest mb-2">
            {t.brands.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
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

      {/* Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-plate to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-plate to-transparent z-10 pointer-events-none" />
        <div className="animate-marquee whitespace-nowrap">
          {doubled.map((brand, i) => (
            <span
              key={i}
              className="inline-block mx-10 text-brand-white/30 hover:text-brand-amber
                transition-colors duration-300 cursor-default select-none"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.5rem)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {brand}
              <span className="ml-10 text-brand-amber/30">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Brand grid — static fallback / additional display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-3">
          {brands.slice(0, 8).map((brand, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center justify-center py-4 px-3 bg-brand-steel/60
                border border-brand-amber/10 hover:border-brand-amber/40
                rounded-xl transition-all duration-200 cursor-default"
            >
              <span className="text-brand-white/40 hover:text-brand-white/70 transition-colors
                text-xs font-bold uppercase tracking-wide text-center leading-tight">
                {brand}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
