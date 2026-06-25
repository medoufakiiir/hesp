"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, X, ClipboardList, Search } from "lucide-react"
import { createQuote } from "@/actions/quotes"

interface Quote {
  id: string; number: string; status: string; companyName: string; companyId: string
  assignedTo: string | null; subtotal: number; vatAmount: number; total: number
  itemCount: number; createdAt: string; validUntil: string | null
}

const statusBadge: Record<string, string> = {
  SUBMITTED: "bg-amber-500/20 text-amber-400",
  REVIEWING: "bg-blue-500/20 text-blue-400",
  QUOTED: "bg-purple-500/20 text-purple-400",
  CONFIRMED: "bg-green-500/20 text-green-400",
  INVOICED: "bg-cyan-500/20 text-cyan-400",
  COMPLETED: "bg-emerald-500/20 text-emerald-400",
  REJECTED: "bg-red-500/20 text-red-400",
  CANCELLED: "bg-gray-500/20 text-gray-400",
  EXPIRED: "bg-orange-500/20 text-orange-400",
}

export default function QuotesClient({ quotes, companies }: {
  quotes: Quote[]
  companies: { id: string; name: string }[]
}) {
  const [showForm, setShowForm] = useState(false)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [form, setForm] = useState({ companyId: "", customerNote: "", description: "", quantity: 1 })
  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtered = quotes.filter((q) => {
    if (statusFilter && q.status !== statusFilter) return false
    if (search) {
      const s = search.toLowerCase()
      return q.number.toLowerCase().includes(s) || q.companyName.toLowerCase().includes(s)
    }
    return true
  })

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault(); setError("")
    startTransition(async () => {
      try {
        const id = await createQuote({
          companyId: form.companyId,
          customerNote: form.customerNote || null,
          items: [{ description: form.description, quantity: form.quantity, unitPrice: 0 }],
        })
        setShowForm(false)
        router.push(`/admin/quotes/${id}`)
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "Error") }
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Quotes / RFQ</h1>
          <p className="text-brand-muted text-sm">{quotes.length} total quotes</p>
        </div>
        <button onClick={() => { setError(""); setShowForm(true) }}
          className="flex items-center gap-2 bg-brand-amber text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer">
          <Plus size={16} /> New Quote
        </button>
      </div>

      <div className="flex gap-4 mb-6 flex-wrap">
        <div className="relative flex-grow max-w-md">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input type="text" placeholder="Search by number or company..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-brand-white text-sm placeholder-brand-muted focus:border-brand-amber/30 outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] text-brand-white text-sm cursor-pointer">
          <option value="">All Statuses</option>
          {Object.keys(statusBadge).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">RFQ #</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Company</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Items</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Total (SAR)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Assigned</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Status</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((q) => (
              <tr key={q.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <Link href={`/admin/quotes/${q.id}`} className="text-brand-amber text-sm hover:underline font-mono">{q.number}</Link>
                </td>
                <td className="px-4 py-3 text-brand-white text-sm">{q.companyName}</td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell">{q.itemCount}</td>
                <td className="px-4 py-3 text-brand-white text-sm hidden md:table-cell font-mono">
                  {q.total > 0 ? q.total.toLocaleString("en-SA", { minimumFractionDigits: 2 }) : "—"}
                </td>
                <td className="px-4 py-3 text-brand-muted text-sm hidden lg:table-cell">{q.assignedTo || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusBadge[q.status] || "bg-white/10 text-brand-muted"}`}>
                    {q.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-brand-muted text-xs hidden lg:table-cell">
                  {new Date(q.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-12 text-center text-brand-muted text-sm">
                <ClipboardList size={32} className="mx-auto mb-3 text-brand-white/10" />{search || statusFilter ? "No matching quotes." : "No quotes yet."}
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">New Quote</h2>
              <button onClick={() => setShowForm(false)} className="text-brand-muted hover:text-brand-white cursor-pointer"><X size={20} /></button>
            </div>
            {error && <div className="p-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Company *</label>
                <select required value={form.companyId} onChange={(e) => setForm({ ...form, companyId: e.target.value })} className="input-field">
                  <option value="">Select company...</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Part Description *</label>
                <input type="text" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" placeholder="e.g. Hydraulic pump for CAT 320D" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Quantity</label>
                <input type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="input-field" />
              </div>
              <div>
                <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Customer Note</label>
                <textarea value={form.customerNote} onChange={(e) => setForm({ ...form, customerNote: e.target.value })} className="input-field" rows={2} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={isPending}
                  className="flex-1 bg-brand-amber text-white font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-brand-gold transition-colors cursor-pointer disabled:opacity-50">
                  {isPending ? "Creating..." : "Create Quote"}
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="px-6 border border-white/[0.1] text-brand-muted font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:border-white/[0.2] transition-colors cursor-pointer">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
