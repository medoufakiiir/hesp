export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { canManageQuotes } from "@/lib/rbac"
import QuoteDetailClient from "./QuoteDetailClient"

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canManageQuotes((session.user as any).role)) redirect("/admin/dashboard")

  const { id } = await params
  const quote = await prisma.quote.findUnique({
    where: { id },
    include: {
      company: { include: { contacts: { where: { isPrimary: true }, take: 1 } } },
      items: { include: { part: { select: { sku: true, nameEn: true, listPrice: true } } } },
      createdBy: { select: { name: true } },
      assignedTo: { select: { name: true } },
      invoice: true,
    },
  })
  if (!quote) notFound()

  const parts = await prisma.part.findMany({
    where: { isActive: true },
    select: { id: true, sku: true, nameEn: true, listPrice: true },
    orderBy: { nameEn: "asc" },
  })

  return (
    <QuoteDetailClient
      quote={{
        id: quote.id, number: quote.number, status: quote.status,
        companyName: quote.company.name, companyId: quote.companyId,
        companyEmail: quote.company.email,
        primaryContact: quote.company.contacts[0]?.name || null,
        primaryContactEmail: quote.company.contacts[0]?.email || null,
        customerNote: quote.customerNote, internalNote: quote.internalNote,
        vatRate: Number(quote.vatRate), subtotal: Number(quote.subtotal),
        vatAmount: Number(quote.vatAmount), total: Number(quote.total),
        createdBy: quote.createdBy?.name || null,
        assignedTo: quote.assignedTo?.name || null,
        createdAt: quote.createdAt.toISOString(),
        validUntil: quote.validUntil?.toISOString() || null,
        invoiceId: quote.invoice?.id || null,
        invoiceNumber: quote.invoice?.number || null,
        invoiceStatus: quote.invoice?.status || null,
        items: quote.items.map((item) => ({
          id: item.id, partId: item.partId, partSku: item.part?.sku || null,
          partName: item.part?.nameEn || null, description: item.description,
          quantity: item.quantity, unitPrice: Number(item.unitPrice), lineTotal: Number(item.lineTotal),
        })),
      }}
      parts={parts.map((p) => ({
        id: p.id, sku: p.sku, nameEn: p.nameEn, listPrice: p.listPrice ? Number(p.listPrice) : null,
      }))}
    />
  )
}
