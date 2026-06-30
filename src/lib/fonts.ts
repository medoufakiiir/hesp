import { Barlow_Condensed, Inter, Tajawal } from "next/font/google"

// Shared across the [locale] and admin root layouts (Next.js requires font
// loaders to be called at module scope, but the resulting objects can be
// imported anywhere) — see Next.js docs on sharing fonts across layouts.
export const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
})

export const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

export const tajawalArabic = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
})
