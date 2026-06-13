"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLang } from "@/context/LangContext"

export default function Navbar() {
  const { lang, setLang, t, isArabic } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const navLinks = [
    { id: "home",     label: t.nav.home },
    { id: "products", label: t.nav.products },
    { id: "about",    label: t.nav.about },
    { id: "contact",  label: t.nav.contact },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-iron/90 backdrop-blur-xl border-b border-brand-amber/10 py-0"
          : "bg-transparent py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo("home") }}
          className="flex items-center flex-shrink-0"
          aria-label="Riyada Ventures Home"
        >
          <Image
            src="/images/logo.png"
            alt="Riyada Ventures"
            width={120}
            height={48}
            className="h-10 w-auto object-contain"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className={`hidden lg:flex items-center gap-1 ${isArabic ? "flex-row-reverse" : ""}`}>
          {navLinks.map((link, i) => (
            <motion.a
              key={link.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
              className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-widest text-brand-white/60
                hover:text-brand-amber transition-colors duration-200 group cursor-pointer ${isArabic ? "font-arabic" : ""}`}
            >
              {link.label}
              <span className="absolute bottom-0 left-4 right-4 h-px bg-brand-amber origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.a>
          ))}
        </div>

        {/* Controls */}
        <div className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
          <button
            onClick={() => setLang(lang === "EN" ? "AR" : "EN")}
            className="text-[10px] font-bold text-brand-white/60 border border-brand-white/15 px-4 py-2
              rounded-full hover:border-brand-amber hover:text-brand-amber transition-all uppercase tracking-wider cursor-pointer"
            aria-label="Toggle language"
          >
            {lang === "EN" ? "عربي" : "EN"}
          </button>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden lg:flex items-center gap-2 bg-brand-amber text-white text-[10px] font-bold
              uppercase tracking-widest px-5 py-2.5 rounded-xl hover:bg-brand-gold transition-all cursor-pointer"
          >
            {t.nav.contact}
          </button>
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-brand-iron/98 border-t border-brand-white/5 py-3"
            dir={isArabic ? "rtl" : "ltr"}
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                className={`block px-8 py-4 text-xs font-bold uppercase tracking-widest
                  text-brand-white/60 hover:text-brand-amber hover:bg-brand-white/5
                  transition-all cursor-pointer ${isArabic ? "font-arabic text-right" : ""}`}
              >
                {link.label}
              </a>
            ))}
            <div className="px-8 py-3">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full bg-brand-amber text-white text-xs font-bold uppercase tracking-widest
                  py-3 rounded-xl hover:bg-brand-gold transition-all cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
