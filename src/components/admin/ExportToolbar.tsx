"use client"

import { useState, useTransition } from "react"
import { Download, FileJson, Loader2, Phone } from "lucide-react"
import { exportResource, exportCompanyContacts } from "@/actions/admin-actions"
import { downloadFile } from "./download"
import type { Resource } from "@/lib/resources"

interface Props {
  resource: Resource
  canExport: boolean
  // When set, also shows a "Contacts" button that exports every contact + phone
  // number for this company.
  companyId?: string
  className?: string
}

// Additive header toolbar: whole-resource CSV / JSON export. Rendered only when
// the current user has export permission for the resource — never disabled, hidden.
export function ExportToolbar({ resource, canExport, companyId, className }: Props) {
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState<string>("")

  if (!canExport) return null

  const run = (fn: () => Promise<{ data: string; filename: string; mime: string }>, label: string) =>
    startTransition(async () => {
      setStatus("")
      try {
        const res = await fn()
        downloadFile(res.data, res.filename, res.mime)
        setStatus(label)
        setTimeout(() => setStatus(""), 2500)
      } catch (e) {
        alert(e instanceof Error ? e.message : "Export failed")
      }
    })

  const btn =
    "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50 border border-white/[0.1] text-brand-muted hover:text-brand-white hover:border-brand-amber/40"

  return (
    <div className={`flex items-center gap-2 ${className ?? ""}`}>
      <button type="button" disabled={isPending} onClick={() => run(() => exportResource(resource, undefined, "csv"), "CSV downloaded")} className={btn}>
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />} CSV
      </button>
      <button type="button" disabled={isPending} onClick={() => run(() => exportResource(resource, undefined, "json"), "JSON downloaded")} className={btn}>
        {isPending ? <Loader2 size={14} className="animate-spin" /> : <FileJson size={14} />} JSON
      </button>
      {companyId && (
        <button type="button" disabled={isPending} onClick={() => run(() => exportCompanyContacts(companyId), "Contacts downloaded")} className={btn}>
          {isPending ? <Loader2 size={14} className="animate-spin" /> : <Phone size={14} />} Contacts
        </button>
      )}
      {status && <span className="text-brand-amber text-[11px] font-semibold">{status}</span>}
    </div>
  )
}
