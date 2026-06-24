export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canViewAnalytics } from "@/lib/rbac"
import AnalyticsClient from "./AnalyticsClient"

export default async function AnalyticsPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  const role = (session.user as any).role
  if (!canViewAnalytics(role)) redirect("/admin/dashboard")

  const now = new Date()
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [
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
    recentInquiries,
    topCategories,
    topBrands,
  ] = await Promise.all([
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "new" } }),
    prisma.inquiry.count({ where: { status: "contacted" } }),
    prisma.inquiry.count({ where: { status: "quoted" } }),
    prisma.inquiry.count({ where: { status: "closed" } }),
    prisma.inquiry.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.inquiry.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.product.count(),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.count({ where: { inStock: true } }),
    prisma.category.count(),
    prisma.brand.count(),
    prisma.blogPost.count(),
    prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, name: true, company: true, phone: true, email: true, part: true, status: true, source: true, createdAt: true, category: true, brand: true },
    }),
    prisma.inquiry.groupBy({ by: ["category"], _count: true, orderBy: { _count: { category: "desc" } }, take: 5, where: { category: { not: "" } } }),
    prisma.inquiry.groupBy({ by: ["brand"], _count: true, orderBy: { _count: { brand: "desc" } }, take: 5, where: { brand: { not: "" } } }),
  ])

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
      recentInquiries={recentInquiries.map((i) => ({
        id: i.id,
        name: i.name,
        company: i.company,
        phone: i.phone,
        email: i.email,
        part: i.part,
        status: i.status,
        source: i.source,
        category: i.category,
        brand: i.brand,
        date: i.createdAt.toISOString(),
      }))}
      topCategories={topCategories.map((c) => ({ name: c.category, count: c._count }))}
      topBrands={topBrands.map((b) => ({ name: b.brand, count: b._count }))}
    />
  )
}
