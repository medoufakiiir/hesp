"use server"

import { auth } from "@/lib/auth"
import { z } from "zod"

const InquirySchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().max(200).optional().default(""),
  phone: z.string().min(1).max(20),
  email: z.string().max(254).optional().default(""),
  details: z.string().max(5000).optional().default(""),
  part: z.string().max(500).optional().default(""),
  partNumber: z.string().max(200).optional().default(""),
  brand: z.string().max(200).optional().default(""),
  quantity: z.string().max(50).optional().default(""),
  source: z.enum(["quote", "contact"]),
})

export type InquiryInput = z.input<typeof InquirySchema>

export async function createInquiry(_data: InquiryInput) {
  // no-op — inquiries are not part of the B2B RFQ workflow
}

export async function updateInquiryStatus(_id: string, _status: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}

export async function deleteInquiry(_id: string) {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
}
