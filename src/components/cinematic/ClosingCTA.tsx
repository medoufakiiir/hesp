"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { cinematicText } from "@/data/cinematic-translations"

function MagneticCTA({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2)
  }

  const handleLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function ClosingCTA() {
  const { lang, isArabic } = useLang()
  const t = cinematicText[lang].closingCta

  return (
    <section className="min-h-screen bg-brand-iron flex items-center justify-center relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-amber/[0.03] blur-[150px] pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(217,119,6,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl px-6" dir={isArabic ? "rtl" : "ltr"}>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`text-brand-white leading-[0.95] whitespace-pre-line mb-6 ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2.5rem,7vw,5rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,8vw,6rem)]"
          }`}
        >
          {t.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className={`text-brand-muted text-lg mb-12 ${isArabic ? "font-arabic" : ""}`}
        >
          {t.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MagneticCTA className="inline-block">
            <Link href="/quote">
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className={`group inline-flex items-center gap-3 bg-brand-amber text-white font-bold
                  text-sm px-10 py-5 rounded-xl hover:bg-brand-gold transition-colors
                  shadow-lg shadow-brand-amber/20 hover:shadow-brand-amber/40 cursor-pointer
                  ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}
              >
                {t.cta}
                <ArrowRight size={18} className={`transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
              </motion.span>
            </Link>
          </MagneticCTA>
        </motion.div>
      </div>
    </section>
  )
}
