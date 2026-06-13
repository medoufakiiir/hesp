import type { Metadata } from "next"
import { Barlow_Condensed, Inter, Noto_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { LangProvider } from "@/context/LangContext"
import { cn } from "@/lib/utils"

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Riyada Ventures | HESP — Heavy Equipment Spare Parts",
  description:
    "Premium heavy equipment spare parts for Saudi Arabia's industrial sector. CAT, Komatsu, Volvo, JCB, Hitachi and more — fast delivery across the Kingdom.",
  keywords: "heavy equipment, spare parts, Saudi Arabia, CAT, Komatsu, Volvo, JCB, قطع غيار, معدات ثقيلة",
  openGraph: {
    title: "Riyada Ventures | HESP",
    description: "Saudi Arabia's premier heavy equipment spare parts partner.",
    siteName: "Riyada Ventures",
    locale: "ar_SA",
    alternateLocale: "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("antialiased", barlowCondensed.variable, inter.variable, notoSansArabic.variable)}>
      <body className="min-h-full bg-brand-iron text-brand-white">
        <div id="cursor" aria-hidden="true" />
        <div id="cursor-ring" aria-hidden="true" />
        <LangProvider>
          {children}
        </LangProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const cursor = document.getElementById('cursor');
              const ring = document.getElementById('cursor-ring');
              if (cursor && ring) {
                let mx = 0, my = 0, rx = 0, ry = 0;
                document.addEventListener('mousemove', e => {
                  mx = e.clientX; my = e.clientY;
                  cursor.style.left = mx+'px'; cursor.style.top = my+'px';
                });
                function animRing() {
                  rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
                  ring.style.left = rx+'px'; ring.style.top = ry+'px';
                  requestAnimationFrame(animRing);
                }
                animRing();
                document.querySelectorAll('a,button').forEach(el => {
                  el.addEventListener('mouseenter', () => {
                    cursor.style.transform='translate(-50%,-50%) scale(2.5)';
                    ring.style.opacity='0';
                  });
                  el.addEventListener('mouseleave', () => {
                    cursor.style.transform='translate(-50%,-50%) scale(1)';
                    ring.style.opacity='0.45';
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
