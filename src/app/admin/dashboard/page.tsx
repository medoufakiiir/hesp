import { prisma } from "@/lib/db"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  const [productCount, categoryCount, brandCount, blogCount, inquiryCount, newInquiryCount, recentInquiries] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.blogPost.count(),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "new" } }),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ])

  return (
    <DashboardClient
      stats={{ productCount, categoryCount, brandCount, blogCount, inquiryCount, newInquiryCount }}
      recentInquiries={recentInquiries.map((i) => ({
        id: i.id,
        name: i.name,
        company: i.company,
        part: i.part || i.details.slice(0, 60),
        status: i.status,
        date: i.createdAt.toISOString(),
      }))}
    />
  )
}
