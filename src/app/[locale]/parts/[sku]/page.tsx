export const revalidate = 300
import type { Metadata } from "next"
import { cache } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import { prisma } from "@/lib/db"
import { Link } from "@/i18n/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo"
import { getProductImage } from "@/data/catalog-assets"

// Deduped between generateMetadata and the page render. SKU lookup is
// case-insensitive so /parts/cat-320-sk and /parts/CAT-320-SK both resolve.
const getPart = cache(async (rawSku: string) => {
  const sku = decodeURIComponent(rawSku)
  return prisma.part.findFirst({
    where: { sku: { equals: sku, mode: "insensitive" }, isActive: true },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { sort: "asc" } },
      compatibility: { include: { equipmentModel: true } },
    },
  })
})

type Params = Promise<{ locale: string; sku: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, sku } = await params
  const part = await getPart(sku)
  if (!part) return {}

  const isAr = locale === "ar"
  const brandEn = part.brand?.nameEn
  const brandAr = part.brand?.nameAr || brandEn
  const name = isAr ? part.nameAr : part.nameEn
  const desc = (isAr ? part.descriptionAr : part.descriptionEn)?.slice(0, 150)

  return buildMetadata({
    title: isAr
      ? `${name} ${part.sku} | قطع غيار ${brandAr || "معدات ثقيلة"} | HESP`
      : `${name} ${part.sku} | ${brandEn ? `${brandEn} Parts` : "Heavy Equipment Parts"} KSA | HESP`,
    description:
      desc ||
      (isAr
        ? `${name} (${part.sku})${brandAr ? ` لمعدات ${brandAr}` : ""} — قطع غيار معدات ثقيلة أصلية وبديلة مع توصيل سريع في جميع أنحاء السعودية. اطلب عرض سعر الآن.`
        : `${name} (${part.sku})${brandEn ? ` for ${brandEn} equipment` : ""}. OEM-quality heavy equipment spare part, in stock with fast delivery across Saudi Arabia. Request a quote today.`),
    path: `/parts/${encodeURIComponent(part.sku)}`,
    locale,
    keywords: [
      part.sku,
      ...(part.oemNumber ? [part.oemNumber] : []),
      ...(brandEn ? [`${brandEn} ${part.nameEn}`, `${brandEn} parts Saudi Arabia`] : []),
      `${part.nameEn} supplier Saudi Arabia`,
      part.nameAr,
      "قطع غيار معدات ثقيلة",
    ],
    ogImage: getProductImage(part.images?.[0]?.url, part.category?.slug, part.sku),
  })
}

