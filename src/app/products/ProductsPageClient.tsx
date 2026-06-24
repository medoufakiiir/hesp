"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ArrowUpRight, Package, Filter, X } from "lucide-react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Breadcrumb from "@/components/shared/Breadcrumb"
import { useLang } from "@/context/LangContext"
import type { ProductData, CategoryData, BrandData } from "@/types/db"

interface Props {
  productsData: ProductData[]
  categoriesData: CategoryData[]
  brandsData: BrandData[]
}

export default function ProductsPageClient({ productsData, categoriesData, brandsData }: Props) {
  const { isArabic } = useLang()
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const products = productsData
  const categories = categoriesData
  const brands = brandsData

  const filtered = products.filter((p) => {
    const matchesSearch = search === "" ||
      p.nameEN.toLowerCase().includes(search.toLowerCase()) ||
      p.nameAR.includes(search) ||
      p.partNumber.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = !selectedCategory || p.category === selectedCategory
    const matchesBrand = !selectedBrand || p.brand === selectedBrand
    return matchesSearch && matchesCategory && matchesBrand
  })

  return (
    <main className="min-h-screen bg-brand-iron">
      <Navbar />

      {/* Cinematic Page Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-amber/[0.04] blur-[150px]" />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: "linear-gradient(rgba(217,119,6,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(217,119,6,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ labelEN: "Products", labelAR: "المنتجات" }]} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`mt-8 ${isArabic ? "text-right" : ""}`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            <p className="text-brand-amber text-xs font-semibold uppercase tracking-[0.25em] mb-3">
              {isArabic ? "منتجاتنا" : "Our Products"}
            </p>
            <h1 className={`text-brand-white leading-[0.95] mb-4 ${
              isArabic
                ? "font-arabic font-bold text-[clamp(2.5rem,7vw,5rem)]"
                : "font-display font-extrabold uppercase tracking-tight text-[clamp(3rem,8vw,6rem)]"
            }`}>
              {isArabic ? "كتالوج قطع الغيار" : "Spare Parts\nCatalog"}
            </h1>
            <p className={`text-brand-muted text-lg max-w-xl ${isArabic ? "font-arabic" : ""}`}>
              {isArabic
                ? "ابحث في مخزوننا من أكثر من 10,000 قطعة لجميع العلامات التجارية الكبرى."
                : "Search our inventory of 10,000+ parts for all major heavy equipment brands."}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search & Filters - Glass Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent backdrop-blur-sm border border-white/[0.06] space-y-5"
        >
          <div className="relative max-w-2xl">
            <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-brand-muted ${isArabic ? "right-4" : "left-4"}`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={isArabic ? "ابحث بالاسم أو رقم القطعة..." : "Search by name or part number..."}
              className={`input-field ${isArabic ? "font-arabic text-right pr-12" : "pl-12"}`}
              dir={isArabic ? "rtl" : "ltr"}
            />
          </div>

          <div className={`flex flex-wrap gap-2.5 ${isArabic ? "flex-row-reverse" : ""}`}>
            <div className="flex items-center gap-2 text-brand-muted text-xs mr-1">
              <Filter size={13} />
              <span className="uppercase tracking-widest">{isArabic ? "تصفية" : "Filter"}</span>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                !selectedCategory
                  ? "bg-brand-amber text-white"
                  : "bg-white/[0.04] border border-white/[0.08] text-brand-white/50 hover:border-brand-amber/30 hover:text-brand-amber"
              }`}
            >
              {isArabic ? "الكل" : "All"}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug === selectedCategory ? null : cat.slug)}
                className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedCategory === cat.slug
                    ? "bg-brand-amber text-white"
                    : "bg-white/[0.04] border border-white/[0.08] text-brand-white/50 hover:border-brand-amber/30 hover:text-brand-amber"
                } ${isArabic ? "font-arabic" : ""}`}
              >
                {isArabic ? cat.nameAR : cat.nameEN}
              </button>
            ))}
          </div>

          <div className={`flex flex-wrap gap-2 ${isArabic ? "flex-row-reverse" : ""}`}>
            {brands.slice(0, 6).map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.slug === selectedBrand ? null : brand.slug)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer ${
                  selectedBrand === brand.slug
                    ? "bg-brand-amber/15 text-brand-amber border border-brand-amber/30"
                    : "border border-white/[0.06] text-brand-white/40 hover:text-brand-amber hover:border-brand-amber/20"
                }`}
              >
                {brand.name}
              </button>
            ))}
            {(selectedCategory || selectedBrand || search) && (
              <button
                onClick={() => { setSelectedCategory(null); setSelectedBrand(null); setSearch("") }}
                className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-red-400 border border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer flex items-center gap-1"
              >
                <X size={10} /> {isArabic ? "مسح" : "Clear"}
              </button>
            )}
          </div>
        </motion.div>

        {/* Categories Grid - 3D Cards */}
        <div className="mb-16">
          <h2 className={`text-brand-white font-display font-extrabold uppercase tracking-tight text-2xl mb-8 ${isArabic ? "font-arabic text-right" : ""}`}>
            {isArabic ? "تصفح حسب الفئة" : "Browse by Category"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" style={{ perspective: "800px" }}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30, rotateX: 6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <Link href={`/products/${cat.slug}`}>
                  <div className="group relative rounded-2xl overflow-hidden h-40
                    border border-white/[0.06] hover:border-brand-amber/30
                    transition-[border] duration-300 shadow-xl shadow-black/30">
                    <Image src={cat.image} alt={isArabic ? cat.nameAR : cat.nameEN} fill
                      sizes="(max-width: 768px) 50vw, 16vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className={`text-brand-white font-semibold text-xs ${isArabic ? "font-arabic text-right" : ""}`}>
                        {isArabic ? cat.nameAR : cat.nameEN}
                      </h3>
                      <p className="text-brand-amber/50 text-[10px] font-bold mt-0.5">
                        {cat.productCount}+ {isArabic ? "قطعة" : "parts"}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Products Grid - 3D Glass Cards */}
        <div>
          <div className={`flex items-center justify-between mb-8 ${isArabic ? "flex-row-reverse" : ""}`}>
            <h2 className={`text-brand-white font-display font-extrabold uppercase tracking-tight text-2xl ${isArabic ? "font-arabic" : ""}`}>
              {isArabic ? "جميع المنتجات" : "All Products"}
            </h2>
            <span className="text-brand-muted text-xs font-semibold uppercase tracking-widest">
              {filtered.length} {isArabic ? "منتج" : "products"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" style={{ perspective: "1000px" }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  whileHover={{ y: -8, rotateX: -2, scale: 1.02 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link href={`/products/${product.category}`}>
                    <div className="group rounded-2xl overflow-hidden cursor-pointer
                      bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent
                      backdrop-blur-sm border border-white/[0.06]
                      hover:border-brand-amber/25 hover:shadow-2xl hover:shadow-brand-amber/10
                      transition-[border,box-shadow] duration-500">
                      {/* Top glass line */}
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

                      <div className="relative h-44 overflow-hidden">
                        <Image src={product.image} alt={isArabic ? product.nameAR : product.nameEN}
                          fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-plate via-brand-plate/30 to-transparent" />
                        {product.inStock && (
                          <div className="absolute top-3 right-3 bg-emerald-500/15 text-emerald-400 text-[8px] font-bold
                            uppercase tracking-widest px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/20 backdrop-blur-sm">
                            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                            {isArabic ? "متوفر" : "In Stock"}
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Package size={11} className="text-brand-amber" />
                          <span className="text-brand-amber/50 text-[9px] font-bold uppercase tracking-widest">{product.partNumber}</span>
                        </div>
                        <h3 className={`text-brand-white font-semibold text-sm mb-1 ${isArabic ? "font-arabic text-right" : ""}`}>
                          {isArabic ? product.nameAR : product.nameEN}
                        </h3>
                        <p className={`text-brand-muted text-xs line-clamp-2 mb-3 ${isArabic ? "font-arabic text-right" : ""}`}>
                          {isArabic ? product.descriptionAR.slice(0, 80) : product.descriptionEN.slice(0, 80)}
                        </p>
                        <div className="flex items-center justify-end">
                          <div className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.08]
                            group-hover:bg-brand-amber group-hover:border-brand-amber
                            flex items-center justify-center transition-all duration-300">
                            <ArrowUpRight size={14} className="text-brand-white/40 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 rounded-2xl border border-white/[0.04] bg-white/[0.02]"
            >
              <p className={`text-brand-muted text-lg ${isArabic ? "font-arabic" : ""}`}>
                {isArabic ? "لم يتم العثور على منتجات. حاول تغيير معايير البحث." : "No products found. Try adjusting your search criteria."}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
