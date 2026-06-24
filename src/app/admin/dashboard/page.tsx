export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import DashboardClient from "./DashboardClient"

export default async function DashboardPage() {
  const [
    partCount, categoryCount, brandCount, companyCount,
    openQuotes, unpaidInvoices, recentQuotes, lowStockParts,
  ] = await Promise.all([
    prisma.part.count({ where: { isActive: true } }),
    prisma.category.count(),
    prisma.brand.count(),
    prisma.company.count(),
    prisma.quote.count({ where: { status: { in: ["SUBMITTED", "REVIEWING", "QUOTED"] } } }),
    prisma.invoice.count({ where: { status: { in: ["UNPAID", "PARTIALLY_PAID"] } } }),
    prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { company: { select: { name: true } } },
    }),
    prisma.part.count({ where: { isActive: true, stockQty: { lte: 5 } } }),
  ])

  return (
    <DashboardClient
      stats={{ partCount, categoryCount, brandCount, companyCount, openQuotes, unpaidInvoices, lowStockParts }}
      recentQuotes={recentQuotes.map((q) => ({
        id: q.id,
        number: q.number,
        company: q.company.name,
        status: q.status,
        total: Number(q.total),
        date: q.createdAt.toISOString(),
      }))}
    />
  )
}
