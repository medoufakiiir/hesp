"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { motion, AnimatePresence } from "framer-motion"
import { Send, CheckCircle, MessageCircle, Loader2, AlertCircle } from "lucide-react"
import { useLang } from "@/context/LangContext"
import { submitPublicQuote } from "@/actions/public-quote"

const quoteSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters").max(100),
  companyName: z.string().min(2, "Company name required").max(200),
  email: z.string().email("Invalid email address").max(254),
  phone: z.string().min(7, "Phone number too short").max(20),
  partName: z.string().min(2, "Part name required").max(200),
  partNumber: z.string().max(100).optional().or(z.literal("")),
  brand: z.string().min(1, "Brand required").max(150),
  quantity: z.number().min(1, "Minimum quantity is 1").max(99999),
  urgency: z.enum(["normal", "urgent", "critical"]),
  notes: z.string().max(2000).optional().or(z.literal("")),
  honeypot: z.string().max(0),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const t = {
  EN: {
    fullName: "Full Name", companyName: "Company Name", email: "Email Address",
    phone: "Phone Number", partName: "Part Name", partNumber: "Part Number / OEM (optional)",
    brand: "Brand / Manufacturer", quantity: "Quantity", urgency: "Urgency Level",
    notes: "Additional Notes (optional)", submit: "Submit Quote Request",
    submitting: "Submitting...", successTitle: "Quote Request Submitted!",
    successMsg: "We'll respond within 2 business hours.",
    whatsapp: "Chat on WhatsApp", another: "Submit Another Request",
    normal: "Normal", urgent: "Urgent", critical: "Critical",
    required: "This field is required",
  },
  AR: {
    fullName: "الاسم الكامل", companyName: "اسم الشركة", email: "البريد الإلكتروني",
    phone: "رقم الهاتف", partName: "اسم القطعة", partNumber: "رقم القطعة / OEM (اختياري)",
    brand: "العلامة التجارية / المصنّع", quantity: "الكمية", urgency: "مستوى الاستعجال",
    notes: "ملاحظات إضافية (اختياري)", submit: "إرسال طلب عرض السعر",
    submitting: "جاري الإرسال...", successTitle: "تم إرسال طلب عرض السعر!",
    successMsg: "سنرد عليك خلال ساعتين عمل.",
    whatsapp: "تواصل عبر واتساب", another: "إرسال طلب آخر",
    normal: "عادي", urgent: "عاجل", critical: "حرج",
    required: "هذا الحقل مطلوب",
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
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-400 text-xs mt-1.5">{error}</p>
      )}
    </div>
  )
}

