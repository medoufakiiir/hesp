"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerContainer, blurFadeIn } from "@/lib/motion"
import FloatingParticles from "./FloatingParticles"
import MagneticButton from "./MagneticButton"

const letterReveal = {
  hidden: { opacity: 0, y: 80, rotateX: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.7, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] as const }
  })
}

function AnimatedHeadline({ text, className, isArabic }: { text: string; className: string; isArabic: boolean }) {
  const words = text.split(" ")
  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block mr-[0.3em] overflow-hidden" style={isArabic ? { marginRight: 0, marginLeft: "0.3em" } : {}}>
          <motion.span
            className="inline-block"
            custom={wi}
            variants={letterReveal}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export default function HeroSection() {
  const { t, isArabic } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.25, 0.05])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-brand-iron">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <motion.div style={{ opacity: overlayOpacity }}>
          <Image
            src="/images/equipment/excavator-1.jpg"
            alt="Heavy excavator on construction site in Saudi Arabia"
            fill
            className="object-cover grayscale"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-iron via-brand-iron/85 to-brand-iron/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-iron via-transparent to-transparent" />
      </motion.div>

      <FloatingParticles count={25} />

      {/* Animated accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-amber to-transparent z-10 opacity-60 origin-top"
      />

      {/* Decorative grid lines */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <motion.div
          style={{ y: textY }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={`max-w-3xl ${isArabic ? "mr-auto text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            {/* Tag with animated dot */}
            <motion.div variants={blurFadeIn} className="inline-flex items-center gap-2 mb-8">
              <motion.span
                className="w-2 h-2 rounded-full bg-brand-amber"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              <span className={`text-brand-amber text-xs font-semibold ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
                {t.hero.tag}
              </span>
              <motion.span
                className="h-px bg-brand-amber/40 origin-left"
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>

            {/* Headline with word-by-word reveal */}
            <div className="overflow-hidden mb-3" style={{ perspective: "600px" }}>
              <AnimatedHeadline
                text={t.hero.headline1}
                isArabic={isArabic}
                className={`text-brand-white leading-none ${
                  isArabic
                    ? "font-arabic font-bold text-[clamp(3rem,8vw,7rem)]"
                    : "font-display font-extrabold uppercase tracking-tight text-[clamp(4rem,10vw,9rem)]"
                }`}
              />
            </div>
            <div className="overflow-hidden mb-10" style={{ perspective: "600px" }}>
              <AnimatedHeadline
                text={t.hero.headline2}
                isArabic={isArabic}
                className={`text-brand-amber leading-none ${
                  isArabic
                    ? "font-arabic font-bold text-[clamp(3rem,8vw,7rem)]"
                    : "font-display font-extrabold uppercase tracking-tight text-[clamp(4rem,10vw,9rem)]"
                }`}
              />
            </div>

            {/* Subtext with blur fade */}
            <motion.p
              variants={blurFadeIn}
              className={`text-brand-muted text-lg leading-relaxed max-w-xl mb-12 ${isArabic ? "font-arabic" : ""}`}
            >
              {t.hero.sub}
            </motion.p>

            {/* CTA buttons with magnetic effect */}
            <motion.div
              variants={blurFadeIn}
              className={`flex flex-wrap gap-4 ${isArabic ? "flex-row-reverse" : ""}`}
            >
              <MagneticButton>
                <Link href="/quote">
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 8px 30px rgba(217, 119, 6, 0.2)",
                        "0 8px 50px rgba(217, 119, 6, 0.4)",
                        "0 8px 30px rgba(217, 119, 6, 0.2)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className={`group inline-flex items-center gap-3 bg-brand-amber text-white font-bold
                      text-xs px-8 py-4 rounded-xl hover:bg-brand-gold transition-colors
                      cursor-pointer ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}
                  >
                    {t.hero.cta1}
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    >
                      <ArrowRight size={16} className={isArabic ? "rotate-180" : ""} />
                    </motion.span>
                  </motion.span>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/products">
                  <motion.span
                    whileHover={{ scale: 1.05, borderColor: "rgba(217, 119, 6, 0.6)" }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-3 border border-brand-white/20 text-brand-white font-bold
                      text-xs px-8 py-4 rounded-xl hover:border-brand-amber
                      hover:text-brand-amber transition-all cursor-pointer backdrop-blur-sm ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}
                  >
                    {t.hero.cta2}
                  </motion.span>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Side accent */}
        <motion.div
          initial={{ opacity: 0, x: isArabic ? -60 : 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={`absolute bottom-24 ${isArabic ? "left-8 lg:left-24" : "right-8 lg:right-24"} hidden lg:flex flex-col items-center gap-3`}
        >
          <motion.div
            className="w-px h-20 bg-gradient-to-b from-transparent to-brand-amber/50"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 0 }}
          />
          <p className="text-brand-muted text-xs uppercase tracking-widest rotate-90 origin-center translate-y-8">
            Riyadh, KSA
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        onClick={() => document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-muted z-10 cursor-pointer group"
        aria-label="Scroll down"
      >
        <span className="text-[9px] uppercase tracking-widest font-bold group-hover:text-brand-amber transition-colors">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-brand-muted/40 group-hover:border-brand-amber/60 transition-colors flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-2 bg-brand-amber rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.button>
    </section>
  )
}
