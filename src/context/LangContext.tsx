"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

type Lang = "EN" | "AR"

const translations = {
  EN: {
    nav: { home: "Home", products: "Products", about: "About", contact: "Contact" },
    hero: {
      tag: "Saudi Arabia's Premier Parts Partner",
      headline1: "Parts That",
      headline2: "Move the World",
      sub: "Heavy equipment spare parts — fast delivery across Saudi Arabia.",
      cta1: "Order Now",
      cta2: "Browse Catalog",
    },
    stats: [
      { num: 15, suffix: "+", label: "Years Experience" },
      { num: 500, suffix: "+", label: "Trusted Brands" },
      { num: 10000, suffix: "+", label: "Parts Available" },
      { num: 30, suffix: "+", label: "Countries Served" },
    ],
    categories: {
      eyebrow: "Product Categories",
      title: "Engineered for Every Machine",
      sub: "Premium spare parts covering the full spectrum of heavy equipment.",
      items: [
        { nameEN: "Excavator Parts", descEN: "Full catalog for all excavator models" },
        { nameEN: "Bulldozer Parts", descEN: "Heavy dozer drivetrain & chassis" },
        { nameEN: "Crane & Lifting Parts", descEN: "Lifting, rigging & hoist components" },
        { nameEN: "Loader Parts", descEN: "Wheel loader hydraulics & drivetrain" },
        { nameEN: "Road Construction", descEN: "Compaction & paving equipment parts" },
        { nameEN: "Engine & Hydraulic", descEN: "Power systems & hydraulic circuits" },
      ],
    },
    equipment: {
      eyebrow: "Our Fleet Coverage",
      title: "Heavy Machinery. Every Make.",
      sub: "From excavators to cranes — we source the part, wherever it is.",
    },
    why: {
      eyebrow: "Why Choose Us",
      title: "The Backbone of Saudi Industrial Maintenance",
      sub: "We don't just supply parts — we supply uptime.",
      items: [
        { title: "Original Parts Only", desc: "OEM-certified and verified aftermarket components you can trust." },
        { title: "Fast Saudi Delivery", desc: "Air-freight in 3–5 days. Same-day pickup in Riyadh." },
        { title: "Expert Technical Support", desc: "Engineering-grade consultation for every procurement decision." },
        { title: "Competitive Pricing", desc: "Direct sourcing from global manufacturers — no middlemen." },
      ],
    },
    brands: {
      eyebrow: "Supported Brands",
      title: "We Cover Every Major Brand",
    },
    testimonials: {
      eyebrow: "Client Testimonials",
      title: "Trusted by Saudi's Largest Fleets",
      items: [
        {
          quote: "Riyada reduced our fleet downtime by 40%. Critical parts delivered within 48 hours — unmatched reliability.",
          name: "Mohammed Al-Rashidi",
          company: "Fleet Manager — Saudi Aramco Contractors",
        },
        {
          quote: "Best aftermarket parts supplier in the Kingdom. Our workshop runs entirely on Riyada sourcing.",
          name: "Eng. Abdullah Al-Otaibi",
          company: "Procurement Head — SARC Construction Co.",
        },
        {
          quote: "Professional service, competitive pricing, fast delivery. Riyada is our first call for every part.",
          name: "Omar Al-Ghamdi",
          company: "Operations Director — Al-Muhaidib Group",
        },
      ],
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Let's Keep Your Fleet Running",
      sub: "Submit a part request and we'll respond within 2 hours.",
      namePlaceholder: "Full Name",
      companyPlaceholder: "Company (optional)",
      phonePlaceholder: "Phone Number",
      partPlaceholder: "Part needed (e.g. CAT 320D hydraulic pump)",
      send: "Send via WhatsApp",
      phone: "+966 55 228 2868",
      email: "info@riyada-ventures.com",
      address: "Al Faisaliyyah, Riyadh 12882, KSA",
      hours: "Sun – Thu  ·  8:00 AM – 6:00 PM",
    },
    footer: {
      tagline: "The backbone of Saudi industrial maintenance and heavy equipment spare parts.",
      links: "Quick Links",
      products: "Products",
      contact: "Contact",
      rights: "All rights reserved. Riyada Ventures.",
      vision2030: "Saudi Vision 2030",
    },
    about: {
      eyebrow: "Our Story",
      title: "Built for Saudi Industry",
      text: "Riyada Ventures was established to solve a persistent market problem: operators need the right part, fast, from a reliable source — without guesswork. We are the backbone of Saudi industrial maintenance.",
      vision: "To be the most trusted heavy equipment partner in the Middle East.",
      mission: "Delivering engineering excellence through precision global sourcing.",
    },
  },
  AR: {
    nav: { home: "الرئيسية", products: "المنتجات", about: "عن الشركة", contact: "اتصل بنا" },
    hero: {
      tag: "الشريك الأول لقطع الغيار في المملكة",
      headline1: "القطع التي",
      headline2: "تُحرك عالم الإنشاء",
      sub: "قطع غيار المعدات الثقيلة — توصيل سريع في جميع أنحاء المملكة العربية السعودية.",
      cta1: "اطلب الآن",
      cta2: "تصفح الكتالوج",
    },
    stats: [
      { num: 15, suffix: "+", label: "سنوات خبرة" },
      { num: 500, suffix: "+", label: "علامة تجارية موثوقة" },
      { num: 10000, suffix: "+", label: "قطعة غيار متاحة" },
      { num: 30, suffix: "+", label: "دولة نخدمها" },
    ],
    categories: {
      eyebrow: "فئات المنتجات",
      title: "مصنوعة لكل آلة",
      sub: "قطع غيار متميزة تغطي الطيف الكامل من المعدات الثقيلة.",
      items: [
        { nameEN: "قطع حفارات", descEN: "كتالوج كامل لجميع أنواع الحفارات" },
        { nameEN: "قطع جرافات", descEN: "ناقل الحركة والهيكل للجرافات الثقيلة" },
        { nameEN: "قطع رافعات", descEN: "مكونات الرفع والتعليق والرافعات" },
        { nameEN: "قطع لودرات", descEN: "هيدروليك ومحركات اللودرات" },
        { nameEN: "إنشاء الطرق", descEN: "قطع معدات الضغط والرصف" },
        { nameEN: "محركات وهيدروليك", descEN: "أنظمة الطاقة والدوائر الهيدروليكية" },
      ],
    },
    equipment: {
      eyebrow: "تغطية أسطولنا",
      title: "المعدات الثقيلة. كل ماركة.",
      sub: "من الحفارات إلى الرافعات — نحن نحصل على القطعة، أينما كانت.",
    },
    why: {
      eyebrow: "لماذا تختارنا",
      title: "العمود الفقري للصيانة الصناعية السعودية",
      sub: "نحن لا نوفر قطعاً فحسب — بل نوفر وقت التشغيل.",
      items: [
        { title: "قطع أصلية فقط", desc: "مكونات معتمدة OEM وقطع ما بعد البيع المعتمدة يمكنك الوثوق بها." },
        { title: "توصيل سريع داخل المملكة", desc: "شحن جوي في 3–5 أيام. استلام في نفس اليوم في الرياض." },
        { title: "دعم فني متخصص", desc: "استشارات هندسية متخصصة لكل قرار شراء." },
        { title: "أسعار تنافسية", desc: "مصادر مباشرة من الشركات المصنعة العالمية — بدون وسطاء." },
      ],
    },
    brands: {
      eyebrow: "العلامات التجارية المدعومة",
      title: "نغطي كل العلامات الكبرى",
    },
    testimonials: {
      eyebrow: "شهادات العملاء",
      title: "موثوق به من قِبَل أكبر الأساطيل السعودية",
      items: [
        {
          quote: "قللت ريادة من وقت توقف أسطولنا بنسبة 40٪. قطع غيار حيوية سُلِّمت في غضون 48 ساعة — موثوقية لا مثيل لها.",
          name: "محمد الراشدي",
          company: "مدير الأسطول — مقاولو أرامكو السعودية",
        },
        {
          quote: "أفضل مورد قطع غيار ما بعد البيع في المملكة. ورشتنا تعمل بشكل كامل على مصادر ريادة.",
          name: "م. عبدالله العتيبي",
          company: "رئيس المشتريات — شركة ساركو للإنشاء",
        },
        {
          quote: "خدمة احترافية، أسعار تنافسية، تسليم سريع. ريادة هي أول اتصالاتنا لكل قطعة غيار.",
          name: "عمر الغامدي",
          company: "مدير العمليات — مجموعة المهيدب",
        },
      ],
    },
    contact: {
      eyebrow: "تواصل معنا",
      title: "لنبقي أسطولك يعمل",
      sub: "أرسل طلب قطعة غيار وسنرد خلال ساعتين.",
      namePlaceholder: "الاسم الكامل",
      companyPlaceholder: "الشركة (اختياري)",
      phonePlaceholder: "رقم الهاتف",
      partPlaceholder: "القطعة المطلوبة (مثال: مضخة هيدروليكية CAT 320D)",
      send: "إرسال عبر واتساب",
      phone: "+966 55 228 2868",
      email: "info@riyada-ventures.com",
      address: "الفيصلية، الرياض 12882، المملكة العربية السعودية",
      hours: "الأحد – الخميس  ·  8:00 صباحاً – 6:00 مساءً",
    },
    footer: {
      tagline: "العمود الفقري للصيانة الصناعية وقطع غيار المعدات الثقيلة في المملكة.",
      links: "روابط سريعة",
      products: "المنتجات",
      contact: "اتصل بنا",
      rights: "جميع الحقوق محفوظة. ريادة فنتشرز.",
      vision2030: "رؤية المملكة 2030",
    },
    about: {
      eyebrow: "قصتنا",
      title: "بُني للصناعة السعودية",
      text: "تأسست ريادة فنتشرز لحل مشكلة سوقية متكررة: يحتاج المشغلون إلى القطعة الصحيحة بسرعة من مصدر موثوق — بدون تخمين. نحن العمود الفقري للصيانة الصناعية السعودية.",
      vision: "أن نكون الشريك الأكثر ثقةً في قطاع المعدات الثقيلة بالشرق الأوسط.",
      mission: "تقديم التميز الهندسي من خلال المصادر العالمية الدقيقة.",
    },
  },
} as const

type Translations = typeof translations

interface LangContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: Translations["EN"]
  isArabic: boolean
  dir: "rtl" | "ltr"
}

const LangContext = createContext<LangContextType>({
  lang: "EN",
  setLang: () => {},
  t: translations["EN"],
  isArabic: false,
  dir: "ltr",
})

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN")

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    if (typeof document !== "undefined") {
      document.documentElement.lang = l === "AR" ? "ar" : "en"
      document.documentElement.dir = l === "AR" ? "rtl" : "ltr"
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = lang === "AR" ? "rtl" : "ltr"
      document.documentElement.lang = lang === "AR" ? "ar" : "en"
    }
  }, [lang])

  const isArabic = lang === "AR"

  return (
    <LangContext.Provider
      value={{
        lang,
        setLang,
        t: translations[lang] as Translations["EN"],
        isArabic,
        dir: isArabic ? "rtl" : "ltr",
      }}
    >
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
