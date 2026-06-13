"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerContainer, scaleIn, fadeInUp } from "@/lib/motion"

export default function Testimonials() {
  const { t, isArabic } = useLang()

  return (
    <section className="py-20 lg:py-28 bg-brand-steel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`mb-14 text-center ${isArabic ? "font-arabic" : ""}`}
        >
          <motion.p variants={fadeInUp} className="text-brand-amber text-xs font-semibold uppercase tracking-widest mb-3">
            {t.testimonials.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className={`text-brand-white leading-none mx-auto max-w-2xl ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2rem,5vw,4rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(2.5rem,5vw,5rem)]"
            }`}
          >
            {t.testimonials.title}
          </motion.h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -8 }}
              className="group p-8 bg-brand-plate border border-brand-amber/15 rounded-2xl
                hover:border-brand-amber/40 shadow-2xl shadow-black/40 transition-all duration-300
                cursor-default flex flex-col"
              dir={isArabic ? "rtl" : "ltr"}
            >
              {/* Quote icon */}
              <Quote
                size={32}
                className="text-brand-amber/40 group-hover:text-brand-amber/70 transition-colors mb-6"
                style={{ transform: isArabic ? "scaleX(-1)" : "none" }}
              />

              {/* Stars */}
              <div className={`flex gap-1 mb-5 ${isArabic ? "flex-row-reverse justify-end" : ""}`}>
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={14} className="text-brand-amber fill-brand-amber" />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className={`text-brand-white/80 leading-relaxed mb-8 flex-grow ${
                  isArabic ? "font-arabic text-base text-right" : "text-sm"
                }`}
              >
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              {/* Client */}
              <div className={`pt-6 border-t border-brand-amber/10 ${isArabic ? "text-right" : ""}`}>
                <p className={`text-brand-white font-semibold ${isArabic ? "font-arabic" : ""}`}>
                  {item.name}
                </p>
                <p className={`text-brand-muted text-xs mt-1 ${isArabic ? "font-arabic" : ""}`}>
                  {item.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
