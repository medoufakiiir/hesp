"use client"

import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { RefreshCcw } from "lucide-react"

// Generic error boundary for the public site. Deliberately renders without
// Navbar/Footer — if the crash originated in shared chrome, re-mounting it
// here would throw again and escalate past this boundary.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errorPages.error")
  const isArabic = useLocale() === "ar"

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className="min-h-screen bg-brand-iron flex items-center justify-center relative overflow-hidden px-4"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.05] blur-[150px]" />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center py-24">
        <p className={`text-brand-amber text-xs font-semibold mb-6 ${isArabic ? "font-arabic" : "uppercase tracking-[0.25em]"}`}>
          {t("eyebrow")}
        </p>
        <div className="w-16 h-16 rounded-2xl bg-brand-danger/10 border border-brand-danger/25 flex items-center justify-center mx-auto mb-6">
          <span className="text-brand-danger text-2xl font-bold" aria-hidden="true">!</span>
        </div>
        <h1 className={`text-brand-white mb-4 ${
          isArabic
            ? "font-arabic font-bold text-3xl"
            : "font-display font-extrabold uppercase tracking-tight text-4xl"
        }`}>
          {t("title")}
        </h1>
        <p className={`text-brand-muted text-base leading-relaxed mb-10 ${isArabic ? "font-arabic" : ""}`}>
          {t("message")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className={`inline-flex items-center gap-2 bg-brand-amber text-white text-xs font-bold px-8 py-4 rounded-xl
              hover:bg-brand-gold transition-colors shadow-2xl shadow-brand-amber/20 cursor-pointer
              ${isArabic ? "font-arabic text-sm" : "uppercase tracking-widest"}`}
          >
            <RefreshCcw size={14} aria-hidden="true" />
            {t("retryBtn")}
          </button>
          <Link
            href="/"
            className={`border border-brand-white/15 text-brand-white text-xs font-bold px-8 py-4 rounded-xl
              hover:border-brand-amber hover:text-brand-amber transition-colors
              ${isArabic ? "font-arabic text-sm" : "uppercase tracking-widest"}`}
          >
            {t("homeBtn")}
          </Link>
        </div>
        {error.digest && (
          <p className="text-brand-muted/60 text-xs mt-8 font-mono" dir="ltr">
            Ref: {error.digest}
          </p>
        )}
      </div>
    </main>
  )
}
