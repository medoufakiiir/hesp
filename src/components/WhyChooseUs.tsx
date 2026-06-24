"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Truck, Wrench, DollarSign } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerContainer, fadeInUp } from "@/lib/motion"
import { toArabicNum } from "@/lib/utils"

const icons = [ShieldCheck, Truck, Wrench, DollarSign]

export default function WhyChooseUs() {
  const { t, isArabic } = useLang()

  return (
    <section className="py-24 lg:py-32 bg-brand-iron relative overflow-hidden">
      {/* 3D ambient lighting */}
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-amber/[0.04] blur-[150px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-brand-amber/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`mb-16 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <motion.p variants={fadeInUp} className={`text-brand-amber text-xs font-semibold mb-3 ${isArabic ? "font-arabic" : "uppercase tracking-[0.25em]"}`}>
            {t.why.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className={`text-brand-white leading-[0.95] mb-4 max-w-3xl ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2rem,5vw,4rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,6vw,5.5rem)]"
            }`}
          >
            {t.why.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className={`text-brand-muted text-lg max-w-xl ${isArabic ? "font-arabic" : ""}`}>
            {t.why.sub}
          </motion.p>
        </motion.div>

        {/* 3D Glass Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ perspective: "1000px" }}>
          {t.why.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -12, rotateY: 3, scale: 1.02 }}
                className="group relative p-8 rounded-2xl cursor-default overflow-hidden
                  bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent
                  backdrop-blur-sm border border-white/[0.08]
                  hover:border-brand-amber/30 hover:shadow-2xl hover:shadow-brand-amber/10
                  transition-[border,box-shadow] duration-500"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Glass highlight */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />

                {/* Hover glow */}
                <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                  bg-gradient-to-br from-brand-amber/10 via-transparent to-brand-amber/5 pointer-events-none" />

                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                  {/* Icon with glow */}
                  <div className="relative w-14 h-14 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber/20
                    flex items-center justify-center mb-8 transition-colors duration-300">
                    <Icon size={26} className="text-brand-amber group-hover:text-brand-gold transition-colors" />
                    <div className="absolute inset-0 rounded-xl bg-brand-amber/20 blur-xl opacity-0 group-hover:opacity-60 transition-opacity" />
                  </div>

                  <h3
                    className={`text-brand-white font-bold mb-3 ${
                      isArabic ? "font-arabic text-xl text-right" : "font-display font-extrabold uppercase text-xl tracking-tight"
                    }`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`text-brand-muted text-sm leading-relaxed ${isArabic ? "font-arabic text-right" : ""}`}
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Corner number with 3D depth */}
                <span className="absolute top-3 end-4 text-brand-white/[0.03] group-hover:text-brand-amber/[0.08]
                  font-display font-extrabold text-7xl transition-colors duration-500 pointer-events-none"
                  style={{ transform: "translateZ(-10px)" }}>
                  {isArabic ? toArabicNum(String(i + 1).padStart(2, "0")) : String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>
            )
          })}
        </div>

        {/* Lead times with glass effect */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          {[
            { labelEN: "Express Air", labelAR: "شحن جوي سريع", valEN: "3–5 Days",  valAR: "٣–٥ أيام" },
            { labelEN: "Standard Sea", labelAR: "شحن بحري",   valEN: "21–30 Days", valAR: "٢١–٣٠ يوم" },
            { labelEN: "Local Pickup", labelAR: "استلام محلي", valEN: "Same Day",   valAR: "نفس اليوم" },
          ].map((row, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -4 }}
              className="flex flex-col items-center justify-center py-6 px-4
                bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm
                border border-white/[0.06] hover:border-brand-amber/20 rounded-2xl text-center
                transition-[border] duration-300 cursor-default"
            >
              <span className={`font-extrabold text-brand-amber text-2xl ${isArabic ? "font-arabic" : "font-display uppercase"}`}>
                {isArabic ? row.valAR : row.valEN}
              </span>
              <span className={`text-brand-muted text-xs mt-1 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
                {isArabic ? row.labelAR : row.labelEN}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
