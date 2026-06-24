export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import UsersClient from "./UsersClient"

export default async function UsersPage() {
  const session = await auth()
  if (!session?.user || (session.user as any).role !== "super_admin") {
    redirect("/admin/dashboard")
  }

  const users = await prisma.user.findMany({
    select: {
      id: true, name: true, email: true, role: true,
      isActive: true, lastLoginAt: true, createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <UsersClient
      users={users.map(u => ({
        ...u,
        lastLoginAt: u.lastLoginAt?.toISOString() || null,
        createdAt: u.createdAt.toISOString(),
      }))}
      currentUserId={(session.user as any).id}
    />
  )
}
