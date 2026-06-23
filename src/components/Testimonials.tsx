"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useLang } from "@/context/LangContext"

export default function Testimonials() {
  const { t, isArabic } = useLang()

  return (
    <section className="py-24 lg:py-32 bg-brand-steel relative overflow-hidden">
      {/* Decorative depth */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-amber/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-14 text-center ${isArabic ? "font-arabic" : ""}`}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-brand-amber/40" />
            <span className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em]">
              {t.testimonials.eyebrow}
            </span>
            <span className="h-px w-8 bg-brand-amber/40" />
          </div>
          <h2 className={`text-brand-white leading-[0.95] mx-auto max-w-2xl ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2rem,5vw,4rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(2.5rem,5vw,5rem)]"
          }`}>
            {t.testimonials.title}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
          {t.testimonials.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10, rotateY: 2, scale: 1.02 }}
              className="group relative p-8 rounded-2xl cursor-default flex flex-col overflow-hidden
                bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent
                backdrop-blur-sm border border-white/[0.06]
                hover:border-brand-amber/20 hover:shadow-2xl hover:shadow-brand-amber/10
                transition-[border,box-shadow] duration-500"
              style={{ transformStyle: "preserve-3d" }}
              dir={isArabic ? "rtl" : "ltr"}
            >
              {/* Glass highlight line at top */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Hover glow */}
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                bg-gradient-to-br from-brand-amber/5 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 flex flex-col flex-grow">
                {/* Top: quote + stars */}
                <div className={`flex items-center justify-between mb-6 ${isArabic ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-xl bg-brand-amber/10 flex items-center justify-center">
                    <Quote size={16} className="text-brand-amber/60" style={{ transform: isArabic ? "scaleX(-1)" : "none" }} />
                  </div>
                  <div className={`flex gap-0.5 ${isArabic ? "flex-row-reverse" : ""}`}>
                    {[...Array(5)].map((_, si) => (
                      <Star key={si} size={12} className="text-brand-amber/70 fill-brand-amber/70" />
                    ))}
                  </div>
                </div>

                {/* Quote text */}
                <blockquote className={`text-brand-white/70 group-hover:text-brand-white/85 leading-relaxed flex-grow transition-colors duration-300 ${
                  isArabic ? "font-arabic text-[15px] text-right" : "text-sm"
                }`}>
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="h-px bg-white/[0.04]" />
                  <motion.div
                    className="absolute top-0 h-px bg-brand-amber/30"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "25%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={isArabic ? { right: 0 } : { left: 0 }}
                  />
                </div>

                {/* Author */}
                <div className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-brand-amber/10 border border-brand-amber/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-brand-amber text-sm font-bold">{item.name.charAt(0)}</span>
                  </div>
                  <div className={isArabic ? "text-right" : ""}>
                    <p className={`text-brand-white font-semibold text-sm ${isArabic ? "font-arabic" : ""}`}>{item.name}</p>
                    <p className={`text-brand-muted text-xs ${isArabic ? "font-arabic" : ""}`}>{item.company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
