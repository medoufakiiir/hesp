"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLang } from "@/context/LangContext"
import { cinematicText } from "@/data/cinematic-translations"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export default function LoadingScreen() {
  const { lang, isArabic } = useLang()
  const text = cinematicText[lang].loading
  const reduced = useReducedMotion()

  const [progress, setProgress] = useState(0)
  const [showTagline, setShowTagline] = useState(false)
  const [visible, setVisible] = useState(true)
  const [shouldRender, setShouldRender] = useState(true)
  const startTime = useRef(0)
  const rafRef = useRef<number>(0)

  const hasPlayed = useRef(false)

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("hesp-loaded")) {
      hasPlayed.current = true
      setShouldRender(false)
    }
  }, [])

  const animate = useCallback((timestamp: number) => {
    if (!startTime.current) startTime.current = timestamp
    const elapsed = timestamp - startTime.current
    const duration = reduced ? 400 : 1200
    const raw = Math.min(elapsed / duration, 1)
    const eased = 1 - Math.pow(1 - raw, 3)
    const val = Math.round(eased * 100)

    setProgress(val)

    if (val >= 100) {
      setShowTagline(true)
      setTimeout(() => {
        setVisible(false)
        setTimeout(() => {
          sessionStorage.setItem("hesp-loaded", "1")
          document.body.style.overflow = ""
          setShouldRender(false)
        }, reduced ? 50 : 800)
      }, reduced ? 100 : 350)
      return
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [reduced])

  useEffect(() => {
    if (hasPlayed.current || !shouldRender) return
    document.body.style.overflow = "hidden"
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(rafRef.current)
      document.body.style.overflow = ""
    }
  }, [shouldRender, animate])

  if (!shouldRender) return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-brand-iron flex flex-col items-center justify-center transition-all ${
        visible ? "opacity-100 scale-100" : "opacity-0 scale-105"
      }`}
      style={{ transitionDuration: reduced ? "50ms" : "800ms", transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      aria-hidden="true"
    >
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(217,119,6,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.4) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Counter */}
      <span
        className="font-display font-extrabold text-brand-amber tabular-nums relative z-10"
        style={{ fontSize: "clamp(5rem, 15vw, 12rem)", lineHeight: 1 }}
      >
        {progress}
        <span className="text-brand-amber/40">%</span>
      </span>

      {/* Progress bar */}
      <div className="w-48 h-px bg-brand-white/10 mt-8 relative overflow-hidden rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-brand-amber rounded-full transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Tagline */}
      <AnimatePresence>
        {showTagline && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`mt-8 text-brand-muted text-sm tracking-widest uppercase relative z-10 ${isArabic ? "font-arabic" : ""}`}
          >
            {text.tagline}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
