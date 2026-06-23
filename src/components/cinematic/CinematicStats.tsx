"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { useLang } from "@/context/LangContext"
import { cinematicText } from "@/data/cinematic-translations"
import { useReducedMotion } from "@/hooks/useReducedMotion"

function CountUpStat({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [triggered, setTriggered] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!triggered || !ref.current) return
    if (reduced) {
      ref.current.textContent = value % 1 === 0 ? value.toLocaleString() : value.toFixed(1)
      return
    }
    const el = ref.current
    const start = performance.now()
    const duration = 2200

    const update = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      const current = ease * value
      el.textContent = value % 1 === 0 ? Math.round(current).toLocaleString() : current.toFixed(1)
      if (progress < 1) requestAnimationFrame(update)
    }

    requestAnimationFrame(update)
  }, [triggered, value, reduced])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-12 px-6"
    >
      <div className="flex items-baseline gap-1">
        <span
          ref={ref}
          className="font-display font-extrabold text-brand-white tabular-nums"
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}
        >
          0
        </span>
        <span className="font-display font-extrabold text-brand-amber" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          {suffix}
        </span>
      </div>
      <span className="text-brand-muted text-xs font-semibold uppercase tracking-[0.2em] mt-3">
        {label}
      </span>
    </motion.div>
  )
}

function FixedStat({ display, label, delay }: { display: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center py-12 px-6"
    >
      <span
        className="font-display font-extrabold text-brand-white"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", lineHeight: 1 }}
      >
        {display}
      </span>
      <span className="text-brand-muted text-xs font-semibold uppercase tracking-[0.2em] mt-3">
        {label}
      </span>
    </motion.div>
  )
}

export default function CinematicStats() {
  const { lang } = useLang()
  const stats = cinematicText[lang].stats.items

  return (
    <section className="relative bg-brand-steel border-y border-brand-white/[0.06] overflow-hidden">
      {/* Subtle line accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-px h-full bg-brand-white/[0.03]" />
        <div className="absolute top-0 left-2/3 w-px h-full bg-brand-white/[0.03]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className={`${i < stats.length - 1 ? "md:border-r md:border-brand-white/[0.06]" : ""}`}>
              {"value" in stat ? (
                <CountUpStat value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 0.15} />
              ) : (
                <FixedStat display={stat.display} label={stat.label} delay={i * 0.15} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
