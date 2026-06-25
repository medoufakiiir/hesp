"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Receipt, DollarSign, X } from "lucide-react"
import { markInvoicePaid, voidInvoice } from "@/actions/invoices"

interface Invoice {
  id: string; number: string; status: string
  quoteNumber: string; quoteId: string; companyName: string
  total: number; amountPaid: number
  issuedAt: string; dueAt: string | null; paidAt: string | null
}

const statusBadge: Record<string, string> = {
  UNPAID: "bg-red-500/20 text-red-400",
  PARTIALLY_PAID: "bg-amber-500/20 text-amber-400",
  PAID: "bg-green-500/20 text-green-400",
  VOID: "bg-gray-500/20 text-gray-400",
}

export default function InvoicesClient({ invoices }: { invoices: Invoice[] }) {
  const [payModal, setPayModal] = useState<Invoice | null>(null)
  const [payAmount, setPayAmount] = useState("")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handlePay = () => {
    if (!payModal || !payAmount) return
    startTransition(async () => {
      try {
        await markInvoicePaid(payModal.id, { amountPaid: Number(payAmount) })
        setPayModal(null); setPayAmount(""); router.refresh()
      } catch (err: unknown) { alert(err instanceof Error ? err.message : "Error") }
    })
  }

  const handleVoid = (id: string) => {
    if (!confirm("Void this invoice?")) return
    startTransition(async () => {
      try { await voidInvoice(id); router.refresh() }
      catch (err: unknown) { alert(err instanceof Error ? err.message : "Error") }
    })
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Invoices</h1>
        <p className="text-brand-muted text-sm">{invoices.length} invoices</p>
      </div>

      <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
        <table className="w-full">
          <thead>
            <tr className="bg-white/[0.03]">
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Invoice #</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Company</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Quote</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Total (SAR)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Paid (SAR)</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Status</th>
              <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden lg:table-cell">Due</th>
              <th className="text-right text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-brand-amber text-sm font-mono">{inv.number}</td>
                <td className="px-4 py-3 text-brand-white text-sm">{inv.companyName}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <Link href={`/admin/quotes/${inv.quoteId}`} className="text-brand-muted text-xs hover:text-brand-amber">{inv.quoteNumber}</Link>
                </td>
                <td className="px-4 py-3 text-brand-white text-sm hidden md:table-cell font-mono">{inv.total.toLocaleString("en-SA", { minimumFractionDigits: 2 })}</td>
                <td className="px-4 py-3 text-brand-white text-sm hidden lg:table-cell font-mono">{inv.amountPaid.toLocaleString("en-SA", { minimumFractionDigits: 2 })}</td>
                <td className="px-4 py-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusBadge[inv.status]}`}>
                    {inv.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-4 py-3 text-brand-muted text-xs hidden lg:table-cell">
                  {inv.dueAt ? new Date(inv.dueAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {(inv.status === "UNPAID" || inv.status === "PARTIALLY_PAID") && (
                      <>
                        <button onClick={() => { setPayModal(inv); setPayAmount(String(inv.total - inv.amountPaid)) }}
                          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-green-500/20 flex items-center justify-center cursor-pointer" title="Record Payment">
                          <DollarSign size={14} className="text-brand-muted" />
                        </button>
                        <button onClick={() => handleVoid(inv.id)} disabled={isPending}
                          className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-red-500/20 flex items-center justify-center cursor-pointer" title="Void">
                          <X size={14} className="text-brand-muted" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {invoices.length === 0 && (
              <tr><td colSpan={8} className="px-4 py-12 text-center text-brand-muted text-sm">
                <Receipt size={32} className="mx-auto mb-3 text-brand-white/10" />No invoices yet.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      {payModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-gradient-to-br from-brand-steel to-brand-iron border border-white/[0.08] p-8">
            <h2 className="text-brand-white font-display font-extrabold uppercase text-xl mb-2">Record Payment</h2>
            <p className="text-brand-muted text-sm mb-6">{payModal.number} — Remaining: {(payModal.total - payModal.amountPaid).toLocaleString("en-SA", { minimumFractionDigits: 2 })} SAR</p>
            <div className="mb-4">
              <label className="block text-brand-white/40 text-xs font-bold uppercase tracking-widest mb-2">Amount (SAR)</label>
              <input type="number" step="0.01" min="0.01" value={payAmount}
                onChange={(e) => setPayAmount(e.target.value)} className="input-field" />
            </div>
            <div className="flex gap-3">
              <button onClick={handlePay} disabled={isPending || !payAmount}
                className="flex-1 bg-green-600 text-white font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:bg-green-500 cursor-pointer disabled:opacity-50">
                {isPending ? "Processing..." : "Confirm Payment"}
              </button>
              <button onClick={() => setPayModal(null)}
                className="px-6 border border-white/[0.1] text-brand-muted font-bold uppercase text-sm tracking-widest py-4 rounded-xl hover:border-white/[0.2] cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
