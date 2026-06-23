"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Send, CheckCircle, Clock, Shield, Truck } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"
import { categories } from "@/data/categories"

export default function QuotePageClient() {
  const { isArabic } = useLang()
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    category: "", brand: "", partNumber: "", quantity: "1", details: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = [
      `${isArabic ? "اسم" : "Name"}: ${form.name}`,
      `${isArabic ? "الشركة" : "Company"}: ${form.company}`,
      `${isArabic ? "البريد" : "Email"}: ${form.email}`,
      `${isArabic ? "الهاتف" : "Phone"}: ${form.phone}`,
      `${isArabic ? "الفئة" : "Category"}: ${form.category}`,
      `${isArabic ? "العلامة" : "Brand"}: ${form.brand}`,
      `${isArabic ? "رقم القطعة" : "Part No"}: ${form.partNumber}`,
      `${isArabic ? "الكمية" : "Qty"}: ${form.quantity}`,
      `${isArabic ? "التفاصيل" : "Details"}: ${form.details}`,
    ].join("\n")
    window.open(`https://wa.me/966552282868?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer")
    setSubmitted(true)
  }

  const benefits = [
    { icon: Clock, titleEN: "2-Hour Response", titleAR: "رد خلال ساعتين", descEN: "We respond to every quote request within 2 business hours.", descAR: "نرد على كل طلب عرض سعر خلال ساعتين عمل." },
    { icon: Shield, titleEN: "Quality Guaranteed", titleAR: "جودة مضمونة", descEN: "All parts meet OEM specifications with warranty coverage.", descAR: "جميع القطع تلبي مواصفات OEM مع تغطية ضمان." },
    { icon: Truck, titleEN: "Fast Delivery", titleAR: "توصيل سريع", descEN: "Same-day in Riyadh, 3-5 days across Saudi Arabia.", descAR: "نفس اليوم في الرياض، 3-5 أيام في أنحاء السعودية." },
  ]

  const inputProps = (name: string) => ({
    onFocus: () => setFocusedField(name),
    onBlur: () => setFocusedField(null),
  })

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      {/* Cinematic Header */}
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
            <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">
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
        {/* Benefits — 3D Glass Cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-16" style={{ perspective: "1000px" }}>
          {benefits.map(({ icon: Icon, titleEN, titleAR, descEN, descAR }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotateY: 3, scale: 1.02 }}
              className="group relative p-7 rounded-2xl text-center overflow-hidden cursor-default
                bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
                backdrop-blur-sm border border-white/[0.07]
                hover:border-brand-amber/25 hover:shadow-xl hover:shadow-brand-amber/10
                transition-[border,box-shadow] duration-500"
              style={{ transformStyle: "preserve-3d" }}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />
              <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700
                bg-gradient-to-br from-brand-amber/[0.06] via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10">
                <div className="relative w-12 h-12 rounded-xl bg-brand-amber/10 group-hover:bg-brand-amber/20 flex items-center justify-center mx-auto mb-4 transition-colors">
                  <Icon size={24} className="text-brand-amber" />
                  <div className="absolute inset-0 rounded-xl bg-brand-amber/20 blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>
                <h3 className={`text-brand-white font-bold mb-2 ${isArabic ? "font-arabic" : "font-display uppercase text-lg tracking-tight"}`}>
                  {isArabic ? titleAR : titleEN}
                </h3>
                <p className={`text-brand-muted text-sm ${isArabic ? "font-arabic" : ""}`}>{isArabic ? descAR : descEN}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Form — Large Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 rounded-2xl
                bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.07]"
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle size={36} className="text-emerald-400" />
              </motion.div>
              <h3 className={`text-brand-white font-bold text-2xl mb-3 ${isArabic ? "font-arabic" : "font-display uppercase"}`}>
                {isArabic ? "تم إرسال طلبك بنجاح!" : "Quote Request Submitted!"}
              </h3>
              <p className={`text-brand-muted mb-6 ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "سنرد عليك خلال ساعتين عمل." : "We'll respond within 2 business hours."}
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", category: "", brand: "", partNumber: "", quantity: "1", details: "" }) }}
                className="text-brand-amber text-xs font-bold uppercase tracking-widest hover:text-brand-gold cursor-pointer">
                {isArabic ? "إرسال طلب آخر" : "Submit Another Request"}
              </button>
            </motion.div>
          ) : (
            <div className="relative rounded-2xl overflow-hidden
              bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent
              backdrop-blur-sm border border-white/[0.07] p-8 lg:p-12">

              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

              <h3 className={`text-brand-white font-bold text-xl mb-8 ${isArabic ? "font-arabic text-right" : "font-display uppercase tracking-tight"}`}>
                {isArabic ? "تفاصيل طلب عرض السعر" : "Quote Request Details"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5" dir={isArabic ? "rtl" : "ltr"}>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "name", labelEN: "Full Name *", labelAR: "الاسم الكامل *", type: "text", required: true },
                    { name: "company", labelEN: "Company", labelAR: "الشركة", type: "text", required: false },
                  ].map((f) => (
                    <motion.div key={f.name}
                      animate={focusedField === f.name ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <label className={`block text-brand-white/40 text-xs font-semibold uppercase tracking-widest mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                        {isArabic ? f.labelAR : f.labelEN}
                      </label>
                      <input type={f.type} required={f.required}
                        value={form[f.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        {...inputProps(f.name)}
                        className={`input-field ${isArabic ? "font-arabic text-right" : ""}`} />
                    </motion.div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: "email", labelEN: "Email", labelAR: "البريد الإلكتروني", type: "email", required: false },
                    { name: "phone", labelEN: "Phone Number *", labelAR: "رقم الهاتف *", type: "tel", required: true },
                  ].map((f) => (
                    <motion.div key={f.name}
                      animate={focusedField === f.name ? { scale: 1.02 } : { scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <label className={`block text-brand-white/40 text-xs font-semibold uppercase tracking-widest mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                        {isArabic ? f.labelAR : f.labelEN}
                      </label>
                      <input type={f.type} required={f.required}
                        value={form[f.name as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                        {...inputProps(f.name)}
                        className={`input-field ${isArabic ? "font-arabic text-right" : ""}`} />
                    </motion.div>
                  ))}
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div animate={focusedField === "category" ? { scale: 1.02 } : { scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                    <label className={`block text-brand-white/40 text-xs font-semibold uppercase tracking-widest mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? "الفئة" : "Category"}
                    </label>
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                      {...inputProps("category")}
                      className={`input-field ${isArabic ? "font-arabic text-right" : ""}`}>
                      <option value="">{isArabic ? "اختر الفئة" : "Select category"}</option>
                      {categories.map((c) => (
                        <option key={c.id} value={isArabic ? c.nameAR : c.nameEN}>{isArabic ? c.nameAR : c.nameEN}</option>
                      ))}
                    </select>
                  </motion.div>
                  <motion.div animate={focusedField === "brand" ? { scale: 1.02 } : { scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                    <label className={`block text-brand-white/40 text-xs font-semibold uppercase tracking-widest mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? "العلامة التجارية" : "Brand"}
                    </label>
                    <input type="text" value={form.brand}
                      placeholder={isArabic ? "مثال: كاتربيلر" : "e.g. Caterpillar"}
                      onChange={(e) => setForm({ ...form, brand: e.target.value })}
                      {...inputProps("brand")}
                      className={`input-field ${isArabic ? "font-arabic text-right" : ""}`} />
                  </motion.div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.div animate={focusedField === "partNumber" ? { scale: 1.02 } : { scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                    <label className={`block text-brand-white/40 text-xs font-semibold uppercase tracking-widest mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? "رقم القطعة" : "Part Number"}
                    </label>
                    <input type="text" value={form.partNumber}
                      placeholder={isArabic ? "مثال: 272-6955" : "e.g. 272-6955"}
                      onChange={(e) => setForm({ ...form, partNumber: e.target.value })}
                      {...inputProps("partNumber")}
                      className={`input-field ${isArabic ? "font-arabic text-right" : ""}`} />
                  </motion.div>
                  <motion.div animate={focusedField === "quantity" ? { scale: 1.02 } : { scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                    <label className={`block text-brand-white/40 text-xs font-semibold uppercase tracking-widest mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                      {isArabic ? "الكمية" : "Quantity"}
                    </label>
                    <input type="number" min="1" value={form.quantity}
                      onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                      {...inputProps("quantity")}
                      className={`input-field ${isArabic ? "font-arabic text-right" : ""}`} />
                  </motion.div>
                </div>
                <motion.div animate={focusedField === "details" ? { scale: 1.01 } : { scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                  <label className={`block text-brand-white/40 text-xs font-semibold uppercase tracking-widest mb-2 ${isArabic ? "font-arabic text-right" : ""}`}>
                    {isArabic ? "تفاصيل إضافية *" : "Additional Details *"}
                  </label>
                  <textarea rows={4} required value={form.details}
                    placeholder={isArabic ? "اذكر الموديل، سنة الصنع، أو أي تفاصيل..." : "Mention the model, year, or any details..."}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    {...inputProps("details")}
                    className={`input-field ${isArabic ? "font-arabic text-right" : ""}`} />
                </motion.div>
                <motion.button type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full flex items-center justify-center gap-3 bg-brand-amber text-white
                    font-bold uppercase text-sm tracking-widest py-5 rounded-xl
                    hover:bg-brand-gold transition-colors shadow-lg shadow-brand-amber/20 cursor-pointer
                    ${isArabic ? "font-arabic flex-row-reverse" : ""}`}>
                  <Send size={18} />
                  {isArabic ? "إرسال طلب عرض السعر" : "Submit Quote Request"}
                </motion.button>
              </form>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
