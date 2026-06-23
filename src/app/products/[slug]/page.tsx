import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { categories, getCategoryBySlug, getAllCategorySlugs } from "@/data/categories"
import { getProductsByCategory } from "@/data/products"
import { breadcrumbJsonLd } from "@/lib/seo"
import CategoryPageClient from "./CategoryPageClient"

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}

  return {
    title: category.metaTitleEN,
    description: category.metaDescEN,
    keywords: [...category.keywordsEN, ...category.keywordsAR],
    alternates: { canonical: `https://riyada-ventures.com/products/${slug}` },
    openGraph: {
      title: category.metaTitleEN,
      description: category.metaDescEN,
      images: [{ url: category.image, width: 1200, height: 630, alt: category.nameEN }],
    },
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) notFound()

  const categoryProducts = getProductsByCategory(slug)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
              { name: category.nameEN, url: `/products/${slug}` },
            ])
          ),
        }}
      />
      <CategoryPageClient category={category} products={categoryProducts} otherCategories={categories.filter((c) => c.slug !== slug)} />
    </>
  )
}
