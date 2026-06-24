export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageQuotes } from "@/lib/rbac"
import QuotesClient from "./QuotesClient"

export default async function QuotesPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canManageQuotes((session.user as any).role)) redirect("/admin/dashboard")

  const [quotes, companies] = await Promise.all([
    prisma.quote.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        company: { select: { name: true } },
        assignedTo: { select: { name: true } },
        _count: { select: { items: true } },
      },
    }),
    prisma.company.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
  ])

  return (
    <QuotesClient
      quotes={quotes.map((q) => ({
        id: q.id, number: q.number, status: q.status,
        companyName: q.company.name, companyId: q.companyId,
        assignedTo: q.assignedTo?.name || null,
        subtotal: Number(q.subtotal), vatAmount: Number(q.vatAmount), total: Number(q.total),
        itemCount: q._count.items,
        createdAt: q.createdAt.toISOString(),
        validUntil: q.validUntil?.toISOString() || null,
      }))}
      companies={companies}
    />
  )
}
