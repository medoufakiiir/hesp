import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canViewInquiries } from "@/lib/rbac"
import { resolvePermissions } from "@/lib/permissions"
import { prisma } from "@/lib/db"
import AdminMessagesClient from "./AdminMessagesClient"

export default async function AdminMessagesPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  const role = (session.user as Record<string, unknown>).role as string
  if (!canViewInquiries(role)) redirect("/admin/dashboard")

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  })

  const serialized = messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
    readAt: m.readAt?.toISOString() || null,
  }))

  const permissions = await resolvePermissions("messages")

  return <AdminMessagesClient messages={serialized} permissions={permissions} />
}
