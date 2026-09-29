import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * Tells the admin error screen *why* pages are failing, so it can show setup
 * steps instead of Next's generic production error:
 *   missing    — DATABASE_URL is not set in the Vercel project
 *   no-tables  — database reachable but the schema was never pushed
 *   unreachable — DATABASE_URL set but the connection fails
 *   ok         — database fine; the error is something else
 */
export async function GET() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ status: "unknown" }, { status: 401 })

  if (!process.env.DATABASE_URL) return NextResponse.json({ status: "missing" })
  try {
    await prisma.user.count()
    return NextResponse.json({ status: "ok" })
  } catch (err) {
    const code = (err as { code?: string }).code
    // P2021: table does not exist — `prisma db push` hasn't been run.
    return NextResponse.json({ status: code === "P2021" ? "no-tables" : "unreachable" })
  }
}
