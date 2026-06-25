export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canManageQuotes } from "@/lib/rbac"
import InvoicesClient from "./InvoicesClient"

export default async function InvoicesPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canManageQuotes((session.user as Record<string, unknown>).role as string)) redirect("/admin/dashboard")

  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      quote: {
        select: {
          number: true, total: true,
          company: { select: { name: true } },
        },
      },
    },
  })

  return (
    <InvoicesClient
      invoices={invoices.map((inv) => ({
        id: inv.id, number: inv.number, status: inv.status,
        quoteNumber: inv.quote.number, quoteId: inv.quoteId,
        companyName: inv.quote.company.name,
        total: Number(inv.quote.total),
        amountPaid: Number(inv.amountPaid),
        issuedAt: inv.issuedAt.toISOString(),
        dueAt: inv.dueAt?.toISOString() || null,
        paidAt: inv.paidAt?.toISOString() || null,
      }))}
    />
  )
}
