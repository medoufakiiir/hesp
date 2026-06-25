"use server"

import { prisma } from "@/lib/db"
import { can } from "@/lib/permissions"
import { revalidatePath } from "next/cache"
import {
  type Resource,
  EXPORT_FIELDS,
  EXPORT_ORDER_BY,
  PRISMA_DELEGATE,
} from "@/lib/resources"

// Which admin paths to revalidate after a mutation for each resource.
const REVALIDATE_PATHS: Record<Resource, string[]> = {
  products: ["/admin/parts"],
  customers: ["/admin/companies"],
  quotes: ["/admin/quotes"],
  invoices: ["/admin/invoices"],
  contacts: ["/admin/contacts", "/admin/companies"],
  users: ["/admin/users"],
  messages: ["/admin/messages"],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function delegate(resource: Resource): any {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[PRISMA_DELEGATE[resource]]
}

function revalidate(resource: Resource) {
  for (const path of REVALIDATE_PATHS[resource]) revalidatePath(path)
}

function friendlyDeleteError(e: unknown): never {
  const msg = e instanceof Error ? e.message : String(e)
  // Prisma foreign-key constraint failure
  if (msg.includes("Foreign key constraint") || msg.includes("P2003")) {
    throw new Error("Cannot delete: record is still referenced by other data")
  }
  throw new Error(msg)
}

// ─── DELETE (single, hard) ────────────────────────────────────────────────────
export async function deleteRecord(resource: Resource, id: string) {
  if (!(await can("delete", resource))) throw new Error("Unauthorized")
  try {
    await delegate(resource).delete({ where: { id } })
  } catch (e) {
    friendlyDeleteError(e)
  }
  revalidate(resource)
  return { success: true }
}

// ─── BULK DELETE (hard) ───────────────────────────────────────────────────────
export async function bulkDelete(resource: Resource, ids: string[]) {
  if (!(await can("delete", resource))) throw new Error("Unauthorized")
  if (!ids.length) throw new Error("No records selected")
  try {
    const res = await delegate(resource).deleteMany({ where: { id: { in: ids } } })
    revalidate(resource)
    return { deleted: res.count as number }
  } catch (e) {
    friendlyDeleteError(e)
  }
}

export interface ExportResult {
  data: string
  filename: string
  mime: string
}

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ""
  if (value instanceof Date) return value.toISOString()
  const str = String(value).replace(/"/g, '""')
  return /[",\n]/.test(str) ? `"${str}"` : str
}

// ─── EXPORT CSV or JSON ───────────────────────────────────────────────────────
export async function exportResource(
  resource: Resource,
  ids?: string[],
  format: "csv" | "json" = "csv"
): Promise<ExportResult> {
  if (!(await can("export", resource))) throw new Error("Unauthorized")

  const fields = EXPORT_FIELDS[resource]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {}
  if (ids?.length) where.id = { in: ids }

  const records = await delegate(resource).findMany({
    where,
    select: Object.fromEntries(fields.map((f) => [f, true])),
    orderBy: EXPORT_ORDER_BY[resource],
  })

  // Decimal fields come back as Prisma.Decimal — normalise to primitives for JSON.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const normalised = records.map((r: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const out: any = {}
    for (const f of fields) {
      const v = r[f]
      out[f] = v !== null && v !== undefined && typeof v === "object" && "toString" in v && !(v instanceof Date)
        ? v.toString()
        : v
    }
    return out
  })

  if (format === "json") {
    return {
      data: JSON.stringify(normalised, null, 2),
      filename: `hesp-${resource}-${Date.now()}.json`,
      mime: "application/json",
    }
  }

  const header = fields.join(",")
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows = normalised.map((r: any) => fields.map((f) => csvEscape(r[f])).join(","))

  return {
    data: [header, ...rows].join("\n"),
    filename: `hesp-${resource}-${Date.now()}.csv`,
    mime: "text/csv",
  }
}

// ─── EXPORT ALL CONTACTS FOR A COMPANY (phone numbers) ───────────────────────
export async function exportCompanyContacts(companyId: string): Promise<ExportResult> {
  if (!(await can("export", "contacts"))) throw new Error("Unauthorized")

  const contacts = await prisma.contact.findMany({
    where: { companyId },
    include: { company: { select: { name: true } } },
    orderBy: { isPrimary: "desc" },
  })

  const fields = ["company", "name", "phone", "email", "position", "primary"]
  const rows = contacts.map((c) =>
    [
      c.company.name,
      c.name,
      c.phone ?? "",
      c.email ?? "",
      c.position ?? "",
      c.isPrimary ? "Yes" : "No",
    ]
      .map(csvEscape)
      .join(",")
  )

  return {
    data: [fields.join(","), ...rows].join("\n"),
    filename: `hesp-contacts-company-${companyId}-${Date.now()}.csv`,
    mime: "text/csv",
  }
}
