import type { NextFetchEvent } from "next/server"
import NextAuth, { type NextAuthRequest } from "next-auth"
import createMiddleware from "next-intl/middleware"
import { authConfig } from "@/lib/auth.config"
import { routing } from "@/i18n/routing"

const { auth } = NextAuth(authConfig)
const intlMiddleware = createMiddleware(routing)

// next-auth's public type for the destructured `auth` only declares the
// no-args/object-wrapping overloads — it doesn't expose the direct 2-arg
// (req, event) call shape used below, even though the implementation
// supports it (see comment on `middleware` below). Narrow, isolated cast
// to the signature that's actually invoked, instead of casting at the call
// site or weakening `req`'s type.
const authMiddleware = auth as unknown as (
  req: NextAuthRequest,
  event: NextFetchEvent,
) => Promise<Response>

// IMPORTANT: `auth` must be invoked directly here — `auth(req, event)` — and
// NOT wrapped as `auth((req) => {...})`. NextAuth's two calling conventions
// behave differently: wrapping with a callback makes NextAuth call that
// callback unconditionally and use its return value as the response, which
// silently SKIPS the built-in "redirect to signIn page" fallback that fires
// when authConfig.callbacks.authorized() returns `false` (a boolean, not a
// Response). That fallback only runs on the direct `auth(req, event)` call
// path (see node_modules/next-auth/lib/index.js: `args[0] instanceof
// Request` branch vs the wrapper branch). Wrapping it was tried first and
// verified — with curl — to let unauthenticated requests straight through
// to /admin/dashboard. Calling it directly here reproduces the exact
// invocation Next.js used for the original `export default auth`, so
// authConfig's redirect-on-unauthorized logic is untouched and unchanged.
export default function middleware(req: NextAuthRequest, event: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return authMiddleware(req, event)
  }
  return intlMiddleware(req)
}

export const config = {
  // Runs on every route except API handlers, Next internals, and anything
  // with a file extension (robots.txt, sitemap.xml, feed.xml, favicon.ico,
  // /images/*, etc.) — those must never be locale-redirected. /admin/* IS
  // matched here (so the auth gate above still runs for it, exactly as
  // before), it's just routed to `auth` directly instead of next-intl.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
