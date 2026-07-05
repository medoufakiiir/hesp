import type { LegalDoc } from "@/data/legal/types"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PageHeader from "@/components/shared/PageHeader"

// Server component — legal copy renders as static HTML with no client JS
// beyond the shared chrome (Navbar/Footer/PageHeader are client components).
export default function LegalArticle({ doc, locale }: { doc: LegalDoc; locale: string }) {
  const isArabic = locale === "ar"
  const pick = (bi: { en: string; ar: string }) => (isArabic ? bi.ar : bi.en)

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      <PageHeader
        eyebrowEN={doc.eyebrow.en}
        eyebrowAR={doc.eyebrow.ar}
        titleEN={doc.title.en}
        titleAR={doc.title.ar}
        subtitleEN={doc.lastUpdated.en}
        subtitleAR={doc.lastUpdated.ar}
      />

      <article
        dir={isArabic ? "rtl" : "ltr"}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 ${isArabic ? "font-arabic text-right" : ""}`}
      >
        <div className="space-y-5 mb-14">
          {doc.intro.map((p, i) => (
            <p key={i} className="text-brand-white/85 text-base sm:text-lg leading-[1.9]">
              {pick(p)}
            </p>
          ))}
        </div>

        <div className="space-y-12">
          {doc.sections.map((section, i) => (
            <section key={i} className="scroll-mt-28">
              <h2
                className={`text-brand-amber mb-4 ${
                  isArabic
                    ? "font-arabic font-bold text-xl sm:text-2xl"
                    : "font-display font-bold uppercase tracking-wide text-xl sm:text-2xl"
                }`}
              >
                {pick(section.heading)}
              </h2>

              <div className="space-y-4">
                {section.paragraphs.map((p, j) => (
                  <p key={j} className="text-brand-muted text-[15px] sm:text-base leading-[1.9]">
                    {pick(p)}
                  </p>
                ))}

                {section.bullets && (
                  <ul className={`space-y-3 ${isArabic ? "pr-1" : "pl-1"}`}>
                    {section.bullets.map((b, j) => (
                      <li key={j} className="flex gap-3 text-brand-muted text-[15px] sm:text-base leading-[1.8]">
                        <span className="text-brand-amber mt-[2px] shrink-0" aria-hidden="true">◆</span>
                        <span>{pick(b)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.note && (
                  <div className="mt-5 rounded-2xl border border-brand-amber/25 bg-brand-amber/[0.06] px-6 py-5">
                    <p className="text-brand-sand text-[15px] sm:text-base leading-[1.9] font-medium">
                      {pick(section.note)}
                    </p>
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>

      <Footer />
    </main>
  )
}
