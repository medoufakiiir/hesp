import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"

const VISITOR_COOKIE = "vid"
const ONE_YEAR = 60 * 60 * 24 * 365

// Records an anonymous page view for the public website.
// A long-lived `vid` cookie identifies unique visitors without any PII.
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      path?: string
      referrer?: string
    }

    const path = typeof body.path === "string" ? body.path.slice(0, 512) : "/"
    // Never count the admin panel as website traffic.
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true, skipped: true })
    }

    const referrer =
      typeof body.referrer === "string" && body.referrer
        ? body.referrer.slice(0, 512)
        : null

    let visitorId = req.cookies.get(VISITOR_COOKIE)?.value
    const isNewVisitor = !visitorId
    if (!visitorId) visitorId = randomUUID()

    await prisma.pageView.create({
      data: { path, visitorId, referrer },
    })

    const res = NextResponse.json({ ok: true })
    if (isNewVisitor) {
      res.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: ONE_YEAR,
        path: "/",
      })
    }
    return res
  } catch {
    // Tracking must never break the page.
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
