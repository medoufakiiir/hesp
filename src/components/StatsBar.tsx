"use client"

import { useCounter } from "@/hooks/useCounter"
import { useLang } from "@/context/LangContext"
import { motion } from "framer-motion"
import { staggerSlow, counterPulse } from "@/lib/motion"

function StatItem({ num, suffix, label, index }: { num: number; suffix: string; label: string; index: number }) {
  const { isArabic } = useLang()
  const ref = useCounter(num, 2200, isArabic ? "ar-SA" : "en")
  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center py-10 px-6 text-center
        border-b border-brand-white/5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0
        hover:bg-brand-amber/5 transition-colors duration-500 cursor-default"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-t from-brand-amber/10 via-transparent to-transparent pointer-events-none" />

      <motion.div
        className="flex items-end gap-1 mb-2 relative"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 150, damping: 12, delay: index * 0.15 }}
      >
        <span
          ref={ref}
          className="font-display font-extrabold uppercase text-brand-amber"
          style={{ fontSize: "clamp(2.5rem,5vw,4rem)", lineHeight: 1 }}
        >
          0
        </span>
        <motion.span
          className="font-display font-extrabold uppercase text-brand-amber text-3xl pb-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.3 }}
        >
          {suffix}
        </motion.span>
      </motion.div>

      <motion.span
        className={`text-brand-white/50 text-xs font-semibold ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
      >
        {label}
      </motion.span>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-brand-amber rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: "40%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}

export default function StatsBar() {
  const { t } = useLang()

  return (
    <section id="stats" className="bg-brand-steel border-y border-brand-amber/10 relative overflow-hidden">
      {/* Animated background shimmer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-amber/5 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        style={{ width: "200%" }}
      />

      <motion.div
        variants={staggerSlow}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-white/5">
          {t.stats.map((s, i) => (
            <motion.div key={i} variants={counterPulse}>
              <StatItem num={s.num} suffix={s.suffix} label={s.label} index={i} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
