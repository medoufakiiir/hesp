import type { NextAuthConfig } from "next-auth"

export const authConfig: NextAuthConfig = {
  // Vercel sets the Host header itself, so it can be trusted. Explicit so
  // login keeps working if the VERCEL env var detection ever misses (custom
  // domains, a new account/project, or running `next start` elsewhere).
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isAdminRoute = nextUrl.pathname.startsWith("/admin")
      const isLoginPage = nextUrl.pathname === "/admin/login"

      if (isAdminRoute && !isLoginPage) {
        return isLoggedIn
      }
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin/dashboard", nextUrl))
      }
      return true
    },
  },
  providers: [],
}
