"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLang } from "@/context/LangContext"
import { fadeInLeft, fadeInRight, staggerContainer } from "@/lib/motion"

interface HeroSectionProps {
  className?: string
}

export const HeroSection = ({ className }: HeroSectionProps) => {
  const { t, isArabic } = useLang()

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <section
      id="home"
      className={cn(
        "relative min-h-screen flex items-center overflow-hidden bg-brand-iron",
        className
      )}
    >
      {/* Background equipment image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/equipment/excavator-1.jpg"
          alt="Heavy excavator — Riyada Ventures HESP"
          fill
          className="object-cover opacity-22 grayscale"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-iron via-brand-iron/88 to-brand-iron/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-iron via-transparent to-transparent" />
        {/* Amber diagonal accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-amber/5 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Left amber line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-amber/60 to-transparent z-10" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 w-full">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={cn("max-w-3xl", isArabic && "mr-auto")}
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* Live badge */}
          <motion.div
            variants={isArabic ? fadeInRight : fadeInLeft}
            className={cn("inline-flex items-center gap-2.5 mb-10", isArabic && "flex-row-reverse")}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" />
            <span className="text-brand-amber text-[10px] font-bold uppercase tracking-[0.25em]">
              {t.hero.tag}
            </span>
          </motion.div>

          {/* Headline line 1 */}
          <motion.div variants={isArabic ? fadeInRight : fadeInLeft} className="overflow-hidden mb-2">
            <h1
              className={cn(
                "text-brand-white leading-[0.9]",
                isArabic
                  ? "font-arabic font-bold text-[clamp(3.5rem,9vw,8rem)]"
                  : "font-display font-extrabold uppercase tracking-tight text-[clamp(4.5rem,11vw,10rem)]"
              )}
            >
              {t.hero.headline1}
            </h1>
          </motion.div>

          {/* Headline line 2 — amber */}
          <motion.div variants={isArabic ? fadeInRight : fadeInLeft} className="overflow-hidden mb-12">
            <h1
              className={cn(
                "text-brand-amber leading-[0.9]",
                isArabic
                  ? "font-arabic font-bold text-[clamp(3.5rem,9vw,8rem)]"
                  : "font-display font-extrabold uppercase tracking-tight text-[clamp(4.5rem,11vw,10rem)]"
              )}
            >
              {t.hero.headline2}
            </h1>
          </motion.div>

          {/* Divider line */}
          <motion.div
            variants={isArabic ? fadeInRight : fadeInLeft}
            className="w-24 h-px bg-brand-amber mb-10"
          />

          {/* Subheadline */}
          <motion.p
            variants={isArabic ? fadeInRight : fadeInLeft}
            className={cn(
              "text-brand-muted text-lg leading-relaxed max-w-xl mb-14",
              isArabic && "font-arabic"
            )}
          >
            {t.hero.sub}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={isArabic ? fadeInRight : fadeInLeft}
            className={cn("flex flex-wrap gap-4", isArabic && "flex-row-reverse")}
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("contact")}
              className={cn(
                "group flex items-center gap-3 bg-brand-amber text-white font-bold uppercase",
                "text-[11px] tracking-[0.22em] px-8 py-4 rounded-xl hover:bg-brand-gold",
                "transition-all shadow-xl shadow-brand-amber/30 cursor-pointer",
                isArabic && "font-arabic flex-row-reverse"
              )}
            >
              {t.hero.cta1}
              <ArrowRight
                size={15}
                className={cn(
                  "transition-transform duration-200",
                  isArabic ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
                )}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo("products")}
              className={cn(
                "flex items-center gap-3 border border-brand-white/20 text-brand-white font-bold",
                "uppercase text-[11px] tracking-[0.22em] px-8 py-4 rounded-xl",
                "hover:border-brand-amber hover:text-brand-amber transition-all cursor-pointer",
                isArabic && "font-arabic flex-row-reverse"
              )}
            >
              {t.hero.cta2}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating right tag */}
        <motion.div
          initial={{ opacity: 0, x: isArabic ? -40 : 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className={cn(
            "absolute bottom-28 hidden lg:flex flex-col items-center gap-3",
            isArabic ? "left-8 lg:left-24" : "right-8 lg:right-24"
          )}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-brand-amber/40" />
          <p
            className="text-brand-muted text-[9px] uppercase tracking-[0.3em] font-bold"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            Riyadh · KSA
          </p>
        </motion.div>
      </div>

      {/* Scroll down cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        onClick={() => scrollTo("stats")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-brand-muted z-10 cursor-pointer"
        aria-label="Scroll to content"
      >
        <span className="text-[8px] uppercase tracking-[0.35em] font-bold">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ChevronDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
