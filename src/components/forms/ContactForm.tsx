"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, MessageCircle, Loader2, AlertCircle } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { createInquiry } from "@/actions/inquiries"

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").max(254),
  phone: z.string().max(20).optional().or(z.literal("")),
  companyName: z.string().max(200).optional().or(z.literal("")),
  subject: z.string().min(3, "Subject required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  honeypot: z.string().max(0),
})

type ContactFormData = z.infer<typeof contactSchema>

const t = {
  EN: {
    fullName: "Full Name", email: "Email Address", phone: "Phone (optional)",
    companyName: "Company (optional)", subject: "Subject", message: "Message",
    submit: "Send Message", submitting: "Sending...",
    successTitle: "Message Sent!", successMsg: "We'll respond within 2 hours.",
    whatsapp: "Chat on WhatsApp", another: "Send Another Message",
  },
  AR: {
    fullName: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف (اختياري)",
    companyName: "الشركة (اختياري)", subject: "الموضوع", message: "الرسالة",
    submit: "إرسال الرسالة", submitting: "جاري الإرسال...",
    successTitle: "تم إرسال الرسالة!", successMsg: "سنرد عليك خلال ساعتين.",
    whatsapp: "تواصل عبر واتساب", another: "إرسال رسالة أخرى",
  },
}

function FormField({ label, error, children, id, isArabic }: {
  label: string; error?: string; children: React.ReactNode; id: string; isArabic?: boolean
}) {
  return (
    <div>
      <label htmlFor={id} className={`block text-brand-white/50 text-xs font-semibold mb-2 ${isArabic ? "font-arabic text-right" : "uppercase tracking-widest"}`}>
        {label}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-red-400 text-xs mt-1.5">{error}</p>}
    </div>
  )
}

export default function ContactForm() {
  const { lang, isArabic } = useLang()
  const labels = t[lang]
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")
  const [savedData, setSavedData] = useState<ContactFormData | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: "" },
  })

  const onSubmit = async (data: ContactFormData) => {
    if (data.honeypot) return
    setServerError("")
    setSavedData(data)
    try {
      await createInquiry({
        name: data.fullName, company: data.companyName || "", phone: data.phone || "",
        email: data.email, details: `Subject: ${data.subject}\n\n${data.message}`,
        source: "contact",
      })
      setSubmitted(true)
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : (isArabic ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again."))
    }
  }

  const whatsappUrl = savedData ? `https://wa.me/966552282868?text=${encodeURIComponent(
    `Name: ${savedData.fullName}\nEmail: ${savedData.email}\nSubject: ${savedData.subject}\nMessage: ${savedData.message}`
  )}` : "#"

  const inputClass = (hasError: boolean) =>
    `input-field ${hasError ? "border-red-500/50 focus:border-red-500" : ""} ${isArabic ? "font-arabic text-start" : ""}`

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
          <motion.div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
            <CheckCircle size={28} className="text-emerald-400" />
          </motion.div>
          <h3 className={`text-brand-white font-bold text-xl mb-2 ${isArabic ? "font-arabic" : "font-display uppercase"}`}>{labels.successTitle}</h3>
          <p className={`text-brand-muted mb-6 ${isArabic ? "font-arabic" : ""}`}>{labels.successMsg}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-emerald-500 transition-colors">
              <MessageCircle size={16} />{labels.whatsapp}
            </a>
            <button onClick={() => { setSubmitted(false); reset(); setSavedData(null) }}
              className="text-brand-amber text-xs font-bold uppercase tracking-widest hover:text-brand-gold cursor-pointer py-3">
              {labels.another}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-4" dir={isArabic ? "rtl" : "ltr"} noValidate>
          <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
          </div>

          {serverError && (
            <div role="alert" aria-live="polite" className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />{serverError}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label={labels.fullName} error={errors.fullName?.message} id="contact-fullName" isArabic={isArabic}>
              <input id="contact-fullName" {...register("fullName")} aria-invalid={!!errors.fullName} className={inputClass(!!errors.fullName)} />
            </FormField>
            <FormField label={labels.email} error={errors.email?.message} id="contact-email" isArabic={isArabic}>
              <input id="contact-email" type="email" {...register("email")} aria-invalid={!!errors.email} className={inputClass(!!errors.email)} />
            </FormField>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <FormField label={labels.phone} error={errors.phone?.message} id="contact-phone" isArabic={isArabic}>
              <input id="contact-phone" type="tel" {...register("phone")} className={inputClass(!!errors.phone)} />
            </FormField>
            <FormField label={labels.companyName} error={errors.companyName?.message} id="contact-company" isArabic={isArabic}>
              <input id="contact-company" {...register("companyName")} className={inputClass(!!errors.companyName)} />
            </FormField>
          </div>
          <FormField label={labels.subject} error={errors.subject?.message} id="contact-subject" isArabic={isArabic}>
            <input id="contact-subject" {...register("subject")} aria-invalid={!!errors.subject} className={inputClass(!!errors.subject)} />
          </FormField>
          <FormField label={labels.message} error={errors.message?.message} id="contact-message" isArabic={isArabic}>
            <textarea id="contact-message" rows={5} {...register("message")} aria-invalid={!!errors.message} className={inputClass(!!errors.message)} />
          </FormField>

          <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-3 bg-brand-amber text-white font-bold text-sm py-5 rounded-xl
              hover:bg-brand-gold transition-colors shadow-lg shadow-brand-amber/20 cursor-pointer disabled:opacity-50
              ${isArabic ? "font-arabic flex-row-reverse" : "uppercase tracking-widest"}`}>
            {isSubmitting ? <><Loader2 size={18} className="animate-spin" />{labels.submitting}</> : <><Send size={18} />{labels.submit}</>}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
