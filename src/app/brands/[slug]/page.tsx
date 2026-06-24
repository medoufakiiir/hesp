export const dynamic = "force-dynamic"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import { breadcrumbJsonLd } from "@/lib/seo"
import BrandPageClient from "./BrandPageClient"


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const brand = await prisma.brand.findUnique({ where: { slug } })
  if (!brand) return {}

  return {
    title: brand.metaTitleEN,
    description: brand.metaDescEN,
    alternates: { canonical: `https://riyada-ventures.com/brands/${slug}` },
    openGraph: { title: brand.metaTitleEN, description: brand.metaDescEN },
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [brand, brandProducts] = await Promise.all([
    prisma.brand.findUnique({ where: { slug } }),
    prisma.product.findMany({ where: { brand: slug } }),
  ])

  if (!brand) notFound()

  const relatedCategories = await prisma.category.findMany({
    where: { slug: { in: brand.categories } },
  })

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
