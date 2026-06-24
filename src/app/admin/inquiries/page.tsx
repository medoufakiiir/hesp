export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import AdminInquiriesClient from "./AdminInquiriesClient"

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } })

  return (
    <AdminInquiriesClient
      inquiries={inquiries.map((i) => ({
        ...i,
        createdAt: i.createdAt.toISOString(),
        updatedAt: i.updatedAt.toISOString(),
      }))}
    />
  )
}
