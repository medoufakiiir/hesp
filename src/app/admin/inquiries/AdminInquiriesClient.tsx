"use client"

import { useTransition } from "react"
import { MessageSquare, Phone, Building2, Package, Trash2, Mail } from "lucide-react"
import { updateInquiryStatus, deleteInquiry } from "@/actions/inquiries"
import { useRouter } from "next/navigation"

interface Inquiry {
  id: string; name: string; company: string; phone: string; email: string
  part: string; details: string; category: string; brand: string; partNumber: string
  quantity: string; status: string; source: string; createdAt: string
}

const statusColors: Record<string, string> = {
  new: "bg-amber-500/20 text-amber-400",
  contacted: "bg-blue-500/20 text-blue-400",
  quoted: "bg-purple-500/20 text-purple-400",
  closed: "bg-green-500/20 text-green-400",
}

const statuses = ["new", "contacted", "quoted", "closed"]

export default function AdminInquiriesClient({ inquiries }: { inquiries: Inquiry[] }) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleStatusChange = (id: string, status: string) => {
    startTransition(async () => {
      await updateInquiryStatus(id, status)
      router.refresh()
    })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this inquiry?")) return
    startTransition(async () => {
      await deleteInquiry(id)
      router.refresh()
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Inquiries</h1>
        <p className="text-brand-muted text-sm">{inquiries.length} total inquiries from quote & contact forms</p>
      </div>

      {/* Status pipeline */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {statuses.map((s) => {
          const count = inquiries.filter((i) => i.status === s).length
          return (
            <div key={s} className="p-4 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent border border-white/[0.06] text-center">
              <p className="text-brand-white font-display font-extrabold text-2xl">{count}</p>
              <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${statusColors[s]?.split(" ")[1] || "text-brand-muted"}`}>{s}</p>
            </div>
          )
        })}
      </div>

      {inquiries.length === 0 ? (
        <div className="p-16 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] text-center">
          <MessageSquare size={40} className="text-brand-white/10 mx-auto mb-4" />
          <p className="text-brand-muted">No inquiries yet. They will appear here when customers submit quote or contact forms.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] hover:border-white/[0.1] transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-brand-white font-semibold">{inq.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusColors[inq.status] || "bg-white/10 text-brand-muted"}`}>
                      {inq.status}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/[0.05] text-brand-muted">
                      {inq.source}
                    </span>
                  </div>
                  <p className="text-brand-muted text-xs">
                    {new Date(inq.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <button onClick={() => handleDelete(inq.id)} disabled={isPending}
                  className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center transition-colors cursor-pointer">
                  <Trash2 size={14} className="text-brand-muted" />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {inq.company && (
                  <div className="flex items-center gap-2 text-brand-muted text-sm">
                    <Building2 size={14} className="text-brand-amber/50" />
                    {inq.company}
                  </div>
                )}
                <div className="flex items-center gap-2 text-brand-muted text-sm">
                  <Phone size={14} className="text-brand-amber/50" />
                  {inq.phone}
                </div>
                {inq.email && (
                  <div className="flex items-center gap-2 text-brand-muted text-sm">
                    <Mail size={14} className="text-brand-amber/50" />
                    {inq.email}
                  </div>
                )}
                {inq.partNumber && (
                  <div className="flex items-center gap-2 text-brand-muted text-sm">
                    <Package size={14} className="text-brand-amber/50" />
                    {inq.partNumber}
                  </div>
                )}
              </div>

              {(inq.part || inq.details) && (
                <p className="text-brand-white/60 text-sm mb-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  {inq.details || inq.part}
                </p>
              )}

              <div className="flex gap-2">
                {statuses.map((s) => (
                  <button key={s} onClick={() => handleStatusChange(inq.id, s)} disabled={isPending || inq.status === s}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer
                      ${inq.status === s
                        ? statusColors[s] + " border border-current/20"
                        : "bg-white/[0.03] text-brand-muted border border-white/[0.06] hover:border-white/[0.12]"
                      } disabled:opacity-50`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
