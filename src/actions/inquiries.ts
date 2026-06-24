"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canDelete } from "@/lib/rbac"
import { sendQuoteNotification, sendContactNotification, sendAutoReply } from "@/lib/email"
import { rateLimit } from "@/lib/rate-limit"
import { headers } from "next/headers"

const InquirySchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().max(200).optional().default(""),
  phone: z.string().min(1).max(20),
  email: z.string().max(254).optional().default(""),
  part: z.string().max(2000).optional().default(""),
  category: z.string().max(100).optional().default(""),
  brand: z.string().max(100).optional().default(""),
  partNumber: z.string().max(100).optional().default(""),
  quantity: z.string().max(20).optional().default("1"),
  details: z.string().max(2000).optional().default(""),
  source: z.enum(["quote", "contact"]),
})

export type InquiryInput = z.input<typeof InquirySchema>

// PUBLIC — no auth required, rate limited
export async function createInquiry(data: InquiryInput) {
  const headersList = await headers()
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "unknown"
  const { success } = rateLimit(`inquiry:${ip}`, 10, 60 * 60 * 1000) // 10 per hour per IP
  if (!success) throw new Error("Too many requests. Please try again later.")

  const validated = InquirySchema.parse(data)
  // Strip HTML tags from all string inputs
  const sanitized = Object.fromEntries(
    Object.entries(validated).map(([k, v]) =>
      [k, typeof v === "string" ? v.replace(/<[^>]*>/g, "") : v]
    )
  ) as typeof validated
  await prisma.inquiry.create({ data: sanitized })

  // Send email notifications (non-blocking — don't fail the request)
  if (sanitized.source === "quote") {
    sendQuoteNotification({
      name: sanitized.name, company: sanitized.company, email: sanitized.email,
      phone: sanitized.phone, partNumber: sanitized.partNumber, brand: sanitized.brand,
      quantity: sanitized.quantity, details: sanitized.details,
    })
    if (sanitized.email) {
      sendAutoReply({ to: sanitized.email, name: sanitized.name, refType: "quote" })
    }
  } else {
    sendContactNotification({
      name: sanitized.name, email: sanitized.email, phone: sanitized.phone,
      company: sanitized.company, message: sanitized.details,
    })
    if (sanitized.email) {
      sendAutoReply({ to: sanitized.email, name: sanitized.name, refType: "contact" })
    }
  }
}

// ADMIN — any authenticated user can update status
export async function updateInquiryStatus(id: string, status: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const validStatuses = ["new", "contacted", "quoted", "closed"]
  if (!validStatuses.includes(status)) throw new Error("Invalid status")
  await prisma.inquiry.update({ where: { id }, data: { status } })
  revalidatePath("/admin/inquiries")
  revalidatePath("/admin/dashboard")
}

// ADMIN — super_admin only can delete
export async function deleteInquiry(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as any).role
  if (!canDelete(role)) throw new Error("Forbidden")
  await prisma.inquiry.delete({ where: { id } })
  revalidatePath("/admin/inquiries")
  revalidatePath("/admin/dashboard")
}
