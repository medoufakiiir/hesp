export const dynamic = "force-dynamic"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { canViewCompanies, canManageCompanies } from "@/lib/rbac"
import { resolvePermissions } from "@/lib/permissions"
import CompaniesClient from "./CompaniesClient"

export default async function CompaniesPage() {
  const session = await auth()
  if (!session?.user) redirect("/admin/login")
  if (!canViewCompanies((session.user as Record<string, unknown>).role as string)) redirect("/admin/dashboard")

  const companies = await prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      contacts: { orderBy: { isPrimary: "desc" }, take: 3 },
      _count: { select: { quotes: true } },
    },
  })

  const canEdit = canManageCompanies((session.user as Record<string, unknown>).role as string)
  const permissions = await resolvePermissions("customers")

  return (
    <CompaniesClient
      permissions={permissions}
      companies={companies.map((c) => ({
        id: c.id, name: c.name,
        crNumber: c.crNumber, vatNumber: c.vatNumber,
        email: c.email, phone: c.phone,
        city: c.city, country: c.country,
        addressLine: c.addressLine, notes: c.notes,
        quoteCount: c._count.quotes,
        contacts: c.contacts.map((ct) => ({
          id: ct.id, name: ct.name, email: ct.email,
          phone: ct.phone, position: ct.position, isPrimary: ct.isPrimary,
        })),
      }))}
      canEdit={canEdit}
    />
  )
}
