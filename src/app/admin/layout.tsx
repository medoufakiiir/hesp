"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, Package, MessageSquare, FileText, LogOut, Menu, ChevronRight } from "lucide-react"

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/inquiries", label: "Inquiries", icon: MessageSquare },
  { href: "/admin/blog", label: "Blog Posts", icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-brand-iron flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-steel border-r border-brand-amber/10
        transform transition-transform duration-300 lg:translate-x-0 lg:static
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-brand-amber/10">
            <Link href="/admin/dashboard" className="block">
              <h2 className="text-brand-amber font-display font-extrabold uppercase text-lg">HESP Admin</h2>
              <p className="text-brand-muted text-[10px] uppercase tracking-widest mt-1">Riyada Ventures</p>
            </Link>
          </div>

          <nav className="flex-grow p-4 space-y-1">
            {sidebarLinks.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href
              return (
                <Link key={href} href={href} onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive
                      ? "bg-brand-amber/15 text-brand-amber border border-brand-amber/20"
                      : "text-brand-white/50 hover:text-brand-white hover:bg-brand-white/5"
                    }`}>
                  <Icon size={18} />
                  {label}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-brand-amber/10">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-brand-muted text-sm hover:text-brand-white transition-colors">
              ← View Website
            </Link>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-3 px-4 py-3 text-red-400 text-sm hover:text-red-300 transition-colors w-full cursor-pointer">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex-grow min-h-screen">
        <header className="sticky top-0 z-30 bg-brand-iron/95 backdrop-blur-xl border-b border-brand-amber/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-brand-white/70
                rounded-full hover:bg-brand-white/10 transition-all cursor-pointer">
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2 text-brand-white/40 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              Admin Panel
            </div>
          </div>
        </header>
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
