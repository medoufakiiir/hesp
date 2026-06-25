export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canViewCompanies } from "@/lib/rbac"
import { resolvePermissions } from "@/lib/permissions"
import ContactsClient from "./ContactsClient"

export default async function ContactsPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canViewCompanies((session.user as Record<string, unknown>).role as string)) redirect("/admin/dashboard")

  const [contacts, permissions] = await Promise.all([
    prisma.contact.findMany({
      orderBy: [{ isPrimary: "desc" }, { name: "asc" }],
      include: { company: { select: { name: true } } },
    }),
    resolvePermissions("contacts"),
  ])

  return (
    <ContactsClient
      permissions={permissions}
      contacts={contacts.map((c) => ({
        id: c.id,
        name: c.name,
        phone: c.phone,
        email: c.email,
        position: c.position,
        company: c.company.name,
        isPrimary: c.isPrimary,
      }))}
    />
  )
}