export default async function PartPage({ params }: { params: Params }) {
  const { locale, sku } = await params
  const part = await getPart(sku)
  if (!part) notFound()

  const isArabic = locale === "ar"
  const name = isArabic ? part.nameAr : part.nameEn
  const description = isArabic ? part.descriptionAr : part.descriptionEn
  const brandName = part.brand ? (isArabic ? part.brand.nameAr : part.brand.nameEn) : null
  const categoryName = part.category ? (isArabic ? part.category.nameAr : part.category.nameEn) : null
  const image = getProductImage(part.images?.[0]?.url, part.category?.slug, part.sku)

  const related = await prisma.part.findMany({
    where: { isActive: true, categoryId: part.categoryId, id: { not: part.id } },
    include: { images: { take: 1 }, category: true },
    take: 4,
  })

  const waText = encodeURIComponent(
    `Hello, I need a quote for part ${part.sku} — ${part.nameEn}`,
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: part.nameEn,
              description: part.descriptionEn || `${part.nameEn} (${part.sku}) heavy equipment spare part`,
              image,
              partNumber: part.sku,
              brand: part.brand?.nameEn || "OEM",
              inStock: part.stockQty > 0,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
              ...(part.category
                ? [{ name: part.category.nameEn, url: `/products/${part.category.slug}` }]
                : []),
              { name: part.nameEn, url: `/parts/${encodeURIComponent(part.sku)}` },
            ]),
          ),
        }}
      />
      <Navbar />
      <main className="min-h-screen bg-brand-iron pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav
            className={`flex flex-wrap items-center gap-2 text-xs text-brand-muted mb-8 ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-brand-amber transition-colors">
              {isArabic ? "الرئيسية" : "Home"}
            </Link>
            <span className="text-brand-muted/40">/</span>
            <Link href="/products" className="hover:text-brand-amber transition-colors">
              {isArabic ? "المنتجات" : "Products"}
            </Link>
            {part.category && (
              <>
                <span className="text-brand-muted/40">/</span>
                <Link
                  href={`/products/${part.category.slug}`}
                  className="hover:text-brand-amber transition-colors"
                >
                  {categoryName}
                </Link>
              </>
            )}
            <span className="text-brand-muted/40">/</span>
            <span className="text-brand-white/70">{part.sku}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Image */}
            <div className="relative h-80 lg:h-[420px] rounded-2xl overflow-hidden border border-white/[0.08] bg-brand-plate">
              <Image
                src={image}
                alt={
                  isArabic
                    ? `${part.nameAr} — قطع غيار معدات ثقيلة ${brandName ?? ""}`
                    : `${part.nameEn} — ${brandName ?? "heavy equipment"} spare part in Saudi Arabia`
                }
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {part.stockQty > 0 && (
                <div
                  className={`absolute top-4 end-4 bg-emerald-500/15 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-500/20 backdrop-blur-sm ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}
                >
                  {isArabic ? "متوفر في المخزون" : "In Stock"}
                </div>
              )}
            </div>

            {/* Details */}
            <div className={isArabic ? "font-arabic" : ""}>
              <p className="text-brand-amber text-xs font-bold uppercase tracking-widest mb-3">
                {part.sku}
                {part.oemNumber && (
                  <span className="text-brand-muted ms-3">
                    OEM: {part.oemNumber}
                  </span>
                )}
              </p>
              <h1
                className={`text-brand-white leading-tight mb-4 ${
                  isArabic
                    ? "font-arabic font-bold text-3xl lg:text-4xl"
                    : "font-display font-extrabold uppercase tracking-tight text-3xl lg:text-5xl"
                }`}
              >
                {name}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {part.brand && (
                  <Link
                    href={`/brands/${part.brand.slug}`}
                    className="text-xs font-semibold text-brand-amber border border-brand-amber/30 rounded-full px-4 py-1.5 hover:bg-brand-amber hover:text-white transition-colors"
                  >
                    {brandName}
                  </Link>
                )}
                {part.category && (
                  <Link
                    href={`/products/${part.category.slug}`}
                    className="text-xs font-semibold text-brand-white/60 border border-white/15 rounded-full px-4 py-1.5 hover:border-brand-amber/40 hover:text-brand-amber transition-colors"
                  >
                    {categoryName}
                  </Link>
                )}
              </div>

              {description && (
                <p className="text-brand-muted leading-relaxed mb-8 max-w-xl">
                  {description}
                </p>
              )}

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/quote"
                  className={`inline-flex items-center gap-2 bg-brand-amber text-white text-sm font-bold px-7 py-3.5 rounded-xl hover:bg-brand-gold transition-colors ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}
                >
                  {isArabic ? "طلب عرض سعر" : "Request a Quote"}
                </Link>
                <a
                  href={`https://wa.me/966552282868?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-brand-white/80 text-sm font-bold px-7 py-3.5 rounded-xl border border-white/15 hover:border-brand-amber/50 hover:text-brand-amber transition-colors ${isArabic ? "font-arabic" : "uppercase tracking-widest"}`}
                >
                  {isArabic ? "واتساب" : "WhatsApp"}
                </a>
              </div>
            </div>
          </div>

          {/* Compatibility */}
          {part.compatibility.length > 0 && (
            <section className="mt-16">
              <h2
                className={`text-brand-white mb-6 ${
                  isArabic
                    ? "font-arabic font-bold text-2xl"
                    : "font-display font-extrabold uppercase tracking-tight text-2xl"
                }`}
              >
                {isArabic ? "التوافق مع المعدات" : "Compatible Equipment"}
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-white/[0.08]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-plate text-brand-muted text-xs uppercase tracking-widest">
                      <th className="text-start px-5 py-3 font-semibold">
                        {isArabic ? "الشركة المصنعة" : "Make"}
                      </th>
                      <th className="text-start px-5 py-3 font-semibold">
                        {isArabic ? "الموديل" : "Model"}
                      </th>
                      <th className="text-start px-5 py-3 font-semibold">
                        {isArabic ? "السنة" : "Year"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {part.compatibility.map(({ equipmentModel }) => (
                      <tr key={equipmentModel.id} className="border-t border-white/[0.06] text-brand-white/80">
                        <td className="px-5 py-3">{equipmentModel.make}</td>
                        <td className="px-5 py-3">{equipmentModel.model}</td>
                        <td className="px-5 py-3">{equipmentModel.year || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Related parts */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2
                className={`text-brand-white mb-6 ${
                  isArabic
                    ? "font-arabic font-bold text-2xl"
                    : "font-display font-extrabold uppercase tracking-tight text-2xl"
                }`}
              >
                {isArabic ? "قطع غيار ذات صلة" : "Related Parts"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    href={`/parts/${encodeURIComponent(r.sku)}`}
                    className="group rounded-2xl overflow-hidden border border-white/[0.06] bg-brand-plate hover:border-brand-amber/25 transition-colors"
                  >
                    <div className="relative h-36 overflow-hidden">
                      <Image
                        src={getProductImage(r.images?.[0]?.url, r.category?.slug, r.sku)}
                        alt={isArabic ? r.nameAr : r.nameEn}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-brand-amber/60 text-[9px] font-bold uppercase tracking-widest mb-1">
                        {r.sku}
                      </p>
                      <p className={`text-brand-white text-sm font-semibold line-clamp-2 ${isArabic ? "font-arabic" : ""}`}>
                        {isArabic ? r.nameAr : r.nameEn}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
