"use server"

import { prisma } from "@/lib/db"
import { z } from "zod"

const PublicQuoteSchema = z.object({
  fullName: z.string().min(1).max(100),
  companyName: z.string().min(1).max(200),
  email: z.string().email().max(254),
  phone: z.string().min(1).max(30),
  partName: z.string().min(1).max(200),
  partNumber: z.string().max(100).optional().default(""),
  brand: z.string().max(150).optional().default(""),
  quantity: z.number().int().positive().default(1),
  urgency: z.enum(["normal", "urgent", "critical"]).default("normal"),
  notes: z.string().max(2000).optional().default(""),
})

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
  throw new Error("Failed to generate quote number")
}

export async function submitPublicQuote(data: z.infer<typeof PublicQuoteSchema>) {
  const validated = PublicQuoteSchema.parse(data)

  const company = await prisma.company.upsert({
    where: { id: `public-${validated.companyName.toLowerCase().replace(/\s+/g, "-").slice(0, 50)}` },
    update: {},
    create: {
      id: `public-${validated.companyName.toLowerCase().replace(/\s+/g, "-").slice(0, 50)}`,
      name: validated.companyName,
      email: validated.email,
      phone: validated.phone,
      contacts: {
        create: [{
          name: validated.fullName,
          email: validated.email,
          phone: validated.phone,
          isPrimary: true,
        }],
      },
    },
  })

  const number = await generateQuoteNumber()
  const description = [
    validated.partName,
    validated.partNumber ? `Part#: ${validated.partNumber}` : "",
    validated.brand ? `Brand: ${validated.brand}` : "",
    validated.urgency !== "normal" ? `Urgency: ${validated.urgency}` : "",
    validated.notes || "",
  ].filter(Boolean).join(" | ")

  await prisma.quote.create({
    data: {
      number,
      companyId: company.id,
      status: "SUBMITTED",
      customerNote: validated.notes || null,
      vatRate: 15,
      subtotal: 0,
      vatAmount: 0,
      total: 0,
      items: {
        create: [{
          description,
          quantity: validated.quantity,
          unitPrice: 0,
          lineTotal: 0,
        }],
      },
    },
  })
}
