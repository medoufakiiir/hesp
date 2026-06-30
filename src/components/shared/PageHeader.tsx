"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"

interface PageHeaderProps {
  eyebrowEN: string
  eyebrowAR: string
  titleEN: string
  titleAR: string
  subtitleEN?: string
  subtitleAR?: string
}

export default function PageHeader({ eyebrowEN, eyebrowAR, titleEN, titleAR, subtitleEN, subtitleAR }: PageHeaderProps) {
  const isArabic = useLocale() === "ar"

  return (
    <section className="relative pt-32 lg:pt-36 pb-20 overflow-hidden">
      {/* Cinematic background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.04] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={isArabic ? "text-right" : ""}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className={`text-brand-amber text-xs font-semibold mb-3 ${isArabic ? "font-arabic" : "uppercase tracking-[0.25em]"}`}
          >
            {isArabic ? eyebrowAR : eyebrowEN}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`text-brand-white leading-[0.95] mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,7vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,8vw,6rem)]"
            }`}
          >
            {isArabic ? titleAR : titleEN}
          </motion.h1>
          {subtitleEN && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className={`text-brand-muted text-lg max-w-2xl ${isArabic ? "font-arabic" : ""}`}
            >
              {isArabic ? subtitleAR : subtitleEN}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
