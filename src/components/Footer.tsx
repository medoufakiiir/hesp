"use client"

import Image from "next/image"
import { useLocale } from "next-intl"
import { Link } from "@/i18n/navigation"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { staggerContainer, blurFadeIn, fadeInUp } from "@/lib/motion"
import { toArabicNum } from "@/lib/utils"

const navLinks = [
  { href: "/",         labelEN: "Home",     labelAR: "الرئيسية" },
  { href: "/products", labelEN: "Products", labelAR: "المنتجات" },
  { href: "/brands",   labelEN: "Brands",   labelAR: "العلامات التجارية" },
  { href: "/about",    labelEN: "About",    labelAR: "عن الشركة" },
  { href: "/blog",     labelEN: "Blog",     labelAR: "المدونة" },
  { href: "/contact",  labelEN: "Contact",  labelAR: "اتصل بنا" },
]

const productLinks = [
  { href: "/products/excavator-parts",       labelEN: "Excavator Parts",   labelAR: "قطع حفارات" },
  { href: "/products/bulldozer-parts",       labelEN: "Bulldozer Parts",   labelAR: "قطع جرافات" },
  { href: "/products/crane-parts",           labelEN: "Crane Parts",       labelAR: "قطع رافعات" },
  { href: "/products/loader-parts",          labelEN: "Loader Parts",      labelAR: "قطع لودرات" },
  { href: "/products/engine-hydraulic-parts", labelEN: "Engine & Hydraulic", labelAR: "محركات وهيدروليك" },
]

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M13.5 22v-9h3l.5-4h-3.5V7.5c0-1.1.3-1.8 1.9-1.8H17V2.1c-.4-.1-1.7-.2-3.1-.2-3 0-5 1.8-5 5.1V9H6v4h2.9v9h4.6Z" />
  </svg>
)

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4.5A5.5 5.5 0 1 1 6.5 14 5.5 5.5 0 0 1 12 8.5Zm0 2A3.5 3.5 0 1 0 15.5 14 3.5 3.5 0 0 0 12 10.5ZM18 7.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
  </svg>
)

const WhatsAppIcon = () => <MessageCircle size={16} />

const socials = [
  { Icon: FacebookIcon,  href: "https://www.facebook.com/profile.php?id=61585739796353", label: "Facebook" },
  { Icon: InstagramIcon, href: "https://www.instagram.com/rv_hesp/",                    label: "Instagram" },
  { Icon: WhatsAppIcon,  href: "https://wa.me/966552282868",                            label: "WhatsApp" },
]

export default function Footer() {
  const isArabic = useLocale() === "ar"

  return (
    <footer className="bg-black border-t border-brand-amber/20 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle amber glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-amber/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* Brand */}
          <motion.div variants={blurFadeIn} className="lg:col-span-4 space-y-6">
            <Link href="/">
              <Image src="/images/logo.png" alt="Riyada Ventures - Heavy Equipment Spare Parts Saudi Arabia"
                width={240} height={96} className="h-24 w-auto object-contain" unoptimized />
            </Link>
            <p className={`text-brand-muted text-sm leading-relaxed max-w-xs ${isArabic ? "font-arabic text-right" : ""}`}>
              {isArabic
                ? "العمود الفقري للصيانة الصناعية وقطع غيار المعدات الثقيلة في المملكة العربية السعودية."
                : "The backbone of Saudi industrial maintenance and heavy equipment spare parts."}
            </p>
            <div className={`flex gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
              {socials.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center
                    text-brand-white/40 hover:bg-brand-amber hover:border-brand-amber hover:text-white transition-all cursor-pointer"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={blurFadeIn} className="lg:col-span-2 space-y-5">
            <h4 className={`text-brand-amber text-xs font-bold ${isArabic ? "font-arabic text-right" : "uppercase tracking-widest"}`}>
              {isArabic ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link href={link.href}
                    className={`text-brand-muted hover:text-brand-amber text-sm font-medium transition-all duration-200
                      ${isArabic ? "font-arabic block text-right hover:-translate-x-1" : "hover:translate-x-1 inline-block"}`}>
                    {isArabic ? link.labelAR : link.labelEN}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div variants={blurFadeIn} className="lg:col-span-3 space-y-5">
            <h4 className={`text-brand-amber text-xs font-bold ${isArabic ? "font-arabic text-right" : "uppercase tracking-widest"}`}>
              {isArabic ? "المنتجات" : "Products"}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((p, i) => (
                <motion.li
                  key={p.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <Link href={p.href}
                    className={`text-brand-muted hover:text-brand-amber text-sm font-medium transition-all duration-200
                      ${isArabic ? "font-arabic block text-right hover:-translate-x-1" : "hover:translate-x-1 inline-block"}`}>
                    {isArabic ? p.labelAR : p.labelEN}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={blurFadeIn} className="lg:col-span-3 space-y-5">
            <h4 className={`text-brand-amber text-xs font-bold ${isArabic ? "font-arabic text-right" : "uppercase tracking-widest"}`}>
              {isArabic ? "اتصل بنا" : "Contact"}
            </h4>
            <div className="space-y-3">
              <p className={`text-brand-muted text-sm ${isArabic ? "font-arabic text-right" : ""}`} dir="ltr">
                +966 55 228 2868
              </p>
              <p className={`text-brand-muted text-sm ${isArabic ? "font-arabic text-right" : ""}`}>
                info@riyada-ventures.com
              </p>
              <p className={`text-brand-muted text-sm leading-relaxed ${isArabic ? "font-arabic text-right" : ""}`}>
                {isArabic ? "الفيصلية، الرياض ١٢٨٨٢، المملكة العربية السعودية" : "Al Faisaliyyah, Riyadh 12882, KSA"}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <motion.span
                className="w-2 h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <span className={`text-green-400 text-xs font-semibold ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "نخدمك الآن" : "We're open now"}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-8 border-t border-brand-white/5"
        >
          {/* Animated line */}
          <motion.div
            className="h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent mb-8 -mt-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4" dir={isArabic ? "rtl" : "ltr"}>
            <div className="flex items-center gap-2 text-brand-white/20">
              <span className={`text-[10px] font-bold ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
                {isArabic ? "رؤية المملكة ٢٠٣٠" : "Saudi Vision 2030"}
              </span>
            </div>
            <p className={`text-[10px] font-bold text-brand-white/20 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
              © {isArabic ? toArabicNum(new Date().getFullYear()) : new Date().getFullYear()} {isArabic ? "جميع الحقوق محفوظة. ريادة فنتشرز." : "All rights reserved. Riyada Ventures."}
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
