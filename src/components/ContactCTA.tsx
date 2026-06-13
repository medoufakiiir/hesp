"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Phone, Mail, MapPin, Clock } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { staggerContainer, fadeInLeft, fadeInRight, fadeInUp } from "@/lib/motion"

export default function ContactCTA() {
  const { t, isArabic } = useLang()
  const [form, setForm] = useState({ name: "", company: "", phone: "", part: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = isArabic
      ? `اسم: ${form.name}\nالشركة: ${form.company}\nالهاتف: ${form.phone}\nالقطعة المطلوبة: ${form.part}`
      : `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nPart Needed: ${form.part}`
    const encoded = encodeURIComponent(text)
    window.open(`https://wa.me/966552282868?text=${encoded}`, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="contact" className="py-20 lg:py-28 bg-brand-iron">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`mb-14 ${isArabic ? "text-right" : ""}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <motion.p variants={fadeInUp} className="text-brand-amber text-xs font-semibold uppercase tracking-widest mb-3">
            {t.contact.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            className={`text-brand-white leading-none mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,6vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,7vw,6rem)]"
            }`}
          >
            {t.contact.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className={`text-brand-muted text-lg ${isArabic ? "font-arabic" : ""}`}>
            {t.contact.sub}
          </motion.p>
        </motion.div>

        <div className={`grid lg:grid-cols-2 gap-8 ${isArabic ? "lg:grid-flow-dense" : ""}`}>
          {/* Form */}
          <motion.div
            variants={isArabic ? fadeInRight : fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`rounded-2xl bg-brand-plate border border-brand-amber/15 p-8 ${isArabic ? "lg:col-start-2" : ""}`}
          >
            <form onSubmit={handleSubmit} className="space-y-4" dir={isArabic ? "rtl" : "ltr"}>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder={t.contact.namePlaceholder}
                  value={form.name}
                  onChange={handleChange}
                  className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}
                />
                <input
                  name="company"
                  type="text"
                  placeholder={t.contact.companyPlaceholder}
                  value={form.company}
                  onChange={handleChange}
                  className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}
                />
              </div>
              <input
                name="phone"
                type="tel"
                required
                placeholder={t.contact.phonePlaceholder}
                value={form.phone}
                onChange={handleChange}
                className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}
              />
              <textarea
                name="part"
                rows={4}
                required
                placeholder={t.contact.partPlaceholder}
                value={form.part}
                onChange={handleChange}
                className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className={`w-full flex items-center justify-center gap-3 bg-brand-amber text-white
                  font-bold uppercase text-sm tracking-widest py-5 rounded-xl
                  hover:bg-brand-gold transition-all shadow-lg shadow-brand-amber/20
                  cursor-pointer ${isArabic ? "font-arabic flex-row-reverse" : ""}`}
              >
                <MessageCircle size={18} />
                {t.contact.send}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            variants={isArabic ? fadeInLeft : fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`space-y-5 ${isArabic ? "lg:col-start-1" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            {[
              { Icon: Phone,  value: t.contact.phone,   href: `tel:${t.contact.phone}` },
              { Icon: Mail,   value: t.contact.email,   href: `mailto:${t.contact.email}` },
              { Icon: MapPin, value: t.contact.address, href: "#" },
            ].map(({ Icon, value, href }, i) => (
              <a
                key={i}
                href={href}
                className="group flex items-start gap-5 p-5 rounded-2xl bg-brand-plate
                  border border-brand-amber/10 hover:border-brand-amber/40
                  transition-all duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-amber/15 group-hover:bg-brand-amber
                  flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon size={20} className="text-brand-amber group-hover:text-white transition-colors" />
                </div>
                <p className={`text-brand-white/70 font-medium pt-2.5 leading-relaxed text-sm ${isArabic ? "font-arabic text-right" : ""}`}>
                  {value}
                </p>
              </a>
            ))}

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-brand-plate border border-brand-amber/10">
              <Clock size={18} className="text-brand-amber flex-shrink-0" />
              <span className={`text-brand-muted text-xs font-semibold uppercase tracking-widest ${isArabic ? "font-arabic" : ""}`}>
                {t.contact.hours}
              </span>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-brand-amber/15 h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.2!2d46.674!3d24.742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQ0JzMxLjIiTiA0NsKwNDAnMjYuNCJF!5e0!3m2!1sen!2ssa!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Riyada Ventures Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
