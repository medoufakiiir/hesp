"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerContainer, blurFadeIn, fadeInUp } from "@/lib/motion"

interface FAQ {
  question: string
  answer: string
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const { isArabic } = useLang()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-brand-iron relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
        rounded-full bg-brand-amber/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-14 text-center"
        >
          <motion.div variants={blurFadeIn} className="inline-flex items-center gap-2 mb-3">
            <HelpCircle size={14} className="text-brand-amber" />
            <span className="text-brand-amber text-xs font-semibold uppercase tracking-widest">
              {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </span>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            className={`text-brand-white leading-none mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2rem,5vw,3.5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(2.5rem,5vw,4rem)]"
            }`}
          >
            {isArabic ? "إجابات لأسئلتك" : "Answers to Your Questions"}
          </motion.h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-brand-amber/40 bg-brand-amber/5 shadow-lg shadow-brand-amber/5"
                    : "border-brand-amber/10 hover:border-brand-amber/25"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full flex items-center justify-between p-6 text-left cursor-pointer group
                    ${isArabic ? "flex-row-reverse text-right font-arabic" : ""}`}
                >
                  <span className={`font-medium text-sm pr-4 transition-colors duration-200 ${
                    isOpen ? "text-brand-amber" : "text-brand-white group-hover:text-brand-amber"
                  } ${isArabic ? "pr-0 pl-4" : ""}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? "bg-brand-amber/20" : "bg-brand-white/5 group-hover:bg-brand-amber/10"
                    }`}
                  >
                    <ChevronDown size={16} className="text-brand-amber" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 pb-6 ${isArabic ? "pr-6" : "pl-6"}`}>
                        <motion.div
                          className="h-px bg-gradient-to-r from-brand-amber/20 via-brand-amber/10 to-transparent mb-4"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          style={{ originX: isArabic ? 1 : 0 }}
                        />
                        <p className={`text-brand-muted text-sm leading-relaxed
                          ${isArabic ? "font-arabic text-right" : ""}`}>
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
