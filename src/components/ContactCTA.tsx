"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useLang } from "@/context/LangContext"
import ContactForm from "@/components/forms/ContactForm"

export default function ContactCTA() {
  const { t, isArabic } = useLang()

  return (
    <section id="contact" className="py-24 lg:py-32 bg-brand-iron relative overflow-hidden" dir={isArabic ? "rtl" : "ltr"}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-amber/[0.03] blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-14 ${isArabic ? "text-right" : ""}`}
        >
          <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">{t.contact.eyebrow}</p>
          <h2 className={`text-brand-white leading-[0.95] mb-4 ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2.5rem,6vw,5rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,7vw,6rem)]"
          }`}>{t.contact.title}</h2>
          <p className={`text-brand-muted text-lg ${isArabic ? "font-arabic" : ""}`}>{t.contact.sub}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-sm border border-white/[0.07] p-8"
          >
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
            <ContactForm />
          </motion.div>

          <div className="space-y-4">
            {[
              { Icon: Phone, value: t.contact.phone, href: `tel:${t.contact.phone}` },
              { Icon: Mail, value: t.contact.email, href: `mailto:${t.contact.email}` },
              { Icon: MapPin, value: t.contact.address, href: "#" },
            ].map(({ Icon, value, href }, i) => (
              <motion.a key={i} href={href}
                initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ x: isArabic ? -6 : 6 }}
                className="group flex items-start gap-5 p-5 rounded-2xl cursor-pointer bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/[0.06] hover:border-brand-amber/25 transition-[border] duration-300"
              >
                <div className="relative w-12 h-12 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Icon size={20} className="text-brand-amber group-hover:text-white transition-colors" />
                </div>
                <p className={`text-brand-white/70 group-hover:text-brand-white font-medium pt-2.5 text-sm transition-colors ${isArabic ? "font-arabic" : ""}`}>{value}</p>
              </motion.a>
            ))}

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06]">
              <Clock size={18} className="text-brand-amber flex-shrink-0" />
              <span className={`text-brand-muted text-xs font-semibold uppercase tracking-widest ${isArabic ? "font-arabic" : ""}`}>{t.contact.hours}</span>
              <motion.span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ms-auto"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }} />
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-white/[0.06] h-52 hover:border-brand-amber/20 transition-colors">
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
    </section>
  )
}
