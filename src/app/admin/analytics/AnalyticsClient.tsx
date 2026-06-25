"use client"

import { MessageSquare, Package, TrendingUp, ShoppingCart, BarChart3, Users, FileText, Layers, Eye, UserCheck, Target } from "lucide-react"

interface Stats {
  totalInquiries: number
  newInquiries: number
  contactedInquiries: number
  quotedInquiries: number
  closedInquiries: number
  inquiriesLast30d: number
  inquiriesLast7d: number
  totalProducts: number
  featuredProducts: number
  inStockProducts: number
  totalCategories: number
  totalBrands: number
  totalBlogPosts: number
}

interface Traffic {
  totalPageViews: number
  pageViews30d: number
  pageViews7d: number
  uniqueVisitors: number
  uniqueVisitors30d: number
  uniqueVisitors7d: number
  visitorConversionRate: number
  visitorConversionRate30d: number
}

interface RecentInquiry {
  id: string; name: string; company: string; phone: string; email: string
  part: string; status: string; source: string; category: string; brand: string; date: string
}

interface Props {
  stats: Stats
  traffic: Traffic
  recentInquiries: RecentInquiry[]
  topCategories: { name: string; count: number }[]
  topBrands: { name: string; count: number }[]
}

const statusColors: Record<string, string> = {
  new: "bg-amber-500/20 text-amber-400",
  contacted: "bg-blue-500/20 text-blue-400",
  quoted: "bg-purple-500/20 text-purple-400",
  closed: "bg-green-500/20 text-green-400",
}

