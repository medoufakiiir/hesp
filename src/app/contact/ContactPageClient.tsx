"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"
import ContactForm from "@/components/forms/ContactForm"

export default function ContactPageClient() {
  const { isArabic } = useLang()

  const contactInfo = [
    { icon: Phone, labelEN: "Phone / WhatsApp", labelAR: "الهاتف / واتساب", value: "+966 55 228 2868", href: "tel:+966552282868" },
    { icon: Mail, labelEN: "Email", labelAR: "البريد الإلكتروني", value: "info@riyada-ventures.com", href: "mailto:info@riyada-ventures.com" },
    { icon: MapPin, labelEN: "Address", labelAR: "العنوان", value: isArabic ? "الفيصلية، الرياض 12882، المملكة العربية السعودية" : "Al Faisaliyyah, Riyadh 12882, KSA", href: "#map" },
    { icon: Clock, labelEN: "Working Hours", labelAR: "ساعات العمل", value: isArabic ? "الأحد – الخميس · 8:00 ص – 6:00 م" : "Sun – Thu · 8:00 AM – 6:00 PM", href: "#" },
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
          <Breadcrumb items={[{ labelEN: "Contact", labelAR: "اتصل بنا" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 ${isArabic ? "text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              {isArabic ? "تواصل معنا" : "Contact Us"}
            </p>
            <h1 className={`text-brand-white leading-[0.95] mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,7vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,8vw,6rem)]"
            }`}>
              {isArabic ? "لنبقي أسطولك\nيعمل" : "Let's Keep Your\nFleet Running"}
            </h1>
            <p className={`text-brand-muted text-lg max-w-2xl ${isArabic ? "font-arabic" : ""}`}>
              {isArabic ? "أرسل رسالة وسنرد خلال ساعتين. نحن هنا لمساعدتك." : "Send us a message and we'll respond within 2 hours. We're here to help."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className={`grid lg:grid-cols-2 gap-10 ${isArabic ? "lg:grid-flow-dense" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`relative rounded-2xl overflow-hidden
              bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
              backdrop-blur-sm border border-white/[0.07] p-8 ${isArabic ? "lg:col-start-2" : ""}`}
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
            <h3 className={`text-brand-white font-bold text-xl mb-6 ${isArabic ? "font-arabic" : "font-display uppercase tracking-tight"}`}>
              {isArabic ? "أرسل لنا رسالة" : "Send Us a Message"}
            </h3>
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <div className={`space-y-4 ${isArabic ? "lg:col-start-1" : ""}`}>
            {contactInfo.map(({ icon: Icon, labelEN, labelAR, value, href }, i) => (
              <motion.a
                key={i}
                href={href}
                initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ x: isArabic ? -6 : 6 }}
                className="group flex items-start gap-5 p-5 rounded-2xl cursor-pointer
                  bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent
                  border border-white/[0.06] hover:border-brand-amber/25 transition-[border] duration-300"
              >
                <div className="relative w-12 h-12 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber
                  flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Icon size={20} className="text-brand-amber group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className={`text-brand-white/35 text-xs font-semibold uppercase tracking-widest mb-1 ${isArabic ? "font-arabic" : ""}`}>
                    {isArabic ? labelAR : labelEN}
                  </p>
                  <p className={`text-brand-white/80 font-medium text-sm ${isArabic ? "font-arabic" : ""}`}>{value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/[0.06] to-transparent border border-emerald-500/15"
            >
              <motion.span
                className="w-3 h-3 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className={`text-emerald-400 text-sm font-semibold ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "نحن نخدمك الآن — اتصل بنا!" : "We're open now — call us!"}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              id="map"
              className="rounded-2xl overflow-hidden border border-white/[0.06] h-56 hover:border-brand-amber/20 transition-colors"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.2!2d46.674!3d24.742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ0JzMxLjIiTiA0NsKwNDAnMjYuNCJF!5e0!3m2!1sen!2ssa!4v1234567890"
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen={false} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Riyada Ventures Location"
              />
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
