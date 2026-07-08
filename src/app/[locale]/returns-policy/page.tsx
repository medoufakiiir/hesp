import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { buildMetadata } from "@/lib/seo"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/shared/PageHeader"

// Unlike terms/privacy (whose copy lives in src/data/legal/*.ts), this page's
// copy lives in messages/*.json under "returnsPolicy" so it can be edited
// without touching code. Markup and classes mirror LegalArticle so the page
// stays visually identical to the other legal pages.

type PolicySection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
  note?: string
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "returnsPolicy" })
  return buildMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    path: "/returns-policy",
    locale,
  })
}

export default async function ReturnsPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: "returnsPolicy" })
  const isArabic = locale === "ar"

  const intro = t.raw("intro") as string[]
  const sections = t.raw("sections") as PolicySection[]

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      {/* PageHeader picks EN/AR props by the active locale; the strings here
          are already locale-resolved from messages, so both props get the
          same value and the right one renders either way. */}
      <PageHeader
        eyebrowEN={t("eyebrow")}
        eyebrowAR={t("eyebrow")}
        titleEN={t("title")}
        titleAR={t("title")}
        subtitleEN={t("lastUpdated")}
        subtitleAR={t("lastUpdated")}
      />

      <article
        dir={isArabic ? "rtl" : "ltr"}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 ${isArabic ? "font-arabic text-right" : ""}`}
      >
        <div className="space-y-5 mb-14">
          {intro.map((p, i) => (
            <p key={i} className="text-brand-white/85 text-base sm:text-lg leading-[1.9]">
              {p}
            </p>
          ))}
        </div>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <section key={i} className="scroll-mt-28">
              <h2
                className={`text-brand-amber mb-4 ${
                  isArabic
                    ? "font-arabic font-bold text-xl sm:text-2xl"
                    : "font-display font-bold uppercase tracking-wide text-xl sm:text-2xl"
                }`}
              >
                {section.heading}
              </h2>

              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-brand-muted text-[15px] sm:text-base leading-[1.9]">
                    {p}
                  </p>
                ))}

                {section.bullets && (
                  <ul className={`space-y-3 ${isArabic ? "pr-1" : "pl-1"}`}>
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-brand-muted text-[15px] sm:text-base leading-[1.8]">
                        <span className="text-brand-amber mt-[2px] shrink-0" aria-hidden="true">◆</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <div className="mt-5 rounded-2xl border border-brand-amber/25 bg-brand-amber/[0.06] px-6 py-5">
                    <p className="text-brand-sand text-[15px] sm:text-base leading-[1.9] font-medium">
                      {section.note}
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}

          <section className="scroll-mt-28">
            <div className="rounded-2xl border border-brand-amber/25 bg-brand-amber/[0.06] px-6 py-6 sm:px-8 sm:py-7">
              <h2
                className={`text-brand-amber mb-3 ${
                  isArabic
                    ? "font-arabic font-bold text-xl sm:text-2xl"
                    : "font-display font-bold uppercase tracking-wide text-xl sm:text-2xl"
                }`}
              >
                {t("contact.heading")}
              </h2>
              <p className="text-brand-sand text-[15px] sm:text-base leading-[1.9] mb-5">
                {t("contact.paragraph")}
              </p>
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                <div>
                  <p className={`text-brand-muted text-xs mb-1 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
                    {t("contact.whatsappLabel")}
                  </p>
                  <a
                    href="https://wa.me/966552282868"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="text-brand-white hover:text-brand-amber text-[15px] sm:text-base font-medium transition-colors"
                  >
                    +966 55 228 2868
                  </a>
                </div>
                <div>
                  <p className={`text-brand-muted text-xs mb-1 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}>
                    {t("contact.emailLabel")}
                  </p>
                  <a
                    href="mailto:info@riyada-ventures.com"
                    dir="ltr"
                    className="text-brand-white hover:text-brand-amber text-[15px] sm:text-base font-medium transition-colors"
                  >
                    info@riyada-ventures.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </main>
  )
}
