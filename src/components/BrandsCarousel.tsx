"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useLang } from "@/context/LangContext"
import { blurFadeIn, staggerContainer } from "@/lib/motion"

type BrandItem = {
  id: string
  slug: string
  name: string
  nameAR: string
  logo: string | null
}

// Used for the scrolling marquee + grid when the section is rendered without DB data.
const FALLBACK_NAMES = [
  "Caterpillar", "Komatsu", "Volvo CE", "JCB", "Hitachi",
  "John Deere", "Liebherr", "Doosan", "Hyundai CE", "Cummins",
  "Perkins", "Bosch", "Bobcat", "SANY", "XCMG",
]

/** Single brand cell: shows the real logo when present, else a styled wordmark.
 *  Grayscale by default, full colour on hover. onError downgrades a missing/broken
 *  logo file to the wordmark so the grid never shows a broken image. */
function BrandCard({ brand, isArabic }: { brand: BrandItem; isArabic: boolean }) {
  const [failed, setFailed] = useState(false)
  const label = isArabic ? brand.nameAR : brand.name
  const showLogo = brand.logo && !failed

  return (
    <motion.div
      variants={blurFadeIn}
      whileHover={{ scale: 1.06, borderColor: "rgba(217, 119, 6, 0.5)" }}
      className="group flex items-center justify-center h-20 px-4 bg-brand-steel/60
        border border-brand-amber/10 rounded-xl transition-all duration-300"
      title={label}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logo as string}
          alt={`${brand.name} logo`}
          loading="lazy"
          onError={() => setFailed(true)}
          // Concrete height (not max-h) — these SVGs are viewBox-only, so width
          // must derive from the aspect ratio or the image collapses to 0 width.
          // brightness-0 invert renders any brand colour as uniform white (dark
          // logos like Volvo navy would vanish on the dark card otherwise);
          // hover restores the real brand colour.
          className="h-9 w-auto max-w-[80%] object-contain
            brightness-0 invert opacity-80 transition-all duration-300
            group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100"
        />
      ) : (
        <span
          className="text-brand-white/55 group-hover:text-brand-amber transition-colors duration-300
            text-xs font-bold uppercase tracking-wide text-center leading-tight"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {label}
        </span>
      )}
    </motion.div>
  )
}

export default function BrandsCarousel({ brandsData = [] }: { brandsData?: BrandItem[] }) {
  const { t, isArabic } = useLang()

  const gridBrands: BrandItem[] = brandsData.length
    ? brandsData
    : FALLBACK_NAMES.map((name, i) => ({ id: `fallback-${i}`, slug: name, name, nameAR: name, logo: null }))

  const names = gridBrands.map((b) => (isArabic ? b.nameAR : b.name))
  const doubled = [...names, ...names]

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
          <motion.p variants={blurFadeIn} className={`text-brand-amber text-xs font-semibold mb-2 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
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

      {/* Brand logo grid with staggered reveal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3"
        >
          {gridBrands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} isArabic={isArabic} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
