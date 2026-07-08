import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { randomUUID } from "crypto"

const VISITOR_COOKIE = "vid"
const ONE_YEAR = 60 * 60 * 24 * 365

// Records a click on the floating WhatsApp button, tied to the same
// anonymous `vid` cookie used for page-view tracking.
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      path?: string
      locale?: string
      productName?: string | null
    }

    const path = typeof body.path === "string" ? body.path.slice(0, 512) : "/"
    const locale = body.locale === "ar" ? "ar" : "en"
    const productName =
      typeof body.productName === "string" && body.productName
        ? body.productName.slice(0, 256)
        : null

    let visitorId = req.cookies.get(VISITOR_COOKIE)?.value
    const isNewVisitor = !visitorId
    if (!visitorId) visitorId = randomUUID()

    await prisma.whatsAppClick.create({
      data: { path, visitorId, locale, productName },
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
