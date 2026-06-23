"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useLang } from "@/context/LangContext"
import { cinematicText } from "@/data/cinematic-translations"

type StepType = "critical" | "pending" | "success"

const badgeStyles: Record<StepType, string> = {
  critical: "bg-red-500/10 text-red-400 border-red-500/20",
  pending: "bg-brand-amber/10 text-brand-amber border-brand-amber/20",
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
}

const dotStyles: Record<StepType, string> = {
  critical: "bg-red-500 shadow-red-500/40",
  pending: "bg-brand-amber shadow-brand-amber/40",
  success: "bg-emerald-500 shadow-emerald-500/40",
}

const pulseColors: Record<StepType, string> = {
  critical: "bg-red-500/20",
  pending: "bg-brand-amber/20",
  success: "bg-emerald-500/20",
}

function TimelineStep({
  time, text, status, type, index, isArabic, total,
}: {
  time: string; text: string; status: string; type: StepType; index: number; isArabic: boolean; total: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isArabic ? 40 : -40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: isArabic ? -30 : 30, scale: 0.95 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-start gap-5 ${isArabic ? "flex-row-reverse text-right" : ""}`}
    >
      {/* Timeline dot + animated line */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1.5">
        <div className="relative">
          {/* Pulse ring */}
          <motion.div
            className={`absolute -inset-2 rounded-full ${pulseColors[type]}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.8, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, delay: index * 0.12 + 0.3, repeat: Infinity, repeatDelay: 3 }}
          />
          <motion.div
            className={`w-3.5 h-3.5 rounded-full ${dotStyles[type]} shadow-lg relative z-10`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: index * 0.12 }}
          />
        </div>
        {index < total - 1 && (
          <motion.div
            className="w-px bg-gradient-to-b from-brand-white/10 to-transparent mt-1"
            initial={{ height: 0 }}
            animate={{ height: 56 }}
            transition={{ duration: 0.4, delay: index * 0.12 + 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className={`flex-1 pb-6 p-4 -mt-1 rounded-xl transition-colors duration-300
          bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] hover:bg-white/[0.04]`}
        whileHover={{ x: isArabic ? -4 : 4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className={`flex items-center gap-3 mb-2 ${isArabic ? "flex-row-reverse" : ""}`}>
          <motion.span
            className={`text-brand-white/40 text-xs font-bold uppercase tracking-widest font-display ${isArabic ? "font-arabic" : ""}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.12 + 0.1 }}
          >
            {time}
          </motion.span>
          <motion.span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeStyles[type]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: index * 0.12 + 0.15 }}
          >
            {status}
          </motion.span>
        </div>
        <p className={`text-brand-white/70 text-sm leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
          {text}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function TwoWorlds() {
  const { lang, isArabic } = useLang()
  const t = cinematicText[lang].twoWorlds
  const [activeView, setActiveView] = useState<"without" | "with">("without")

  const steps = activeView === "without" ? t.without : t.with

  return (
    <section className="py-24 lg:py-32 bg-brand-iron relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-amber/[0.015] blur-[150px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`text-center mb-16 ${isArabic ? "font-arabic" : ""}`}
        >
          <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-4">
            {isArabic ? "المقارنة" : "Comparison"}
          </p>
          <h2 className={`text-brand-white leading-tight mb-4 ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2rem,5vw,3.5rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(2.5rem,6vw,4rem)]"
          }`}>
            {t.title}
          </h2>
          <p className="text-brand-muted text-base max-w-lg mx-auto">{t.sub}</p>
        </motion.div>

        {/* Toggle with animated indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-14"
        >
          <div className="relative inline-flex bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm rounded-xl p-1 border border-white/[0.08]">
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg bg-brand-amber/15 border border-brand-amber/25"
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                left: activeView === "without" ? "4px" : "50%",
                width: "calc(50% - 4px)",
              }}
            />
            <button
              onClick={() => setActiveView("without")}
              className={`relative z-10 px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer ${
                activeView === "without" ? "text-brand-amber" : "text-brand-muted hover:text-brand-white/60"
              } ${isArabic ? "font-arabic" : ""}`}
            >
              {t.toggleWithout}
            </button>
            <button
              onClick={() => setActiveView("with")}
              className={`relative z-10 px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer ${
                activeView === "with" ? "text-brand-amber" : "text-brand-muted hover:text-brand-white/60"
              } ${isArabic ? "font-arabic" : ""}`}
            >
              {t.toggleWith}
            </button>
          </div>
        </motion.div>

        {/* Animated Timeline */}
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {steps.map((step, i) => (
                <TimelineStep
                  key={`${activeView}-${i}`}
                  time={step.time}
                  text={step.text}
                  status={step.status}
                  type={step.type}
                  index={i}
                  isArabic={isArabic}
                  total={steps.length}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animated summary badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + "-summary"}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-10 text-center"
          >
            <motion.div
              className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border backdrop-blur-sm ${
                activeView === "without"
                  ? "border-red-500/20 bg-red-500/5"
                  : "border-emerald-500/20 bg-emerald-500/5"
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className={`w-2.5 h-2.5 rounded-full ${activeView === "without" ? "bg-red-500" : "bg-emerald-500"}`}
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className={`text-xs font-bold uppercase tracking-widest ${
                activeView === "without" ? "text-red-400" : "text-emerald-400"
              } ${isArabic ? "font-arabic" : ""}`}>
                {activeView === "without"
                  ? (isArabic ? "٣٥+ يوم توقف" : "35+ Days Downtime")
                  : (isArabic ? "يومان فقط — الأسطول يعمل" : "2 Days — Fleet Back Online")
                }
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
