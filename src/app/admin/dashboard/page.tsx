"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, MessageSquare, FileText, TrendingUp, Eye, ArrowUpRight } from "lucide-react"
import { products } from "@/data/products"
import { categories } from "@/data/categories"
import { brands } from "@/data/brands"
import { blogPosts } from "@/data/blog"

interface Inquiry {
  id: string
  name: string
  company: string
  phone: string
  part: string
  date: string
  status: "new" | "contacted" | "quoted" | "closed"
}

export default function DashboardPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("hesp_inquiries")
    if (stored) setInquiries(JSON.parse(stored))
  }, [])

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Categories", value: categories.length, icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Brands", value: brands.length, icon: Eye, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Blog Posts", value: blogPosts.length, icon: FileText, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Inquiries", value: inquiries.length, icon: MessageSquare, color: "text-red-400", bg: "bg-red-400/10" },
    { label: "New Inquiries", value: inquiries.filter((i) => i.status === "new").length, icon: MessageSquare, color: "text-orange-400", bg: "bg-orange-400/10" },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-brand-white font-display font-extrabold uppercase text-3xl mb-2">Dashboard</h1>
        <p className="text-brand-muted text-sm">Overview of your HESP admin panel.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {stats.map(({ label, value, icon: Icon, color, bg }, i) => (
          <div key={i} className="p-5 rounded-2xl bg-brand-plate border border-brand-amber/10">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-brand-white font-display font-extrabold text-3xl">{value}</p>
            <p className="text-brand-muted text-xs uppercase tracking-widest mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-brand-white font-display font-extrabold uppercase text-xl mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { href: "/admin/products", label: "Manage Products", desc: "Add, edit, or remove products", icon: Package },
            { href: "/admin/inquiries", label: "View Inquiries", desc: "See customer part requests", icon: MessageSquare },
            { href: "/admin/blog", label: "Manage Blog", desc: "Create or edit blog posts", icon: FileText },
          ].map(({ href, label, desc, icon: Icon }) => (
            <Link key={href} href={href}>
              <div className="group p-6 rounded-2xl bg-brand-plate border border-brand-amber/10
                hover:border-brand-amber/40 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
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

      {/* Recent Inquiries */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-brand-white font-display font-extrabold uppercase text-xl">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-brand-amber text-xs font-semibold uppercase tracking-widest hover:text-brand-gold">
            View All →
          </Link>
        </div>
        {inquiries.length > 0 ? (
          <div className="rounded-2xl overflow-hidden border border-brand-amber/10">
            <table className="w-full">
              <thead>
                <tr className="bg-brand-plate">
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Name</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Company</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3 hidden md:table-cell">Part</th>
                  <th className="text-left text-brand-white/40 text-[10px] font-bold uppercase tracking-widest px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id} className="border-t border-brand-white/5 hover:bg-brand-white/3">
                    <td className="px-4 py-3 text-brand-white text-sm">{inq.name}</td>
                    <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell">{inq.company || "—"}</td>
                    <td className="px-4 py-3 text-brand-muted text-sm hidden md:table-cell truncate max-w-[200px]">{inq.part}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                        ${inq.status === "new" ? "bg-amber-500/20 text-amber-400" :
                          inq.status === "contacted" ? "bg-blue-500/20 text-blue-400" :
                          inq.status === "quoted" ? "bg-purple-500/20 text-purple-400" :
                          "bg-green-500/20 text-green-400"}`}>
                        {inq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-brand-plate border border-brand-amber/10 text-center">
            <MessageSquare size={32} className="text-brand-white/10 mx-auto mb-3" />
            <p className="text-brand-muted text-sm">No inquiries yet. They will appear here when customers submit requests.</p>
          </div>
        )}
      </div>
    </div>
  )
}
