import type { Metadata } from "next"
import { Barlow_Condensed, Inter, Tajawal } from "next/font/google"
import "./globals.css"
import { LangProvider } from "@/context/LangContext"
import VisitorTracker from "@/components/VisitorTracker"
import { cn } from "@/lib/utils"
import { organizationJsonLd, localBusinessJsonLd } from "@/lib/seo"

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

const tajawalArabic = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
})


export const metadata: Metadata = {
  metadataBase: new URL("https://riyada-ventures.com"),
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
    siteName: "Riyada Ventures - HESP",
    locale: "en_US",
    alternateLocale: "ar_SA",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Riyada Ventures Heavy Equipment Spare Parts" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riyada Ventures | Heavy Equipment Spare Parts",
    description: "Saudi Arabia's premier heavy equipment spare parts supplier.",
  },
  alternates: {
    canonical: "https://riyada-ventures.com",
    languages: { "en": "https://riyada-ventures.com", "ar": "https://riyada-ventures.com" },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "Industrial Equipment",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
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
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  )
}
