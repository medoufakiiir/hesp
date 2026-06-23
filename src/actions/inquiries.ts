"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const InquirySchema = z.object({
  name: z.string().min(1),
  company: z.string().optional().default(""),
  phone: z.string().min(1),
  email: z.string().optional().default(""),
  part: z.string().optional().default(""),
  category: z.string().optional().default(""),
  brand: z.string().optional().default(""),
  partNumber: z.string().optional().default(""),
  quantity: z.string().optional().default("1"),
  details: z.string().optional().default(""),
  source: z.enum(["quote", "contact"]),
})

export type InquiryInput = z.input<typeof InquirySchema>

export async function createInquiry(data: InquiryInput) {
  const validated = InquirySchema.parse(data)
  await prisma.inquiry.create({ data: validated })
}

export async function updateInquiryStatus(id: string, status: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  await prisma.inquiry.update({ where: { id }, data: { status } })
  revalidatePath("/admin/inquiries")
  revalidatePath("/admin/dashboard")
}

export async function deleteInquiry(id: string) {
  const session = await auth()
  if (!session) throw new Error("Unauthorized")

  await prisma.inquiry.delete({ where: { id } })
  revalidatePath("/admin/inquiries")
  revalidatePath("/admin/dashboard")
}