export default function QuoteForm() {
  const { lang, isArabic } = useLang()
  const labels = t[lang]
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState("")
  const [savedData, setSavedData] = useState<QuoteFormData | null>(null)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { urgency: "normal", quantity: 1, honeypot: "" },
  })

  const onSubmit = async (data: QuoteFormData) => {
    if (data.honeypot) return // bot detected
    setServerError("")
    setSavedData(data)
    try {
      await submitPublicQuote({
        fullName: data.fullName, companyName: data.companyName,
        email: data.email, phone: data.phone,
        partName: data.partName, partNumber: data.partNumber || "",
        brand: data.brand, quantity: data.quantity,
        urgency: data.urgency, notes: data.notes || "",
      })
      setSubmitted(true)
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : (isArabic ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again."))
      const firstError = document.querySelector("[aria-invalid=true]") as HTMLElement
      firstError?.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const whatsappUrl = savedData ? `https://wa.me/966552282868?text=${encodeURIComponent(
    `Name: ${savedData.fullName}\nCompany: ${savedData.companyName}\nEmail: ${savedData.email}\nPhone: ${savedData.phone}\nPart: ${savedData.partName}\nPart#: ${savedData.partNumber || "—"}\nBrand: ${savedData.brand}\nQty: ${savedData.quantity}\nUrgency: ${savedData.urgency}\nNotes: ${savedData.notes || "—"}`
  )}` : "#"

  const inputClass = (hasError: boolean) =>
    `input-field ${hasError ? "border-red-500/50 focus:border-red-500 focus:shadow-red-500/10" : ""} ${isArabic ? "font-arabic text-start" : ""}`

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16">
          <motion.div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }}>
            <CheckCircle size={36} className="text-emerald-400" />
          </motion.div>
          <h3 className={`text-brand-white font-bold text-2xl mb-3 ${isArabic ? "font-arabic" : "font-display uppercase"}`}>
            {labels.successTitle}
          </h3>
          <p className={`text-brand-muted mb-8 ${isArabic ? "font-arabic" : ""}`}>{labels.successMsg}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 bg-emerald-600 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-emerald-500 transition-colors ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
              <MessageCircle size={16} />{labels.whatsapp}
            </a>
            <button onClick={() => { setSubmitted(false); reset(); setSavedData(null) }}
              className={`text-brand-amber text-xs font-bold hover:text-brand-gold cursor-pointer py-3 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
              {labels.another}
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-5" dir={isArabic ? "rtl" : "ltr"} noValidate>
          {/* Honeypot */}
          <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
            <input tabIndex={-1} autoComplete="off" {...register("honeypot")} />
          </div>

          {serverError && (
            <div role="alert" aria-live="polite" className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle size={16} />{serverError}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField isArabic={isArabic} label={labels.fullName} error={errors.fullName?.message} id="fullName">
              <input id="fullName" {...register("fullName")} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined}
                className={inputClass(!!errors.fullName)} />
            </FormField>
            <FormField isArabic={isArabic} label={labels.companyName} error={errors.companyName?.message} id="companyName">
              <input id="companyName" {...register("companyName")} aria-invalid={!!errors.companyName} aria-describedby={errors.companyName ? "companyName-error" : undefined}
                className={inputClass(!!errors.companyName)} />
            </FormField>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField isArabic={isArabic} label={labels.email} error={errors.email?.message} id="email">
              <input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(!!errors.email)} />
            </FormField>
            <FormField isArabic={isArabic} label={labels.phone} error={errors.phone?.message} id="phone">
              <input id="phone" type="tel" {...register("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass(!!errors.phone)} />
            </FormField>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <FormField isArabic={isArabic} label={labels.partName} error={errors.partName?.message} id="partName">
              <input id="partName" {...register("partName")} aria-invalid={!!errors.partName} aria-describedby={errors.partName ? "partName-error" : undefined}
                className={inputClass(!!errors.partName)} />
            </FormField>
            <FormField isArabic={isArabic} label={labels.partNumber} error={errors.partNumber?.message} id="partNumber">
              <input id="partNumber" {...register("partNumber")} placeholder={isArabic ? "مثال: 272-6955" : "e.g. 272-6955"}
                className={inputClass(!!errors.partNumber)} />
            </FormField>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <FormField isArabic={isArabic} label={labels.brand} error={errors.brand?.message} id="brand">
              <input id="brand" {...register("brand")} aria-invalid={!!errors.brand} aria-describedby={errors.brand ? "brand-error" : undefined}
                className={inputClass(!!errors.brand)} />
            </FormField>
            <FormField isArabic={isArabic} label={labels.quantity} error={errors.quantity?.message} id="quantity">
              <input id="quantity" type="number" min={1} {...register("quantity", { valueAsNumber: true })} aria-invalid={!!errors.quantity}
                className={inputClass(!!errors.quantity)} />
            </FormField>
            <FormField isArabic={isArabic} label={labels.urgency} error={errors.urgency?.message} id="urgency">
              <select id="urgency" {...register("urgency")} className={inputClass(!!errors.urgency)}>
                <option value="normal">{labels.normal}</option>
                <option value="urgent">{labels.urgent}</option>
                <option value="critical">{labels.critical}</option>
              </select>
            </FormField>
          </div>

          <FormField isArabic={isArabic} label={labels.notes} error={errors.notes?.message} id="notes">
            <textarea id="notes" rows={4} {...register("notes")} className={inputClass(!!errors.notes)} />
          </FormField>

          <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center justify-center gap-3 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest py-5 rounded-xl
              hover:bg-brand-gold transition-colors shadow-lg shadow-brand-amber/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
              ${isArabic ? "font-arabic flex-row-reverse" : ""}`}>
            {isSubmitting ? <><Loader2 size={18} className="animate-spin" />{labels.submitting}</> : <><Send size={18} />{labels.submit}</>}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
