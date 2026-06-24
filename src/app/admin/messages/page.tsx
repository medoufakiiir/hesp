import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canViewInquiries } from "@/lib/rbac"
import { prisma } from "@/lib/db"
import AdminMessagesClient from "./AdminMessagesClient"

export default async function AdminMessagesPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  const role = (session.user as any).role
  if (!canViewInquiries(role)) redirect("/admin/dashboard")

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  })

  const serialized = messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
    readAt: m.readAt?.toISOString() || null,
  }))

  return <AdminMessagesClient messages={serialized} />
}
