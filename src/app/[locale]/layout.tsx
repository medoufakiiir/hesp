import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { barlowCondensed, inter, tajawalArabic } from "@/lib/fonts"
import "../globals.css"
import { LangProvider } from "@/context/LangContext"
import VisitorTracker from "@/components/VisitorTracker"
import { cn } from "@/lib/utils"
import { organizationJsonLd, localBusinessJsonLd, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/seo"

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Riyada Ventures | Heavy Equipment Spare Parts Saudi Arabia | قطع غيار معدات ثقيلة",
    template: "%s | Riyada Ventures - HESP",
  },
  description:
    "Saudi Arabia's premier heavy equipment spare parts supplier. Genuine OEM & aftermarket parts for CAT, Komatsu, Volvo, JCB, Hitachi. Fast delivery across KSA. قطع غيار المعدات الثقيلة في السعودية.",
  keywords: [
    "heavy equipment spare parts",
    "قطع غيار معدات ثقيلة",
    "spare parts Saudi Arabia",
    "قطع غيار السعودية",
    "CAT parts",
    "قطع غيار كاتربيلر",
    "Komatsu parts",
    "قطع غيار كوماتسو",
    "excavator parts",
    "قطع غيار حفارات",
    "bulldozer parts",
    "قطع غيار جرافات",
    "hydraulic pump",
    "مضخة هيدروليكية",
    "crane parts",
    "قطع غيار رافعات",
    "loader parts",
    "قطع غيار لودرات",
    "construction equipment parts Riyadh",
    "heavy machinery parts Middle East",
    "OEM parts Saudi",
    "aftermarket parts KSA",
    "Volvo CE parts",
    "JCB parts Saudi Arabia",
    "Hitachi parts",
    "undercarriage parts",
    "engine parts heavy equipment",
    "turbocharger parts",
    "track chain parts",
  ],
  authors: [{ name: "Riyada Ventures" }],
  creator: "Riyada Ventures",
  publisher: "Riyada Ventures",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    title: "Riyada Ventures | Heavy Equipment Spare Parts Saudi Arabia",
    description: "Premium heavy equipment spare parts — CAT, Komatsu, Volvo, JCB, Hitachi. Fast delivery across Saudi Arabia.",
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: "ar_SA",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Riyada Ventures Heavy Equipment Spare Parts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyada Ventures | Heavy Equipment Spare Parts",
    description: "Saudi Arabia's premier heavy equipment spare parts supplier.",
  },
  alternates: {
    canonical: SITE_URL,
    languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar`, "x-default": `${SITE_URL}/en` },
  },
  category: "Industrial Equipment",
}

// Root layout for the public, bilingual site only (html/body live here, not
// in a shared top-level layout) — /admin gets its own root layout with the
// same fonts. Splitting it this way lets every page below use the *static*
// `params.locale` route param for lang/dir instead of a request-time API
// like getLocale(), which is what actually enables static rendering/ISR for
// these pages. A single shared root layout calling getLocale() was tried
// first and verified (via `npm run build`) to flip every route in the app
// to fully dynamic (ƒ) — including /admin, which sits below it too — wiping
// out the revalidate-based ISR these pages already relied on.
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enables static rendering for this segment (next-intl App Router requirement).
  setRequestLocale(locale)
  const messages = await getMessages()
  const isArabic = locale === "ar"

  return (
    <html
      lang={locale}
      dir={isArabic ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={cn("antialiased", barlowCondensed.variable, inter.variable, tajawalArabic.variable)}
    >
      <head>
        <link rel="icon" href="/images/logo.ico" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className="min-h-full bg-brand-iron text-brand-white">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]
          focus:bg-brand-amber focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-bold">
          Skip to content
        </a>
        <VisitorTracker />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LangProvider>{children}</LangProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
