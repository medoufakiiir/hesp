"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useLang } from "@/context/LangContext"

interface FAQ {
  questionEN: string
  questionAR: string
  answerEN: string
  answerAR: string
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const { isArabic } = useLang()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-brand-iron relative overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
        rounded-full bg-brand-amber/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <HelpCircle size={14} className="text-brand-amber" />
            <span className={`text-brand-amber text-xs font-semibold uppercase tracking-widest ${isArabic ? "font-arabic" : ""}`}>
              {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </span>
          </div>
          <h2 className={`text-brand-white leading-none mb-4 ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2rem,5vw,3.5rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(2.5rem,5vw,4rem)]"
          }`}>
            {isArabic ? "إجابات لأسئلتك" : "Answers to Your Questions"}
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            const question = isArabic ? faq.questionAR : faq.questionEN
            const answer = isArabic ? faq.answerAR : faq.answerEN

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`rounded-2xl overflow-hidden transition-all duration-300
                  bg-gradient-to-br from-white/[0.04] to-transparent
                  border ${isOpen
                    ? "border-brand-amber/30 shadow-lg shadow-brand-amber/5"
                    : "border-white/[0.06] hover:border-white/[0.12]"
                  }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full flex items-center justify-between p-6 cursor-pointer group
                    ${isArabic ? "text-right" : "text-left"}`}
                >
                  <span className={`font-medium text-sm transition-colors duration-200 ${
                    isOpen ? "text-brand-amber" : "text-brand-white group-hover:text-brand-amber"
                  } ${isArabic ? "font-arabic ps-4" : "pe-4"}`}>
                    {question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isOpen ? "bg-brand-amber/20" : "bg-white/[0.04] group-hover:bg-brand-amber/10"
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
                      <div className="px-6 pb-6">
                        <div className="h-px bg-gradient-to-r from-brand-amber/20 via-brand-amber/10 to-transparent mb-4" />
                        <p className={`text-brand-muted text-sm leading-relaxed ${isArabic ? "font-arabic" : ""}`}>
                          {answer}
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