export default function AnalyticsClient({ stats, traffic, recentInquiries, topCategories, topBrands }: Props) {
  const conversionRate = stats.totalInquiries > 0
    ? ((stats.closedInquiries / stats.totalInquiries) * 100).toFixed(1)
    : "0"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Analytics</h1>
        <p className="text-brand-muted text-sm">Sales pipeline, inquiry trends, and catalog overview.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Inquiries", value: stats.totalInquiries, icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-400/10" },
          { label: "Last 7 Days", value: stats.inquiriesLast7d, icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
          { label: "Last 30 Days", value: stats.inquiriesLast30d, icon: BarChart3, color: "text-blue-400", bg: "bg-blue-400/10" },
          { label: "Conversion Rate", value: `${conversionRate}%`, icon: ShoppingCart, color: "text-purple-400", bg: "bg-purple-400/10" },
        ].map(({ label, value, icon: Icon, color, bg }, i) => (
          <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-brand-white font-display font-extrabold text-3xl">{value}</p>
            <p className="text-brand-muted text-xs uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Website Traffic */}
      <div className="mb-8">
        <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">Website Traffic</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Unique Visitors", value: traffic.uniqueVisitors.toLocaleString(), icon: UserCheck, color: "text-cyan-400", bg: "bg-cyan-400/10" },
            { label: "Page Views", value: traffic.totalPageViews.toLocaleString(), icon: Eye, color: "text-sky-400", bg: "bg-sky-400/10" },
            { label: "Visitors (7d)", value: traffic.uniqueVisitors7d.toLocaleString(), icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
            { label: "Visitor → Quote", value: `${traffic.visitorConversionRate}%`, icon: Target, color: "text-amber-400", bg: "bg-amber-400/10" },
          ].map(({ label, value, icon: Icon, color, bg }, i) => (
            <div key={i} className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
                <Icon size={20} className={color} />
              </div>
              <p className="text-brand-white font-display font-extrabold text-3xl">{value}</p>
              <p className="text-brand-muted text-xs uppercase tracking-widest mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Conversion funnel: visitors → quotes */}
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
            <p className="text-brand-muted text-xs uppercase tracking-widest mb-4">Conversion — All Time</p>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-brand-white font-display font-extrabold text-2xl">{traffic.uniqueVisitors.toLocaleString()}</p>
                <p className="text-brand-muted text-[10px] uppercase tracking-widest mt-1">Visitors</p>
              </div>
              <span className="text-brand-muted pb-2">→</span>
              <div className="text-right">
                <p className="text-brand-white font-display font-extrabold text-2xl">{stats.totalInquiries.toLocaleString()}</p>
                <p className="text-brand-muted text-[10px] uppercase tracking-widest mt-1">Quotes</p>
              </div>
              <span className="text-brand-amber font-display font-extrabold text-2xl pb-2">{traffic.visitorConversionRate}%</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
            <p className="text-brand-muted text-xs uppercase tracking-widest mb-4">Conversion — Last 30 Days</p>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-brand-white font-display font-extrabold text-2xl">{traffic.uniqueVisitors30d.toLocaleString()}</p>
                <p className="text-brand-muted text-[10px] uppercase tracking-widest mt-1">Visitors</p>
              </div>
              <span className="text-brand-muted pb-2">→</span>
              <div className="text-right">
                <p className="text-brand-white font-display font-extrabold text-2xl">{stats.inquiriesLast30d.toLocaleString()}</p>
                <p className="text-brand-muted text-[10px] uppercase tracking-widest mt-1">Quotes</p>
              </div>
              <span className="text-brand-amber font-display font-extrabold text-2xl pb-2">{traffic.visitorConversionRate30d}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline & Catalog */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Inquiry Pipeline */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-6">Inquiry Pipeline</h2>
          <div className="space-y-4">
            {[
              { label: "New", count: stats.newInquiries, color: "bg-amber-500", total: stats.totalInquiries },
              { label: "Contacted", count: stats.contactedInquiries, color: "bg-blue-500", total: stats.totalInquiries },
              { label: "Quoted", count: stats.quotedInquiries, color: "bg-purple-500", total: stats.totalInquiries },
              { label: "Closed", count: stats.closedInquiries, color: "bg-green-500", total: stats.totalInquiries },
            ].map(({ label, count, color, total }) => {
              const pct = total > 0 ? (count / total) * 100 : 0
              return (
                <div key={label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-brand-white/70 text-sm font-medium">{label}</span>
                    <span className="text-brand-white font-display font-extrabold text-lg">{count}</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Catalog Overview */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-6">Catalog Overview</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Products", value: stats.totalProducts, icon: Package, color: "text-blue-400" },
              { label: "In Stock", value: stats.inStockProducts, icon: ShoppingCart, color: "text-green-400" },
              { label: "Featured", value: stats.featuredProducts, icon: TrendingUp, color: "text-amber-400" },
              { label: "Categories", value: stats.totalCategories, icon: Layers, color: "text-purple-400" },
              { label: "Brands", value: stats.totalBrands, icon: Users, color: "text-cyan-400" },
              { label: "Blog Posts", value: stats.totalBlogPosts, icon: FileText, color: "text-pink-400" },
            ].map(({ label, value, icon: Icon, color }, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
                <Icon size={16} className={color} />
                <div>
                  <p className="text-brand-white font-bold text-lg leading-none">{value}</p>
                  <p className="text-brand-muted text-[10px] uppercase tracking-widest">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Categories & Brands */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">Top Requested Categories</h2>
          {topCategories.length > 0 ? (
            <div className="space-y-3">
              {topCategories.map(({ name, count }, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-brand-white/70 text-sm">{name || "Uncategorized"}</span>
                  <span className="text-brand-amber font-bold text-sm">{count} requests</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-brand-muted text-sm">No category data yet.</p>
          )}
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.06] to-transparent border border-white/[0.06]">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">Top Requested Brands</h2>
          {topBrands.length > 0 ? (
            <div className="space-y-3">
              {topBrands.map(({ name, count }, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-brand-white/70 text-sm">{name || "Unbranded"}</span>
                  <span className="text-brand-amber font-bold text-sm">{count} requests</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-brand-muted text-sm">No brand data yet.</p>
          )}
        </div>
      </div>

      {/* Recent Inquiries Table */}
      <div>
        <h2 className="text-brand-white font-display font-extrabold uppercase text-lg mb-4">Recent Inquiries</h2>
        <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="bg-white/[0.03]">
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Name</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Company</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Source</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Category</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Status</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <p className="text-brand-white text-sm font-medium">{inq.name}</p>
                      <p className="text-brand-muted text-[10px]">{inq.email || inq.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-sm">{inq.company || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest
                        ${inq.source === "quote" ? "bg-brand-amber/15 text-brand-amber" : "bg-blue-500/15 text-blue-400"}`}>
                        {inq.source}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brand-muted text-xs">{inq.category || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest ${statusColors[inq.status] || ""}`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-brand-white/30 text-xs">
                      {new Date(inq.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
