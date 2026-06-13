"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/motion"

export default function HeroSection() {
  const { t, isArabic } = useLang()

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-brand-iron"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/equipment/excavator-1.jpg"
          alt="Heavy excavator on construction site"
          fill
          className="object-cover opacity-25 grayscale"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-iron via-brand-iron/85 to-brand-iron/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-iron via-transparent to-transparent" />
      </div>

      {/* Amber vertical accent line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-amber to-transparent z-10 opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={`max-w-3xl ${isArabic ? "mr-auto text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* Tag */}
          <motion.div
            variants={isArabic ? fadeInRight : fadeInLeft}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
            <span className="text-brand-amber text-xs font-semibold uppercase tracking-widest">
              {t.hero.tag}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={isArabic ? fadeInRight : fadeInLeft} className="overflow-hidden mb-3">
            <h1
              className={`text-brand-white leading-none ${
                isArabic
                  ? "font-arabic font-bold text-[clamp(3rem,8vw,7rem)]"
                  : "font-display font-extrabold uppercase tracking-tight text-[clamp(4rem,10vw,9rem)]"
              }`}
            >
              {t.hero.headline1}
            </h1>
          </motion.div>
          <motion.div variants={isArabic ? fadeInRight : fadeInLeft} className="overflow-hidden mb-10">
            <h1
              className={`text-brand-amber leading-none ${
                isArabic
                  ? "font-arabic font-bold text-[clamp(3rem,8vw,7rem)]"
                  : "font-display font-extrabold uppercase tracking-tight text-[clamp(4rem,10vw,9rem)]"
              }`}
            >
              {t.hero.headline2}
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={isArabic ? fadeInRight : fadeInLeft}
            className={`text-brand-muted text-lg leading-relaxed max-w-xl mb-12 ${isArabic ? "font-arabic" : ""}`}
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={isArabic ? fadeInRight : fadeInLeft}
            className={`flex flex-wrap gap-4 ${isArabic ? "flex-row-reverse" : ""}`}
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("contact")}
              className={`group flex items-center gap-3 bg-brand-amber text-white font-bold uppercase
                text-xs tracking-widest px-8 py-4 rounded-xl hover:bg-brand-gold transition-all
                shadow-lg shadow-brand-amber/25 cursor-pointer ${isArabic ? "font-arabic flex-row-reverse" : ""}`}
            >
              {t.hero.cta1}
              <ArrowRight size={16} className={`transition-transform duration-200 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("products")}
              className={`flex items-center gap-3 border border-brand-white/20 text-brand-white font-bold
                uppercase text-xs tracking-widest px-8 py-4 rounded-xl hover:border-brand-amber
                hover:text-brand-amber transition-all cursor-pointer ${isArabic ? "font-arabic flex-row-reverse" : ""}`}
            >
              {t.hero.cta2}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Decorative bottom stats hint */}
        <motion.div
          initial={{ opacity: 0, x: isArabic ? -60 : 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={`absolute bottom-24 ${isArabic ? "left-8 lg:left-24" : "right-8 lg:right-24"} hidden lg:flex flex-col items-center gap-3`}
        >
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-brand-amber/50" />
          <p className="text-brand-muted text-xs uppercase tracking-widest rotate-90 origin-center translate-y-8">
            Riyadh, KSA
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        onClick={() => scrollTo("stats")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted z-10 cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-widest font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.button>
    </section>
  )
}
