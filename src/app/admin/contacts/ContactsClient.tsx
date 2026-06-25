"use client"

import { SelectableTable, type Column } from "@/components/admin/SelectableTable"
import { ExportToolbar } from "@/components/admin/ExportToolbar"
import type { PermissionSet } from "@/lib/permissions"

export interface ContactRow {
  id: string
  name: string
  phone: string | null
  email: string | null
  position: string | null
  company: string
  isPrimary: boolean
}

const columns: Column<ContactRow>[] = [
  { key: "name", label: "Name", render: (r) => <span className="font-semibold">{r.name}</span> },
  {
    key: "phone",
    label: "Phone",
    render: (r) =>
      r.phone ? (
        <a href={`tel:${r.phone}`} className="font-mono text-brand-amber hover:underline">{r.phone}</a>
      ) : "—",
  },
  { key: "email", label: "Email", render: (r) => r.email || "—" },
  { key: "position", label: "Position", render: (r) => r.position || "—" },
  { key: "company", label: "Company" },
  {
    key: "isPrimary",
    label: "Primary",
    render: (r) => (r.isPrimary ? <span className="text-brand-amber">★</span> : ""),
  },
]

export default function ContactsClient({
  contacts, permissions,
}: {
  contacts: ContactRow[]
  permissions: PermissionSet
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Contacts</h1>
          <p className="text-brand-muted text-sm">{contacts.length} contacts across all companies</p>
        </div>
        <ExportToolbar resource="contacts" canExport={permissions.canExport} />
      </div>

      <SelectableTable resource="contacts" rows={contacts} columns={columns} permissions={permissions} />
    </div>
  )
}
