"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react"
import { updateQuoteItems, updateQuoteStatus, updateQuoteNotes } from "@/actions/quotes"
import { generateInvoice } from "@/actions/invoices"

interface QuoteItem {
  id: string; partId: string | null; partSku: string | null; partName: string | null
  description: string | null; quantity: number; unitPrice: number; lineTotal: number
}
interface QuoteData {
  id: string; number: string; status: string
  companyName: string; companyId: string; companyEmail: string | null
  primaryContact: string | null; primaryContactEmail: string | null
  customerNote: string | null; internalNote: string | null
  vatRate: number; subtotal: number; vatAmount: number; total: number
  createdBy: string | null; assignedTo: string | null
  createdAt: string; validUntil: string | null
  invoiceId: string | null; invoiceNumber: string | null; invoiceStatus: string | null
  items: QuoteItem[]
}
interface PartOption { id: string; sku: string; nameEn: string; listPrice: number | null }

const statusBadge: Record<string, string> = {
  SUBMITTED: "bg-amber-500/20 text-amber-400", REVIEWING: "bg-blue-500/20 text-blue-400",
  QUOTED: "bg-purple-500/20 text-purple-400", CONFIRMED: "bg-green-500/20 text-green-400",
  INVOICED: "bg-cyan-500/20 text-cyan-400", COMPLETED: "bg-emerald-500/20 text-emerald-400",
  REJECTED: "bg-red-500/20 text-red-400", CANCELLED: "bg-gray-500/20 text-gray-400",
  EXPIRED: "bg-orange-500/20 text-orange-400",
}
const TRANSITIONS: Record<string, { label: string; status: string; color: string }[]> = {
  SUBMITTED: [{ label: "Start Review", status: "REVIEWING", color: "bg-blue-600" }, { label: "Reject", status: "REJECTED", color: "bg-red-600" }],
  REVIEWING: [{ label: "Send Quote", status: "QUOTED", color: "bg-purple-600" }, { label: "Reject", status: "REJECTED", color: "bg-red-600" }],
  QUOTED: [{ label: "Confirm", status: "CONFIRMED", color: "bg-green-600" }, { label: "Reject", status: "REJECTED", color: "bg-red-600" }, { label: "Mark Expired", status: "EXPIRED", color: "bg-orange-600" }],
  CONFIRMED: [{ label: "Generate Invoice", status: "INVOICED", color: "bg-cyan-600" }],
  INVOICED: [{ label: "Mark Completed", status: "COMPLETED", color: "bg-emerald-600" }],
}

