"use client"

import { useCounter } from "@/hooks/useCounter"
import { useLang } from "@/context/LangContext"
import { motion } from "framer-motion"
import { staggerContainer, scaleIn } from "@/lib/motion"

function StatItem({ num, suffix, label }: { num: number; suffix: string; label: string }) {
  const ref = useCounter(num, 2200)
  return (
    <div className="flex flex-col items-center justify-center py-10 px-6 text-center
      border-b border-brand-white/5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="flex items-end gap-1 mb-2">
        <span
          ref={ref}
          className="font-display font-extrabold uppercase text-brand-amber"
          style={{ fontSize: "clamp(2.5rem,5vw,4rem)", lineHeight: 1 }}
        >
          0
        </span>
        <span className="font-display font-extrabold uppercase text-brand-amber text-3xl pb-1">{suffix}</span>
      </div>
      <span className="text-brand-white/50 text-xs font-semibold uppercase tracking-widest">{label}</span>
    </div>
  )
}

export default function StatsBar() {
  const { t } = useLang()

  return (
    <section id="stats" className="bg-brand-steel border-y border-brand-amber/10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-white/5">
          {t.stats.map((s, i) => (
            <motion.div key={i} variants={scaleIn}>
              <StatItem num={s.num} suffix={s.suffix} label={s.label} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
