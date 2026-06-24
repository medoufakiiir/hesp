import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { canViewInquiries } from "@/lib/rbac"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ count: 0 })
  const role = (session.user as any).role
  if (!canViewInquiries(role)) return NextResponse.json({ count: 0 })

  const count = await prisma.contactMessage.count({ where: { status: "NEW" } })
  return NextResponse.json({ count })
}
