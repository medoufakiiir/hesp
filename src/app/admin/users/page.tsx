export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { resolvePermissions } from "@/lib/permissions"
import { FORBIDDEN_ROUTE } from "@/lib/rbac"
import UsersClient from "./UsersClient"

export default async function UsersPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if ((session.user as Record<string, unknown>).role as string !== "SUPER_ADMIN") {
    redirect(FORBIDDEN_ROUTE)
  }

  const users = await prisma.user.findMany({
    select: {
      id: true, name: true, email: true, role: true,
      isActive: true, createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <UsersClient
      users={users.map(u => ({
        ...u,
        createdAt: u.createdAt.toISOString(),
      }))}
      currentUserId={(session.user as Record<string, unknown>).id as string}
      canExport={(await resolvePermissions("users")).canExport}
    />
  )
}
