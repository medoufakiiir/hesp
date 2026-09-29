import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { timingSafeEqual } from "node:crypto"
import { prisma } from "./db"
import { authConfig } from "./auth.config"

/**
 * Recovery login driven by the ADMIN_EMAIL / ADMIN_PASSWORD environment
 * variables. After the project moved to a new Vercel account the new database
 * had no users, so nobody could sign in. When those variables are set and
 * match, the admin row is created/reset as SUPER_ADMIN so the normal
 * DB-backed login works from then on; if the DB is down, a session is still
 * issued so the owner can get into the dashboard.
 */
async function bootstrapAdmin(email: string, password: string) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword) return null
  if (!safeEqual(email, adminEmail) || !safeEqual(password, adminPassword)) return null

  try {
    const passwordHash = await bcrypt.hash(adminPassword, 12)
    const user = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { passwordHash, role: "SUPER_ADMIN", isActive: true },
      create: { email: adminEmail, name: "Super Admin", passwordHash, role: "SUPER_ADMIN", isActive: true },
    })
    return { id: user.id, name: user.name, email: user.email, role: user.role }
  } catch (err) {
    console.error("[auth] could not persist env admin, issuing DB-less session:", err)
    return { id: "env-admin", name: "Super Admin", email: adminEmail, role: "SUPER_ADMIN" }
  }
}

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  return ab.length === bb.length && timingSafeEqual(ab, bb)
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as any,
  // 30-minute outer bound — a backstop in case the 10-minute client-side
  // idle timer (IdleTimeoutHandler) doesn't run (JS disabled, tab killed
  // before the timer fires, etc.), not the primary inactivity mechanism.
  session: { strategy: "jwt", maxAge: 30 * 60 },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const email = (credentials.email as string).trim().toLowerCase()
        const password = credentials.password as string

        try {
          const user = await prisma.user.findFirst({
            where: { email: { equals: email, mode: "insensitive" } },
          })
          if (user?.passwordHash && user.isActive && (await bcrypt.compare(password, user.passwordHash))) {
            return { id: user.id, name: user.name, email: user.email, role: user.role }
          }
        } catch (err) {
          // DB unset/unreachable/schema not pushed — fall through to the
          // env-configured admin below instead of failing every login.
          console.error("[auth] user lookup failed:", err)
        }

        return bootstrapAdmin(email, password)
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = (user as any).id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).role = token.role as string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(session.user as any).id = token.id as string
      }
      return session
    },
  },
})
