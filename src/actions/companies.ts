"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { canManageCompanies } from "@/lib/rbac"

const CompanySchema = z.object({
  name: z.string().min(1).max(200),
  crNumber: z.string().max(50).nullable().optional(),
  vatNumber: z.string().max(50).nullable().optional(),
  email: z.string().email().max(254).nullable().optional(),
  phone: z.string().max(30).nullable().optional(),
  addressLine: z.string().max(500).nullable().optional(),
  city: z.string().max(100).nullable().optional(),
  country: z.string().max(5).default("SA"),
  notes: z.string().max(5000).nullable().optional(),
})

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(254).nullable().optional(),
  phone: z.string().max(30).nullable().optional(),
  position: z.string().max(100).nullable().optional(),
  isPrimary: z.boolean().default(false),
})

async function requireCompanyAccess() {
  const session = await auth()
  if (!session?.user) throw new Error("Unauthorized")
  if (!canManageCompanies((session.user as any).role)) throw new Error("Forbidden")
  return session
}

export async function createCompany(data: z.infer<typeof CompanySchema>) {
  await requireCompanyAccess()
  const validated = CompanySchema.parse(data)
  await prisma.company.create({ data: validated })
  revalidatePath("/admin/companies")
}

export async function updateCompany(id: string, data: z.infer<typeof CompanySchema>) {
  await requireCompanyAccess()
  const validated = CompanySchema.parse(data)
  await prisma.company.update({ where: { id }, data: validated })
  revalidatePath("/admin/companies")
}

export async function deleteCompany(id: string) {
  await requireCompanyAccess()
  const hasQuotes = await prisma.quote.count({ where: { companyId: id } })
  if (hasQuotes > 0) throw new Error("Cannot delete company with quotes")
  await prisma.company.delete({ where: { id } })
  revalidatePath("/admin/companies")
}

export async function addContact(companyId: string, data: z.infer<typeof ContactSchema>) {
  await requireCompanyAccess()
  const validated = ContactSchema.parse(data)
  if (validated.isPrimary) {
    await prisma.contact.updateMany({ where: { companyId, isPrimary: true }, data: { isPrimary: false } })
  }
  await prisma.contact.create({ data: { ...validated, companyId } })
  revalidatePath("/admin/companies")
}

export async function updateContact(id: string, data: z.infer<typeof ContactSchema>) {
  await requireCompanyAccess()
  const validated = ContactSchema.parse(data)
  const contact = await prisma.contact.findUnique({ where: { id }, select: { companyId: true } })
  if (!contact) throw new Error("Contact not found")
  if (validated.isPrimary) {
    await prisma.contact.updateMany({ where: { companyId: contact.companyId, isPrimary: true }, data: { isPrimary: false } })
  }
  await prisma.contact.update({ where: { id }, data: validated })
  revalidatePath("/admin/companies")
}

export async function deleteContact(id: string) {
  await requireCompanyAccess()
  await prisma.contact.delete({ where: { id } })
  revalidatePath("/admin/companies")
}
