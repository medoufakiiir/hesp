import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBrandBySlug, getAllBrandSlugs } from "@/data/brands"
import { getProductsByBrand } from "@/data/products"
import { getCategoryBySlug } from "@/data/categories"
import { breadcrumbJsonLd } from "@/lib/seo"
import BrandPageClient from "./BrandPageClient"

export async function generateStaticParams() {
  return getAllBrandSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) return {}

  return {
    title: brand.metaTitleEN,
    description: brand.metaDescEN,
    alternates: { canonical: `https://riyada-ventures.com/brands/${slug}` },
    openGraph: {
      title: brand.metaTitleEN,
      description: brand.metaDescEN,
    },
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getBrandBySlug(slug)
  if (!brand) notFound()

  const brandProducts = getProductsByBrand(slug)
  const relatedCategories = brand.categories
    .map((slug) => getCategoryBySlug(slug))
    .filter(Boolean) as NonNullable<ReturnType<typeof getCategoryBySlug>>[]

  return (
    <>
      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
          { name: brand.name, url: `/brands/${slug}` },
        ])) }}
      />
      <BrandPageClient brand={brand} products={brandProducts} relatedCategories={relatedCategories} />
    </>
  )
}
