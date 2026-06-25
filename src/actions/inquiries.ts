"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canViewInquiries, canDelete } from "@/lib/rbac"
import { sendContactNotification, sendAutoReply } from "@/lib/email"

const InquirySchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().max(200).optional().default(""),
  phone: z.string().max(20).optional().default(""),
  email: z.string().max(254).optional().default(""),
  details: z.string().max(5000).optional().default(""),
  part: z.string().max(500).optional().default(""),
  partNumber: z.string().max(200).optional().default(""),
  brand: z.string().max(200).optional().default(""),
  quantity: z.string().max(50).optional().default(""),
  source: z.enum(["quote", "contact"]),
})

export type InquiryInput = z.input<typeof InquirySchema>

export async function createInquiry(data: InquiryInput) {
  const parsed = InquirySchema.parse(data)

  const message = await prisma.contactMessage.create({
    data: {
      name: parsed.name,
      email: parsed.email || "",
      phone: parsed.phone || undefined,
      company: parsed.company || undefined,
      subject: parsed.source === "contact"
        ? parsed.details?.split("\n")[0]?.replace("Subject: ", "") || undefined
        : parsed.part || undefined,
      body: parsed.details || "",
      locale: "en",
      status: "NEW",
    },
  })

  await sendContactNotification({
    name: parsed.name,
    email: parsed.email || "",
    phone: parsed.phone,
    company: parsed.company,
    message: parsed.details || "",
  }).catch(() => {})

  if (parsed.email) {
    await sendAutoReply({
      to: parsed.email,
      name: parsed.name,
      refType: parsed.source,
    }).catch(() => {})
  }

  revalidatePath("/admin/messages")
  return { id: message.id }
}

export async function updateMessageStatus(id: string, status: "NEW" | "READ" | "REPLIED" | "ARCHIVED") {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canViewInquiries(role)) throw new Error("Forbidden")

  await prisma.contactMessage.update({
    where: { id },
    data: {
      status,
      readAt: status !== "NEW" ? new Date() : null,
    },
  })
  revalidatePath("/admin/messages")
}

export async function deleteMessage(id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canDelete(role)) throw new Error("Forbidden")

  await prisma.contactMessage.delete({ where: { id } })
  revalidatePath("/admin/messages")
}

export async function getMessages(statusFilter?: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canViewInquiries(role)) throw new Error("Forbidden")

  const where = statusFilter && statusFilter !== "ALL"
    ? { status: statusFilter as "NEW" | "READ" | "REPLIED" | "ARCHIVED" }
    : {}

  return prisma.contactMessage.findMany({
    where,
    orderBy: { createdAt: "desc" },
  })
}

export async function getUnreadCount() {
  const session = await auth()
  if (!session?.user) return 0
  const role = (session.user as Record<string, unknown>).role as string
  if (!canViewInquiries(role)) return 0

  return prisma.contactMessage.count({ where: { status: "NEW" } })
}
