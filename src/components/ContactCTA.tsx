"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import { useLang } from "@/context/LangContext"

export default function ContactCTA() {
  const { t, isArabic } = useLang()
  const [form, setForm] = useState({ name: "", company: "", phone: "", part: "" })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = isArabic
      ? `اسم: ${form.name}\nالشركة: ${form.company}\nالهاتف: ${form.phone}\nالقطعة المطلوبة: ${form.part}`
      : `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nPart Needed: ${form.part}`
    window.open(`https://wa.me/966552282868?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contact" className="py-24 lg:py-32 bg-brand-iron relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-amber/[0.03] blur-[150px] pointer-events-none" />
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.012] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-14 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">
            {t.contact.eyebrow}
          </p>
          <h2 className={`text-brand-white leading-[0.95] mb-4 ${
            isArabic
              ? "font-arabic font-bold text-[clamp(2.5rem,6vw,5rem)]"
              : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,7vw,6rem)]"
          }`}>
            {t.contact.title}
          </h2>
          <p className={`text-brand-muted text-lg ${isArabic ? "font-arabic" : ""}`}>
            {t.contact.sub}
          </p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-8 ${isArabic ? "lg:grid-flow-dense" : ""}`}>
          {/* Form — Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 4 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`relative rounded-2xl overflow-hidden
              bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
              backdrop-blur-sm border border-white/[0.07]
              hover:border-brand-amber/20 transition-[border] duration-500
              p-8 ${isArabic ? "lg:col-start-2" : ""}`}
          >
            {/* Top glass highlight */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

            <form onSubmit={handleSubmit} className="space-y-4" dir={isArabic ? "rtl" : "ltr"}>
              <div className="grid sm:grid-cols-2 gap-4">
                {(["name", "company"] as const).map((field) => (
                  <motion.div key={field}
                    animate={focusedField === field ? { scale: 1.02 } : { scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <input
                      name={field} type="text" required={field === "name"}
                      placeholder={field === "name" ? t.contact.namePlaceholder : t.contact.companyPlaceholder}
                      value={form[field]} onChange={handleChange}
                      onFocus={() => setFocusedField(field)} onBlur={() => setFocusedField(null)}
                      className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div
                animate={focusedField === "phone" ? { scale: 1.02 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <input
                  name="phone" type="tel" required
                  placeholder={t.contact.phonePlaceholder}
                  value={form.phone} onChange={handleChange}
                  onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                  className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}
                />
              </motion.div>
              <motion.div
                animate={focusedField === "part" ? { scale: 1.01 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <textarea
                  name="part" rows={4} required
                  placeholder={t.contact.partPlaceholder}
                  value={form.part} onChange={handleChange}
                  onFocus={() => setFocusedField("part")} onBlur={() => setFocusedField(null)}
                  className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}
                />
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className={`w-full flex items-center justify-center gap-3 bg-brand-amber text-white
                  font-bold uppercase text-sm tracking-widest py-5 rounded-xl
                  hover:bg-brand-gold transition-colors shadow-lg shadow-brand-amber/20
                  cursor-pointer ${isArabic ? "font-arabic flex-row-reverse" : ""}`}
              >
                <Send size={18} className={isArabic ? "rotate-180" : ""} />
                {t.contact.send}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info — Glass Cards */}
          <div className={`space-y-4 ${isArabic ? "lg:col-start-1" : ""}`} dir={isArabic ? "rtl" : "ltr"}>
            {[
              { Icon: Phone, value: t.contact.phone, href: `tel:${t.contact.phone}` },
              { Icon: Mail, value: t.contact.email, href: `mailto:${t.contact.email}` },
              { Icon: MapPin, value: t.contact.address, href: "#" },
            ].map(({ Icon, value, href }, i) => (
              <motion.a
                key={i}
                href={href}
                initial={{ opacity: 0, x: isArabic ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ x: isArabic ? -6 : 6, scale: 1.01 }}
                className="group flex items-start gap-5 p-5 rounded-2xl cursor-pointer
                  bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent
                  border border-white/[0.06] hover:border-brand-amber/25
                  hover:shadow-xl hover:shadow-brand-amber/5
                  transition-[border,box-shadow] duration-300"
              >
                <div className="relative w-12 h-12 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber
                  flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Icon size={20} className="text-brand-amber group-hover:text-white transition-colors" />
                  <div className="absolute inset-0 rounded-xl bg-brand-amber/20 blur-lg opacity-0 group-hover:opacity-60 transition-opacity" />
                </div>
                <p className={`text-brand-white/70 group-hover:text-brand-white font-medium pt-2.5 leading-relaxed text-sm transition-colors ${isArabic ? "font-arabic text-right" : ""}`}>
                  {value}
                </p>
              </motion.a>
            ))}

            {/* Hours + live status */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 p-5 rounded-2xl
                bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06]"
            >
              <Clock size={18} className="text-brand-amber flex-shrink-0" />
              <span className={`text-brand-muted text-xs font-semibold uppercase tracking-widest ${isArabic ? "font-arabic" : ""}`}>
                {t.contact.hours}
              </span>
              <motion.span
                className="w-2.5 h-2.5 rounded-full bg-emerald-500 ml-auto"
                animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="rounded-2xl overflow-hidden border border-white/[0.06] h-52 hover:border-brand-amber/20 transition-colors"
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
    </section>
  )
}
