"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageQuotes } from "@/lib/rbac"

async function requireQuoteAccess() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageQuotes((session.user as Record<string, unknown>).role as string)) throw new Error("Forbidden")
  return session
}

async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const prefix = `INV-${year}-`

  for (let attempt = 0; attempt < 10; attempt++) {
    const last = await prisma.invoice.findFirst({
      where: { number: { startsWith: prefix } },
      orderBy: { number: "desc" },
      select: { number: true },
    })
    const seq = last ? parseInt(last.number.slice(prefix.length), 10) + 1 : 1
    const number = `${prefix}${String(seq).padStart(4, "0")}`
    const exists = await prisma.invoice.findUnique({ where: { number }, select: { id: true } })
    if (!exists) return number
  }
  throw new Error("Failed to generate unique invoice number")
}

export async function generateInvoice(quoteId: string) {
  await requireQuoteAccess()

  const quote = await prisma.quote.findUnique({
    where: { id: quoteId },
    select: { status: true, total: true, invoice: { select: { id: true } } },
  })
  if (!quote) throw new Error("Quote not found")
  if (quote.invoice) throw new Error("Invoice already exists for this quote")
  if (quote.status !== "CONFIRMED") throw new Error("Quote must be CONFIRMED to generate an invoice")

  const number = await generateInvoiceNumber()
  const dueAt = new Date()
  dueAt.setDate(dueAt.getDate() + 30)

  await prisma.$transaction(async (tx) => {
    await tx.invoice.create({
      data: {
        number,
        quoteId,
        status: "UNPAID",
        dueAt,
      },
    })
    await tx.quote.update({
      where: { id: quoteId },
      data: { status: "INVOICED" },
    })
  })

  revalidatePath(`/admin/quotes/${quoteId}`)
  revalidatePath("/admin/quotes")
  revalidatePath("/admin/invoices")
}

const MarkPaidSchema = z.object({
  amountPaid: z.number().positive(),
})

export async function markInvoicePaid(invoiceId: string, data: z.infer<typeof MarkPaidSchema>) {
  await requireQuoteAccess()
  const validated = MarkPaidSchema.parse(data)

  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { quote: { select: { total: true, id: true } } },
  })
  if (!invoice) throw new Error("Invoice not found")
  if (invoice.status === "PAID" || invoice.status === "VOID") {
    throw new Error(`Invoice is ${invoice.status}`)
  }

  const newPaid = Number(invoice.amountPaid) + validated.amountPaid
  const quoteTotal = Number(invoice.quote.total)
  const fullyPaid = newPaid >= quoteTotal

  await prisma.$transaction(async (tx) => {
    await tx.invoice.update({
      where: { id: invoiceId },
      data: {
        amountPaid: newPaid,
        status: fullyPaid ? "PAID" : "PARTIALLY_PAID",
        paidAt: fullyPaid ? new Date() : null,
      },
    })
    if (fullyPaid) {
      await tx.quote.update({
        where: { id: invoice.quoteId },
        data: { status: "COMPLETED" },
      })
    }
  })

  revalidatePath("/admin/invoices")
  revalidatePath(`/admin/quotes/${invoice.quoteId}`)
}

export async function voidInvoice(invoiceId: string) {
  await requireQuoteAccess()
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    select: { status: true, quoteId: true },
  })
  if (!invoice) throw new Error("Invoice not found")
  if (invoice.status === "PAID") throw new Error("Cannot void a paid invoice")

  await prisma.$transaction(async (tx) => {
    await tx.invoice.update({ where: { id: invoiceId }, data: { status: "VOID" } })
    await tx.quote.update({
      where: { id: invoice.quoteId },
      data: { status: "CONFIRMED" },
    })
  })

  revalidatePath("/admin/invoices")
  revalidatePath(`/admin/quotes/${invoice.quoteId}`)
}
