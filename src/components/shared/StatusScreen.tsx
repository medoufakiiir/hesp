"use client"

import { motion } from "framer-motion"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { staggerContainer, fadeInUp } from "@/lib/motion"

interface StatusAction {
  label: string
  href: string
  /** Plain <a> for routes outside the [locale] segment (e.g. /admin/*). */
  plain?: boolean
}

interface StatusScreenProps {
  code: string
  eyebrow: string
  title: string
  message: string
  primary: StatusAction
  secondary?: StatusAction
}

/** Full-screen branded status page (404 / 403) with site chrome. */
export default function StatusScreen({ code, eyebrow, title, message, primary, secondary }: StatusScreenProps) {
  const isArabic = useLocale() === "ar"

  const secondaryClasses = `border border-brand-white/15 text-brand-white text-xs font-bold px-8 py-4 rounded-xl
    hover:border-brand-amber hover:text-brand-amber transition-colors
    ${isArabic ? "font-arabic text-sm" : "uppercase tracking-widest"}`

  return (
    <main className="min-h-screen bg-brand-iron flex flex-col">
      <Navbar />

      <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-32 pb-24">
        {/* Cinematic background depth — same treatment as PageHeader */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.05] blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          dir={isArabic ? "rtl" : "ltr"}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.p
            variants={fadeInUp}
            className={`text-brand-amber text-xs font-semibold mb-4 ${isArabic ? "font-arabic" : "uppercase tracking-[0.25em]"}`}
          >
            {eyebrow}
          </motion.p>

          <motion.p
            variants={fadeInUp}
            aria-hidden="true"
            className="font-display font-extrabold leading-[0.85] tracking-tight select-none
              text-[clamp(7rem,24vw,14rem)] text-transparent bg-clip-text bg-gradient-to-b from-brand-gold via-brand-amber to-brand-dust"
          >
            {code}
          </motion.p>

          <motion.h1
            variants={fadeInUp}
            className={`text-brand-white mb-4 mt-2 ${
              isArabic
                ? "font-arabic font-bold text-3xl sm:text-4xl"
                : "font-display font-extrabold uppercase tracking-tight text-4xl sm:text-5xl"
            }`}
          >
            {title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className={`text-brand-muted text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10 ${isArabic ? "font-arabic" : ""}`}
          >
            {message}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={primary.href}
              className={`bg-brand-amber text-white text-xs font-bold px-8 py-4 rounded-xl
                hover:bg-brand-gold transition-colors shadow-2xl shadow-brand-amber/20
                ${isArabic ? "font-arabic text-sm" : "uppercase tracking-widest"}`}
            >
              {primary.label}
            </Link>
            {secondary && (
              secondary.plain ? (
                <a href={secondary.href} className={secondaryClasses}>{secondary.label}</a>
              ) : (
                <Link href={secondary.href} className={secondaryClasses}>{secondary.label}</Link>
              )
            )}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
