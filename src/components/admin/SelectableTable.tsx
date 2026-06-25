"use client"

import { useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { BulkActionBar } from "./BulkActionBar"
import type { Resource } from "@/lib/resources"
import type { PermissionSet } from "@/lib/permissions"

export interface Column<T> {
  key: string
  label: string
  render?: (row: T) => ReactNode
}

interface Props<T extends { id: string }> {
  resource: Resource
  rows: T[]
  columns: Column<T>[]
  permissions: PermissionSet
  locale?: "en" | "ar"
}

export function SelectableTable<T extends { id: string }>({
  resource, rows, columns, permissions, locale = "en",
}: Props<T>) {
  const router = useRouter()
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const isRTL = locale === "ar"
  const showChecks = permissions.canDelete || permissions.canExport

  const toggle = (id: string) =>
    setSelected((prev) => {
      const s = new Set(prev)
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return s
    })

  const toggleAll = () =>
    setSelected(selected.size === rows.length ? new Set() : new Set(rows.map((r) => r.id)))

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.04] to-transparent">
        <table className={`w-full text-sm ${isRTL ? "text-right" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
          <thead className="text-brand-white/40 text-[10px] uppercase tracking-widest border-b border-white/[0.06]">
            <tr>
              {showChecks && (
                <th className="px-4 py-4 w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all"
                    checked={rows.length > 0 && selected.size === rows.length}
                    onChange={toggleAll}
                    className="accent-brand-amber cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-4 font-bold">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rows.map((row) => (
              <tr key={row.id}
                className={`transition-colors ${
                  selected.has(row.id) ? "bg-brand-amber/[0.06]" : "hover:bg-white/[0.03]"
                }`}>
                {showChecks && (
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${row.id}`}
                      checked={selected.has(row.id)}
                      onChange={() => toggle(row.id)}
                      className="accent-brand-amber cursor-pointer"
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-brand-white">
                    {col.render ? col.render(row) : ((row as Record<string, unknown>)[col.key] as ReactNode) ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={columns.length + (showChecks ? 1 : 0)}
                  className="px-4 py-16 text-center text-brand-muted text-sm">
                  {isRTL ? "لا توجد بيانات" : "No records found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BulkActionBar
        resource={resource}
        selectedIds={[...selected]}
        onClear={() => setSelected(new Set())}
        onDeleted={() => router.refresh()}
        permissions={permissions}
        locale={locale}
      />
    </>
  )
}
