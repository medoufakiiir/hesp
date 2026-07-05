import Link from "next/link"
import { barlowCondensed, inter, tajawalArabic } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import "./globals.css"

// Root 404 for requests that never enter the [locale] segment — paths the
// middleware matcher skips (anything with a file extension, /_vercel, etc.).
// Un-prefixed page paths (/xyz) are locale-redirected by the middleware and
// land on the localized not-found instead. Rendered without a layout above
// it, so it owns its <html>/<body>; locale is unknown here, so both languages
// are shown statically (no next-intl provider exists at this level).
export default function RootNotFound() {
  return (
    <html
      lang="en"
      dir="ltr"
      className={cn("antialiased", barlowCondensed.variable, inter.variable, tajawalArabic.variable)}
    >
      <body className="min-h-full bg-brand-iron text-brand-white">
        <main className="min-h-screen bg-brand-iron flex items-center justify-center relative overflow-hidden px-4">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.05] blur-[150px]" />
            <div className="absolute inset-0 opacity-[0.015]" style={{
              backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center py-24">
            <p className="font-display font-extrabold leading-[0.85] tracking-tight select-none
              text-[clamp(7rem,24vw,14rem)] text-transparent bg-clip-text bg-gradient-to-b from-brand-gold via-brand-amber to-brand-dust"
              aria-hidden="true">
              404
            </p>
            <h1 className="text-brand-white font-display font-extrabold uppercase tracking-tight text-4xl mb-2 mt-2">
              Page Not Found
            </h1>
            <p className="text-brand-white font-arabic font-bold text-2xl mb-5" dir="rtl" lang="ar">
              الصفحة غير موجودة
            </p>
            <p className="text-brand-muted text-base leading-relaxed mb-2">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <p className="text-brand-muted font-arabic text-base leading-relaxed mb-10" dir="rtl" lang="ar">
              الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/en" className="bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-xl
                hover:bg-brand-gold transition-colors shadow-2xl shadow-brand-amber/20">
                Back to Home
              </Link>
              <Link href="/ar" className="border border-brand-white/15 text-brand-white font-arabic text-sm font-bold px-8 py-4 rounded-xl
                hover:border-brand-amber hover:text-brand-amber transition-colors" lang="ar">
                العودة للرئيسية
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
