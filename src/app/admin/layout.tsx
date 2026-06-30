import type { Metadata } from "next"
import AdminProviders from "./providers"
import AdminShell from "./AdminShell"
import { barlowCondensed, inter, tajawalArabic } from "@/lib/fonts"
import "../globals.css"
import { cn } from "@/lib/utils"

// /admin is outside the [locale] segment (English-only internal dashboard,
// never crawled — see robots.ts), so it needs its own root layout with
// <html>/<body> rather than sharing one with the public site. Same fonts and
// body classes as the public [locale] root layout, just without next-intl,
// JSON-LD, or any locale awareness — admin's appearance is unchanged.
export const metadata: Metadata = {
  title: "Admin | Riyada Ventures",
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={cn("antialiased", barlowCondensed.variable, inter.variable, tajawalArabic.variable)}
    >
      <body className="min-h-full bg-brand-iron text-brand-white">
        <AdminProviders>
          <AdminShell>{children}</AdminShell>
        </AdminProviders>
      </body>
    </html>
  )
}
