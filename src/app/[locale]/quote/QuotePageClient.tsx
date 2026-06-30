"use client"

import { motion } from "framer-motion"
import { Clock, Shield, Truck } from "lucide-react"
import { useLocale } from "next-intl"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import QuoteForm from "@/components/forms/QuoteForm"

export default function QuotePageClient() {
  const isArabic = useLocale() === "ar"

  const benefits = [
    { icon: Clock, titleEN: "2-Hour Response", titleAR: "رد خلال ساعتين", descEN: "We respond to every quote request within 2 business hours.", descAR: "نرد على كل طلب عرض سعر خلال ساعتين عمل." },
    { icon: Shield, titleEN: "Quality Guaranteed", titleAR: "جودة مضمونة", descEN: "All parts meet OEM specifications with warranty coverage.", descAR: "جميع القطع تلبي مواصفات OEM مع تغطية ضمان." },
    { icon: Truck, titleEN: "Fast Delivery", titleAR: "توصيل سريع", descEN: "Same-day in Riyadh, 3-5 days across Saudi Arabia.", descAR: "نفس اليوم في الرياض، 3-5 أيام في أنحاء السعودية." },
  ]

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      <section className="relative pt-32 lg:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.04] blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ labelEN: "Request Quote", labelAR: "طلب عرض سعر" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 ${isArabic ? "text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <p className={`text-brand-amber text-xs font-semibold mb-3 ${isArabic ? "font-arabic" : "uppercase tracking-[0.25em]"}`}>
              {isArabic ? "طلب عرض سعر" : "Request a Quote"}
            </p>
            <h1 className={`text-brand-white leading-[0.95] mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,7vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,8vw,6rem)]"
            }`}>
              {isArabic ? "احصل على أسعار\nتنافسية" : "Get Competitive\nPricing"}
            </h1>
            <p className={`text-brand-muted text-lg max-w-2xl ${isArabic ? "font-arabic" : ""}`}>
              {isArabic
                ? "أخبرنا بما تحتاجه وسنوفر لك أفضل سعر مع خيارات توصيل سريعة."
                : "Tell us what you need and we'll provide the best price with fast delivery options."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-5 mb-16" style={{ perspective: "1000px" }}>
          {benefits.map(({ icon: Icon, titleEN, titleAR, descEN, descAR }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-7 rounded-2xl text-center overflow-hidden cursor-default
                bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
                backdrop-blur-sm border border-white/[0.07]
                hover:border-brand-amber/25 hover:shadow-xl hover:shadow-brand-amber/10
                transition-[border,box-shadow] duration-500"
              style={{ transformStyle: "preserve-3d" }}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
              <div className="relative z-10">
                <div className="relative w-12 h-12 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Icon size={24} className="text-brand-amber" />
                </div>
                <h3 className={`text-brand-white font-bold mb-2 ${isArabic ? "font-arabic" : "font-display uppercase text-lg tracking-tight"}`}>
                  {isArabic ? titleAR : titleEN}
                </h3>
                <p className={`text-brand-muted text-sm ${isArabic ? "font-arabic" : ""}`}>{isArabic ? descAR : descEN}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto relative rounded-2xl overflow-hidden
            bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
            backdrop-blur-sm border border-white/[0.07] p-8 lg:p-12"
        >
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
          <h3 className={`text-brand-white font-bold text-xl mb-8 ${isArabic ? "font-arabic text-right" : "font-display uppercase tracking-tight"}`}>
            {isArabic ? "تفاصيل طلب عرض السعر" : "Quote Request Details"}
          </h3>
          <QuoteForm />
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
