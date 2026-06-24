"use client"

import Link from "next/link"
import { Package, ClipboardList, Receipt, Building2, TrendingUp, AlertTriangle, ArrowUpRight, Tag, Layers } from "lucide-react"

interface DashboardProps {
  stats: {
    partCount: number
    categoryCount: number
    brandCount: number
    companyCount: number
    openQuotes: number
    unpaidInvoices: number
    lowStockParts: number
  }
  recentQuotes: {
    id: string
    number: string
    company: string
    status: string
    total: number
    date: string
  }[]
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

export default function DashboardClient({ stats, recentQuotes }: DashboardProps) {
  const statCards = [
    { label: "Open Quotes", value: stats.openQuotes, icon: ClipboardList, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Unpaid Invoices", value: stats.unpaidInvoices, icon: Receipt, color: "text-red-400", bg: "bg-red-400/10" },
    { label: "Low Stock Parts", value: stats.lowStockParts, icon: AlertTriangle, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Parts", value: stats.partCount, icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Companies", value: stats.companyCount, icon: Building2, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Categories", value: stats.categoryCount, icon: Layers, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Brands", value: stats.brandCount, icon: Tag, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Dashboard</h1>
        <p className="text-brand-muted text-sm">B2B Sales Overview — HESP Admin</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
        {statCards.map(({ label, value, icon: Icon, color, bg }, i) => (
          <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-brand-white font-display font-extrabold text-3xl">{value}</p>
            <p className="text-brand-muted text-xs uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="mb-12">
        <h2 className="text-brand-white font-display font-extrabold uppercase text-xl mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: "/admin/quotes", label: "Manage Quotes", desc: "View and price RFQs", icon: ClipboardList },
            { href: "/admin/parts", label: "Parts Catalog", desc: "Add, edit, or remove parts", icon: Package },
            { href: "/admin/companies", label: "Companies", desc: "Manage B2B customers", icon: Building2 },
          ].map(({ href, label, desc, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent
                border border-white/[0.06] hover:border-brand-amber/25
                transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-amber/15 flex items-center justify-center">
                    <Icon size={20} className="text-brand-amber" />
                  </div>
                  <ArrowUpRight size={16} className="text-brand-white/20 group-hover:text-brand-amber transition-colors" />
                </div>
                <h3 className="text-brand-white font-semibold mb-1">{label}</h3>
                <p className="text-brand-muted text-xs">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">Recent Quotes</h2>
          <Link href="/admin/quotes" className="text-brand-amber text-xs font-semibold uppercase tracking-widest hover:text-brand-gold">
            View All →
          </Link>
        </div>
        {recentQuotes.length > 0 ? (
          <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">RFQ #</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Company</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Total (SAR)</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((q) => (
                  <tr key={q.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <Link href={`/admin/quotes/${q.id}`} className="text-brand-amber text-sm hover:underline">{q.number}</Link>
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell">{q.company}</td>
                    <td className="px-4 py-3 text-brand-white text-sm hidden md:table-cell">{q.total.toLocaleString("en-SA", { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${statusBadge[q.status] || "bg-white/10 text-brand-muted"}`}>
                        {q.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.06] text-center">
            <ClipboardList size={32} className="text-brand-white/10 mx-auto mb-3" />
            <p className="text-brand-muted text-sm">No quotes yet. They will appear here when RFQs are submitted.</p>
          </div>
        )}
      </div>
    </div>
  )
}
