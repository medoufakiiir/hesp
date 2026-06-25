export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canViewAnalytics } from "@/lib/rbac"
import AnalyticsClient from "./AnalyticsClient"

export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canViewAnalytics(role)) redirect("/admin/dashboard")

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // B2B analytics powered by Quote/RFQ + catalog relationships.
  // We keep the existing UI shape (Stats/RecentInquiry/Top categories/brands) by mapping quote/invoice fields.

  const [
    // Quote / RFQ pipeline counts
    totalInquiries,
    newInquiries,
    contactedInquiries,
    quotedInquiries,
    closedInquiries,
    inquiriesLast30d,
    inquiriesLast7d,

    // Catalog overview
    totalProducts,
    totalCategories,
    totalBrands,
    totalBlogPosts,
    // “Featured” and “In stock” are approximated from stock quantities / part activity.
    inStockProducts,
    featuredProducts,

    // Top requested categories/brands (from quote items -> parts -> category/brand)
    topCategories,
    topBrands,

    // Recent RFQs for the table
    recentInquiries,
  ] = await Promise.all([
    prisma.quote.count(),
    prisma.quote.count({ where: { status: "SUBMITTED" } }),
    prisma.quote.count({ where: { status: "REVIEWING" } }),
    prisma.quote.count({ where: { status: "QUOTED" } }),
    prisma.quote.count({ where: { status: { in: ["CONFIRMED", "COMPLETED"] } } }),

    prisma.quote.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.quote.count({ where: { createdAt: { gte: sevenDaysAgo } } }),

    prisma.part.count({ where: { isActive: true } }),
    prisma.category.count(),
    prisma.brand.count(),
    // Blog posts model no longer exists in the current Prisma schema (B2B RFQ rebuild).
    // Keep the UI slot populated with 0.
    0,
    prisma.part.count({ where: { isActive: true, stockQty: { gt: 0 } } }),
    // There is no explicit “featured” flag in the current Prisma schema; approximate with listPrice.
    prisma.part.count({ where: { isActive: true, listPrice: { not: null } } }),


    prisma.quoteItem.findMany({
      where: {
        partId: { not: null },
        quote: { createdAt: { gte: sevenDaysAgo } },
      },
      select: {
        partId: true,
        quoteId: true,
      },
      take: 1000,
    }).then(async (rows) => {
      // Convert QuoteItems grouping by partId into category counts via Part.
      // This avoids raw SQL while keeping performance reasonable.
      const partIds = rows.map((r) => r.partId).filter(Boolean) as string[]
      if (partIds.length === 0) return []
      const parts = await prisma.part.findMany({
        where: { id: { in: partIds } },
        select: { id: true, categoryId: true, brandId: true },
      })
      const categoryCountById = new Map<string, number>()
      for (const r of rows) {
        const part = parts.find((p) => p.id === r.partId)
        if (!part) continue
        // Each QuoteItem contributes 1 request; use quantity as weight when available.
        const qty = (r as any).quantity ? Number((r as any).quantity) : 1
        categoryCountById.set(part.categoryId, (categoryCountById.get(part.categoryId) ?? 0) + qty)
      }
      const entries = [...categoryCountById.entries()]
      entries.sort((a, b) => b[1] - a[1])
      const top = entries.slice(0, 5)
      const categories = await Promise.all(top.map(async ([categoryId, count]) => {
        const c = await prisma.category.findUnique({ where: { id: categoryId }, select: { nameEn: true } })
        return { name: c?.nameEn ?? "Uncategorized", count }
      }))
      return categories
    }),

    prisma.quoteItem.findMany({
      where: {
        partId: { not: null },
        quote: { createdAt: { gte: sevenDaysAgo } },
      },
      select: {
        partId: true,
      },
      take: 1000,
    }).then(async (rows) => {
      const partIds = rows.map((r) => r.partId).filter(Boolean) as string[]
      if (partIds.length === 0) return []
      const parts = await prisma.part.findMany({
        where: { id: { in: partIds } },
        select: { id: true, brandId: true },
      })
      const brandCountById = new Map<string, number>()
      for (const r of rows) {
        const part = parts.find((p) => p.id === r.partId)
        if (!part) continue
        const brandId = part.brandId ?? "__unbranded__"
        // Each QuoteItem contributes 1 request.
        brandCountById.set(brandId, (brandCountById.get(brandId) ?? 0) + 1)
      }
      const entries = [...brandCountById.entries()]
      entries.sort((a, b) => b[1] - a[1])
      const top = entries.slice(0, 5)
      const brands = await Promise.all(top.map(async ([brandId, count]) => {
        if (brandId === "__unbranded__") return { name: "Unbranded", count }
        const b = await prisma.brand.findUnique({ where: { id: brandId }, select: { nameEn: true } })
        return { name: b?.nameEn ?? "Unbranded", count }
      }))
      return brands
    }),

    prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      select: {
        id: true,
        createdAt: true,
        company: { select: { name: true } },
        status: true,
        items: {
          select: {
            quantity: true,
            part: {
              select: {
                nameEn: true,
                category: { select: { nameEn: true } },
                brand: { select: { nameEn: true } },
              },
            },
            description: true,
          },
        },
      },
    }).then((quotes) => {
      // Flatten to match AnalyticsClient’s RecentInquiry shape.
      return quotes.map((q) => {
        const firstItem = q.items[0]
        const partName = firstItem?.part?.nameEn ?? firstItem?.description ?? "—"
        const categoryName = firstItem?.part?.category?.nameEn ?? "—"
        const brandName = firstItem?.part?.brand?.nameEn ?? "—"
        return {
          id: q.id,
          name: q.id,
          company: q.company?.name ?? "—",
          phone: "",
          email: "",
          part: partName,
          status: q.status.toLowerCase(),
          source: "quote",
          category: categoryName,
          brand: brandName,
          date: q.createdAt.toISOString(),
        }
      })
    }),
  ])

  // Normalize recentInquiries status strings to the keys used by AnalyticsClient.
  const normalizedRecentInquiries = (recentInquiries as any[]).map((inq) => {
    const s = String(inq.status).toLowerCase()
    // Map QuoteStatus -> UI buckets used by AnalyticsClient.
    const statusMap: Record<string, string> = {
      submitted: "new",
      reviewing: "contacted",
      quoted: "quoted",
      confirmed: "closed",
      completed: "closed",
      invoiced: "closed",
    }
    return { ...inq, status: statusMap[s] ?? s }
  })

  return (
    <AnalyticsClient
      stats={{
        totalInquiries,
        newInquiries,
        contactedInquiries,
        quotedInquiries,
        closedInquiries,
        inquiriesLast30d,
        inquiriesLast7d,
        totalProducts,
        featuredProducts,
        inStockProducts,
        totalCategories,
        totalBrands,
        totalBlogPosts,
      }}
      recentInquiries={normalizedRecentInquiries}
      topCategories={topCategories as any}
      topBrands={topBrands as any}
    />
  )

}

