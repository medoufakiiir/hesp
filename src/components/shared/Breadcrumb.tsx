"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useLang } from "@/context/LangContext"

interface BreadcrumbItem {
  labelEN: string
  labelAR: string
  href?: string
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  const { isArabic } = useLang()

  return (
    <nav aria-label="Breadcrumb" className="py-4" dir={isArabic ? "rtl" : "ltr"}>
      <ol className="flex items-center gap-2 text-xs text-brand-muted">
        <li>
          <Link href="/" className="hover:text-brand-amber transition-colors">
            {isArabic ? "الرئيسية" : "Home"}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <ChevronRight size={12} className={`text-brand-white/20 ${isArabic ? "rotate-180" : ""}`} />
            {item.href ? (
              <Link href={item.href} className={`hover:text-brand-amber transition-colors ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? item.labelAR : item.labelEN}
              </Link>
            ) : (
              <span className={`text-brand-white/60 ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? item.labelAR : item.labelEN}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
