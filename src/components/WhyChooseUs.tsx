"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Truck, Wrench, DollarSign } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/motion"

const icons = [ShieldCheck, Truck, Wrench, DollarSign]

export default function WhyChooseUs() {
  const { t, isArabic } = useLang()

  return (
    <section id="about" className="py-20 lg:py-28 bg-brand-iron relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-amber/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-brand-amber/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className={`mb-16 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <motion.p variants={fadeInUp} className="text-brand-amber text-xs font-semibold uppercase tracking-widest mb-3">
            {t.why.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className={`text-brand-white leading-none mb-4 max-w-3xl ${
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {t.why.items.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-8 bg-brand-plate border border-brand-amber/15 rounded-2xl
                  hover:bg-brand-amber hover:border-brand-amber transition-all duration-400
                  shadow-2xl shadow-black/40 cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-amber/15 group-hover:bg-white/20
                  flex items-center justify-center mb-8 transition-colors">
                  <Icon size={24} className="text-brand-amber group-hover:text-white transition-colors" />
                </div>
                <h3
                  className={`text-brand-white group-hover:text-white font-bold mb-3 transition-colors ${
                    isArabic ? "font-arabic text-xl text-right" : "font-display font-extrabold uppercase text-2xl"
                  }`}
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-brand-muted group-hover:text-white/75 text-sm leading-relaxed transition-colors ${isArabic ? "font-arabic text-right" : ""}`}
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Lead times strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 grid grid-cols-3 gap-4"
        >
          {[
            { labelEN: "Express Air", labelAR: "شحن جوي سريع", valEN: "3–5 Days",  valAR: "3–5 أيام" },
            { labelEN: "Standard Sea", labelAR: "شحن بحري",   valEN: "21–30 Days", valAR: "21–30 يوم" },
            { labelEN: "Local Pickup", labelAR: "استلام محلي", valEN: "Same Day",   valAR: "نفس اليوم" },
          ].map((row, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 px-4 bg-brand-steel
                border border-brand-amber/15 rounded-2xl text-center"
            >
              <span
                className={`font-display font-extrabold uppercase text-brand-amber text-2xl ${isArabic ? "font-arabic" : ""}`}
              >
                {isArabic ? row.valAR : row.valEN}
              </span>
              <span className={`text-brand-muted text-xs uppercase tracking-widest mt-1 ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? row.labelAR : row.labelEN}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
