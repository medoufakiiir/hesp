"use client"

import { useTransition } from "react"
import { Trash2, Download, FileJson, X, Loader2 } from "lucide-react"
import { bulkDelete, exportResource } from "@/actions/admin-actions"
import { downloadFile } from "./download"
import type { Resource } from "@/lib/resources"
import type { PermissionSet } from "@/lib/permissions"

interface Props {
  resource: Resource
  selectedIds: string[]
  onClear: () => void
  onDeleted?: () => void
  permissions: PermissionSet
  locale?: "en" | "ar"
}

const t = {
  en: {
    selected: (n: number) => `${n} selected`,
    delete: "Delete",
    clear: "Clear",
    confirm: (n: number) => `Delete ${n} record(s)? This cannot be undone.`,
  },
  ar: {
    selected: (n: number) => `${n} محدد`,
    delete: "حذف",
    clear: "إلغاء",
    confirm: (n: number) => `حذف ${n} سجل؟ لا يمكن التراجع.`,
  },
}

// Floating bottom-center action bar. Hidden entirely when nothing is selected
// or the user has no permissions for this resource.
export function BulkActionBar({
  resource, selectedIds, onClear, onDeleted, permissions, locale = "en",
}: Props) {
  const [isPending, startTransition] = useTransition()
  const l = t[locale]

  if (!selectedIds.length) return null
  if (!permissions.canDelete && !permissions.canExport) return null

  const handleDelete = () => {
    if (!confirm(l.confirm(selectedIds.length))) return
    startTransition(async () => {
      try {
        await bulkDelete(resource, selectedIds)
        onClear()
        onDeleted?.()
      } catch (e) {
        alert(e instanceof Error ? e.message : "Delete failed")
      }
    })
  }

  const handleExport = (format: "csv" | "json") =>
    startTransition(async () => {
      try {
        const res = await exportResource(resource, selectedIds, format)
        downloadFile(res.data, res.filename, res.mime)
      } catch (e) {
        alert(e instanceof Error ? e.message : "Export failed")
      }
    })

  const btn = (extra: string) =>
    `inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-40 ${extra}`

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center gap-2
        bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.1]
        shadow-2xl shadow-black/40 rounded-2xl px-4 py-3
        ${locale === "ar" ? "flex-row-reverse" : ""}`}
    >
      <span className="text-brand-muted text-xs font-bold tabular-nums">{l.selected(selectedIds.length)}</span>
      <div className="w-px h-5 bg-white/[0.1]" />

      {permissions.canDelete && (
        <button onClick={handleDelete} disabled={isPending}
          className={btn("bg-red-500/15 text-red-400 hover:bg-red-500/25")}>
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />} {l.delete}
        </button>
      )}

      {permissions.canExport && (
        <>
          <button onClick={() => handleExport("csv")} disabled={isPending}
            className={btn("bg-brand-amber/15 text-brand-amber hover:bg-brand-amber/25")}>
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} CSV
          </button>
          <button onClick={() => handleExport("json")} disabled={isPending}
            className={btn("bg-white/[0.06] text-brand-white hover:bg-white/[0.12]")}>
            {isPending ? <Loader2 size={14} className="animate-spin" /> : <FileJson size={14} />} JSON
          </button>
        </>
      )}

      <button onClick={onClear} className={btn("bg-white/[0.04] text-brand-muted hover:text-brand-white")}>
        <X size={14} /> {l.clear}
      </button>
    </div>
  )
}
