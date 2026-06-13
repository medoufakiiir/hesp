"use client"

import Image from "next/image"
import { MessageCircle } from "lucide-react"
import { useLang } from "@/context/LangContext"

const navLinks = [
  { id: "home",     labelEN: "Home",     labelAR: "الرئيسية" },
  { id: "products", labelEN: "Products", labelAR: "المنتجات" },
  { id: "about",    labelEN: "About",    labelAR: "عن الشركة" },
  { id: "contact",  labelEN: "Contact",  labelAR: "اتصل بنا" },
]

const productLinks = [
  { labelEN: "Excavator Parts",   labelAR: "قطع حفارات" },
  { labelEN: "Bulldozer Parts",   labelAR: "قطع جرافات" },
  { labelEN: "Crane Parts",       labelAR: "قطع رافعات" },
  { labelEN: "Loader Parts",      labelAR: "قطع لودرات" },
  { labelEN: "Engine & Hydraulic",labelAR: "محركات وهيدروليك" },
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
  const { t, isArabic } = useLang()

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  return (
    <footer className="bg-black border-t border-brand-amber/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* Brand col */}
          <div className="lg:col-span-4 space-y-6">
            <Image
              src="/images/logo.png"
              alt="Riyada Ventures"
              width={140}
              height={56}
              className="h-12 w-auto object-contain"
            />
            <p className={`text-brand-muted text-sm leading-relaxed max-w-xs ${isArabic ? "font-arabic text-right" : ""}`}>
              {t.footer.tagline}
            </p>
            <div className={`flex gap-3 ${isArabic ? "flex-row-reverse" : ""}`}>
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-brand-white/10 flex items-center justify-center
                    text-brand-white/40 hover:bg-brand-amber hover:border-brand-amber hover:text-white
                    transition-all duration-200 cursor-pointer"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2 space-y-5">
            <h4 className={`text-brand-amber text-xs font-bold uppercase tracking-widest ${isArabic ? "font-arabic text-right" : ""}`}>
              {t.footer.links}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.id) }}
                    className={`text-brand-muted hover:text-brand-amber text-sm font-medium
                      transition-colors cursor-pointer ${isArabic ? "font-arabic block text-right" : "hover:translate-x-1 inline-block transition-transform"}`}
                  >
                    {isArabic ? link.labelAR : link.labelEN}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className={`text-brand-amber text-xs font-bold uppercase tracking-widest ${isArabic ? "font-arabic text-right" : ""}`}>
              {t.footer.products}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((p, i) => (
                <li key={i}>
                  <a
                    href="#products"
                    onClick={(e) => { e.preventDefault(); scrollTo("products") }}
                    className={`text-brand-muted hover:text-brand-amber text-sm font-medium
                      transition-colors cursor-pointer ${isArabic ? "font-arabic block text-right" : "hover:translate-x-1 inline-block transition-transform"}`}
                  >
                    {isArabic ? p.labelAR : p.labelEN}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-5">
            <h4 className={`text-brand-amber text-xs font-bold uppercase tracking-widest ${isArabic ? "font-arabic text-right" : ""}`}>
              {t.footer.contact}
            </h4>
            <div className="space-y-3">
              {[
                t.contact.phone,
                t.contact.email,
                t.contact.address,
              ].map((item, i) => (
                <p key={i} className={`text-brand-muted text-sm leading-relaxed ${isArabic ? "font-arabic text-right" : ""}`}>
                  {item}
                </p>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className={`text-green-400 text-xs font-semibold ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "نخدمك الآن" : "We're open now"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 border-t border-brand-white/5 flex flex-col sm:flex-row justify-between items-center gap-4"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="flex items-center gap-2 text-brand-white/20">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {t.footer.vision2030}
            </span>
          </div>
          <p className={`text-[10px] font-bold uppercase tracking-widest text-brand-white/20 ${isArabic ? "font-arabic" : ""}`}>
            © {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}
