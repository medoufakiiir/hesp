"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageQuotes } from "@/lib/rbac"

const QuoteItemSchema = z.object({
  partId: z.string().nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  quantity: z.number().int().positive().default(1),
  unitPrice: z.number().nonnegative().default(0),
})

const CreateQuoteSchema = z.object({
  companyId: z.string().min(1),
  customerNote: z.string().max(5000).nullable().optional(),
  internalNote: z.string().max(5000).nullable().optional(),
  validUntil: z.string().nullable().optional(),
  items: z.array(QuoteItemSchema).min(1),
})

const UpdateQuoteItemsSchema = z.object({
  items: z.array(QuoteItemSchema.extend({
    id: z.string().optional(),
  })),
})

async function requireQuoteAccess() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageQuotes((session.user as Record<string, unknown>).role as string)) throw new Error("Forbidden")
  return session
}

async function generateQuoteNumber(): Promise<string> {
  const year = new Date().getFullYear()
  const prefix = `RFQ-${year}-`

  for (let attempt = 0; attempt < 10; attempt++) {
    const last = await prisma.quote.findFirst({
      where: { number: { startsWith: prefix } },
      orderBy: { number: "desc" },
      select: { number: true },
    })
    const seq = last ? parseInt(last.number.slice(prefix.length), 10) + 1 : 1
    const number = `${prefix}${String(seq).padStart(4, "0")}`
    const exists = await prisma.quote.findUnique({ where: { number }, select: { id: true } })
    if (!exists) return number
  }
  throw new Error("Failed to generate unique quote number")
}

function computeTotals(items: { quantity: number; unitPrice: number }[], vatRate: number) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const vatAmount = subtotal * (vatRate / 100)
  const total = subtotal + vatAmount
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    total: Math.round(total * 100) / 100,
  }
}

export async function createQuote(data: z.infer<typeof CreateQuoteSchema>) {
  const session = await requireQuoteAccess()
  const validated = CreateQuoteSchema.parse(data)
  const number = await generateQuoteNumber()
  const vatRate = 15
  const totals = computeTotals(validated.items, vatRate)

  const quote = await prisma.$transaction(async (tx) => {
    const q = await tx.quote.create({
      data: {
        number,
        companyId: validated.companyId,
        customerNote: validated.customerNote,
        internalNote: validated.internalNote,
        validUntil: validated.validUntil ? new Date(validated.validUntil) : null,
        createdById: (session.user as Record<string, unknown>).id as string,
        assignedToId: (session.user as Record<string, unknown>).id as string,
        vatRate,
        subtotal: totals.subtotal,
        vatAmount: totals.vatAmount,
        total: totals.total,
        items: {
          create: validated.items.map((item) => ({
            partId: item.partId || null,
            description: item.description || null,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: Math.round(item.quantity * item.unitPrice * 100) / 100,
          })),
        },
      },
    })
    return q
  })

  revalidatePath("/admin/quotes")
  return quote.id
}

export async function updateQuoteItems(quoteId: string, data: z.infer<typeof UpdateQuoteItemsSchema>) {
  await requireQuoteAccess()
  const validated = UpdateQuoteItemsSchema.parse(data)
  const quote = await prisma.quote.findUnique({ where: { id: quoteId }, select: { vatRate: true } })
  if (!quote) throw new Error("Quote not found")

  const vatRate = Number(quote.vatRate)
  const totals = computeTotals(validated.items, vatRate)

  await prisma.$transaction(async (tx) => {
    await tx.quoteItem.deleteMany({ where: { quoteId } })
    await tx.quoteItem.createMany({
      data: validated.items.map((item) => ({
        quoteId,
        partId: item.partId || null,
        description: item.description || null,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        lineTotal: Math.round(item.quantity * item.unitPrice * 100) / 100,
      })),
    })
    await tx.quote.update({
      where: { id: quoteId },
      data: { subtotal: totals.subtotal, vatAmount: totals.vatAmount, total: totals.total },
    })
  })

  revalidatePath(`/admin/quotes/${quoteId}`)
  revalidatePath("/admin/quotes")
}

const VALID_TRANSITIONS: Record<string, string[]> = {
  SUBMITTED: ["REVIEWING", "REJECTED", "CANCELLED"],
  REVIEWING: ["QUOTED", "REJECTED", "CANCELLED"],
  QUOTED: ["CONFIRMED", "REJECTED", "CANCELLED", "EXPIRED"],
  CONFIRMED: ["INVOICED"],
  INVOICED: ["COMPLETED"],
  REJECTED: [],
  CANCELLED: [],
  EXPIRED: [],
  COMPLETED: [],
}

export async function updateQuoteStatus(quoteId: string, newStatus: string) {
  await requireQuoteAccess()
  const quote = await prisma.quote.findUnique({ where: { id: quoteId }, select: { status: true } })
  if (!quote) throw new Error("Quote not found")

  const allowed = VALID_TRANSITIONS[quote.status] || []
  if (!allowed.includes(newStatus)) {
    throw new Error(`Cannot transition from ${quote.status} to ${newStatus}`)
  }

  await prisma.quote.update({ where: { id: quoteId }, data: { status: newStatus as any } })
  revalidatePath(`/admin/quotes/${quoteId}`)
  revalidatePath("/admin/quotes")
}

export async function updateQuoteNotes(quoteId: string, customerNote: string | null, internalNote: string | null) {
  await requireQuoteAccess()
  await prisma.quote.update({
    where: { id: quoteId },
    data: { customerNote, internalNote },
  })
  revalidatePath(`/admin/quotes/${quoteId}`)
}

export async function assignQuote(quoteId: string, userId: string) {
  await requireQuoteAccess()
  await prisma.quote.update({ where: { id: quoteId }, data: { assignedToId: userId } })
  revalidatePath(`/admin/quotes/${quoteId}`)
  revalidatePath("/admin/quotes")
}
