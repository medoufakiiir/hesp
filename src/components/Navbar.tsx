"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Phone } from "lucide-react"
import { useLang } from "@/context/LangContext"

const navLinks = [
  { href: "/", labelEN: "Home", labelAR: "الرئيسية" },
  { href: "/products", labelEN: "Products", labelAR: "المنتجات" },
  { href: "/brands", labelEN: "Brands", labelAR: "العلامات التجارية" },
  { href: "/blog", labelEN: "Blog", labelAR: "المدونة" },
  { href: "/about", labelEN: "About", labelAR: "عن الشركة" },
  { href: "/contact", labelEN: "Contact", labelAR: "اتصل بنا" },
]

export default function Navbar() {
  const { lang, setLang, isArabic } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  const isHome = pathname === "/"

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-brand-iron/95 backdrop-blur-xl border-b border-brand-amber/10"
          : "bg-transparent"
      }`}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-brand-amber/10 border-b border-brand-amber/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className={`flex items-center gap-4 text-[10px] text-brand-white/50 ${isArabic ? "flex-row-reverse" : ""}`}>
            <span>{isArabic ? "الأحد – الخميس · 8:00 ص – 6:00 م" : "Sun – Thu · 8:00 AM – 6:00 PM"}</span>
            <span className="w-px h-3 bg-brand-white/10" />
            <span>{isArabic ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia"}</span>
          </div>
          <div className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
            <a href="tel:+966552282868" className="flex items-center gap-1.5 text-[10px] text-brand-amber hover:text-brand-gold transition-colors">
              <Phone size={10} />
              <span dir="ltr">+966 55 228 2868</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center flex-shrink-0" aria-label="Riyada Ventures Home">
          <Image
            src="/images/logo.png"
            alt="Riyada Ventures - Heavy Equipment Spare Parts"
            width={240}
            height={96}
            className="h-24 w-auto object-contain"
            priority
          />
        </Link>

        <div className={`hidden lg:flex items-center gap-0.5 ${isArabic ? "flex-row-reverse" : ""}`}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-2 text-[11px] font-semibold uppercase tracking-widest
                  transition-colors duration-200 group ${isArabic ? "font-arabic" : ""}
                  ${isActive ? "text-brand-amber" : "text-brand-white/60 hover:text-brand-amber"}`}
              >
                {isArabic ? link.labelAR : link.labelEN}
                <span className={`absolute bottom-0 left-3.5 right-3.5 h-px bg-brand-amber origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            )
          })}
        </div>

        <div className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
          <button
            onClick={() => setLang(lang === "EN" ? "AR" : "EN")}
            className="text-[10px] font-bold text-brand-white/60 border border-brand-white/15 px-3.5 py-1.5
              rounded-full hover:border-brand-amber hover:text-brand-amber transition-all uppercase tracking-wider cursor-pointer"
            aria-label="Toggle language"
          >
            {lang === "EN" ? "عربي" : "EN"}
          </button>
          <Link
            href="/quote"
            className="hidden lg:flex items-center gap-2 bg-brand-amber text-white text-[10px] font-bold
              uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-brand-gold transition-all"
          >
            {isArabic ? "طلب عرض سعر" : "Get Quote"}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center text-brand-white/70
              rounded-full hover:bg-brand-white/10 transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-brand-iron/98 border-t border-brand-white/5 overflow-hidden"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-8 py-4 text-xs font-bold uppercase tracking-widest
                    transition-all ${isArabic ? "font-arabic text-right" : ""}
                    ${isActive ? "text-brand-amber bg-brand-amber/5" : "text-brand-white/60 hover:text-brand-amber hover:bg-brand-white/5"}`}
                >
                  {isArabic ? link.labelAR : link.labelEN}
                </Link>
              )
            })}
            <div className="px-8 py-3">
              <Link
                href="/quote"
                className="block w-full bg-brand-amber text-white text-xs font-bold uppercase tracking-widest
                  py-3 rounded-xl hover:bg-brand-gold transition-all text-center"
              >
                {isArabic ? "طلب عرض سعر" : "Get Quote"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