export default function QuoteDetailClient({ quote, parts }: { quote: QuoteData; parts: PartOption[] }) {
  const [items, setItems] = useState(quote.items.map(i => ({ ...i })))
  const [customerNote, setCustomerNote] = useState(quote.customerNote || "")
  const [internalNote, setInternalNote] = useState(quote.internalNote || "")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const vatRate = quote.vatRate
  const subtotal = items.reduce((s, i) => s + i.quantity * i.unitPrice, 0)
  const vatAmount = subtotal * (vatRate / 100)
  const total = subtotal + vatAmount

  const addItem = () => setItems([...items, { id: "", partId: null, partSku: null, partName: null, description: "", quantity: 1, unitPrice: 0, lineTotal: 0 }])
  const removeItem = (idx: number) => setItems(items.filter((_, i) => i !== idx))
  const updateItem = (idx: number, field: string, value: any) => {
    const next = [...items]
    const item = { ...next[idx], [field]: value }
    if (field === "partId" && value) {
      const part = parts.find(p => p.id === value)
      if (part) { item.partSku = part.sku; item.partName = part.nameEn; item.unitPrice = part.listPrice || 0 }
    }
    item.lineTotal = item.quantity * item.unitPrice
    next[idx] = item
    setItems(next)
  }

  const handleSaveItems = () => {
    startTransition(async () => {
      try {
        await updateQuoteItems(quote.id, {
          items: items.map(i => ({
            id: i.id || undefined,
            partId: i.partId,
            description: i.description,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
        })
        router.refresh()
      } catch (err: any) { alert(err.message) }
    })
  }

  const handleSaveNotes = () => {
    startTransition(async () => {
      try {
        await updateQuoteNotes(quote.id, customerNote || null, internalNote || null)
        router.refresh()
      } catch (err: any) { alert(err.message) }
    })
  }

  const handleStatusChange = (newStatus: string) => {
    if (!confirm(`Change status to ${newStatus}?`)) return
    startTransition(async () => {
      try {
        if (newStatus === "INVOICED") {
          await generateInvoice(quote.id)
        } else {
          await updateQuoteStatus(quote.id, newStatus)
        }
        router.refresh()
      } catch (err: any) { alert(err.message) }
    })
  }

  const actions = TRANSITIONS[quote.status] || []

  return (
    <div>
      <Link href="/admin/quotes" className="inline-flex items-center gap-2 text-brand-muted text-sm hover:text-brand-white mb-6">
        <ArrowLeft size={16} /> Back to Quotes
      </Link>

      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">{quote.number}</h1>
          <p className="text-brand-muted text-sm">{quote.companyName} · Created {new Date(quote.createdAt).toLocaleDateString()}</p>
          {quote.primaryContact && <p className="text-brand-muted text-xs mt-1">Contact: {quote.primaryContact} {quote.primaryContactEmail ? `(${quote.primaryContactEmail})` : ""}</p>}
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${statusBadge[quote.status]}`}>
            {quote.status}
          </span>
          {actions.map(a => (
            <button key={a.status} onClick={() => handleStatusChange(a.status)} disabled={isPending}
              className={`${a.color} text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl hover:opacity-90 cursor-pointer disabled:opacity-50`}>
              {a.label}
            </button>
          ))}
        </div>
      </div>

      {quote.invoiceNumber && (
        <div className="mb-6 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
          <p className="text-cyan-400 text-sm font-medium">
            Invoice: <Link href="/admin/invoices" className="underline">{quote.invoiceNumber}</Link>
            <span className="ml-2 text-xs opacity-70">({quote.invoiceStatus})</span>
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-brand-white font-display font-extrabold uppercase text-lg">Line Items</h2>
              <div className="flex gap-2">
                <button onClick={addItem} className="text-brand-amber text-xs flex items-center gap-1 hover:text-brand-gold cursor-pointer">
                  <Plus size={14} /> Add Item
                </button>
                <button onClick={handleSaveItems} disabled={isPending}
                  className="bg-brand-amber text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-brand-gold cursor-pointer disabled:opacity-50 flex items-center gap-1">
                  <Save size={14} /> Save
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.04] space-y-3">
                  <div className="flex gap-3">
                    <div className="flex-grow">
                      <label className="text-brand-white/30 text-[10px] uppercase tracking-widest mb-1 block">Part</label>
                      <select value={item.partId || ""} onChange={(e) => updateItem(idx, "partId", e.target.value || null)}
                        className="input-field text-sm">
                        <option value="">Free-text item</option>
                        {parts.map(p => <option key={p.id} value={p.id}>{p.sku} — {p.nameEn}</option>)}
                      </select>
                    </div>
                    <button onClick={() => removeItem(idx)} className="self-end w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer flex-shrink-0">
                      <Trash2 size={14} className="text-brand-muted" />
                    </button>
                  </div>
                  {!item.partId && (
                    <div>
                      <label className="text-brand-white/30 text-[10px] uppercase tracking-widest mb-1 block">Description</label>
                      <input type="text" value={item.description || ""} onChange={(e) => updateItem(idx, "description", e.target.value)}
                        className="input-field text-sm" placeholder="Part description..." />
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-brand-white/30 text-[10px] uppercase tracking-widest mb-1 block">Qty</label>
                      <input type="number" min="1" value={item.quantity} onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                        className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="text-brand-white/30 text-[10px] uppercase tracking-widest mb-1 block">Unit Price (SAR)</label>
                      <input type="number" step="0.01" min="0" value={item.unitPrice} onChange={(e) => updateItem(idx, "unitPrice", Number(e.target.value))}
                        className="input-field text-sm" />
                    </div>
                    <div>
                      <label className="text-brand-white/30 text-[10px] uppercase tracking-widest mb-1 block">Line Total</label>
                      <div className="input-field text-sm bg-white/[0.02] text-brand-white/60">
                        {(item.quantity * item.unitPrice).toLocaleString("en-SA", { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] space-y-2 text-right">
              <div className="text-brand-muted text-sm">Subtotal: <span className="text-brand-white font-mono ml-2">{subtotal.toLocaleString("en-SA", { minimumFractionDigits: 2 })} SAR</span></div>
              <div className="text-brand-muted text-sm">VAT ({vatRate}%): <span className="text-brand-white font-mono ml-2">{vatAmount.toLocaleString("en-SA", { minimumFractionDigits: 2 })} SAR</span></div>
              <div className="text-brand-white text-lg font-bold font-display">Total: <span className="text-brand-amber font-mono ml-2">{total.toLocaleString("en-SA", { minimumFractionDigits: 2 })} SAR</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] p-6">
            <h3 className="text-brand-white font-display font-extrabold uppercase text-sm mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div><span className="text-brand-muted text-xs">Created by:</span><br /><span className="text-brand-white">{quote.createdBy || "—"}</span></div>
              <div><span className="text-brand-muted text-xs">Assigned to:</span><br /><span className="text-brand-white">{quote.assignedTo || "—"}</span></div>
              {quote.validUntil && (
                <div><span className="text-brand-muted text-xs">Valid until:</span><br /><span className="text-brand-white">{new Date(quote.validUntil).toLocaleDateString()}</span></div>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-brand-white font-display font-extrabold uppercase text-sm">Notes</h3>
              <button onClick={handleSaveNotes} disabled={isPending}
                className="text-brand-amber text-xs hover:text-brand-gold cursor-pointer flex items-center gap-1">
                <Save size={12} /> Save
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-brand-white/30 text-[10px] uppercase tracking-widest mb-1 block">Customer Note</label>
                <textarea value={customerNote} onChange={(e) => setCustomerNote(e.target.value)} className="input-field text-sm" rows={3} />
              </div>
              <div>
                <label className="text-brand-white/30 text-[10px] uppercase tracking-widest mb-1 block">Internal Note</label>
                <textarea value={internalNote} onChange={(e) => setInternalNote(e.target.value)} className="input-field text-sm" rows={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
